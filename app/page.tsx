'use client';
import { ArrowRight, BarChart3, ChevronDown, ChevronLeft, ChevronRight, Menu, ShieldCheck, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from './ThemeToggle';
import ProductScreenshot from './ProductScreenshot';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { features as featurePages } from './features/data';
import { solutions as solutionPages } from './solutions/data';

const metrics = [['One', 'Shared workspace'], ['Clear', 'Access by project'], ['Live', 'Financial records']];
const heroSlides = [
  { image: '/images/about-hero-background.png', title: 'Every project in focus.', accent: 'Every team in sync.', description: 'See your properties, sales, collections, and finances together, with the details your teams need close at hand.', highlights: ['A workspace for each project', 'Records that stay connected', 'Decisions with context'] },
  { image: '/images/operations-property.webp', title: 'From plot to payment.', accent: 'Keep the story together.', description: 'See what is available, what has sold, and what has been paid without piecing together separate records.', highlights: ['Property inventory', 'Sales and contracts', 'Payments in view'] },
  { image: '/images/connected-data.webp', title: 'More clarity across', accent: 'every development.', description: 'Help project managers, sales teams, and finance work from the same up to date information.', highlights: ['Multiple projects', 'Access for each team', 'Finance in context'] },
];
const pillars = [
  ['Reliable financial records', 'Before an entry is saved, Turner 10 checks that it balances and belongs to the right project and account.'],
  ['Teams working together', 'Sales, receipts, and transfers stay connected, so the next team can see what changed.'],
  ['Books for every project', 'Each project has the accounts and settings it needs from the start.'],
];
const processSteps = [
  ['Discover', 'Understand how your projects and teams work today.'],
  ['Configure', 'Set up projects, team access, property records, and accounts.'],
  ['Connect', 'Bring sales, collections, and accounting into the same flow.'],
  ['Improve', 'See what needs attention and act with a clearer picture.'],
];
const workflowPhases = [
  { label: 'Discover', title: 'Start with how your teams work.', detail: 'We review the records people use and where handoffs slow them down. Then we agree on what to improve first.', activities: ['Review the current process', 'Identify important records', 'Set practical priorities'] },
  { label: 'Configure', title: 'Set up each project for the people using it.', detail: 'Organize properties, accounts, and team access so everyone can find the information they need.', activities: ['Organize projects and properties', 'Set team access', 'Prepare project accounts'] },
  { label: 'Connect', title: 'Keep each step linked to the last.', detail: 'When sales, collections, or finance makes an update, the next team can see what happened and why.', activities: ['Follow a sale from the start', 'Keep payments with the contract', 'Review the full project picture'] },
];
const faqs = [
  ['What is Turner 10?', 'Turner 10 brings property records, sales, land agreements, accounting, payroll, and collections into one workspace for real estate teams.'],
  ['Who is Turner 10 built for?', 'It is designed for real estate developers and housing societies, including their project managers, sales, land acquisition, finance, payroll, recovery, and administration teams.'],
  ['How does it keep financial records accurate?', 'Before a financial entry is saved, Turner 10 checks that it balances and is linked to the right project, account, and business record.'],
  ['Can access be controlled by project?', 'Yes. Team members can be given access to the projects and tasks that match their responsibilities.'],
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
const platformDetails = [
  ['A property record stays connected to the sale and the payments that follow, so teams can see the full history in one place.', 'Property and sales'],
  ['Financial reports draw on recorded activity. Teams can trace a figure back to the transaction behind it.', 'Finance and reporting'],
  ['Project access helps people focus on the work assigned to them while keeping sensitive records in the right hands.', 'Team access'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [activeHero, setActiveHero] = useState(0);
  const [heroPaused, setHeroPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(media.matches);
    update();
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useEffect(() => {
    if (heroPaused || reduceMotion) return;
    const timer = window.setInterval(() => setActiveHero((current) => (current + 1) % heroSlides.length), 4000);
    return () => window.clearInterval(timer);
  }, [heroPaused, reduceMotion]);
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
  useEffect(() => { const timer = window.setInterval(() => setActiveTestimonial((current) => (current + 1) % platformDetails.length), 5000); return () => window.clearInterval(timer); }, []);
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
      <a href="#home" className="brand-lockup text-white" aria-label="Turner 10 home"><span className="brand-mark"><img src="/turner10-logo.webp" alt="" /></span><span className="brand-wordmark"><strong>TURNER<span>10</span></strong><small>REAL ESTATE ERP</small></span></a>
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

    <section id="home" className="home-hero relative flex min-h-svh items-center overflow-hidden bg-[#10172a] px-5 pb-14 pt-28 text-white" aria-label="Turner 10 overview carousel" onFocusCapture={() => setHeroPaused(true)} onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setHeroPaused(false); }}>
      <div className="home-hero-media" aria-hidden="true">{heroSlides.map((slide, index) => <div key={slide.image} className={`home-hero-image ${activeHero === index ? 'is-active' : ''}`} style={{ backgroundImage: `url(${slide.image})` }} />)}</div>
      <div className="home-hero-shade" />
      <svg className="home-hero-lines" viewBox="0 0 1440 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <g className="home-hero-line-set home-hero-line-set-top">{Array.from({ length: 9 }, (_, index) => <path key={index} d={`M -130 ${290 + index * 28} C 270 ${48 + index * 25}, 470 ${35 + index * 17}, 790 ${200 + index * 17} S 1240 ${270 + index * 11}, 1570 ${175 + index * 14}`} />)}</g>
        <g className="home-hero-line-set home-hero-line-set-right">{Array.from({ length: 8 }, (_, index) => <path key={index} d={`M ${675 + index * 37} -90 C ${570 + index * 35} 210, ${950 + index * 26} 330, 1570 ${265 + index * 32}`} />)}</g>
        <g className="home-hero-line-set home-hero-line-set-bottom">{Array.from({ length: 10 }, (_, index) => <path key={index} d={`M -130 ${570 + index * 32} C 260 ${365 + index * 24}, 560 ${400 + index * 17}, 850 ${580 + index * 14} S 1250 ${700 + index * 9}, 1570 ${570 + index * 14}`} />)}</g>
        <path className="home-hero-line-emphasis" d="M -100 535 C 280 345, 525 398, 820 550 S 1230 690, 1560 558" />
      </svg>
      <div className="home-hero-inner relative mx-auto w-full max-w-[1220px]">
        <div key={activeHero} className="home-hero-copy max-w-[1060px]">
          <h1 className="text-[clamp(3rem,5vw,5rem)] font-semibold leading-[1.02] tracking-[-.06em]">{heroSlides[activeHero].title}<br /><span>{heroSlides[activeHero].accent}</span></h1>
          <p className="mt-7 max-w-[610px] text-[17px] leading-8 text-white/80 sm:text-lg">{heroSlides[activeHero].description}</p>
          <div className="home-hero-highlights mt-6 flex flex-wrap gap-x-6 gap-y-2">{heroSlides[activeHero].highlights.map(item => <span key={item}>{item}</span>)}</div>
          <div className="home-hero-actions mt-9 flex flex-wrap gap-3"><a href="/contact" className="home-hero-primary">Book a walkthrough <ArrowRight size={17} /></a><a href="#screens" className="home-hero-secondary">Explore the platform <ArrowRight size={17} /></a></div>
        </div>
        <div className="home-hero-controls mt-7 flex items-center gap-3" aria-label="Carousel controls">
          <button type="button" onClick={() => setActiveHero((activeHero - 1 + heroSlides.length) % heroSlides.length)} aria-label="Previous slide" className="home-hero-arrow"><ChevronLeft size={20} /></button>
          <button type="button" onClick={() => setActiveHero((activeHero + 1) % heroSlides.length)} aria-label="Next slide" className="home-hero-arrow"><ChevronRight size={20} /></button>
          <span className="home-hero-counter">0{activeHero + 1} <span>/</span> 0{heroSlides.length}</span>
          <div className="home-hero-dots">{heroSlides.map((slide, index) => <button key={slide.image} type="button" className={activeHero === index ? 'is-active' : ''} onClick={() => setActiveHero(index)} aria-label={`Show slide ${index + 1}: ${slide.title}`} aria-current={activeHero === index ? 'true' : undefined} />)}</div>
        </div>
      </div>
      <div className="home-hero-side-label" aria-hidden="true">CONNECTED REAL ESTATE OPERATIONS · TURNER 10</div>
    </section>

    <section id="platform" className="platform-section px-5 py-20 lg:px-10">
      <div className="platform-layout mx-auto grid w-full max-w-[1220px] items-stretch gap-10 lg:gap-16">
        <div data-aos="fade-right" className="platform-copy flex flex-col justify-center">
          <p className="label">The Turner 10 advantage</p>
          <h2 className="title mt-3">See every project <em>clearly.</em></h2>
          <p className="mt-5 max-w-lg text-base leading-7 text-slate-500">See the property, customer, and financial details behind each decision.</p>
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

    <section id="flow" className="home-flow-section bg-white px-5 py-20 lg:px-10"><div className="mx-auto max-w-[1220px]"><div className="mx-auto max-w-2xl text-center"><p className="label">How the work moves</p><h2 className="title mt-3">Keep every team informed.</h2><p className="mt-5 text-base leading-7 text-slate-600">When a property is reserved or a payment arrives, everyone involved can see the latest record.</p></div><div className="flow-track mt-12"><div className="flow-track-line" aria-hidden="true"><span /></div>{[['01', 'Property', 'Start with the current plot, price, and availability.'], ['02', 'Sales', 'Record the buyer, terms, and installment schedule.'], ['03', 'Finance', 'Follow receipts and balances back to the agreement.']].map(([number, title, detail]) => <article key={number} className="flow-stage"><span className="flow-stage-number">{number}</span><h3>{title}</h3><p>{detail}</p></article>)}</div></div></section>

    <section id="screens" className="screens-section flex min-h-[760px] items-center px-5 py-20 lg:min-h-[850px]"><div className="mx-auto w-full max-w-[1220px]"><div className="text-center"><p className="label">Choose your workspace</p><h2 className="title mt-3">Work in the <em>right context.</em></h2><p className="mt-3 text-sm text-slate-500">Open the part of the project you need. The related details are already there.</p></div><div className="screens-cards mt-10 grid gap-4 md:grid-cols-2"><MockupCard image="/product-screens/sales.webp" eyebrow="Sales lifecycle" title="Sales tools in one workspace" /><MockupCard image="/product-screens/landowners.webp" eyebrow="Land acquisition" title="Land agreements and allocation" /><div className="screen-connection" aria-hidden="true"><span className="screen-connection-line" /><span className="screen-connection-pulse" /><span className="screen-connection-core"><ArrowRight className="h-5 w-5" /></span></div></div><p className="screens-caption mt-7 text-center text-sm">Sales and land teams work from the same project context.</p></div></section>

    <section id="approach" className="flex min-h-[760px] items-center bg-[#121a2d] px-5 py-20 text-white lg:min-h-[840px]"><div data-aos="fade-up" className="mx-auto grid w-full max-w-[1220px] items-center gap-10 lg:grid-cols-2"><div className="relative"><div className="absolute -bottom-3 -right-3 h-full w-full rounded-[10px] border-r-[8px] border-b-[8px] border-[#d3a845]" /><img src="/images/operations-property.webp" alt="Modern real estate development at dusk" className="relative aspect-[1.35] w-full rounded-[8px] object-cover object-center" /></div><div><p className="label text-[#d3a845]">Expertise at every step</p><h2 className="mt-4 text-4xl font-semibold leading-[.95] tracking-[-.055em] md:text-5xl">Keep your team <span className="text-[#d3a845]">connected.</span></h2><p className="mt-6 max-w-lg text-base leading-6 text-white/60">A project moves through many hands. Sales can update a contract, finance can post a receipt, and everyone can see the latest position in one place.</p><div className="mt-7 flex gap-2"><span className="rounded-full bg-white/10 px-4 py-2 text-xs">Project-aware</span><span className="rounded-full bg-white/10 px-4 py-2 text-xs">Financially sound</span></div><a href="#faq" className="mt-7 inline-block rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">See how it works <ArrowRight className="ml-1 inline h-3 w-3" /></a></div></div></section>

    <WorkflowRadar />

    <section className="flex min-h-[700px] items-center px-5 py-20 lg:min-h-[780px]"><div data-aos="fade-up" className="mx-auto grid w-full max-w-[1120px] items-center gap-10 lg:grid-cols-[1fr_1.45fr_1fr]"><img src="/images/connected-data.webp" alt="Contemporary connected real estate development" className="hidden w-full rounded-[8px] shadow-xl lg:block" /><div><p className="label">Ownership, with clarity</p><h2 className="title mt-3">Know the story <em>behind the numbers.</em></h2><div className="my-6 h-px bg-[#d9d6ce]" /><p className="text-sm leading-6 text-slate-500">When a number changes, you should be able to see why. Turner 10 keeps financial figures close to the sales and payment records behind them.</p><a href="#screens" className="mt-6 inline-block rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">Explore Turner 10 <ArrowRight className="ml-1 inline h-3 w-3" /></a></div><ProductScreenshot src="/product-screens/accounts.webp" title="Accounts" className="hidden w-full lg:block" /></div></section>

    <section className="relative flex min-h-[700px] items-center overflow-hidden bg-[#151c30] px-5 py-20 text-white lg:min-h-[780px]"><div className="absolute inset-0 bg-[radial-gradient(circle_at_28%_50%,rgba(211,168,69,.09),transparent_42%)]" /><div className="relative mx-auto w-full max-w-[1220px]"><div className="text-center"><p className="label text-[#d3a845]">Why Turner 10</p><h2 className="home-why-heading mt-3 text-4xl font-semibold tracking-[-.055em] md:text-5xl">Built for property teams</h2><p className="mt-3 text-sm text-white/55">Practical tools for the work property teams do every day.</p></div><div className="mt-10 grid items-start gap-8 lg:grid-cols-[minmax(0,.85fr)_minmax(0,1.15fr)] lg:gap-10"><ProcessDiagram /><div data-aos="fade-right" className="grid gap-4">{pillars.map(([title,body],i) => <article key={title} className="why-pillar rounded-xl border border-white/10 bg-[#1b2540]/85 p-5 backdrop-blur sm:p-6"><div className="flex items-center justify-between text-[#d3a845]"><ShieldCheck className="h-4 w-4" /><span className="text-xs">0{i + 1}</span></div><h3 className="mt-4 text-[17px] font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-white/60">{body}</p></article>)}</div></div></div></section>

    <section className="flex min-h-[530px] items-center px-5 py-20"><div data-aos="fade-up" className="mx-auto w-full max-w-[1050px] text-center"><p className="label">Inside the platform</p><h2 className="title mt-3">See what your teams can do</h2><div className="relative mt-9 overflow-hidden rounded-2xl bg-white shadow-[0_12px_35px_rgba(22,30,48,.08)]"><div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${activeTestimonial * 100}%)` }}>{platformDetails.map(([detail, area]) => <article key={area} className="w-full shrink-0 px-12 py-12 sm:px-20"><p className="platform-detail-label text-sm font-bold uppercase tracking-[.13em]">{area}</p><p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">{detail}</p></article>)}</div><button onClick={() => setActiveTestimonial((activeTestimonial - 1 + platformDetails.length) % platformDetails.length)} aria-label="Previous platform detail" className="carousel-button left-3"><ChevronLeft className="h-5 w-5" /></button><button onClick={() => setActiveTestimonial((activeTestimonial + 1) % platformDetails.length)} aria-label="Next platform detail" className="carousel-button right-3"><ChevronRight className="h-5 w-5" /></button></div><div className="mt-5 flex justify-center gap-2">{platformDetails.map((_, index) => <button aria-label={`Show platform detail ${index + 1}`} onClick={() => setActiveTestimonial(index)} key={index} className={`h-2 rounded-full transition-all ${activeTestimonial === index ? 'w-7 bg-[#d3a845]' : 'w-2 bg-slate-300'}`} />)}</div></div></section>

    <section id="faq" className="flex min-h-[610px] items-center px-5 py-14 lg:min-h-[680px]"><div className="mx-auto grid w-full max-w-[1120px] gap-10 lg:grid-cols-[.8fr_1.2fr]"><div data-aos="fade-right"><p className="label">Questions, answered</p><h2 className="title mt-3">Questions about <em>Turner 10.</em></h2><p className="mt-5 max-w-sm text-base leading-6 text-slate-500">Have questions about how Turner 10 fits your projects? We can walk through your process together.</p><a href="#home" className="mt-7 inline-block rounded-full bg-[#d3a845] px-5 py-3 text-xs font-bold text-[#17213a]">Explore the platform <ArrowRight className="ml-1 inline h-3 w-3" /></a></div><div data-aos="fade-left" className="divide-y divide-[#dedbd4] rounded-xl border border-[#e2dfd8] bg-white px-6 shadow-sm">{faqs.map(([question, answer], index) => <div key={question} className="py-5"><button onClick={() => setOpenFaq(openFaq === index ? -1 : index)} className="flex w-full items-center justify-between gap-5 text-left text-base font-semibold text-[#17213a]"><span>{question}</span><ChevronDown className={`h-4 w-4 shrink-0 text-[#b9812c] transition ${openFaq === index ? 'rotate-180' : ''}`} /></button>{openFaq === index && <p className="max-w-xl pt-3 text-sm leading-6 text-slate-500">{answer}</p>}</div>)}</div></div></section>

    <footer className="bg-[#10172a] px-5 py-10 text-white/65"><div className="mx-auto grid max-w-[1220px] gap-9 text-xs sm:grid-cols-2 lg:grid-cols-4"><div><a href="#home" className="flex items-center gap-3 text-white"><img src="/turner10-logo.png" alt="Turner 10" className="h-11 w-11 rounded-xl object-contain" /><span className="font-bold tracking-[.2em]">TURNER 10</span></a><p className="mt-5 leading-5">Connected real estate operations.</p><a href="#faq" className="footer-link text-[#d3a845]">Explore Turner 10 <ArrowRight className="ml-1 inline h-3 w-3" /></a></div><FooterList title="Featured" items={['Product overview', 'Case study', 'Platform architecture', 'FAQ']} /><FooterList title="Workspaces" items={['Projects', 'Sales lifecycle', 'Accounting', 'Recovery']} /><FooterList title="Navigation" items={['Home', 'Platform', 'Product', 'FAQ']} /></div><div className="mx-auto mt-8 flex max-w-[1220px] flex-col justify-between gap-3 border-t border-white/10 pt-5 text-xs sm:flex-row"><span>© 2026 Turner 10. All rights reserved.</span><a className="hover:text-[#d3a845]" href="#home">Back to top ↑</a></div></footer>
  </main>;
}

function MockupCard({ image, eyebrow, title }: { image: string; eyebrow: string; title: string }) { return <article className="min-w-0"><ProductScreenshot src={image} title={eyebrow} caption={title} /></article>; }
function FooterList({ title, items }: { title: string; items: string[] }) { const anchors: Record<string, string> = { 'Product overview': '#screens', 'Case study': '#approach', 'Platform architecture': '#platform', 'FAQ': '#faq', Projects: '#screens', 'Sales lifecycle': '#screens', Accounting: '#platform', Recovery: '#approach', Home: '#home', Platform: '#platform', Product: '#screens' }; return <div><p className="font-bold uppercase tracking-[.16em] text-[#d3a845]">{title}</p>{items.map((x) => <a key={x} href={anchors[x] ?? '#faq'} className="footer-link">{x}</a>)}</div>; }

function WorkflowRadar() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = workflowPhases[activePhase];

  return <section id="workflow-radar" className="radar-section relative overflow-hidden px-5 py-20 text-white lg:px-10 lg:py-24"><div className="mx-auto grid max-w-[1220px] items-center gap-12 lg:grid-cols-[.9fr_1.1fr] lg:gap-20"><div className="radar-stage" aria-hidden="true"><div className="radar-grid" /><div className="radar-disc"><span className="radar-ring radar-ring-inner" /><span className="radar-ring radar-ring-middle" /><span className="radar-ring radar-ring-outer" /><span className="radar-sweep" /><span className="radar-ping radar-ping-one" /><span className="radar-ping radar-ping-two" /><span className="radar-ping radar-ping-three" /><span className="radar-core"><strong>T10</strong><small>{phase.label}</small></span></div><span className="radar-coordinate radar-coordinate-top">PROJECT / 01</span><span className="radar-coordinate radar-coordinate-bottom">CONNECTED OPERATIONS</span></div><div className="radar-copy"><p className="text-xs font-bold uppercase tracking-[.2em] text-[#e7bd67]">How we work</p><h2 className="mt-4 max-w-xl text-[clamp(2.4rem,4vw,4.4rem)] font-semibold leading-[1.04] tracking-[-.055em]">A clearer path to shared decisions.</h2><p className="mt-5 max-w-xl text-base leading-7 text-white/65">See how property, sales, and finance come together in daily work.</p><div className="radar-phase-switch mt-8" aria-label="Explore how we work">{workflowPhases.map((item, index) => <button key={item.label} type="button" className={`radar-phase-button ${activePhase === index ? 'is-active' : ''}`} aria-pressed={activePhase === index} onClick={() => setActivePhase(index)}><span>0{index + 1}</span>{item.label}</button>)}</div><div key={phase.label} className="radar-detail mt-7" aria-live="polite"><p className="text-xs font-bold uppercase tracking-[.18em] text-[#e7bd67]">Step 0{activePhase + 1} of 03</p><h3 className="mt-3 text-2xl font-semibold tracking-tight">{phase.title}</h3><p className="mt-3 max-w-xl text-base leading-7 text-white/65">{phase.detail}</p><ul className="mt-6 grid gap-3">{phase.activities.map(activity => <li key={activity} className="radar-activity"><span className="radar-activity-dot" />{activity}</li>)}</ul></div><a href="/contact" className="radar-link mt-8 inline-flex items-center gap-2 text-sm font-bold text-[#f0cb83]">Discuss your workflow <ArrowRight className="h-4 w-4" /></a></div></div></section>;
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
