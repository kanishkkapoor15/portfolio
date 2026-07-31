/**
 * Agent simulation, deliberately free of React and Three.js so it can be
 * exercised headlessly (see scripts/check-swarm.ts). The renderer only reads
 * the position buffer this module writes.
 */

import type { FloorPlan } from "./floorplan";

export type Agent = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  speed: number;
  size: number;
  /** Index into the precomputed flow fields — one per room. */
  goal: number;
  /** Agent class, drives colour and the trace panel roles. */
  cls: number;
};

export function createAgents(plan: FloorPlan, count: number, rand: () => number): Agent[] {
  const walkable: number[] = [];
  for (let i = 0; i < plan.walls.length; i++) if (!plan.walls[i]) walkable.push(i);

  return Array.from({ length: count }, () => {
    const cell = walkable[Math.floor(rand() * walkable.length)];
    return {
      x: (cell % plan.gw) + 0.5,
      y: ((cell / plan.gw) | 0) + 0.5,
      vx: 0,
      vy: 0,
      speed: 0.055 + rand() * 0.07,
      size: 1.6 + rand() * 2.4,
      goal: Math.floor(rand() * Math.max(1, plan.rooms.length)),
      cls: Math.floor(rand() * 3),
    };
  });
}

export type StepOptions = {
  plan: FloorPlan;
  fields: Int32Array[];
  agents: Agent[];
  /** Frame-rate normalised delta (1 === one 60fps frame). */
  dt: number;
  /** When set, every agent heads for this room instead of its own goal. */
  forcedGoal: number | null;
  rand: () => number;
  /** Optional NDC output buffer, 3 floats per agent, for the trail pass. */
  out?: Float32Array;
  time?: number;
};

export function stepAgents({ plan, fields, agents, dt, forcedGoal, rand, out, time = 0 }: StepOptions) {
  const { gw, gh, walls } = plan;
  if (fields.length === 0) return;

  const isWall = (px: number, py: number) => {
    const ix = Math.min(gw - 1, Math.max(0, Math.floor(px)));
    const iy = Math.min(gh - 1, Math.max(0, Math.floor(py)));
    return walls[iy * gw + ix] === 1;
  };

  for (let i = 0; i < agents.length; i++) {
    const a = agents[i];
    const goal = forcedGoal !== null ? ((forcedGoal % fields.length) + fields.length) % fields.length : a.goal;
    const field = fields[goal];

    const cx = Math.min(gw - 1, Math.max(0, Math.floor(a.x)));
    const cy = Math.min(gh - 1, Math.max(0, Math.floor(a.y)));
    const here = field[cy * gw + cx];

    // Arrived — pick somewhere new to be, but only when roaming freely.
    if (here >= 0 && here <= 2 && forcedGoal === null) {
      a.goal = Math.floor(rand() * fields.length);
    }

    // Descend the gradient: steer toward the cheapest reachable neighbour.
    let bestX = 0;
    let bestY = 0;
    let best = here < 0 ? Infinity : here;

    for (let oy = -1; oy <= 1; oy++) {
      for (let ox = -1; ox <= 1; ox++) {
        if (ox === 0 && oy === 0) continue;
        const nx = cx + ox;
        const ny = cy + oy;
        if (nx < 0 || ny < 0 || nx >= gw || ny >= gh) continue;
        if (walls[ny * gw + nx]) continue;
        // Refuse diagonals that would cut a wall corner.
        if (ox !== 0 && oy !== 0 && (walls[cy * gw + nx] || walls[ny * gw + cx])) continue;
        const d = field[ny * gw + nx];
        if (d < 0) continue;
        if (d < best) {
          best = d;
          bestX = ox;
          bestY = oy;
        }
      }
    }

    // Already at the goal, or stranded behind a wall — drift rather than freeze.
    if (bestX === 0 && bestY === 0) {
      bestX = Math.cos(i * 2.4 + time * 0.0002);
      bestY = Math.sin(i * 2.4 + time * 0.0002);
    }

    const len = Math.hypot(bestX, bestY) || 1;
    const dx = (bestX / len) * a.speed;
    const dy = (bestY / len) * a.speed;

    // Steering rather than snapping — this is what gives the trails their curve.
    a.vx += (dx - a.vx) * 0.09 * dt;
    a.vy += (dy - a.vy) * 0.09 * dt;

    // Sliding collision so agents hug walls instead of embedding in them.
    const nx = a.x + a.vx * dt;
    const ny = a.y + a.vy * dt;

    if (!isWall(nx, a.y)) a.x = nx;
    else a.vx *= -0.4;
    if (!isWall(a.x, ny)) a.y = ny;
    else a.vy *= -0.4;

    if (out) {
      out[i * 3] = (a.x / gw) * 2 - 1;
      out[i * 3 + 1] = (a.y / gh) * 2 - 1;
      out[i * 3 + 2] = 0;
    }
  }
}
