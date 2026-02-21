"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { GraduationCap, MapPin, Briefcase, Heart } from "lucide-react";

const highlights = [
  {
    icon: GraduationCap,
    title: "MSc Computing (Data Analytics)",
    subtitle: "Dublin City University · 1:1 Expected · 2025–Present",
    color: "from-violet-500 to-purple-600",
    bg: "bg-violet-50",
  },
  {
    icon: GraduationCap,
    title: "B.Tech Computer Science",
    subtitle: "UPES · CGPA 8.7/10 · 2020–2024",
    color: "from-pink-500 to-rose-500",
    bg: "bg-pink-50",
  },
  {
    icon: Briefcase,
    title: "AI Automation Intern",
    subtitle: "Medicidiom, Spain (Remote) · Feb 2026–Present",
    color: "from-cyan-500 to-blue-500",
    bg: "bg-cyan-50",
  },
  {
    icon: MapPin,
    title: "Based in Dublin, Ireland",
    subtitle: "Open to remote & on-site opportunities",
    color: "from-emerald-500 to-green-500",
    bg: "bg-emerald-50",
  },
];

const interests = [
  "🤖 Agentic AI Systems",
  "🧠 Large Language Models",
  "⚡ Real-time Data Pipelines",
  "☁️ Cloud Architecture",
  "📊 Business Intelligence",
  "🔬 ML Research",
  "🎮 Gaming",
  "🌍 Travelling",
];

export default function About() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  return (
    <section id="about" ref={ref} className="py-24 px-4 sm:px-6 relative overflow-hidden">
      <div className="section-blob w-96 h-96 bg-violet-300 -top-20 -right-20" />
      <div className="section-blob w-72 h-72 bg-pink-300 bottom-0 left-0" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 text-violet-700 text-sm font-semibold mb-4">
            <Heart className="w-4 h-4" /> About Me
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
            Who I{" "}
            <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
              Am
            </span>
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A passionate technologist bridging the gap between cutting-edge AI research and
            production-grade engineering.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left – Bio */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative card behind */}
              <div className="absolute -inset-4 bg-gradient-to-br from-violet-100 to-pink-100 rounded-3xl -rotate-2 opacity-60" />
              <div className="relative glass rounded-3xl p-8 shadow-xl border border-white/80">
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  I&apos;m an{" "}
                  <span className="font-semibold text-violet-700">AI Developer & Data Engineer</span>{" "}
                  currently pursuing my MSc Computing (Data Analytics) at{" "}
                  <span className="font-semibold text-slate-800">Dublin City University</span>,
                  expecting a 1:1 (First Class Honours).
                </p>
                <p className="text-slate-600 leading-relaxed text-lg mb-6">
                  I specialise in building{" "}
                  <span className="font-semibold text-pink-600">LLM-powered agentic systems</span>,
                  production ML pipelines, and real-time data infrastructure using tools like
                  OpenAI API, LangChain, Apache Kafka, Azure, and AWS. I&apos;ve shipped 30+ projects
                  spanning FinTech, healthcare, energy, and logistics.
                </p>
                <p className="text-slate-600 leading-relaxed text-lg">
                  Currently interning at{" "}
                  <span className="font-semibold text-slate-800">Medicidiom (Spain, Remote)</span>{" "}
                  where I build production AI automation workflows and document-intelligence
                  pipelines that process 1,000+ documents with 25% accuracy gains.
                </p>

                {/* Interests */}
                <div className="mt-6">
                  <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-3">
                    Interests
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {interests.map((interest) => (
                      <span
                        key={interest}
                        className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-50 to-pink-50 border border-violet-100 text-sm text-slate-600 font-medium"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right – Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
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
                  whileHover={{ scale: 1.02, x: 4 }}
                  className="glass rounded-2xl p-5 shadow-sm border border-white/80 flex items-center gap-5 cursor-default"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.color} flex items-center justify-center flex-shrink-0 shadow-md`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-800">{item.title}</p>
                    <p className="text-sm text-slate-500 mt-0.5">{item.subtitle}</p>
                  </div>
                </motion.div>
              );
            })}

            {/* Fun fact card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 1 }}
              className="glass rounded-2xl p-5 shadow-sm border border-white/80 bg-gradient-to-r from-violet-50 to-pink-50"
            >
              <p className="text-sm font-semibold text-violet-700 mb-2">🎯 Quick Facts</p>
              <div className="grid grid-cols-2 gap-3 text-sm text-slate-600">
                <div>📍 Dublin, Ireland</div>
                <div>🇮🇳 Originally from India</div>
                <div>🐍 Python Expert</div>
                <div>☕ Fuelled by coffee</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
