import { notFound } from 'next/navigation';
import SolutionPage from '../SolutionPage';
import { solutionBySlug, solutions } from '../data';

export function generateStaticParams() {
  return solutions.map(({ slug }) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const solution = solutionBySlug(params.slug);
  if (solution?.slug === 'projects-property') return { title: 'Projects & Property Management Solution | Turner 10 ERP', description: 'Manage real-estate projects, property inventory, availability, ownership, sales activity, project parties, and financial operations with Turner 10 ERP.' };
  if (solution?.slug === 'sales-lifecycle') return { title: 'Property Sales Lifecycle Management Solution | Turner 10', description: 'Manage property availability, bookings, contracts, installment schedules, receipts, commissions, recovery, cancellations, repurchases, and resale with Turner 10 ERP.' };
  if (solution?.slug === 'land-acquisition') return { title: 'Land Acquisition Management Solution | Turner 10 ERP', description: 'Manage landowners, ownership shares, acquisition agreements, cash consideration, property allocations, payments, and settlement records with Turner 10 ERP.' };
  if (solution?.slug === 'accounting-finance') return { title: 'Property Accounting & Finance Solution | Turner 10 ERP', description: 'Connect project accounting, customer receivables, collections, expenses, landowner and vendor payables, payroll, commissions, vouchers, and ledgers with Turner 10 ERP.' };
  if (solution?.slug === 'payroll-people') return { title: 'Payroll & People Management Solution | Turner 10 ERP', description: 'Manage employee files, attendance-based payroll, earnings, deductions, statutory amounts, loans, advances, liabilities, and staff payments with Turner 10.' };
  if (solution?.slug === 'recovery-administration') return { title: 'Recovery & Administration Solution | Turner 10 ERP', description: 'Manage installment recovery, customer follow-up, legal notices, project access, master data, security, and platform settings with Turner 10 ERP.' };
  return { title: solution ? `${solution.title} | Turner 10` : 'Solution | Turner 10', description: solution?.summary };
}

export default function Page({ params }: { params: { slug: string } }) {
  const solution = solutionBySlug(params.slug);
  if (!solution) notFound();
  return <SolutionPage solution={solution} />;
}
