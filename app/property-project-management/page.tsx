import FeaturePage from '../features/FeaturePage';
import { featureBySlug } from '../features/data';

export const metadata = {
  title: 'Property & Project Management ERP | Turner 10',
  description: 'Manage real-estate projects, plots, property inventory, ownership records, availability, sales, payments, and connected operations with Turner 10 ERP.',
};

export default function Page() { return <FeaturePage feature={featureBySlug('property-project-management')!} />; }
