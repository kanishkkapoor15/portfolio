import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, CalendarClock } from "lucide-react";
import { ARTICLES, DOMAINS, DOMAIN_TONE } from "@/lib/research";

export const metadata: Metadata = {
  title: "Agentic AI Research for the Built Environment",
  description:
    "Field research on agentic AI across real estate development, architecture and construction management in Ireland and the UK. Quantified models of site selection, predictive design, lease compliance, document processing and reality capture.",
  keywords: [
    "agentic AI built environment",
    "AI construction Ireland",
    "AI real estate UK",
    "predictive design research",
    "construction AI research",
    "proptech AI Dublin",
  ],
  alternates: { canonical: "https://kanishkkapoor.com/research" },
  openGraph: {
    type: "website",
    url: "https://kanishkkapoor.com/research",
    title: "Agentic AI Research for the Built Environment",
    description:
      "Quantified research on agentic AI across development, design and construction in Ireland and the UK.",
  },
};

export default function ResearchIndex() {
  return (
    <main className="min-h-screen bg-[#F6F4EC]">
      {/* Masthead */}
      <header className="relative overflow-hidden border-b-4 border-[#3A2E26] bg-[#2E8B4F] lattice px-4 py-16 sm:px-6 sm:py-24">
        <div className="mx-auto max-w-6xl">
          <Link
            href="/"
            className="mb-8 inline-flex items-center gap-2 border-2 border-[#FDFBF3]/60 px-3 py-1.5 font-mono text-xs text-[#FDFBF3] transition-colors hover:bg-[#FDFBF3] hover:text-[#2E8B4F]"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> back to portfolio
          </Link>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.25em] text-[#FDFBF3]/80">
            Field research
          </p>
          <h1 className="display max-w-4xl text-5xl text-[#FDFBF3] sm:text-7xl">
            Agentic AI for the built environment
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[#FDFBF3]/90">
            Quantified models of where agents actually change the economics of development,
            design and construction across Ireland and the UK. Every figure states its
            assumptions.
          </p>
        </div>
      </header>

      {/* Domain index */}
      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="mb-12 flex flex-wrap gap-3">
          {DOMAINS.map((d) => (
            <a
              key={d}
              href={`#${d.replace(/\W+/g, "-").toLowerCase()}`}
              className="border-2 border-[#3A2E26] bg-[#FDFBF3] px-4 py-2 font-mono text-xs font-semibold text-[#3A2E26] transition-transform hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[3px_3px_0_#2E8B4F]"
            >
              {d}
            </a>
          ))}
        </div>

        {DOMAINS.map((domain) => {
          const posts = ARTICLES.filter((a) => a.domain === domain);
          const tone = DOMAIN_TONE[domain];
          return (
            <div key={domain} id={domain.replace(/\W+/g, "-").toLowerCase()} className="mb-16 scroll-mt-24">
              <div className="mb-6 flex items-center gap-4">
                <span className="h-4 w-4 flex-none" style={{ background: tone.fill }} />
                <h2 className="display text-3xl text-[#3A2E26] sm:text-4xl">{domain}</h2>
                <span className="h-0.5 flex-1 bg-[#EDE9DB]" />
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {posts.map((a) => (
                  <Link
                    key={a.slug}
                    href={`/research/${a.slug}`}
                    className="reveal-on-scroll group flex flex-col border-2 border-[#3A2E26] bg-[#FDFBF3] p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
                    style={{ boxShadow: `5px 5px 0 ${tone.fill}` }}
                  >
                    <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: tone.text }}>
                      {a.readingMinutes} min read
                    </p>
                    <h3 className="mt-3 text-2xl font-extrabold leading-tight tracking-tight text-[#3A2E26]">
                      {a.title}
                    </h3>
                    <p className="mt-3 flex-1 leading-relaxed text-[#6B5F54]">{a.dek}</p>

                    <div className="mt-5 grid grid-cols-3 gap-3 border-t-2 border-[#EDE9DB] pt-4">
                      {a.metrics.map((m) => (
                        <div key={m.label}>
                          <p className="font-mono text-sm font-bold" style={{ color: tone.text }}>
                            {m.value}
                          </p>
                          <p className="mt-0.5 text-[11px] leading-tight text-[#776959]">{m.label}</p>
                        </div>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#3A2E26]">
                      Read
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* Closing CTA */}
      <section className="border-t-4 border-[#3A2E26] bg-[#D06A45] lattice px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="display text-4xl text-[#FDFBF3] sm:text-5xl">
            Want this modelled against your own numbers?
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-[#FDFBF3]/90">
            Every model on this page is built from stated assumptions and takes an afternoon to
            re-run on a real portfolio, pipeline or project.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              href="https://calendly.com/kanishkkapoor15/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[#3A2E26] bg-[#FDFBF3] px-7 py-3.5 font-mono font-bold text-[#3A2E26] shadow-[5px_5px_0_#3A2E26] transition-transform hover:-translate-x-1 hover:-translate-y-1"
            >
              <CalendarClock className="h-4 w-4" /> Book a 30 min call
            </a>
            <Link
              href="/#contact"
              className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[#FDFBF3]/80 px-7 py-3.5 font-mono font-bold text-[#FDFBF3] transition-colors hover:bg-[#FDFBF3] hover:text-[#D06A45]"
            >
              Send an email <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
