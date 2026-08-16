/**
 * Research article model.
 *
 * Articles are structured data rather than MDX so that every figure, chart and
 * metric is typed, renderable on the server, and reusable in metadata and
 * JSON-LD without parsing prose.
 */

export type Domain = "Real Estate & Development" | "Architecture & Predictive Design" | "Construction Management";

export type VizSpec =
  /** Before / after duration or cost comparison. */
  | {
      kind: "compression";
      caption: string;
      unit: string;
      rows: { label: string; before: number; after: number }[];
    }
  /** Grouped magnitude comparison across categories. */
  | {
      kind: "stack";
      caption: string;
      unit: string;
      bars: { label: string; value: number; tone?: "growth" | "brass" | "clay" | "slate" }[];
    }
  /** Projection over time, with the modelled portion marked. */
  | {
      kind: "curve";
      caption: string;
      unit: string;
      points: { x: string; y: number }[];
      /** Index from which the series becomes a projection rather than observation. */
      projectFrom: number;
    }
  /** Sequential agent pipeline. */
  | {
      kind: "flow";
      caption: string;
      steps: { label: string; detail: string }[];
    };

export type Block =
  | { t: "p"; text: string }
  | { t: "h"; text: string }
  | { t: "list"; items: string[] }
  | { t: "pull"; text: string }
  | { t: "viz"; spec: VizSpec }
  | { t: "note"; text: string };

/** A published paper an article analyses. Rendered as a citation and emitted
 *  into the article's JSON-LD, so the source is structured data rather than a
 *  link buried in prose. */
export type SourcePaper = {
  title: string;
  authors: string;
  venue: string;
  /** Publication or submission date, ISO or human-readable. */
  date: string;
  url: string;
  /** True when the full text is behind a paywall and some detail comes from
   *  the abstract or a summary rather than the complete paper. */
  paywalled?: boolean;
};

export type Article = {
  slug: string;
  domain: Domain;
  /** Headline. Written to be specific rather than clever. */
  title: string;
  /** One sentence that carries the claim, used as the meta description base. */
  dek: string;
  /** Publication date, ISO. */
  date: string;
  readingMinutes: number;
  /** Three headline numbers shown on the card and at the top of the article. */
  metrics: { value: string; label: string }[];
  /** Search terms this piece is written to serve. */
  keywords: string[];
  /** Set when the piece analyses published research rather than my own model. */
  sourcePaper?: SourcePaper;
  /**
   * Explicit two-line hook for the social card. Without it the card builds a
   * sentence from the chart's own bar labels, which only reads well when those
   * labels are task names.
   */
  cardHook?: { lead: string; counter: string };
  body: Block[];
};

export const DOMAINS: Domain[] = [
  "Real Estate & Development",
  "Architecture & Predictive Design",
  "Construction Management",
];

/** Accent per domain, matching the RETROFIT palette. */
export const DOMAIN_TONE: Record<Domain, { text: string; fill: string; border: string }> = {
  "Real Estate & Development": { text: "#1F6B3B", fill: "#2E8B4F", border: "#1F6B3B" },
  "Architecture & Predictive Design": { text: "#B0512E", fill: "#D06A45", border: "#B0512E" },
  "Construction Management": { text: "#1E7A8C", fill: "#1E7A8C", border: "#1E7A8C" },
};
