import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Turner 10 | Connected Operations',
  description: 'A connected ERP for real estate operations.',
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" suppressHydrationWarning><head><script dangerouslySetInnerHTML={{ __html: "try{if(localStorage.getItem('turner10-theme')==='dark'){document.documentElement.classList.add('site-dark');document.documentElement.style.colorScheme='dark'}}catch(e){}" }} /></head><body>{children}</body></html>;
}
