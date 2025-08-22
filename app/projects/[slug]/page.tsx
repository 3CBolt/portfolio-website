import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/notion';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, Calendar, User, Tag } from 'lucide-react';
import { formatDateRange } from '@/lib/utils';

interface ProjectDetailPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);
  
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.projectName,
    description: project.oneLiner,
  };
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const project = await getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="container max-w-screen-lg py-8">
      {/* Back Button */}
      <Button variant="ghost" asChild className="mb-8">
        <Link href="/projects">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Projects
        </Link>
      </Button>

      {/* Hero Image */}
      <div className="aspect-video relative mb-8 rounded-xl overflow-hidden bg-muted">
        <Image
          src={project.coverPath || 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1200'}
          alt={`${project.projectName} preview`}
          fill
          className="object-cover"
        />
      </div>

      {/* Project Header */}
      <div className="mb-8">
        <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight mb-2">
              {project.projectName}
            </h1>
            {project.featured && (
              <Badge className="mb-2">Featured Project</Badge>
            )}
          </div>
          <div className="flex gap-3">
            {project.demoLink && (
              <Button asChild>
                <Link href={project.demoLink} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </Link>
              </Button>
            )}
            {project.repoLink && (
              <Button variant="outline" asChild>
                <Link href={project.repoLink} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </Link>
              </Button>
            )}
          </div>
        </div>
        
        <p className="text-xl text-muted-foreground leading-relaxed mb-6">
          {project.oneLiner}
        </p>

        {/* Project Meta */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Timeline</p>
              <p className="text-sm text-muted-foreground">{formatDateRange(project.dateRange)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Role</p>
              <p className="text-sm text-muted-foreground">{project.role}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Tag className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">Category</p>
              <p className="text-sm text-muted-foreground">{project.category}</p>
            </div>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h3 className="font-semibold mb-3">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.techSkills.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <Separator className="mb-8" />

      {/* Project Details */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Impact */}
        {project.impact.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Impact & Results</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.impact.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Responsibilities */}
        {project.responsibilities.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Key Responsibilities</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {project.responsibilities.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                    <span className="text-muted-foreground">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}