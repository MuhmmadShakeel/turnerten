'use client';
import { ArrowRight, BarChart3, ChevronDown, ChevronLeft, ChevronRight, Menu, Search, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { features as featurePages } from './features/data';
import { solutions as solutionPages } from './solutions/data';

const metrics = [['ONE', 'CONNECTED WORKSPACE'], ['100%', 'PROJECT-AWARE ACCESS'], ['LIVE', 'DERIVED FINANCIALS']];
const pillars = [
  ['Financial integrity', 'One posting gate checks balance, project ownership, and ledger context before anything is saved.'],
  ['Workflow coordination', 'Sales, receipts, and transfers move with their financial consequence in one transaction.'],
  ['Accounting context', 'Every project is initialized with the books and configuration it needs from day one.'],
];
const processSteps = [
  ['Discover', 'Map your projects, teams, records, and the decisions that need a clearer view.'],
  ['Configure', 'Set up the right workspaces, project context, access, and financial structure.'],
  ['Connect', 'Bring property, sales, collections, and accounting into one working flow.'],
  ['Improve', 'Use reliable records to spot gaps, act sooner, and keep operations moving.'],
];
const workflowPhases = [
  { label: 'Discover', title: 'Start with the work your teams do today.', detail: 'We look at the records, decisions, and handoffs behind your projects. That gives the conversation a practical starting point.', activities: ['Map the current workflow', 'Identify the records that matter', 'Agree on the first priorities'] },
  { label: 'Configure', title: 'Set up the project around real responsibilities.', detail: 'Project structure, property data, financial context, and access are organized so each team can work with the right information.', activities: ['Structure projects and inventory', 'Define roles and project access', 'Prepare the financial context'] },
  { label: 'Connect', title: 'Keep the next action tied to its source.', detail: 'As sales, collections, and finance move forward, teams can follow what happened and see the record behind each decision.', activities: ['Follow the sale and its terms', 'Keep payments in context', 'Review the shared project position'] },
];
const faqs = [
  ['What is Turner 10?', 'Turner 10 is a connected real estate ERP that brings property inventory, sales contracts, land acquisition, accounting, payroll, recovery, and access administration into one shared workspace.'],
  ['Who is Turner 10 built for?', 'It is designed for real estate developers and housing societies, including their project managers, sales, land acquisition, finance, payroll, recovery, and administration teams.'],
  ['How does it keep financial records accurate?', 'Each financial action passes through a shared posting gate that verifies balance, project context, ledger ownership, and the associated business record before it can be saved.'],
  ['Can access be controlled by project?', 'Yes. Turner 10 checks both the capabilities a team member has and their assignment to the active project, so teams act only within the records they are allowed to manage.'],
];
const features = [
  ['Property & Project Management', 'Projects, plots, inventory, pricing, and the plot sales desk'],
  ['Sales Contracts & Installments', 'Contract creation, schedules, commissions, transfers, cancellations, and resale'],
  ['Landowner Management', 'Land contracts, payment schedules, distribution, allocation, and position views'],
  ['Accounting & Vouchers', 'Chart of accounts, receipts, payments, cheques, ledgers, and financial statements'],
  ['Payroll & Partners', 'Employee profiles, payroll runs, approval, liabilities, vendors, and investors'],
  ['Recovery Operations', 'Collection boards, commitments, call records, and legal-notice workflows'],
  ['Project-Aware Security', 'Roles, capabilities, project assignments, sessions, audit, backup, and restore'],
];
const testimonials = [
  ['“Turner 10 keeps property, sales, and finance in one reliable context. The connection between operational work and the books is built into the product.”', 'Product & Engineering Case Study'],
  ['“Every derived figure recomputes from its source inputs, helping teams work from a record they can trust instead of re-entering data.”', 'Turner 10 Product Experience'],
  ['“Project-aware access gives each team the freedom to move quickly while protecting the financial context that matters.”', 'Connected Operations Platform'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  useEffect(() => {
    document.querySelectorAll<HTMLElement>('main > section > div.mx-auto').forEach((element) => {
      if (!element.dataset.aos && element.parentElement?.id !== 'platform') element.dataset.aos = 'fade-up';
    });
    document.querySelectorAll<HTMLElement>('.group, #faq .divide-y > div').forEach((element, index) => {
      element.dataset.aos = 'fade-up';
      element.dataset.aosDelay = String((index % 3) * 100);
    });
    AOS.init({ duration: 700, once: true, offset: 28, easing: 'ease-out-cubic' });
    AOS.refresh();
  }, []);
  useEffect(() => { const timer = window.setInterval(() => setActiveTestimonial((current) => (current + 1) % testimonials.length), 5000); return () => window.clearInterval(timer); }, []);
  useEffect(() => {
    if (featuresOpen || solutionsOpen) window.setTimeout(() => {
      document.querySelectorAll<HTMLElement>('header .solution-link').forEach((element, index) => {
        element.dataset.aos = 'fade-down';
        element.dataset.aosDelay = String((index % 2) * 90);
      });
      AOS.refreshHard();
    }, 0);
  }, [featuresOpen, solutionsOpen]);
  useEffect(() => {
    if (!featuresOpen) return;
    document.querySelectorAll<HTMLAnchorElement>('header a').forEach((link) => {
      const slug = featurePages.find((feature) => link.textContent?.includes(feature.name))?.slug;
      if (slug) link.href = slug === 'property-project-management' ? '/property-project-management' : `/features/${slug}`;
    });
  }, [featuresOpen, menuOpen]);
  return <main className="home-page bg-white text-[#17213a]">
    <header className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/10 bg-[#10172a]/90 px-5 py-4 shadow-[0_8px_28px_rgba(8,12,24,.18)] backdrop-blur-xl lg:px-10">
      <a href="#home" className="flex items-center gap-3 text-white"><img src="/turner10-logo.png" alt="Turner 10" className="h-11 w-11 rounded-xl object-contain" /><span className="text-sm font-bold uppercase tracking-[.24em]">Turner 10</span></a>
      <nav className="hidden items-center gap-8 rounded-full bg-black/25 px-7 py-3.5 text-sm font-medium text-white/90 backdrop-blur lg:flex" aria-label="Main navigation">
        <div className="relative"><button aria-expanded={featuresOpen} onClick={() => { setFeaturesOpen(!featuresOpen); setSolutionsOpen(false); }} className="flex items-center gap-1.5 transition hover:text-[#d3a845]">Features <ChevronDown className={`h-3.5 w-3.5 transition ${featuresOpen ? 'rotate-180' : ''}`} /></button>{featuresOpen && <div className="absolute left-1/2 top-9 grid w-[min(680px,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#10172a]/95 p-3 shadow-2xl backdrop-blur-xl">{featurePages.map(item => <a onClick={() => setFeaturesOpen(false)} key={item.slug} href={item.slug === 'property-project-management' ? '/property-project-management' : `/features/${item.slug}`} className="solution-link"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">T10</span><span className="min-w-0"><b>{item.name}</b><small className="truncate">{item.eyebrow}</small></span></a>)}</div>}</div>
        <div className="relative"><button aria-expanded={solutionsOpen} onClick={() => { setSolutionsOpen(!solutionsOpen); setFeaturesOpen(false); }} className="flex items-center gap-1.5 transition hover:text-[#d3a845]">Solutions <ChevronDown className={`h-3.5 w-3.5 transition ${solutionsOpen ? 'rotate-180' : ''}`} /></button>{solutionsOpen && <div className="absolute left-1/2 top-9 grid w-[min(680px,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#10172a]/95 p-3 shadow-2xl backdrop-blur-xl">{solutionPages.map(item => <a onClick={() => setSolutionsOpen(false)} key={item.slug} href={`/solutions/${item.slug}`} className="solution-link"><span className="grid h-8 w-8 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">T10</span><span className="min-w-0"><b>{item.title}</b><small className="truncate">{item.focus}</small></span></a>)}</div>}</div>
        <a href="/about">About</a><a href="/contact">Contact</a>
      </nav>
      <div className="hidden items-center gap-4 lg:flex"><span className="text-sm text-white/80">Sign in</span><a href="/contact" className="rounded-full bg-[#d3a845] px-5 py-3.5 text-xs font-bold uppercase text-[#151c30]">Book a walkthrough <ArrowRight className="ml-1 inline h-3 w-3" /></a></div>
      <ThemeToggle />
      <button aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="text-white lg:hidden">{menuOpen ? <X /> : <Menu />}</button>
      {menuOpen && <nav className="absolute right-5 top-20 flex max-h-[calc(100svh-6rem)] w-[min(20rem,calc(100vw-2.5rem))] flex-col gap-4 overflow-y-auto rounded-xl bg-[#151c30] p-5 text-[17px] text-white shadow-2xl lg:hidden"><button onClick={() => { setFeaturesOpen(!featuresOpen); setSolutionsOpen(false); }} className="flex items-center justify-between text-left">Features <ChevronDown className={`h-4 w-4 ${featuresOpen ? 'rotate-180' : ''}`} /></button>{featuresOpen && <div className="border-l border-[#d3a845]/40 pl-3 text-base text-white/70">{featurePages.map(item => <a onClick={() => { setMenuOpen(false); setFeaturesOpen(false); }} className="mb-3 block" key={item.slug} href={item.slug === 'property-project-management' ? '/property-project-management' : `/features/${item.slug}`}>{item.name}</a>)}</div>}<button onClick={() => { setSolutionsOpen(!solutionsOpen); setFeaturesOpen(false); }} className="flex items-center justify-between text-left">Solutions <ChevronDown className={`h-4 w-4 ${solutionsOpen ? 'rotate-180' : ''}`} /></button>{solutionsOpen && <div className="border-l border-[#d3a845]/40 pl-3 text-base text-white/70">{solutionPages.map(item => <a onClick={() => { setMenuOpen(false); setSolutionsOpen(false); }} className="mb-3 block" key={item.slug} href={`/solutions/${item.slug}`}>{item.title}</a>)}</div>}<a href="/about">About</a><a href="/contact">Contact</a></nav>}
    </header>

    <section id="home" className="relative flex min-h-[720px] items-center overflow-hidden bg-[#151c30] px-5 py-24 text-center text-white lg:min-h-[780px]"><div className="hero-pattern absolute inset-0" /><div className="hero-glow absolute inset-x-0 bottom-0 h-2/3" /><div data-aos="fade-up" className="hero-content relative mx-auto w-full max-w-4xl"><h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-[.94] tracking-[-.065em] sm:text-6xl lg:text-7xl">Property, sales, and finance.<br /> <span className="text-[#d3a845]">One clear picture.</span></h1><p className="mx-auto mt-6 max-w-xl text-base leading-6 text-white/70">A plot reservation, signed contract, or new payment can affect several teams. Turner 10 gives them the same current record to work from.</p><div className="hero-actions mt-7 flex flex-wrap justify-center gap-2"><a className="tab-button bg-white text-[#17213a]" href="#screens">Explore product</a><a className="tab-button border border-white/25" href="#approach">Why it works</a><a className="tab-button bg-[#d3a845] text-[#17213a]" href="/contact">Get started</a></div><div className="hero-search mx-auto mt-6 flex max-w-3xl items-center gap-3 rounded-full bg-white p-2 pl-5 text-left shadow-[0_12px_35px_rgba(0,0,0,.24)]"><Search className="h-4 w-4 shrink-0 text-slate-400" /><span className="flex-1 text-sm text-slate-400">Search projects, contracts, customers, or account codes</span><a href="#screens" className="shrink-0 rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">Search workspace</a></div></div></section>

    <section id="platform" className="platform-section px-5 py-20 lg:px-10">
      <div className="platform-layout mx-auto grid w-full max-w-[1220px] items-stretch gap-10 lg:gap-16">
        <div data-aos="fade-right" className="platform-copy flex flex-col justify-center">
          <p className="label">The Turner 10 advantage</p>
          <h2 className="title mt-3">A clearer view of <em>every project.</em></h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">See how property decisions, customer activity, and financial entries relate to one another.</p>
        </div>
        <div data-aos="fade-left" className="platform-scene" aria-label="Three connected Turner 10 advantages">
          <div className="platform-scene-glow" aria-hidden="true" />
          <div className="platform-scene-grid" aria-hidden="true" />
          {metrics.map(([stat, description], index) => (
            <article key={stat} className={`metric-card platform-card platform-card-${index + 1}`}>
              <span className="platform-card-icon"><BarChart3 className="h-5 w-5" /></span>
              <div><p className="platform-card-stat">{stat}</p><p className="platform-card-description">{description}</p></div>
              <small>0{index + 1}</small>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section id="flow" className="home-flow-section bg-white px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1220px]"><div className="mx-auto max-w-2xl text-center"><p className="label">How the work moves</p><h2 className="title mt-3">One update, seen in the right places.</h2><p className="mt-5 text-base leading-7 text-slate-600">A property decision affects more than one team. Turner 10 keeps the related records close, so each team can pick up the work with the right context.</p></div><div className="flow-track mt-12"><div className="flow-track-line" aria-hidden="true"><span /></div>{[['01', 'Property', 'Start with the current plot, price, and availability.'], ['02', 'Sales', 'Record the buyer, terms, and installment schedule.'], ['03', 'Finance', 'Follow receipts and balances back to the agreement.']].map(([number, title, detail]) => <article key={number} className="flow-stage"><span className="flow-stage-number">{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section>

    <section id="screens" className="screens-section flex min-h-[760px] items-center px-5 py-20 lg:min-h-[850px]"><div className="mx-auto w-full max-w-[1220px]"><div className="text-center"><p className="label">Choose your workspace</p><h2 className="title mt-3">Start with the work <em>in front of you.</em></h2><p className="mt-3 text-sm text-slate-500">Choose the part of the project you are working on. The context comes with you.</p></div><div className="screens-cards mt-10 grid gap-4 md:grid-cols-2"><MockupCard image="/images/img1.webp" eyebrow="Sales lifecycle" title="See every contract clearly." /><MockupCard image="/images/img2.webp" eyebrow="Land acquisition" title="Control every commitment." /><div className="screen-connection" aria-hidden="true"><span className="screen-connection-line" /><span className="screen-connection-pulse" /><span className="screen-connection-core"><ArrowRight className="h-5 w-5" /></span></div></div><p className="screens-caption mt-7 text-center text-sm">Sales and land teams work from the same project context.</p></div></section>

    <section id="approach" className="flex min-h-[760px] items-center bg-[#121a2d] px-5 py-20 text-white lg:min-h-[840px]"><div data-aos="fade-up" className="mx-auto grid w-full max-w-[1220px] items-center gap-10 lg:grid-cols-2"><div className="relative"><div className="absolute -bottom-3 -right-3 h-full w-full rounded-[10px] border-r-[8px] border-b-[8px] border-[#d3a845]" /><img src="/images/operations-property.webp" alt="Modern real estate development at dusk" className="relative aspect-[1.35] w-full rounded-[8px] object-cover object-center" /></div><div><p className="label text-[#d3a845]">Expertise at every step</p><h2 className="mt-4 text-4xl font-semibold leading-[.95] tracking-[-.055em] md:text-5xl">Give your team a clear view of <span className="text-[#d3a845]">connected operations.</span></h2><p className="mt-6 max-w-lg text-base leading-6 text-white/60">Project work spans more than one screen. When sales updates a contract or finance posts a receipt, the rest of the team can follow what changed without chasing a separate file.</p><div className="mt-7 flex gap-2"><span className="rounded-full bg-white/10 px-4 py-2 text-xs">Project-aware</span><span className="rounded-full bg-white/10 px-4 py-2 text-xs">Financially sound</span></div><a href="#faq" className="mt-7 inline-block rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">Find out more <ArrowRight className="ml-1 inline h-3 w-3" /></a></div></div></section>

    <WorkflowRadar />

    <section className="flex min-h-[700px] items-center px-5 py-20 lg:min-h-[780px]"><div data-aos="fade-up" className="mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_1.45fr_1fr]"><img src="/images/connected-data.webp" alt="Contemporary connected real estate development" className="hidden w-full rounded-[8px] shadow-xl lg:block" /><div><p className="label">Ownership, with clarity</p><h2 className="title mt-3">Realize the promise of <em>connected data.</em></h2><div className="my-6 h-px bg-[#d9d6ce]" /><p className="text-sm leading-6 text-slate-500">The figures in your books should match the work on the ground. Turner 10 keeps the source record nearby, so teams can understand a number and decide what to do next.</p><a href="#screens" className="mt-6 inline-block rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">Start your project journey <ArrowRight className="ml-1 inline h-3 w-3" /></a></div><img src="/images/img5.webp" alt="Turner 10 financial interface" className="hidden w-full rounded-[8px] shadow-xl lg:block" /></div></section>

    <section className="relative flex min-h-[700px] items-center overflow-hidden bg-[#151c30] px-5 py-20 text-white lg:min-h-[780px]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(211,168,69,.09),transparent_42%)]" /><div className="relative mx-auto w-full max-w-[1220px]"><div className="text-center"><p className="label text-[#d3a845]">Why Turner 10</p><h2 className="mt-3 text-4xl font-semibold tracking-[-.055em] md:text-5xl">Why teams choose Turner 10</h2><p className="mt-3 text-sm text-white/55">Practical tools for the details that make property operations complex.</p></div><div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-10"><ProcessDiagram /><div data-aos="fade-right" className="grid gap-4">{pillars.map(([title,body],i) => <article key={title} className="why-pillar rounded-xl border border-white/10 bg-[#1b2540]/85 p-5 backdrop-blur sm:p-6"><div className="flex items-center justify-between text-[#d3a845]"><ShieldCheck className="h-4 w-4" /><span className="text-xs">0{i + 1}</span></div><h3 className="mt-4 text-[17px] font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{body}</p></article>)}</div></div></div></section>

    <section className="flex min-h-[530px] items-center px-5 py-20"><div data-aos="fade-up" className="mx-auto w-full max-w-[1050px] text-center"><p className="label">Trusted connected operations</p><h2 className="title mt-3">What the product makes possible</h2><div className="relative mt-9 overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(22,30,48,.08)]"><div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>{testimonials.map(([quote, source]) => <article key={source} className="w-full shrink-0 px-12 py-12 sm:px-20"><p className="text-lg tracking-[.25em] text-[#d3a845]">★★★★★</p><blockquote className="mx-auto mt-6 max-w-2xl text-lg italic leading-8 text-slate-600">{quote}</blockquote><p className="mt-6 text-base font-bold text-[#17213a]">{source}</p></article>)}</div><button onClick={() => setActiveTestimonial((activeTestimonial - 1 + testimonials.length) % testimonials.length)} aria-label="Previous testimonial" className="carousel-button left-3"><ChevronLeft className="h-5 w-5" /></button><button onClick={() => setActiveTestimonial((activeTestimonial + 1) % testimonials.length)} aria-label="Next testimonial" className="carousel-button right-3"><ChevronRight className="h-5 w-5" /></button></div><div className="mt-5 flex justify-center gap-2">{testimonials.map((_, index) => <button aria-label={`Show testimonial ${index + 1}`} onClick={() => setActiveTestimonial(index)} key={index} className={`h-2 rounded-full transition-all ${activeTestimonial === index ? 'w-7 bg-[#d3a845]' : 'w-2 bg-slate-300'}`} />)}</div></div></section>

    <section id="faq" className="flex min-h-[610px] items-center px-5 py-14 lg:min-h-[680px]"><div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[.8fr_1.2fr]"><div data-aos="fade-right"><p className="label">Questions, answered</p><h2 className="title mt-3">Everything teams need to know about <em>Turner 10.</em></h2><p className="mt-5 max-w-sm text-base leading-6 text-slate-500">Have a question about how the product fits your projects? Start with the answers here, or ask us for a walkthrough.</p><a href="#home" className="mt-7 inline-block rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">Explore the platform <ArrowRight className="ml-1 inline h-3 w-3" /></a></div><div data-aos="fade-left" className="divide-y divide-[#dedbd4] rounded-xl border border-[#e2dfd8] bg-white px-6 shadow-sm">{faqs.map(([question, answer], index) => <div key={question} className="py-5"><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 text-left text-base font-semibold text-[#17213a]"><span>{question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-[#b9812c] transition ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-xl pt-3 text-sm leading-6 text-slate-500">{answer}</p>}</div>)}</div></div></section>

    <footer className="bg-[#10172a] px-5 py-10 text-white/65"><div className="mx-auto grid max-w-[1220px] gap-9 text-xs sm:grid-cols-2 lg:grid-cols-4"><div><a href="#home" className="flex items-center gap-3 text-white"><img src="/turner10-logo.png" alt="Turner 10" className="h-11 w-11 rounded-xl object-contain" /><span className="font-bold tracking-[.2em]">TURNER 10</span></a><p className="mt-5 leading-5">Connected real estate operations.</p><a href="#faq" className="footer-link text-[#d3a845]">Explore Turner 10 <ArrowRight className="ml-1 inline h-3 w-3" /></a></div><FooterList title="Featured" items={['Product overview', 'Case study', 'Platform architecture', 'FAQ']} /><FooterList title="Workspaces" items={['Projects', 'Sales lifecycle', 'Accounting', 'Recovery']} /><FooterList title="Navigation" items={['Home', 'Platform', 'Product', 'FAQ']} /></div><div className="mx-auto mt-8 flex max-w-[1220px] flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs sm:flex-row"><span>© 2026 Turner 10. All rights reserved.</span><a className="hover:text-[#d3a845]" href="#home">Back to top ↑</a></div></footer>
  </main>;
}

function MockupCard({ image, eyebrow, title }: { image: string; eyebrow: string; title: string }) { return <article className="group relative h-[310px] overflow-hidden rounded-[8px] bg-[#17213a]"><img src={image} alt={title} className="h-full w-full object-cover object-top opacity-90 transition duration-500 group-hover:scale-[1.02]" /><div className="absolute inset-0 bg-gradient-to-t from-[#10182b]/90 via-transparent to-transparent" /><div className="absolute inset-x-0 bottom-0 p-6 text-white"><p className="label text-[#d3a845]">{eyebrow}</p><h3 className="mt-2 text-2xl font-semibold tracking-tight">{title}</h3></div></article>; }
function FooterList({ title, items }: { title: string; items: string[] }) { const anchors: Record<string, string> = { 'Product overview': '#screens', 'Case study': '#approach', 'Platform architecture': '#platform', 'FAQ': '#faq', Projects: '#screens', 'Sales lifecycle': '#screens', Accounting: '#platform', Recovery: '#approach', Home: '#home', Platform: '#platform', Product: '#screens' }; return <div><p className="font-bold uppercase tracking-[.16em] text-[#d3a845]">{title}</p>{items.map((x) => <a key={x} href={anchors[x] ?? '#faq'} className="footer-link">{x}</a>)}</div>; }

function WorkflowRadar() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = workflowPhases[activePhase];

  return <section id="workflow-radar" className="radar-section relative overflow-hidden px-5 py-20 text-white lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1220px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div className="radar-stage" aria-hidden="true"><div className="radar-grid" /><div className="radar-disc"><span className="radar-ring radar-ring-inner" /><span className="radar-ring radar-ring-middle" /><span className="radar-ring radar-ring-outer" /><span className="radar-sweep" /><span className="radar-ping radar-ping-one" /><span className="radar-ping radar-ping-two" /><span className="radar-ping radar-ping-three" /><span className="radar-core"><strong>T10</strong><small>{phase.label}</small></span></div><span className="radar-coordinate radar-coordinate-top">PROJECT / 01</span><span className="radar-coordinate radar-coordinate-bottom">CONNECTED OPERATIONS</span></div><div className="radar-copy"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e7bd67]">How we work</p><h2 className="mt-4 max-w-xl text-[clamp(2.4rem,4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-.055em]">A clear path from project detail to shared decisions.</h2><p className="mt-5 max-w-xl text-base leading-7 text-white/65">Explore the steps that bring property, sales, and finance into the same working picture.</p><div className="radar-phase-switch mt-8" aria-label="Explore how we work">{workflowPhases.map((item, index) => <button key={item.label} type="button" className={`radar-phase-button ${activePhase === index ? 'is-active' : ''}`} aria-pressed={activePhase === index} onClick={() => setActivePhase(index)}><span>0{index + 1}</span>{item.label}</button>)}</div><div key={phase.label} className="radar-detail mt-7" aria-live="polite"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#e7bd67]">Step 0{activePhase + 1} of 03</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{phase.title}</h3><p className="mt-3 max-w-xl text-base leading-7 text-white/65">{phase.detail}</p><ul className="mt-6 grid gap-3">{phase.activities.map(activity => <li key={activity} className="radar-activity"><span className="radar-activity-dot" />{activity}</li>)}</ul></div><a href="/contact" className="radar-link mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#f0cb83]">Discuss your workflow <ArrowRight className="h-4 w-4" /></a></div></div></section>;
}

function ProcessDiagram() {
  return <div data-aos="fade-left" className="process-panel rounded-[2rem] border border-[#d3a845]/20 bg-[#111b31]/90 p-5 shadow-[0_24px_60px_rgba(0,0,0,.2)] backdrop-blur sm:p-7">
    <div className="mb-5 text-center"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#d3a845]">Our approach</p><h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">One connected way of working</h3></div>
    <div className="process-orbit" aria-label="Our four-step process">
      <svg className="process-flow" viewBox="0 0 600 520" preserveAspectRatio="none" aria-hidden="true"><path className="process-flow-base" d="M 155 130 L 300 260 L 445 130 L 300 260 L 445 390 L 300 260 L 155 390" /><path className="process-flow-light" d="M 155 130 L 300 260 L 445 130 L 300 260 L 445 390 L 300 260 L 155 390" /></svg>
      {processSteps.map(([title, body], index) => <article key={title} className={`process-node process-node-${index + 1}`}><span className="process-node-index">0{index + 1}</span><h4>{title}</h4><p>{body}</p></article>)}
      <div className="process-hub"><span className="process-hub-ring" /><span className="process-hub-orbit" /><span className="process-hub-mark">T10</span><span className="process-hub-label">Connected<br />operations</span></div>
    </div>
  </div>;
}
