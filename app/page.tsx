import { getFeaturedProjects } from '@/lib/notion';
import ProjectGrid from '@/components/projects/ProjectGrid';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight, Download } from 'lucide-react';

export const metadata = {
  title: 'Home',
  description: 'Full-stack developer and designer creating digital experiences that matter.',
};

export default async function HomePage() {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className="container max-w-screen-xl">
      {/* Hero Section */}
      <section className="py-16 md:py-24 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Hi, I'm{' '}
            <span className="text-primary">Your Name</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Full-stack developer and designer creating digital experiences that matter.
            I build scalable web applications with modern technologies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="text-lg">
              <Link href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-lg">
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </Button>
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      {featuredProjects.length > 0 && (
        <section className="py-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
              <p className="text-muted-foreground mt-2">
                A selection of my best work
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ProjectGrid projects={featuredProjects} />
        </section>
      )}

      {/* About Snippet */}
      <section className="py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">About Me</h2>
            <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
              I'm a passionate full-stack developer with expertise in modern web technologies.
              I love building products that solve real problems and create meaningful user experiences.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              When I'm not coding, you can find me exploring new technologies, contributing to open source,
              or sharing knowledge with the developer community.
            </p>
            <Button asChild variant="outline">
              <Link href="/about">
                Learn More About Me
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
              <div className="text-8xl font-bold text-primary/30">YN</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}