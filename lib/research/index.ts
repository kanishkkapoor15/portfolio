import type { Article } from "./types.ts";
import { realEstateArticles } from "./realEstate.ts";
import { designArticles } from "./design.ts";
import { constructionArticles } from "./construction.ts";
import { paperArticles1 } from "./papers1.ts";
import { paperArticles2 } from "./papers2.ts";
import { paperArticles3 } from "./papers3.ts";

export * from "./types.ts";

/** Newest first. Order here drives the carousel and the index page. */
export const ARTICLES: Article[] = [
  // Paper analyses, newest work
  paperArticles2[0],   // adaptive exploration (TUM)
  paperArticles1[1],   // probabilistic cost estimation
  paperArticles1[0],   // MCP 4D progress monitoring
  paperArticles2[1],   // RL for code compliance
  paperArticles3[0],   // LLM automated compliance checking
  paperArticles3[1],   // cross-cutting synthesis

  realEstateArticles[0],
  designArticles[0],
  constructionArticles[0],
  realEstateArticles[1],
  designArticles[1],
  constructionArticles[1],
];

export function getArticle(slug: string): Article | undefined {
  return ARTICLES.find((a) => a.slug === slug);
}

export function relatedArticles(slug: string, limit = 2): Article[] {
  const current = getArticle(slug);
  if (!current) return ARTICLES.slice(0, limit);
  const sameDomain = ARTICLES.filter((a) => a.slug !== slug && a.domain === current.domain);
  const rest = ARTICLES.filter((a) => a.slug !== slug && a.domain !== current.domain);
  return [...sameDomain, ...rest].slice(0, limit);
}
