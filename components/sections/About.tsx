import { H2, Body } from '@/components/ui/typography';
import { Section } from '@/components/ui/section';
import Image from 'next/image';

export default function About() {
  return (
    <section id="about">
      <Section>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <H2 className="mb-6">About</H2>
            <Body className="mb-4">
              I&apos;m Cameron Bolton, a product builder who turns new tech into things people can use. 
              I studied Technology, Information Systems & Analytics at Wayne State and completed three 
              product management internships at Disney, where I translated complex requirements into 
              tools that shipped.
            </Body>
            <Body className="mb-6">
              I value trust, creativity, family, and wisdom, and I try to show that in how I build and 
              work with teams. My long-term aim is to build at the intersection of technology and storytelling.
            </Body>
            
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Highlights:</h3>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Launched a Disney Show & Tell reaching 100+ employees</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Translated 30+ requirements into Jira epics and enhancements</span>
                </li>
                <li className="flex items-start">
                  <span className="text-accent mr-2">•</span>
                  <span>Built Genuine (privacy-first human verification) and StreamerOS (creator analytics)</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Exploring now:</h3>
              <p className="text-muted-foreground">
                Human verification (Genuine), creator analytics (StreamerOS), and retro-inspired UI.
              </p>
            </div>
          </div>
          
          <div className="aspect-square relative bg-muted rounded-2xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent/10 to-accent/5 flex items-center justify-center">
              <div className="text-6xl font-bold text-accent/20">
                CB
              </div>
            </div>
          </div>
        </div>
      </Section>
    </section>
  );
}
