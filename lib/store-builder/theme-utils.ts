import { ColorTheme } from './store';

/**
 * Convert color theme to CSS variables
 */
export function themeToCSSVariables(theme: ColorTheme): Record<string, string> {
  return {
    '--color-primary': theme.primary,
    '--color-secondary': theme.secondary,
    '--color-accent': theme.accent,
    '--color-background': theme.background,
    '--color-text': theme.text,
    '--color-error': theme.error,
    '--color-success': theme.success,
    '--color-primary-light': lightenColor(theme.primary, 20),
    '--color-primary-dark': darkenColor(theme.primary, 20),
    '--color-secondary-light': lightenColor(theme.secondary, 20),
    '--color-secondary-dark': darkenColor(theme.secondary, 20)
  };
}

/**
 * Generate complete CSS style string from theme
 */
export function generateThemeStyles(theme: ColorTheme): string {
  const cssVars = themeToCSSVariables(theme);
  const varString = Object.entries(cssVars)
    .map(([key, value]) => `  ${key}: ${value};`)
    .join('\n');

  return `:root {\n${varString}\n}`;
}

/**
 * Apply theme to DOM element
 */
export function applyThemeToElement(element: HTMLElement, theme: ColorTheme): void {
  const cssVars = themeToCSSVariables(theme);
  Object.entries(cssVars).forEach(([key, value]) => {
    element.style.setProperty(key, value);
  });
}

/**
 * Lighten a hex color by a percentage
 */
export function lightenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) + amt;
  const G = ((num >> 8) & 0x00ff) + amt;
  const B = (num & 0x0000ff) + amt;
  return (
    '#' +
    (
      0x1000000 +
      (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
      (G < 255 ? (G < 1 ? 0 : G) : 255) * 0x100 +
      (B < 255 ? (B < 1 ? 0 : B) : 255)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Darken a hex color by a percentage
 */
export function darkenColor(color: string, percent: number): string {
  const num = parseInt(color.replace('#', ''), 16);
  const amt = Math.round(2.55 * percent);
  const R = (num >> 16) - amt;
  const G = ((num >> 8) & 0x00ff) - amt;
  const B = (num & 0x0000ff) - amt;
  return (
    '#' +
    (
      0x1000000 +
      (R > 0 ? R : 0) * 0x10000 +
      (G > 0 ? G : 0) * 0x100 +
      (B > 0 ? B : 0)
    )
      .toString(16)
      .slice(1)
  );
}

/**
 * Check if a color is light or dark
 */
export function isLightColor(color: string): boolean {
  const hex = color.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}

/**
 * Get contrasting text color (black or white) for a background color
 */
export function getContrastTextColor(backgroundColor: string): string {
  return isLightColor(backgroundColor) ? '#000000' : '#FFFFFF';
}

/**
 * Validate hex color format
 */
export function isValidHexColor(color: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(color);
}

/**
 * Generate CSS for template sections with theme
 */
export function generateSectionCSS(theme: ColorTheme): string {
  return `
    /* Base Section Styles */
    .container {
      max-width: 1280px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .container-narrow {
      max-width: 800px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .grid-2col {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 2rem;
    }

    .grid-3col {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
    }

    @media (max-width: 768px) {
      .grid-2col,
      .grid-3col {
        grid-template-columns: 1fr;
      }
    }

    /* Button Styles */
    .btn-primary {
      background-color: var(--color-primary);
      color: white;
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      border: none;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      background-color: var(--color-primary-dark);
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    .btn-secondary {
      background-color: transparent;
      color: var(--color-primary);
      padding: 0.75rem 2rem;
      border-radius: 0.5rem;
      border: 2px solid var(--color-primary);
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background-color: var(--color-primary);
      color: white;
    }

    .btn-large {
      padding: 1rem 2.5rem;
      font-size: 1.125rem;
    }

    /* Hero Sections */
    .hero-minimal,
    .hero-image-right,
    .hero-bold,
    .hero-video {
      padding: 4rem 0;
      min-height: 500px;
      display: flex;
      align-items: center;
    }

    .hero-minimal {
      text-align: center;
      background-color: var(--color-background);
    }

    .hero-bold {
      background-size: cover;
      background-position: center;
      position: relative;
      color: white;
    }

    .hero-bold::before {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.4);
    }

    .hero-video {
      position: relative;
      overflow: hidden;
    }

    .bg-video {
      position: absolute;
      inset: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      z-index: -1;
    }

    .overlay {
      position: relative;
      z-index: 1;
    }

    .headline,
    .headline-large {
      font-size: 3rem;
      font-weight: 800;
      margin-bottom: 1rem;
      color: var(--color-text);
      line-height: 1.2;
    }

    .headline-large {
      font-size: 4rem;
    }

    .subheadline,
    .subheadline-large {
      font-size: 1.25rem;
      color: var(--color-text);
      opacity: 0.8;
      margin-bottom: 2rem;
    }

    .subheadline-large {
      font-size: 1.5rem;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2rem;
    }

    /* Product Grid Sections */
    .product-grid-3col,
    .product-grid-masonry,
    .product-grid-list {
      padding: 4rem 0;
      background-color: var(--color-background);
    }

    .section-title {
      font-size: 2.5rem;
      font-weight: 700;
      text-align: center;
      margin-bottom: 3rem;
      color: var(--color-text);
    }

    .product-card {
      background: white;
      border-radius: 0.75rem;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    }

    .product-card img {
      width: 100%;
      height: 300px;
      object-fit: cover;
    }

    .product-card h3 {
      font-size: 1.25rem;
      font-weight: 600;
      padding: 1rem;
      color: var(--color-text);
    }

    .product-card .price {
      font-size: 1.5rem;
      font-weight: 700;
      color: var(--color-primary);
      padding: 0 1rem;
    }

    .btn-add-cart {
      width: 100%;
      padding: 0.75rem;
      background-color: var(--color-primary);
      color: white;
      border: none;
      cursor: pointer;
      font-weight: 600;
      transition: background-color 0.3s ease;
    }

    .btn-add-cart:hover {
      background-color: var(--color-primary-dark);
    }

    /* Testimonials */
    .testimonials-grid,
    .testimonials-slider {
      padding: 4rem 0;
      background-color: var(--color-background);
    }

    .testimonial-card {
      background: white;
      padding: 2rem;
      border-radius: 0.75rem;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .quote,
    .quote-large {
      font-size: 1.125rem;
      font-style: italic;
      margin-bottom: 1.5rem;
      color: var(--color-text);
    }

    .quote-large {
      font-size: 1.5rem;
      text-align: center;
    }

    .author {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .author img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }

    .author .name {
      font-weight: 600;
      color: var(--color-text);
    }

    .author .title {
      font-size: 0.875rem;
      color: var(--color-secondary);
    }

    /* Newsletter */
    .newsletter-centered,
    .newsletter-split {
      padding: 4rem 0;
      background-color: var(--color-primary);
      color: white;
    }

    .newsletter-form {
      display: flex;
      gap: 1rem;
      max-width: 500px;
      margin: 2rem auto 0;
    }

    .newsletter-form input {
      flex: 1;
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      border: none;
      font-size: 1rem;
    }

    /* Footer */
    .footer-minimal,
    .footer-comprehensive {
      padding: 3rem 0;
      background-color: var(--color-text);
      color: white;
    }

    .footer-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .footer-links {
      display: flex;
      gap: 2rem;
    }

    .footer-links a {
      color: white;
      text-decoration: none;
      transition: opacity 0.3s ease;
    }

    .footer-links a:hover {
      opacity: 0.7;
    }

    .footer-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 2rem;
      margin-bottom: 2rem;
    }

    .footer-column h4 {
      margin-bottom: 1rem;
      font-weight: 600;
    }

    .footer-column ul {
      list-style: none;
      padding: 0;
    }

    .footer-column li {
      margin-bottom: 0.5rem;
    }

    .footer-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 2rem;
      border-top: 1px solid rgba(255, 255, 255, 0.2);
    }
  `;
}
