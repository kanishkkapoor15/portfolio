import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanishk Kapoor | AI Developer & Data Engineer",
  description:
    "Personal portfolio of Kanishk Kapoor — AI Developer, Data Engineer & Software Engineer. MSc Computing (Data Analytics) at Dublin City University.",
  keywords: ["Kanishk Kapoor", "AI Developer", "Data Engineer", "Machine Learning", "Portfolio"],
  metadataBase: new URL("https://kanishkkapoor.com"),
  openGraph: {
    title: "Kanishk Kapoor | AI Developer & Data Engineer",
    description:
      "AI Developer with production experience in LLMs, agentic AI, and ML pipelines. 30+ projects · IBM · Medicidiom · DCU.",
    url: "https://kanishkkapoor.com",
    siteName: "Kanishk Kapoor Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanishk Kapoor | AI Developer & Data Engineer",
    description: "AI Developer with production experience in LLMs, agentic AI, and ML pipelines.",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32", type: "image/x-icon" },
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
