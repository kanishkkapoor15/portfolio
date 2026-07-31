"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { generateBuilding, DEFAULT_BUILDING } from "@/lib/pointcloud";

/* Number of recent pointer samples retained. Each one keeps lighting the cloud
   as it ages out, which reads as scan persistence without needing a GPGPU
   memory buffer per point. */
const TRAIL = 14;

const VERT = /* glsl */ `
  uniform vec3  uTrail[${TRAIL}];   // xy = NDC position, z = age (1 fresh → 0 dead)
  uniform float uAspect;
  uniform float uRadius;
  uniform float uSweepY;
  uniform float uReveal;
  uniform float uSizeScale;

  attribute float aKind;
  attribute float aSize;

  varying float vLit;
  varying float vKind;

  void main() {
    vKind = aKind;

    vec4 mv   = modelViewMatrix * vec4(position, 1.0);
    vec4 clip = projectionMatrix * mv;
    vec2 ndc  = clip.xy / max(clip.w, 0.0001);

    // Pointer proximity, accumulated over the retained samples.
    float lit = 0.0;
    for (int i = 0; i < ${TRAIL}; i++) {
      vec2 d = (ndc - uTrail[i].xy) * vec2(uAspect, 1.0);
      float prox = smoothstep(uRadius, 0.0, length(d));
      lit = max(lit, prox * uTrail[i].z);
    }

    // Slow horizontal scan plane so the cloud stays alive when nothing is
    // hovering it — the vertical sweep of a real scanner head.
    float band = smoothstep(0.55, 0.0, abs(position.y - uSweepY));
    lit = max(lit, band * 0.55);

    // Baseline so the silhouette is always faintly legible.
    vLit = clamp(max(lit, 0.06) * uReveal, 0.0, 1.0);

    gl_Position = clip;
    gl_PointSize = aSize * uSizeScale * (1.0 + vLit * 1.9) * (12.0 / max(-mv.z, 0.5));
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;

  uniform vec3 uSlab;
  uniform vec3 uColumn;
  uniform vec3 uFacade;
  uniform vec3 uServices;

  varying float vLit;
  varying float vKind;

  void main() {
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float falloff = smoothstep(0.5, 0.05, r);

    vec3 col = uSlab;
    if (vKind > 2.5)      col = uServices;
    else if (vKind > 1.5) col = uFacade;
    else if (vKind > 0.5) col = uColumn;

    // Freshly scanned points bloom toward white before settling into their
    // channel colour, which is what sells the "just hit by the beam" read.
    vec3 hot = mix(col, vec3(1.0), smoothstep(0.55, 1.0, vLit) * 0.7);

    float a = falloff * vLit;
    gl_FragColor = vec4(hot * a, a);
  }
`;

function Cloud({ paused, sizeScale }: { paused: boolean; sizeScale: number }) {
  const { pointer, viewport, size } = useThree();
  const groupRef = useRef<THREE.Group>(null);

  const cloud = useMemo(() => generateBuilding(DEFAULT_BUILDING), []);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(cloud.positions, 3));
    g.setAttribute("aKind", new THREE.BufferAttribute(cloud.kinds, 1));
    g.setAttribute("aSize", new THREE.BufferAttribute(cloud.sizes, 1));
    g.computeBoundingSphere();
    return g;
  }, [cloud]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        uniforms: {
          uTrail: { value: Array.from({ length: TRAIL }, () => new THREE.Vector3(9, 9, 0)) },
          uAspect: { value: 1 },
          uRadius: { value: 0.34 },
          uSweepY: { value: 0 },
          uReveal: { value: 0 },
          uSizeScale: { value: sizeScale },
          uSlab: { value: new THREE.Color("#00D4FF") },
          uColumn: { value: new THREE.Color("#F0F6FF") },
          uFacade: { value: new THREE.Color("#7C3AED") },
          uServices: { value: new THREE.Color("#10B981") },
        },
      }),
    [sizeScale],
  );

  useEffect(() => () => { geometry.dispose(); material.dispose(); }, [geometry, material]);

  const lastPointer = useRef(new THREE.Vector2(0, 0));
  const idleFor = useRef(0);

  useFrame(({ clock }, delta) => {
    const dt = Math.min(delta, 1 / 30);
    const u = material.uniforms;

    u.uAspect.value = size.width / Math.max(size.height, 1);
    u.uSizeScale.value = sizeScale;

    // Ease the whole cloud in on first appearance.
    u.uReveal.value = THREE.MathUtils.damp(u.uReveal.value, 1, 2.2, dt);

    if (paused) return;

    const t = clock.elapsedTime;

    // Idle detection — after a beat with no pointer movement, drive a synthetic
    // scan so the piece is never dead on touch devices.
    const moved = Math.hypot(pointer.x - lastPointer.current.x, pointer.y - lastPointer.current.y);
    idleFor.current = moved > 0.002 ? 0 : idleFor.current + dt;
    lastPointer.current.set(pointer.x, pointer.y);

    let px = pointer.x;
    let py = pointer.y;
    if (idleFor.current > 1.6) {
      // Lissajous path: covers the frame without ever looking like a loop.
      px = Math.sin(t * 0.31) * 0.72;
      py = Math.cos(t * 0.23) * 0.52;
    }

    // Age the retained samples, then push the current one at full strength.
    const trail = u.uTrail.value as THREE.Vector3[];
    for (let i = trail.length - 1; i > 0; i--) {
      trail[i].copy(trail[i - 1]);
      trail[i].z *= 0.87;
    }
    trail[0].set(px, py, 1);

    u.uSweepY.value = Math.sin(t * 0.35) * 6.0;

    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.11;
      // Slight tilt response to the cursor — parallax without full orbit
      // controls, so the section never traps the scroll.
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        -pointer.y * 0.13,
        3,
        dt,
      );
    }
  });

  // Fit the building to the available viewport height.
  const fit = Math.min(1, viewport.height / 13);

  return (
    <group ref={groupRef} scale={fit}>
      <points geometry={geometry} material={material} />
    </group>
  );
}

export default function LidarScan({
  paused = false,
  className = "absolute inset-0",
}: {
  paused?: boolean;
  className?: string;
}) {
  const [sizeScale] = useState(() =>
    typeof window !== "undefined" && window.innerWidth < 768 ? 0.75 : 1,
  );

  return (
    <div className={className} style={{ width: "100%", height: "100%" }}>
      <Canvas
        camera={{ position: [0, 1.5, 22], fov: 42 }}
        gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
        style={{ background: "transparent", width: "100%", height: "100%" }}
      >
        <Cloud paused={paused} sizeScale={sizeScale} />
      </Canvas>
    </div>
  );
}
