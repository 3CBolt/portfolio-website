import { getFeaturedProjects } from '@/lib/notion';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { CustomButton } from '@/components/ui/custom-button';
import { Section } from '@/components/ui/section';
import { H1, H2, Sub, Body } from '@/components/ui/typography';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

export const metadata = {
  title: 'Cameron Bolton - Full-Stack Developer',
  description: 'Cameron Bolton is a full-stack developer and designer creating digital experiences that matter.',
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="px-5">
      {/* Hero Section */}
      <Section className="text-center">
        <div className="max-w-4xl mx-auto">
          <H1 className="mb-6">
            Hi, I'm{' '}
            <span className="text-accent retro:text-white">Cameron Bolton</span>
          </H1>
          <Sub className="mb-8 max-w-3xl mx-auto">
            Full-stack developer and designer creating digital experiences that matter.
            I build scalable web applications with modern technologies.
          </Sub>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton href="/projects" size="lg">
              View My Work
              <ArrowRight className="ml-2 h-5 w-5" />
            </CustomButton>
            <CustomButton variant="secondary" size="lg" href="/files/cameron-bolton-resume.pdf" external>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </CustomButton>
          </div>
        </div>
      </Section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <Section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <H2>Featured Projects</H2>
              <Body className="mt-2">
                A selection of my best work
              </Body>
            </div>
            <CustomButton variant="ghost" href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-4 w-4" />
            </CustomButton>
          </div>
          <ProjectGrid projects={featuredProjects} />
        </Section>
      )}

      {/* About Snippet */}
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <H2 className="mb-6">About Me</H2>
            <Body className="mb-4">
              I'm a passionate full-stack developer with expertise in modern web technologies.
              I love building products that solve real problems and create meaningful user experiences.
            </Body>
            <Body className="mb-6">
              When I'm not coding, you can find me exploring new technologies, contributing to open source,
              or sharing knowledge with the developer community.
            </Body>
            <CustomButton variant="secondary" href="/about">
              Learn More About Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </CustomButton>
          </div>
          <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <div className="text-8xl font-bold text-accent/30">CB</div>
            </div>
          </div>
        </div>
      </Section>
    </div>
  );
}