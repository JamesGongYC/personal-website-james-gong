export default function PageHeader({ eyebrow, title, summary, meta, links }: {
  eyebrow?: string; title: string; summary: string;
  meta?: { k: string; v: string }[];
  links?: { label: string; href: string }[];
}) {
  return (
    <header className="reveal">
      {eyebrow && <p className="mono label text-muted mb-4">{eyebrow}</p>}
      <h1 className="display">{title}</h1>
      <p className="mt-6 text-[20px] md:text-[22px] leading-snug max-w-[680px]">{summary}</p>
      {meta && meta.length > 0 && (
        <dl className="mt-8 pt-5 border-t border-rule grid grid-cols-2 sm:grid-cols-4 gap-x-6 gap-y-3 mono">
          {meta.map((m) => (
            <div key={m.k}><dt className="label text-muted">{m.k}</dt><dd className="mt-1">{m.v}</dd></div>
          ))}
        </dl>
      )}
      {links && links.length > 0 && (
        <p className="mt-5 mono flex flex-wrap gap-5">
          {links.map((l) => <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label} ↗</a>)}
        </p>
      )}
    </header>
  );
}
