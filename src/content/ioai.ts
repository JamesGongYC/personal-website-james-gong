import type { Media } from "@/components/Figure";

export type IoaiYear = {
  year: string;
  role: string;          // short label for the timeline
  where: string;         // host city or scope
  oneLine: string;       // timeline summary
  body: string[];
  links?: { label: string; href: string }[];
  gallery?: { media: Media; caption?: string }[];
};

export const ioai = {
  title: "IOAI",
  summary: "Contestant, then problem setter, then coach at the International Olympiad in Artificial Intelligence, 2024 to present.",
  org: "International Olympiad in Artificial Intelligence (IOAI)",
  tenure: "Aug 2024 – present · 2 yrs 3 mos",
  positions: [
    { title: "Team Coach", dates: "Aug 2025 – present", duration: "1 yr 3 mos", note: "Team USA '26", anchor: "y2026" },
    { title: "Scientific Committee", dates: "Aug 2024 – present", duration: "2 yrs 3 mos", note: "Problems for IOAI '25, NOAI '25 and '26, USAAIO '25 and '26", anchor: "y2025" },
    { title: "Contestant, Team China", dates: "Aug 2024", duration: "1 mo", note: "Silver medal, 11th globally", anchor: "y2024" },
  ],
  years: [
    {
      year: "2024",
      role: "Contestant, Team China",
      where: "Burgas, Bulgaria",
      oneLine: "Competed as one of eight Team China members at the first IOAI; silver medal, 11th globally. Joined the scientific committee the same month.",
      body: [
        "The first International Olympiad in Artificial Intelligence was held in Burgas in August 2024. I competed as one of the eight members of Team China and took a silver medal, placing 11th globally.",
        "Immediately after the competition I joined the IOAI scientific committee, moving from solving problems to writing them.",
      ],
      links: [{ label: "IOAI 2024 results", href: "#" }], // TODO
      gallery: [
        { media: { kind: "image", src: "/images/ioai/2024.jpg", alt: "IOAI 2024, Burgas", width: 1600, height: 1067 }, caption: "IOAI 2024, Burgas, with Team China." }, // TODO: file
      ],
    },
    {
      year: "2025",
      role: "Scientific committee",
      where: "Beijing, China",
      oneLine: "Authored and tested problems for IOAI '25, the Team China selection test (NOAI '25), and the Team USA selection test (USAAIO '25).",
      body: [
        "In the 2025 cycle I created and tested problems for the olympiad itself and for two national selection tests: NOAI, which selects Team China, and USAAIO, which selects Team USA. The problems spanned physics-informed machine learning, computer vision, and natural language processing.",
        "I am listed as a contributor in the official IOAI 2025 report. Two of the problem sets I wrote are public on GitHub.",
      ],
      links: [
        { label: "IOAI 2025 report", href: "#" }, // TODO
        { label: "Problem set 1", href: "https://github.com/JamesGongYC" }, // TODO
        { label: "Problem set 2", href: "https://github.com/JamesGongYC" }, // TODO
      ],
      gallery: [
        { media: { kind: "image", src: "/images/ioai/2025.jpg", alt: "IOAI 2025, Beijing", width: 1600, height: 1067 }, caption: "IOAI 2025, Beijing, on the scientific committee." }, // TODO: file
      ],
    },
    {
      year: "2026",
      role: "Team USA coach",
      where: "Team USA '26",
      oneLine: "Coached Team USA for IOAI '26 while continuing to set problems for NOAI '26 and USAAIO '26.",
      body: [
        "From August 2025 I coached Team USA for IOAI '26. The training ran as a course: individual-round tactics (small-scale experiments for validation, problem decomposition for finding the key insight, time budgeting) and team-round strategy (structured collaboration and task parallelization).",
        "In parallel I kept setting and testing problems for the 2026 selection tests, NOAI '26 and USAAIO '26. The training deck I built for the team is below.",
      ],
      gallery: [
        { media: { kind: "embed", src: "/files/ioai-2026-tactics.pdf", title: "IOAI 2026 Team USA training deck", height: 560 }, caption: "Tactics 101: the 2026 Team USA training deck." },
      ],
    },
  ] satisfies IoaiYear[],
};
