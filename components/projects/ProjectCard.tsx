import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types/project';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ExternalLink, Github } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Card className="group h-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="aspect-video relative overflow-hidden bg-muted">
        <Image
          src={project.coverPath || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800'}
          alt={`${project.projectName} preview`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {project.featured && (
          <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
            Featured
          </Badge>
        )}
      </div>
      
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl group-hover:text-primary transition-colors">
            <Link href={`/projects/${project.slug}`}>
              {project.projectName}
            </Link>
          </CardTitle>
          <div className="flex gap-2">
            {project.demoLink && (
              <Link
                href={project.demoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
              </Link>
            )}
            {project.repoLink && (
              <Link
                href={project.repoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="h-4 w-4" />
              </Link>
            )}
          </div>
        </div>
        <CardDescription className="line-clamp-2">
          {project.oneLiner}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="flex flex-wrap gap-1 mb-3">
          {project.techSkills.slice(0, 3).map((tech) => (
            <Badge key={tech} variant="secondary" className="text-xs">
              {tech}
            </Badge>
          ))}
          {project.techSkills.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{project.techSkills.length - 3}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <span>{project.role}</span>
          <span>{project.dateRange}</span>
        </div>
      </CardContent>
    </Card>
  );
}