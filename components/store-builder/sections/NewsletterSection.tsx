'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface NewsletterSectionProps {
  variant: string;
  content: Record<string, any>;
}

export function NewsletterSection({ variant, content }: NewsletterSectionProps) {
  const [email, setEmail] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  switch (variant) {
    case 'centered':
      return <NewsletterCentered content={content} email={email} setEmail={setEmail} onSubmit={handleSubmit} />;
    case 'split':
      return <NewsletterSplit content={content} email={email} setEmail={setEmail} onSubmit={handleSubmit} />;
    default:
      return <NewsletterCentered content={content} email={email} setEmail={setEmail} onSubmit={handleSubmit} />;
  }
}

interface NewsletterVariantProps {
  content: Record<string, any>;
  email: string;
  setEmail: (email: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

function NewsletterCentered({ content, email, setEmail, onSubmit }: NewsletterVariantProps) {
  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {content.headline}
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          {content.description}
        </p>
        <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
          <Input
            type="email"
            placeholder={content.placeholder || 'Enter your email'}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1 bg-white text-gray-900"
          />
          <Button type="submit" size="lg" variant="secondary">
            {content.cta}
          </Button>
        </form>
      </div>
    </section>
  );
}

function NewsletterSplit({ content, email, setEmail, onSubmit }: NewsletterVariantProps) {
  const benefits = content.benefits || [];

  return (
    <section className="py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
          <div>
            <h3 className="text-2xl font-bold mb-6">
              {content.benefitsHeadline}
            </h3>
            <ul className="space-y-3">
              {benefits.map((benefit: string, index: number) => (
                <li key={index} className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0 mt-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {content.headline}
            </h2>
            <p className="text-lg mb-6 opacity-90">
              {content.description}
            </p>
            <form onSubmit={onSubmit} className="space-y-4">
              <Input
                type="email"
                placeholder={content.placeholder || 'Enter your email'}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white text-gray-900"
                size={40}
              />
              <Button type="submit" size="lg" variant="secondary" className="w-full">
                {content.cta}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
