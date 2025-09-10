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
    'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus-ring retro:rounded-none retro:font-retro retro:border-2 retro:nes-btn',
    'disabled:opacity-50 disabled:cursor-not-allowed',
    {
      'px-3 py-2 text-sm': size === 'sm',
      'px-4 py-2.5 text-base': size === 'md',
      'px-6 py-3 text-lg': size === 'lg',
    },
    {
      'bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm hover:shadow-md retro:border-white retro:shadow-none retro:nes-btn-primary retro:!bg-red-600 retro:!text-white': variant === 'primary',
      'bg-white text-slate-700 hover:bg-slate-50 border border-slate-300 dark:bg-muted dark:text-foreground dark:hover:bg-muted/80 dark:border-border retro:border-white retro:shadow-none retro:nes-btn-secondary retro:!bg-white retro:!text-red-600': variant === 'secondary',
      'text-slate-700 hover:text-slate-800 hover:bg-slate-100 border border-slate-300 dark:text-accent dark:hover:text-accent/80 dark:hover:bg-accent/5 dark:border-transparent retro:border-transparent retro:hover:border-white retro:bg-transparent retro:border-white retro:nes-btn-ghost retro:!text-red-600': variant === 'ghost',
    },
    className
  );

  // Add inline styles for NES mode button colors
  const getInlineStyles = () => {
    if (typeof window !== 'undefined' && document.documentElement.getAttribute('data-theme') === 'retro') {
      if (variant === 'primary') {
        return { backgroundColor: '#dc2626', color: 'white' };
      } else if (variant === 'secondary' || variant === 'ghost') {
        return { backgroundColor: 'white', color: '#dc2626' };
      }
    }
    return {};
  };

  if (href) {
    if (external) {
      // For mailto links, don't use target="_blank"
      const isMailto = href.startsWith('mailto:');
      const linkProps: any = {
        href,
        className: baseClasses,
        style: getInlineStyles()
      };
      
      if (!isMailto) {
        linkProps.target = "_blank";
        linkProps.rel = "noopener noreferrer";
      }
      
      return (
        <a {...linkProps}>
          {children}
        </a>
      );
    }
    
    return (
      <Link href={href} className={baseClasses} style={getInlineStyles()}>
        {children}
      </Link>
    );
  }

  return (
    <button 
      onClick={onClick} 
      disabled={disabled}
      className={baseClasses}
      style={getInlineStyles()}
    >
      {children}
    </button>
  );
}