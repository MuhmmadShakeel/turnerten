'use client';

import { ArrowRight, Check, ChevronDown, Menu, X } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { features } from '../features/data';
import { solutions } from '../solutions/data';

const featurePath = (slug: string) =>
  slug === 'property-project-management' ? '/property-project-management' : `/features/${slug}`;

const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();

const topics = [
  'Projects and property',
  'Sales and collections',
  'Accounting and finance',
  'Land and people',
  'Access and administration',
  'A complete platform walkthrough',
];

const conversation = [
  ['Your current workflow', 'Tell us how projects, sales, and finance work together today and where information gets lost.'],
  ['The records that matter', 'Share the decisions your team needs to make, from plot availability to contract or ledger position.'],
  ['The right next step', 'We can focus the conversation on the Turner 10 workspaces relevant to your team.'],
];

export default function ContactPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'features' | 'solutions' | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({ disable: reducedMotion, duration: 650, once: true, offset: 50, easing: 'ease-out-cubic' });
    AOS.refreshHard();
  }, []);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!contactEmail) return;

    const data = new FormData(event.currentTarget);
    const name = String(data.get('name') ?? '').trim();
    const email = String(data.get('email') ?? '').trim();
    const company = String(data.get('company') ?? '').trim();
    const topic = String(data.get('topic') ?? '').trim();
    const message = String(data.get('message') ?? '').trim();
    const subject = `Turner 10 enquiry: ${topic}`;
    const body = [`Name: ${name}`, `Email: ${email}`, `Company: ${company || 'Not provided'}`, `Topic: ${topic}`, '', message].join('\n');
    window.location.href = `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  return (
    <main className="content-page bg-white text-[#17213a] selection:bg-[#d3a845] selection:text-[#10182B]">
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/10 bg-[#10182B]/95 px-5 py-4 text-white shadow-[0_8px_28px_rgba(8,12,24,.18)] backdrop-blur-xl lg:px-10">
        <a href="/" className="flex shrink-0 items-center gap-3"><img src="/turner10-logo.webp" alt="Turner 10" className="h-11 w-11 rounded-xl object-contain" /><span className="text-xs font-bold uppercase tracking-[.24em]">Turner 10</span></a>
        <nav className="hidden items-center gap-8 rounded-full bg-black/25 px-7 py-3.5 text-sm font-medium text-white/90 lg:flex" aria-label="Main navigation">
          {(['features', 'solutions'] as const).map(menu => <div key={menu} className="relative">
            <button type="button" aria-expanded={openMenu === menu} onClick={() => setOpenMenu(openMenu === menu ? null : menu)} className="flex items-center gap-1.5 transition hover:text-[#d3a845]">{menu === 'features' ? 'Features' : 'Solutions'} <ChevronDown className={`h-3.5 w-3.5 transition ${openMenu === menu ? 'rotate-180' : ''}`} /></button>
            {openMenu === menu && <div className="absolute left-1/2 top-9 grid w-[min(680px,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#10182B]/95 p-3 shadow-2xl backdrop-blur-xl">
              {(menu === 'features' ? features.map(item => ({ name: item.name, detail: item.eyebrow, href: featurePath(item.slug) })) : solutions.map(item => ({ name: item.title, detail: item.focus, href: `/solutions/${item.slug}` }))).map(item => <a key={item.href} href={item.href} className="flex min-h-[72px] min-w-0 items-center gap-3 rounded-xl border border-white/[.06] p-3 text-white/85 transition hover:border-[#d3a845]/40 hover:bg-[#d3a845]/10"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-[10px] font-bold text-[#d3a845]">T10</span><span className="min-w-0"><b className="block text-sm">{item.name}</b><small className="mt-1 block truncate text-xs text-white/50">{item.detail}</small></span></a>)}
            </div>}
          </div>)}
          <a href="/about" className="hover:text-[#d3a845]">About</a><a href="/contact" aria-current="page" className="text-[#d3a845]">Contact</a>
        </nav>
        <a href="#enquiry" className="hidden items-center gap-2 rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold uppercase text-[#10182B] lg:inline-flex">Start a conversation <ArrowRight className="h-4 w-4" /></a>
        <ThemeToggle />
        <button type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="absolute right-5 top-20 max-h-[calc(100svh-6rem)] w-[min(20rem,calc(100vw-2.5rem))] overflow-y-auto rounded-xl bg-[#10182B] p-5 text-base shadow-2xl lg:hidden" aria-label="Mobile navigation"><a href="/" className="mb-4 block">Home</a><a href="/about" className="mb-4 block">About</a><a href="/contact" aria-current="page" className="mb-4 block text-[#d3a845]">Contact</a><p className="border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-wider text-[#d3a845]">Solutions</p>{solutions.map(item => <a key={item.slug} href={`/solutions/${item.slug}`} className="block py-2 text-white/75">{item.title}</a>)}<p className="mt-3 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-wider text-[#d3a845]">Features</p>{features.map(item => <a key={item.slug} href={featurePath(item.slug)} className="block py-2 text-white/75">{item.name}</a>)}</nav>}
      </header>

      <section id="top" className="contact-hero relative flex items-center overflow-hidden bg-[#10182B] px-5 text-white lg:px-10"><img src="/images/contact-hero.webp" alt="" aria-hidden="true" className="contact-hero-image" /><div className="contact-hero-overlay" aria-hidden="true" /><div data-aos="fade-up" className="relative mx-auto w-full max-w-[1220px]"><div className="max-w-3xl"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d3a845]">Contact Turner 10</p><h1 className="mt-5 text-[clamp(2.7rem,5vw,4.7rem)] font-semibold leading-[1.03] tracking-[-.055em]">Tell us what your team needs.</h1><p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/75">Whether the challenge is plot availability, a contract, collections, or financial reporting, we can start with the workflow that matters most to your team.</p><a href="#enquiry" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#d3a845] px-6 py-3 text-sm font-bold text-[#10182B] transition hover:-translate-y-1 hover:bg-[#e4bd65] motion-reduce:transform-none">Start an enquiry <ArrowRight className="h-4 w-4" /></a></div></div></section>

      <section id="enquiry" className="scroll-mt-24 bg-[#f7f5ef] px-5 py-16 lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1220px] items-start gap-10 lg:grid-cols-[.8fr_1.2fr] lg:gap-16"><div data-aos="fade-right" className="max-w-lg lg:pt-10"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#b9812c]">Your next step</p><h2 className="mt-4 text-[clamp(2.1rem,3.4vw,3.4rem)] font-semibold leading-[1.07] tracking-[-.045em]">Start with the work today.</h2><p className="mt-5 text-[17px] leading-8 text-slate-600">Share a little about your project and where the work gets difficult. We will use those details to focus the conversation on the right teams and records.</p><div className="mt-8 flex items-start gap-3 border-t border-[#d9dde5] pt-6"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-[#d3a845]/50 text-[#b9812c]"><Check className="h-5 w-5" /></span><p className="text-sm leading-6 text-slate-600">A practical conversation about your workflow and the decisions your team needs to make.</p></div></div><div data-aos="fade-left" className="scroll-mt-28 rounded-2xl border border-white/15 bg-white p-6 text-[#17213a] shadow-[0_28px_70px_rgba(0,0,0,.28)] sm:p-8"><h2 className="text-2xl font-semibold tracking-[-.035em]">Start with a few details.</h2><p className="mt-2 text-sm leading-6 text-slate-600">Tell us what you would like to explore in Turner 10.</p><form onSubmit={handleSubmit} className="mt-7 grid gap-5 sm:grid-cols-2"><label className="block text-sm font-semibold">Your name <input name="name" type="text" autoComplete="name" required className="mt-2 block w-full rounded-lg border border-[#d9dde5] bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#b9812c] focus:ring-2 focus:ring-[#d3a845]/20" placeholder="Your name" /></label><label className="block text-sm font-semibold">Work email <input name="email" type="email" autoComplete="email" required className="mt-2 block w-full rounded-lg border border-[#d9dde5] bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#b9812c] focus:ring-2 focus:ring-[#d3a845]/20" placeholder="you@company.com" /></label><label className="block text-sm font-semibold">Company <input name="company" type="text" autoComplete="organization" className="mt-2 block w-full rounded-lg border border-[#d9dde5] bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#b9812c] focus:ring-2 focus:ring-[#d3a845]/20" placeholder="Company or project" /></label><label className="block text-sm font-semibold">What would you like to discuss? <select name="topic" required defaultValue="" className="mt-2 block w-full rounded-lg border border-[#d9dde5] bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#b9812c] focus:ring-2 focus:ring-[#d3a845]/20"><option value="" disabled>Choose a topic</option>{topics.map(topic => <option key={topic} value={topic}>{topic}</option>)}</select></label><label className="block text-sm font-semibold sm:col-span-2">Tell us more <textarea name="message" rows={4} required className="mt-2 block w-full resize-y rounded-lg border border-[#d9dde5] bg-white px-4 py-3 text-base font-normal outline-none transition focus:border-[#b9812c] focus:ring-2 focus:ring-[#d3a845]/20" placeholder="What is your team trying to improve?" /></label><div className="sm:col-span-2"><button type="submit" disabled={!contactEmail} className="inline-flex items-center gap-2 rounded-full bg-[#d3a845] px-6 py-3 text-sm font-bold text-[#10182B] transition hover:bg-[#e4bd65] disabled:cursor-not-allowed disabled:opacity-50">Open email draft <ArrowRight className="h-4 w-4" /></button><p className="mt-3 text-xs leading-5 text-slate-500">{contactEmail ? 'This prepares an email for you to review and send in your email app.' : 'The contact address is being set up. Please check back soon.'}</p></div></form></div></div></section>

      <section className="px-5 py-16 lg:px-10 lg:py-20"><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><h2 className="text-[clamp(2.1rem,3.3vw,3.3rem)] font-semibold leading-[1.07] tracking-[-.045em]">Talk about your daily work.</h2><p className="mt-4 text-[17px] leading-8 text-slate-600">Tell us what works today and where your team loses time. A few specific examples will help us focus the conversation.</p></div><div className="mt-9 grid gap-4 md:grid-cols-3">{conversation.map(([title, detail], index) => <article key={title} data-aos="fade-up" data-aos-delay={index * 80} className="rounded-xl border border-[#e1e4e9] bg-white p-6 shadow-[0_8px_25px_rgba(16,24,43,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-base leading-7 text-slate-600">{detail}</p></article>)}</div></div></section>

      <footer className="bg-[#10182B] px-5 py-10 text-white lg:px-10"><div className="mx-auto grid max-w-[1220px] gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]"><div><a href="/" className="inline-flex items-center gap-3"><img src="/turner10-logo.webp" alt="" className="h-10 w-10 object-contain" /><span className="text-xs font-bold uppercase tracking-[.24em]">Turner 10</span></a><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Connected software for real estate projects, sales, finance, and the teams behind them.</p></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d3a845]">Explore</p><a href="/about" className="mt-3 block text-sm text-white/70">About</a><a href="/solutions/projects-property" className="mt-2 block text-sm text-white/70">Solutions</a><a href="/property-project-management" className="mt-2 block text-sm text-white/70">Features</a></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d3a845]">Connect</p><a href="/contact" className="mt-3 block text-sm text-white/70">Contact</a><a href="/#faq" className="mt-2 block text-sm text-white/70">Product questions</a></div></div><div className="mx-auto mt-8 flex max-w-[1220px] flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/40"><span>© 2026 Turner 10. All rights reserved.</span><a href="#top" className="hover:text-[#d3a845]">Back to top ↑</a></div></footer>
    </main>
  );
}
