"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/* ─── Trace content ──────────────────────────────────────────────
   Plausible traces from built-environment agents: building management
   systems, O&M handover documents, IFC model deltas, Irish/UK regulations.
   Generic "processing…" terminal filler is what makes most of these read as
   decoration; specificity is the whole point.
──────────────────────────────────────────────────────────────── */

type Kind = "agent" | "call" | "ret" | "ok" | "warn";
type Line = { kind: Kind; text: string };

const SCENARIOS: Line[][] = [
  [
    { kind: "agent", text: "agent:hvac-optimiser · Grand Canal Dock · 42 zones" },
    { kind: "call", text: "tool:bms.query window=24h metric=setpoint_delta" },
    { kind: "ret", text: "3 zones drifting >2.1°C · AHU-04 damper stuck 60%" },
    { kind: "call", text: "tool:cafm.draft_work_order priority=medium" },
    { kind: "ok", text: "WO-8814 queued · est. 4.1 MWh/mo recovered" },
  ],
  [
    { kind: "agent", text: "agent:doc-intel · O&M handover · 412pp" },
    { kind: "call", text: "tool:pdf.segment strategy=layout+ocr" },
    { kind: "ret", text: "1,204 assets extracted · 97.3% mean confidence" },
    { kind: "call", text: "tool:cobie.map schema=UK-2012" },
    { kind: "warn", text: "18 assets missing warranty dates · flagged to FM" },
  ],
  [
    { kind: "agent", text: "agent:clash-review · IFC delta · RIBA stage 4" },
    { kind: "call", text: "tool:ifc.diff base=rev_C head=rev_D" },
    { kind: "ret", text: "17 clashes · 3 critical (MEP × structure, L06)" },
    { kind: "call", text: "tool:coordination.notify disciplines=2" },
    { kind: "ok", text: "routed · re-check scheduled pre-issue" },
  ],
  [
    { kind: "agent", text: "agent:compliance · Part L · TGD 2022" },
    { kind: "call", text: "tool:rag.query corpus=ie_building_regs top_k=8" },
    { kind: "ret", text: "6 clauses affected by revised U-value limits" },
    { kind: "call", text: "tool:report.render format=pdf cite=inline" },
    { kind: "ok", text: "11pp issued · every claim source-linked" },
  ],
  [
    { kind: "agent", text: "agent:energy · portfolio · 34 assets IE/UK" },
    { kind: "call", text: "tool:meter.stream interval=15m" },
    { kind: "ret", text: "baseline drift on 4 sites · €18.2k/yr exposure" },
    { kind: "call", text: "tool:ticket.create owner=fm-lead sla=5d" },
    { kind: "ok", text: "escalated · payback modelled at 7 months" },
  ],
];

const PREFIX: Record<Kind, string> = {
  agent: "▸ ",
  call: "  → ",
  ret: "  ← ",
  ok: "  ✓ ",
  warn: "  ⚠ ",
};

const STYLE: Record<Kind, string> = {
  agent: "text-[#00D4FF] font-semibold",
  call: "text-[#7C3AED]",
  ret: "text-[#64748B]",
  ok: "text-[#10B981]",
  warn: "text-[#D9A441]",
};

const MAX_LINES = 9;
/** ms per character, by line kind — results land faster than agent headers. */
const CHAR_MS: Record<Kind, number> = { agent: 17, call: 11, ret: 9, ok: 13, warn: 13 };
const LINE_GAP = 260;
const SCENARIO_GAP = 1500;

export default function AgentTrace({ className = "" }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const [partial, setPartial] = useState<Line | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reduceMotion) {
      setLines(SCENARIOS[0]);
      setPartial(null);
      return;
    }

    let cancelled = false;
    const timers: ReturnType<typeof setTimeout>[] = [];
    const wait = (ms: number) =>
      new Promise<void>((resolve) => {
        timers.push(setTimeout(resolve, ms));
      });

    const run = async () => {
      let scenario = 0;

      while (!cancelled) {
        const script = SCENARIOS[scenario % SCENARIOS.length];

        for (const line of script) {
          if (cancelled) return;

          // Stream the line in, two characters at a time.
          for (let i = 0; i <= line.text.length; i += 2) {
            if (cancelled) return;
            setPartial({ kind: line.kind, text: line.text.slice(0, i) });
            await wait(CHAR_MS[line.kind]);
          }

          if (cancelled) return;
          setPartial(null);
          setLines((prev) => [...prev, line].slice(-MAX_LINES));

          // Tool calls pause longer before their result, as if actually working.
          await wait(line.kind === "call" ? LINE_GAP * 1.7 : LINE_GAP);
        }

        await wait(SCENARIO_GAP);
        scenario++;
      }
    };

    void run();

    return () => {
      cancelled = true;
      timers.forEach(clearTimeout);
    };
  }, [reduceMotion]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines, partial]);

  return (
    <div
      className={`glass rounded-2xl border border-[#00D4FF]/12 overflow-hidden flex flex-col ${className}`}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#00D4FF]/10 bg-[#0D1421]/60">
        <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
        <span className="text-xs font-mono text-[#94A3B8]">agent-runtime</span>
        <span className="text-xs font-mono text-[#334155] ml-auto tabular-nums">
          ie-dub-1 · 5 agents
        </span>
      </div>

      {/* Trace body */}
      <div
        ref={scrollRef}
        className="flex-1 min-h-[15rem] max-h-[15rem] overflow-hidden px-4 py-3 font-mono text-[11px] sm:text-xs leading-relaxed"
        aria-hidden
      >
        {lines.map((line, i) => (
          <div
            key={`${i}-${line.text}`}
            className={`${STYLE[line.kind]} whitespace-pre-wrap break-words animate-slide-up`}
          >
            {PREFIX[line.kind]}
            {line.text}
          </div>
        ))}

        {partial && (
          <div className={`${STYLE[partial.kind]} whitespace-pre-wrap break-words`}>
            {PREFIX[partial.kind]}
            {partial.text}
            <span className="inline-block w-1.5 h-3 bg-[#00D4FF] ml-0.5 translate-y-0.5 animate-pulse" />
          </div>
        )}
      </div>

      {/* Static equivalent for assistive tech and for search engines */}
      <p className="sr-only">
        Example traces from AI agents built for built-environment clients: an HVAC
        optimiser querying a building management system and raising work orders, a
        document-intelligence agent extracting assets from O&amp;M handover manuals into
        COBie, a clash-review agent diffing IFC model revisions, a compliance agent
        checking designs against Irish Part L regulations, and an energy agent
        monitoring a 34-asset portfolio across Ireland and the UK.
      </p>
    </div>
  );
}
