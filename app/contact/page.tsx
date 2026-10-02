import type { Metadata } from 'next';
import ContactPage from './ContactPage';

export const metadata: Metadata = {
  title: 'Contact Turner 10 | Talk About Your Workflow',
  description: 'Start a conversation about Turner 10 and the real estate workflows your team wants to connect.',
};

export default function Page() {
  return <ContactPage />;
}
