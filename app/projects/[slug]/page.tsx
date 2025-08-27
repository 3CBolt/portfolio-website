import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects } from '@/lib/notion';
import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard, CardHeader, CardContent } from '@/components/ui/custom-card';
import { H1, H2, H3, Sub, Body, Meta } from '@/components/ui/typography';
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
    <div className="px-5 py-8">
      {/* Back Button */}
      <CustomButton variant="ghost" href="/projects" className="mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Projects
      </CustomButton>

      <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2">
          {/* Hero Image */}
          <div className="aspect-video relative mb-8 rounded-2xl overflow-hidden bg-muted">
            {project.coverPath ? (
              <Image
                src={project.coverPath}
                alt={`${project.projectName} preview`}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
                <div className="text-6xl font-bold text-accent/20">
                  {project.projectName.charAt(0)}
                </div>
              </div>
            )}
          </div>

          {/* Project Header */}
          <div className="mb-8">
            <H1 className="mb-4">
              {project.projectName}
            </H1>
            {project.featured && (
              <div className="inline-block bg-accent text-accent-foreground px-3 py-1 rounded-lg text-sm font-medium mb-4">
                Featured Project
              </div>
            )}
            
            <Sub className="mb-6">
              {project.oneLiner}
            </Sub>
          </div>

          {/* Project Details */}
          <div className="space-y-8">
            {/* Impact */}
            {project.impact.length > 0 && (
              <div>
                <H3 className="mb-4">Impact & Results</H3>
                <ul className="space-y-3">
                  {project.impact.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                      <Body>{item}</Body>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {project.responsibilities.length > 0 && (
              <div>
                <H3 className="mb-4">Key Responsibilities</H3>
                <ul className="space-y-3">
                  {project.responsibilities.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2.5 flex-shrink-0" />
                      <Body>{item}</Body>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-8 space-y-6">
            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              {project.demoLink && (
                <CustomButton href={project.demoLink} external>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  Live Demo
                </CustomButton>
              )}
              {project.repoLink && (
                <CustomButton variant="secondary" href={project.repoLink} external>
                  <Github className="mr-2 h-4 w-4" />
                  View Code
                </CustomButton>
              )}
            </div>

            {/* Project Meta */}
            <CustomCard>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Meta className="font-semibold text-foreground">Timeline</Meta>
                    <Meta>{formatDateRange(project.dateRange)}</Meta>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Meta className="font-semibold text-foreground">Role</Meta>
                    <Meta>{project.role}</Meta>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Tag className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <Meta className="font-semibold text-foreground">Category</Meta>
                    <Meta>{project.category}</Meta>
                  </div>
                </div>
              </CardContent>
            </CustomCard>

            {/* Tech Stack */}
            <div>
              <H3 className="mb-3">Technologies Used</H3>
              <div className="flex flex-wrap gap-2">
                {project.techSkills.map((tech) => (
                  <span key={tech} className="bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}