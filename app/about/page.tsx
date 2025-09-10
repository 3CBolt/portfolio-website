import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard, CardHeader, CardContent } from '@/components/ui/custom-card';
import { Section } from '@/components/ui/section';
import { H1, H2, H3, Sub, Body } from '@/components/ui/typography';
import Link from 'next/link';
import { ArrowRight, Code, Palette, Rocket } from 'lucide-react';

export const metadata = {
  title: 'About Cameron Bolton',
  description: 'Learn more about Cameron Bolton\'s background, skills, and what drives his passion for development.',
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
    <div className="px-5">
      {/* Header */}
      <Section 
        title="About Me"
        subtitle="I'm a passionate developer who loves creating digital experiences that make a difference."
      >
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <H2 className="mb-6">My Story</H2>
            <div className="space-y-4">
              <Body>
                Hello! I'm a full-stack developer with a passion for creating meaningful digital experiences.
                My journey began with curiosity about how things work on the web, and it has evolved into
                a career focused on building scalable, user-friendly applications.
              </Body>
              <Body>
                With experience across the full development stack, I enjoy the challenge of turning complex
                problems into simple, beautiful solutions. Whether it's architecting a robust backend API
                or crafting an intuitive user interface, I approach each project with attention to detail
                and a commitment to quality.
              </Body>
              <Body className="mb-6">
                When I'm not coding, you'll find me exploring new technologies, contributing to open source
                projects, or mentoring other developers. I believe in giving back to the community that has
                taught me so much.
              </Body>
            </div>
            <CustomButton href="/contact">
              Let's Work Together
              <ArrowRight className="ml-2 h-4 w-4" />
            </CustomButton>
          </div>
          
          {/* Professional headshot */}
          <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 flex items-center justify-center">
              <div className="text-8xl font-bold text-accent/30">CB</div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <H2 className="text-center mb-4">What Drives Me</H2>
          <Body className="text-center mb-12 max-w-2xl mx-auto">
            These core values guide my approach to every project and collaboration.
          </Body>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            {values.map((value, index) => (
              <CustomCard key={index} className="text-center">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-accent" />
                  </div>
                  <H3>{value.title}</H3>
                </CardHeader>
                <CardContent>
                  <Body>
                    {value.description}
                  </Body>
                </CardContent>
              </CustomCard>
            ))}
          </div>
        </div>

        {/* Skills Section */}
        <div>
          <H2 className="text-center mb-12">Technical Skills</H2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <CustomCard>
              <CardHeader>
                <H3>Frontend Development</H3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vue.js', 'HTML5', 'CSS3', 'JavaScript'].map((skill) => (
                    <span key={skill} className="bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </CustomCard>
            
            <CustomCard>
              <CardHeader>
                <H3>Backend Development</H3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Express.js', 'REST APIs', 'GraphQL', 'AWS'].map((skill) => (
                    <span key={skill} className="bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </CustomCard>
          </div>
        </div>
      </Section>
    </div>
  );
}