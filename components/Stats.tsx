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
    color: "from-[#00D4FF] to-[#7C3AED]",
    glow: "rgba(0,212,255,0.3)",
    numberColor: "text-[#00D4FF]",
  },
  {
    value: 5, suffix: "M+",
    label: "Records Processed",
    desc: "Across ML pipelines and data engineering projects",
    icon: BarChart3,
    color: "from-[#7C3AED] to-[#10B981]",
    glow: "rgba(124,58,237,0.3)",
    numberColor: "text-[#7C3AED]",
  },
  {
    value: 45, suffix: "%",
    label: "Manual Effort Reduced",
    desc: "At Medicidiom via AI automation workflows",
    icon: TrendingUp,
    color: "from-[#10B981] to-[#00D4FF]",
    glow: "rgba(16,185,129,0.3)",
    numberColor: "text-[#10B981]",
  },
  {
    value: 99, suffix: "%+",
    label: "Pipeline Uptime",
    desc: "Production data pipelines at Medicidiom",
    icon: Shield,
    color: "from-[#00D4FF] to-[#7C3AED]",
    glow: "rgba(0,212,255,0.3)",
    numberColor: "text-[#00D4FF]",
  },
  {
    value: 22, suffix: "%",
    label: "Accuracy Improvement",
    desc: "ML models at IBM for threat detection",
    icon: TrendingUp,
    color: "from-[#7C3AED] to-[#10B981]",
    glow: "rgba(124,58,237,0.3)",
    numberColor: "text-[#7C3AED]",
  },
  {
    value: 1000, suffix: "+",
    label: "Documents Processed",
    desc: "Via LLM-powered intelligence pipelines",
    icon: Zap,
    color: "from-[#10B981] to-[#00D4FF]",
    glow: "rgba(16,185,129,0.3)",
    numberColor: "text-[#10B981]",
  },
];

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true });

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden bg-[#050A14]" ref={ref}>
      {/* Animated gradient background */}
      <div
        className="absolute inset-0 animate-gradient opacity-60"
        style={{
          background: "linear-gradient(135deg, rgba(0,212,255,0.04) 0%, rgba(124,58,237,0.06) 50%, rgba(16,185,129,0.04) 100%)",
          backgroundSize: "200% 200%",
        }}
      />

      {/* Data grid */}
      <div className="absolute inset-0 data-grid" />

      {/* Horizontal scan line */}
      <div
        className="absolute left-0 right-0 h-px opacity-20"
        style={{
          background: "linear-gradient(90deg, transparent, #00D4FF, transparent)",
          animation: "scan 4s linear infinite",
          top: "50%",
        }}
      />

      {/* Ambient blobs */}
      <div className="section-blob w-96 h-96 bg-[#00D4FF] top-0 left-0" />
      <div className="section-blob w-80 h-80 bg-[#7C3AED] bottom-0 right-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-semibold font-mono mb-4">
            <span className="w-2 h-2 rounded-full bg-[#10B981] animate-pulse" />
            Live Metrics
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F0F6FF] mb-3">
            Impact by the Numbers
          </h2>
          <p className="text-[#64748B] text-lg font-mono">
            // real results from real production systems
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
                className="glass rounded-2xl p-6 border border-[#00D4FF]/10 hover:border-[#00D4FF]/30 transition-all cursor-default"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                    style={{ boxShadow: `0 0 20px ${stat.glow}` }}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <div className="h-px flex-1 bg-gradient-to-r from-[#00D4FF]/20 to-transparent" />
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
                <p className="font-bold text-[#94A3B8] text-sm mb-1">{stat.label}</p>
                <p className="text-xs text-[#475569]">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
