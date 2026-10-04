# Design guardrails

Read before touching any UI. These override defaults.

## Persona
Personal site for Yecheng (James) Gong: Stanford Math + CS, physics-informed ML, CFD, climate/disaster science, robotics. Tone: quiet, precise, editorial. The work is the hero; the design gets out of the way.

## Typography
- Headings: Fraunces (variable, optical sizing on), weight 300 for large display, 600 for section heads.
- Body: Newsreader at 400, 17-18px, line-height 1.6.
- Mono details (dates, tags, nav labels, captions): IBM Plex Mono at 400, 13px, letter-spacing 0.04em, uppercase for labels.
- Never: Inter, Roboto, Arial, Open Sans, Lato, system-ui.
- Size scale jumps hard: 13 / 17 / 28 / 56 / 96px. Weight contrast is extreme (300 vs 600), not timid (400 vs 500).
- Fonts load via next/font/google with display: swap.

## Color
CSS variables in globals.css, one dominant plus one accent.
- --bg: #F6F3EC (warm paper)
- --fg: #15130F (near-black ink)
- --muted: #6E675C
- --rule: #D9D3C7 (hairlines)
- --accent: #C8471A (burnt orange, used sparingly: links on hover, active nav, one underline on the home page)
- Dark mode via prefers-color-scheme: --bg #141311, --fg #ECE7DC, --muted #9A927F, --rule #2A2823, --accent #E8683A.
- Banned: purple/blue gradients, glassmorphism cards, drop shadows on cards, evenly distributed pastel palettes.

## Layout
- Single column, max-width 680px for text, 920px for project galleries. Side padding 24px mobile.
- No hamburger menu. Nav is a single row: name on the left, items on the right in this order: Experience (dropdown), Projects (dropdown), IOAI (standalone link to /ioai, no dropdown). Dropdowns open on hover/focus as a plain list with a hairline border, no shadow.
- Hairline rules (1px --rule) separate sections instead of cards or boxes.
- Generous vertical rhythm: 96px between sections on desktop, 64px mobile.

## Background
Paper texture: a very low-opacity SVG noise overlay (feTurbulence, opacity 0.04) fixed over --bg. Nothing else.

## Motion
- One staggered reveal on page load: opacity 0 -> 1, translateY 8px -> 0, 500ms, ease-out, 60ms stagger per block. CSS only.
- Link hover: underline offset slides in via text-decoration-color transition. No scale, no glow, no parallax.
- Respect prefers-reduced-motion.

## Components
- Nav, Footer, PageHeader (title, one-line summary, mono meta row: projects show role, dates, stack, recognition; experience shows role and dates only), Figure (image or video with mono caption), Prose (styled markdown wrapper).
- Images through next/image with explicit width/height; videos as muted autoplay loops in a Figure.

## Pages
- /                       Home: name, one-paragraph bio, links, an about paragraph, then Experience list, then 3 selected projects as a list (no cards).
- /projects/fireaidss     FireAIDSS
- /projects/envision      Envision
- /projects/robostats     robostats
- /experience/zhidian     Zhidian Qiyuan (Z.ai spinout)
- /experience/noematrix   Noematrix
- /experience/moonshot    Moonshot AI (Kimi)
Content lives in src/content/*.ts as typed objects; pages render from them.
