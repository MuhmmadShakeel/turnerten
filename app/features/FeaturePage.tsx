'use client';

import { ArrowDown, ArrowRight, Check, ChevronDown, Menu, Workflow, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle';
import ProductScreenshot from '../ProductScreenshot';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { features, type Feature } from './data';
import { solutions } from '../solutions/data';
import ConnectedEcosystem from './ConnectedEcosystem';

const featurePath = (slug: string) =>
  slug === 'property-project-management' ? '/property-project-management' : `/features/${slug}`;

const sectionClass = 'relative scroll-mt-8 px-5 py-12 lg:px-10 lg:py-14';

const propertyBenefits = [
  ['Centralized project workspace', 'Keep essential project information in one organized workspace and move between authorized projects without losing context.'],
  ['Structured property inventory', 'Maintain consistent records for plot numbers, categories, dimensions, pricing, location, and availability.'],
  ['Real-time availability', 'Give teams a clear view of available, reserved, booked, sold, repurchased, and blocked property.'],
  ['Connected customer records', 'Link each booking and sale to the right customer, property, payment plan, documents, and transaction history.'],
  ['Role-based access', 'Show users the projects, modules, and actions that match their responsibilities.'],
  ['Integrated operations', 'Keep property records connected to sales, installments, receipts, accounts, commissions, investors, landowners, and recovery.'],
];

const propertyCapabilities = [
  ['Multiple-project management', 'Manage several developments in one system, with authorized access to the relevant inventory, transactions, parties, and accounts.'],
  ['Project master records', 'Maintain project details, classifications, operational settings, and master data from a controlled workspace.'],
  ['Plot and unit management', 'Create detailed records for plots, commercial units, residential properties, and other inventory types.'],
  ['Property categorization', 'Organize inventory by block, sector, phase, street, property type, size, or any classification your development uses.'],
  ['Availability and status tracking', 'Follow each property from available to reserved, booked, sold, cancelled, repurchased, or restricted.'],
  ['Pricing and payment configuration', 'Associate properties with prices, booking requirements, schedules, installments, charges, discounts, and commercial terms.'],
  ['Customer and ownership history', 'Keep sales, resale, cancellation, and ownership activity visible against the relevant property.'],
  ['Search and filtering', 'Help teams find projects, properties, customers, and records quickly with practical search and filters.'],
  ['Document-ready records', 'Keep structured information ready for agreements, receipts, schedules, statements, and other operational documents.'],
  ['Controlled updates', 'Allow authorized users to make changes while supporting accuracy, consistency, and accountability.'],
];

const propertyWorkflow = [
  ['Configure the project', 'Create the project structure, define key settings, and prepare the required property and financial records.'],
  ['Add property inventory', 'Register plots or units with their category, dimensions, location, price, and starting availability.'],
  ['Connect the right parties', 'Associate landowners, investors, vendors, employees, agents, customers, and other relevant parties.'],
  ['Process sales activity', 'Reserve or sell property through a connected workflow that retains customer and contract records.'],
  ['Track financial activity', 'Connect payments, receipts, installment schedules, expenses, commissions, and ledger entries to the right project.'],
  ['Monitor and manage', 'Review inventory, ownership, outstanding obligations, recovery activity, and operational records in one place.'],
];

const salesBenefits = [
  ['Centralized sales contracts', 'Keep customer details, selected property, pricing, payment terms, and transaction history together.'],
  ['Flexible installment plans', 'Configure booking amounts, down payments, recurring installments, development charges, and custom schedules.'],
  ['Accurate balance tracking', 'See contract value, collections, remaining balance, upcoming dues, and overdue installments in one view.'],
  ['Connected payment records', 'Link each receipt and financial entry to the right customer, property, contract, and installment.'],
  ['Improved collection visibility', 'Give recovery teams a focused view of outstanding amounts, due dates, and accounts needing follow-up.'],
  ['Complete sales history', 'Retain payments, schedule changes, cancellations, repurchases, resales, and contract activity.'],
];

const salesCapabilities = [
  ['Customer and property connection', 'Connect every contract to the correct customer and property, reducing incomplete or disconnected transactions.'],
  ['Contract value management', 'Record price, booking amount, discount, charges, development costs, and final payable amount.'],
  ['Booking and sale processing', 'Move inventory from available to reservation, booking, and confirmed sale with the latest status reflected.'],
  ['Contract terms', 'Keep commercial conditions, payment terms, dates, and customer obligations with the contract record.'],
  ['Payment-plan configuration', 'Create installment structures that match the commercial terms of each project or property.'],
  ['Contract documentation', 'Keep the information needed for booking forms, schedules, agreements, statements, and customer documents ready.'],
  ['Amendments and adjustments', 'Record approved changes to pricing, schedules, charges, customer details, or terms without losing context.'],
  ['Contract status tracking', 'Monitor whether a contract is active, complete, cancelled, transferred, repurchased, or under recovery.'],
];

const salesWorkflow = [
  ['Select the customer', 'Choose an existing customer or create a structured record with the required contact and identification information.'],
  ['Choose the property', 'Select an available plot or unit from the relevant project inventory.'],
  ['Define the sale', 'Enter the agreed price, booking amount, charges, discounts, and applicable commercial terms.'],
  ['Generate the installment plan', 'Create a schedule around the agreed contract frequency, dates, and amounts.'],
  ['Confirm the contract', 'Finalize the transaction and update the property status in the connected project workflow.'],
  ['Record payments', 'Issue receipts and apply collections to the correct customer, contract, and installment.'],
  ['Monitor outstanding amounts', 'Identify upcoming dues, missed payments, balances, and accounts that need follow-up.'],
  ['Complete or update the contract', 'Maintain the final position through settlement, approved changes, cancellation, resale, or repurchase.'],
];

const salesModules = [
  ['Property & project management', 'Confirm availability and link every contract to the correct project, plot, or property unit.'],
  ['Receipts & payments', 'Record collections and allocate them to the correct financial obligation.'],
  ['Accounts & ledgers', 'Post financial activity to configured project and customer accounts.'],
  ['Commissions', 'Connect eligible sales with employee, agent, or sales-office commission obligations.'],
  ['Investors', 'Keep investor plots, financial positions, and project records visible.'],
  ['Recovery operations', 'Use outstanding installment information to guide collection work.'],
  ['Legal notices', 'Maintain notices raised for customers with unresolved defaults.'],
  ['Project-aware security', 'Control which projects, contracts, and actions each authorized user can access.'],
];

const landBenefits = [
  ['Centralized landowner profiles', 'Maintain contact, identification, ownership, agreement, and financial information in a structured master record.'],
  ['Project-based relationships', 'Connect every landowner with the appropriate development project and acquisition arrangement.'],
  ['Agreement visibility', 'Keep commercial terms, agreed consideration, payment conditions, and allocation commitments in view.'],
  ['Land contribution records', 'Maintain the area, ownership share, location, and project connection for land associated with each owner.'],
  ['Allocation tracking', 'Follow the plots, units, or other benefits agreed with each landowner.'],
  ['Payment and ledger connection', 'Connect payments and obligations to receipts, vouchers, and the configured landowner ledger.'],
];

const landCapabilities = [
  ['Structured landowner profiles', 'Keep identity, contact, ownership, project, agreement, payment, allocation, and transaction history together.'],
  ['Acquisition agreements', 'Record agreement references, land details, parties, terms, consideration, payment conditions, and status.'],
  ['Land and property allocations', 'Connect plots, units, or benefits to the right landowner, project inventory, and acquisition agreement.'],
  ['Financial obligations', 'Organize agreed consideration, scheduled payments, completed payments, adjustments, vouchers, and outstanding balances.'],
  ['Ledger connection', 'Create accounts under the correct project ledger for consistent, traceable accounting treatment.'],
  ['Controlled adjustments', 'Record approved payment, allocation, ownership, agreement, and settlement changes without losing context.'],
];

const landWorkflow = [
  ['Create the landowner profile', 'Register identity, contact details, ownership information, and the relevant project association.'],
  ['Record the land details', 'Enter land contribution, area, ownership share, location, and other required information.'],
  ['Define the agreement', 'Record acquisition terms, agreed consideration, payment structure, and allocation commitments.'],
  ['Configure financial obligations', 'Set payable amounts, schedules, adjustments, and the accounting connection.'],
  ['Assign property allocations', 'Connect agreed plots, units, or benefits with the appropriate landowner record.'],
  ['Process payments', 'Record approved payments through the connected voucher and accounting workflow.'],
  ['Review the position', 'Monitor paid amounts, outstanding obligations, allocations, and ledger activity.'],
  ['Complete the arrangement', 'Confirm payments, allocations, documentation, and other agreed obligations are fulfilled.'],
];

const accountingBenefits = [
  ['Project-based accounting', 'Maintain financial activity in the correct project while keeping multiple developments clearly separated.'],
  ['Structured chart of accounts', 'Organize assets, liabilities, income, expenses, equity, and party accounts in a clear hierarchy.'],
  ['Complete voucher management', 'Record receipts, payments, journals, and adjustments through controlled voucher workflows.'],
  ['Connected party ledgers', 'Link financial accounts with customers, vendors, landowners, investors, employees, and commission agents.'],
  ['Traceable transactions', 'Preserve voucher references, dates, descriptions, amounts, related parties, and ledger entries for review.'],
  ['Real-time financial position', 'Access current balances and transaction histories based on recorded project activity.'],
];

const accountingCapabilities = [
  ['Chart of accounts', 'Create a project-aware account structure with classifications, account codes, controlled setup, and dedicated party accounts.'],
  ['Ledger configuration', 'Map vendors, investors, landowners, agents, and employee accounts to the appropriate ledger before records are created.'],
  ['Voucher management', 'Capture voucher type, project, references, debit and credit accounts, party, amount, method, narration, and status.'],
  ['Receipt vouchers', 'Record bookings, down payments, installments, charges, investor contributions, and other incoming project funds.'],
  ['Payment vouchers', 'Document landowner, vendor, expense, salary, commission, settlement, refund, and other outgoing payments.'],
  ['Journal vouchers', 'Manage non-cash adjustments, accruals, allocations, transfers, opening entries, and other authorized corrections.'],
  ['Expense management', 'Connect project spending with expense heads, vendors, payment references, and the purpose behind each transaction.'],
  ['Party ledgers', 'Review a connected history for customers, landowners, investors, vendors, employees, and commission agents.'],
];

const accountingWorkflow = [
  ['Configure the chart of accounts', 'Create the account groups and ledgers required across the organization and its projects.'],
  ['Map master types', 'Define where new vendor, investor, landowner, employee, and agent accounts are created.'],
  ['Record the operational activity', 'Create the relevant sale, obligation, expense, commission, or party transaction.'],
  ['Generate or enter the voucher', 'Record the appropriate receipt, payment, journal, or adjustment voucher.'],
  ['Post the ledger entry', 'Apply balanced debit and credit entries to the correct accounts.'],
  ['Review the transaction', 'Verify the project, party, operational reference, amount, and accounts involved.'],
  ['Monitor balances', 'Use ledgers and financial views to understand the latest account position.'],
  ['Reconcile and report', 'Compare financial activity with operational records and available reports.'],
];

const payrollBenefits = [
  ['Centralized employee records', 'Maintain employee profiles, employment details, salary structures, loans, advances, and payroll history.'],
  ['Attendance-based payroll', 'Use working days, present days, and absences to calculate applicable salary deductions.'],
  ['Flexible earnings', 'Manage basic salary, medical, rental, conveyance, bonuses, and other allowances.'],
  ['Controlled deductions', 'Record absence deductions, provident fund, loans, advances, taxes, and other employee-specific adjustments.'],
  ['Review before saving', 'Identify employee rows that require review before finalizing a payroll run.'],
  ['Connected accounting', 'Post approved payroll liabilities and payments to the appropriate employee and salary-payable accounts.'],
];

const payrollStages = [
  ['Draft', 'Prepare the run, load employees, review calculated totals, and make required adjustments.'],
  ['Approved', 'Confirm that earnings, deductions, statutory amounts, and net payments have been reviewed.'],
  ['Liability posted', 'Create or record accounting liabilities connected with the approved payroll.'],
  ['Paid', 'Complete salary payments and preserve the final payroll position for the selected period.'],
];

const payrollWorkflow = [
  ['Select the payroll month', 'Choose the month and processing date for the new payroll run.'], ['Load active employees', 'Bring the eligible employee roster into the selected period.'], ['Review attendance', 'Confirm working days, present days, absences, and applicable deductions.'], ['Verify earnings', 'Review salaries, allowances, bonuses, and other compensation components.'], ['Apply deductions', 'Confirm loans, advances, provident fund, taxes, and other deductions.'], ['Resolve exceptions', 'Filter employees needing attention and complete the necessary corrections.'], ['Approve payroll', 'Confirm gross earnings, deductions, statutory amounts, and net payable totals.'], ['Post liabilities', 'Create the relevant payroll and employee-accounting obligations.'], ['Process payments', 'Record salary payments and mark the run as paid.'],
];

const recoveryBenefits = [
  ['Due and overdue visibility', 'See which installments are approaching their due date, due today, or already overdue.'],
  ['Complete customer context', 'Review the customer, property, contract, schedule, payment history, and outstanding balance together.'],
  ['Prioritized recovery work', 'Organize cases by due date, overdue duration, balance, customer, project, or recovery status.'],
  ['Recorded follow-ups', 'Maintain call notes, commitments, next-action dates, outcomes, and recovery history.'],
  ['Connected collections', 'Apply recovered payments to the appropriate customer contract and installment.'],
  ['Escalation and legal notices', 'Move unresolved cases through defined recovery stages with associated notice records.'],
];
const recoveryWorkflow = [
  ['Identify the obligation', 'Detect an upcoming, due, or overdue installment from the customer payment schedule.'], ['Review the customer account', 'Review the property, contract, payment history, and outstanding amount.'], ['Assign the case', 'Give the account to the responsible recovery team member.'], ['Contact the customer', 'Record calls, messages, visits, and other approved follow-up activity.'], ['Capture the outcome', 'Record a commitment, dispute, request, no response, or other result.'], ['Schedule the next action', 'Set the next follow-up date and required action.'], ['Record the collection', 'Apply received funds to the correct contract and installment.'], ['Escalate when required', 'Move unresolved cases to management review or legal notice.'], ['Resolve the case', 'Close the item once paid, adjusted, or otherwise resolved through an authorized process.'],
];
const securityBenefits = [
  ['Project-level access', 'Control which developments each user can open and work within.'], ['Role-based permissions', 'Align sales, accounts, payroll, recovery, and administration access with responsibilities.'], ['Module-level control', 'Determine which Turner 10 modules are available to each authorized user.'], ['Action-level permissions', 'Restrict sensitive actions such as creating, editing, approving, posting, paying, cancelling, or configuring.'], ['Server-side authorization', 'Validate access when protected functionality is opened, not only when menu options are displayed.'], ['Simplified user workspace', 'Show each user the modules relevant to their work and reduce clutter or accidental access.'],
];
const securityWorkflow = [
  ['Create the user', 'Register the employee or authorized system user.'], ['Assign a role', 'Select the role that reflects operational responsibilities.'], ['Assign projects', 'Choose the developments the user is allowed to access.'], ['Enable modules', 'Define which modules are available in the authorized project context.'], ['Configure actions', 'Control what the user can view, create, update, approve, post, or process.'], ['Test access', 'Confirm the workspace and protected functions reflect assigned permissions.'], ['Monitor responsibilities', 'Review access when roles, departments, or assignments change.'], ['Update or revoke access', 'Modify or deactivate permissions when access is no longer required.'],
];

function PropertyManagementSections() {
  return <>
    <section className={sectionClass}>
      <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end">
        <div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">Complete project control</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Bring property operations together.</h2></div>
        <p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">Property development involves far more than a list of plots. Turner 10 brings project structures, availability, ownership, sales activity, payments, landowners, investors, documents, and reporting together so authorized teams work from dependable information instead of disconnected spreadsheets and manual registers.</p>
      </div>
      <div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{propertyBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div>
    </section>

    <section className={`${sectionClass} bg-[#151c30] text-white`}>
      <div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Property management features</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Build a reliable project record.</h2><p className="mt-4 text-[17px] leading-7 text-white/65">Create a structured foundation for your portfolio, from initial setup through sale, collection, and ongoing management.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2">{propertyCapabilities.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 2) * 70} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.04] p-5"><span className="text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-[17px] font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-white/65">{description}</p></div></article>)}</div></div>
    </section>

    <section className={sectionClass}>
      <div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">How the work moves</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">From project setup to ongoing management.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{propertyWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></div>
    </section>

    <section className={`${sectionClass} project-visibility-section`}>
      <div className="mx-auto max-w-[1220px]">
        <div className="grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-center">
          <div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#946520]">Project visibility</p><h2 className="mt-3 max-w-lg text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.08] tracking-[-.045em]">Know where every project stands.</h2><p className="project-visibility-copy mt-5 max-w-lg text-[17px] leading-8 text-[#425168]">See available inventory, customer commitments, payment progress, and project accounts in a shared view. Each answer stays close to its source record.</p><div className="mt-7 inline-flex items-center gap-3 rounded-full border border-[#e5d8b8] bg-white px-4 py-2 text-sm font-semibold text-[#29415b] shadow-sm"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#d3a845] text-xs font-bold text-[#17213a]">T10</span> One connected project record</div></div>
          <div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{[['Inventory', 'See which properties are available, booked, or sold.'], ['Ownership', 'Find the customer and agreement linked to a property.'], ['Payments', 'Review the schedule, receipts, and balance together.'], ['Changes', 'Follow cancellations, repurchases, and resale history.'], ['People', 'See the parties responsible for each transaction.'], ['Accounts', 'Trace project entries back to the activity behind them.']].map(([title, detail], index) => <article key={title} className="group flex min-h-[116px] gap-3 rounded-xl border border-[#e4e9ed] bg-white p-4 shadow-[0_8px_22px_rgba(25,42,65,.045)] transition duration-300 hover:-translate-y-1 hover:border-[#d3a845] hover:shadow-[0_14px_30px_rgba(25,42,65,.1)] motion-reduce:transform-none"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#f8f1dc] text-xs font-bold text-[#91651e]">{String(index + 1).padStart(2, '0')}</span><span><strong className="block text-base font-semibold text-[#17213a]">{title}</strong><span className="mt-1 block text-[15px] leading-6 text-[#526277]">{detail}</span></span></article>)}</div>
        </div>
      </div>
    </section>

    <section className={`${sectionClass} bg-[#151c30] text-white`}>
      <div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-2"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Controlled by design</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Give every user the access they need.</h2><p className="mt-5 text-[17px] leading-7 text-white/65">Project-aware, role-based access helps protect business information. Users see the projects, modules, and actions permitted for their role, with access checked as records are opened.</p><div className="mt-6 space-y-3">{['Separate access across different projects', 'Limit sensitive financial and administrative functions', 'Assign responsibilities around operational roles', 'Protect project and customer information'].map(item => <div key={item} className="flex gap-3 text-base text-white/80"><Check className="mt-1 h-4 w-4 shrink-0 text-[#d3a845]" />{item}</div>)}</div></div><div data-aos="fade-left" className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Designed for growing operations</p><h3 className="mt-4 text-2xl font-semibold">Built for growing property teams.</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Real-estate developers', 'Housing societies', 'Property development companies', 'Residential and commercial projects', 'Plot and land-sale businesses', 'Multi-project real-estate groups', 'Property sales and recovery teams', 'Businesses managing landowners and investors'].map(item => <div key={item} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75">{item}</div>)}</div></div></div>
    </section>

  </>;
}

function SalesContractSections() {
  return <>
    <section className={sectionClass}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">Complete sales lifecycle</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Follow each sale from agreement to final payment.</h2></div><p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">From reservation and booking through collection, recovery, cancellation, resale, and settlement, Turner 10 keeps the sales lifecycle in one controlled workflow. Every contract remains connected to its customer, property, schedule, receipts, ledger entries, and recovery activity.</p></div><div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{salesBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Contract management</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Build structured contracts with complete sales information.</h2><p className="mt-4 text-[17px] leading-7 text-white/65">Give sales, accounts, and recovery teams one dependable record from the first customer conversation through the final balance.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2">{salesCapabilities.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 2) * 70} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.04] p-5"><span className="text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-[17px] font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-white/65">{description}</p></div></article>)}</div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">The sales process</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">From property selection to contract completion.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{salesWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 4) * 60} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#10172a] text-white`}><div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(211,168,69,.18),transparent_31%),linear-gradient(135deg,#172b46_0%,#10172a_62%)] px-6 py-9 shadow-[0_24px_60px_rgba(16,23,42,.28)] sm:px-8 lg:px-10 lg:py-11"><div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Complete customer position</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Understand each customer account.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/70">Authorized teams can review the full sales position from one record without switching between separate registers.</p></div><div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{['Purchased or booked property', 'Total contract value and payment plan', 'Payments received and outstanding balance', 'Upcoming dues and overdue installments', 'Charges, discounts, receipts, and vouchers', 'Recovery, notice, cancellation, resale, or repurchase history'].map((item, index) => <div key={item} className="flex min-h-[82px] gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 text-[15px] font-medium leading-5 text-white/85"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div></div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">One ERP, complete visibility</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Sales data connected across the business.</h2></div><div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">{salesModules.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 4) * 55} className="rounded-xl border border-[#e2dfd8] bg-white p-5"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-[17px] font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-2"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Controlled sales operations</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Protect sensitive contract and customer information.</h2><p className="mt-5 text-[17px] leading-7 text-white/65">Role-based, project-aware access helps organizations control how contract, payment, recovery, and customer information is used.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Contract creation and approval', 'Pricing and discount changes', 'Installment-plan adjustments', 'Receipt and payment entry', 'Cancellation, resale, and repurchase', 'Customer financial and recovery records'].map(item => <div key={item} className="flex gap-3 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d3a845]" />{item}</div>)}</div></div><div data-aos="fade-left" className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Built for installment-based sales</p><h3 className="mt-4 text-2xl font-semibold">Designed for property businesses with growing sales operations.</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Real-estate developers', 'Housing societies', 'Residential plot projects', 'Commercial developments', 'Installment-based property businesses', 'Multi-project companies', 'Property sales offices', 'Accounts and recovery teams'].map(item => <div key={item} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75">{item}</div>)}</div></div></div></section>
  </>;
}

function LandownerSections() {
  return <>
    <section className={sectionClass}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">Landowner operations</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Keep each land agreement and obligation in view.</h2></div><p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">Land acquisition can involve multiple owners, land portions, cash payments, property allocations, shared terms, and long-term obligations. Turner 10 connects the relevant project, agreement, allocation, payment, and accounting information so authorized teams can work from one dependable view.</p></div><div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{landBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Structured master records</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Keep complete information for every landowner.</h2><p className="mt-4 text-[17px] leading-7 text-white/65">Build a reliable digital record of the people and organizations behind acquired project land, from identity and ownership through agreements, allocations, payments, and current account position.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2">{landCapabilities.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 2) * 70} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.04] p-5"><span className="text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-[17px] font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-white/65">{description}</p></div></article>)}</div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">One controlled process</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">From landowner registration to agreement completion.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{landWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 4) * 60} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#10172a] text-white`}><div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(211,168,69,.18),transparent_31%),linear-gradient(135deg,#172b46_0%,#10172a_62%)] px-6 py-9 shadow-[0_24px_60px_rgba(16,23,42,.28)] sm:px-8 lg:px-10 lg:py-11"><div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Complete relationship visibility</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">See the full position without checking multiple registers.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/70">From one connected landowner record, authorized users can review the relationship, commitments, financial position, and supporting history in context.</p></div><div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{['Associated projects, land details, and ownership share', 'Acquisition agreements and agreed consideration', 'Property or plot allocations', 'Payment schedule, completed payments, and outstanding obligations', 'Accounting entries and current ledger balance', 'Amendments, documents, references, and agreement status'].map((item, index) => <div key={item} className="flex min-h-[82px] gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 text-[15px] font-medium leading-5 text-white/85"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div></div></div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-2"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Controlled information</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Protect sensitive land and financial records.</h2><p className="mt-5 text-[17px] leading-7 text-white/65">Project-aware, role-based controls help protect confidential agreements, ownership details, payment obligations, and property allocations.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Landowner profile creation', 'Agreement and land-record updates', 'Payment processing and allocations', 'Financial adjustments and ledger information', 'Agreement amendments', 'Project-specific administration'].map(item => <div key={item} className="flex gap-3 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d3a845]" />{item}</div>)}</div></div><div data-aos="fade-left" className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Designed for acquired land</p><h3 className="mt-4 text-2xl font-semibold">Built for developers managing complex landowner relationships.</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Real-estate development companies', 'Housing societies', 'Land development projects', 'Residential and commercial schemes', 'Joint development arrangements', 'Multi-landowner projects', 'Plot-based property businesses', 'Finance and land-acquisition teams'].map(item => <div key={item} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75">{item}</div>)}</div></div></div></section>
  </>;
}

function AccountingSections() {
  return <>
    <section className={sectionClass}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">Connected financial control</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Move beyond disconnected vouchers and manual ledgers.</h2></div><p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">A customer payment belongs to a contract, a commission belongs to a sale, and a landowner payment belongs to an acquisition agreement. Turner 10 brings operational and financial information together, so authorized teams can manage vouchers, ledgers, balances, and transaction history within the relevant project.</p></div><div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{accountingBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Accounting foundation</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Structure accounts around the way your business operates.</h2><p className="mt-4 text-[17px] leading-7 text-white/65">From account mapping to party-ledger history, Turner 10 gives finance teams one consistent foundation for project-focused accounting.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2">{accountingCapabilities.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 2) * 70} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.04] p-5"><span className="text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-[17px] font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-white/65">{description}</p></div></article>)}</div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">From activity to accounting</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Keep operational and financial records connected.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{accountingWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 4) * 60} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index +1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#10172a] text-white`}><div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(211,168,69,.18),transparent_31%),linear-gradient(135deg,#172b46_0%,#10172a_62%)] px-6 py-9 shadow-[0_24px_60px_rgba(16,23,42,.28)] sm:px-8 lg:px-10 lg:py-11"><div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">One financial view</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Understand the financial activity behind every project.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/70">Give management and accounts teams a clearer view of where funds come from, where they are used, and which obligations remain outstanding.</p></div><div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{['Customer collections and outstanding receivables', 'Landowner and vendor payables', 'Project expenses and employee liabilities', 'Commission payables and investor transactions', 'Cash, bank, and account balances', 'Voucher history, adjustments, and journal entries'].map((item, index) => <div key={item} className="flex min-h-[82px] gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 text-[15px] font-medium leading-5 text-white/85"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div></div></div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-2"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Financial access control</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Protect sensitive accounting information.</h2><p className="mt-5 text-[17px] leading-7 text-white/65">Project-aware, role-based access gives financial teams the controls they need while keeping transaction history and sensitive settings accountable.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Chart-of-accounts management', 'Ledger configuration', 'Voucher creation and review', 'Receipt and payment entry', 'Journal adjustments and expenses', 'Party ledgers and project finances'].map(item => <div key={item} className="flex gap-3 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d3a845]" />{item}</div>)}</div></div><div data-aos="fade-left" className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Property-focused accounting</p><h3 className="mt-4 text-2xl font-semibold">Built for organizations that need financial clarity across projects.</h3><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Real-estate development companies', 'Housing societies', 'Property sales businesses', 'Residential and commercial projects', 'Multi-project development groups', 'Accounts and finance teams', 'Land-acquisition departments', 'Installment and recovery operations'].map(item => <div key={item} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75">{item}</div>)}</div></div></div></section>
  </>;
}

function PayrollSections() {
  return <>
    <section className={sectionClass}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">People and payments</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Payroll that connects attendance, earnings, deductions, and accounting.</h2></div><p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">Turner 10 brings attendance, salary components, loans, advances, statutory amounts, and employee-specific adjustments into a structured monthly payroll run. Teams can review exceptions, verify totals, approve liabilities, and complete payments with stronger control.</p></div><div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{payrollBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Structured payroll processing</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Generate, review, approve, and pay every payroll run.</h2><p className="mt-4 text-[17px] leading-7 text-white/65">A staged payroll lifecycle prevents incomplete or unverified data from moving directly into payment.</p></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{payrollStages.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={index * 70} className="rounded-xl border border-white/10 bg-white/[.04] p-5"><span className="text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-xl font-semibold">{title}</h3><p className="mt-3 text-base leading-6 text-white/65">{description}</p></article>)}</div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">From roster to payment</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">A controlled monthly payroll process.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{payrollWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 60} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#10172a] text-white`}><div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(211,168,69,.18),transparent_31%),linear-gradient(135deg,#172b46_0%,#10172a_62%)] px-6 py-9 shadow-[0_24px_60px_rgba(16,23,42,.28)] sm:px-8 lg:px-10 lg:py-11"><div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Instant run visibility</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Understand the entire payroll position at a glance.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/70">Review the overall position before looking into individual employee calculations and exceptions.</p></div><div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{['Total employees included and payroll month', 'Gross earnings and total deductions', 'Statutory obligations and net payroll payable', 'Rows requiring review and current run status', 'Attendance, earnings, deductions, statutory, and pay views', 'Period-by-period payroll, liability, and payment history'].map((item, index) => <div key={item} className="flex min-h-[82px] gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 text-[15px] font-medium leading-5 text-white/85"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div></div></div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-2"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Protect sensitive payroll data</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Give payroll access only to authorized users.</h2><p className="mt-5 text-[17px] leading-7 text-white/65">Role-based, project-aware controls help safeguard employee compensation and partner financial records.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Employee records and salary structures', 'Payroll generation and attendance adjustments', 'Earnings, deductions, loans, and advances', 'Approval and liability posting', 'Payment processing', 'Payroll history and reports'].map(item => <div key={item} className="flex gap-3 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d3a845]" />{item}</div>)}</div></div><div data-aos="fade-left" className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">People and partner obligations</p><h3 className="mt-4 text-2xl font-semibold">Keep workforce obligations visible in the financial picture.</h3><p className="mt-4 text-base leading-7 text-white/65">Employee loans, advances, provident-fund amounts, partner obligations, and payroll liabilities stay connected to the appropriate ledgers and transaction history.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Real-estate developers', 'Housing societies', 'Multi-project property companies', 'HR and payroll teams', 'Accounts and finance departments', 'Businesses managing operational partners'].map(item => <div key={item} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75">{item}</div>)}</div></div></div></section>
  </>;
}

function RecoverySections() {
  return <>
    <section className={sectionClass}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">Proactive collection management</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Replace reactive follow-ups with a structured recovery process.</h2></div><p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">Turner 10 connects recovery operations directly with the customer contract and installment schedule. Teams can identify outstanding amounts, review payment history, prioritize cases, record each interaction, and monitor progress toward resolution from one consistent view.</p></div><div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{recoveryBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></section>
    <section className={`${sectionClass} bg-[#10172a] text-white`}><div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(211,168,69,.18),transparent_31%),linear-gradient(135deg,#172b46_0%,#10172a_62%)] px-6 py-9 shadow-[0_24px_60px_rgba(16,23,42,.28)] sm:px-8 lg:px-10 lg:py-11"><div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Collections at a glance</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Understand the current recovery position.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/70">Give managers a focused view of workload and collection priorities without reviewing contracts one by one.</p></div><div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{['Installments due today and upcoming obligations', 'Overdue accounts and total outstanding amount', 'Customers requiring follow-up', 'Promised payments and missed commitments', 'Completed follow-ups and escalated accounts', 'Legal-notice cases, amount recovered, and remaining balance'].map((item, index) => <div key={item} className="flex min-h-[82px] gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 text-[15px] font-medium leading-5 text-white/85"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div></div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">From due date to resolution</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">A clear process for every outstanding installment.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{recoveryWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 60} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-2"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Controlled recovery access</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Protect customer and financial information.</h2><p className="mt-5 text-[17px] leading-7 text-white/65">Project-aware, role-based access helps protect sensitive recovery information while keeping each action accountable.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Recovery-case and customer access', 'Contract and installment details', 'Follow-ups and case assignment', 'Payment commitments and collections', 'Escalation and legal notices', 'Account adjustments and reporting'].map(item => <div key={item} className="flex gap-3 text-sm text-white/80"><Check className="mt-0.5 h-4 w-4 shrink-0 text-[#d3a845]" />{item}</div>)}</div></div><div data-aos="fade-left" className="rounded-2xl border border-white/10 bg-white/[.04] p-7"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Built for installment recovery</p><h3 className="mt-4 text-2xl font-semibold">Make recovery more consistent, visible, and measurable.</h3><p className="mt-4 text-base leading-7 text-white/65">Give officers accurate customer context, keep follow-ups moving, support timely escalation, and ensure recovered payments update the connected contract, receipt, and account records.</p><div className="mt-6 grid gap-3 sm:grid-cols-2">{['Real-estate developers', 'Housing societies', 'Installment-based projects', 'Customer collection teams', 'Accounts-receivable teams', 'Recovery officers and supervisors'].map(item => <div key={item} className="rounded-lg border border-white/10 px-4 py-3 text-sm text-white/75">{item}</div>)}</div></div></div></section>
  </>;
}

function SecuritySections() {
  return <>
    <section className={sectionClass}><div className="mx-auto grid max-w-[1220px] gap-8 lg:grid-cols-[.82fr_1.18fr] lg:items-end"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">Security with business context</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Access control that understands projects and responsibilities.</h2></div><p data-aos="fade-left" className="text-[17px] leading-7 text-slate-600">A user may need sales access in one project, recovery access in another, and no financial access anywhere else. Turner 10 combines user roles with project-level access so everyday navigation stays simple while sensitive operations remain controlled.</p></div><div className="mx-auto mt-8 grid max-w-[1220px] gap-4 md:grid-cols-2 lg:grid-cols-3">{securityBenefits.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 3) * 75} className="rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_10px_26px_rgba(16,23,42,.05)]"><span className="text-sm font-bold text-[#b9812c]">0{index + 1}</span><h3 className="mt-4 text-lg font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></article>)}</div></section>
    <section className={`${sectionClass} bg-[#151c30] text-white`}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Access by responsibility</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Build roles around real operational work.</h2><p className="mt-4 text-[17px] leading-7 text-white/65">Permission sets can reflect the work different teams actually perform, without giving every user broad system access.</p></div><div className="mt-8 grid gap-3 md:grid-cols-2">{[['Sales team','Customers, inventory, bookings, contracts, and relevant sales activity.'],['Accounts team','Receipts, payments, vouchers, ledgers, expenses, and authorized financial records.'],['Recovery team','Overdue installments, follow-ups, commitments, and unresolved-case escalation.'],['HR and payroll team','Employee files, attendance, payroll calculations, deductions, and salary processing.'],['Land acquisition team','Landowner profiles, agreements, allocations, and related records.'],['Management and administrators','Permitted project views, users, roles, master data, and platform configuration.']].map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 2) * 70} className="flex gap-4 rounded-xl border border-white/10 bg-white/[.04] p-5"><span className="text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><div><h3 className="text-[17px] font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-white/65">{description}</p></div></article>)}</div></div></section>
    <section className={sectionClass}><div className="mx-auto max-w-[1220px]"><div data-aos="fade-up" className="mx-auto max-w-2xl text-center"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#b9812c]">From user setup to controlled access</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">A clear process for managing permissions.</h2></div><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{securityWorkflow.map(([title, description], index) => <article key={title} data-aos="fade-up" data-aos-delay={(index % 4) * 60} className="rounded-xl border border-[#e2dfd8] p-5"><span className="grid h-9 w-9 place-items-center rounded-full bg-[#17213a] text-sm font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span><h3 className="mt-5 text-lg font-semibold">{title}</h3><p className="mt-2 text-sm leading-6 text-slate-600">{description}</p></article>)}</div></div></section>
    <section className={`${sectionClass} bg-[#10172a] text-white`}><div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_8%_0%,rgba(211,168,69,.18),transparent_31%),linear-gradient(135deg,#172b46_0%,#10172a_62%)] px-6 py-9 shadow-[0_24px_60px_rgba(16,23,42,.28)] sm:px-8 lg:px-10 lg:py-11"><div className="grid gap-9 lg:grid-cols-[.78fr_1.22fr] lg:items-center"><div data-aos="fade-right"><p className="text-xs font-bold uppercase tracking-[.19em] text-[#d3a845]">Security beyond the interface</p><h2 className="mt-3 text-[clamp(2rem,3.2vw,3.2rem)] font-semibold leading-[1.05] tracking-[-.045em]">Only permitted modules are shown. Access is checked again when they open.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/70">Hiding a menu item is not sufficient protection on its own. Turner 10 verifies authorization as users enter protected modules or perform controlled actions.</p></div><div data-aos="fade-left" className="grid gap-3 sm:grid-cols-2">{['Project assignments and operational roles', 'Allowed modules and permitted actions', 'Approval responsibilities and financial authority', 'Secure project switching without mixing data', 'Separation of duties for sensitive transactions', 'Central user, role, and access administration'].map((item, index) => <div key={item} className="flex min-h-[82px] gap-3 rounded-xl border border-white/10 bg-white/[.055] p-4 text-[15px] font-medium leading-5 text-white/85"><span className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">{String(index + 1).padStart(2, '0')}</span>{item}</div>)}</div></div></div></section>
  </>;
}

export default function FeaturePage({ feature }: { feature: Feature }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [featuresOpen, setFeaturesOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const index = features.findIndex((item) => item.slug === feature.slug);
  const next = features[(index + 1) % features.length];
  const isPropertyManagement = feature.slug === 'property-project-management';
  const isSalesContracts = feature.slug === 'sales-contracts-installments';
  const isLandownerManagement = feature.slug === 'landowner-management';
  const isAccountingVouchers = feature.slug === 'accounting-vouchers';
  const isPayrollPartners = feature.slug === 'payroll-partners';
  const isRecoveryOperations = feature.slug === 'recovery-operations';
  const isProjectSecurity = feature.slug === 'project-aware-security';

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    AOS.init({ disable: reducedMotion, duration: 650, once: true, offset: 60, easing: 'ease-out-cubic' });
    AOS.refreshHard();
  }, []);
  useEffect(() => {
    if ((featuresOpen || solutionsOpen || menuOpen) && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) window.setTimeout(() => AOS.refreshHard(), 0);
  }, [featuresOpen, solutionsOpen, menuOpen]);

  return (
    <main className="content-page feature-page bg-white font-sans text-[#17213a] selection:bg-[#d3a845] selection:text-[#10172a]">
      <header className="fixed inset-x-0 top-0 z-50 mx-auto flex max-w-[1440px] items-center justify-between border-b border-white/10 bg-[#10172a]/90 px-5 py-4 shadow-[0_8px_28px_rgba(8,12,24,.18)] backdrop-blur-xl lg:px-10">
        <a href="/" className="flex items-center gap-3 text-white">
          <img src="/turner10-logo.webp" alt="Turner 10" className="h-11 w-11 rounded-xl object-contain" />
          <span className="text-sm font-bold uppercase tracking-[.24em]">Turner 10</span>
        </a>
        <nav className="hidden items-center rounded-full bg-black/25 px-7 py-3.5 text-[13px] font-medium text-white/90 backdrop-blur lg:flex lg:gap-8" aria-label="Main navigation">
          <div className="relative">
            <button aria-expanded={featuresOpen} onClick={() => { setFeaturesOpen(!featuresOpen); setSolutionsOpen(false); }} className="flex items-center gap-1.5 transition hover:text-[#d3a845]">
              Features <ChevronDown className={`h-3.5 w-3.5 transition ${featuresOpen ? 'rotate-180' : ''}`} />
            </button>
            {featuresOpen && <div className="absolute left-1/2 top-9 grid w-[min(680px,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#10172a]/95 p-3 shadow-2xl backdrop-blur-xl">
              {features.map((item) => <a onClick={() => setFeaturesOpen(false)} key={item.slug} href={featurePath(item.slug)} className="flex min-h-[72px] items-center gap-3 rounded-xl border border-white/[.06] p-3 text-white/85 transition hover:border-[#d3a845]/40 hover:bg-[#d3a845]/10">
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">T10</span>
                <span className="min-w-0"><b className="block text-sm">{item.name}</b><small className="mt-1 block truncate text-xs text-white/50">{item.eyebrow}</small></span>
              </a>)}
            </div>}
          </div>
          <div className="relative">
            <button aria-expanded={solutionsOpen} onClick={() => { setSolutionsOpen(!solutionsOpen); setFeaturesOpen(false); }} className="flex items-center gap-1.5 transition hover:text-[#d3a845]">
              Solutions <ChevronDown className={`h-3.5 w-3.5 transition ${solutionsOpen ? 'rotate-180' : ''}`} />
            </button>
            {solutionsOpen && <div className="absolute left-1/2 top-9 grid w-[min(680px,90vw)] -translate-x-1/2 grid-cols-2 gap-1 rounded-2xl border border-white/10 bg-[#10172a]/95 p-3 shadow-2xl backdrop-blur-xl">
              {solutions.map((item) => <a onClick={() => setSolutionsOpen(false)} key={item.slug} href={`/solutions/${item.slug}`} className="flex min-h-[72px] min-w-0 items-center gap-3 rounded-xl border border-white/[.06] p-3 text-white/85 transition hover:border-[#d3a845]/40 hover:bg-[#d3a845]/10"><span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-[#d3a845]/15 text-xs font-bold text-[#d3a845]">T10</span><span className="min-w-0"><b className="block text-sm">{item.title}</b><small className="mt-1 block truncate text-xs text-white/50">{item.focus}</small></span></a>)}
            </div>}
          </div>
          <a href="/about" className="hover:text-[#d3a845]">About</a>
          <a href="/contact" className="hover:text-[#d3a845]">Contact</a>
        </nav>
        <div className="hidden items-center gap-4 lg:flex"><span className="text-xs text-white/80">Real estate ERP</span><a href="/#platform" className="rounded-full bg-[#d3a845] px-5 py-3.5 text-xs font-bold uppercase text-[#151c30]">Explore platform <ArrowRight className="ml-1 inline h-3 w-3" /></a></div>
        <ThemeToggle />
        <button aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)} className="text-white lg:hidden">{menuOpen ? <X /> : <Menu />}</button>
        {menuOpen && <nav className="absolute right-5 top-20 max-h-[calc(100svh-6rem)] w-[min(16rem,calc(100vw-2.5rem))] overflow-y-auto rounded-xl bg-[#151c30] p-5 text-base text-white shadow-2xl lg:hidden" aria-label="Mobile navigation">
          <a href="/about" className="mb-4 block">About</a><a href="/contact" className="mb-4 block">Contact</a>
          <p className="mb-2 border-t border-white/10 pt-4 text-sm font-bold uppercase tracking-wider text-[#d3a845]">Solutions</p>
          {solutions.map((item) => <a key={item.slug} href={`/solutions/${item.slug}`} className="block py-2 text-white/75">{item.title}</a>)}
          <p className="mb-2 mt-3 border-t border-white/10 pt-4 text-sm font-bold uppercase tracking-wider text-[#d3a845]">Features</p>
          {features.map((item) => <a key={item.slug} href={featurePath(item.slug)} className="block py-2 text-white/75">{item.name}</a>)}
          <a href="/#platform" className="mt-3 block rounded-full bg-[#d3a845] px-4 py-3 text-center text-sm font-bold text-[#151c30]">Explore platform</a>
        </nav>}
      </header>

      <section id="top" className={`${sectionClass} feature-hero flex items-center bg-[#151c30] text-white`}>
        <img src={feature.heroImage} alt="" aria-hidden="true" className="feature-hero-image" />
        <div className="feature-hero-overlay" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1220px]" data-aos="fade-up">
          <div className="max-w-[690px]">
            <h1 className="text-[clamp(2.35rem,3.8vw,4.2rem)] font-semibold leading-[1.06] tracking-[-.05em]">{feature.headline}</h1>
            <p className="mt-5 max-w-[610px] text-[17px] leading-7 text-white/80">{feature.intro}</p>
            <div className="mt-7 flex flex-wrap gap-3"><a href={(isPropertyManagement || isSalesContracts || isLandownerManagement || isAccountingVouchers || isPayrollPartners || isRecoveryOperations || isProjectSecurity) ? '/contact' : '#workflow'} className="inline-flex items-center gap-2 rounded-full bg-[#d3a845] px-5 py-3 text-sm font-bold text-[#151c30] transition hover:-translate-y-0.5 hover:bg-[#e4bd65] hover:shadow-lg motion-reduce:transform-none">{(isPropertyManagement || isSalesContracts || isLandownerManagement || isAccountingVouchers || isPayrollPartners || isRecoveryOperations || isProjectSecurity) ? 'Request a demo' : 'See how it works'} <ArrowDown className="h-4 w-4" /></a><a href="/#platform" className="rounded-full border border-white/40 bg-white/5 px-5 py-3 text-sm font-semibold text-white transition hover:border-[#d3a845]">{(isPropertyManagement || isLandownerManagement || isAccountingVouchers || isPayrollPartners || isRecoveryOperations || isProjectSecurity) ? 'Explore Turner 10' : isSalesContracts ? 'Explore features' : 'Explore platform'}</a></div>
            <div className="feature-hero-proof mt-9 flex flex-wrap gap-2">{feature.proof.map(point => <span key={point}>{point}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="workflow" className={sectionClass}>
        <div className="mx-auto w-full max-w-[1220px]">
          <div data-aos="fade-up" className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><h2 className="text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.045em]">From record to action.</h2><p className="max-w-sm text-base leading-6 text-slate-600">A clear path through the work, with project and financial context kept in view.</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">{feature.steps.map(([title, description], stepIndex) => <article key={title} data-aos="fade-up" data-aos-delay={stepIndex * 100} className="min-w-0 rounded-xl border border-[#e2dfd8] bg-white p-5 shadow-[0_12px_30px_rgba(16,23,42,.05)] transition duration-300 hover:-translate-y-1 hover:border-[#d3a845] hover:shadow-lg motion-reduce:transform-none sm:p-6"><div className="flex items-center justify-between gap-4"><h3 className="text-lg font-semibold">{title}</h3><ArrowRight className="h-4 w-4 shrink-0 text-[#b9812c]" /></div><p className="mt-3 text-base leading-6 text-slate-600">{description}</p><p className="mt-4 border-t border-[#e2dfd8] pt-3 text-sm leading-5 text-slate-500">{feature.stepDetails[stepIndex]}</p></article>)}</div>
          <div data-aos="fade-up" className="mt-5 flex flex-wrap items-center gap-3 rounded-xl border border-[#e2dfd8] bg-white px-5 py-4 text-sm text-slate-600"><Workflow className="h-5 w-5 text-[#b9812c]" /><span>Each step stays connected to its project and source record.</span><span className="ml-auto font-semibold text-[#b9812c]">TURNER 10</span></div>
        </div>
      </section>

      {isPropertyManagement && <PropertyManagementSections />}
      {isSalesContracts && <SalesContractSections />}
      {isLandownerManagement && <LandownerSections />}
      {isAccountingVouchers && <AccountingSections />}
      {isPayrollPartners && <PayrollSections />}
      {isRecoveryOperations && <RecoverySections />}
      {isProjectSecurity && <SecuritySections />}

      <ConnectedEcosystem feature={feature} />

      <section id="connections" className={sectionClass}>
        <div className="mx-auto grid w-full max-w-[1220px] items-center gap-8 lg:grid-cols-[.78fr_1.22fr]">
          <div data-aos="fade-right">
            <h2 className="text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.045em]">The records stay connected.</h2>
            <p className="mt-5 max-w-md text-[17px] leading-7 text-slate-600">{feature.answer}</p>
          </div>
          <div className="grid gap-3">{feature.connections.map(([title, description], connectionIndex) => <article key={title} data-aos="fade-left" data-aos-delay={connectionIndex * 90} className="flex items-start gap-5 rounded-xl border border-[#e2dfd8] bg-white p-5 transition hover:border-[#d3a845] hover:shadow-md"><span className="text-base font-bold text-[#b9812c]">0{connectionIndex + 1}</span><div><h3 className="text-[17px] font-semibold">{title}</h3><p className="mt-2 text-base leading-6 text-slate-600">{description}</p></div></article>)}</div>
        </div>
      </section>

      <section id="case-study" className={sectionClass}>
        <div className="mx-auto grid w-full max-w-[1220px] items-center gap-8 lg:grid-cols-[.85fr_1.15fr]">
          <div data-aos="fade-right"><h2 className="text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.045em]">Built for real workflows.</h2><p className="mt-5 max-w-lg text-[17px] leading-7 text-slate-600">{feature.caseStudy}</p><p className="mt-3 max-w-lg text-base leading-6 text-slate-600">{feature.caseDetail}</p><a href="#product-view" className="mt-6 inline-flex items-center gap-2 text-base font-bold text-[#9d7027]">See the connected view <ArrowRight className="h-4 w-4" /></a></div>
          <div data-aos="fade-left" className="rounded-2xl border border-[#dedbd4] bg-white p-5 shadow-[0_20px_50px_rgba(16,23,42,.08)] sm:p-7">
            <div className="flex items-center justify-between border-b border-[#dedbd4] pb-4"><div className="flex items-center gap-3"><span className="grid h-9 w-9 place-items-center rounded-lg bg-[#17213a] text-sm font-bold text-[#d3a845]">T10</span><div><p className="text-sm font-bold text-[#17213a]">{feature.name}</p><p className="text-xs text-slate-500">Connected workspace</p></div></div><span className="rounded-full bg-[#e8efe9] px-3 py-1 text-xs font-bold text-[#3f7758]">PROJECT CONTEXT</span></div>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">{feature.proof.map((point, pointIndex) => <div key={point} className="min-w-0 rounded-xl border border-[#e1ded6] bg-white p-4 sm:min-h-[126px]"><p className="text-xs font-bold tracking-widest text-[#b9812c]">0{pointIndex + 1}</p><p className="mt-4 break-words text-base font-semibold leading-5">{point}</p><div className="mt-4 h-1 w-12 rounded-full bg-[#d3a845]" /></div>)}</div>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-[#17213a] p-4 text-sm text-white/80"><Check className="h-4 w-4 text-[#d3a845]" />{feature.visual}</div>
          </div>
        </div>
      </section>

      <section id="product-view" className={`${sectionClass} bg-[#151c30] text-white`}>
        <div className="mx-auto grid w-full max-w-[1220px] items-center gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div data-aos="fade-right"><h2 className="text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.045em]">One connected view.</h2><p className="mt-5 max-w-md text-[17px] leading-7 text-white/75">Explore the actual Turner 10 workspace for {feature.name.toLowerCase()}. The demo screen shows where the related work begins.</p><div className="mt-6 flex flex-wrap gap-2">{feature.proof.map(point => <span key={point} className="rounded-full border border-white/15 px-3 py-2 text-sm text-white/75">{point}</span>)}</div></div>
          <div data-aos="zoom-in" className="min-w-0"><ProductScreenshot src={feature.detailImage} title={feature.name} caption={feature.visual} darkFrame /></div>
        </div>
      </section>

      <section id="control" className={sectionClass}>
        <div className="mx-auto w-full max-w-[1220px]">
          <div data-aos="fade-up" className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end"><h2 className="max-w-lg text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.045em]">Clarity built into every step.</h2><p className="max-w-md text-[17px] leading-7 text-slate-600">{feature.challenge}</p></div>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            <article data-aos="fade-right" className="rounded-xl border border-[#e2dfd8] bg-white p-7 shadow-[0_12px_30px_rgba(16,23,42,.05)]"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#d3a845]/15 text-[#b9812c]"><Check className="h-5 w-5" /></span><h3 className="mt-7 text-xl font-semibold">Controlled by context</h3><p className="mt-4 text-[17px] leading-7 text-slate-600">{feature.control}</p></article>
            <article data-aos="fade-left" className="rounded-xl border border-[#e2dfd8] bg-white p-7 shadow-[0_12px_30px_rgba(16,23,42,.05)]"><span className="grid h-10 w-10 place-items-center rounded-lg bg-[#d3a845]/15 text-[#b9812c]"><Workflow className="h-5 w-5" /></span><h3 className="mt-7 text-xl font-semibold">A clearer position</h3><p className="mt-4 text-[17px] leading-7 text-slate-600">{feature.outcome}</p></article>
          </div>
          <a href="#connected" data-aos="fade-up" className="mt-7 inline-flex items-center gap-2 text-base font-semibold text-[#9d7027]">See the connected workspace <ArrowRight className="h-4 w-4" /></a>
        </div>
      </section>

      <section id="connected" className={sectionClass}>
        <div className="mx-auto grid w-full max-w-[1220px] items-center gap-10 lg:grid-cols-[1.08fr_.92fr]">
          <div data-aos="fade-right" className="min-w-0"><ProductScreenshot src={feature.secondaryImage} title={`${feature.name} in context`} caption={feature.outcome} /></div>
          <div data-aos="fade-left">
            <h2 className="text-[clamp(2rem,3vw,3.1rem)] font-semibold leading-[1.05] tracking-[-.045em]">One project. Every team connected.</h2>
            <p className="mt-5 max-w-lg text-[17px] leading-7 text-slate-600">{feature.connectedDetail}</p>
            <div className="mt-6 space-y-3">{feature.proof.map(point => <div key={point} className="flex items-center gap-3 border-b border-[#dedbd4] pb-3 text-base font-medium transition-transform hover:translate-x-1 motion-reduce:transform-none"><Check className="h-4 w-4 shrink-0 text-[#b9812c]" />{point}</div>)}</div>
            <a href={featurePath(next.slug)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#17213a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#26375a]">Explore {next.name} <ArrowRight className="h-4 w-4" /></a>
          </div>
        </div>
      </section>

      <footer className="border-t border-[#d3a845]/20 bg-[#10172a] px-5 py-10 text-white lg:px-10">
        <div className="mx-auto grid max-w-[1220px] gap-8 md:grid-cols-[1.25fr_1fr_1fr]">
          <div>
            <a href="/" className="inline-flex items-center gap-3"><img src="/turner10-logo.webp" alt="" className="h-10 w-10 object-contain" /><span className="text-sm font-bold uppercase tracking-[.24em]">Turner 10</span></a>
            <p className="mt-4 max-w-xs text-base leading-6 text-white/55">One connected workspace for real estate operations, sales, and finance.</p>
          </div>
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#d3a845]">This feature</p><a href="#top" className="mt-4 block text-base text-white/70 transition hover:text-white">{feature.name}</a><a href="#case-study" className="mt-2 block text-base text-white/70 transition hover:text-white">Case study</a><a href={featurePath(next.slug)} className="mt-2 inline-flex items-center gap-2 text-base text-white/70 transition hover:text-[#d3a845]">Next: {next.name} <ArrowRight className="h-3.5 w-3.5" /></a></div>
          <div><p className="text-sm font-bold uppercase tracking-[.18em] text-[#d3a845]">Explore</p><a href="/" className="mt-4 block text-base text-white/70 transition hover:text-white">Home</a><a href="/#platform" className="mt-2 block text-base text-white/70 transition hover:text-white">Platform</a><a href="/#faq" className="mt-2 block text-base text-white/70 transition hover:text-white">FAQ</a></div>
        </div>
        <div className="mx-auto mt-8 flex max-w-[1220px] flex-wrap justify-between gap-3 border-t border-white/10 pt-5 text-sm text-white/40"><span>© 2026 Turner 10. All rights reserved.</span><a href="#top" className="transition hover:text-[#d3a845]">Back to top ↑</a></div>
      </footer>
    </main>
  );
}
