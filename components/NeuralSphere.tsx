"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/* ─── Constants ──────────────────────────────────────────────── */
const PARTICLE_COUNT   = 90;
const SPHERE_RADIUS    = 2.8;
const MAX_EDGE_DIST    = 1.55;
const MAX_CONNECTIONS  = 5;
const PACKET_COUNT     = 35;

/* ─── Fibonacci sphere distribution ──────────────────────────── */
function fibonacciSphere(count: number, radius: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  const phi = Math.PI * (Math.sqrt(5) - 1); // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(Math.max(0, 1 - y * y));
    const theta = phi * i;
    points.push(
      new THREE.Vector3(
        Math.cos(theta) * r * radius,
        y * radius,
        Math.sin(theta) * r * radius,
      ),
    );
  }
  return points;
}

/* ─── Data packets flying along edges ────────────────────────── */
interface PacketState {
  edgeIdx: number;
  progress: number;
  speed: number;
  dir: 1 | -1;
}

function DataPackets({
  particles,
  edges,
}: {
  particles: THREE.Vector3[];
  edges: [number, number][];
}) {
  const data = useRef<PacketState[]>(
    Array.from({ length: PACKET_COUNT }, () => ({
      edgeIdx: Math.floor(Math.random() * edges.length),
      progress: Math.random(),
      speed: 0.006 + Math.random() * 0.009,
      dir: (Math.random() > 0.5 ? 1 : -1) as 1 | -1,
    })),
  );

  const meshRefs = useRef<(THREE.Mesh | null)[]>(
    Array.from({ length: PACKET_COUNT }, () => null),
  );
  const tmp = useRef(new THREE.Vector3());

  useFrame(() => {
    data.current.forEach((pkt, i) => {
      pkt.progress += pkt.speed * pkt.dir;

      if (pkt.progress >= 1) {
        pkt.dir = -1;
        pkt.progress = 1;
      } else if (pkt.progress <= 0) {
        pkt.dir = 1;
        pkt.progress = 0;
        // jump to random edge connected to current end-node
        const endNode = edges[pkt.edgeIdx]?.[pkt.dir === 1 ? 0 : 1];
        const candidates = edges.reduce<number[]>((acc, [a, b], idx) => {
          if (a === endNode || b === endNode) acc.push(idx);
          return acc;
        }, []);
        pkt.edgeIdx =
          candidates.length > 0
            ? candidates[Math.floor(Math.random() * candidates.length)]
            : Math.floor(Math.random() * edges.length);
      }

      const edge = edges[pkt.edgeIdx];
      if (!edge) return;
      tmp.current.lerpVectors(particles[edge[0]], particles[edge[1]], pkt.progress);
      const mesh = meshRefs.current[i];
      if (mesh) mesh.position.copy(tmp.current);
    });
  });

  return (
    <>
      {Array.from({ length: PACKET_COUNT }, (_, i) => {
        const isCyan = i % 3 !== 0;
        return (
          <mesh
            key={i}
            ref={(el) => {
              meshRefs.current[i] = el;
            }}
          >
            <sphereGeometry args={[isCyan ? 0.032 : 0.024, 6, 6]} />
            <meshBasicMaterial
              color={isCyan ? "#00D4FF" : "#7C3AED"}
              toneMapped={false}
            />
          </mesh>
        );
      })}
    </>
  );
}

/* ─── Pulsing glow rings at hub nodes ────────────────────────── */
function PulsingRings({ positions }: { positions: THREE.Vector3[] }) {
  const ringRefs = useRef<(THREE.Mesh | null)[]>(
    positions.map(() => null),
  );

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    ringRefs.current.forEach((mesh, i) => {
      if (!mesh) return;
      const scale = 1 + 0.35 * Math.sin(t * 1.8 + i * 1.2);
      mesh.scale.setScalar(scale);
      (mesh.material as THREE.MeshBasicMaterial).opacity =
        0.25 - 0.15 * Math.abs(Math.sin(t * 1.8 + i * 1.2));
    });
  });

  return (
    <>
      {positions.map((pos, i) => (
        <mesh
          key={i}
          ref={(el) => {
            ringRefs.current[i] = el;
          }}
          position={pos}
        >
          <ringGeometry args={[0.12, 0.18, 24]} />
          <meshBasicMaterial
            color={i % 2 === 0 ? "#00D4FF" : "#7C3AED"}
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
            toneMapped={false}
          />
        </mesh>
      ))}
    </>
  );
}

/* ─── Main Three.js scene ────────────────────────────────────── */
function NeuralScene() {
  /* particles */
  const particles = useMemo(
    () => fibonacciSphere(PARTICLE_COUNT, SPHERE_RADIUS),
    [],
  );

  /* edges */
  const edges = useMemo<[number, number][]>(() => {
    const list: [number, number][] = [];
    const connCount = new Array<number>(particles.length).fill(0);

    for (let i = 0; i < particles.length; i++) {
      if (connCount[i] >= MAX_CONNECTIONS) continue;
      for (let j = i + 1; j < particles.length; j++) {
        if (connCount[i] >= MAX_CONNECTIONS) break;
        if (connCount[j] >= MAX_CONNECTIONS) continue;
        if (particles[i].distanceTo(particles[j]) < MAX_EDGE_DIST) {
          list.push([i, j]);
          connCount[i]++;
          connCount[j]++;
        }
      }
    }
    return list;
  }, [particles]);

  /* edge geometries — cyan + purple split */
  const { cyanGeo, purpleGeo } = useMemo(() => {
    const cyan: number[] = [];
    const purple: number[] = [];

    edges.forEach(([i, j], idx) => {
      const buf = idx % 4 === 0 ? purple : cyan;
      buf.push(
        particles[i].x, particles[i].y, particles[i].z,
        particles[j].x, particles[j].y, particles[j].z,
      );
    });

    const mkGeo = (arr: number[]) => {
      const g = new THREE.BufferGeometry();
      g.setAttribute("position", new THREE.Float32BufferAttribute(arr, 3));
      return g;
    };
    return { cyanGeo: mkGeo(cyan), purpleGeo: mkGeo(purple) };
  }, [edges, particles]);

  /* all-node geometry */
  const nodeGeo = useMemo(() => {
    const pos = new Float32Array(
      particles.flatMap((p) => [p.x, p.y, p.z]),
    );
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [particles]);

  /* hub nodes (8 evenly spread) */
  const hubPositions = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) =>
        particles[Math.floor((i / 8) * PARTICLE_COUNT)].clone(),
      ),
    [particles],
  );

  const hubGeo = useMemo(() => {
    const pos = new Float32Array(
      hubPositions.flatMap((p) => [p.x, p.y, p.z]),
    );
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    return g;
  }, [hubPositions]);

  return (
    <group>
      {/* ── Edges ── */}
      <lineSegments geometry={cyanGeo}>
        <lineBasicMaterial
          color="#00D4FF"
          transparent
          opacity={0.13}
          toneMapped={false}
        />
      </lineSegments>

      <lineSegments geometry={purpleGeo}>
        <lineBasicMaterial
          color="#7C3AED"
          transparent
          opacity={0.18}
          toneMapped={false}
        />
      </lineSegments>

      {/* ── Nodes (regular) ── */}
      <points geometry={nodeGeo}>
        <pointsMaterial
          color="#00D4FF"
          size={0.055}
          transparent
          opacity={0.75}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* ── Hub nodes (larger glow) ── */}
      <points geometry={hubGeo}>
        <pointsMaterial
          color="#00D4FF"
          size={0.14}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* Hub glow overlay (slightly larger, dimmer) */}
      <points geometry={hubGeo}>
        <pointsMaterial
          color="#7C3AED"
          size={0.28}
          transparent
          opacity={0.18}
          sizeAttenuation
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </points>

      {/* ── Pulsing rings at hubs ── */}
      <PulsingRings positions={hubPositions} />

      {/* ── Data packets ── */}
      <DataPackets particles={particles} edges={edges} />
    </group>
  );
}

/* ─── Exported Canvas wrapper ────────────────────────────────── */
export default function NeuralSphere() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 52 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[8, 8, 8]}   color="#00D4FF" intensity={6} />
        <pointLight position={[-8, -8, -8]} color="#7C3AED" intensity={4} />
        <pointLight position={[0, 10, -5]} color="#10B981" intensity={2} />

        {/* Auto-rotate + drag controls */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={0.45}
          enableZoom={false}
          enablePan={false}
          enableDamping
          dampingFactor={0.06}
          minPolarAngle={0.2}
          maxPolarAngle={Math.PI - 0.2}
        />

        <NeuralScene />
      </Canvas>
    </div>
  );
}
