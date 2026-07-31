"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, MapPin, ArrowDown, Activity } from "lucide-react";
import { useRenderActive } from "@/lib/useRenderActive";

/* Load the WebGL swarm only on the client, and only after the headline has
   painted — the hero text is the LCP and must never wait on a shader. */
const AgentSwarm = dynamic(() => import("./twin/AgentSwarm"), {
  ssr: false,
  loading: () => null,
});

/* ─── Constants ──────────────────────────────────────────────── */
const STREAM_TEXT =
  "Building production LLM pipelines, agentic AI systems, and real-time data infrastructure at scale.";

const metrics = [
  { label: "Model",       value: "GPT-4o",  color: "text-[#1F6B3B]", pulse: false, delay: 1.6 },
  { label: "Pipeline",    value: "LIVE",    color: "text-[#1E7A8C]", pulse: true,  delay: 1.9 },
  { label: "Records/day", value: "5M+",     color: "text-[#B0512E]", pulse: false, delay: 2.2 },
  { label: "Uptime",      value: "99.9%",   color: "text-[#1F6B3B]", pulse: false, delay: 2.5 },
];

const stats = [
  { value: "30+", label: "Projects",         color: "text-[#1F6B3B]" },
  { value: "2",   label: "Internships",       color: "text-[#B0512E]" },
  { value: "5M+", label: "Records Processed", color: "text-[#1E7A8C]" },
  { value: "1:1", label: "Expected MSc",      color: "text-[#1F6B3B]" },
];

/* ─── Component ──────────────────────────────────────────────── */
export default function Hero() {
  const [displayed, setDisplayed]   = useState("");
  const [streamDone, setStreamDone] = useState(false);
  const [swarmReady, setSwarmReady] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  // Stop producing frames once the hero has scrolled away.
  const { ref: activeRef, active } = useRenderActive<HTMLDivElement>();

  /* Cinematic parallax on scroll */
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const contentY       = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const sphereScale    = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
  const sphereOpacity  = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  /* Defer the canvas past first paint so it never competes with the LCP. */
  useEffect(() => {
    const id = window.setTimeout(() => setSwarmReady(true), 200);
    return () => window.clearTimeout(id);
  }, []);

  /* LLM-style token streaming */
  useEffect(() => {
    if (reduceMotion) {
      setDisplayed(STREAM_TEXT);
      setStreamDone(true);
      return;
    }
    let i = 0;
    let timeout: ReturnType<typeof setTimeout>;
    const type = () => {
      if (i < STREAM_TEXT.length) {
        setDisplayed(STREAM_TEXT.slice(0, i + 1));
        i++;
        timeout = setTimeout(type, 16 + Math.random() * 26);
      } else {
        setStreamDone(true);
      }
    };
    timeout = setTimeout(type, 1200);
    return () => clearTimeout(timeout);
  }, [reduceMotion]);

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F6F4EC]"
    >
      {/* ── Agent swarm over a procedural floor plan ── */}
      <motion.div
        style={{ scale: sphereScale, opacity: sphereOpacity }}
        className="absolute inset-0"
        aria-hidden
      >
        <div ref={activeRef} className="absolute inset-0">
          {swarmReady && <AgentSwarm paused={!!reduceMotion} active={active} />}
        </div>
      </motion.div>

      {/* Vignette so the headline always wins against the trails behind it */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 62% 52% at 50% 45%, rgba(246,244,236,0.94) 0%, rgba(246,244,236,0.72) 46%, rgba(246,244,236,0) 100%)",
        }}
      />

      {/* ── Ambient glow blobs (show through transparent canvas) ── */}
      <div className="section-blob w-[700px] h-[700px] bg-[#1F6B3B] -top-60 -left-60 opacity-[0.05]" />
      <div className="section-blob w-[600px] h-[600px] bg-[#B0512E] -top-20 -right-40 opacity-[0.05]" />
      <div className="section-blob w-[500px] h-[500px] bg-[#1E7A8C] bottom-0 left-1/3 opacity-[0.04]" />

      {/* ── Floating metric cards ── */}
      {metrics.map((m, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: m.delay, duration: 0.5, type: "spring" }}
          className="hidden lg:flex absolute items-center gap-2 px-3 py-2 rounded-xl glass border border-[#1F6B3B]/15 text-xs font-mono shadow-lg animate-float"
          style={{
            animationDelay: `${i * 0.9}s`,
            ...(i === 0 ? { left: "4%",  top: "22%" }
              : i === 1 ? { right: "4%", top: "18%" }
              : i === 2 ? { left: "3%",  bottom: "30%" }
              : { right: "3%",           bottom: "26%" }),
          }}
        >
          <Activity className="w-3 h-3 text-[#1F6B3B]" />
          <span className="text-[#776959]">{m.label}:</span>
          <span className={`font-bold ${m.color}`}>
            {m.value}
            {m.pulse && (
              <span className="ml-1 inline-block w-1.5 h-1.5 rounded-full bg-[#1E7A8C] animate-pulse" />
            )}
          </span>
        </motion.div>
      ))}

      {/* ── Main content ── */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#1F6B3B]/20 mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[#1E7A8C] animate-pulse" />
          <span className="text-sm text-[#6B5F54] font-medium font-mono">
            Available for opportunities · Dublin, Ireland
          </span>
          <MapPin className="w-3.5 h-3.5 text-[#776959]" />
        </motion.div>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="display text-5xl sm:text-7xl lg:text-8xl mb-5 text-[#3A2E26]"
        >
          Hi, I&apos;m{" "}
          <span className="shimmer-text">Kanishk Kapoor</span>
        </motion.h1>

        {/* Role typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="text-xl sm:text-2xl lg:text-3xl font-semibold mb-6 h-10 sm:h-12 flex items-center justify-center font-mono"
        >
          <span className="text-[#1F6B3B]/50 mr-2">$</span>
          <TypeAnimation
            sequence={[
              "AI Developer",              2000,
              "Data Engineer",             2000,
              "LLM / Agentic AI Builder",  2000,
              "ML Engineer",               2000,
              "Software Engineer",         2000,
            ]}
            wrapper="span"
            speed={55}
            repeat={Infinity}
            className="bg-gradient-to-r from-[#1F6B3B] via-[#B0512E] to-[#1E7A8C] bg-clip-text text-transparent"
          />
          <span className="ml-1 inline-block w-0.5 h-7 bg-[#1F6B3B] animate-pulse" />
        </motion.div>

        {/* Streaming bio */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.9 }}
          className="text-base sm:text-lg text-[#6B5F54] max-w-2xl mx-auto mb-10 leading-relaxed min-h-[3rem] font-mono"
        >
          <span className="text-[#1F6B3B]/50 mr-1">{"// "}</span>
          <span className="text-[#6B5F54]">{displayed}</span>
          {!streamDone && (
            <span className="inline-block w-0.5 h-4 bg-[#1F6B3B] animate-pulse ml-0.5 translate-y-0.5" />
          )}
        </motion.div>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl bg-gradient-to-r from-[#1F6B3B] via-[#B0512E] to-[#1E7A8C] text-white font-semibold shadow-xl neon-cyan animate-gradient text-sm sm:text-base"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 sm:px-8 py-3 sm:py-3.5 rounded-xl glass border border-[#1F6B3B]/30 text-[#1F6B3B] font-semibold hover:border-[#1F6B3B]/60 hover:bg-[#1F6B3B]/5 transition-all text-sm sm:text-base"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.95 }}
          className="flex items-center justify-center gap-4 mb-10 sm:mb-14"
        >
          {[
            { icon: Github,   href: "https://github.com/kanishkkapoor15",   label: "GitHub"   },
            { icon: Linkedin, href: "https://linkedin.com/in/kanishkapoor", label: "LinkedIn" },
            { icon: Mail,     href: "mailto:kanishkkapoor15@gmail.com",     label: "Email"    },
          ].map(({ icon: Icon, href, label }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.12, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="p-3 rounded-xl glass border border-[#1F6B3B]/15 text-[#6B5F54] hover:text-[#1F6B3B] hover:border-[#1F6B3B]/45 transition-all"
              aria-label={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.15 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.06, y: -4 }}
              className="glass rounded-2xl p-4 border border-[#1F6B3B]/10 hover:border-[#1F6B3B]/35 transition-all cursor-default"
            >
              <div className={`text-2xl font-extrabold font-mono ${stat.color}`}>
                {stat.value}
              </div>
              <div className="text-xs text-[#776959] mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-1 text-[#776959]"
        >
          <span className="text-xs font-mono">scroll</span>
          <ArrowDown className="w-4 h-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}
