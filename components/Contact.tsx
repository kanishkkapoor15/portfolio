"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Mail, Github, Linkedin, MapPin, Send, MessageSquare, Phone, Copy, CheckCheck } from "lucide-react";

export default function Contact() {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });
  const [copied, setCopied] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:kanishkkapoor15@gmail.com?subject=${encodeURIComponent(form.subject || "Portfolio Enquiry")}&body=${encodeURIComponent(`Hi Kanishk,\n\n${form.message}\n\nBest regards,\n${form.name}\n${form.email}`)}`;
    window.location.href = mailtoLink;
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  const contacts = [
    {
      icon: Mail,
      label: "Email",
      value: "kanishkkapoor15@gmail.com",
      href: "mailto:kanishkkapoor15@gmail.com",
      color: "from-[#00D4FF] to-[#7C3AED]",
      glow: "rgba(0,212,255,0.25)",
      copyable: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+353 899 595 536",
      href: "tel:+353899595536",
      color: "from-[#7C3AED] to-[#10B981]",
      glow: "rgba(124,58,237,0.25)",
      copyable: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "kanishkkapoor15",
      href: "https://github.com/kanishkkapoor15",
      color: "from-[#94A3B8] to-[#64748B]",
      glow: "rgba(148,163,184,0.2)",
      copyable: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/kanishkapoor",
      href: "https://linkedin.com/in/kanishkapoor",
      color: "from-[#10B981] to-[#00D4FF]",
      glow: "rgba(16,185,129,0.25)",
      copyable: false,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dublin, Ireland 🇮🇪",
      href: "#",
      color: "from-[#7C3AED] to-[#00D4FF]",
      glow: "rgba(124,58,237,0.2)",
      copyable: false,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-[#080F1A]"
    >
      <div className="section-blob w-96 h-96 bg-[#00D4FF] top-0 -left-20" />
      <div className="section-blob w-80 h-80 bg-[#7C3AED] bottom-0 right-0" />
      <div className="absolute inset-0 data-grid opacity-40" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, type: "spring", stiffness: 80 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-[#00D4FF]/20 text-[#00D4FF] text-sm font-semibold font-mono mb-4">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-[#F0F6FF] mb-4">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-[#64748B] max-w-xl mx-auto text-lg">
            Open to internships, graduate roles, and exciting project collaborations.
            Let&apos;s build something great together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2, type: "spring", stiffness: 70 }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-3xl p-6 border border-[#00D4FF]/12 mb-2">
              <h3 className="text-lg font-bold text-[#F0F6FF] mb-2 flex items-center gap-2 font-mono">
                <MessageSquare className="w-4 h-4 text-[#00D4FF]" /> Say Hello
              </h3>
              <p className="text-[#64748B] text-sm leading-relaxed">
                Whether you&apos;re a recruiter, a fellow developer, or someone with an
                interesting project — I&apos;d love to hear from you. I typically respond
                within 24 hours.
              </p>
            </div>

            {contacts.map((contact, i) => {
              const Icon = contact.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                  whileHover={{ x: 4, scale: 1.01 }}
                  className="glass rounded-2xl p-4 border border-[#00D4FF]/10 hover:border-[#00D4FF]/30 flex items-center gap-4 transition-all"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center flex-shrink-0`}
                    style={{ boxShadow: `0 0 16px ${contact.glow}` }}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-[#475569] font-medium font-mono">{contact.label}</p>
                    <p className="text-sm font-semibold text-[#94A3B8] truncate">{contact.value}</p>
                  </div>
                  <div className="flex gap-2">
                    {contact.copyable && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(contact.value, contact.label)}
                        className="p-1.5 rounded-lg hover:bg-[#00D4FF]/8 text-[#475569] hover:text-[#00D4FF] transition-colors"
                        title="Copy"
                      >
                        {copied === contact.label ? (
                          <CheckCheck className="w-4 h-4 text-[#10B981]" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </motion.button>
                    )}
                    {contact.href !== "#" && (
                      <motion.a
                        href={contact.href}
                        target={contact.href.startsWith("http") ? "_blank" : undefined}
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.1 }}
                        className="p-1.5 rounded-lg hover:bg-[#00D4FF]/8 text-[#475569] hover:text-[#00D4FF] transition-colors"
                      >
                        <Send className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4, type: "spring", stiffness: 70 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 border border-[#00D4FF]/12"
            >
              <h3 className="text-xl font-bold text-[#F0F6FF] mb-6 flex items-center gap-2 font-mono">
                <Send className="w-5 h-5 text-[#00D4FF]" />
                Send a Message
              </h3>

              <div className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1.5 font-mono uppercase tracking-wide">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-[#475569] mb-1.5 font-mono uppercase tracking-wide">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1.5 font-mono uppercase tracking-wide">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Job Opportunity / Collaboration / ..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#475569] mb-1.5 font-mono uppercase tracking-wide">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Hi Kanishk, I'd love to discuss..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="input-dark w-full px-4 py-3 rounded-xl text-sm resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-lg transition-all flex items-center justify-center gap-2 font-mono ${
                    sent
                      ? "bg-[#10B981] shadow-[#10B981]/20"
                      : "bg-gradient-to-r from-[#00D4FF] to-[#7C3AED] neon-cyan hover:opacity-90"
                  }`}
                >
                  {sent ? (
                    <>
                      <CheckCheck className="w-5 h-5" /> Opening email client...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" /> Send Message
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
