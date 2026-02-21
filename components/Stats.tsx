"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";
import { TrendingUp, Zap, Shield, BarChart3 } from "lucide-react";

const stats = [
  {
    value: 30,
    suffix: "+",
    label: "Projects Shipped",
    desc: "Spanning AI, Data Engineering, ML & Full Stack",
    icon: Zap,
    color: "from-violet-500 to-purple-600",
    bg: "from-violet-50 to-purple-50",
  },
  {
    value: 5,
    suffix: "M+",
    label: "Records Processed",
    desc: "Across ML pipelines and data engineering projects",
    icon: BarChart3,
    color: "from-cyan-500 to-blue-500",
    bg: "from-cyan-50 to-blue-50",
  },
  {
    value: 45,
    suffix: "%",
    label: "Manual Effort Reduced",
    desc: "At Medicidiom via AI automation workflows",
    icon: TrendingUp,
    color: "from-pink-500 to-rose-500",
    bg: "from-pink-50 to-rose-50",
  },
  {
    value: 99,
    suffix: "%+",
    label: "Pipeline Uptime",
    desc: "Production data pipelines at Medicidiom",
    icon: Shield,
    color: "from-emerald-500 to-green-500",
    bg: "from-emerald-50 to-green-50",
  },
  {
    value: 22,
    suffix: "%",
    label: "Accuracy Improvement",
    desc: "ML models at IBM for threat detection",
    icon: TrendingUp,
    color: "from-orange-500 to-amber-500",
    bg: "from-orange-50 to-amber-50",
  },
  {
    value: 1000,
    suffix: "+",
    label: "Documents Processed",
    desc: "Via LLM-powered intelligence pipelines",
    icon: Zap,
    color: "from-sky-500 to-indigo-500",
    bg: "from-sky-50 to-indigo-50",
  },
];

export default function Stats() {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section className="py-20 px-4 sm:px-6 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 animate-gradient" style={{ backgroundSize: "200% 200%" }} />
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-3">
            Impact by the Numbers
          </h2>
          <p className="text-white/70 text-lg">Real results from real production systems</p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`bg-gradient-to-br ${stat.bg} rounded-2xl p-6 border border-white/50 shadow-lg shadow-black/10 backdrop-blur-sm`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                </div>
                <div className="text-4xl font-extrabold text-slate-800 mb-1">
                  {inView ? (
                    <CountUp
                      end={stat.value}
                      duration={2}
                      suffix={stat.suffix}
                      delay={i * 0.1}
                    />
                  ) : (
                    "0"
                  )}
                </div>
                <p className="font-bold text-slate-700 text-sm mb-1">{stat.label}</p>
                <p className="text-xs text-slate-500">{stat.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
