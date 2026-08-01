"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Database, Cloud, Brain, BarChart3, Wrench } from "lucide-react";
import KineticHeading from "./KineticHeading";

const skillCategories = [
  {
    icon: Brain,
    title: "AI & LLMs",
    color: "from-[#1F6B3B] to-[#B0512E]",
    glow: "rgba(47,139,79,0.15)",
    border: "border-[#1F6B3B]/15",
    skills: [
      "OpenAI API (GPT-4)", "HuggingFace Transformers", "LangChain", "MCP Agents",
      "Agentic AI", "Prompt Engineering", "DistilBART / BERT", "RAG Pipelines",
    ],
  },
  {
    icon: BarChart3,
    title: "ML & Deep Learning",
    color: "from-[#B0512E] to-[#1E7A8C]",
    glow: "rgba(176,81,46,0.15)",
    border: "border-[#B0512E]/15",
    skills: [
      "Scikit-learn", "XGBoost", "LSTM (TensorFlow/Keras)", "SARIMA / TBATS / ETS",
      "SHAP", "Random Forest", "Logistic Regression", "A/B Testing",
    ],
  },
  {
    icon: Code2,
    title: "Languages",
    color: "from-[#1E7A8C] to-[#1F6B3B]",
    glow: "rgba(30,122,140,0.15)",
    border: "border-[#1E7A8C]/15",
    skills: ["Python (Expert)", "SQL", "JavaScript", "Java", "C", "R", "TypeScript", "Bash"],
  },
  {
    icon: Database,
    title: "Data & Pipelines",
    color: "from-[#1F6B3B] to-[#B0512E]",
    glow: "rgba(47,139,79,0.15)",
    border: "border-[#1F6B3B]/15",
    skills: [
      "Apache Kafka", "Apache Spark", "Apache Airflow", "Snowflake",
      "Delta Lake", "ETL / ELT", "Pandas / NumPy", "PostgreSQL / MongoDB",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "from-[#B0512E] to-[#1E7A8C]",
    glow: "rgba(176,81,46,0.15)",
    border: "border-[#B0512E]/15",
    skills: [
      "Azure (ADF, Databricks)", "AWS (S3, Lambda)", "Docker", "FastAPI",
      "CI/CD", "Git / GitHub", "REST APIs", "Linux",
    ],
  },
  {
    icon: Wrench,
    title: "Visualisation & BI",
    color: "from-[#1E7A8C] to-[#1F6B3B]",
    glow: "rgba(30,122,140,0.15)",
    border: "border-[#1E7A8C]/15",
    skills: [
      "Power BI (DAX)", "Streamlit", "Snowsight", "Matplotlib / Seaborn",
      "Plotly", "Excel (Power Query)", "MERN Stack", "React",
    ],
  },
];

const proficiency = [
  { lang: "Python",       pct: 95, color: "from-[#1F6B3B] to-[#B0512E]" },
  { lang: "SQL",          pct: 88, color: "from-[#B0512E] to-[#1E7A8C]" },
  { lang: "R",            pct: 82, color: "from-[#1E7A8C] to-[#1F6B3B]" },
  { lang: "JavaScript",  pct: 75, color: "from-[#1F6B3B] to-[#B0512E]" },
  { lang: "Java",         pct: 70, color: "from-[#B0512E] to-[#1E7A8C]" },
  { lang: "Bash / Linux", pct: 72, color: "from-[#1E7A8C] to-[#1F6B3B]" },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [barsRef, barsInView] = useInView({ threshold: 0.2, triggerOnce: true });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#F6F4EC]"
    >
      <div className="section-blob w-80 h-80 bg-[#1F6B3B] top-10 -left-20" />
      <div className="section-blob w-80 h-80 bg-[#B0512E] bottom-10 -right-20" />
      <div className="absolute inset-0 data-grid opacity-50" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10 sm:mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#1E7A8C]/25 text-[#1E7A8C] text-sm font-semibold font-mono mb-4">
            <Code2 className="w-4 h-4" /> Technical Skills
          </span>
          <KineticHeading
            className="display text-5xl sm:text-7xl text-[#3A2E26] mb-5"
            parts={[
              { text: "My " },
              { text: "Toolkit", className: "bg-gradient-to-r from-[#1E7A8C] to-[#1F6B3B] bg-clip-text text-transparent" },
            ]}
          />
          <p className="text-[#6B5F54] max-w-xl mx-auto text-lg">
            A comprehensive stack spanning AI, data engineering, cloud, and full-stack development.
          </p>
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, i) => {
            const Icon = category.icon;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1, type: "spring", stiffness: 80 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`gradient-border glass rounded-2xl p-6 border ${category.border} transition-all duration-300 cursor-default`}
                style={{ boxShadow: `0 4px 30px rgba(0,0,0,0.3)` }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                    style={{ boxShadow: `0 0 20px ${category.glow}` }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-[#3A2E26] text-lg">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.05 }}
                      className="skill-tag px-3 py-1.5 rounded-full text-xs font-semibold cursor-default"
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Proficiency bars */}
        <motion.div
          ref={barsRef}
          initial={{ opacity: 0, y: 40 }}
          animate={barsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 70 }}
          className="mt-12 glass rounded-3xl p-5 sm:p-8 border border-[#1F6B3B]/10"
        >
          <h3 className="text-xl font-bold text-[#3A2E26] mb-2 text-center font-mono">
            Core Language Proficiency
          </h3>
          <p className="text-center text-[#776959] text-sm mb-8 font-mono">
            {"// self-assessed skill levels"}
          </p>
          <div className="grid sm:grid-cols-2 gap-x-8 sm:gap-x-14 gap-y-6">
            {proficiency.map(({ lang, pct, color }) => (
              <div key={lang}>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-semibold text-[#6B5F54] font-mono">{lang}</span>
                  <span className="text-sm text-[#1F6B3B] font-mono font-bold">{pct}%</span>
                </div>
                <div className="h-2 bg-[#EDE9DB] rounded-full overflow-visible relative">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={barsInView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full progress-bar-glow`}
                  />
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
