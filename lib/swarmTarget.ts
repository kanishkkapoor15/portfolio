/**
 * Minimal pub/sub so DOM components (nav links, cards) can re-target the WebGL
 * agent swarm without threading props through the tree or pulling in a store
 * library. `null` means "no external target — resume autonomous roaming".
 */

let current: number | null = null;
const subscribers = new Set<(target: number | null) => void>();

export function setSwarmTarget(target: number | null) {
  if (current === target) return;
  current = target;
  subscribers.forEach((fn) => fn(target));
}

export function getSwarmTarget() {
  return current;
}

export function subscribeSwarmTarget(fn: (target: number | null) => void) {
  subscribers.add(fn);
  return () => {
    subscribers.delete(fn);
  };
}
