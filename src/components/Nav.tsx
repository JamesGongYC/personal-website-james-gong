import Link from "next/link";
import { projects } from "@/content/projects";
import { experience } from "@/content/experience";
import { site } from "@/content/site";

function Menu({ label, items }: { label: string; items: { href: string; title: string }[] }) {
  return (
    <li className="menu">
      <button className="mono label cursor-default" aria-haspopup="true">{label}</button>
      <ul>
        <div>
          {items.map((i) => (
            <li key={i.href}><Link href={i.href} className="mono">{i.title}</Link></li>
          ))}
        </div>
      </ul>
    </li>
  );
}

export default function Nav() {
  return (
    <header className="mx-auto w-full max-w-[920px] px-6 py-7 flex items-baseline justify-between">
      <Link href="/" className="mono label no-underline">{site.shortName}</Link>
      <nav>
        <ul className="flex items-baseline gap-7">
          <Menu label="Experience" items={experience.map((e) => ({ href: `/experience/${e.slug}`, title: e.org }))} />
          <Menu label="Projects" items={projects.map((p) => ({ href: `/projects/${p.slug}`, title: p.title }))} />
          <li><Link href="/ioai" className="mono label no-underline">IOAI</Link></li>
        </ul>
      </nav>
    </header>
  );
}
