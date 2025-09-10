import { getProjects } from '@/lib/notion';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { Section } from '@/components/ui/section';
import { H1, Sub, Meta } from '@/components/ui/typography';

export const metadata = {
  title: 'Cameron Bolton - Projects',
  description: 'A collection of Cameron Bolton\'s work including web applications, mobile apps, and design projects.',
};

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <div className="px-5">
      <Section 
        title="My Projects"
        subtitle="A collection of my work spanning web applications, mobile apps, and design projects. Each project represents a unique challenge and learning experience."
      >
        <div className="mb-8">
          <Meta>
            {projects.length} {projects.length === 1 ? 'project' : 'projects'} found
          </Meta>
        </div>

        <ProjectsGrid initial={projects} />
      </Section>
    </div>
  );
}