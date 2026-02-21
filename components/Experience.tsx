"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Briefcase, Calendar, MapPin, TrendingUp, Award } from "lucide-react";

const experiences = [
  {
    role: "AI Automation & Operations Intern",
    company: "Medicidiom",
    location: "Spain (Remote)",
    period: "Feb 2026 – Present",
    type: "Current",
    color: "from-violet-500 to-purple-600",
    dotColor: "bg-violet-500",
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
    color: "from-blue-500 to-cyan-500",
    dotColor: "bg-blue-500",
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
    icon: "🎓",
    color: "from-violet-500 to-pink-500",
  },
  {
    degree: "B.Tech Computer Science",
    institution: "University of Petroleum & Energy Studies",
    period: "2020 – 2024",
    grade: "CGPA: 8.7/10",
    icon: "🏛️",
    color: "from-cyan-500 to-blue-500",
  },
];

const certifications = [
  { name: "Google Data Analytics Professional Certificate", year: "2024", emoji: "📊" },
  { name: "Forecasting in Business — Deakin University", year: "2024", emoji: "📈" },
  { name: "Data Analytics for Investment", year: "2024", emoji: "💹" },
];

export default function Experience() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="experience"
      ref={ref}
      className="py-24 px-4 sm:px-6 relative overflow-hidden"
    >
      <div className="section-blob w-96 h-96 bg-blue-300 top-0 right-0" />
      <div className="section-blob w-72 h-72 bg-violet-300 bottom-0 left-10" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-4">
            <Briefcase className="w-4 h-4" /> Experience & Education
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
              Journey
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            From classrooms to production systems at IBM and beyond.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Work Experience Timeline */}
          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold text-slate-700 mb-6 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-violet-500" /> Work Experience
            </h3>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-5 top-0 bottom-0 w-0.5 timeline-line rounded-full" />

              <div className="flex flex-col gap-8">
                {experiences.map((exp, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -30 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.6, delay: i * 0.2 }}
                    className="pl-14 relative"
                  >
                    {/* Timeline dot */}
                    <div
                      className={`absolute left-3 top-4 w-5 h-5 rounded-full ${exp.dotColor} shadow-md ring-4 ring-white`}
                    />

                    <motion.div
                      whileHover={{ x: 4 }}
                      className="glass rounded-2xl p-6 shadow-sm border border-white/80"
                    >
                      {/* Header */}
                      <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-bold text-slate-800 text-lg">{exp.role}</h4>
                            {exp.type === "Current" && (
                              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-700 text-xs font-bold animate-pulse">
                                LIVE
                              </span>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-3 text-sm text-slate-500">
                            <span className="flex items-center gap-1 font-semibold text-slate-700">
                              <Briefcase className="w-3.5 h-3.5" />
                              {exp.company}
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5" />
                              {exp.location}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {exp.period}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2 mb-4">
                        {exp.highlights.map((h, j) => (
                          <li key={j} className="flex gap-2 text-sm text-slate-600">
                            <span className="text-violet-500 mt-0.5 flex-shrink-0">▸</span>
                            {h}
                          </li>
                        ))}
                      </ul>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2">
                        {exp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-lg bg-slate-100 text-slate-600 text-xs font-medium"
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
              <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-pink-500" /> Education
              </h3>
              <div className="flex flex-col gap-4">
                {education.map((edu, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                    whileHover={{ scale: 1.02 }}
                    className="glass rounded-2xl p-5 shadow-sm border border-white/80"
                  >
                    <div className="text-2xl mb-2">{edu.icon}</div>
                    <p className="font-bold text-slate-800 text-sm">{edu.degree}</p>
                    <p className="text-slate-600 text-sm mt-0.5">{edu.institution}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xs text-slate-500">{edu.period}</span>
                      <span
                        className={`px-2.5 py-1 rounded-full bg-gradient-to-r ${edu.color} text-white text-xs font-bold`}
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
              <h3 className="text-xl font-bold text-slate-700 mb-4 flex items-center gap-2">
                🏅 Certifications
              </h3>
              <div className="flex flex-col gap-3">
                {certifications.map((cert, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
                    whileHover={{ x: 4 }}
                    className="glass rounded-xl p-4 shadow-sm border border-white/80 flex items-start gap-3"
                  >
                    <span className="text-xl flex-shrink-0">{cert.emoji}</span>
                    <div>
                      <p className="text-sm font-medium text-slate-700">{cert.name}</p>
                      <p className="text-xs text-slate-400 mt-0.5">{cert.year}</p>
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
