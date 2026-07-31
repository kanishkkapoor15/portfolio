"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {
  ExternalLink, Github, Star, Filter, Layers,
  Bot, Newspaper, PlaneTakeoff, ShoppingCart, Droplets,
  ShieldAlert, HeartPulse, Store, Hospital, Zap,
  Radiation, Map, Brain, Users, Scale, Car,
  UserMinus, Scan, DollarSign, CreditCard, Activity,
  AlertTriangle, PieChart, Landmark, Truck, ShoppingBag,
  GitBranch, Wind, TrendingUp, Globe,
  type LucideIcon,
} from "lucide-react";
import KineticHeading from "./KineticHeading";

type Project = {
  title: string;
  description: string;
  longDesc: string;
  tags: string[];
  category: string;
  icon: LucideIcon;
  color: string;
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
    icon: Bot,
    color: "from-[#00D4FF] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/Product-Analytics-MCP-LLM-Agent",
    featured: true,
    highlight: "Pinned",
  },
  {
    title: "News Intelligence Dashboard",
    description: "Real-time pipeline with GPT-4 + HuggingFace dual-model summarisation",
    longDesc:
      "Real-time data pipeline: news API → dual-model summarisation (OpenAI GPT-4 + HuggingFace DistilBART fallback) → Streamlit dashboard with smart API rate-limit handling.",
    tags: ["Python", "GPT-4", "HuggingFace", "Streamlit", "REST API", "DistilBART"],
    category: "AI / LLM",
    icon: Newspaper,
    color: "from-[#7C3AED] to-[#10B981]",
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
    icon: PlaneTakeoff,
    color: "from-[#10B981] to-[#00D4FF]",
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
    icon: ShoppingCart,
    color: "from-[#00D4FF] to-[#10B981]",
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
    icon: Droplets,
    color: "from-[#7C3AED] to-[#00D4FF]",
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
    icon: ShieldAlert,
    color: "from-[#10B981] to-[#7C3AED]",
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
    icon: HeartPulse,
    color: "from-[#00D4FF] to-[#7C3AED]",
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
    icon: Store,
    color: "from-[#7C3AED] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/G-G-ECOMMERCE",
    featured: false,
  },
  {
    title: "Healthcare ELT — Snowflake",
    description: "FastAPI + Snowflake ELT system for hospital records",
    longDesc:
      "FastAPI backend simulating 100+ hospital records with Snowflake-based ELT pipeline for healthcare data warehousing and analytics.",
    tags: ["Python", "FastAPI", "Snowflake", "ELT", "Healthcare"],
    category: "Data Engineering",
    icon: Hospital,
    color: "from-[#10B981] to-[#00D4FF]",
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
    icon: Zap,
    color: "from-[#00D4FF] to-[#10B981]",
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
    icon: Radiation,
    color: "from-[#7C3AED] to-[#00D4FF]",
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
    icon: Map,
    color: "from-[#10B981] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/indian-geographical-problems-analyzer",
    featured: false,
  },

  // ── New projects ────────────────────────────────────────────
  {
    title: "Solas — AI Learning App for SEN Children",
    description: "AI-powered adaptive learning for autistic & special needs children in Ireland",
    longDesc:
      "Solas ('light' in Irish) is an AI-powered adaptive learning app built for autistic children and those with special educational needs in Ireland. Aligned to the NCCA Primary Curriculum, teaches Gaeilge through interest-based play, and bridges HSE waiting lists by generating structured session documentation.",
    tags: ["TypeScript", "Next.js", "AI", "React", "Tailwind CSS"],
    category: "Full Stack",
    icon: Brain,
    color: "from-[#00D4FF] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/solas-app",
    featured: true,
    highlight: "Social Impact",
  },
  {
    title: "Consulting MAS — Multi-Agentic AI System",
    description: "Multi-agent consulting intelligence with live market scraping & PDF reports",
    longDesc:
      "Multi-Agentic AI Consulting Intelligence System featuring epistemic governance, real-time market scraping, and automated professional PDF report generation. Orchestrates specialised agents for research, analysis, and synthesis.",
    tags: ["Python", "Multi-Agent", "LangGraph", "Web Scraping", "PDF Generation"],
    category: "AI / LLM",
    icon: Users,
    color: "from-[#7C3AED] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/consulting-mas",
    featured: true,
    highlight: "★ 1 Star",
  },
  {
    title: "PolicyBridge — Agentic Compliance Platform",
    description: "LangGraph + RAG platform converting policies to Irish/EU law compliance",
    longDesc:
      "Full-stack agentic compliance conversion platform. Multi-agent orchestration with LangGraph, ChromaDB RAG, and DeepSeek R1 reasoning to migrate company policies to Irish & EU law compliance. FastAPI backend + Next.js 14 frontend.",
    tags: ["Python", "LangGraph", "FastAPI", "ChromaDB", "RAG", "DeepSeek", "Next.js"],
    category: "AI / LLM",
    icon: Scale,
    color: "from-[#10B981] to-[#00D4FF]",
    github: "https://github.com/kanishkkapoor15/PolicyBridge",
    featured: true,
    highlight: "★ 1 Star",
  },
  {
    title: "NYC Taxi Pipeline — Azure Data Factory",
    description: "Azure Data Factory → Data Lake Gen2 → Databricks → Delta Lake",
    longDesc:
      "End-to-end data pipeline on 2024 NYC Taxi Trips dataset. Ingestion via Azure Data Factory into Azure Data Lake Gen2 (Parquet), transformation using Databricks + Apache Spark, served via Delta Lake with multi-zone Raw → Transformed → Serving architecture.",
    tags: ["Azure Data Factory", "Databricks", "Delta Lake", "PySpark", "Azure Data Lake"],
    category: "Data Engineering",
    icon: Car,
    color: "from-[#00D4FF] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/Taxi-Data-Pipeline-using-Azure-Data-Factory",
    featured: false,
  },
  {
    title: "Bank Churn Prediction — Deep Learning",
    description: "Binary classification deep learning model for customer churn in R",
    longDesc:
      "Deep learning binary classification model to predict bank customer churn using R. Implements neural network architectures with feature engineering and evaluation metrics for real-world retention analytics.",
    tags: ["R", "Deep Learning", "Neural Networks", "Classification", "Banking"],
    category: "Machine Learning",
    icon: UserMinus,
    color: "from-[#7C3AED] to-[#00D4FF]",
    github: "https://github.com/kanishkkapoor15/BankChurnPrediction",
    featured: false,
  },
  {
    title: "Breast Cancer Detection — CNN",
    description: "Convolutional Neural Network for breast cancer detection in R",
    longDesc:
      "Breast cancer detection model implemented using a CNN framework in R. Applies convolutional neural network architecture to medical imaging data for binary classification of malignant vs benign tissue.",
    tags: ["R", "CNN", "Deep Learning", "Medical Imaging", "Healthcare"],
    category: "Machine Learning",
    icon: Scan,
    color: "from-[#10B981] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/BreastCancerDetectionModel",
    featured: false,
  },
  {
    title: "Medical Insurance Cost Prediction",
    description: "Feedforward neural network for insurance cost prediction in R",
    longDesc:
      "Feedforward Neural Network model built in R for predicting medical insurance costs. Uses demographic and health attributes to model cost distributions with neural network regression.",
    tags: ["R", "FNN", "Neural Networks", "Regression", "Healthcare"],
    category: "Machine Learning",
    icon: DollarSign,
    color: "from-[#00D4FF] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/Medical-Insurance-Prediction-Model-using-FNN",
    featured: false,
  },
  {
    title: "Bank Loan Risk Assessment — FNN",
    description: "Feedforward neural network for bank loan risk scoring in R",
    longDesc:
      "Bank loan risk assessment model using Feedforward Neural Networks in R. Predicts probability of default using financial and demographic attributes with balanced class handling.",
    tags: ["R", "FNN", "Risk Modelling", "Classification", "Banking"],
    category: "Machine Learning",
    icon: CreditCard,
    color: "from-[#7C3AED] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/loanPredictionNeuralNetworks",
    featured: false,
  },
  {
    title: "Cirrhosis Survival Prediction",
    description: "Survival analysis and ML classification for cirrhosis patients in R",
    longDesc:
      "Cirrhosis survival prediction model in R applying machine learning classification and survival analysis techniques to clinical data for patient outcome forecasting.",
    tags: ["R", "Survival Analysis", "Classification", "Healthcare", "ML"],
    category: "Machine Learning",
    icon: Activity,
    color: "from-[#10B981] to-[#00D4FF]",
    github: "https://github.com/kanishkkapoor15/cirrhosisSurvivalPrediction",
    featured: false,
  },
  {
    title: "Fraud Forecasting — XGBoost in R",
    description: "ML classification + time-series forecasting for financial fraud in R",
    longDesc:
      "Combined ML classification and forecasting project for financial fraud detection. Uses XGBoost in R with temporal feature engineering and imbalance handling strategies for fraud pattern prediction.",
    tags: ["R", "XGBoost", "Fraud Detection", "Forecasting", "Classification"],
    category: "Machine Learning",
    icon: AlertTriangle,
    color: "from-[#00D4FF] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/fraudForecasting",
    featured: false,
  },
  {
    title: "Bank Customer Segmentation",
    description: "K-Means clustering for bank customer segmentation in R",
    longDesc:
      "Customer segmentation model using K-Means clustering algorithm in R. Identifies distinct customer profiles from banking behaviour data to support targeted marketing and product strategies.",
    tags: ["R", "K-Means", "Clustering", "Segmentation", "Banking"],
    category: "Machine Learning",
    icon: PieChart,
    color: "from-[#7C3AED] to-[#00D4FF]",
    github: "https://github.com/kanishkkapoor15/bankCustomerSegmentation",
    featured: false,
  },
  {
    title: "Loan Default Prediction Analysis",
    description: "Predict loan default probability using financial & demographic attributes",
    longDesc:
      "Loan default prediction model in R using financial and demographic attributes. Implements logistic regression and ensemble models to estimate default probability with calibrated outputs for risk decision-making.",
    tags: ["R", "Logistic Regression", "Risk", "Rebol", "Banking"],
    category: "Machine Learning",
    icon: Landmark,
    color: "from-[#10B981] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/bankLoanPredictionAnalysis",
    featured: false,
  },
  {
    title: "Smart Logistics Data Analytics",
    description: "Logistics analytics + XGBoost demand forecasting in R",
    longDesc:
      "End-to-end logistics data analytics project using R programming with XGBOOST demand forecasting. Analyses supply chain patterns, route efficiency, and demand signals to optimise logistics operations.",
    tags: ["R", "XGBoost", "Logistics", "Forecasting", "Analytics"],
    category: "Machine Learning",
    icon: Truck,
    color: "from-[#00D4FF] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/smartLogisticsDataAnalytics",
    featured: false,
    highlight: "★ 1 Star",
  },
  {
    title: "Black Friday Sales Forecasting",
    description: "Sales pattern identification and demand forecasting on BFA dataset",
    longDesc:
      "Black Friday sales data analytics project covering sales pattern identification, customer segmentation, and time-series demand forecasting using statistical methods in R.",
    tags: ["R", "Forecasting", "Sales Analytics", "Time Series", "EDA"],
    category: "Machine Learning",
    icon: ShoppingBag,
    color: "from-[#7C3AED] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/black-friday-sales-data-analytics",
    featured: false,
    highlight: "★ 1 Star",
  },
  {
    title: "Supply Chain Analysis",
    description: "Retail supply chain analytics with downloadable HTML report in R",
    longDesc:
      "Supply chain analysis of a retail store using R programming. Full data analysis report exportable as HTML, covering inventory performance, lead times, supplier analysis, and operational KPIs.",
    tags: ["R", "Supply Chain", "Retail Analytics", "HTML Report", "EDA"],
    category: "Data Engineering",
    icon: GitBranch,
    color: "from-[#10B981] to-[#00D4FF]",
    github: "https://github.com/kanishkkapoor15/supply_chain_analysis",
    featured: false,
    highlight: "★ 1 Star",
  },
  {
    title: "Sales Forecasting — Time Series",
    description: "Resilient time-series sales forecast using statistical Python models",
    longDesc:
      "Sales forecasting project using historical data to build resilient time series models in Python. Applies ARIMA, exponential smoothing, and statistical validation techniques for business demand planning.",
    tags: ["Python", "Time Series", "ARIMA", "Forecasting", "Statistics"],
    category: "Machine Learning",
    icon: TrendingUp,
    color: "from-[#00D4FF] to-[#10B981]",
    github: "https://github.com/kanishkkapoor15/sales-forecasting-time-series-model",
    featured: false,
  },
  {
    title: "India CO2 Emissions Predictor",
    description: "Python ML model forecasting India's national carbon emissions",
    longDesc:
      "Predictive model for India's CO2 emissions using Python. Applies regression and time-series techniques to environmental datasets, forecasting national carbon emission trends for climate analytics.",
    tags: ["Python", "Forecasting", "Environmental ML", "Regression", "Climate"],
    category: "Machine Learning",
    icon: Wind,
    color: "from-[#7C3AED] to-[#00D4FF]",
    github: "https://github.com/kanishkkapoor15/EPCM",
    featured: false,
  },
  {
    title: "Telecom Customer Churn Analysis",
    description: "Statistical churn analysis for a telecom company using R",
    longDesc:
      "Customer churn analysis for a telecom company using R programming. Combines statistical hypothesis testing, survival analysis, and predictive modelling to identify churn drivers and at-risk segments.",
    tags: ["R", "Churn Analysis", "Statistics", "Telecom", "Predictive Modelling"],
    category: "Machine Learning",
    icon: Globe,
    color: "from-[#10B981] to-[#7C3AED]",
    github: "https://github.com/kanishkkapoor15/churnAnalysis",
    featured: false,
  },
];

const categories = ["All", "AI / LLM", "Data Engineering", "Machine Learning", "Full Stack"];

const categoryColors: Record<string, string> = {
  "AI / LLM":         "from-[#00D4FF] to-[#7C3AED]",
  "Data Engineering": "from-[#10B981] to-[#00D4FF]",
  "Machine Learning": "from-[#7C3AED] to-[#10B981]",
  "Full Stack":       "from-[#00D4FF] to-[#10B981]",
};

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
      className="py-16 sm:py-24 px-4 sm:px-6 relative overflow-hidden bg-[#050A14]"
    >
      <div className="section-blob w-80 h-80 bg-[#7C3AED] top-0 -right-10" />
      <div className="section-blob w-80 h-80 bg-[#00D4FF] bottom-20 -left-10" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-10"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#7C3AED]/25 text-[#7C3AED] text-sm font-semibold font-mono mb-4">
            <Layers className="w-4 h-4" /> Projects
          </span>
          <KineticHeading
            className="text-4xl sm:text-5xl font-extrabold text-[#F0F6FF] mb-4"
            parts={[
              { text: "What I\u2019ve " },
              { text: "Built", className: "bg-gradient-to-r from-[#7C3AED] to-[#00D4FF] bg-clip-text text-transparent" },
            ]}
          />
          <p className="text-[#64748B] max-w-xl mx-auto text-lg">
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
          <Filter className="w-4 h-4 text-[#475569] self-center" />
          {categories.map((cat) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => { setActiveCategory(cat); setShowAll(false); }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold font-mono transition-all ${
                activeCategory === cat
                  ? "bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] text-white shadow-lg neon-cyan"
                  : "glass border border-[#00D4FF]/12 text-[#64748B] hover:border-[#00D4FF]/35 hover:text-[#00D4FF]"
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
                initial={{ opacity: 0, scale: 0.88, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.88, y: -10 }}
                transition={{ duration: 0.4, delay: i * 0.05, type: "spring", stiffness: 80 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  rotateX: 2,
                  rotateY: 2,
                }}
                className="gradient-border glass rounded-2xl p-6 border border-[#00D4FF]/10 flex flex-col gap-4 cursor-default group"
                style={{
                  transformStyle: "preserve-3d",
                  perspective: "1000px",
                  transition: "all 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                {/* Top Row */}
                <div className="flex items-start justify-between">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${project.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                  >
                    <project.icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex items-center gap-2">
                    {project.highlight && (
                      <span className="px-2 py-0.5 rounded-full bg-[#00D4FF]/10 text-xs font-bold text-[#00D4FF] border border-[#00D4FF]/20 font-mono">
                        {project.highlight}
                      </span>
                    )}
                    {project.featured && (
                      <Star className="w-4 h-4 text-[#00D4FF] fill-[#00D4FF]/60" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <h3 className="font-bold text-[#F0F6FF] text-lg leading-tight mb-2 group-hover:text-[#00D4FF] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#64748B] mb-3 leading-relaxed">
                    {project.longDesc}
                  </p>

                  {/* Category badge */}
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-lg bg-gradient-to-r ${categoryColors[project.category] || "from-[#00D4FF] to-[#7C3AED]"} text-white text-xs font-bold mb-3 font-mono`}
                  >
                    {project.category}
                  </span>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-lg bg-[#00D4FF]/5 text-[#64748B] text-xs font-medium border border-[#00D4FF]/10 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="px-2.5 py-1 rounded-lg bg-[#00D4FF]/5 text-[#475569] text-xs font-medium font-mono">
                        +{project.tags.length - 4}
                      </span>
                    )}
                  </div>
                </div>

                {/* Footer */}
                <div className="pt-3 border-t border-[#00D4FF]/8">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-semibold text-[#64748B] hover:text-[#00D4FF] transition-colors group-hover:gap-3 font-mono"
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
              className="px-8 py-3.5 rounded-xl glass border border-[#00D4FF]/25 text-[#00D4FF] font-semibold font-mono hover:border-[#00D4FF]/55 hover:bg-[#00D4FF]/5 transition-all"
            >
              {showAll ? "↑ Show Less" : `↓ Show All ${filtered.length} Projects`}
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
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl glass border border-[#00D4FF]/20 text-[#94A3B8] font-semibold font-mono hover:text-[#00D4FF] hover:border-[#00D4FF]/45 transition-all"
          >
            <Github className="w-5 h-5" />
            View All Repos on GitHub
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
