import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react';

export const metadata = {
  title: 'About',
  description: 'Learn more about my background, skills, and what drives my passion for development.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Code,
      title: 'Clean Code',
      description: 'I believe in writing maintainable, well-documented code that stands the test of time.',
    },
    {
      icon: Palette,
      title: 'User-Centered Design',
      description: 'Every design decision I make prioritizes the user experience and accessibility.',
    },
    {
      icon: Rocket,
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and I stay current with the latest tools and best practices.',
    },
  ];

  return (
    <div className="container max-w-screen-lg py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          About Me
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I'm a passionate developer who loves creating digital experiences that make a difference.
        </p>
      </div>

      {/* Main Content */}
      <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-6">My Story</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-4">
              Hello! I'm a full-stack developer with a passion for creating meaningful digital experiences.
              My journey began with curiosity about how things work on the web, and it has evolved into
              a career focused on building scalable, user-friendly applications.
            </p>
            <p className="text-muted-foreground mb-4">
              With experience across the full development stack, I enjoy the challenge of turning complex
              problems into simple, beautiful solutions. Whether it's architecting a robust backend API
              or crafting an intuitive user interface, I approach each project with attention to detail
              and a commitment to quality.
            </p>
            <p className="text-muted-foreground mb-6">
              When I'm not coding, you'll find me exploring new technologies, contributing to open source
              projects, or mentoring other developers. I believe in giving back to the community that has
              taught me so much.
            </p>
          </div>
          <Button asChild>
            <Link href="/contact">
              Let's Work Together
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        {/* Placeholder for photo */}
        <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
            <div className="text-8xl font-bold text-primary/30">YN</div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-4">
          What Drives Me
        </h2>
        <p className="text-muted-foreground text-center mb-12 max-w-2xl mx-auto">
          These core values guide my approach to every project and collaboration.
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {value.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section>
        <h2 className="text-3xl font-bold tracking-tight text-center mb-12">
          Technical Skills
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Frontend Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript'].map((skill) => (
                  <span key={skill} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Backend Development</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Express.js', 'REST APIs', 'GraphQL', 'AWS'].map((skill) => (
                  <span key={skill} className="bg-secondary text-secondary-foreground px-3 py-1 rounded-md text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}