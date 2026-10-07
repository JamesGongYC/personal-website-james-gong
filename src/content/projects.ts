import type { Media } from "@/components/Figure";

export type Project = {
  slug: string; title: string; summary: string;
  meta: { k: string; v: string }[];
  links: { label: string; href: string }[];
  hero: Media; heroCaption?: string;
  body: string[];
  gallery?: { media: Media; caption?: string }[];
};

export const projects: Project[] = [
  {
    slug: "fireaidss",
    title: "FireAIDSS",
    summary: "An AI-driven drone swarm that monitors and predicts the 4D progression of wildfires in the field, in real time.",
    meta: [
      { k: "Role", v: "Lead, full stack" },
      { k: "Dates", v: "Sep 2024 – Sep 2026" },
      { k: "Stack", v: "PyTorch, PINNs, custom drones" },
      { k: "Recognition", v: "ISEF 3rd Grand Award" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/JamesGongYC" }, // TODO: repo URL
      { label: "Paper", href: "#" }, // TODO: paper URL
    ],
    hero: { kind: "image", src: "/images/fireaidss/concept.png", alt: "FireAIDSS concept: drone swarm over a wildfire reconstructing thermofluidic fields", width: 1600, height: 900 }, // TODO: add file
    heroCaption: "Concept: swarm sensing feeds a physics-informed reconstruction of the fire's thermofluidic field.",
    body: [
      "FireAIDSS is an end-to-end system for wildfire monitoring and prediction. A swarm of customized drones collects temperature and wind measurements over an active fire, and an AI model reconstructs the full thermofluidic field from those sparse samples, giving responders a live 4D picture of where the fire is and where it is heading.",
      "The reconstruction model combines attention, convolutional layers, and physics-informed loss terms derived from the governing equations, reaching a temperature MAE of 2.97 K and a wind velocity MAE of 0.08 m/s. On the hardware side I customized the drones, built the multi-agent sensing platform and data pipeline, and designed a feedback-based swarm search strategy inspired by operator theory and particle swarm optimization that improved search efficiency by 78.5% over back-and-forth sweeps.",
      "The system was validated against more than 240 logged simulation and field runs and has been deployed in fire stations in Shanghai. It earned a Third Place Grand Award at the Regeneron International Science and Engineering Fair.",
    ],
    gallery: [
      { media: { kind: "video", src: "/videos/fireaidss-demo.mp4" }, caption: "Field demo: swarm search and live field reconstruction." }, // TODO: add file
      { media: { kind: "image", src: "/images/fireaidss/fair-1.jpg", alt: "FireAIDSS at a science fair", width: 1600, height: 1067 }, caption: "Science fair, 1 of 3." }, // TODO
      { media: { kind: "image", src: "/images/fireaidss/fair-2.jpg", alt: "FireAIDSS at a science fair", width: 1600, height: 1067 }, caption: "Science fair, 2 of 3." }, // TODO
      { media: { kind: "image", src: "/images/fireaidss/fair-3.jpg", alt: "FireAIDSS at a science fair", width: 1600, height: 1067 }, caption: "Science fair, 3 of 3." }, // TODO
    ],
  },
  {
    slug: "envision",
    title: "Envision",
    summary: "A self-evolving forecasting agent for imminent typhoons and wildfires that rewrites its own skill library as outcomes come in.",
    meta: [
      { k: "Role", v: "Sole builder" },
      { k: "Dates", v: "Jun 2026 – present" },
      { k: "Stack", v: "LLM agents, evolutionary loop" },
    ],
    links: [
      { label: "Live", href: "https://envision-delta.vercel.app" },
      { label: "Repository", href: "https://github.com/JamesGongYC" }, // TODO: repo URL
    ],
    hero: { kind: "embed", src: "https://envision-delta.vercel.app", title: "Envision live dashboard", height: 620 },
    heroCaption: "Live instance at envision-delta.vercel.app.",
    body: [
      "Envision is an autonomous forecasting agent for imminent typhoons and wildfires. Rather than running a fixed model, it maintains a library of executable forecasting skills and continuously refines them, so its predictions sharpen the longer it runs.",
      "I built the ingestion, forecasting, and evolution layers. An AlphaEvolve-style loop scores every forecast against realized storm and fire outcomes, then proposes and tests rewrites of the skills that produced it. Improvements compound across long-running windows; within the first week the system improved its forecast accuracy by 29.8%.",
    ],
    gallery: [
      { media: { kind: "embed", src: "/diagrams/envision.html", title: "Envision: how it works", height: 680 }, caption: "How it works: Ingest, Forecast, Evolve. Click a box for detail." },
    ],
  },
  {
    slug: "robostats",
    title: "robostats",
    summary: "An open-source statistics layer for robot policy evaluation: rigorous two-model and k-model comparisons with exact confidence intervals.",
    meta: [
      { k: "Role", v: "Author, maintainer" },
      { k: "Dates", v: "Sep 2026 – present" },
      { k: "Stack", v: "Python, dependency-free core" },
    ],
    links: [
      { label: "Repository", href: "https://github.com/JamesGongYC" }, // TODO: repo URL
    ],
    hero: { kind: "image", src: "/images/robostats/stats.png", alt: "Actual coverage of nominal 95% binomial intervals at n = 50: Wald, Wilson, Agresti-Coull, Clopper-Pearson", width: 2400, height: 1350 },
    heroCaption: "Coverage of a nominal 95% interval at n = 50, by exact enumeration. The Wald interval most reports implicitly use dips far below nominal; Clopper-Pearson never does. Reproduced from robostats/results/coverage.",
    body: [
      "Existing VLA evaluation harnesses report success rates with no statistics layer: no intervals, no paired tests, no accounting for shared episodes. robostats is an open-source Python library that adds one. It supports statistically rigorous dual-model and k-model policy comparison experiments, with exact confidence interval outputs under completely paired or partially overlapping evaluation scenarios.",
      "It ships with benchmark adapters and a dependency-free episode recorder for LIBERO, RoboTwin, and RoboDojo outputs. The project grew out of evaluation work during my Noematrix internship, where the gap between a reported number and a defensible claim was hard to ignore.",
    ],
  },
];

export const featured = projects.map((p) => p.slug);
