/**
 * Procedural floor-plan generation + flow-field pathfinding.
 *
 * Pure TypeScript, no React or Three.js — this is the simulation layer that
 * drives the agent swarm. A BSP split produces plausible room partitions with
 * doorways punched through the dividing walls; a BFS from the current target
 * produces a distance field that every agent descends. Recomputing the field is
 * O(cells), so re-targeting the whole swarm (e.g. on nav hover) is essentially
 * free compared with running A* per agent.
 */

export type Rect = { x: number; y: number; w: number; h: number };

export type FloorPlan = {
  gw: number;
  gh: number;
  /** 1 = wall, 0 = walkable */
  walls: Uint8Array;
  rooms: Rect[];
};

/** Small deterministic PRNG so the plan is stable across renders. */
export function mulberry32(seed: number): () => number {
  let a = seed;
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const MIN_ROOM = 6;
const MAX_DEPTH = 5;

export function generatePlan(gw: number, gh: number, seed = 7): FloorPlan {
  const walls = new Uint8Array(gw * gh);
  const idx = (x: number, y: number) => y * gw + x;
  const rand = mulberry32(seed);

  // Building envelope
  for (let x = 0; x < gw; x++) {
    walls[idx(x, 0)] = 1;
    walls[idx(x, gh - 1)] = 1;
  }
  for (let y = 0; y < gh; y++) {
    walls[idx(0, y)] = 1;
    walls[idx(gw - 1, y)] = 1;
  }

  const rooms: Rect[] = [];

  const punchDoor = (x: number, y: number) => {
    if (x > 0 && y > 0 && x < gw - 1 && y < gh - 1) walls[idx(x, y)] = 0;
  };

  const split = (r: Rect, depth: number) => {
    const canV = r.w >= MIN_ROOM * 2 + 1;
    const canH = r.h >= MIN_ROOM * 2 + 1;

    if (depth >= MAX_DEPTH || (!canV && !canH)) {
      rooms.push(r);
      return;
    }

    // Prefer splitting the longer axis so rooms stay roughly proportioned.
    const vertical = canV && (!canH || (r.w > r.h ? rand() > 0.25 : rand() > 0.75));

    if (vertical) {
      const cut = r.x + MIN_ROOM + Math.floor(rand() * (r.w - MIN_ROOM * 2));
      for (let y = r.y; y < r.y + r.h; y++) walls[idx(cut, y)] = 1;

      // One or two doorways so the graph stays well connected.
      const doorY = r.y + 1 + Math.floor(rand() * Math.max(1, r.h - 2));
      punchDoor(cut, doorY);
      if (r.h > 10) punchDoor(cut, r.y + r.h - 2 - Math.floor(rand() * 3));

      split({ x: r.x, y: r.y, w: cut - r.x, h: r.h }, depth + 1);
      split({ x: cut + 1, y: r.y, w: r.x + r.w - cut - 1, h: r.h }, depth + 1);
    } else {
      const cut = r.y + MIN_ROOM + Math.floor(rand() * (r.h - MIN_ROOM * 2));
      for (let x = r.x; x < r.x + r.w; x++) walls[idx(x, cut)] = 1;

      const doorX = r.x + 1 + Math.floor(rand() * Math.max(1, r.w - 2));
      punchDoor(doorX, cut);
      if (r.w > 10) punchDoor(r.x + r.w - 2 - Math.floor(rand() * 3), cut);

      split({ x: r.x, y: r.y, w: r.w, h: cut - r.y }, depth + 1);
      split({ x: r.x, y: cut + 1, w: r.w, h: r.y + r.h - cut - 1 }, depth + 1);
    }
  };

  split({ x: 1, y: 1, w: gw - 2, h: gh - 2 }, 0);

  return { gw, gh, walls, rooms };
}

/**
 * Breadth-first distance field from a set of goal cells. Cells that cannot be
 * reached keep -1 so agents stranded behind a wall fall back to wandering.
 */
export function flowField(plan: FloorPlan, goals: number[]): Int32Array {
  const { gw, gh, walls } = plan;
  const dist = new Int32Array(gw * gh).fill(-1);
  const queue = new Int32Array(gw * gh);
  let head = 0;
  let tail = 0;

  for (const g of goals) {
    if (g >= 0 && g < walls.length && !walls[g] && dist[g] === -1) {
      dist[g] = 0;
      queue[tail++] = g;
    }
  }

  while (head < tail) {
    const c = queue[head++];
    const cx = c % gw;
    const cy = (c / gw) | 0;
    const d = dist[c] + 1;

    if (cx > 0) {
      const n = c - 1;
      if (!walls[n] && dist[n] === -1) { dist[n] = d; queue[tail++] = n; }
    }
    if (cx < gw - 1) {
      const n = c + 1;
      if (!walls[n] && dist[n] === -1) { dist[n] = d; queue[tail++] = n; }
    }
    if (cy > 0) {
      const n = c - gw;
      if (!walls[n] && dist[n] === -1) { dist[n] = d; queue[tail++] = n; }
    }
    if (cy < gh - 1) {
      const n = c + gw;
      if (!walls[n] && dist[n] === -1) { dist[n] = d; queue[tail++] = n; }
    }
  }

  return dist;
}

/** Centre cell of a room, used as a swarm goal. */
export function roomCentre(plan: FloorPlan, room: Rect): number {
  const cx = Math.min(plan.gw - 2, Math.max(1, room.x + (room.w >> 1)));
  const cy = Math.min(plan.gh - 2, Math.max(1, room.y + (room.h >> 1)));
  return cy * plan.gw + cx;
}

/**
 * Wall geometry as line segments. A segment is emitted between the centres of
 * two orthogonally adjacent wall cells, which traces the wall network as a
 * connected drawing rather than a field of disconnected boxes.
 */
export function wallSegments(plan: FloorPlan): Float32Array {
  const { gw, gh, walls } = plan;
  const pts: number[] = [];

  // Grid units, centred on the origin.
  const px = (x: number) => x - gw / 2 + 0.5;
  const py = (y: number) => y - gh / 2 + 0.5;

  for (let y = 0; y < gh; y++) {
    for (let x = 0; x < gw; x++) {
      if (!walls[y * gw + x]) continue;
      if (x < gw - 1 && walls[y * gw + x + 1]) {
        pts.push(px(x), py(y), 0, px(x + 1), py(y), 0);
      }
      if (y < gh - 1 && walls[(y + 1) * gw + x]) {
        pts.push(px(x), py(y), 0, px(x), py(y + 1), 0);
      }
    }
  }

  return new Float32Array(pts);
}
