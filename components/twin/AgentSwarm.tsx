"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import {
  generatePlan,
  flowField,
  roomCentre,
  wallSegments,
  mulberry32,
  type FloorPlan,
} from "@/lib/floorplan";
import { createAgents, stepAgents } from "@/lib/swarmSim";
import { getSwarmTarget, subscribeSwarmTarget } from "@/lib/swarmTarget";

/* ─── Configuration ──────────────────────────────────────────── */
const GRID_W = 72;
const GRID_H = 40;

/* Each agent class stamps into its own density channel; the display pass maps
   channels to inks. Keeping colour out of the accumulation buffer means trails
   from different agents overlap as ink does rather than washing to white. */
const CHANNEL_BASIS = [
  new THREE.Color(1, 0, 0), // R — growth / building analytics
  new THREE.Color(0, 1, 0), // G — brass / document intelligence
  new THREE.Color(0, 0, 1), // B — clay / clash + compliance
];

const INK_GROWTH = new THREE.Color("#2E8B4F");
const INK_BRASS  = new THREE.Color("#C99A2E");
const INK_CLAY   = new THREE.Color("#D06A45");

/* ─── Trail field ────────────────────────────────────────────────
   Agent positions are stamped into a render target that is fed back into
   itself each frame, multiplied by a decay constant. The result is a true
   long-exposure trail: no trail geometry, no per-agent history arrays, and the
   cost is one fullscreen pass regardless of agent count.
──────────────────────────────────────────────────────────────── */

const FADE_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const FADE_FRAG = /* glsl */ `
  uniform sampler2D uPrev;
  uniform float uDecay;
  varying vec2 vUv;
  void main() {
    vec4 prev = texture2D(uPrev, vUv);
    // Subtractive floor as well as multiplicative decay, so faint trails reach
    // true zero instead of smearing asymptotically.
    gl_FragColor = max(prev * uDecay - 0.0015, 0.0);
  }
`;

const AGENT_VERT = /* glsl */ `
  attribute vec3 aColor;
  attribute float aSize;
  varying vec3 vColor;
  void main() {
    vColor = aColor;
    gl_Position = vec4(position.xy, 0.0, 1.0);
    gl_PointSize = aSize;
  }
`;

const AGENT_FRAG = /* glsl */ `
  varying vec3 vColor;
  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float a = smoothstep(0.5, 0.0, length(d));
    a *= a;
    gl_FragColor = vec4(vColor * a, a);
  }
`;

const DISPLAY_VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const DISPLAY_FRAG = /* glsl */ `
  uniform sampler2D uTrail;
  uniform float uOpacity;
  uniform vec3 uInkR;
  uniform vec3 uInkG;
  uniform vec3 uInkB;
  varying vec2 vUv;
  void main() {
    vec3 d = texture2D(uTrail, vUv).rgb;
    float total = d.r + d.g + d.b;
    if (total < 0.002) discard;

    // Weighted ink mix, then coverage as alpha — laying pigment onto the
    // page rather than adding light to a void.
    vec3 ink = (uInkR * d.r + uInkG * d.g + uInkB * d.b) / total;
    float coverage = clamp(total * 0.9, 0.0, 1.0);
    gl_FragColor = vec4(ink, coverage * uOpacity);
  }
`;

function SwarmField({
  agentCount,
  fboWidth,
  fboHeight,
  paused,
  opacity,
}: {
  agentCount: number;
  fboWidth: number;
  fboHeight: number;
  paused: boolean;
  opacity: number;
}) {
  const { gl, viewport } = useThree();

  const sim = useMemo(() => {
    const plan: FloorPlan = generatePlan(GRID_W, GRID_H, 20260801);
    const rand = mulberry32(99);
    // One distance field per room, precomputed once. Re-targeting the swarm is
    // then a pointer swap rather than a search.
    const fields = plan.rooms.map((room) => flowField(plan, [roomCentre(plan, room)]));
    const agents = createAgents(plan, agentCount, rand);
    return { plan, fields, agents, rand };
  }, [agentCount]);

  /* ── Offscreen trail pipeline ── */
  const fx = useMemo(() => {
    const rtOpts = {
      depthBuffer: false,
      stencilBuffer: false,
      type: THREE.HalfFloatType,
      magFilter: THREE.LinearFilter,
      minFilter: THREE.LinearFilter,
      format: THREE.RGBAFormat,
    } as const;

    const rtA = new THREE.WebGLRenderTarget(fboWidth, fboHeight, rtOpts);
    const rtB = new THREE.WebGLRenderTarget(fboWidth, fboHeight, rtOpts);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const fadeMat = new THREE.ShaderMaterial({
      vertexShader: FADE_VERT,
      fragmentShader: FADE_FRAG,
      // Slow decay: paths accumulate like ivy spreading over the plan rather
      // than flashing past. The subtractive floor still lets them clear.
      uniforms: { uPrev: { value: rtA.texture }, uDecay: { value: 0.988 } },
      depthTest: false,
      depthWrite: false,
      blending: THREE.NoBlending,
    });
    const fadeQuad = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), fadeMat);
    fadeQuad.frustumCulled = false;
    fadeQuad.renderOrder = 0;
    scene.add(fadeQuad);

    const positions = new Float32Array(agentCount * 3);
    const colours = new Float32Array(agentCount * 3);
    const sizes = new Float32Array(agentCount);

    sim.agents.forEach((a, i) => {
      const c = CHANNEL_BASIS[a.cls % CHANNEL_BASIS.length];
      colours[i * 3] = c.r;
      colours[i * 3 + 1] = c.g;
      colours[i * 3 + 2] = c.b;
      sizes[i] = a.size;
    });

    const agentGeo = new THREE.BufferGeometry();
    agentGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    agentGeo.setAttribute("aColor", new THREE.BufferAttribute(colours, 3));
    agentGeo.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));

    const agentMat = new THREE.ShaderMaterial({
      vertexShader: AGENT_VERT,
      fragmentShader: AGENT_FRAG,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    const agentPoints = new THREE.Points(agentGeo, agentMat);
    agentPoints.frustumCulled = false;
    agentPoints.renderOrder = 1;
    scene.add(agentPoints);

    const displayMat = new THREE.ShaderMaterial({
      vertexShader: DISPLAY_VERT,
      fragmentShader: DISPLAY_FRAG,
      uniforms: {
        uTrail: { value: rtA.texture },
        uOpacity: { value: opacity },
        uInkR: { value: INK_GROWTH },
        uInkG: { value: INK_BRASS },
        uInkB: { value: INK_CLAY },
      },
      transparent: true,
      depthWrite: false,
      // Pigment onto paper, not light into a void.
      blending: THREE.NormalBlending,
    });

    return { rtA, rtB, scene, camera, fadeMat, agentMat, agentGeo, positions, fadeQuad, displayMat };
    // `opacity` is applied through a uniform below; it must not rebuild the pipeline.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [agentCount, fboWidth, fboHeight, sim]);

  const readRef = useRef(fx.rtA);
  const writeRef = useRef(fx.rtB);

  useEffect(() => {
    readRef.current = fx.rtA;
    writeRef.current = fx.rtB;
  }, [fx]);

  useEffect(() => {
    fx.displayMat.uniforms.uOpacity.value = opacity;
  }, [fx, opacity]);

  /* ── External targeting (nav hover) ── */
  const forced = useRef<number | null>(getSwarmTarget());
  useEffect(() => subscribeSwarmTarget((t) => { forced.current = t; }), []);

  /* ── Wall drawing ── */
  const wallGeo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(wallSegments(sim.plan), 3));
    return g;
  }, [sim]);

  /* ── Cleanup ── */
  useEffect(() => {
    const c = fx;
    return () => {
      c.rtA.dispose();
      c.rtB.dispose();
      c.fadeMat.dispose();
      c.agentMat.dispose();
      c.displayMat.dispose();
      c.agentGeo.dispose();
      c.fadeQuad.geometry.dispose();
    };
  }, [fx]);

  useEffect(() => () => wallGeo.dispose(), [wallGeo]);

  /* ── Simulation + render ── */
  useFrame(({ clock }, delta) => {
    // Clamp dt so a backgrounded tab does not teleport the swarm on return.
    const dt = Math.min(delta, 1 / 30) * 60;

    if (!paused) {
      stepAgents({
        plan: sim.plan,
        fields: sim.fields,
        agents: sim.agents,
        dt,
        forcedGoal: forced.current,
        rand: sim.rand,
        out: fx.positions,
        time: clock.elapsedTime * 1000,
      });
      fx.agentGeo.attributes.position.needsUpdate = true;
    }

    // Ping-pong: fade the previous frame into the write target, stamp agents on
    // top, then swap so the freshly written target becomes the display source.
    const read = readRef.current;
    const write = writeRef.current;

    fx.fadeMat.uniforms.uPrev.value = read.texture;

    const prevTarget = gl.getRenderTarget();
    gl.setRenderTarget(write);
    gl.render(fx.scene, fx.camera);
    gl.setRenderTarget(prevTarget);

    readRef.current = write;
    writeRef.current = read;

    fx.displayMat.uniforms.uTrail.value = write.texture;
  });

  // Cover-fit the plan to the viewport so it always bleeds past the edges.
  const scale = Math.max(viewport.width / GRID_W, viewport.height / GRID_H) * 1.02;

  return (
    <group scale={scale}>
      <mesh material={fx.displayMat}>
        <planeGeometry args={[GRID_W, GRID_H]} />
      </mesh>
      <lineSegments geometry={wallGeo}>
        <lineBasicMaterial color="#3A2E26" transparent opacity={0.34} toneMapped={false} />
      </lineSegments>
    </group>
  );
}

/* ─── Exported canvas wrapper ────────────────────────────────── */
export default function AgentSwarm({
  paused = false,
  active = true,
  opacity = 1,
  className = "absolute inset-0",
}: {
  paused?: boolean;
  /** When false the render loop stops entirely rather than idling. */
  active?: boolean;
  opacity?: number;
  className?: string;
}) {
  // Resolved on the client only; the canvas is never server-rendered.
  const [profile] = useState(() => {
    const mobile = typeof window !== "undefined" && window.innerWidth < 768;
    return mobile
      ? { agents: 90, fboW: 640, fboH: 360, dpr: 1 as const }
      : { agents: 260, fboW: 1280, fboH: 720, dpr: 1.5 as const };
  });

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        orthographic
        camera={{ position: [0, 0, 10], zoom: 1 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, profile.dpr]}
        frameloop={active && !paused ? "always" : "never"}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <SwarmField
          agentCount={profile.agents}
          fboWidth={profile.fboW}
          fboHeight={profile.fboH}
          paused={paused}
          opacity={opacity}
        />
      </Canvas>
    </div>
  );
}
