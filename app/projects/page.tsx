import { getProjects } from '@/lib/notion';
import ProjectGrid from '@/components/projects/ProjectGrid';

export const metadata = {
  title: 'Projects',
  description: 'A collection of my work including web applications, mobile apps, and design projects.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="container max-w-screen-xl py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          My Projects
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A collection of my work spanning web applications, mobile apps, and design projects.
          Each project represents a unique challenge and learning experience.
        </p>
      </div>

      <div className="mb-8">
        <p className="text-sm text-muted-foreground">
          {projects.length} {projects.length === 1 ? 'project' : 'projects'} found
        </p>
      </div>

      <ProjectGrid projects={projects} />
    </div>
  );
}