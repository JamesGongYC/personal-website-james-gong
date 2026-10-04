import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="mx-auto w-full max-w-[920px] px-6 py-10 mt-24 border-t border-rule flex flex-wrap gap-x-6 gap-y-2 mono text-muted">
      <span>{site.name}</span>
      {site.links.map((l) => (
        <a key={l.href} href={l.href} target="_blank" rel="noreferrer">{l.label}</a>
      ))}
      <span className="ml-auto">{new Date().getFullYear()}</span>
    </footer>
  );
}
