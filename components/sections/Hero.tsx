"use client";

import { StarsBackground } from "@/components/ui/stars";
import Link from "next/link";

export default function Hero() {
  return (
    <section
      className="relative flex min-h-[70vh] items-center justify-center overflow-hidden px-4"
      aria-labelledby="hero-heading"
    >
      {/* Background: stars + subtle gradient for readability */}
      <StarsBackground className="absolute inset-0 -z-10" />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-background/60 via-background/40 to-background/80"
      />

      {/* Foreground */}
      <div className="mx-auto max-w-3xl text-center">
        <h1 id="hero-heading" className="text-4xl font-bold tracking-tight sm:text-6xl">
          Making magic, one product at a time.
        </h1>

        <p className="mt-4 text-base text-muted-foreground sm:text-lg">
          I build AI-driven products that blend strategy, design, and code. <br />
          Disney intern x3, founder of Genuine, builder of StreamerOS.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <Link
            href="#projects"
            aria-label="See my work"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            See my work
          </Link>

          <Link
            href="#contact"
            aria-label="Contact me"
            className="rounded-lg border px-4 py-2 text-sm font-medium hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          >
            Contact me
          </Link>
        </div>
      </div>
    </section>
  );
}
