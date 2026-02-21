"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ExternalLink, Github, Star, Filter, Layers } from "lucide-react";

type Project = {
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  category: string;
  emoji: string;
  color: string;
  gradient: string;
  github: string;
  featured: boolean;
  highlight?: string;
};

const projects: Project[] = [
  {
    title: "Product Analytics MCP / LLM Agent",
    description: "Production agentic AI system with MCP server + NLQ interface",
    longDesc:
      "Agentic AI system that lets users query product analytics in plain English. Eliminates manual SQL or BI tool access entirely via a Model Context Protocol (MCP) server with a natural language interface.",
    tags: ["Python", "OpenAI API", "MCP", "Agentic AI", "NLQ", "FastAPI"],
    category: "AI / LLM",
    emoji: "🤖",
    color: "from-violet-500 to-purple-600",
    gradient: "from-violet-50 to-purple-50",
    github: "https://github.com/kanishkkapoor15/Product-Analytics-MCP-LLM-Agent",
    featured: true,
    highlight: "⭐ Pinned",
  },
  {
    title: "News Intelligence Dashboard",
    description: "Real-time pipeline with GPT-4 + HuggingFace dual-model summarisation",
    longDesc:
      "Real-time data pipeline: news API → dual-model summarisation (OpenAI GPT-4 + HuggingFace DistilBART fallback) → Streamlit dashboard with smart API rate-limit handling.",
    tags: ["Python", "GPT-4", "HuggingFace", "Streamlit", "REST API", "DistilBART"],
    category: "AI / LLM",
    emoji: "📰",
    color: "from-pink-500 to-rose-500",
    gradient: "from-pink-50 to-rose-50",
    github: "https://github.com/kanishkkapoor15/news-scrapping-llm",
    featured: true,
    highlight: "Dual-model fallback",
  },
  {
    title: "Project Aeroflow — Real-Time Pipeline",
    description: "Kafka → Azure Event Hubs → Databricks → Snowflake live dashboards",
    longDesc:
      "End-to-end real-time airline delay data pipeline: FastAPI producer → Apache Kafka → Azure Event Hubs → Databricks PySpark (Bronze/Silver/Gold) → Snowflake → live Snowsight KPI dashboards.",
    tags: ["Python", "Kafka", "Azure", "Databricks", "Snowflake", "PySpark"],
    category: "Data Engineering",
    emoji: "✈️",
    color: "from-sky-500 to-blue-600",
    gradient: "from-sky-50 to-blue-50",
    github: "https://github.com/kanishkkapoor15/US-flight-delay-data-pipeline",
    featured: true,
    highlight: "Multi-layer Medallion",
  },
  {
    title: "E-Commerce Sales Pipeline",
    description: "Kafka + Spark + AWS S3 real-time order streaming",
    longDesc:
      "Real-time order streaming pipeline: FastAPI event source → Kafka → Spark stream processing → structured JSON in AWS S3 with Airflow orchestration and Docker containerisation.",
    tags: ["Kafka", "Spark", "AWS S3", "Airflow", "Docker", "FastAPI"],
    category: "Data Engineering",
    emoji: "🛒",
    color: "from-orange-500 to-amber-500",
    gradient: "from-orange-50 to-amber-50",
    github: "https://github.com/kanishkkapoor15/E-commerce-Sales-Data-Pipeline",
    featured: false,
  },
  {
    title: "European Water Quality ML Model",
    description: "ML pipeline on 5M+ records for pollution risk prediction",
    longDesc:
      "Research-grade ML pipeline on 5M+ European environmental records. Spatio-temporal feature engineering, gradient boosting for nitrate/phosphate pollution risk prediction across 4 water body types.",
    tags: ["Python", "XGBoost", "Scikit-learn", "Pandas", "Feature Engineering"],
    category: "Machine Learning",
    emoji: "💧",
    color: "from-cyan-500 to-teal-500",
    gradient: "from-cyan-50 to-teal-50",
    github: "https://github.com/kanishkkapoor15/European_Water_Quality_Modelling",
    featured: true,
    highlight: "5M+ records",
  },
  {
    title: "Transaction Fraud Detection",
    description: "FinTech fraud analysis on 18K+ transactions with XGBoost",
    longDesc:
      "FinTech fraud detection on 18K+ transactions with feature engineering, statistical validation (ANOVA, Mann-Whitney U), XGBoost with deliberate class-imbalance handling.",
    tags: ["Python", "XGBoost", "ANOVA", "Scikit-learn", "FinTech"],
    category: "Machine Learning",
    emoji: "🔐",
    color: "from-red-500 to-pink-600",
    gradient: "from-red-50 to-pink-50",
    github: "https://github.com/kanishkkapoor15/Transaction-Fraud-Analysis",
    featured: false,
  },
  {
    title: "Diabetes Prediction — 250K+ Records",
    description: "EDA → XGBoost: 86% accuracy on BRFSS2015 dataset",
    longDesc:
      "End-to-end statistical + ML research on 250K+ public health records. Hypothesis testing → logistic regression → XGBoost achieving 86% accuracy on BRFSS2015 dataset.",
    tags: ["Python", "XGBoost", "Pandas", "Statistical Testing", "Public Health"],
    category: "Machine Learning",
    emoji: "🏥",
    color: "from-emerald-500 to-green-600",
    gradient: "from-emerald-50 to-green-50",
    github: "https://github.com/kanishkkapoor15/Diabetes_Statistical_Model",
    featured: false,
    highlight: "86% accuracy",
  },
  {
    title: "G&G E-Commerce — MERN + AI",
    description: "Full-stack MERN app powered by TensorFlow AI recommendations",
    longDesc:
      "Full-stack MERN Stack e-commerce application powered by Artificial Intelligence and Data Science libraries including TensorFlow for product recommendations.",
    tags: ["JavaScript", "React", "Node.js", "MongoDB", "TensorFlow", "Express"],
    category: "Full Stack",
    emoji: "🛍️",
    color: "from-yellow-500 to-orange-500",
    gradient: "from-yellow-50 to-orange-50",
    github: "https://github.com/kanishkkapoor15/G-G-ECOMMERCE",
    featured: false,
    highlight: "⭐ 1 Star",
  },
  {
    title: "Healthcare ELT — Snowflake",
    description: "FastAPI + Snowflake ELT system for hospital records",
    longDesc:
      "FastAPI backend simulating 100+ hospital records with Snowflake-based ELT pipeline for healthcare data warehousing and analytics.",
    tags: ["Python", "FastAPI", "Snowflake", "ELT", "Healthcare"],
    category: "Data Engineering",
    emoji: "🏨",
    color: "from-indigo-500 to-violet-500",
    gradient: "from-indigo-50 to-violet-50",
    github: "https://github.com/kanishkkapoor15/Healthcare-Data-Snowpipe",
    featured: false,
  },
  {
    title: "Energy Demand Forecasting",
    description: "XGBoost & LSTM models for energy expenditure analysis",
    longDesc:
      "Comprehensive energy demand forecasting combining XGBoost gradient boosting with LSTM deep learning for accurate time-series predictions.",
    tags: ["Python", "XGBoost", "LSTM", "TensorFlow", "Time Series"],
    category: "Machine Learning",
    emoji: "⚡",
    color: "from-yellow-400 to-amber-500",
    gradient: "from-yellow-50 to-amber-50",
    github: "https://github.com/kanishkkapoor15/Energy-Expenditure-Analysis",
    featured: false,
  },
  {
    title: "Radioactivity Forecasting — Czech Republic",
    description: "SARIMA, TBATS and ETS time-series models",
    longDesc:
      "Advanced time-series analysis of radioactivity levels in Czech Republic using SARIMA, TBATS, and ETS models for accurate environmental forecasting.",
    tags: ["R", "SARIMA", "TBATS", "ETS", "Time Series", "Environmental"],
    category: "Machine Learning",
    emoji: "☢️",
    color: "from-green-500 to-teal-500",
    gradient: "from-green-50 to-teal-50",
    github: "https://github.com/kanishkkapoor15/Radioactivity_Forecasting_Czech_Republic",
    featured: false,
  },
  {
    title: "Indian Geographical Problems Analyser",
    description: "React app mapping social challenges across India",
    longDesc:
      "Front-end React application using data science strategies to visualise and map social challenges across India on an interactive geographical interface.",
    tags: ["JavaScript", "React", "Data Visualisation", "GIS", "D3.js"],
    category: "Full Stack",
    emoji: "🗺️",
    color: "from-orange-400 to-red-500",
    gradient: "from-orange-50 to-red-50",
    github: "https://github.com/kanishkkapoor15/indian-geographical-problems-analyzer",
    featured: false,
  },
];

const categories = ["All", "AI / LLM", "Data Engineering", "Machine Learning", "Full Stack"];

export default function Projects() {
  const [ref, inView] = useInView({ threshold: 0.05, triggerOnce: true });
  const [activeCategory, setActiveCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filtered =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  const displayed = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section
      id="projects"
      ref={ref}
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white via-pink-50/20 to-white"
    >
      <div className="section-blob w-80 h-80 bg-pink-300 top-0 -right-10" />
      <div className="section-blob w-80 h-80 bg-violet-300 bottom-20 -left-10" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 text-pink-700 text-sm font-semibold mb-4">
            <Layers className="w-4 h-4" /> Projects
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
            What I&apos;ve{" "}
            <span className="bg-gradient-to-r from-pink-500 to-violet-600 bg-clip-text text-transparent">
              Built
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            30+ projects spanning AI, data engineering, machine learning, and full-stack development.
          </p>
        </motion.div>

        {/* Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          <Filter className="w-4 h-4 text-slate-400 self-center" />
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-violet-500 to-pink-500 text-white shadow-md shadow-violet-200"
                  : "glass border border-slate-200 text-slate-600 hover:border-violet-300"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {displayed.map((project, i) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ y: -8, scale: 1.02 }}
                className={`gradient-border glass rounded-2xl p-6 shadow-sm border border-white/80 bg-gradient-to-br ${project.gradient} flex flex-col gap-4 cursor-default group`}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center text-xl shadow-md`}
                  >
                    {project.emoji}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.highlight && (
                      <span className="px-2 py-0.5 rounded-full bg-white/80 text-xs font-bold text-slate-600 border border-slate-200">
                        {project.highlight}
                      </span>
                    )}
                    {project.featured && (
                      <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-slate-800 text-lg leading-tight mb-2">
                    {project.title}
                  </h3>
                  <p className="text-sm text-slate-500 mb-3 leading-relaxed">
                    {project.longDesc}
                  </p>

                  {/* Category badge */}
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-lg bg-gradient-to-r ${project.color} text-white text-xs font-bold mb-3`}
                  >
                    {project.category}
                  </span>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-white/70 text-slate-600 text-xs font-medium border border-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-1 rounded-lg bg-white/70 text-slate-400 text-xs font-medium">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-2 border-t border-white/60">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-violet-600 transition-colors group-hover:gap-3"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                    <ExternalLink className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show More */}
        {filtered.length > 6 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            className="text-center mt-10"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              className="px-8 py-3.5 rounded-2xl glass border-2 border-violet-200 text-violet-700 font-semibold hover:border-violet-400 transition-colors"
            >
              {showAll ? "Show Less ↑" : `Show All ${filtered.length} Projects ↓`}
            </motion.button>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/kanishkkapoor15"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-slate-800 to-slate-700 text-white font-semibold shadow-lg hover:shadow-xl transition-shadow"
          >
            <Github className="w-5 h-5" />
            View All 31 Repos on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
