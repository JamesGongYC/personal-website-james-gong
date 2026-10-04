import type { Metadata } from "next";
import Article from "@/components/Article";
import { experience } from "@/content/experience";

const e = experience.find((x) => x.slug === "moonshot")!;
export const metadata: Metadata = { title: e.org, description: e.summary };

export default function Page() {
  return <Article eyebrow={e.title} title={e.org} summary={e.summary} meta={e.meta} links={e.links} hero={e.hero} heroCaption={e.heroCaption} body={e.body} />;
}
