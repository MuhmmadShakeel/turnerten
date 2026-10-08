'use client';

import { useState } from 'react';
import { ArrowUpRight, Building2, ChartNoAxesCombined, CircleDollarSign, FileText, Handshake, Landmark, LockKeyhole, ReceiptText, Users, Workflow } from 'lucide-react';
import type { Feature } from './data';

const icons = [Building2, FileText, ReceiptText, Landmark, Handshake, CircleDollarSign, ChartNoAxesCombined, LockKeyhole];

const propertyModules: [string, string][] = [
  ['Front office and sales', 'Move available property into booking and sales while keeping customer and transaction records accurate.'],
  ['Sales contracts and installments', 'Connect sold properties with contracts, schedules, installment activity, and customer obligations.'],
  ['Receipts and payments', 'Record incoming and outgoing vouchers against the appropriate customer, party, account, and project.'],
  ['Accounts and ledgers', 'Organize financial entries through a structured chart of accounts and project-specific ledgers.'],
  ['Landowners and investors', 'Manage agreements, allocations, plots, payments, and ledgers for the parties behind each development.'],
  ['Expenses and commissions', 'Track project expenses and obligations owed to commission agents.'],
  ['Recovery operations', 'Monitor outstanding installments, follow-ups, and legal notices for overdue accounts.'],
  ['Administration and security', 'Control master data, platform settings, user access, permissions, and project-level availability.'],
];

export default function ConnectedEcosystem({ feature }: { feature: Feature }) {
  const isProperty = feature.slug === 'property-project-management';
  const modules = isProperty ? propertyModules : [
    ...feature.connections,
    ...feature.proof.map((point, index): [string, string] => [point, feature.stepDetails[index]]),
  ];
  const [active, setActive] = useState(0);
  const selected = modules[active];

  return (
    <section className={`ecosystem-section ecosystem-${feature.slug} relative overflow-hidden px-5 py-16 lg:px-10 lg:py-24`} aria-labelledby="ecosystem-heading">
      <div className="ecosystem-shell mx-auto max-w-[1220px]">
        <p className="ecosystem-eyebrow">One connected platform <span aria-hidden="true" /></p>
        <h2 id="ecosystem-heading" className="ecosystem-heading mt-5 font-semibold leading-[1.1] tracking-[-.045em]">
          {isProperty ? 'Property management that works with the rest of your business.' : `${feature.name} works better when everything connects.`}
        </h2>
      <div className="mt-9 grid gap-10 lg:grid-cols-[.82fr_1.18fr] lg:items-center lg:gap-14">
        <div className="ecosystem-copy" data-aos="fade-right">
          <p className="max-w-[500px] text-[17px] leading-8 text-slate-600">
            {isProperty ? 'From the first property record to the final ledger entry, every team works from a shared project context. Explore the connected parts of your operation.' : feature.connectedDetail}
          </p>
          <div className="ecosystem-detail mt-8" aria-live="polite">
            <div className="ecosystem-detail-top"><span className="ecosystem-detail-number">{String(active + 1).padStart(2, '0')} / {String(modules.length).padStart(2, '0')}</span><ArrowUpRight size={18} aria-hidden="true" /></div>
            <h3 className="mt-5 text-xl font-semibold tracking-tight">{selected[0]}</h3>
            <p className="mt-2 text-sm leading-6 text-slate-600">{selected[1]}</p>
          </div>
          <a href="/contact" className="ecosystem-link mt-7 inline-flex items-center gap-2 text-sm font-bold">See Turner 10 in action <ArrowUpRight size={17} aria-hidden="true" /></a>
        </div>

        <div className="ecosystem-visual" data-aos="fade-left">
          <div className="ecosystem-visual-heading"><span className="ecosystem-live-dot" /> LIVE WORKFLOW <span className="ecosystem-visual-index">TURNER 10 / {String(active + 1).padStart(2, '0')}</span></div>
          <div className="ecosystem-map">
            <svg className="ecosystem-lines" viewBox="0 0 700 560" preserveAspectRatio="none" aria-hidden="true">
              <path className="ecosystem-line-base" d="M350 280 L117 90 M350 280 L350 75 M350 280 L583 90 M350 280 L105 280 M350 280 L595 280 M350 280 L117 470 M350 280 L350 485 M350 280 L583 470" />
              <path className="ecosystem-line-energy" d="M350 280 L117 90 M350 280 L350 75 M350 280 L583 90 M350 280 L105 280 M350 280 L595 280 M350 280 L117 470 M350 280 L350 485 M350 280 L583 470" />
            </svg>
            <div className="ecosystem-hub"><div className="ecosystem-hub-icon"><Workflow size={27} strokeWidth={1.6} aria-hidden="true" /></div><strong>TURNER 10</strong><small>Connected workspace</small></div>
            {modules.map(([title], index) => {
              const Icon = isProperty ? icons[index] : [Building2, Workflow, ReceiptText, Users, FileText, ChartNoAxesCombined][index];
              return <button key={`${title}-${index}`} type="button" className={`ecosystem-node ecosystem-node-${index + 1} ${active === index ? 'is-active' : ''}`} onClick={() => setActive(index)} aria-pressed={active === index}>
                <Icon size={22} strokeWidth={1.7} aria-hidden="true" /><span>{title}</span>
              </button>;
            })}
          </div>
          <div className="ecosystem-visual-foot"><span>PROJECT DATA, IN SYNC</span><span>{String(modules.length).padStart(2, '0')} CONNECTED AREAS</span></div>
        </div>
      </div>
      </div>
    </section>
  );
}
