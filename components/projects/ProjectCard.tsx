import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, Clock, Lightbulb, Play } from 'lucide-react';
import type { Project } from '@/lib/notion';

type Props = Pick<Project,'id'|'title'|'summary'|'tags'|'role'|'impact'|'coverImage'|'links'|'status'>;

function getStatusIcon(status: string) {
  switch (status) {
    case 'Complete':
      return { icon: CheckCircle, color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/20' };
    case 'Shipped':
      return { icon: CheckCircle, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
    case 'In Progress':
      return { icon: Play, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20' };
    case 'Ideation':
      return { icon: Lightbulb, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
    default:
      return { icon: Clock, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-900/20' };
  }
}

export default function ProjectCard({ id, title, summary, tags = [], role, impact, coverImage, links = [], status }: Props) {
  const statusConfig = getStatusIcon(status);
  const StatusIcon = statusConfig.icon;
  
  return (
    <article className="group rounded-2xl border p-4 focus-within:ring-2 hover:shadow-lg transition-shadow">
      <Link href={`/projects/${id}`} className="block">
        {coverImage ? (
          <div className="relative aspect-video overflow-hidden rounded-xl">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={coverImage} alt={`${title} cover`} className="h-full w-full object-cover group-hover:scale-105 transition-transform" />
            {/* Status Badge */}
            <div className={`absolute top-2 right-2 ${statusConfig.bgColor} rounded-full px-2 py-1 flex items-center gap-1`}>
              <StatusIcon className={`h-3 w-3 ${statusConfig.color}`} />
              <span className={`text-xs font-medium ${statusConfig.color}`}>{status}</span>
            </div>
          </div>
        ) : (
          <div className="relative aspect-video overflow-hidden rounded-xl bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            <div className="text-4xl font-bold text-accent/20">
              {title.charAt(0)}
            </div>
            {/* Status Badge */}
            <div className={`absolute top-2 right-2 ${statusConfig.bgColor} rounded-full px-2 py-1 flex items-center gap-1`}>
              <StatusIcon className={`h-3 w-3 ${statusConfig.color}`} />
              <span className={`text-xs font-medium ${statusConfig.color}`}>{status}</span>
            </div>
          </div>
        )}

        <h3 className="mt-3 text-lg font-semibold group-hover:text-accent transition-colors">{title}</h3>
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
      </Link>

      {links.length > 0 ? (
        <div className="mt-3 flex gap-3">
          {links.map(l => (
            <a key={l.url} href={l.url} target="_blank" rel="noreferrer" aria-label={l.label} className="underline text-sm">
              {l.label}
            </a>
          ))}
        </div>
      ) : null}
    </article>
  );
}