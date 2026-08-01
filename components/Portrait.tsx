"use client";

import { useState } from "react";
import Image from "next/image";

/**
 * Portrait treated as a plate in a drafting set rather than a stock headshot:
 * hard border, offset shadow, survey ticks and a caption strip. The image is
 * warmed and its contrast lifted so it sits inside the RETROFIT palette
 * instead of floating on top of it as a cold rectangle.
 *
 * Falls back to a monogram block if the file is missing, so a missing asset
 * degrades rather than breaking the section.
 */

export const PORTRAIT_SRC = "/kanishk-kapoor.jpg";

export default function Portrait({ className = "" }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  return (
    <figure className={`relative ${className}`}>
      {/* Offset block, the theme's hard shadow */}
      <div
        className="absolute inset-0 translate-x-3 translate-y-3 bg-[#2E8B4F]"
        aria-hidden
      />

      <div className="relative border-2 border-[#3A2E26] bg-[#EDE9DB] overflow-hidden">
        {failed ? (
          <div className="flex aspect-square w-full items-center justify-center bg-[#2E8B4F]">
            <span className="font-mono text-6xl font-extrabold text-[#FDFBF3]">KK</span>
          </div>
        ) : (
          <>
            <Image
              src={PORTRAIT_SRC}
              alt="Kanishk Kapoor, Technical Accounts Manager at AI Institute, Dublin"
              width={634}
              height={634}
              priority={false}
              onError={() => setFailed(true)}
              className="block aspect-square w-full object-cover"
              style={{ filter: "sepia(0.14) saturate(1.05) contrast(1.06) brightness(1.02)" }}
            />

            {/* Warm wash so the photo shares the page's light */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: "linear-gradient(150deg, #C99A2E 0%, transparent 45%, #2E8B4F 100%)", opacity: 0.42 }}
              aria-hidden
            />

            {/* Plaster tooth, so it reads as printed rather than photographic */}
            <div
              className="pointer-events-none absolute inset-0 mix-blend-multiply"
              style={{
                backgroundImage: "radial-gradient(rgba(58,46,38,0.55) 0.5px, transparent 0.5px)",
                backgroundSize: "4px 4px",
                opacity: 0.22,
              }}
              aria-hidden
            />
          </>
        )}

        {/* Survey ticks */}
        {[
          "top-2 left-2 border-l-2 border-t-2",
          "top-2 right-2 border-r-2 border-t-2",
          "bottom-2 left-2 border-l-2 border-b-2",
          "bottom-2 right-2 border-r-2 border-b-2",
        ].map((cls) => (
          <span
            key={cls}
            className={`pointer-events-none absolute h-5 w-5 border-[#FDFBF3]/80 ${cls}`}
            aria-hidden
          />
        ))}
      </div>

      {/* Caption strip, drawing-sheet style */}
      <figcaption className="relative mt-3 flex items-center justify-between border-2 border-[#3A2E26] bg-[#FDFBF3] px-3 py-2 font-mono text-[11px]">
        <span className="font-bold uppercase tracking-widest text-[#3A2E26]">K. Kapoor</span>
        <span className="text-[#776959]">Dublin, IE · 53.3498° N</span>
      </figcaption>
    </figure>
  );
}
