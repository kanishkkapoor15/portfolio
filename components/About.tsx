"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  GraduationCap, MapPin, Briefcase, Bot, BrainCircuit,
  Workflow, Cloud, BarChart2, FlaskConical, Gamepad2,
  Globe, MapPinned, Code2, Coffee,
} from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "MSc Computing (Data Analytics)",
    subtitle: "Dublin City University · 1:1 Expected · 2025–Present",
    color: "from-[#00D4FF] to-[#7C3AED]",
    glow: "rgba(0,212,255,0.2)",
  },
  {
    icon: GraduationCap,
    title: "B.Tech Computer Science",
    subtitle: "UPES · CGPA 8.7/10 · 2020–2024",
    color: "from-[#7C3AED] to-[#10B981]",
    glow: "rgba(124,58,237,0.2)",
  },
  {
    icon: Briefcase,
    title: "AI Automation Intern",
    subtitle: "Medicidiom, Spain (Remote) · Feb 2026–Present",
    color: "from-[#10B981] to-[#00D4FF]",
    glow: "rgba(16,185,129,0.2)",
  },
  {
    icon: MapPin,
    title: "Based in Dublin, Ireland",
    subtitle: "Open to remote & on-site opportunities",
    color: "from-[#00D4FF] to-[#7C3AED]",
    glow: "rgba(0,212,255,0.2)",
  },
];

const interests = [
  { label: "Agentic AI Systems",       icon: Bot },
  { label: "Large Language Models",    icon: BrainCircuit },
  { label: "Real-time Data Pipelines", icon: Workflow },
  { label: "Cloud Architecture",       icon: Cloud },
  { label: "Business Intelligence",    icon: BarChart2 },
  { label: "ML Research",              icon: FlaskConical },
  { label: "Gaming",                   icon: Gamepad2 },
  { label: "Travelling",               icon: Globe },
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section
      id="about"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#080F1A]"
    >
      <div className="section-blob w-96 h-96 bg-[#7C3AED] -top-20 -right-20" />
      <div className="section-blob w-72 h-72 bg-[#00D4FF] bottom-0 left-0" />

      {/* Subtle grid */}
      <div className="absolute inset-0 data-grid opacity-60" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-semibold font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00D4FF] animate-pulse" />
            About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F0F6FF] mb-4">
            Who I{" "}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent">
              Am
            </span>
          </h2>
          <p className="text-[#64748B] max-w-2xl mx-auto text-lg">
            A technologist bridging cutting-edge AI research and production-grade engineering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – Bio */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 70 }}
          >
            <div className="relative">
              <div className="absolute -inset-px rounded-3xl bg-gradient-to-br from-[#00D4FF]/20 to-[#7C3AED]/20" />
              <div className="relative glass rounded-3xl p-5 sm:p-8 shadow-xl border border-[#00D4FF]/12">
                <p className="text-[#94A3B8] leading-relaxed text-base sm:text-lg mb-6">
                  I&apos;m an{" "}
                  <span className="font-semibold text-[#00D4FF]">AI Developer & Data Engineer</span>{" "}
                  currently pursuing my MSc Computing (Data Analytics) at{" "}
                  <span className="font-semibold text-[#F0F6FF]">Dublin City University</span>,
                  expecting a 1:1 (First Class Honours).
                </p>
                <p className="text-[#94A3B8] leading-relaxed text-base sm:text-lg mb-6">
                  I specialise in building{" "}
                  <span className="font-semibold text-[#7C3AED]">LLM-powered agentic systems</span>,
                  production ML pipelines, and real-time data infrastructure using OpenAI API,
                  LangChain, Apache Kafka, Azure, and AWS. I&apos;ve shipped 30+ projects across
                  FinTech, healthcare, energy, and logistics.
                </p>
                <p className="text-[#94A3B8] leading-relaxed text-base sm:text-lg">
                  Currently interning at{" "}
                  <span className="font-semibold text-[#F0F6FF]">Medicidiom (Spain, Remote)</span>{" "}
                  — building production AI automation workflows that process 1,000+ documents with
                  25% accuracy gains and 35% reduction in manual review.
                </p>

                {/* Interests */}
                <div className="mt-6">
                  <p className="text-xs font-semibold text-[#475569] uppercase tracking-widest mb-3 font-mono">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => {
                      const Icon = interest.icon;
                      return (
                        <span
                          key={interest.label}
                          className="skill-tag inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium"
                        >
                          <Icon className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" />
                          {interest.label}
                        </span>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 70 }}
            className="flex flex-col gap-4"
          >
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                  whileHover={{ scale: 1.02, x: 6 }}
                  className="glass rounded-2xl p-5 border border-[#00D4FF]/10 hover:border-[#00D4FF]/30 flex items-center gap-5 cursor-default transition-all"
                  style={{ boxShadow: `0 0 0 0 ${item.glow}` }}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${item.glow}` }}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-[#F0F6FF]">{item.title}</p>
                    <p className="text-sm text-[#64748B] mt-0.5">{item.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Quick facts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="glass rounded-2xl p-5 border border-[#7C3AED]/20 bg-[#7C3AED]/5"
            >
              <p className="text-sm font-semibold text-[#00D4FF] mb-3 flex items-center gap-1.5 font-mono">
                <MapPinned className="w-4 h-4" /> Quick Facts
              </p>
              <div className="grid grid-cols-2 gap-3 text-sm text-[#64748B]">
                <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" /> Dublin, Ireland</div>
                <div className="flex items-center gap-1.5"><Globe className="w-3.5 h-3.5 text-[#7C3AED] flex-shrink-0" /> Originally from India</div>
                <div className="flex items-center gap-1.5"><Code2 className="w-3.5 h-3.5 text-[#10B981] flex-shrink-0" /> Python Expert</div>
                <div className="flex items-center gap-1.5"><Coffee className="w-3.5 h-3.5 text-[#00D4FF] flex-shrink-0" /> Fuelled by coffee</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
