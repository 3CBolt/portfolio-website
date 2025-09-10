import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard, CardHeader, CardContent } from '@/components/ui/custom-card';
import { Section } from '@/components/ui/section';
import { H1, H2, H3, Sub, Body } from '@/components/ui/typography';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, Heart, Lightbulb, Users, BookOpen } from 'lucide-react';
import { PRODUCT_AI_SKILLS } from '@/lib/constants';

export const metadata = {
  title: 'About Cameron Bolton',
  description: 'Learn more about Cameron Bolton\'s background as a product builder, Disney intern, and founder of Genuine and StreamerOS.',
};

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: 'Trust',
      description: 'Building relationships and products based on reliability and integrity.',
    },
    {
      icon: Lightbulb,
      title: 'Creativity',
      description: 'Finding innovative solutions to complex problems through creative thinking.',
    },
    {
      icon: Users,
      title: 'Family',
      description: 'Valuing relationships and community in everything I build and do.',
    },
    {
      icon: BookOpen,
      title: 'Wisdom',
      description: 'Continuous learning and applying knowledge to make better decisions.',
    },
  ];

  return (
    <div className="px-5">
      {/* Header */}
      <Section 
        title="About Me"
        subtitle="I'm Cameron Bolton, a product builder who combines strategy, design, and code to create real solutions."
      >
        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <H2 className="mb-6">My Story</H2>
            <div className="space-y-4">
              <Body>
                I studied Technology, Information Systems and Analytics at Wayne State University and completed three product management internships at The Walt Disney Company. At Disney I launched a Show & Tell series that reached more than 100 employees and turned over 30 technical requirements into working product features. This work sharpened product lifecycle management and stakeholder alignment.
              </Body>
              <Body>
                I started Genuine, a privacy first human verification platform, and built StreamerOS, an AI dashboard that helps creators analyze their streams. Both projects let me explore new technology while focusing on real user problems. I focused on AI prototyping, ethical AI, and product analytics.
              </Body>
              <Body className="mb-6">
                I have led teams as President of my fraternity chapter and the Wayne State NSBE chapter. Those roles taught me how to guide people, build community, and deliver results.
              </Body>
            </div>
            <CustomButton href="/contact">
              Let's build something meaningful together.
              <ArrowRight className="ml-2 h-4 w-4" />
            </CustomButton>
          </div>
          
          <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
            <Image
              src="/images/cameron-bolton-headshot.jpg"
              alt="Cameron Bolton - Professional headshot"
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <H2 className="text-center mb-4">What Drives Me</H2>
          <Body className="text-center mb-12 max-w-2xl mx-auto">
            These core values guide my approach to every project and collaboration.
          </Body>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
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
        <div className="mb-16">
          <H2 className="text-center mb-12">Technical Skills</H2>
          
          <div className="grid md:grid-cols-2 gap-8">
            <CustomCard>
              <CardHeader>
                <H3>Frontend</H3>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'HTML', 'CSS', 'JavaScript'].map((skill) => (
                    <span key={skill} className="bg-muted text-muted-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </CustomCard>
            
            <CustomCard>
              <CardHeader>
                <H3>Backend</H3>
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

        {/* Product & AI Skills Section */}
        <div className="mb-16">
          <H2 className="text-center mb-4">Product & AI Skills</H2>
          <Body className="text-center mb-8 max-w-2xl mx-auto">
            Focused, high signal skills for AI product work.
          </Body>
          
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {PRODUCT_AI_SKILLS.map((skill) => (
                <span key={skill} className="rounded-full border px-3 py-1 text-sm bg-background">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Exploring Now Section */}
        <div className="mb-16">
          <H2 className="text-center mb-12">Exploring Now</H2>
          <div className="max-w-3xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              <CustomCard>
                <CardContent>
                  <Body className="font-medium mb-2">Human verification with Genuine</Body>
                  <Body className="text-muted-foreground">Privacy-first platform for secure identity verification</Body>
                </CardContent>
              </CustomCard>
              <CustomCard>
                <CardContent>
                  <Body className="font-medium mb-2">Creator analytics with StreamerOS</Body>
                  <Body className="text-muted-foreground">AI dashboard for stream analysis and insights</Body>
                </CardContent>
              </CustomCard>
            </div>
          </div>
        </div>

        {/* Future Vision Section */}
        <div>
          <H2 className="text-center mb-12">Future Vision</H2>
          <div className="max-w-4xl mx-auto text-center">
            <Body className="text-lg mb-6">
              I want to keep building products at the intersection of technology and storytelling. My long term goal is to create at Marvel Studios.
            </Body>
            <CustomButton href="/contact">
              Email Me
              <ArrowRight className="ml-2 h-4 w-4" />
            </CustomButton>
          </div>
        </div>
      </Section>
    </div>
  );
}