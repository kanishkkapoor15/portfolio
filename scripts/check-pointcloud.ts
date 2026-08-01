/**
 * Headless verification of the scan point cloud.
 *   node --test scripts/check-pointcloud.ts
 */

import test from "node:test";
import assert from "node:assert/strict";

import { generateBuilding, DEFAULT_BUILDING } from "../lib/pointcloud.ts";

test("cloud is dense enough to read as a scan but light enough to ship", () => {
  const c = generateBuilding();
  assert.ok(c.count > 8_000, `too sparse: ${c.count} points`);
  assert.ok(c.count < 60_000, `too heavy for a background element: ${c.count} points`);
  assert.equal(c.positions.length, c.count * 3);
  assert.equal(c.kinds.length, c.count);
  assert.equal(c.sizes.length, c.count);
});

test("all four structural channels are represented", () => {
  const c = generateBuilding();
  const seen = new Set<number>();
  for (const k of c.kinds) seen.add(k);
  assert.deepEqual([...seen].sort(), [0, 1, 2, 3], "expected slab, column, facade and services points");
});

test("geometry is finite and inside the declared envelope", () => {
  const spec = DEFAULT_BUILDING;
  const c = generateBuilding(spec);

  const maxX = spec.width / 2 + 0.3;
  const maxZ = spec.depth / 2 + 0.3;
  const maxY = (spec.floors * spec.floorHeight) / 2 + 0.3;

  for (let i = 0; i < c.count; i++) {
    const x = c.positions[i * 3];
    const y = c.positions[i * 3 + 1];
    const z = c.positions[i * 3 + 2];
    assert.ok(Number.isFinite(x) && Number.isFinite(y) && Number.isFinite(z), "non-finite point");
    assert.ok(Math.abs(x) <= maxX, `x out of envelope: ${x}`);
    assert.ok(Math.abs(z) <= maxZ, `z out of envelope: ${z}`);
    assert.ok(Math.abs(y) <= maxY, `y out of envelope: ${y}`);
  }

  for (const s of c.sizes) assert.ok(s > 0 && s < 5, `implausible point size ${s}`);
});

test("thermal channel is in range and models envelope loss", () => {
  const c = generateBuilding();
  assert.equal(c.thermals.length, c.count);

  let facadeSum = 0, facadeN = 0, coreSum = 0, coreN = 0;
  for (let i = 0; i < c.count; i++) {
    const t = c.thermals[i];
    assert.ok(t >= 0 && t <= 1, `thermal out of range: ${t}`);
    if (c.kinds[i] === 2) { facadeSum += t; facadeN++; }
    if (c.kinds[i] === 3) { coreSum += t; coreN++; }
  }

  const facade = facadeSum / facadeN;
  const core = coreSum / coreN;
  assert.ok(
    facade > core * 1.8,
    `envelope should lose far more heat than interior scatter: ${facade.toFixed(2)} vs ${core.toFixed(2)}`,
  );
});

test("generation is deterministic for a given seed", () => {
  const a = generateBuilding({ ...DEFAULT_BUILDING, seed: 42 });
  const b = generateBuilding({ ...DEFAULT_BUILDING, seed: 42 });
  assert.equal(a.count, b.count);
  assert.deepEqual(Array.from(a.positions.slice(0, 300)), Array.from(b.positions.slice(0, 300)));
});
