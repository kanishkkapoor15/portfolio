"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, ArrowLeft, FlaskConical } from "lucide-react";
import { ARTICLES, DOMAIN_TONE } from "@/lib/research";
import KineticHeading from "./KineticHeading";

export default function Research() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const trackRef = useRef<HTMLDivElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    setAtStart(el.scrollLeft < 8);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 8);
  };

  const nudge = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // One card plus the gap, so the carousel always lands on a card edge.
    el.scrollBy({ left: dir * (el.clientWidth * 0.82), behavior: "smooth" });
  };

  return (
    <section
      id="research"
      ref={ref}
      className="relative overflow-hidden bg-[#FDFBF3] py-16 px-4 sm:px-6 sm:py-24"
    >
      <div className="section-blob h-96 w-96 bg-[#C99A2E] -top-20 right-0" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="mb-10 flex flex-wrap items-end justify-between gap-6"
        >
          <div>
            <span className="glass mb-4 inline-flex items-center gap-2 rounded-none border-2 border-[#1F6B3B] px-4 py-1.5 font-mono text-sm font-semibold text-[#1F6B3B]">
              <FlaskConical className="h-4 w-4" /> Research
            </span>
            <KineticHeading
              className="display text-5xl text-[#3A2E26] sm:text-7xl"
              parts={[
                { text: "Field notes on " },
                {
                  text: "agentic AI",
                  className:
                    "bg-gradient-to-r from-[#1F6B3B] to-[#B0512E] bg-clip-text text-transparent",
                },
              ]}
            />
            <p className="mt-5 max-w-xl text-lg text-[#6B5F54]">
              Quantified models of where agents change the economics of development, design and
              construction across Ireland and the UK.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => nudge(-1)}
              disabled={atStart}
              aria-label="Previous articles"
              className="border-2 border-[#3A2E26] bg-[#F6F4EC] p-3 text-[#3A2E26] transition-all hover:bg-[#2E8B4F] hover:text-[#FDFBF3] disabled:opacity-30 disabled:hover:bg-[#F6F4EC] disabled:hover:text-[#3A2E26]"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => nudge(1)}
              disabled={atEnd}
              aria-label="Next articles"
              className="border-2 border-[#3A2E26] bg-[#F6F4EC] p-3 text-[#3A2E26] transition-all hover:bg-[#2E8B4F] hover:text-[#FDFBF3] disabled:opacity-30 disabled:hover:bg-[#F6F4EC] disabled:hover:text-[#3A2E26]"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>

        {/* Carousel */}
        <div
          ref={trackRef}
          onScroll={onScroll}
          className="-mx-4 flex snap-x snap-mandatory gap-6 overflow-x-auto px-4 pb-6 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {ARTICLES.map((a, i) => {
            const tone = DOMAIN_TONE[a.domain];
            return (
              <motion.div
                key={a.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="w-[85vw] flex-none snap-start sm:w-[400px]"
              >
                <Link
                  href={`/research/${a.slug}`}
                  className="group flex h-full flex-col border-2 border-[#3A2E26] bg-[#FDFBF3] p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
                  style={{ boxShadow: `5px 5px 0 ${tone.fill}` }}
                >
                  <div className="mb-4 flex items-center gap-2">
                    <span className="h-3 w-3 flex-none" style={{ background: tone.fill }} />
                    <span
                      className="font-mono text-[11px] uppercase tracking-widest"
                      style={{ color: tone.text }}
                    >
                      {a.domain}
                    </span>
                  </div>

                  <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-[#3A2E26]">
                    {a.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-[#6B5F54]">{a.dek}</p>

                  <div className="mt-5 grid grid-cols-3 gap-3 border-t-2 border-[#EDE9DB] pt-4">
                    {a.metrics.map((m) => (
                      <div key={m.label}>
                        <p className="font-mono text-sm font-bold" style={{ color: tone.text }}>
                          {m.value}
                        </p>
                        <p className="mt-0.5 text-[11px] leading-tight text-[#776959]">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#3A2E26]">
                    {a.readingMinutes} min read
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Index link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8"
        >
          <Link
            href="/research"
            className="inline-flex items-center gap-2 border-2 border-[#3A2E26] bg-[#2E8B4F] px-6 py-3.5 font-mono font-bold text-[#FDFBF3] shadow-[5px_5px_0_#3A2E26] transition-transform hover:-translate-x-1 hover:-translate-y-1"
          >
            All research <ArrowRight className="h-4 w-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
