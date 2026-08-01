# Kanishk Kapoor — Personal Portfolio

Personal site for an AI engineer working on agents for the built environment.
Built with **Next.js 16**, **React 19**, **TypeScript**, **Tailwind CSS v4**,
**Three.js** and **Framer Motion**.

**Live:** [kanishkkapoor.com](https://kanishkkapoor.com)

## The idea

The whole site is themed as a building's digital twin. Rather than the usual
floating-particle AI backdrop, the visuals borrow from how the industry actually
works: floor plans, reality-capture point clouds, IFC model deltas, building
management telemetry.

## Signature pieces

**Agent swarm** (`components/twin/AgentSwarm.tsx`)
Autonomous agents route through a procedurally generated floor plan behind the
hero. Rooms come from a BSP partition with punched doorways; navigation uses one
precomputed BFS distance field per room, so agents descend a gradient instead of
each running A\*, and re-targeting the entire swarm is a pointer swap. Trails are
a ping-pong FBO feedback buffer — the previous frame is fed back multiplied by a
decay constant, giving true long-exposure trails at a cost independent of agent
count. Hovering a nav link pulls the swarm toward that room.

**LiDAR scan** (`components/twin/LidarScan.tsx`)
A ~25k point scan-to-BIM style cloud that is nearly invisible until the cursor
sweeps it. The reveal runs in screen space so it reads as a torch over the model
regardless of rotation. Persistence comes from fourteen retained pointer samples
aged inside a uniform array, which avoids a per-point GPGPU memory buffer
entirely. Falls back to an automatic sweep when idle.

**Agent trace** (`components/twin/AgentTrace.tsx`)
Streaming traces from built-environment agents — BMS queries, COBie mapping, IFC
diffs, Part L compliance — with a static prose equivalent for assistive tech.

**Kinetic headings** (`components/KineticHeading.tsx`)
Inter is a variable font, so weight interpolates continuously: a wave of thinning
travels through each heading in the direction of scroll and settles back to solid.

**Survey cursor** (`components/SurveyCursor.tsx`)
Total-station reticle with crosshair, live coordinates, and a magnetic snap onto
interactive elements. Disabled on coarse pointers.

## Performance and accessibility

- Both WebGL contexts stop producing frames when off-screen or backgrounded
  (`lib/useRenderActive.ts` → R3F `frameloop`).
- The hero canvas mounts after first paint so it never competes with the LCP.
- Reduced agent counts, framebuffer sizes and DPR caps on mobile.
- Read-progress bar uses a native CSS `scroll()` timeline — compositor-driven,
  no scroll listener.
- `prefers-reduced-motion` is honoured in two layers: a blanket CSS stop, plus
  per-component guards so JS loops never start.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

```bash
npm run dev     # dev server
npm run build   # production build
npm run lint    # eslint
npm test        # headless simulation checks (node --test)
```

The simulation layers are deliberately free of React and Three.js so they can be
verified headlessly: `npm test` covers floor-plan connectivity, flow-field
reachability, agents never tunnelling through walls, swarm convergence, and point
cloud bounds and determinism.

## Deploy

Push to GitHub and import into [Vercel](https://vercel.com) — zero config,
`vercel.json` included.
