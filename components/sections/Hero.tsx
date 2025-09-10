"use client";

import { StarsBackground } from "@/components/ui/stars";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Background: stars + subtle gradient for readability (hidden in NES mode) */}
      <StarsBackground className="absolute inset-0 -z-10 retro:hidden" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/80 via-background/50 to-background/90 retro:hidden"
      />

      {/* Foreground */}
      <div className="mx-auto max-w-4xl text-center px-4">
        <h1 id="hero-heading" className="text-5xl font-bold tracking-tight text-foreground sm:text-7xl lg:text-8xl">
          Making magic, one product at a time.
        </h1>

        <p className="mt-6 text-lg text-muted-foreground sm:text-xl lg:text-2xl">
          I build AI-driven products that blend strategy, design, and code. <br />
          Disney intern x3, founder of Genuine, builder of StreamerOS.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
          <Link
            href="#projects"
            aria-label="See my work"
            className="rounded-xl bg-primary px-8 py-3 text-base font-semibold text-primary-foreground shadow-lg hover:bg-primary/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            See my work
          </Link>

          <Link
            href="#contact"
            aria-label="Contact me"
            className="rounded-xl border-2 border-primary/20 bg-background/80 px-8 py-3 text-base font-semibold text-foreground backdrop-blur-sm hover:border-primary/40 hover:bg-background/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
          >
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}
