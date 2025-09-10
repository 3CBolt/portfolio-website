import type { Project } from '@/lib/notion';
import ProjectCard from './ProjectCard';
import { EmptyState } from '@/components/ui/empty-state';
import { FolderOpen } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  className?: string;
}

export default function ProjectGrid({ projects, className = '' }: ProjectGridProps) {
  if (projects.length === 0) {
    return (
      <EmptyState
        icon={<FolderOpen className="w-12 h-12" />}
        title="No projects found"
        description="Check back soon for new projects and updates."
      />
    );
  }

  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 ${className}`}>
      {projects.map((project) => (
        <ProjectCard key={project.id} {...project} />
      ))}
    </div>
  );
}