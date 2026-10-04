import type { Media } from "@/components/Figure";

export type Experience = {
  slug: string; org: string; title: string; summary: string;
  meta: { k: string; v: string }[];
  links?: { label: string; href: string }[];
  hero?: Media; heroCaption?: string;
  body: string[];
};

export const experience: Experience[] = [
  {
    slug: "zhidian",
    org: "Zhidian AI / Z.ai",
    title: "Agentic Systems Intern",
    summary: "Agentic education products on GLM, and a meta-agent that designs agent graphs.",
    meta: [
      { k: "Role", v: "Agentic Systems Intern" },
      { k: "Dates", v: "Jul 2026 – Aug 2026" },
    ],
    links: [{ label: "Teach me anything", href: "#" }], // TODO: URL
    hero: { kind: "embed", src: "about:blank", title: "Teach me anything", height: 620 }, // TODO: set src to the teach-me-anything URL
    heroCaption: "Teach me anything, live.",
    body: [
      "I joined Zhidian while the team was still part of Z.ai and stayed through its spinout as an independent, Z.ai-backed company. The work centered on agentic education products built on Z.ai's GLM models, including the teach-me-anything tutor embedded above.",
      "My main contribution was a meta-agentic system that automates agent graph design: given a task, it handles decomposition, chooses the multi-agent layout, and decides the memory structure and retrieval strategy, producing a runnable agent graph rather than a hand-wired one.",
    ],
  },
  {
    slug: "noematrix",
    org: "Noematrix",
    title: "Post-Training Intern",
    summary: "Post-trained a world-action model for real-robot pick-and-place and deployed it on a dual-arm robot.",
    meta: [
      { k: "Role", v: "Post-Training Intern" },
      { k: "Dates", v: "Aug 2026 – Sep 2026" },
    ],
    hero: { kind: "video", src: "/videos/noematrix-demo.mp4" }, // TODO: add file
    heroCaption: "Post-trained FastWAM on a dual-arm robot: eggs into trays, tools back into the toolbox.",
    body: [
      "At Noematrix, an embodied-intelligence company building vision-language-action models, I post-trained FastWAM, a pretrained world-action model, for real-robot pick-and-place tasks such as placing eggs into trays and returning tools to toolboxes.",
      "I deployed the post-trained checkpoint to a dual-arm real robot through the team's inference server, integrating it with the gripper and device pipeline. Real-robot pick-and-place success rose from 0% with the pretrained baseline to 33%. The evaluation work here is what motivated robostats.",
    ],
  },
  {
    slug: "moonshot",
    org: "Moonshot AI",
    title: "Incoming Agentic Systems Intern",
    summary: "Joining the Kimi agents team to continue work on automated agent orchestration.",
    meta: [
      { k: "Role", v: "Agentic Systems Intern" },
      { k: "Dates", v: "Jul 2027" },
    ],
    body: [
      "In summer 2027 I will join the Kimi agents team at Moonshot AI as an agentic systems intern, continuing the line of work from Zhidian on automated agent orchestration and multi-agent graph design.",
    ],
  },
];
