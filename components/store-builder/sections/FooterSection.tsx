'use client';

import React from 'react';
import Link from 'next/link';

interface FooterSectionProps {
  variant: string;
  content: Record<string, any>;
}

export function FooterSection({ variant, content }: FooterSectionProps) {
  switch (variant) {
    case 'minimal':
      return <FooterMinimal content={content} />;
    case 'comprehensive':
      return <FooterComprehensive content={content} />;
    default:
      return <FooterMinimal content={content} />;
  }
}

function FooterMinimal({ content }: { content: Record<string, any> }) {
  const links = content.links || [];

  return (
    <footer className="py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">{content.copyright}</p>
          <nav className="flex gap-6">
            {links.map((link: any, index: number) => (
              <Link
                key={index}
                href={link.url || '#'}
                className="text-sm hover:text-gray-300 transition-colors"
              >
                {link.text}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}

function FooterComprehensive({ content }: { content: Record<string, any> }) {
  const columns = content.columns || [];
  const socialLinks = content.socialLinks || [];

  return (
    <footer className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h4 className="text-lg font-semibold mb-4">{content.aboutHeadline}</h4>
            <p className="text-sm text-gray-400">{content.aboutText}</p>
          </div>
          {columns.map((column: any, index: number) => (
            <div key={index}>
              <h4 className="text-lg font-semibold mb-4">{column.title}</h4>
              <ul className="space-y-2">
                {column.links?.map((link: any, linkIndex: number) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.url || '#'}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">{content.copyright}</p>
          <div className="flex gap-4">
            {socialLinks.map((social: any, index: number) => (
              <Link
                key={index}
                href={social.url || '#'}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.platform}
              >
                {social.icon || social.platform}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
