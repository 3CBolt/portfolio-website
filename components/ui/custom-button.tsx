import Link from 'next/link';
import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  external?: boolean;
}

export function CustomButton({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  href, 
  onClick, 
  className,
  disabled = false,
  external = false
}: ButtonProps) {
  const baseClasses = cn(
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-ring retro:rounded-none retro:font-retro retro:text-xs retro:border-2 retro:nes-btn',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-2.5 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    },
    {
      'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md retro:border-white retro:shadow-none retro:nes-btn-primary': variant === 'primary',
      'bg-muted text-foreground hover:bg-muted/80 border border-border retro:border-white retro:shadow-none retro:bg-background retro:text-foreground retro:border-white': variant === 'secondary',
      'text-accent hover:text-accent/80 hover:bg-accent/5 retro:border-transparent retro:hover:border-white retro:bg-transparent retro:border-white': variant === 'ghost',
    },
    className
  );

  if (href) {
    if (external) {
      return (
        <a 
          href={href} 
          target="_blank" 
          rel="noopener noreferrer"
          className={baseClasses}
        >
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={baseClasses}
    >
      {children}
    </button>
  );
}