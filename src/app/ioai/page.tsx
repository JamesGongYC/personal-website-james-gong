import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Figure from "@/components/Figure";
import { ioai } from "@/content/ioai";

export const metadata: Metadata = { title: ioai.title, description: ioai.summary };

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-[920px] px-6 pt-16 md:pt-24">
      <div className="max-w-[680px]">
        <PageHeader eyebrow="Olympiad" title={ioai.title} summary={ioai.summary} />
      </div>

      {/* overview: positions, LinkedIn-style */}
      <section className="mt-16 md:mt-20 max-w-[680px]">
        <div className="flex items-baseline justify-between border-b border-rule pb-3">
          <h2 className="text-[22px]">{ioai.org}</h2>
          <span className="mono text-muted whitespace-nowrap ml-4">{ioai.tenure}</span>
        </div>
        <ol className="mt-2">
          {ioai.positions.map((pos, i) => (
            <li key={pos.title} className="relative grid grid-cols-[20px_1fr] gap-x-4">
              <span aria-hidden className="relative flex justify-center">
                <span className="absolute top-[18px] w-[7px] h-[7px] rounded-full bg-accent" />
                {i < ioai.positions.length - 1 && <span className="absolute top-[30px] bottom-[-6px] w-px bg-rule" />}
              </span>
              <a href={`#${pos.anchor}`} className="no-underline group block py-3">
                <span className="block font-display text-[20px] font-semibold leading-tight group-hover:text-accent transition-colors">{pos.title}</span>
                <span className="block mono text-muted mt-1">{pos.dates} · {pos.duration}</span>
                <span className="block text-muted mt-1">{pos.note}</span>
              </a>
            </li>
          ))}
        </ol>
      </section>

      {/* detailed sections */}
      {ioai.years.map((y) => (
        <section key={y.year} id={`y${y.year}`} className="mt-24 scroll-mt-10">
          <div className="grid md:grid-cols-[72px_1fr] gap-x-4">
            <h2 className="display !text-[56px] md:!text-[72px] !font-light !leading-none text-accent md:[writing-mode:vertical-rl] md:rotate-180 md:self-start">{y.year}</h2>
            <div>
              <p className="mono label text-muted mt-4 md:mt-0">{y.role} · {y.where}</p>
              <div className="prose max-w-[680px] mt-4">
                {y.body.map((p, i) => <p key={i}>{p}</p>)}
              </div>
              {y.links && (
                <p className="mt-5 mono flex flex-wrap gap-5">
                  {y.links.map((l) => <a key={l.label} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
                </p>
              )}
              {y.gallery && (
                <div className="mt-10 grid gap-10">
                  {y.gallery.map((g, i) => <Figure key={i} media={g.media} caption={g.caption} />)}
                </div>
              )}
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
