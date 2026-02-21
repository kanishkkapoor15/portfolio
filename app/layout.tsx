import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanishk Kapoor | AI Developer & Data Engineer",
  description:
    "Personal portfolio of Kanishk Kapoor — AI Developer, Data Engineer & Software Engineer. MSc Computing (Data Analytics) at Dublin City University.",
  keywords: ["Kanishk Kapoor", "AI Developer", "Data Engineer", "Machine Learning", "Portfolio"],
  metadataBase: new URL("https://kanishkkapoor15.vercel.app"),
  openGraph: {
    title: "Kanishk Kapoor | AI Developer & Data Engineer",
    description:
      "AI Developer with production experience in LLMs, agentic AI, and ML pipelines. 30+ projects · IBM · Medicidiom · DCU.",
    url: "https://kanishkkapoor15.vercel.app",
    siteName: "Kanishk Kapoor Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kanishk Kapoor | AI Developer & Data Engineer",
    description: "AI Developer with production experience in LLMs, agentic AI, and ML pipelines.",
  },
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
      </body>
    </html>
  );
}
