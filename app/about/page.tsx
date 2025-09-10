import { PRODUCT_AI_SKILLS } from '@/lib/constants';

export const metadata = {
  title: 'About Cameron Bolton',
  description: 'Learn more about Cameron Bolton\'s background as a product builder, Disney intern, and founder of Genuine and StreamerOS.',
};

export default function AboutPage() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold">About Me</h1>
        <p className="mt-2 text-muted-foreground">
          I'm Cameron Bolton, a product builder who combines strategy, design, and code to create real solutions.
        </p>
      </header>

      <section className="prose prose-neutral dark:prose-invert">
        <h2>My Story</h2>
        <p>
          I studied Technology, Information Systems and Analytics at Wayne State University and completed three product management internships at The Walt Disney Company. At Disney I launched a Show &amp; Tell series that reached more than 100 employees and turned over 30 technical requirements into working product features. This work sharpened product lifecycle management and stakeholder alignment.
        </p>
        <p>
          I started Genuine, a privacy first human verification platform, and built StreamerOS, an AI dashboard that helps creators analyze their streams. Both projects let me explore new technology while focusing on real user problems. I focused on AI prototyping, ethical AI, and product analytics.
        </p>
        <p>
          I have led teams as President of my fraternity chapter and the Wayne State NSBE chapter. Those roles taught me how to guide people, build community, and deliver results.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">What Drives Me</h2>
        <ul className="mt-3 grid list-disc gap-1 pl-5 marker:text-muted-foreground">
          <li>Trust</li>
          <li>Creativity</li>
          <li>Family</li>
          <li>Wisdom</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Technical Skills</h2>
        <div className="mt-3 grid gap-6 sm:grid-cols-2">
          <div>
            <h3 className="font-medium">Frontend</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              React, Next.js, TypeScript, Tailwind CSS, HTML, CSS, JavaScript
            </p>
          </div>
          <div>
            <h3 className="font-medium">Backend</h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Node.js, Python, PostgreSQL, MongoDB, Express.js, REST APIs, GraphQL, AWS
            </p>
          </div>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Product &amp; AI Skills</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Focused, high signal skills for AI product work.
        </p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {PRODUCT_AI_SKILLS.map((s) => (
            <li key={s} className="rounded-full border px-3 py-1 text-sm">{s}</li>
          ))}
        </ul>
      </section>

      <section className="mt-10 prose prose-neutral dark:prose-invert">
        <h2>Exploring Now</h2>
        <ul>
          <li>Human verification with Genuine</li>
          <li>Creator analytics with StreamerOS</li>
          <li>Retro inspired design with Cameron.BAT</li>
        </ul>
      </section>

      <section className="mt-10 prose prose-neutral dark:prose-invert">
        <h2>Future Vision</h2>
        <p>
          I want to keep building products at the intersection of technology and storytelling. My long term goal is to create at Marvel Studios.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Let's Work Together</h2>
        <div className="mt-3 flex items-center gap-4">
          {/* Replace with your actual headshot asset */}
          <img
            src="/images/cameron-bolton-headshot.jpg"
            alt="Cameron Bolton headshot"
            className="h-16 w-16 rounded-full object-cover"
          />
          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=cbolt369@gmail.com&su=Let's%20Work%20Together"
            className="rounded-lg border px-3 py-2 text-sm hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            aria-label="Email Cameron Bolton"
            target="_blank"
            rel="noopener noreferrer"
          >
            Email me
          </a>
        </div>
      </section>
    </section>
  );
}