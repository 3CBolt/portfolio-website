'use client';

import { CustomButton } from '@/components/ui/custom-button';
import { H1, Sub } from '@/components/ui/typography';
import { Section } from '@/components/ui/section';
import { ArrowRight, Mail } from 'lucide-react';

interface HeroProps {
  onPrimaryClick?: () => void;
}

export default function Hero({ onPrimaryClick }: HeroProps) {
  return (
    <header className="text-center">
      <Section>
        <div className="max-w-4xl mx-auto">
          <H1 className="mb-6">
            Making magic, one product at a time.
          </H1>
          <Sub className="mb-8 max-w-3xl mx-auto">
            I build AI-driven products that blend strategy, design, and code. Disney intern x3, founder of Genuine, builder of StreamerOS.
          </Sub>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton 
              href="/projects" 
              size="lg"
              onClick={onPrimaryClick}
              aria-label="See my work"
            >
              See my work
              <ArrowRight className="ml-2 h-5 w-5" />
            </CustomButton>
            <CustomButton 
              variant="secondary" 
              size="lg" 
              href="/contact"
              aria-label="Contact me"
            >
              <Mail className="mr-2 h-5 w-5" />
              Contact me
            </CustomButton>
          </div>
        </div>
      </Section>
    </header>
  );
}
