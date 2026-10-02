import type { Metadata } from 'next';
import AboutPage from './AboutPage';

export const metadata: Metadata = {
  title: 'About Turner 10 | Connected Real Estate Operations',
  description: 'Learn how Turner 10 connects property, sales, land, people, recovery, and finance in one project-aware workspace.',
};

export default function Page() {
  return <AboutPage />;
}
