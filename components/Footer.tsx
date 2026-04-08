"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, ArrowUp, Terminal } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-[#030810] text-[#F0F6FF] py-12 px-4 sm:px-6">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D4FF]/60 to-transparent" />

      {/* Subtle data grid */}
      <div className="absolute inset-0 data-grid opacity-30" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & credit */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#00D4FF] to-[#7C3AED] flex items-center justify-center shadow-lg neon-cyan">
                <Terminal className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent font-mono">
                Kanishk Kapoor
              </span>
            </div>
            <p className="text-[#475569] text-sm font-mono">
              Built with Next.js · Dublin, Ireland 🇮🇪
            </p>
          </div>

          {/* Nav */}
          <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-[#475569] font-mono">
            {["#home", "#about", "#skills", "#experience", "#projects", "#contact"].map(
              (href) => (
                <a
                  key={href}
                  href={href}
                  className="hover:text-[#00D4FF] transition-colors"
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
                className="p-2 rounded-xl glass border border-[#00D4FF]/10 text-[#475569] hover:text-[#00D4FF] hover:border-[#00D4FF]/35 transition-all"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-[#00D4FF]/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#2D3748] font-mono">
          <p>© {new Date().getFullYear()} Kanishk Kapoor. All rights reserved.</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg glass border border-[#00D4FF]/12 text-[#475569] hover:text-[#00D4FF] hover:border-[#00D4FF]/35 transition-all"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
