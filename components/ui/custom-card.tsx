import { cn } from '@/lib/utils';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function CustomCard({ children, className, hover = false }: CardProps) {
  return (
    <div className={cn(
      'bg-white rounded-2xl border border-border shadow-sm retro:rounded-none retro:border-2 retro:border-white retro:shadow-none retro:cartridge-card',
      hover && 'transition-all duration-300 hover:shadow-lg hover:-translate-y-1',
      hover && 'retro:hover:shadow-none retro:hover:translate-y-0',
      className
    )}>
      {children}
    </div>
  );
}

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function CardHeader({ children, className }: CardHeaderProps) {
  return (
    <div className={cn('p-6 pb-4', className)}>
      {children}
    </div>
  );
}

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export function CardContent({ children, className }: CardContentProps) {
  return (
    <div className={cn('px-6 pb-6', className)}>
      {children}
    </div>
  );
}