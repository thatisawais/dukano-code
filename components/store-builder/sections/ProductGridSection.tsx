'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface ProductGridSectionProps {
  variant: string;
  content: Record<string, any>;
}

export function ProductGridSection({ variant, content }: ProductGridSectionProps) {
  switch (variant) {
    case '3-column':
      return <ProductGrid3Col content={content} />;
    case 'masonry':
      return <ProductGridMasonry content={content} />;
    case 'list':
      return <ProductGridList content={content} />;
    default:
      return <ProductGrid3Col content={content} />;
  }
}

function ProductGrid3Col({ content }: { content: Record<string, any> }) {
  const products = content.products || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {content.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product: any, index: number) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-72">
                <Image
                  src={product.image || 'https://placehold.co/400x400/png?text=Product'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-2xl font-bold text-primary mb-4">{product.price}</p>
                <Button className="w-full">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductGridMasonry({ content }: { content: Record<string, any> }) {
  const products = content.products || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {content.sectionTitle}
        </h2>
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {products.map((product: any, index: number) => (
            <div
              key={index}
              className="break-inside-avoid relative group overflow-hidden rounded-lg shadow-lg hover:shadow-2xl transition-shadow"
            >
              <div className="relative">
                <Image
                  src={product.image || 'https://placehold.co/400x400/png?text=Product'}
                  alt={product.name}
                  width={400}
                  height={400}
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                  <div className="text-white">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="text-2xl font-bold">{product.price}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductGridList({ content }: { content: Record<string, any> }) {
  const products = content.products || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-12">
          {content.sectionTitle}
        </h2>
        <div className="space-y-8">
          {products.map((product: any, index: number) => (
            <div
              key={index}
              className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="relative w-full md:w-64 h-64 flex-shrink-0 rounded-lg overflow-hidden">
                <Image
                  src={product.image || 'https://placehold.co/400x400/png?text=Product'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-3">{product.name}</h3>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-3xl font-bold text-primary">{product.price}</p>
                  <Button size="lg">Learn More</Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
