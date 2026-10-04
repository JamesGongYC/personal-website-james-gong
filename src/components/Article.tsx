import PageHeader from "@/components/PageHeader";
import Figure, { type Media } from "@/components/Figure";

export default function Article({ eyebrow, title, summary, meta, links, hero, heroCaption, body, gallery }: {
  eyebrow?: string; title: string; summary: string;
  meta: { k: string; v: string }[];
  links?: { label: string; href: string }[];
  hero?: Media; heroCaption?: string;
  body: string[];
  gallery?: { media: Media; caption?: string }[];
}) {
  return (
    <main className="mx-auto w-full max-w-[920px] px-6 pt-16 md:pt-24">
      <div className="max-w-[680px]">
        <PageHeader eyebrow={eyebrow} title={title} summary={summary} meta={meta} links={links} />
      </div>
      {hero && <div className="mt-14 md:mt-20"><Figure media={hero} caption={heroCaption} /></div>}
      <div className="prose max-w-[680px] mt-14 md:mt-20">
        {body.map((p, i) => <p key={i}>{p}</p>)}
      </div>
      {gallery && gallery.length > 0 && (
        <section className="mt-16 md:mt-24 pt-10 border-t border-rule grid gap-10 md:gap-14">
          {gallery.map((g, i) => <Figure key={i} media={g.media} caption={g.caption} />)}
        </section>
      )}
    </main>
  );
}
