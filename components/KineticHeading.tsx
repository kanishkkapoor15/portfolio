"use client";

import { useEffect, useMemo, useRef } from "react";
import { useScroll, useVelocity, useReducedMotion } from "framer-motion";

/**
 * Headings whose weight ripples with scroll velocity.
 *
 * Inter is a variable font, so `font-weight` interpolates continuously rather
 * than snapping between cut weights — a wave of thinning can travel through a
 * word as the page moves, and settle back to solid when it stops.
 *
 * Per-character weights are written straight to cached DOM nodes inside one
 * rAF loop, and the loop parks itself when the heading is off-screen or the
 * page is still. No React state changes while animating.
 */

export type HeadingPart = { text: string; className?: string };

const REST_WEIGHT = 800;
const MIN_WEIGHT = 420;
/** Scroll speed (px/s) at which the ripple reaches full depth. */
const VELOCITY_FULL = 1600;

export default function KineticHeading({
  parts,
  className = "",
  id,
}: {
  parts: HeadingPart[];
  className?: string;
  id?: string;
}) {
  const reduceMotion = useReducedMotion();
  const hostRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);

  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);

  const plain = useMemo(() => parts.map((p) => p.text).join(""), [parts]);

  useEffect(() => {
    if (reduceMotion) return;
    const host = hostRef.current;
    const chars = charsRef.current.filter(Boolean);
    if (!host || chars.length === 0) return;

    let raf = 0;
    let onScreen = false;
    let amp = 0;
    let phase = 0;
    let settled = false;

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen && !raf) raf = requestAnimationFrame(tick);
      },
      { rootMargin: "120px" },
    );
    io.observe(host);

    function tick() {
      const v = velocity.get();
      const targetAmp = Math.min(1, Math.abs(v) / VELOCITY_FULL);

      // Rise quickly with the scroll, fall back slowly so the wave has a tail.
      amp += (targetAmp - amp) * (targetAmp > amp ? 0.25 : 0.06);
      // The ripple travels in whichever direction the page is moving.
      phase += (v >= 0 ? 1 : -1) * (0.06 + amp * 0.34);

      const depth = amp * (REST_WEIGHT - MIN_WEIGHT);

      if (depth < 1.5) {
        // Settle exactly once, then idle without touching the DOM again.
        if (!settled) {
          for (const el of chars) el.style.fontWeight = String(REST_WEIGHT);
          settled = true;
        }
        if (!onScreen) {
          raf = 0;
          return;
        }
        raf = requestAnimationFrame(tick);
        return;
      }

      settled = false;
      for (let i = 0; i < chars.length; i++) {
        const wave = 0.5 + 0.5 * Math.sin(phase + i * 0.5);
        chars[i].style.fontWeight = String(Math.round(REST_WEIGHT - depth * wave));
      }

      raf = onScreen || amp > 0.02 ? requestAnimationFrame(tick) : 0;
    }

    raf = requestAnimationFrame(tick);

    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }, [reduceMotion, velocity]);

  if (reduceMotion) {
    return (
      <h2 id={id} className={className}>
        {parts.map((p, i) => (
          <span key={i} className={p.className}>
            {p.text}
          </span>
        ))}
      </h2>
    );
  }

  charsRef.current = [];
  let charIndex = 0;

  return (
    <h2 id={id} ref={hostRef} className={className} aria-label={plain}>
      {parts.map((part, pi) => (
        <span key={pi} className={part.className} aria-hidden>
          {/* Split on words first so wrapping still happens at word boundaries. */}
          {part.text.split(/(\s+)/).map((chunk, ci) =>
            /^\s+$/.test(chunk) ? (
              <span key={ci}>{" "}</span>
            ) : (
              <span key={ci} style={{ display: "inline-block", whiteSpace: "nowrap" }}>
                {[...chunk].map((ch) => {
                  const idx = charIndex++;
                  return (
                    <span
                      key={idx}
                      ref={(el) => {
                        if (el) charsRef.current[idx] = el;
                      }}
                      style={{ display: "inline-block", fontWeight: REST_WEIGHT }}
                    >
                      {ch}
                    </span>
                  );
                })}
              </span>
            ),
          )}
        </span>
      ))}
    </h2>
  );
}
