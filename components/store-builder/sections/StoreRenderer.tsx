'use client';

import React from 'react';
import { HeroSection } from './HeroSection';
import { ProductGridSection } from './ProductGridSection';
import { FeaturedProductsSection } from './FeaturedProductsSection';
import { TestimonialsSection } from './TestimonialsSection';
import { NewsletterSection } from './NewsletterSection';
import { FooterSection } from './FooterSection';
import { GeneratedSectionContent } from '@/lib/store-builder/content-generator';
import { ColorTheme } from '@/lib/store-builder/store';
import { themeToCSSVariables } from '@/lib/store-builder/theme-utils';

interface StoreRendererProps {
  sections: GeneratedSectionContent[];
  colorTheme: ColorTheme;
  className?: string;
}

export function StoreRenderer({ sections, colorTheme, className = '' }: StoreRendererProps) {
  const sortedSections = [...sections].sort((a, b) => a.order - b.order);

  // Apply theme via CSS variables
  const themeVars = themeToCSSVariables(colorTheme);

  return (
    <div
      className={`store-renderer ${className}`}
      style={themeVars as React.CSSProperties}
    >
      {sortedSections.map((section, index) => (
        <div key={`${section.sectionType}-${index}`} data-section-type={section.sectionType}>
          {renderSection(section)}
        </div>
      ))}
    </div>
  );
}

function renderSection(section: GeneratedSectionContent) {
  switch (section.sectionType) {
    case 'hero':
      return <HeroSection variant={section.layoutVariant} content={section.content} />;

    case 'product_grid':
      return <ProductGridSection variant={section.layoutVariant} content={section.content} />;

    case 'featured_products':
      return <FeaturedProductsSection variant={section.layoutVariant} content={section.content} />;

    case 'testimonials':
      return <TestimonialsSection variant={section.layoutVariant} content={section.content} />;

    case 'newsletter':
      return <NewsletterSection variant={section.layoutVariant} content={section.content} />;

    case 'footer':
      return <FooterSection variant={section.layoutVariant} content={section.content} />;

    default:
      return (
        <div className="p-8 bg-gray-100 text-center">
          <p className="text-gray-600">Unknown section type: {section.sectionType}</p>
        </div>
      );
  }
}
