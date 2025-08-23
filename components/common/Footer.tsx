import Link from 'next/link';
import { Body, Meta } from '@/components/ui/typography';
import { Github, Linkedin, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="max-w-6xl mx-auto px-5 flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Meta className="text-center md:text-left">
            Built with Next.js, TypeScript, and Tailwind CSS.
          </Meta>
        </div>
        <div className="flex items-center space-x-4">
          <Link
            href="mailto:your-email@example.com"
            className="text-muted-foreground hover:text-accent transition-colors focus-ring rounded-md p-1"
          >
            <Mail className="h-5 w-5" />
            <span className="sr-only">Email</span>
          </Link>
          <Link
            href="https://github.com/yourusername"
            className="text-muted-foreground hover:text-accent transition-colors focus-ring rounded-md p-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </Link>
          <Link
            href="https://linkedin.com/in/yourusername"
            className="text-muted-foreground hover:text-accent transition-colors focus-ring rounded-md p-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}