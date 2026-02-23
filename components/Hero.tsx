"use client";

import { motion } from "framer-motion";
import { TypeAnimation } from "react-type-animation";
import { Github, Linkedin, Mail, MapPin, ArrowDown, Zap } from "lucide-react";

const floatingElements = [
  { label: "Python",  color: "from-[#6B2080] to-[#C57BB8]",  delay: 0,   x: "10%", y: "20%" },
  { label: "LLM",    color: "from-[#7A1535] to-[#C57BB8]",   delay: 0.5, x: "85%", y: "15%" },
  { label: "FastAPI", color: "from-[#D4952A] to-[#C57BB8]",  delay: 1,   x: "80%", y: "70%" },
  { label: "Azure",  color: "from-[#6B2080] to-[#7A1535]",   delay: 1.5, x: "5%",  y: "75%" },
  { label: "Kafka",  color: "from-[#D4952A] to-[#7A1535]",   delay: 2,   x: "50%", y: "85%" },
  { label: "AI",     color: "from-[#C57BB8] to-[#6B2080]",   delay: 0.8, x: "90%", y: "45%" },
];

const stats = [
  { value: "30+", label: "Projects",         color: "text-[#6B2080]" },
  { value: "2",   label: "Internships",       color: "text-[#7A1535]" },
  { value: "5M+", label: "Records Processed", color: "text-[#D4952A]" },
  { value: "1:1", label: "Expected MSc",      color: "text-[#C57BB8]" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background blobs */}
      <div className="section-blob w-96 h-96 bg-[#6B2080] top-0 -left-20 animate-blob" />
      <div
        className="section-blob w-80 h-80 bg-[#D4952A] top-20 right-0 animate-blob"
        style={{ animationDelay: "3s" }}
      />
      <div
        className="section-blob w-72 h-72 bg-[#C57BB8] bottom-20 left-1/4 animate-blob"
        style={{ animationDelay: "6s" }}
      />

      {/* Floating tech tags */}
      {floatingElements.map((el, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.85, scale: 1 }}
          transition={{ delay: el.delay + 1, duration: 0.5, type: "spring" }}
          className={`hidden lg:flex absolute items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r ${el.color} text-white text-xs font-bold shadow-lg animate-float`}
          style={{ left: el.x, top: el.y, animationDelay: `${el.delay}s` }}
        >
          <Zap className="w-3 h-3" />
          {el.label}
        </motion.div>
      ))}

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: `radial-gradient(circle, #6B2080 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-[#C57BB8]/30 shadow-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-sm text-slate-600 font-medium">
            Available for opportunities · Dublin, Ireland
          </span>
          <MapPin className="w-3.5 h-3.5 text-slate-400" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-extrabold text-slate-800 mb-4 leading-tight tracking-tight"
        >
          Hi, I&apos;m{" "}
          <span className="shimmer-text">Kanishk Kapoor</span>
        </motion.h1>

        {/* Typewriter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-2xl sm:text-3xl font-semibold text-slate-600 mb-6 h-12 flex items-center justify-center"
        >
          <TypeAnimation
            sequence={[
              "AI Developer",           2000,
              "Data Engineer",          2000,
              "LLM / Agentic AI Builder", 2000,
              "ML Engineer",            2000,
              "Software Engineer",      2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="bg-gradient-to-r from-[#6B2080] via-[#C57BB8] to-[#D4952A] bg-clip-text text-transparent"
          />
        </motion.div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="text-lg text-slate-500 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          MSc Computing (Data Analytics) at{" "}
          <span className="font-semibold text-slate-700">Dublin City University</span> · Building
          production LLM pipelines, agentic AI systems, and real-time data infrastructure.
          Previously at{" "}
          <span className="font-semibold text-slate-700">IBM</span> &{" "}
          <span className="font-semibold text-slate-700">Medicidiom</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-14"
        >
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-[#6B2080] via-[#7A1535] to-[#D4952A] text-white font-semibold shadow-xl shadow-[#6B2080]/25 hover:shadow-[#6B2080]/40 transition-shadow animate-gradient"
          >
            View My Work
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3.5 rounded-2xl glass border-2 border-[#6B2080]/30 text-[#6B2080] font-semibold hover:border-[#6B2080]/60 transition-colors"
          >
            Get in Touch
          </motion.a>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
          className="flex items-center justify-center gap-4 mb-14"
        >
          {[
            { icon: Github,   href: "https://github.com/kanishkkapoor15",      label: "GitHub",   color: "hover:bg-slate-100" },
            { icon: Linkedin, href: "https://linkedin.com/in/kanishkapoor",    label: "LinkedIn", color: "hover:bg-[#6B2080]/5" },
            { icon: Mail,     href: "mailto:kanishkkapoor15@gmail.com",        label: "Email",    color: "hover:bg-[#D4952A]/10" },
          ].map(({ icon: Icon, href, label, color }) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`p-3 rounded-xl glass border border-slate-200 text-slate-600 ${color} transition-all shadow-sm`}
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
          transition={{ duration: 0.8, delay: 1.1 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.05, y: -4 }}
              className="glass rounded-2xl p-4 shadow-sm border border-white/80"
            >
              <div className={`text-2xl font-extrabold ${stat.color}`}>{stat.value}</div>
              <div className="text-xs text-slate-500 mt-1 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-1 text-slate-400"
          >
            <span className="text-xs font-medium">Scroll</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
