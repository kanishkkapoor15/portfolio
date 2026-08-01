"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowRight, FlaskConical } from "lucide-react";
import { ARTICLES, DOMAIN_TONE } from "@/lib/research";

/**
 * A slide-in card offering the most relevant article.
 *
 * Deliberately restrained, because the failure mode of this pattern is
 * annoying the exact person you wanted to reach:
 *   - waits for real engagement (40% scroll depth) rather than a timer on load
 *   - one card per session, and a dismissal is remembered for a week
 *   - never appears twice, never re-opens after being closed
 *   - no motion for reduced-motion users, and it is keyboard dismissible
 */

const STORAGE_KEY = "kk:research-peek-dismissed";
const DISMISS_DAYS = 7;
const SCROLL_TRIGGER = 0.4;

export default function ResearchPeek() {
  const reduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [article] = useState(() => ARTICLES[0]);

  useEffect(() => {
    // Respect a previous dismissal.
    try {
      const until = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
      if (Date.now() < until) return;
    } catch {
      // Private browsing or storage disabled: fall through and behave normally.
    }

    let shown = false;
    const check = () => {
      if (shown) return;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) return;
      if (window.scrollY / max >= SCROLL_TRIGGER) {
        shown = true;
        setVisible(true);
        window.removeEventListener("scroll", check);
      }
    };

    window.addEventListener("scroll", check, { passive: true });
    // Also check once on mount: someone arriving on a deep link such as
    // /#contact starts past the trigger and may never fire a scroll event.
    const initial = window.setTimeout(check, 1200);

    return () => {
      window.clearTimeout(initial);
      window.removeEventListener("scroll", check);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, String(Date.now() + DISMISS_DAYS * 864e5));
    } catch {
      // Nothing to do; the card simply reappears next session.
    }
  };

  useEffect(() => {
    if (!visible) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [visible]);

  const tone = DOMAIN_TONE[article.domain];

  return (
    <AnimatePresence>
      {visible && (
        <motion.aside
          initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 40, x: 20 }}
          animate={reduceMotion ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
          exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.45, type: "spring", stiffness: 90, damping: 16 }}
          role="complementary"
          aria-label="Suggested research reading"
          className="fixed bottom-4 right-4 left-4 z-[90] max-w-sm border-2 border-[#3A2E26] bg-[#FDFBF3] p-5 sm:left-auto sm:bottom-6 sm:right-6"
          style={{ boxShadow: `6px 6px 0 ${tone.fill}` }}
        >
          <button
            onClick={dismiss}
            aria-label="Dismiss reading suggestion"
            className="absolute right-2 top-2 border-2 border-transparent p-1.5 text-[#776959] transition-colors hover:border-[#3A2E26] hover:text-[#3A2E26]"
          >
            <X className="h-4 w-4" />
          </button>

          <p
            className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest"
            style={{ color: tone.text }}
          >
            <FlaskConical className="h-3.5 w-3.5" /> From the research
          </p>

          <p className="mt-3 text-lg font-extrabold leading-tight tracking-tight text-[#3A2E26]">
            {article.title}
          </p>

          <div className="mt-4 flex gap-4 border-t-2 border-[#EDE9DB] pt-3">
            {article.metrics.slice(0, 2).map((m) => (
              <div key={m.label}>
                <p className="font-mono text-sm font-bold" style={{ color: tone.text }}>
                  {m.value}
                </p>
                <p className="text-[11px] leading-tight text-[#776959]">{m.label}</p>
              </div>
            ))}
          </div>

          <Link
            href={`/research/${article.slug}`}
            onClick={dismiss}
            className="group mt-4 inline-flex items-center gap-2 border-2 border-[#3A2E26] px-4 py-2.5 font-mono text-sm font-bold text-[#FDFBF3] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5"
            style={{ background: tone.fill }}
          >
            Read it
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
