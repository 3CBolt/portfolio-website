import { CustomButton } from '@/components/ui/custom-button';
import { CustomCard, CardHeader, CardContent } from '@/components/ui/custom-card';
import { Section } from '@/components/ui/section';
import { H1, H2, H3, Sub, Body, Meta } from '@/components/ui/typography';
import Link from 'next/link';
import { Mail, Github, Linkedin, MessageCircle, Download } from 'lucide-react';

export const metadata = {
  title: 'Contact Cameron Bolton',
  description: 'Get in touch with Cameron Bolton to discuss opportunities, collaborations, or just to say hello.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Drop me a line anytime',
      action: 'Send Email',
      href: 'mailto:cbolt369@gmail.com',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Let\'s connect professionally',
      action: 'View Profile',
      href: 'https://www.linkedin.com/in/cameronbolton',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Check out my code',
      action: 'View Repositories',
      href: 'https://github.com/3CBolt',
    },
  ];

  return (
    <div className="px-5">
      {/* Header */}
      <Section 
        title="Let's Work Together"
        subtitle="I'm always interested in new opportunities and collaborations. Whether you have a project in mind or just want to connect, I'd love to hear from you."
      >
        {/* Contact Methods */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7 mb-16">
          {contactMethods.map((method, index) => (
            <CustomCard key={index} hover className="text-center group">
              <CardHeader>
                <div className="mx-auto w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                  <method.icon className="h-6 w-6 text-accent" />
                </div>
                <H3>{method.title}</H3>
                <Body>{method.description}</Body>
              </CardHeader>
              <CardContent>
                <CustomButton variant="secondary" href={method.href} external={method.href.startsWith('mailto:') || method.href.startsWith('http')} className="w-full">
                  {method.action}
                </CustomButton>
              </CardContent>
            </CustomCard>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-muted rounded-2xl p-12">
          <MessageCircle className="h-12 w-12 text-accent mx-auto mb-6" />
          <H2 className="mb-4">Ready to Start a Project?</H2>
          <Body className="mb-8 max-w-md mx-auto">
            I&apos;m currently available for freelance work and full-time opportunities.
            Let&apos;s discuss how we can work together.
          </Body>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <CustomButton href="mailto:cbolt369@gmail.com" size="lg" external>
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </CustomButton>
            <CustomButton variant="secondary" size="lg" href="/files/cameron-bolton-resume.pdf" external>
              <Download className="mr-2 h-5 w-5" />
              Download Resume
            </CustomButton>
          </div>
        </div>

        {/* Response Time */}
        <div className="text-center mt-12">
          <Meta>
            I typically respond within 24 hours. Looking forward to hearing from you!
          </Meta>
        </div>
      </Section>
    </div>
  );
}