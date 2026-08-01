"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden block-verdant lattice py-16 px-4 sm:px-6 border-t-4 border-[#3A2E26]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-transparent" />

      {/* Subtle data grid */}
      <div className="absolute inset-0 opacity-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & credit */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-[#FDFBF3] flex items-center justify-center shadow-lg neon-cyan">
                <Terminal className="w-4 h-4 text-[#2E8B4F]" />
              </div>
              <span className="font-bold text-xl text-[#FDFBF3] font-mono">
                Kanishk Kapoor
              </span>
            </div>
            <p className="text-[#FDFBF3]/75 text-sm font-mono">
              AI agents for the built environment · Dublin, Ireland 🇮🇪
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#FDFBF3]/80 font-mono">
            {["#home", "#about", "#skills", "#experience", "#projects", "#research", "#contact"].map(
              (href) => (
                <a
                  key={href}
                  href={href}
                  className="inline-flex min-h-[44px] items-center px-1 hover:text-[#C99A2E] transition-colors"
                >
                  {href.slice(1)}
                </a>
              )
            )}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github,   href: "https://github.com/kanishkkapoor15",   label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/kanishkapoor", label: "LinkedIn" },
              { icon: Mail,     href: "mailto:kanishkkapoor15@gmail.com",     label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="grid h-11 w-11 place-items-center rounded-none border-2 border-[#FDFBF3]/60 text-[#FDFBF3] hover:bg-[#FDFBF3] hover:text-[#2E8B4F] transition-all"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 pt-6 border-t-2 border-[#FDFBF3]/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FDFBF3]/70 font-mono">
          <p>© {new Date().getFullYear()} Kanishk Kapoor. All rights reserved.</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex min-h-[44px] items-center gap-1.5 px-4 py-2 border-2 border-[#FDFBF3]/60 text-[#FDFBF3] hover:bg-[#FDFBF3] hover:text-[#2E8B4F] transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
