'use client';

import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  variant: string;
  content: Record<string, any>;
}

export function HeroSection({ variant, content }: HeroSectionProps) {
  switch (variant) {
    case 'minimal':
      return <HeroMinimal content={content} />;
    case 'image-right':
      return <HeroImageRight content={content} />;
    case 'bold':
      return <HeroBold content={content} />;
    case 'video-background':
      return <HeroVideo content={content} />;
    default:
      return <HeroMinimal content={content} />;
  }
}

function HeroMinimal({ content }: { content: Record<string, any> }) {
  return (
    <section className="hero-minimal py-16 md:py-24 flex items-center min-h-[500px] text-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
          {content.headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 opacity-80">
          {content.subheadline}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="text-lg px-8 py-6">
            {content.ctaPrimary}
          </Button>
          <Button size="lg" variant="outline" className="text-lg px-8 py-6">
            {content.ctaSecondary}
          </Button>
        </div>
      </div>
    </section>
  );
}

function HeroImageRight({ content }: { content: Record<string, any> }) {
  return (
    <section className="hero-image-right py-16 md:py-24 min-h-[500px] flex items-center">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              {content.headline}
            </h1>
            <p className="text-xl opacity-80">
              {content.subheadline}
            </p>
            <Button size="lg" className="text-lg px-8 py-6">
              {content.ctaPrimary}
            </Button>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl">
            <Image
              src={content.imageUrl || 'https://placehold.co/800x600/png?text=Hero+Image'}
              alt={content.imageAlt || 'Hero Image'}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function HeroBold({ content }: { content: Record<string, any> }) {
  return (
    <section
      className="hero-bold py-24 md:py-32 min-h-[600px] flex items-center relative text-white"
      style={{
        backgroundImage: `url(${content.backgroundImage || 'https://placehold.co/1920x1080/png?text=Background'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          {content.headline}
        </h1>
        <p className="text-xl md:text-3xl mb-10 max-w-3xl mx-auto">
          {content.subheadline}
        </p>
        <Button size="lg" className="text-xl px-12 py-7">
          {content.ctaPrimary}
        </Button>
      </div>
    </section>
  );
}

function HeroVideo({ content }: { content: Record<string, any> }) {
  return (
    <section className="hero-video py-24 min-h-[600px] flex items-center relative overflow-hidden">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src={content.videoUrl || ''} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/30" />
      <div className="container mx-auto px-4 relative z-10 text-center text-white">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
          {content.headline}
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
          {content.subheadline}
        </p>
        <Button size="lg" className="text-lg px-8 py-6">
          {content.ctaPrimary}
        </Button>
      </div>
    </section>
  );
}
