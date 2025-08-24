import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { CustomCard, CardHeader, CardContent } from '@/components/ui/custom-card';
import { H3, Meta } from '@/components/ui/typography';
import { CustomButton } from '@/components/ui/custom-button';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <CustomCard hover className="group h-full overflow-hidden retro:cartridge-card">
      {project.featured && (
        <div className="retro:label-strip retro:block hidden">
          Featured
        </div>
      )}
      <div className="aspect-video relative overflow-hidden bg-muted">
        {project.coverPath ? (
          <Image
            src={project.coverPath}
            alt={`${project.projectName} preview`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105 retro:pixelate"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
            <div className="text-4xl font-bold text-accent/20">
              {project.projectName.charAt(0)}
            </div>
          </div>
        )}
        {project.featured && (
          <div className="absolute top-3 left-3 bg-accent text-accent-foreground px-2 py-1 rounded-lg text-xs font-medium">
            Featured
          </div>
        )}
      </div>
      
      <CardHeader>
        <div className="flex items-center justify-between">
          <H3 className="group-hover:text-accent transition-colors line-clamp-1">
            <Link href={`/projects/${project.slug}`}>
              {project.projectName}
            </Link>
          </H3>
          <div className="flex gap-2">
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors focus-ring rounded-md p-1"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {project.repoLink && (
              <Link
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors focus-ring rounded-md p-1"
              >
                <Github className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
        <p className="text-muted-foreground line-clamp-2 mt-2">
          {project.oneLiner}
        </p>
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.techSkills.slice(0, 3).map((tech) => (
            <span key={tech} className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
              {tech}
            </span>
          ))}
          {project.techSkills.length > 3 && (
            <span className="bg-muted text-muted-foreground px-2 py-1 rounded-md text-xs font-medium">
              +{project.techSkills.length - 3}
            </span>
          )}
        </div>
        
        <div className="flex items-center justify-between">
          <Meta>{project.role}</Meta>
          <Meta>{project.dateRange}</Meta>
        </div>
      </CardContent>
    </CustomCard>
  );
}