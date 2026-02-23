"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail, Heart, ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-slate-900 text-white py-12 px-4 sm:px-6">
      {/* Decorative gradient top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D4952A] to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Logo & credit */}
          <div className="flex flex-col items-center sm:items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#6B2080] to-[#D4952A] flex items-center justify-center text-sm font-bold">
                KK
              </div>
              <span className="font-bold text-lg bg-gradient-to-r from-[#C57BB8] to-[#D4952A] bg-clip-text text-transparent">
                Kanishk Kapoor
              </span>
            </div>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              Built with <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400 inline" /> &
              Next.js · Dublin, Ireland 🇮🇪
            </p>
          </div>

          {/* Nav */}
          <div className="flex items-center gap-6 text-sm text-slate-400">
            {["#home", "#about", "#skills", "#experience", "#projects", "#contact"].map(
              (href) => (
                <a
                  key={href}
                  href={href}
                  className="hover:text-white transition-colors capitalize"
                >
                  {href.slice(1)}
                </a>
              )
            )}
          </div>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {[
              { icon: Github, href: "https://github.com/kanishkkapoor15", label: "GitHub" },
              { icon: Linkedin, href: "https://linkedin.com/in/kanishkapoor", label: "LinkedIn" },
              { icon: Mail, href: "mailto:kanishkkapoor15@gmail.com", label: "Email" },
            ].map(({ icon: Icon, href, label }) => (
              <motion.a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="p-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-slate-400 hover:text-white transition-all"
                aria-label={label}
              >
                <Icon className="w-4 h-4" />
              </motion.a>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Kanishk Kapoor. All rights reserved.</p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-all border border-white/10"
          >
            <ArrowUp className="w-3.5 h-3.5" />
            Back to top
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
