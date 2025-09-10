import Link from "next/link";

export default function HomeAboutTeaser() {
  return (
    <section
      aria-labelledby="about-teaser-heading"
      className="mx-auto mt-16 max-w-3xl rounded-2xl border bg-card p-6"
    >
      <h2 id="about-teaser-heading" className="text-xl font-semibold">
        About
      </h2>

      <p className="mt-3 text-sm text-muted-foreground">
        I'm Cameron Bolton, a product builder focused on AI and clear outcomes.
        Wayne State TISA grad. Disney intern three times. Founder of Genuine. Built StreamerOS.
      </p>

      <ul className="mt-4 space-y-2 text-sm">
        <li>• Reached 100+ employees with Disney Show &amp; Tell</li>
        <li>• Turned 30+ requirements into shipped features</li>
        <li>• Built privacy first human verification and creator analytics</li>
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {["Human verification", "Creator analytics", "Retro UI"].map((t) => (
          <span key={t} className="rounded-full border px-3 py-1 text-xs">
            {t}
          </span>
        ))}
      </div>

      <div className="mt-5">
        <Link
          href="/about"
          className="inline-flex rounded-lg border px-3 py-2 text-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Read my story"
        >
          Read my story
        </Link>
      </div>
    </section>
  );
}
