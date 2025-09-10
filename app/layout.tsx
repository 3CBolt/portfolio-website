import './globals.css';
import type { Metadata } from 'next';
import { Inter, Press_Start_2P } from 'next/font/google';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';
import { ThemeProvider } from '@/components/theme/ThemeProvider';
import StartMount from '@/components/retro/StartMount';

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
});

const pressStart2P = Press_Start_2P({ 
  weight: '400',
  subsets: ['latin'],
  variable: '--font-press-start',
});

export const metadata: Metadata = {
  title: 'Cameron Bolton – Product Builder & PM',
  description: 'I build AI-driven products that blend strategy, design, and code. Disney intern x3, founder of Genuine, builder of StreamerOS.',
  keywords: ['portfolio', 'product manager', 'developer', 'AI', 'Disney', 'Genuine', 'StreamerOS'],
  authors: [{ name: 'Cameron Bolton' }],
  creator: 'Cameron Bolton',
  openGraph: {
    title: 'Cameron Bolton – Product Builder & PM',
    description: 'Projects in AI, human verification, and creator analytics. Let\'s build something meaningful together.',
    url: 'https://cameronbolton.dev',
    siteName: 'Cameron Bolton Portfolio',
    images: [{ url: 'https://cameronbolton.dev/og-cover.png' }],
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@3CBolt',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${pressStart2P.variable} font-sans`}>
        <ThemeProvider>
          <StartMount />
          <div className="min-h-screen flex flex-col retro-background">
            <Header />
            <main className="flex-1 max-w-6xl mx-auto w-full">
              <div className="retro-surface">
                {children}
              </div>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}