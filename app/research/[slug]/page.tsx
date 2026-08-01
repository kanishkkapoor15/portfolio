import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, Mail, Info, CalendarClock } from "lucide-react";
import { ARTICLES, getArticle, relatedArticles, DOMAIN_TONE } from "@/lib/research";
import Viz from "@/components/research/Viz";

const SITE = "https://kanishkkapoor.com";

export function generateStaticParams() {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `${SITE}/research/${article.slug}`;

  return {
    title: article.title,
    description: article.dek,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: article.title,
      description: article.dek,
      publishedTime: article.date,
      authors: ["Kanishk Kapoor"],
      section: article.domain,
      tags: article.keywords,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.dek,
    },
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const tone = DOMAIN_TONE[article.domain];
  const related = relatedArticles(slug);
  const url = `${SITE}/research/${article.slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${url}#article`,
    headline: article.title,
    description: article.dek,
    datePublished: article.date,
    dateModified: article.date,
    inLanguage: "en-IE",
    articleSection: article.domain,
    keywords: article.keywords.join(", "),
    wordCount: article.body
      .filter((b) => b.t === "p" || b.t === "pull")
      .reduce((n, b) => n + ("text" in b ? b.text.split(/\s+/).length : 0), 0),
    author: {
      "@type": "Person",
      name: "Kanishk Kapoor",
      url: SITE,
      jobTitle: "Technical Accounts Manager",
      worksFor: { "@type": "Organization", name: "AI Institute" },
    },
    publisher: { "@type": "Person", name: "Kanishk Kapoor", url: SITE },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    isAccessibleForFree: true,
  };

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE },
      { "@type": "ListItem", position: 2, name: "Research", item: `${SITE}/research` },
      { "@type": "ListItem", position: 3, name: article.title, item: url },
    ],
  };

  return (
    <main className="min-h-screen bg-[#F6F4EC]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLd, breadcrumb]) }}
      />

      {/* Masthead */}
      <header
        className="relative overflow-hidden border-b-4 border-[#3A2E26] lattice px-4 py-14 sm:px-6 sm:py-20"
        style={{ background: tone.fill }}
      >
        <div className="mx-auto max-w-3xl">
          <Link
            href="/research"
            className="mb-7 inline-flex items-center gap-2 border-2 border-[#FDFBF3]/60 px-3 py-1.5 font-mono text-xs text-[#FDFBF3] transition-colors hover:bg-[#FDFBF3]"
            style={{ color: "#FDFBF3" }}
          >
            <ArrowLeft className="h-3.5 w-3.5" /> all research
          </Link>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-[#FDFBF3]/85">
            {article.domain} · {article.readingMinutes} min read
          </p>
          <h1 className="display text-4xl text-[#FDFBF3] sm:text-6xl">{article.title}</h1>
          <p className="mt-6 text-lg leading-relaxed text-[#FDFBF3]/90">{article.dek}</p>
        </div>
      </header>

      {/* Headline metrics */}
      <div className="border-b-2 border-[#EDE9DB] bg-[#FDFBF3] px-4 py-8 sm:px-6">
        <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {article.metrics.map((m) => (
            <div key={m.label} className="border-l-4 pl-4" style={{ borderColor: tone.fill }}>
              <p className="font-mono text-2xl font-extrabold text-[#3A2E26]">{m.value}</p>
              <p className="mt-1 text-sm text-[#776959]">{m.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <article className="mx-auto max-w-3xl px-4 py-14 sm:px-6">
        {article.body.map((block, i) => {
          if (block.t === "h")
            return (
              <h2
                key={i}
                className="mt-14 mb-5 text-3xl font-extrabold tracking-tight text-[#3A2E26] sm:text-4xl"
              >
                {block.text}
              </h2>
            );

          if (block.t === "p")
            return (
              <p key={i} className="mb-6 text-[17px] leading-[1.75] text-[#4A3F35]">
                {block.text}
              </p>
            );

          if (block.t === "list")
            return (
              <ul key={i} className="mb-7 flex flex-col gap-4">
                {block.items.map((item) => (
                  <li key={item} className="flex gap-3 text-[17px] leading-[1.7] text-[#4A3F35]">
                    <span
                      className="mt-2.5 h-2 w-2 flex-none"
                      style={{ background: tone.fill }}
                      aria-hidden
                    />
                    {item}
                  </li>
                ))}
              </ul>
            );

          if (block.t === "pull")
            return (
              <blockquote
                key={i}
                className="my-10 border-l-4 py-2 pl-6 text-2xl font-bold leading-snug tracking-tight text-[#3A2E26]"
                style={{ borderColor: tone.fill }}
              >
                {block.text}
              </blockquote>
            );

          if (block.t === "note")
            return (
              <aside
                key={i}
                className="my-9 flex gap-3 border-2 border-dashed border-[#C99A2E] bg-[#FDFBF3] p-5"
              >
                <Info className="mt-0.5 h-4 w-4 flex-none text-[#8A6A15]" />
                <p className="text-sm leading-relaxed text-[#6B5F54]">{block.text}</p>
              </aside>
            );

          return <Viz key={i} spec={block.spec} />;
        })}
      </article>

      {/* Article CTA */}
      <section className="border-y-4 border-[#3A2E26] bg-[#3A2E26] px-4 py-14 sm:px-6">
        <div className="mx-auto max-w-3xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#C99A2E]">
            Work with me
          </p>
          <h2 className="display mt-4 text-3xl text-[#F6F4EC] sm:text-5xl">
            Run this model against your own project
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-[#F6F4EC]/80">
            I am Kanishk Kapoor, Technical Accounts Manager at AI Institute in Dublin. I build
            agentic AI systems with built-environment teams across Ireland and the UK. If any
            figure here looks wrong for your business, that is the useful conversation. Send me
            your assumptions and I will re-run it.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="https://calendly.com/kanishkkapoor15/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[#3A2E26] bg-[#C99A2E] px-6 py-3.5 font-mono font-bold text-[#3A2E26] shadow-[5px_5px_0_#F6F4EC] transition-transform hover:-translate-x-1 hover:-translate-y-1"
            >
              <CalendarClock className="h-4 w-4" /> Book a 30 min call
            </a>
            <Link
              href="/#contact"
              className="inline-flex min-h-[44px] items-center gap-2 border-2 border-[#F6F4EC]/70 px-6 py-3.5 font-mono font-bold text-[#F6F4EC] transition-colors hover:bg-[#F6F4EC] hover:text-[#3A2E26]"
            >
              <Mail className="h-4 w-4" /> Or send an email
            </Link>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
        <h2 className="mb-6 font-mono text-xs uppercase tracking-[0.22em] text-[#776959]">
          Continue reading
        </h2>
        <div className="grid gap-6 md:grid-cols-2">
          {related.map((r) => {
            const t = DOMAIN_TONE[r.domain];
            return (
              <Link
                key={r.slug}
                href={`/research/${r.slug}`}
                className="group border-2 border-[#3A2E26] bg-[#FDFBF3] p-6 transition-transform duration-200 hover:-translate-x-1 hover:-translate-y-1"
                style={{ boxShadow: `5px 5px 0 ${t.fill}` }}
              >
                <p className="font-mono text-[11px] uppercase tracking-widest" style={{ color: t.text }}>
                  {r.domain}
                </p>
                <h3 className="mt-2 text-xl font-extrabold leading-tight tracking-tight text-[#3A2E26]">
                  {r.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#6B5F54]">{r.dek}</p>
                <span className="mt-4 inline-flex items-center gap-2 font-mono text-sm font-semibold text-[#3A2E26]">
                  Read <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
