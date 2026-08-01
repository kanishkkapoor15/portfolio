import type { VizSpec } from "@/lib/research";

/**
 * Article figures. Deliberately server components: they render to static SVG
 * and markup so search engines read the numbers, and they animate through CSS
 * scroll timelines rather than JavaScript, which keeps them off the main
 * thread entirely.
 */

const TONE: Record<string, string> = {
  growth: "#2E8B4F",
  brass: "#C99A2E",
  clay: "#D06A45",
  slate: "#1E7A8C",
};

function Frame({ caption, unit, children }: { caption: string; unit?: string; children: React.ReactNode }) {
  return (
    <figure className="my-10 border-2 border-[#3A2E26] bg-[#FDFBF3] p-5 sm:p-7 shadow-[5px_5px_0_#2E8B4F]">
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2 border-b-2 border-[#EDE9DB] pb-3">
        <figcaption className="font-mono text-xs uppercase tracking-widest text-[#3A2E26]">
          {caption}
        </figcaption>
        {unit && <span className="font-mono text-[11px] text-[#776959]">{unit}</span>}
      </div>
      {children}
    </figure>
  );
}

/* ─── Before / after comparison ──────────────────────────────── */
function Compression({ spec }: { spec: Extract<VizSpec, { kind: "compression" }> }) {
  const max = Math.max(...spec.rows.map((r) => r.before));

  return (
    <Frame caption={spec.caption} unit={spec.unit}>
      <div className="flex flex-col gap-5">
        {spec.rows.map((row) => {
          const cut = Math.round(((row.before - row.after) / row.before) * 100);
          return (
            <div key={row.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-[#3A2E26]">{row.label}</span>
                <span className="font-mono text-xs tabular-nums text-[#776959]">
                  {row.before} → <span className="font-bold text-[#1F6B3B]">{row.after}</span>
                  <span className="ml-2 text-[#B0512E]">−{cut}%</span>
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <div
                  className="creep-on-scroll h-3 bg-[#D06A45]"
                  style={{ width: `${(row.before / max) * 100}%` }}
                />
                <div
                  className="creep-on-scroll h-3 bg-[#2E8B4F]"
                  style={{ width: `${Math.max((row.after / max) * 100, 0.6)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-5 flex gap-5 border-t-2 border-[#EDE9DB] pt-3 font-mono text-[11px] text-[#776959]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 bg-[#D06A45]" /> conventional
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-4 bg-[#2E8B4F]" /> agent-assisted
        </span>
      </div>
    </Frame>
  );
}

/* ─── Magnitude comparison, supports negatives ───────────────── */
function Stack({ spec }: { spec: Extract<VizSpec, { kind: "stack" }> }) {
  const values = spec.bars.map((b) => b.value);
  const max = Math.max(...values.map(Math.abs));
  const hasNegative = values.some((v) => v < 0);

  return (
    <Frame caption={spec.caption} unit={spec.unit}>
      <div className="flex flex-col gap-4">
        {spec.bars.map((bar) => {
          const negative = bar.value < 0;
          const width = (Math.abs(bar.value) / max) * (hasNegative ? 50 : 100);
          return (
            <div key={bar.label}>
              <div className="mb-1.5 flex items-baseline justify-between gap-3">
                <span className="text-sm font-medium text-[#3A2E26]">{bar.label}</span>
                <span className="font-mono text-xs font-bold tabular-nums text-[#3A2E26]">
                  {bar.value.toLocaleString()}
                </span>
              </div>
              <div className={`flex ${hasNegative ? "" : ""}`}>
                {hasNegative && (
                  <div className="flex w-1/2 justify-end">
                    {negative && (
                      <div
                        className="creep-on-scroll h-4 bg-[#D06A45]"
                        style={{ width: `${width * 2}%`, transformOrigin: "100% 50%" }}
                      />
                    )}
                  </div>
                )}
                <div className={hasNegative ? "w-1/2" : "w-full"}>
                  {!negative && (
                    <div
                      className="creep-on-scroll h-4"
                      style={{
                        width: `${hasNegative ? width * 2 : width}%`,
                        background: TONE[bar.tone ?? "growth"],
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Frame>
  );
}

/* ─── Series with a projected tail ───────────────────────────── */
function Curve({ spec }: { spec: Extract<VizSpec, { kind: "curve" }> }) {
  const W = 620;
  const H = 210;
  const PAD = { l: 8, r: 8, t: 14, b: 26 };
  const max = Math.max(...spec.points.map((p) => p.y));
  const n = spec.points.length;

  // `x` on the input is a label, so the plotted coordinate needs its own name.
  const xy = spec.points.map((p, i) => ({
    label: p.x,
    value: p.y,
    cx: PAD.l + (i / (n - 1)) * (W - PAD.l - PAD.r),
    cy: H - PAD.b - (p.y / max) * (H - PAD.t - PAD.b),
  }));

  const line = (pts: typeof xy) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"}${p.cx.toFixed(1)},${p.cy.toFixed(1)}`).join(" ");
  const solid = xy.slice(0, spec.projectFrom);
  const dashed = xy.slice(Math.max(0, spec.projectFrom - 1));
  const area = `${line(solid)} L${solid[solid.length - 1].cx.toFixed(1)},${H - PAD.b} L${xy[0].cx.toFixed(1)},${H - PAD.b} Z`;

  return (
    <Frame caption={spec.caption} unit={spec.unit}>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" role="img" aria-label={spec.caption}>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line
            key={f}
            x1={PAD.l}
            x2={W - PAD.r}
            y1={H - PAD.b - f * (H - PAD.t - PAD.b)}
            y2={H - PAD.b - f * (H - PAD.t - PAD.b)}
            stroke="#EDE9DB"
            strokeWidth="1.5"
          />
        ))}

        <path d={area} fill="#2E8B4F" opacity="0.13" />
        <path d={line(solid)} fill="none" stroke="#1F6B3B" strokeWidth="3" strokeLinecap="round" />
        {dashed.length > 1 && (
          <path
            d={line(dashed)}
            fill="none"
            stroke="#B0512E"
            strokeWidth="3"
            strokeDasharray="7 6"
            strokeLinecap="round"
          />
        )}

        {xy.map((p, i) => (
          <g key={p.label}>
            <circle
              cx={p.cx}
              cy={p.cy}
              r="4.5"
              fill={i < spec.projectFrom ? "#1F6B3B" : "#B0512E"}
              stroke="#FDFBF3"
              strokeWidth="2"
            />
            <text x={p.cx} y={p.cy - 11} textAnchor="middle" fontSize="12" fontWeight="700" fill="#3A2E26">
              {p.value.toLocaleString()}
            </text>
            <text x={p.cx} y={H - 8} textAnchor="middle" fontSize="11" fill="#776959">
              {p.label}
            </text>
          </g>
        ))}
      </svg>
      <div className="mt-3 flex gap-5 border-t-2 border-[#EDE9DB] pt-3 font-mono text-[11px] text-[#776959]">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 bg-[#1F6B3B]" /> observed range
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-0.5 w-5 border-t-2 border-dashed border-[#B0512E]" /> modelled projection
        </span>
      </div>
    </Frame>
  );
}

/* ─── Pipeline ───────────────────────────────────────────────── */
function Flow({ spec }: { spec: Extract<VizSpec, { kind: "flow" }> }) {
  return (
    <Frame caption={spec.caption}>
      <ol className="flex flex-col">
        {spec.steps.map((step, i) => (
          <li key={step.label} className="relative flex gap-4 pb-6 last:pb-0">
            {i < spec.steps.length - 1 && (
              <span className="absolute left-[15px] top-9 bottom-0 w-0.5 bg-[#2E8B4F]" aria-hidden />
            )}
            <span className="z-10 flex h-8 w-8 flex-none items-center justify-center border-2 border-[#3A2E26] bg-[#2E8B4F] font-mono text-xs font-bold text-[#FDFBF3]">
              {i + 1}
            </span>
            <div className="pt-0.5">
              <p className="font-semibold text-[#3A2E26]">{step.label}</p>
              <p className="mt-0.5 text-sm leading-relaxed text-[#6B5F54]">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </Frame>
  );
}

export default function Viz({ spec }: { spec: VizSpec }) {
  if (spec.kind === "compression") return <Compression spec={spec} />;
  if (spec.kind === "stack") return <Stack spec={spec} />;
  if (spec.kind === "curve") return <Curve spec={spec} />;
  return <Flow spec={spec} />;
}
