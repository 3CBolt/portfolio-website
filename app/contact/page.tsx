import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Mail, Github, Linkedin, MessageCircle, Download } from 'lucide-react';

export const metadata = {
  title: 'Contact',
  description: 'Get in touch to discuss opportunities, collaborations, or just to say hello.',
};

export default function ContactPage() {
  const contactMethods = [
    {
      icon: Mail,
      title: 'Email',
      description: 'Drop me a line anytime',
      action: 'Send Email',
      href: 'mailto:your-email@example.com',
    },
    {
      icon: Linkedin,
      title: 'LinkedIn',
      description: 'Let\'s connect professionally',
      action: 'View Profile',
      href: 'https://linkedin.com/in/yourusername',
    },
    {
      icon: Github,
      title: 'GitHub',
      description: 'Check out my code',
      action: 'View Repositories',
      href: 'https://github.com/yourusername',
    },
  ];

  return (
    <div className="container max-w-screen-lg py-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Let's Work Together
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          I'm always interested in new opportunities and collaborations.
          Whether you have a project in mind or just want to connect, I'd love to hear from you.
        </p>
      </div>

      {/* Contact Methods */}
      <div className="grid md:grid-cols-3 gap-8 mb-16">
        {contactMethods.map((method, index) => (
          <Card key={index} className="text-center group hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="mx-auto w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <method.icon className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>{method.title}</CardTitle>
              <CardDescription>{method.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link href={method.href} target="_blank" rel="noopener noreferrer">
                  {method.action}
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* CTA Section */}
      <div className="text-center bg-muted/50 rounded-2xl p-12">
        <MessageCircle className="h-12 w-12 text-primary mx-auto mb-6" />
        <h2 className="text-2xl font-bold mb-4">Ready to Start a Project?</h2>
        <p className="text-muted-foreground mb-8 max-w-md mx-auto">
          I'm currently available for freelance work and full-time opportunities.
          Let's discuss how we can work together.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="mailto:your-email@example.com">
              <Mail className="mr-2 h-5 w-5" />
              Get In Touch
            </Link>
          </Button>
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-5 w-5" />
            Download Resume
          </Button>
        </div>
      </div>

      {/* Response Time */}
      <div className="text-center mt-12">
        <p className="text-sm text-muted-foreground">
          I typically respond within 24 hours. Looking forward to hearing from you!
        </p>
      </div>
    </div>
  );
}