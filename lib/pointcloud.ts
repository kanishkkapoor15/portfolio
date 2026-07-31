/**
 * Synthetic reality-capture point cloud of a building — the sort of thing a
 * scan-to-BIM survey produces. Structure is generated rather than loaded so
 * there is no multi-megabyte asset to ship.
 *
 * Channels (packed into the colour attribute) distinguish structure from
 * envelope from services, which the shader uses to tint the scan.
 */

import { mulberry32 } from "./floorplan.ts";

export type PointCloud = {
  positions: Float32Array;
  /** 0 = slab, 1 = column, 2 = facade, 3 = services/scatter */
  kinds: Float32Array;
  sizes: Float32Array;
  count: number;
};

export type BuildingSpec = {
  width: number;
  depth: number;
  floors: number;
  floorHeight: number;
  seed?: number;
};

export const DEFAULT_BUILDING: BuildingSpec = {
  width: 14,
  depth: 9,
  floors: 7,
  floorHeight: 1.5,
  seed: 1337,
};

export function generateBuilding(spec: BuildingSpec = DEFAULT_BUILDING): PointCloud {
  const { width, depth, floors, floorHeight } = spec;
  const rand = mulberry32(spec.seed ?? 1337);

  const pos: number[] = [];
  const kind: number[] = [];
  const size: number[] = [];

  const hw = width / 2;
  const hd = depth / 2;
  const totalH = floors * floorHeight;
  // Centre the building vertically on the origin.
  const y0 = -totalH / 2;

  const push = (x: number, y: number, z: number, k: number, s: number) => {
    pos.push(x, y, z);
    kind.push(k);
    size.push(s);
  };

  // Scanner noise — real captures are never perfectly planar.
  const jitter = (amount: number) => (rand() - 0.5) * amount;

  /* ── Floor slabs ── */
  const slabStep = 0.42;
  for (let f = 0; f <= floors; f++) {
    const y = y0 + f * floorHeight;
    for (let x = -hw; x <= hw; x += slabStep) {
      for (let z = -hd; z <= hd; z += slabStep) {
        const edge = Math.abs(x) > hw - slabStep * 1.5 || Math.abs(z) > hd - slabStep * 1.5;
        // Dense at slab edges, sparse across the middle so the plates read as
        // surfaces without becoming a solid wall of points.
        if (!edge && rand() > 0.34) continue;
        push(x + jitter(0.05), y + jitter(0.035), z + jitter(0.05), 0, edge ? 1.5 : 1.0);
      }
    }
  }

  /* ── Structural columns ── */
  const colX = 3.5;
  const colZ = 3.0;
  for (let x = -hw + 0.75; x <= hw - 0.75; x += colX) {
    for (let z = -hd + 0.75; z <= hd - 0.75; z += colZ) {
      for (let y = y0; y <= y0 + totalH; y += 0.22) {
        push(x + jitter(0.04), y + jitter(0.03), z + jitter(0.04), 1, 1.7);
      }
    }
  }

  /* ── Facade / envelope ── */
  const facStep = 0.3;
  for (let y = y0; y <= y0 + totalH; y += 0.34) {
    for (let x = -hw; x <= hw; x += facStep) {
      push(x + jitter(0.03), y + jitter(0.03), -hd + jitter(0.03), 2, 1.2);
      push(x + jitter(0.03), y + jitter(0.03), hd + jitter(0.03), 2, 1.2);
    }
    for (let z = -hd; z <= hd; z += facStep) {
      push(-hw + jitter(0.03), y + jitter(0.03), z + jitter(0.03), 2, 1.2);
      push(hw + jitter(0.03), y + jitter(0.03), z + jitter(0.03), 2, 1.2);
    }
  }

  /* ── Services and loose fit-out ── */
  const scatter = 900;
  for (let i = 0; i < scatter; i++) {
    const f = Math.floor(rand() * floors);
    const y = y0 + f * floorHeight + 0.15 + rand() * (floorHeight - 0.5);
    push(
      (rand() - 0.5) * (width - 1.2),
      y,
      (rand() - 0.5) * (depth - 1.2),
      3,
      1.0 + rand() * 1.4,
    );
  }

  return {
    positions: new Float32Array(pos),
    kinds: new Float32Array(kind),
    sizes: new Float32Array(size),
    count: kind.length,
  };
}
