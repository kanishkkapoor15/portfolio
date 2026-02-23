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
      color: "from-[#7A1535] to-[#C57BB8]",
      copyable: true,
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+353 899 595 536",
      href: "tel:+353899595536",
      color: "from-[#6B2080] to-[#D4952A]",
      copyable: true,
    },
    {
      icon: Github,
      label: "GitHub",
      value: "kanishkkapoor15",
      href: "https://github.com/kanishkkapoor15",
      color: "from-slate-600 to-slate-800",
      copyable: false,
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      value: "in/kanishkapoor",
      href: "https://linkedin.com/in/kanishkapoor",
      color: "from-[#D4952A] to-[#C57BB8]",
      copyable: false,
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Dublin, Ireland 🇮🇪",
      href: "#",
      color: "from-[#6B2080] to-[#7A1535]",
      copyable: false,
    },
  ];

  return (
    <section
      id="contact"
      ref={ref}
      className="py-24 px-4 sm:px-6 relative overflow-hidden bg-gradient-to-b from-white to-[#6B2080]/5"
    >
      <div className="section-blob w-96 h-96 bg-[#6B2080] top-0 -left-20" />
      <div className="section-blob w-80 h-80 bg-[#D4952A] bottom-0 right-0" />

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#6B2080]/10 text-[#6B2080] text-sm font-semibold mb-4">
            <MessageSquare className="w-4 h-4" /> Get in Touch
          </span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-slate-800 mb-4">
            Let&apos;s{" "}
            <span className="bg-gradient-to-r from-[#6B2080] to-[#D4952A] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
          <p className="text-slate-500 max-w-xl mx-auto text-lg">
            Open to internships, graduate roles, and exciting project collaborations.
            Let&apos;s build something great together!
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-3xl p-6 shadow-sm border border-white/80 mb-2">
              <h3 className="text-lg font-bold text-slate-800 mb-2 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-[#6B2080]" /> Say Hello</h3>
              <p className="text-slate-500 text-sm leading-relaxed">
                Whether you&apos;re a recruiter, a fellow developer, or someone with an
                interesting project — I&apos;d love to hear from you. I typically respond within
                24 hours.
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
                  className="glass rounded-2xl p-4 shadow-sm border border-white/80 flex items-center gap-4"
                >
                  <div
                    className={`w-10 h-10 rounded-xl bg-gradient-to-br ${contact.color} flex items-center justify-center flex-shrink-0`}
                  >
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-400 font-medium">{contact.label}</p>
                    <p className="text-sm font-semibold text-slate-700 truncate">{contact.value}</p>
                  </div>
                  <div className="flex gap-2">
                    {contact.copyable && (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleCopy(contact.value, contact.label)}
                        className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
                        title="Copy"
                      >
                        {copied === contact.label ? (
                          <CheckCheck className="w-4 h-4 text-green-500" />
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
                        className="p-1.5 rounded-lg hover:bg-[#6B2080]/5 text-slate-400 hover:text-[#6B2080] transition-colors"
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
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <form
              onSubmit={handleSubmit}
              className="glass rounded-3xl p-8 shadow-sm border border-white/80"
            >
              <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Send className="w-5 h-5 text-[#6B2080]" />
                Send a Message
              </h3>

              <div className="flex flex-col gap-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2080]/30 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-600 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2080]/30 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Job Opportunity / Collaboration / ..."
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2080]/30 focus:border-transparent transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-600 mb-1.5">
                    Message
                  </label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Hi Kanishk, I'd love to discuss..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/80 text-slate-700 placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-[#6B2080]/30 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white shadow-md transition-all flex items-center justify-center gap-2 ${
                    sent
                      ? "bg-green-500 shadow-green-200"
                      : "bg-gradient-to-r from-[#6B2080] to-[#D4952A] shadow-[#6B2080]/20 hover:shadow-[#6B2080]/35"
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
