"use client";

import { useEffect, useRef, useState } from "react";

/**
 * A total-station style reticle: crosshair, live coordinate readout, and a
 * magnetic snap onto whatever interactive element is under the pointer.
 *
 * Everything is written straight to the DOM inside one rAF loop — no React
 * state per frame, so this costs nothing measurable even while WebGL is
 * running. Opt out entirely for coarse pointers and reduced-motion users.
 */

const SNAP_SELECTOR = "a, button, input, textarea, [data-cursor]";
const LERP_FREE = 0.34;
const LERP_SNAP = 0.22;

type Box = { x: number; y: number; w: number; h: number; r: number };

export default function SurveyCursor() {
  const [enabled, setEnabled] = useState(false);
  const frameRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const readoutRef = useRef<HTMLDivElement>(null);
  const hLineRef = useRef<HTMLDivElement>(null);
  const vLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const decide = () => setEnabled(fine.matches && !reduce.matches);
    decide();
    fine.addEventListener("change", decide);
    reduce.addEventListener("change", decide);
    return () => {
      fine.removeEventListener("change", decide);
      reduce.removeEventListener("change", decide);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const frame = frameRef.current;
    const dot = dotRef.current;
    const readout = readoutRef.current;
    const hLine = hLineRef.current;
    const vLine = vLineRef.current;
    if (!frame || !dot || !readout || !hLine || !vLine) return;

    const pointer = { x: innerWidth / 2, y: innerHeight / 2 };
    const current: Box = { x: pointer.x, y: pointer.y, w: 26, h: 26, r: 13 };
    let target: Box = { ...current };
    let snapped: Element | null = null;
    let visible = false;
    let raf = 0;

    document.documentElement.classList.add("survey-cursor-active");

    const labelFor = (el: Element) => {
      const tag = el.tagName.toLowerCase();
      const custom = el.getAttribute("data-cursor");
      if (custom) return custom;
      if (tag === "a") return (el as HTMLAnchorElement).hash ? "jump" : "open";
      if (tag === "button") return "select";
      if (tag === "input" || tag === "textarea") return "type";
      return "";
    };

    const setTarget = () => {
      if (snapped && document.contains(snapped)) {
        const r = snapped.getBoundingClientRect();
        // Snap to the element, padded slightly so the bracket frames it.
        target = {
          x: r.left + r.width / 2,
          y: r.top + r.height / 2,
          w: r.width + 14,
          h: r.height + 12,
          r: Math.min(16, r.height / 2 + 6),
        };
      } else {
        target = { x: pointer.x, y: pointer.y, w: 26, h: 26, r: 13 };
      }
    };

    const onMove = (e: PointerEvent) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;

      if (!visible) {
        visible = true;
        frame.style.opacity = "1";
        dot.style.opacity = "1";
        readout.style.opacity = "1";
        hLine.style.opacity = "1";
        vLine.style.opacity = "1";
      }

      const el = (e.target as Element | null)?.closest?.(SNAP_SELECTOR) ?? null;
      if (el !== snapped) {
        snapped = el;
        const label = el ? labelFor(el) : "";
        readout.dataset.label = label;
        frame.style.borderColor = el ? "rgba(47,139,79,0.85)" : "rgba(47,139,79,0.42)";
      }
      setTarget();

      readout.textContent = `${String(Math.round(e.clientX)).padStart(4, "0")} ${String(
        Math.round(e.clientY),
      ).padStart(4, "0")}${snapped ? `  ▸ ${readout.dataset.label}` : ""}`;
    };

    const onLeave = () => {
      visible = false;
      for (const el of [frame, dot, readout, hLine, vLine]) el.style.opacity = "0";
    };

    const tick = () => {
      setTarget();
      const k = snapped ? LERP_SNAP : LERP_FREE;
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      current.w += (target.w - current.w) * k;
      current.h += (target.h - current.h) * k;
      current.r += (target.r - current.r) * k;

      frame.style.transform = `translate3d(${current.x - current.w / 2}px, ${
        current.y - current.h / 2
      }px, 0)`;
      frame.style.width = `${current.w}px`;
      frame.style.height = `${current.h}px`;
      frame.style.borderRadius = `${current.r}px`;

      // The dot stays pinned to the true pointer so precision never suffers,
      // even while the frame is easing onto a target.
      dot.style.transform = `translate3d(${pointer.x - 1.5}px, ${pointer.y - 1.5}px, 0)`;
      hLine.style.transform = `translate3d(0, ${pointer.y}px, 0)`;
      vLine.style.transform = `translate3d(${pointer.x}px, 0, 0)`;
      readout.style.transform = `translate3d(${pointer.x + 16}px, ${pointer.y + 16}px, 0)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
      document.documentElement.classList.remove("survey-cursor-active");
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100]" aria-hidden>
      {/* Full-bleed crosshair — the survey-instrument read */}
      <div
        ref={hLineRef}
        className="absolute left-0 top-0 w-full h-px opacity-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(90deg, transparent, rgba(47,139,79,0.18) 30%, rgba(47,139,79,0.18) 70%, transparent)" }}
      />
      <div
        ref={vLineRef}
        className="absolute left-0 top-0 h-full w-px opacity-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(180deg, transparent, rgba(47,139,79,0.18) 30%, rgba(47,139,79,0.18) 70%, transparent)" }}
      />

      {/* Magnetic frame */}
      <div
        ref={frameRef}
        className="absolute left-0 top-0 border opacity-0 transition-[opacity,border-color] duration-300"
        style={{ borderColor: "rgba(47,139,79,0.42)", willChange: "transform,width,height" }}
      />

      {/* True-position dot */}
      <div
        ref={dotRef}
        className="absolute left-0 top-0 w-[3px] h-[3px] rounded-full bg-[#1F6B3B] opacity-0 transition-opacity duration-300"
        style={{ boxShadow: "0 0 8px rgba(47,139,79,0.9)" }}
      />

      {/* Coordinate readout */}
      <div
        ref={readoutRef}
        className="absolute left-0 top-0 font-mono text-[10px] tracking-wider text-[#1F6B3B]/70 opacity-0 transition-opacity duration-300 tabular-nums whitespace-pre"
      />
    </div>
  );
}
