"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  Briefcase, Calendar, MapPin, TrendingUp, Award,
  GraduationCap, BookOpen, BadgeCheck,
} from "lucide-react";
import KineticHeading from "./KineticHeading";

const experiences = [
  {
    role: "AI Automation & Operations Intern",
    company: "Medicidiom",
    location: "Spain (Remote)",
    period: "Feb 2026 – Present",
    type: "Current",
    color: "from-[#00D4FF] to-[#7C3AED]",
    dotColor: "bg-[#00D4FF]",
    glowColor: "rgba(0,212,255,0.4)",
    highlights: [
      "Architected LLM-powered document-intelligence pipelines (Python + OpenAI API) processing 1,000+ documents — improving data accuracy ~25% and cutting manual review by 35%",
      "Built agentic AI automation workflows eliminating ~45% of manual effort and reducing analytics turnaround by 30%",
      "Production pipelines maintained 99%+ uptime with ~20% latency reduction",
      "Created Power BI dashboards surfacing live operational KPIs, reducing ad-hoc reporting requests by ~40%",
    ],
    tags: ["Python", "OpenAI API", "LLMs", "Power BI", "Agentic AI", "FastAPI"],
  },
  {
    role: "Cybersecurity & Data Analysis Intern",
    company: "IBM",
    location: "India",
    period: "Jun 2023 – Sep 2023",
    type: "Past",
    color: "from-[#7C3AED] to-[#10B981]",
    dotColor: "bg-[#7C3AED]",
    glowColor: "rgba(124,58,237,0.4)",
    highlights: [
      "Applied ML classification models (Python, Scikit-learn) to millions of security records — improved detection accuracy by 22% and reduced false positives by 15%",
      "Built and evaluated multiple model architectures on multi-year datasets",
      "Improved outbreak forecasting accuracy by 18% through systematic experimentation",
      "Delivered analytical findings to senior analysts to directly inform remediation decisions",
    ],
    tags: ["Python", "Scikit-learn", "ML", "SQL", "Security Analytics", "Forecasting"],
  },
];

const education = [
  {
    degree: "M.Sc. Computing (Data Analytics)",
    institution: "Dublin City University",
    period: "2025 – Present",
    grade: "1:1 Expected",
    icon: GraduationCap,
    color: "from-[#00D4FF] to-[#7C3AED]",
    glow: "rgba(0,212,255,0.25)",
  },
  {
    degree: "B.Tech Computer Science",
    institution: "University of Petroleum & Energy Studies",
    period: "2020 – 2024",
    grade: "CGPA: 8.7/10",
    icon: BookOpen,
    color: "from-[#7C3AED] to-[#10B981]",
    glow: "rgba(124,58,237,0.25)",
  },
];

const certifications = [
  { name: "Google Data Analytics Professional Certificate", year: "2024" },
  { name: "Forecasting in Business — Deakin University",   year: "2024" },
  { name: "Data Analytics for Investment",                  year: "2024" },
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#080F1A]"
    >
      <div className="section-blob w-96 h-96 bg-[#10B981] top-0 right-0" />
      <div className="section-blob w-72 h-72 bg-[#7C3AED] bottom-0 left-10" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#7C3AED]/25 text-[#7C3AED] text-sm font-semibold font-mono mb-4">
            <Briefcase className="w-4 h-4" /> Experience & Education
          </span>
          <KineticHeading
            className="text-4xl sm:text-5xl font-extrabold text-[#F0F6FF] mb-4"
            parts={[
              { text: "My " },
              { text: "Journey", className: "bg-gradient-to-r from-[#7C3AED] to-[#00D4FF] bg-clip-text text-transparent" },
            ]}
          />
          <p className="text-[#64748B] max-w-xl mx-auto text-lg">
            From classrooms to production systems at IBM and beyond.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-[#94A3B8] mb-6 flex items-center gap-2 font-mono">
              <TrendingUp className="w-5 h-5 text-[#00D4FF]" />
              <span className="text-[#475569]">{"// "}</span> Work Experience
            </h3>
            <div className="relative">
              {/* Glowing timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-px timeline-line rounded-full opacity-60" />

              <div className="flex flex-col gap-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -40 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.2, type: "spring", stiffness: 70 }}
                    className="pl-14 relative"
                  >
                    {/* Timeline dot with radar ping */}
                    <div className="absolute left-3.5 top-5 -translate-x-1/2 -translate-y-1/2">
                      <div
                        className={`relative w-4 h-4 rounded-full ${exp.dotColor} radar-ping`}
                        style={{ boxShadow: `0 0 12px ${exp.glowColor}` }}
                      />
                    </div>

                    <motion.div
                      whileHover={{ x: 6 }}
                      className="glass rounded-2xl p-4 sm:p-6 border border-[#00D4FF]/10 hover:border-[#00D4FF]/30 transition-all"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-[#F0F6FF] text-base sm:text-lg">{exp.role}</h4>
                            {exp.type === "Current" && (
                              <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#10B981] text-xs font-bold font-mono border border-[#10B981]/25 animate-pulse">
                                ● LIVE
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-[#64748B]">
                            <span className="flex items-center gap-1 font-semibold text-[#94A3B8]">
                              <Briefcase className="w-3.5 h-3.5 text-[#00D4FF]" />
                              {exp.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#7C3AED]" />
                              {exp.location}
                            </span>
                            <span className="flex items-center gap-1 font-mono text-xs">
                              <Calendar className="w-3.5 h-3.5 text-[#10B981]" />
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2.5 mb-4">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2 text-sm text-[#64748B]">
                            <span className="text-[#00D4FF] mt-0.5 flex-shrink-0">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-[#00D4FF]/5 text-[#94A3B8] text-xs font-medium border border-[#00D4FF]/12 font-mono"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column – Education & Certs */}
          <div className="flex flex-col gap-6">
            {/* Education */}
            <div>
              <h3 className="text-xl font-bold text-[#94A3B8] mb-4 flex items-center gap-2 font-mono">
                <Award className="w-5 h-5 text-[#7C3AED]" /> Education
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass rounded-2xl p-5 border border-[#7C3AED]/15 hover:border-[#7C3AED]/35 transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center mb-3 shadow-lg`}
                      style={{ boxShadow: `0 0 20px ${edu.glow}` }}
                    >
                      <edu.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-bold text-[#F0F6FF] text-sm">{edu.degree}</p>
                    <p className="text-[#64748B] text-sm mt-0.5">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-[#475569] font-mono">{edu.period}</span>
                      <span
                        className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${edu.color} text-white text-xs font-bold font-mono`}
                      >
                        {edu.grade}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications */}
            <div>
              <h3 className="text-xl font-bold text-[#94A3B8] mb-4 flex items-center gap-2 font-mono">
                <BadgeCheck className="w-5 h-5 text-[#10B981]" /> Certifications
              </h3>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="glass rounded-xl p-4 border border-[#10B981]/12 hover:border-[#10B981]/30 flex items-start gap-3 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#10B981] to-[#00D4FF] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <BadgeCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#94A3B8]">{cert.name}</p>
                      <p className="text-xs text-[#475569] mt-0.5 font-mono">{cert.year}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
