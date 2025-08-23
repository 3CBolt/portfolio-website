import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className }: TypographyProps) {
  return (
    <h1 className={cn(
      'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground',
      className
    )}>
      {children}
    </h1>
  );
}

export function H2({ children, className }: TypographyProps) {
  return (
    <h2 className={cn(
      'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground',
      className
    )}>
      {children}
    </h2>
  );
}

export function H3({ children, className }: TypographyProps) {
  return (
    <h3 className={cn(
      'text-xl sm:text-2xl font-semibold tracking-tight text-foreground',
      className
    )}>
      {children}
    </h3>
  );
}

export function Sub({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      'text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed',
      className
    )}>
      {children}
    </p>
  );
}

export function Meta({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      'text-sm text-muted-foreground font-medium',
      className
    )}>
      {children}
    </p>
  );
}

export function Body({ children, className }: TypographyProps) {
  return (
    <p className={cn(
      'text-base text-muted-foreground leading-relaxed',
      className
    )}>
      {children}
    </p>
  );
}