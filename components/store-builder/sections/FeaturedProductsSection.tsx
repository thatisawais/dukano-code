'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface FeaturedProductsSectionProps {
  variant: string;
  content: Record<string, any>;
}

export function FeaturedProductsSection({ variant, content }: FeaturedProductsSectionProps) {
  switch (variant) {
    case 'carousel':
      return <FeaturedCarousel content={content} />;
    case 'split':
      return <FeaturedSplit content={content} />;
    default:
      return <FeaturedCarousel content={content} />;
  }
}

function FeaturedCarousel({ content }: { content: Record<string, any> }) {
  const products = content.products || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {content.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-80">
                <Image
                  src={product.image || 'https://placehold.co/600x600/png?text=Featured'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
                {product.badge && (
                  <Badge className="absolute top-4 right-4 text-sm px-3 py-1">
                    {product.badge}
                  </Badge>
                )}
              </div>
              <CardContent className="p-6 space-y-4">
                <h3 className="text-2xl font-bold">{product.name}</h3>
                <p className="text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{product.price}</p>
                  <Button size="lg">{product.cta || 'Shop Now'}</Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeaturedSplit({ content }: { content: Record<string, any> }) {
  const products = (content.products || []).slice(0, 2); // Only show 2 products

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8">
          {products.map((product: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:shadow-2xl transition-all">
              <div className="relative h-96">
                <Image
                  src={product.image || 'https://placehold.co/800x800/png?text=Featured'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-8 space-y-4">
                <h3 className="text-3xl font-bold">{product.name}</h3>
                <p className="text-lg text-gray-600">{product.description}</p>
                <div className="flex items-center justify-between pt-4">
                  <p className="text-4xl font-bold text-primary">{product.price}</p>
                  <Button size="lg" className="text-lg px-8">
                    {product.cta || 'Buy Now'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
