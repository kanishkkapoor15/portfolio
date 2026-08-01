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
    role: "Technical Accounts Manager",
    company: "AI Institute",
    location: "Dublin, Ireland",
    period: "Jun 2026 – Present",
    type: "Current",
    color: "from-[#1F6B3B] to-[#B0512E]",
    dotColor: "bg-[#1F6B3B]",
    glowColor: "rgba(47,139,79,0.4)",
    highlights: [
      "Own the technical relationship with built-environment clients across Ireland and the UK — architecture, engineering, construction and facilities management",
      "Build and deploy AI agents against the systems buildings already run on: model data, O&M documentation and building telemetry",
      "Work directly alongside built-environment professionals to turn operational problems into scoped, evaluated agent deployments",
      "Bridge client teams and engineering through requirements, technical validation and rollout",
    ],
    tags: ["Agentic AI", "LLMs", "Solution Architecture", "Built Environment", "Python", "Client Delivery"],
  },
  {
    role: "Agentic AI Engineer",
    company: "Medicidiom",
    location: "Spain (Remote)",
    period: "Feb 2026 – Jun 2026",
    type: "Contract",
    color: "from-[#1F6B3B] to-[#B0512E]",
    dotColor: "bg-[#1F6B3B]",
    glowColor: "rgba(47,139,79,0.4)",
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
    color: "from-[#B0512E] to-[#1E7A8C]",
    dotColor: "bg-[#B0512E]",
    glowColor: "rgba(176,81,46,0.4)",
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
    period: "2025 – 2026",
    grade: "Graduated",
    icon: GraduationCap,
    color: "from-[#1F6B3B] to-[#B0512E]",
    glow: "rgba(47,139,79,0.25)",
  },
  {
    degree: "B.Tech Computer Science",
    institution: "University of Petroleum & Energy Studies",
    period: "2020 – 2024",
    grade: "CGPA: 8.7/10",
    icon: BookOpen,
    color: "from-[#B0512E] to-[#1E7A8C]",
    glow: "rgba(176,81,46,0.25)",
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
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#FDFBF3]"
    >
      <div className="section-blob w-96 h-96 bg-[#1E7A8C] top-0 right-0" />
      <div className="section-blob w-72 h-72 bg-[#B0512E] bottom-0 left-10" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#B0512E]/25 text-[#B0512E] text-sm font-semibold font-mono mb-4">
            <Briefcase className="w-4 h-4" /> Experience & Education
          </span>
          <KineticHeading
            className="display text-5xl sm:text-7xl text-[#3A2E26] mb-5"
            parts={[
              { text: "My " },
              { text: "Journey", className: "bg-gradient-to-r from-[#B0512E] to-[#1F6B3B] bg-clip-text text-transparent" },
            ]}
          />
          <p className="text-[#6B5F54] max-w-xl mx-auto text-lg">
            From classrooms to production agents, deployed with clients.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-[#6B5F54] mb-6 flex items-center gap-2 font-mono">
              <TrendingUp className="w-5 h-5 text-[#1F6B3B]" />
              <span className="text-[#776959]">{"// "}</span> Work Experience
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
                      className="glass rounded-2xl p-4 sm:p-6 border border-[#1F6B3B]/10 hover:border-[#1F6B3B]/30 transition-all"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-[#3A2E26] text-base sm:text-lg">{exp.role}</h4>
                            {exp.type === "Current" && (
                              <span className="px-2 py-0.5 rounded-full bg-[#1E7A8C]/15 text-[#1E7A8C] text-xs font-bold font-mono border border-[#1E7A8C]/25 animate-pulse">
                                ● LIVE
                              </span>
                            )}
                            {exp.type === "Contract" && (
                              <span className="px-2 py-0.5 rounded-full bg-[#8A6A15]/15 text-[#8A6A15] text-xs font-bold font-mono border border-[#8A6A15]/25">
                                CONTRACT
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-[#6B5F54]">
                            <span className="flex items-center gap-1 font-semibold text-[#6B5F54]">
                              <Briefcase className="w-3.5 h-3.5 text-[#1F6B3B]" />
                              {exp.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-[#B0512E]" />
                              {exp.location}
                            </span>
                            <span className="flex items-center gap-1 font-mono text-xs">
                              <Calendar className="w-3.5 h-3.5 text-[#1E7A8C]" />
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2.5 mb-4">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2 text-sm text-[#6B5F54]">
                            <span className="text-[#1F6B3B] mt-0.5 flex-shrink-0">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-[#1F6B3B]/5 text-[#6B5F54] text-xs font-medium border border-[#1F6B3B]/12 font-mono"
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
              <h3 className="text-xl font-bold text-[#6B5F54] mb-4 flex items-center gap-2 font-mono">
                <Award className="w-5 h-5 text-[#B0512E]" /> Education
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    whileHover={{ scale: 1.02, y: -2 }}
                    className="glass rounded-2xl p-5 border border-[#B0512E]/15 hover:border-[#B0512E]/35 transition-all"
                  >
                    <div
                      className={`w-9 h-9 rounded-xl bg-gradient-to-br ${edu.color} flex items-center justify-center mb-3 shadow-lg`}
                      style={{ boxShadow: `0 0 20px ${edu.glow}` }}
                    >
                      <edu.icon className="w-4 h-4 text-white" />
                    </div>
                    <p className="font-bold text-[#3A2E26] text-sm">{edu.degree}</p>
                    <p className="text-[#6B5F54] text-sm mt-0.5">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-3">
                      <span className="text-xs text-[#776959] font-mono">{edu.period}</span>
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
              <h3 className="text-xl font-bold text-[#6B5F54] mb-4 flex items-center gap-2 font-mono">
                <BadgeCheck className="w-5 h-5 text-[#1E7A8C]" /> Certifications
              </h3>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="glass rounded-xl p-4 border border-[#1E7A8C]/12 hover:border-[#1E7A8C]/30 flex items-start gap-3 transition-all"
                  >
                    <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#1E7A8C] to-[#1F6B3B] flex items-center justify-center flex-shrink-0 shadow-sm">
                      <BadgeCheck className="w-3.5 h-3.5 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-[#6B5F54]">{cert.name}</p>
                      <p className="text-xs text-[#776959] mt-0.5 font-mono">{cert.year}</p>
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
