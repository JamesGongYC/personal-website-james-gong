import type { Metadata } from "next";
import Article from "@/components/Article";
import { projects } from "@/content/projects";

const p = projects.find((x) => x.slug === "fireaidss")!;
export const metadata: Metadata = { title: p.title, description: p.summary };

export default function Page() {
  return <Article eyebrow="Project" {...p} />;
}
