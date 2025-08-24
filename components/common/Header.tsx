'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Projects', href: '/projects' },
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 retro:bg-black retro:border-white retro:border-b-2">
      <div className="max-w-6xl mx-auto px-5 flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-8 flex items-center space-x-2">
            <span className="hidden font-bold sm:inline-block text-xl text-foreground retro:font-retro retro:text-sm">
              PORTFOLIO
            </span>
          </Link>
          <nav className="flex items-center gap-6 text-sm">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'transition-colors hover:text-accent focus-ring rounded-md px-2 py-1 retro:rounded-none retro:font-retro retro:text-xs',
                  pathname === item.href
                    ? 'text-accent font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="ml-auto">
          <ThemeSwitcher />
        </div>
        
        {/* Mobile Navigation */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:hidden">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold text-xl text-foreground retro:font-retro retro:text-sm">PORTFOLIO</span>
          </Link>
          <nav className="flex items-center space-x-2">
            {navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-sm transition-colors hover:text-accent focus-ring rounded-md px-2 py-1 retro:rounded-none retro:font-retro retro:text-xs',
                  pathname === item.href
                    ? 'text-accent font-medium'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
            <ThemeSwitcher />
          </nav>
        </div>
      </div>
    </header>
  );
}