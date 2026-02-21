import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Kanishk Kapoor | AI Developer & Data Engineer",
  description:
    "Personal portfolio of Kanishk Kapoor — AI Developer, Data Engineer & Software Engineer. MSc Computing (Data Analytics) at Dublin City University.",
  keywords: ["Kanishk Kapoor", "AI Developer", "Data Engineer", "Machine Learning", "Portfolio"],
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
