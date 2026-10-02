'use client';

import { ArrowRight, BarChart3, Building2, ChevronDown, CircleDollarSign, FileText, Handshake, LockKeyhole, Menu, PhoneCall, Users, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { features } from '../features/data';
import { solutions } from '../solutions/data';

const featurePath = (slug: string) =>
  slug === 'property-project-management' ? '/property-project-management' : `/features/${slug}`;

const principles = [
  ['One project context', 'Plots, contracts, people, and finances stay attached to the project they belong to.'],
  ['Actions with a source', 'A receipt or voucher can be understood through the business record that created it.'],
  ['Control without friction', 'Capabilities and project assignments keep access relevant to the work each person does.'],
];

const flow = [
  ['Start with the property', 'Set up phases, blocks, plot dimensions, pricing, and availability in a structured project record.'],
  ['Carry the sale forward', 'Keep agreements, installment schedules, receipts, transfers, and resale tied to the buyer and plot.'],
  ['Let the books follow', 'Check balance, ledger context, and project ownership before an entry becomes part of reporting.'],
];

const networkCapabilities = [
  { label: 'Projects', icon: Building2 },
  { label: 'Sales', icon: FileText },
  { label: 'Land', icon: Handshake },
  { label: 'Accounting', icon: CircleDollarSign },
  { label: 'Payroll', icon: Users },
  { label: 'Recovery', icon: PhoneCall },
  { label: 'Security', icon: LockKeyhole },
  { label: 'Reporting', icon: BarChart3 },
];

const networkBenefits = [
  { label: 'Connected records', icon: FileText },
  { label: 'Clearer decisions', icon: BarChart3 },
  { label: 'Coordinated teams', icon: Users },
  { label: 'Project-aware access', icon: LockKeyhole },
  { label: 'Reliable reporting', icon: CircleDollarSign },
];

export default function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<'features' | 'solutions' | null>(null);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({ disable: reducedMotion, duration: 650, once: true, offset: 50, easing: 'ease-out-cubic' });
    AOS.refreshHard();
  }, []);

  return (
    <main className="bg-white text-[#17213a] selection:bg-[#d3a845] selection:text-[#10182B]">
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/10 bg-[#10182B]/95 px-5 py-4 text-white shadow-[0_8px_28px_rgba(8,12,24,.18)] backdrop-blur-xl lg:px-10">
        <a href="/" className="flex shrink-0 items-center gap-3"><img src="/turner10-logo.webp" alt="Turner 10" className="h-11 w-11 rounded-xl object-contain" /><span className="text-xs font-bold uppercase tracking-[.24em]">Turner 10</span></a>
        <nav className="hidden items-center gap-8 rounded-full bg-black/25 px-7 py-3.5 text-sm font-medium text-white/90 lg:flex" aria-label="Main navigation">
          {(['features', 'solutions'] as const).map(menu => (
            <div key={menu} className="relative">
              <button type="button" aria-expanded={openMenu === menu} onClick={() => setOpenMenu(openMenu === menu ? null : menu)} className="flex items-center gap-1.5 transition hover:text-[#d3a845]">
                {menu === 'features' ? 'Features' : 'Solutions'} <ChevronDown className={`h-3.5 w-3.5 transition ${openMenu === menu ? 'rotate-180' : ''}`} />
              </button>
              {openMenu === menu && <div className="absolute left-1/2 top-9 grid w-[min(680px,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#10182B]/95 p-3 shadow-2xl backdrop-blur-xl">
                {(menu === 'features'
                  ? features.map(item => ({ name: item.name, detail: item.eyebrow, href: featurePath(item.slug) }))
                  : solutions.map(item => ({ name: item.title, detail: item.focus, href: `/solutions/${item.slug}` }))
                ).map(item => <a key={item.href} href={item.href} className="flex min-h-[72px] min-w-0 items-center gap-3 rounded-xl border border-white/[.06] p-3 text-white/85 transition hover:border-[#d3a845]/40 hover:bg-[#d3a845]/10"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-[10px] font-bold text-[#d3a845]">T10</span><span className="min-w-0"><b className="block text-sm">{item.name}</b><small className="mt-1 block truncate text-xs text-white/50">{item.detail}</small></span></a>)}
              </div>}
            </div>
          ))}
          <a href="/about" aria-current="page" className="text-[#d3a845]">About</a>
          <a href="/contact" className="hover:text-[#d3a845]">Contact</a>
        </nav>
        <a href="/contact" className="hidden items-center gap-2 rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold uppercase text-[#10182B] lg:inline-flex">Book a walkthrough <ArrowRight className="h-4 w-4" /></a>
        <ThemeToggle />
        <button type="button" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="lg:hidden">{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="absolute right-5 top-20 max-h-[calc(100svh-6rem)] w-[min(20rem,calc(100vw-2.5rem))] overflow-y-auto rounded-xl bg-[#10182B] p-5 text-base shadow-2xl lg:hidden" aria-label="Mobile navigation">
          <a href="/" className="mb-4 block">Home</a><a href="/about" aria-current="page" className="mb-4 block text-[#d3a845]">About</a><a href="/contact" className="mb-4 block">Contact</a>
          <p className="border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-wider text-[#d3a845]">Solutions</p>
          {solutions.map(item => <a key={item.slug} href={`/solutions/${item.slug}`} className="block py-2 text-white/75">{item.title}</a>)}
          <p className="mt-3 border-t border-white/10 pt-4 text-xs font-bold uppercase tracking-wider text-[#d3a845]">Features</p>
          {features.map(item => <a key={item.slug} href={featurePath(item.slug)} className="block py-2 text-white/75">{item.name}</a>)}
        </nav>}
      </header>

      <section id="top" className="relative flex min-h-[680px] items-center overflow-hidden bg-[#10182B] px-5 pb-16 pt-32 text-white lg:min-h-svh lg:px-10">
        <div className="absolute inset-0 bg-cover bg-center opacity-70" style={{ backgroundImage: "url('/images/about-hero-background.png')" }} />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,24,43,.96)_0%,rgba(16,24,43,.84)_43%,rgba(16,24,43,.5)_100%)]" />
        <div data-aos="fade-up" className="relative mx-auto w-full max-w-[1220px] text-center">
          <div className="mx-auto max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#d3a845]">Connected real-estate operations</p>
            <h1 className="mt-4 text-[clamp(2.7rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-.06em]">Every team contributes to the project. <span className="text-[#d3a845]">The records should reflect that.</span></h1>
            <p className="mt-6 max-w-xl text-[17px] leading-8 text-white/75">Turner 10 gives property, sales, land, recovery, and finance teams a shared view of the project. Each team can focus on its work and still see the records behind the next decision.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3"><a href="#platform" className="inline-flex items-center gap-2 rounded-full bg-[#d3a845] px-6 py-3 text-sm font-bold text-[#10182B] transition hover:bg-[#e4bd65]">Understand the platform <ArrowRight className="h-4 w-4" /></a><a href="/contact" className="rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#d3a845]">Talk to us</a></div>
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-10 lg:py-20"><div className="mx-auto grid max-w-[1220px] items-center gap-10 lg:grid-cols-[.8fr_1.2fr]"><div data-aos="fade-right"><h2 className="text-[clamp(2.1rem,3.4vw,3.4rem)] font-semibold leading-[1.07] tracking-[-.045em]">A project moves from one team to the next.</h2><p className="mt-5 text-[17px] leading-8 text-slate-600">A property record starts the story. The sale adds terms and obligations. The books record the financial result. Each team can do its own work without breaking the chain between them.</p></div><div className="space-y-3">{flow.map(([title, detail], index) => <article key={title} data-aos="fade-left" data-aos-delay={index * 80} className="flex gap-5 rounded-xl border border-[#e1e4e9] bg-white p-5 shadow-[0_8px_25px_rgba(16,24,43,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><div><h3 className="text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{detail}</p></div></article>)}</div></div></section>

      <section id="platform" className="about-network-section px-5 py-20 text-white lg:px-10 lg:py-24">
        <div className="mx-auto max-w-[1220px]">
          <div data-aos="fade-up" className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[.2em] text-[#e7bd67]">One connected platform</p>
            <h2 className="mt-4 text-[clamp(2.3rem,4vw,4rem)] font-semibold leading-[1.05] tracking-[-.055em]">Turner 10 brings every project team into focus.</h2>
            <p className="mt-5 text-base leading-7 text-white/70">The workspaces connect through one project context, so each decision can be understood alongside the records and teams behind it.</p>
          </div>
          <div data-aos="zoom-in" className="about-network-diagram" aria-label="Turner 10 connects eight project workspaces">
            <svg className="about-network-lines" viewBox="0 0 800 630" preserveAspectRatio="none" aria-hidden="true">
              <path d="M400 315 L400 68 M400 315 L585 135 M400 315 L690 315 M400 315 L585 500 M400 315 L400 565 M400 315 L215 500 M400 315 L110 315 M400 315 L215 135" />
            </svg>
            <div className="about-network-core"><span className="about-network-core-mark">T10</span><strong>Turner 10</strong><small>Connected operations</small></div>
            {networkCapabilities.map(({ label, icon: Icon }, index) => <div key={label} className={`about-network-node about-network-node-${index + 1}`}><Icon aria-hidden="true" className="about-network-node-icon" /><span>{label}</span></div>)}
          </div>
          <div className="about-network-benefits" aria-label="What connected operations make possible">
            {networkBenefits.map(({ label, icon: Icon }) => <div key={label} className="about-network-benefit"><Icon aria-hidden="true" /><span>{label}</span></div>)}
          </div>
        </div>
      </section>

      <section className="px-5 py-16 lg:px-10 lg:py-20"><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><h2 className="text-[clamp(2.1rem,3.4vw,3.4rem)] font-semibold leading-[1.07] tracking-[-.045em]">See how the teams fit together.</h2><p className="mt-4 text-[17px] leading-8 text-slate-600">Each workspace solves a specific job. Together, they give project managers, sales teams, acquisition, finance, payroll, recovery, and administrators a shared operating picture.</p></div><div className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{features.slice(0, -1).map((feature, index) => <a key={feature.slug} href={featurePath(feature.slug)} data-aos="fade-up" data-aos-delay={(index % 3) * 70} className="group flex min-h-[190px] flex-col justify-between rounded-xl border border-[#e1e4e9] bg-white p-6 transition hover:-translate-y-1 hover:border-[#d3a845] hover:shadow-[0_15px_35px_rgba(16,24,43,.09)] motion-reduce:transform-none"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><div><h3 className="text-lg font-semibold">{feature.name}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{feature.intro}</p></div><ArrowRight className="mt-5 h-4 w-4 text-[#b9812c] transition group-hover:translate-x-1 motion-reduce:transform-none" /></a>)}</div></div></section>

      <section className="px-5 pb-20 pt-8 lg:px-10 lg:pb-24"><div className="mx-auto grid max-w-[1220px] items-center gap-10 lg:grid-cols-[1.05fr_.95fr]"><div data-aos="fade-right" className="overflow-hidden rounded-2xl border border-[#e1e4e9] bg-white p-2 shadow-[0_20px_50px_rgba(16,24,43,.1)]"><img src="/solutions/accounting.webp" alt="Illustrative Turner 10 accounting and voucher software workspace" className="block h-auto w-full rounded-xl" /></div><div data-aos="fade-left"><h2 className="text-[clamp(2.1rem,3.4vw,3.4rem)] font-semibold leading-[1.07] tracking-[-.045em]">Clear records start with careful controls.</h2><p className="mt-5 text-[17px] leading-8 text-slate-600">Turner 10 connects the work behind each financial entry. A common posting check verifies balance, project ownership, and ledger context before a financial entry is saved. Project-aware authorization checks both what someone can do and where they can do it.</p><p className="mt-4 text-base leading-7 text-slate-600">Those controls help teams move quickly while keeping the record understandable for the next person who needs it.</p><a href="/features/accounting-vouchers" className="mt-7 inline-flex items-center gap-2 text-sm font-bold text-[#91651e]">See how financial records connect <ArrowRight className="h-4 w-4" /></a></div></div></section>

      <footer className="border-t border-white/10 bg-[#10182B] px-5 py-10 text-white lg:px-10"><div className="mx-auto grid max-w-[1220px] gap-8 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr]"><div><a href="/" className="inline-flex items-center gap-3"><img src="/turner10-logo.webp" alt="" className="h-10 w-10 object-contain" /><span className="text-xs font-bold uppercase tracking-[.24em]">Turner 10</span></a><p className="mt-4 max-w-xs text-sm leading-6 text-white/60">Connected software for real estate projects, sales, finance, and the teams behind them.</p></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d3a845]">Explore</p><a href="/about" className="mt-3 block text-sm text-white/70">About</a><a href="/solutions/projects-property" className="mt-2 block text-sm text-white/70">Solutions</a><a href="/property-project-management" className="mt-2 block text-sm text-white/70">Features</a></div><div><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d3a845]">Connect</p><a href="/contact" className="mt-3 block text-sm text-white/70">Contact</a><a href="/#home" className="mt-2 block text-sm text-white/70">Home</a></div></div><div className="mx-auto mt-8 flex max-w-[1220px] flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-xs text-white/40"><span>© 2026 Turner 10. All rights reserved.</span><a href="#top" className="hover:text-[#d3a845]">Back to top ↑</a></div></footer>
    </main>
  );
}
