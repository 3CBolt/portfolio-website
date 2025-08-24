import { cn } from '@/lib/utils';

interface TypographyProps {
  children: React.ReactNode;
  className?: string;
}

export function H1({ children, className, ...props }: TypographyProps) {
  return (
    <h1 className={cn(
      'text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground retro:font-retro retro:text-2xl retro:lg:text-3xl',
      className
    )} {...props}>
      {children}
    </h1>
  );
}

export function H2({ children, className, ...props }: TypographyProps) {
  return (
    <h2 className={cn(
      'text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-foreground retro:font-retro retro:text-xl',
      className
    )} {...props}>
      {children}
    </h2>
  );
}

export function H3({ children, className, ...props }: TypographyProps) {
  return (
    <h3 className={cn(
      'text-xl sm:text-2xl font-semibold tracking-tight text-foreground retro:font-retro retro:text-lg',
      className
    )} {...props}>
      {children}
    </h3>
  );
}

export function Sub({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn(
      'text-lg sm:text-xl lg:text-2xl text-muted-foreground leading-relaxed retro:font-retro retro:text-sm',
      className
    )} {...props}>
      {children}
    </p>
  );
}

export function Meta({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn(
      'text-sm text-muted-foreground font-medium retro:font-retro retro:text-xs',
      className
    )} {...props}>
      {children}
    </p>
  );
}

export function Body({ children, className, ...props }: TypographyProps) {
  return (
    <p className={cn(
      'text-base text-muted-foreground leading-relaxed retro:font-retro retro:text-sm retro:leading-6',
      className
    )} {...props}>
      {children}
    </p>
  );
}