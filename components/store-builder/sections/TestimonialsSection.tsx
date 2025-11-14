'use client';

import React from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';

interface TestimonialsSectionProps {
  variant: string;
  content: Record<string, any>;
}

export function TestimonialsSection({ variant, content }: TestimonialsSectionProps) {
  switch (variant) {
    case 'grid':
      return <TestimonialsGrid content={content} />;
    case 'slider':
      return <TestimonialsSlider content={content} />;
    default:
      return <TestimonialsGrid content={content} />;
  }
}

function TestimonialsGrid({ content }: { content: Record<string, any> }) {
  const testimonials = content.testimonials || [];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">
          {content.sectionTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial: any, index: number) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6 space-y-4">
                <div className="flex gap-1">
                  {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-lg italic text-gray-700">"{testimonial.quote}"</p>
                <div className="flex items-center gap-3 pt-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.authorImage || 'https://placehold.co/100x100/png?text=Avatar'}
                      alt={testimonial.authorName}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-semibold">{testimonial.authorName}</p>
                    <p className="text-sm text-gray-600">{testimonial.authorTitle}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSlider({ content }: { content: Record<string, any> }) {
  const testimonials = content.testimonials || [];
  const [currentIndex, setCurrentIndex] = React.useState(0);

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <h2 className="text-4xl font-bold text-center mb-16">
          {content.sectionTitle}
        </h2>
        {testimonials.length > 0 && (
          <div className="text-center space-y-8">
            <p className="text-2xl md:text-3xl italic text-gray-700 leading-relaxed">
              "{testimonials[currentIndex].quote}"
            </p>
            <div className="flex flex-col items-center gap-4">
              <div className="relative w-20 h-20 rounded-full overflow-hidden">
                <Image
                  src={testimonials[currentIndex].authorImage || 'https://placehold.co/100x100/png?text=Avatar'}
                  alt={testimonials[currentIndex].authorName}
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-bold text-xl">{testimonials[currentIndex].authorName}</p>
                <p className="text-gray-600">{testimonials[currentIndex].authorTitle}</p>
              </div>
            </div>
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 pt-6">
                {testimonials.map((_: any, index: number) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentIndex ? 'bg-primary w-8' : 'bg-gray-300'
                    }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
