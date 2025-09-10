'use client';

import { useEffect, useState } from 'react';
import type { Project } from '@/lib/notion';
import ProjectCard from './ProjectCard';

export default function ProjectsGrid({ initial = [] as Project[] }) {
  const [items, setItems] = useState<Project[]>(initial);
  const [page, setPage] = useState(1);
  const pageSize = 6;

  const visible = items.slice(0, page * pageSize);

  return (
    <section id="projects" aria-labelledby="projects-heading">
      <h2 id="projects-heading" className="text-xl font-semibold">Featured Projects</h2>
      {visible.length === 0 ? (
        <p className="mt-3 text-sm text-muted-foreground">No projects yet. Check back soon or get in touch.</p>
      ) : (
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map(p => <ProjectCard key={p.id} {...p} />)}
        </div>
      )}
      {items.length > visible.length ? (
        <button onClick={() => setPage(p => p + 1)} className="mt-4 rounded-lg border px-3 py-1.5" aria-label="Load more projects">
          Load more
        </button>
      ) : null}
    </section>
  );
}
