/**
 * Headless verification of the swarm simulation.
 *   node --test scripts/check-swarm.ts
 *
 * The browser preview cannot run requestAnimationFrame, so the WebGL layer is
 * unverifiable there. Everything that can actually be wrong — plan
 * connectivity, flow-field correctness, agents tunnelling through walls,
 * convergence on a forced target — is deterministic and tested here.
 */

import test from "node:test";
import assert from "node:assert/strict";

import { generatePlan, flowField, roomCentre, wallSegments, mulberry32 } from "../lib/floorplan.ts";
import { createAgents, stepAgents } from "../lib/swarmSim.ts";

const GW = 72;
const GH = 40;

function build() {
  const plan = generatePlan(GW, GH, 20260801);
  const fields = plan.rooms.map((r) => flowField(plan, [roomCentre(plan, r)]));
  return { plan, fields };
}

test("plan partitions into rooms with a sealed envelope", () => {
  const { plan } = build();
  assert.ok(plan.rooms.length >= 8, `expected several rooms, got ${plan.rooms.length}`);

  for (let x = 0; x < GW; x++) {
    assert.equal(plan.walls[x], 1, "top edge must be wall");
    assert.equal(plan.walls[(GH - 1) * GW + x], 1, "bottom edge must be wall");
  }
  for (let y = 0; y < GH; y++) {
    assert.equal(plan.walls[y * GW], 1, "left edge must be wall");
    assert.equal(plan.walls[y * GW + GW - 1], 1, "right edge must be wall");
  }
});

test("every room centre reaches essentially the whole floor", () => {
  const { plan, fields } = build();

  let walkable = 0;
  for (let i = 0; i < plan.walls.length; i++) if (!plan.walls[i]) walkable++;

  for (let i = 0; i < fields.length; i++) {
    let reached = 0;
    for (let c = 0; c < fields[i].length; c++) if (fields[i][c] >= 0) reached++;
    const pct = reached / walkable;
    assert.ok(
      pct > 0.9,
      `field ${i} only reaches ${(pct * 100).toFixed(1)}% of walkable cells — doorways are not connecting rooms`,
    );
  }
});

test("wall geometry is non-empty and well formed", () => {
  const { plan } = build();
  const segs = wallSegments(plan);
  assert.ok(segs.length > 0, "no wall segments emitted");
  assert.equal(segs.length % 6, 0, "segments must be pairs of xyz vertices");
  for (const v of segs) assert.ok(Number.isFinite(v), "wall vertex must be finite");
});

test("agents move, stay out of walls, and stay on the floor plate", () => {
  const { plan, fields } = build();
  const rand = mulberry32(5);
  const agents = createAgents(plan, 250, rand);
  const out = new Float32Array(250 * 3);

  const start = agents.map((a) => ({ x: a.x, y: a.y }));

  for (let f = 0; f < 600; f++) {
    stepAgents({ plan, fields, agents, dt: 1, forcedGoal: null, rand, out, time: f * 16 });

    for (const a of agents) {
      assert.ok(Number.isFinite(a.x) && Number.isFinite(a.y), "agent position went non-finite");
      const ix = Math.floor(a.x);
      const iy = Math.floor(a.y);
      assert.ok(ix >= 0 && ix < GW && iy >= 0 && iy < GH, `agent left the grid at ${a.x},${a.y}`);
      assert.notEqual(plan.walls[iy * GW + ix], 1, `agent tunnelled into a wall at ${a.x},${a.y}`);
    }
  }

  const moved = agents.filter((a, i) => Math.hypot(a.x - start[i].x, a.y - start[i].y) > 2).length;
  assert.ok(moved > agents.length * 0.8, `only ${moved}/${agents.length} agents actually travelled`);

  for (const v of out) assert.ok(v >= -1.001 && v <= 1.001, `NDC output out of range: ${v}`);
});

test("a forced target pulls the whole swarm into that room", () => {
  const { plan, fields } = build();
  const rand = mulberry32(11);
  const agents = createAgents(plan, 200, rand);

  const target = 3;
  const goalCell = roomCentre(plan, plan.rooms[target]);
  const gx = goalCell % GW;
  const gy = (goalCell / GW) | 0;

  const before =
    agents.reduce((s, a) => s + Math.hypot(a.x - gx, a.y - gy), 0) / agents.length;

  for (let f = 0; f < 1500; f++) {
    stepAgents({ plan, fields, agents, dt: 1, forcedGoal: target, rand, time: f * 16 });
  }

  const after =
    agents.reduce((s, a) => s + Math.hypot(a.x - gx, a.y - gy), 0) / agents.length;

  assert.ok(
    after < before * 0.4,
    `swarm did not converge: mean distance ${before.toFixed(1)} → ${after.toFixed(1)}`,
  );
});
