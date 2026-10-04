import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";

export default function Home() {
  return (
    <main className="mx-auto w-full max-w-[920px] px-6 pt-16 md:pt-24">
      <section className="reveal grid md:grid-cols-[1fr_280px] gap-10 md:gap-16 items-start">
        <div>
          <h1 className="display">Yecheng<br />Gong<span className="text-accent">.</span></h1>
          <p className="mt-6 text-[20px] md:text-[22px] leading-snug max-w-[560px]">{site.tagline}</p>
          <p className="prose mt-6 max-w-[560px]">{site.bio}</p>
          <p className="mt-6 mono flex flex-wrap gap-5">
            {site.links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
          </p>
        </div>
        <div className="border border-rule overflow-hidden md:mt-3">
          <Image src={site.portrait.src} alt={site.portrait.alt} width={site.portrait.width} height={site.portrait.height} priority className="w-full h-auto block grayscale-[15%]" />
        </div>
      </section>

      <section className="mt-14 pt-8 border-t border-rule max-w-[680px]">
        <p className="text-[20px] md:text-[22px] leading-snug">
          {site.about.map((line, i) => (
            <span key={i} className="block">{line}</span>
          ))}
        </p>
      </section>

      <section className="mt-24">
        <h2 className="mono label text-muted font-normal text-[13px]">Experience</h2>
        <ol className="mt-4 border-t border-rule">
          {experience.map((e) => (
            <li key={e.slug} className="border-b border-rule">
              <Link href={`/experience/${e.slug}`} className="no-underline group grid grid-cols-1 md:grid-cols-[280px_1fr_auto] gap-x-4 gap-y-1 py-5 items-baseline">
                <span className="font-display text-[22px] font-semibold group-hover:text-accent transition-colors">{e.org}</span>
                <span className="text-muted">{e.title}</span>
                <span className="mono text-muted">{e.meta[1].v}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
      <section className="mt-24">
        <h2 className="mono label text-muted font-normal text-[13px]">Selected projects</h2>
        <ol className="mt-4 border-t border-rule">
          {projects.map((p, i) => (
            <li key={p.slug} className="border-b border-rule">
              <Link href={`/projects/${p.slug}`} className="no-underline group grid grid-cols-[40px_1fr] md:grid-cols-[40px_240px_1fr] gap-4 py-6 items-baseline">
                <span className="mono text-muted">0{i + 1}</span>
                <span className="font-display text-[28px] font-semibold leading-tight group-hover:text-accent transition-colors">{p.title}</span>
                <span className="col-start-2 md:col-start-3 text-muted">{p.summary}</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>

    </main>
  );
}
