"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Code2, Database, Cloud, Brain, BarChart3, Wrench } from "lucide-react";

const skillCategories = [
  {
    icon: Brain,
    title: "AI & LLMs",
    color: "from-[#6B2080] to-[#C57BB8]",
    bg: "from-[#6B2080]/5 to-[#C57BB8]/5",
    border: "border-[#6B2080]/20",
    skills: [
      "OpenAI API (GPT-4)",
      "HuggingFace Transformers",
      "LangChain",
      "MCP Agents",
      "Agentic AI",
      "Prompt Engineering",
      "DistilBART / BERT",
      "RAG Pipelines",
    ],
  },
  {
    icon: BarChart3,
    title: "ML & Deep Learning",
    color: "from-[#7A1535] to-[#C57BB8]",
    bg: "from-[#7A1535]/5 to-[#C57BB8]/5",
    border: "border-[#7A1535]/20",
    skills: [
      "Scikit-learn",
      "XGBoost",
      "LSTM (TensorFlow/Keras)",
      "SARIMA / TBATS / ETS",
      "SHAP",
      "Random Forest",
      "Logistic Regression",
      "A/B Testing",
    ],
  },
  {
    icon: Code2,
    title: "Languages",
    color: "from-[#D4952A] to-[#C57BB8]",
    bg: "from-[#D4952A]/5 to-[#C57BB8]/5",
    border: "border-[#D4952A]/20",
    skills: ["Python (Expert)", "SQL", "JavaScript", "Java", "C", "R", "TypeScript", "Bash"],
  },
  {
    icon: Database,
    title: "Data & Pipelines",
    color: "from-[#6B2080] to-[#7A1535]",
    bg: "from-[#6B2080]/5 to-[#7A1535]/5",
    border: "border-[#6B2080]/20",
    skills: [
      "Apache Kafka",
      "Apache Spark",
      "Apache Airflow",
      "Snowflake",
      "Delta Lake",
      "ETL / ELT",
      "Pandas / NumPy",
      "PostgreSQL / MongoDB",
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    color: "from-[#D4952A] to-[#7A1535]",
    bg: "from-[#D4952A]/5 to-[#7A1535]/5",
    border: "border-[#D4952A]/20",
    skills: [
      "Azure (ADF, Databricks)",
      "AWS (S3, Lambda)",
      "Docker",
      "FastAPI",
      "CI/CD",
      "Git / GitHub",
      "REST APIs",
      "Linux",
    ],
  },
  {
    icon: Wrench,
    title: "Visualisation & BI",
    color: "from-[#C57BB8] to-[#6B2080]",
    bg: "from-[#C57BB8]/5 to-[#6B2080]/5",
    border: "border-[#C57BB8]/20",
    skills: [
      "Power BI (DAX)",
      "Streamlit",
      "Snowsight",
      "Matplotlib / Seaborn",
      "Plotly",
      "Excel (Power Query)",
      "MERN Stack",
      "React",
    ],
  },
];

export default function Skills() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });

  return (
    <section
      id="skills"
      ref={ref}
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white via-[#6B2080]/3 to-white"
    >
      <div className="section-blob w-80 h-80 bg-[#D4952A] top-10 -left-20" />
      <div className="section-blob w-80 h-80 bg-[#C57BB8] bottom-10 -right-20" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4952A]/10 text-[#D4952A] text-sm font-semibold mb-4">
            <Code2 className="w-4 h-4" /> Technical Skills
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
            My{" "}
            <span className="bg-gradient-to-r from-[#D4952A] to-[#6B2080] bg-clip-text text-transparent">
              Toolkit
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
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
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -6, scale: 1.02 }}
                className={`gradient-border glass rounded-2xl p-6 shadow-sm border ${category.border} transition-all duration-300 bg-gradient-to-br ${category.bg}`}
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-5">
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center shadow-md`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-800 text-lg">{category.title}</h3>
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
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-12 glass rounded-3xl p-8 shadow-sm border border-white/80"
        >
          <h3 className="text-xl font-bold text-slate-800 mb-6 text-center">
            Core Language Proficiency
          </h3>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-4">
            {[
              { lang: "Python",     pct: 95, color: "from-[#6B2080] to-[#C57BB8]" },
              { lang: "SQL",        pct: 88, color: "from-[#7A1535] to-[#C57BB8]" },
              { lang: "R",          pct: 82, color: "from-[#D4952A] to-[#C57BB8]" },
              { lang: "JavaScript", pct: 75, color: "from-[#D4952A] to-[#7A1535]" },
              { lang: "Java",       pct: 70, color: "from-[#7A1535] to-[#6B2080]" },
              { lang: "Bash / Linux", pct: 72, color: "from-[#6B2080] to-[#D4952A]" },
            ].map(({ lang, pct, color }) => (
              <div key={lang}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-semibold text-slate-700">{lang}</span>
                  <span className="text-sm text-slate-500">{pct}%</span>
                </div>
                <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={inView ? { width: `${pct}%` } : {}}
                    transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                    className={`h-full bg-gradient-to-r ${color} rounded-full`}
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
