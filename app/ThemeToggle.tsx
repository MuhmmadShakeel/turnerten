'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

const storageKey = 'turner10-theme';

export default function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    setDark(document.documentElement.classList.contains('site-dark'));
  }, []);

  function toggleTheme() {
    const next = !dark;
    document.documentElement.classList.toggle('site-dark', next);
    document.documentElement.style.colorScheme = next ? 'dark' : 'light';
    try { localStorage.setItem(storageKey, next ? 'dark' : 'light'); } catch { /* Storage may be unavailable. */ }
    setDark(next);
  }

  return <button type="button" className="site-theme-toggle" onClick={toggleTheme} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'} aria-pressed={dark} title={dark ? 'Light theme' : 'Dark theme'}>
    {dark ? <Sun className="h-4 w-4" aria-hidden="true" /> : <Moon className="h-4 w-4" aria-hidden="true" />}
    <span className="site-theme-label">{dark ? 'Light' : 'Dark'}</span>
  </button>;
}
