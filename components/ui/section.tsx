interface SectionProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  className?: string;
}

export function Section({ children, title, subtitle, className = '' }: SectionProps) {
  return (
    <section className={`py-16 lg:py-24 ${className}`}>
      {(title || subtitle) && (
        <div className="text-center mb-12 lg:mb-16">
          {title && (
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-foreground mb-4">
              {title}
            </h2>
          )}
          {subtitle && (
            <p className="text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {children}
    </section>
  );
}