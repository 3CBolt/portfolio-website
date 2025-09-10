import Image from 'next/image';
import type { Project } from '@/lib/notion';

type Props = Pick<Project,'title'|'summary'|'tags'|'role'|'impact'|'coverImage'|'links'>;

export default function ProjectCard({ title, summary, tags = [], role, impact, coverImage, links = [] }: Props) {
  return (
    <article className="group rounded-2xl border p-4 focus-within:ring-2">
      {coverImage ? (
        <div className="relative aspect-video overflow-hidden rounded-xl">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={coverImage} alt={`${title} cover`} className="h-full w-full object-cover" />
        </div>
      ) : null}

      <h3 className="mt-3 text-lg font-semibold">{title}</h3>
      <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{summary}</p>

      <div className="mt-2 flex flex-wrap gap-2">
        {tags.slice(0,3).map(t => (
          <span key={t} className="rounded-full border px-2 py-0.5 text-xs">{t}</span>
        ))}
        {tags.length > 3 ? <span className="text-xs">+{tags.length - 3}</span> : null}
      </div>

      <div className="mt-2 text-xs text-muted-foreground">
        {role ? <span>{role}</span> : null}
        {impact ? <span className="ml-2">{impact}</span> : null}
      </div>

      {links.length > 0 ? (
        <div className="mt-3 flex gap-3">
          {links.map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" aria-label={l.label} className="underline">
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}