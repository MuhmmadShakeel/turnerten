import { notFound } from 'next/navigation';
import FeaturePage from '../FeaturePage';
import { featureBySlug, features } from '../data';

export function generateStaticParams() { return features.map(({ slug }) => ({ slug })); }
export function generateMetadata({ params }: { params: { slug: string } }) {
  const feature = featureBySlug(params.slug);
  if (feature?.slug === 'sales-contracts-installments') return { title: 'Property Sales Contracts & Installment Management | Turner 10', description: 'Create property sales contracts, configure installment plans, track customer payments, monitor balances, and manage overdue recovery with Turner 10 ERP.' };
  if (feature?.slug === 'landowner-management') return { title: 'Landowner & Land Acquisition Management ERP | Turner 10', description: 'Manage landowners, acquisition agreements, land contributions, property allocations, payments, outstanding obligations, and ledger records with Turner 10 ERP.' };
  if (feature?.slug === 'accounting-vouchers') return { title: 'Property Accounting & Voucher Management ERP | Turner 10', description: 'Manage project accounts, receipt and payment vouchers, expenses, party ledgers, account mapping, and financial transactions with Turner 10 ERP.' };
  if (feature?.slug === 'payroll-partners') return { title: 'Payroll & Employee Management ERP | Turner 10', description: 'Manage employee payroll, attendance, earnings, allowances, deductions, loans, advances, statutory amounts, liabilities, and partner obligations with Turner 10 ERP.' };
  if (feature?.slug === 'recovery-operations') return { title: 'Installment Recovery & Collections Management | Turner 10', description: 'Track overdue property installments, organize customer follow-ups, record payment promises, manage collections, and issue legal notices with Turner 10 ERP.' };
  if (feature?.slug === 'project-aware-security') return { title: 'Project-Aware ERP Security & Access Control | Turner 10', description: 'Protect property, customer, accounting, payroll, and recovery data with project-level access, role-based permissions, and server-side authorization in Turner 10 ERP.' };
  return { title: feature ? `${feature.name} | Turner 10` : 'Turner 10', description: feature?.intro };
}
export default function Page({ params }: { params: { slug: string } }) {
  const feature = featureBySlug(params.slug);
  if (!feature) notFound();
  return <FeaturePage feature={feature} />;
}
