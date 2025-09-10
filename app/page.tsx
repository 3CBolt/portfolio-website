import { getProjects } from '@/lib/notion';
import Hero from '@/components/sections/Hero';
import About from '@/components/sections/About';
import ProjectsGrid from '@/components/projects/ProjectsGrid';
import { Section } from '@/components/ui/section';
import { H2, Body } from '@/components/ui/typography';
import { CustomButton } from '@/components/ui/custom-button';
import { Mail } from 'lucide-react';

export const metadata = {
  title: 'Cameron Bolton – Product Builder & PM',
  description: 'I build AI-driven products that blend strategy, design, and code. Disney intern x3, founder of Genuine, builder of StreamerOS.',
};

export default async function Page() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <div className="px-5">
        <About />
        <Section>
          <ProjectsGrid initial={projects} />
        </Section>
        
        {/* Contact Section */}
        <section id="contact" className="mt-16">
          <Section className="text-center">
            <div className="max-w-2xl mx-auto">
              <H2 className="mb-4">Let&apos;s build something meaningful together.</H2>
              <Body className="mb-6 text-muted-foreground">
                Ready to collaborate on your next project? I&apos;d love to hear from you.
              </Body>
              <CustomButton href="/contact" size="lg" aria-label="Email me">
                <Mail className="mr-2 h-5 w-5" />
                Email me
              </CustomButton>
            </div>
          </Section>
        </section>
      </div>
    </>
  );
}