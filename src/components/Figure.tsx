import Image from "next/image";

export type Media =
  | { kind: "image"; src: string; alt: string; width: number; height: number }
  | { kind: "video"; src: string; poster?: string }
  | { kind: "embed"; src: string; title: string; height?: number }
  | { kind: "pending"; note: string; aspect?: string };

export default function Figure({ media, caption, wide }: { media: Media; caption?: string; wide?: boolean }) {
  return (
    <figure className={wide ? "-mx-0 md:-mx-[120px]" : ""}>
      <div className="border border-rule overflow-hidden bg-bg">
        {media.kind === "image" && (
          <Image src={media.src} alt={media.alt} width={media.width} height={media.height} className="w-full h-auto block" />
        )}
        {media.kind === "video" && (
          <video src={media.src} poster={media.poster} autoPlay muted loop playsInline controls className="w-full h-auto block" />
        )}
        {media.kind === "embed" && (
          <iframe src={media.src} title={media.title} loading="lazy" className="w-full block" style={{ height: media.height ?? 560 }} />
        )}
        {media.kind === "pending" && (
          <div className="flex items-center justify-center mono text-muted text-center p-6" style={{ aspectRatio: media.aspect ?? "16 / 9" }}>
            {media.note}
          </div>
        )}
      </div>
      {caption && <figcaption className="mono text-muted mt-3">{caption}</figcaption>}
    </figure>
  );
}
