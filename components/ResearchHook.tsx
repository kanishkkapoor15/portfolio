"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight } from "lucide-react";
import { getArticle, DOMAIN_TONE } from "@/lib/research";

/**
 * A full-bleed hook strip placed between sections. Leads with the single
 * hardest number in the article rather than a generic "read more", because the
 * number is what earns the click.
 */
export default function ResearchHook({
  slug,
  kicker,
  variant = "verdant",
}: {
  slug: string;
  kicker: string;
  variant?: "verdant" | "clay" | "soil";
}) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  const article = getArticle(slug);
  if (!article) return null;

  const tone = DOMAIN_TONE[article.domain];
  const bg = variant === "clay" ? "#D06A45" : variant === "soil" ? "#3A2E26" : "#2E8B4F";
  const ink = variant === "soil" ? "#F6F4EC" : "#FDFBF3";
  const lead = article.metrics[0];

  return (
    <section
      ref={ref}
      className="lattice relative overflow-hidden border-y-4 border-[#3A2E26] px-4 py-12 sm:px-6"
      style={{ background: bg }}
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, type: "spring", stiffness: 70 }}
        className="mx-auto flex max-w-6xl flex-col items-start gap-7 lg:flex-row lg:items-center lg:justify-between"
      >
        <div className="flex items-center gap-6">
          {/* The number does the selling */}
          <div
            className="flex-none border-2 px-5 py-3"
            style={{ borderColor: ink, background: "rgba(253,251,243,0.1)" }}
          >
            <p className="font-mono text-3xl font-extrabold leading-none sm:text-4xl" style={{ color: ink }}>
              {lead.value}
            </p>
            <p className="mt-1.5 font-mono text-[11px] uppercase tracking-widest" style={{ color: ink, opacity: 0.8 }}>
              {lead.label}
            </p>
          </div>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: ink, opacity: 0.75 }}>
              {kicker}
            </p>
            <p
              className="mt-2 max-w-xl text-xl font-extrabold leading-tight tracking-tight sm:text-2xl"
              style={{ color: ink }}
            >
              {article.title}
            </p>
          </div>
        </div>

        <Link
          href={`/research/${slug}`}
          className="group inline-flex flex-none items-center gap-2 border-2 border-[#3A2E26] bg-[#FDFBF3] px-6 py-3.5 font-mono font-bold text-[#3A2E26] shadow-[5px_5px_0_#3A2E26] transition-transform hover:-translate-x-1 hover:-translate-y-1"
          style={{ color: tone.text }}
        >
          Read the breakdown
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </motion.div>
    </section>
  );
}
