import { StoreBuilderUI } from '@/components/store-builder/StoreBuilderUI';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Store Builder | Create Your Perfect Online Store',
  description: 'Use AI to generate a complete, customized online store in minutes. Just describe your business and let our AI do the rest.',
};

export default function StoreBuilderPage() {
  // In a real app, you would get the userId from authentication
  // For demo purposes, we'll use a placeholder
  const userId = 'demo-user-123';

  return <StoreBuilderUI userId={userId} />;
}
