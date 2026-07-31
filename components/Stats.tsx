"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { TrendingUp, Zap, Shield, BarChart3 } from "lucide-react";

const stats = [
  {
    value: 30, suffix: "+",
    label: "Projects Shipped",
    desc: "Spanning AI, Data Engineering, ML & Full Stack",
    icon: Zap,
    color: "from-[#1F6B3B] to-[#B0512E]",
    glow: "rgba(47,139,79,0.3)",
    numberColor: "text-[#1F6B3B]",
  },
  {
    value: 5, suffix: "M+",
    label: "Records Processed",
    desc: "Across ML pipelines and data engineering projects",
    icon: BarChart3,
    color: "from-[#B0512E] to-[#1E7A8C]",
    glow: "rgba(176,81,46,0.3)",
    numberColor: "text-[#B0512E]",
  },
  {
    value: 45, suffix: "%",
    label: "Manual Effort Reduced",
    desc: "At Medicidiom via AI automation workflows",
    icon: TrendingUp,
    color: "from-[#1E7A8C] to-[#1F6B3B]",
    glow: "rgba(30,122,140,0.3)",
    numberColor: "text-[#1E7A8C]",
  },
  {
    value: 99, suffix: "%+",
    label: "Pipeline Uptime",
    desc: "Production data pipelines at Medicidiom",
    icon: Shield,
    color: "from-[#1F6B3B] to-[#B0512E]",
    glow: "rgba(47,139,79,0.3)",
    numberColor: "text-[#1F6B3B]",
  },
  {
    value: 22, suffix: "%",
    label: "Accuracy Improvement",
    desc: "ML models at IBM for threat detection",
    icon: TrendingUp,
    color: "from-[#B0512E] to-[#1E7A8C]",
    glow: "rgba(176,81,46,0.3)",
    numberColor: "text-[#B0512E]",
  },
  {
    value: 1000, suffix: "+",
    label: "Documents Processed",
    desc: "Via LLM-powered intelligence pipelines",
    icon: Zap,
    color: "from-[#1E7A8C] to-[#1F6B3B]",
    glow: "rgba(30,122,140,0.3)",
    numberColor: "text-[#1E7A8C]",
  },
];

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#F6F4EC]" ref={ref}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient opacity-60"
        style={{
          background: "linear-gradient(135deg, rgba(47,139,79,0.04) 0%, rgba(176,81,46,0.06) 50%, rgba(30,122,140,0.04) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Data grid */}
      <div className="absolute inset-0 data-grid" />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, #1F6B3B, transparent)",
          animation: "scan 4s linear infinite",
          top: "50%",
        }}
      />

      {/* Ambient blobs */}
      <div className="section-blob w-96 h-96 bg-[#1F6B3B] top-0 left-0" />
      <div className="section-blob w-80 h-80 bg-[#B0512E] bottom-0 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#1F6B3B]/20 text-[#1F6B3B] text-sm font-semibold font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#1E7A8C] animate-pulse" />
            Live Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3A2E26] mb-3">
            Impact by the Numbers
          </h2>
          <p className="text-[#6B5F54] text-lg font-mono">
            {"// real results from real production systems"}
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ scale: 1.04, y: -4 }}
                className="glass rounded-2xl p-6 border border-[#1F6B3B]/10 hover:border-[#1F6B3B]/30 transition-all cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    style={{ boxShadow: `0 0 20px ${stat.glow}` }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#1F6B3B]/20 to-transparent" />
                </div>
                <div className={`text-4xl font-extrabold font-mono mb-1 ${stat.numberColor}`}
                  style={{ textShadow: `0 0 20px ${stat.glow}` }}
                >
                  {inView ? (
                    <CountUp end={stat.value} duration={2} suffix={stat.suffix} delay={i * 0.1} />
                  ) : (
                    "0"
                  )}
                </div>
                <p className="font-bold text-[#6B5F54] text-sm mb-1">{stat.label}</p>
                <p className="text-xs text-[#776959]">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
