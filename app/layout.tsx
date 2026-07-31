import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

/* ─── Structured Data (JSON-LD) ──────────────────────────────── */
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://kanishkkapoor.com/#person",
      name: "Kanishk Kapoor",
      url: "https://kanishkkapoor.com",
      image: {
        "@type": "ImageObject",
        url: "https://kanishkkapoor.com/icon-512.png",
        width: 512,
        height: 512,
      },
      jobTitle: "AI Developer & Data Engineer",
      description:
        "AI Developer and Data Engineer based in Dublin, Ireland. MSc Computing (Data Analytics) at Dublin City University. Specialises in LLM pipelines, agentic AI systems, Apache Kafka, Azure Databricks, and production machine learning.",
      email: "kanishkkapoor15@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Dublin",
        addressCountry: "IE",
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "Dublin City University",
          url: "https://www.dcu.ie",
        },
        {
          "@type": "EducationalOrganization",
          name: "University of Petroleum & Energy Studies",
          url: "https://www.upes.ac.in",
        },
      ],
      worksFor: {
        "@type": "Organization",
        name: "Medicidiom",
      },
      knowsAbout: [
        "Artificial Intelligence",
        "Large Language Models",
        "Agentic AI",
        "Data Engineering",
        "Machine Learning",
        "Apache Kafka",
        "Apache Spark",
        "Azure Databricks",
        "Snowflake",
        "Python",
        "FastAPI",
        "LangChain",
        "RAG Pipelines",
        "OpenAI API",
        "Deep Learning",
        "Data Analytics",
      ],
      sameAs: [
        "https://github.com/kanishkkapoor15",
        "https://linkedin.com/in/kanishkapoor",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://kanishkkapoor.com/#website",
      url: "https://kanishkkapoor.com",
      name: "Kanishk Kapoor | AI Developer & Data Engineer",
      description:
        "Portfolio of Kanishk Kapoor — AI Developer, Data Engineer and ML Engineer based in Dublin, Ireland.",
      author: { "@id": "https://kanishkkapoor.com/#person" },
      inLanguage: "en-IE",
    },
    {
      "@type": "ProfilePage",
      "@id": "https://kanishkkapoor.com/#profilepage",
      url: "https://kanishkkapoor.com",
      name: "Kanishk Kapoor — AI Developer & Data Engineer Portfolio",
      about: { "@id": "https://kanishkkapoor.com/#person" },
      mainEntity: { "@id": "https://kanishkkapoor.com/#person" },
    },
  ],
};

/* ─── Viewport ───────────────────────────────────────────────── */
export const viewport: Viewport = {
  themeColor: "#2E8B4F",
  colorScheme: "light",
};

/* ─── Next.js Metadata ───────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL("https://kanishkkapoor.com"),

  title: {
    default: "Kanishk Kapoor | AI Developer & Data Engineer — Dublin",
    template: "%s | Kanishk Kapoor",
  },

  description:
    "Kanishk Kapoor — AI Developer & Data Engineer in Dublin, Ireland. MSc Computing (Data Analytics) at DCU. Expert in LLM pipelines, agentic AI, Apache Kafka, Azure Databricks, Snowflake, and production machine learning. 30+ projects · IBM · Medicidiom.",

  keywords: [
    "Kanishk Kapoor",
    "AI Developer Dublin",
    "Data Engineer Dublin",
    "Data Engineer Ireland",
    "LLM Developer Ireland",
    "Machine Learning Engineer Dublin",
    "Agentic AI Developer",
    "Python Developer Dublin",
    "AI Engineer portfolio",
    "DCU MSc Data Analytics",
    "Dublin City University AI",
    "Kafka developer",
    "Azure Databricks engineer",
    "Snowflake developer",
    "LangChain developer",
    "RAG pipeline engineer",
    "OpenAI API developer",
    "FastAPI developer",
    "Data pipeline engineer",
    "ML engineer portfolio",
    "kanishkkapoor15",
  ],

  authors: [{ name: "Kanishk Kapoor", url: "https://kanishkkapoor.com" }],
  creator: "Kanishk Kapoor",
  publisher: "Kanishk Kapoor",
  category: "Technology",

  openGraph: {
    type: "profile",
    locale: "en_IE",
    url: "https://kanishkkapoor.com",
    siteName: "Kanishk Kapoor Portfolio",
    title: "Kanishk Kapoor | AI Developer & Data Engineer — Dublin, Ireland",
    description:
      "AI Developer & Data Engineer building production LLM pipelines, agentic AI systems, and real-time data infrastructure. 30+ projects · IBM · Medicidiom · DCU MSc.",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Kanishk Kapoor — AI Developer & Data Engineer",
      },
    ],
    firstName: "Kanishk",
    lastName: "Kapoor",
    username: "kanishkkapoor15",
  },

  twitter: {
    card: "summary_large_image",
    title: "Kanishk Kapoor | AI Developer & Data Engineer",
    description:
      "Building production LLM pipelines, agentic AI systems, and real-time data infrastructure. 30+ projects · IBM · Medicidiom · DCU.",
    images: ["/opengraph-image.png"],
    creator: "@kanishkkapoor",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  alternates: {
    canonical: "https://kanishkkapoor.com",
  },

  icons: {
    icon: [
      { url: "/favicon.ico",    sizes: "32x32", type: "image/x-icon" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [
      { rel: "icon", url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { rel: "icon", url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  },

  manifest: "/site.webmanifest",

  verification: {
    // Add your Google Search Console verification code here:
    // google: "your-google-verification-code",
    other: { "msvalidate.01": "D3DC06D162624BCE8DEB4263D1AE52B1" },
  },
};

/* ─── Root Layout ────────────────────────────────────────────── */
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IE" className="scroll-smooth">
      <body className={inter.className}>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
