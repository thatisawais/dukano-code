/**
 * Predefined layouts for the AI Store Builder
 * Each layout has keywords that help rank its relevance to user prompts
 */

export interface LayoutDefinition {
  id: string;
  sectionType: 'hero' | 'product_grid' | 'featured_products' | 'testimonials' | 'newsletter' | 'footer';
  variant: string;
  name: string;
  description: string;
  keywords: string[];
  template: string; // HTML template with placeholders
  requiredFields: string[]; // Fields that AI needs to generate
}

export const LAYOUTS: LayoutDefinition[] = [
  // ============= HERO LAYOUTS =============
  {
    id: 'hero-minimal',
    sectionType: 'hero',
    variant: 'minimal',
    name: 'Minimal Hero',
    description: 'Clean, minimalist hero section with centered text',
    keywords: [
      'minimal', 'clean', 'simple', 'modern', 'elegant', 'professional',
      'corporate', 'tech', 'saas', 'startup', 'software'
    ],
    template: `
      <section class="hero-minimal">
        <div class="container">
          <h1 class="headline">{{headline}}</h1>
          <p class="subheadline">{{subheadline}}</p>
          <div class="cta-group">
            <button class="btn-primary">{{ctaPrimary}}</button>
            <button class="btn-secondary">{{ctaSecondary}}</button>
          </div>
        </div>
      </section>
    `,
    requiredFields: ['headline', 'subheadline', 'ctaPrimary', 'ctaSecondary']
  },
  {
    id: 'hero-image-right',
    sectionType: 'hero',
    variant: 'image-right',
    name: 'Hero with Image Right',
    description: 'Hero section with text on left and image on right',
    keywords: [
      'visual', 'product', 'showcase', 'app', 'service', 'platform',
      'ecommerce', 'marketplace', 'photography', 'creative', 'portfolio'
    ],
    template: `
      <section class="hero-image-right">
        <div class="container grid-2col">
          <div class="content">
            <h1 class="headline">{{headline}}</h1>
            <p class="subheadline">{{subheadline}}</p>
            <button class="btn-primary">{{ctaPrimary}}</button>
          </div>
          <div class="image">
            <img src="{{imageUrl}}" alt="{{imageAlt}}" />
          </div>
        </div>
      </section>
    `,
    requiredFields: ['headline', 'subheadline', 'ctaPrimary', 'imageAlt']
  },
  {
    id: 'hero-bold',
    sectionType: 'hero',
    variant: 'bold',
    name: 'Bold Hero',
    description: 'Large, bold hero section with background image',
    keywords: [
      'bold', 'impact', 'dramatic', 'fashion', 'lifestyle', 'luxury',
      'retail', 'brand', 'marketing', 'agency', 'creative'
    ],
    template: `
      <section class="hero-bold" style="background-image: url({{backgroundImage}})">
        <div class="container">
          <h1 class="headline-large">{{headline}}</h1>
          <p class="subheadline-large">{{subheadline}}</p>
          <button class="btn-large">{{ctaPrimary}}</button>
        </div>
      </section>
    `,
    requiredFields: ['headline', 'subheadline', 'ctaPrimary']
  },
  {
    id: 'hero-video-background',
    sectionType: 'hero',
    variant: 'video-background',
    name: 'Video Background Hero',
    description: 'Dynamic hero with video background',
    keywords: [
      'video', 'dynamic', 'modern', 'engaging', 'media', 'entertainment',
      'fitness', 'gym', 'sports', 'active', 'lifestyle', 'adventure'
    ],
    template: `
      <section class="hero-video">
        <video autoplay muted loop class="bg-video">
          <source src="{{videoUrl}}" type="video/mp4" />
        </video>
        <div class="container overlay">
          <h1 class="headline">{{headline}}</h1>
          <p class="subheadline">{{subheadline}}</p>
          <button class="btn-primary">{{ctaPrimary}}</button>
        </div>
      </section>
    `,
    requiredFields: ['headline', 'subheadline', 'ctaPrimary']
  },

  // ============= PRODUCT GRID LAYOUTS =============
  {
    id: 'product-grid-3col',
    sectionType: 'product_grid',
    variant: '3-column',
    name: '3-Column Product Grid',
    description: 'Classic 3-column product grid layout',
    keywords: [
      'products', 'catalog', 'shop', 'store', 'ecommerce', 'retail',
      'fashion', 'clothing', 'accessories', 'merchandise', 'standard'
    ],
    template: `
      <section class="product-grid-3col">
        <div class="container">
          <h2 class="section-title">{{sectionTitle}}</h2>
          <div class="grid-3col">
            {{#products}}
            <div class="product-card">
              <img src="{{image}}" alt="{{name}}" />
              <h3>{{name}}</h3>
              <p class="price">{{price}}</p>
              <button class="btn-add-cart">Add to Cart</button>
            </div>
            {{/products}}
          </div>
        </div>
      </section>
    `,
    requiredFields: ['sectionTitle', 'products']
  },
  {
    id: 'product-grid-masonry',
    sectionType: 'product_grid',
    variant: 'masonry',
    name: 'Masonry Product Grid',
    description: 'Pinterest-style masonry grid layout',
    keywords: [
      'creative', 'artistic', 'gallery', 'portfolio', 'photography',
      'art', 'design', 'handmade', 'crafts', 'unique', 'boutique'
    ],
    template: `
      <section class="product-grid-masonry">
        <div class="container">
          <h2 class="section-title">{{sectionTitle}}</h2>
          <div class="masonry-grid">
            {{#products}}
            <div class="product-card masonry-item">
              <img src="{{image}}" alt="{{name}}" />
              <div class="overlay">
                <h3>{{name}}</h3>
                <p class="price">{{price}}</p>
              </div>
            </div>
            {{/products}}
          </div>
        </div>
      </section>
    `,
    requiredFields: ['sectionTitle', 'products']
  },
  {
    id: 'product-grid-list',
    sectionType: 'product_grid',
    variant: 'list',
    name: 'List View Product Grid',
    description: 'Horizontal list-style product display',
    keywords: [
      'detailed', 'information', 'specifications', 'tech', 'electronics',
      'software', 'services', 'professional', 'business', 'b2b'
    ],
    template: `
      <section class="product-grid-list">
        <div class="container">
          <h2 class="section-title">{{sectionTitle}}</h2>
          {{#products}}
          <div class="product-list-item">
            <img src="{{image}}" alt="{{name}}" />
            <div class="product-info">
              <h3>{{name}}</h3>
              <p class="description">{{description}}</p>
              <p class="price">{{price}}</p>
              <button class="btn-primary">Learn More</button>
            </div>
          </div>
          {{/products}}
        </div>
      </section>
    `,
    requiredFields: ['sectionTitle', 'products']
  },

  // ============= FEATURED PRODUCTS LAYOUTS =============
  {
    id: 'featured-carousel',
    sectionType: 'featured_products',
    variant: 'carousel',
    name: 'Featured Products Carousel',
    description: 'Sliding carousel of featured products',
    keywords: [
      'featured', 'highlight', 'bestseller', 'new', 'trending', 'popular',
      'recommendations', 'curated', 'selected', 'special'
    ],
    template: `
      <section class="featured-carousel">
        <div class="container">
          <h2 class="section-title">{{sectionTitle}}</h2>
          <div class="carousel">
            {{#products}}
            <div class="featured-card">
              <img src="{{image}}" alt="{{name}}" />
              <div class="badge">{{badge}}</div>
              <h3>{{name}}</h3>
              <p class="description">{{description}}</p>
              <p class="price">{{price}}</p>
              <button class="btn-primary">{{cta}}</button>
            </div>
            {{/products}}
          </div>
        </div>
      </section>
    `,
    requiredFields: ['sectionTitle', 'products']
  },
  {
    id: 'featured-split',
    sectionType: 'featured_products',
    variant: 'split',
    name: 'Split Featured Products',
    description: 'Two large featured products side by side',
    keywords: [
      'comparison', 'options', 'choice', 'dual', 'packages', 'plans',
      'premium', 'exclusive', 'limited', 'special offer'
    ],
    template: `
      <section class="featured-split">
        <div class="container grid-2col">
          {{#products}}
          <div class="featured-large">
            <img src="{{image}}" alt="{{name}}" />
            <h3>{{name}}</h3>
            <p class="description">{{description}}</p>
            <p class="price">{{price}}</p>
            <button class="btn-primary">{{cta}}</button>
          </div>
          {{/products}}
        </div>
      </section>
    `,
    requiredFields: ['products']
  },

  // ============= TESTIMONIALS LAYOUTS =============
  {
    id: 'testimonials-grid',
    sectionType: 'testimonials',
    variant: 'grid',
    name: 'Testimonials Grid',
    description: 'Grid layout for customer testimonials',
    keywords: [
      'reviews', 'testimonials', 'feedback', 'customers', 'trust',
      'social proof', 'ratings', 'satisfaction', 'experience'
    ],
    template: `
      <section class="testimonials-grid">
        <div class="container">
          <h2 class="section-title">{{sectionTitle}}</h2>
          <div class="grid-3col">
            {{#testimonials}}
            <div class="testimonial-card">
              <div class="rating">{{rating}}</div>
              <p class="quote">"{{quote}}"</p>
              <div class="author">
                <img src="{{authorImage}}" alt="{{authorName}}" />
                <div>
                  <p class="name">{{authorName}}</p>
                  <p class="title">{{authorTitle}}</p>
                </div>
              </div>
            </div>
            {{/testimonials}}
          </div>
        </div>
      </section>
    `,
    requiredFields: ['sectionTitle', 'testimonials']
  },
  {
    id: 'testimonials-slider',
    sectionType: 'testimonials',
    variant: 'slider',
    name: 'Testimonials Slider',
    description: 'Sliding testimonials with large quotes',
    keywords: [
      'showcase', 'highlight', 'featured', 'stories', 'success',
      'case studies', 'clients', 'partnerships'
    ],
    template: `
      <section class="testimonials-slider">
        <div class="container">
          <h2 class="section-title">{{sectionTitle}}</h2>
          <div class="slider">
            {{#testimonials}}
            <div class="testimonial-slide">
              <p class="quote-large">"{{quote}}"</p>
              <div class="author-centered">
                <img src="{{authorImage}}" alt="{{authorName}}" />
                <p class="name">{{authorName}}</p>
                <p class="title">{{authorTitle}}</p>
              </div>
            </div>
            {{/testimonials}}
          </div>
        </div>
      </section>
    `,
    requiredFields: ['sectionTitle', 'testimonials']
  },

  // ============= NEWSLETTER LAYOUTS =============
  {
    id: 'newsletter-centered',
    sectionType: 'newsletter',
    variant: 'centered',
    name: 'Centered Newsletter Signup',
    description: 'Simple centered newsletter signup',
    keywords: [
      'subscribe', 'newsletter', 'email', 'signup', 'updates',
      'notifications', 'stay informed', 'join', 'community'
    ],
    template: `
      <section class="newsletter-centered">
        <div class="container-narrow">
          <h2>{{headline}}</h2>
          <p>{{description}}</p>
          <form class="newsletter-form">
            <input type="email" placeholder="{{placeholder}}" />
            <button type="submit" class="btn-primary">{{cta}}</button>
          </form>
        </div>
      </section>
    `,
    requiredFields: ['headline', 'description', 'placeholder', 'cta']
  },
  {
    id: 'newsletter-split',
    sectionType: 'newsletter',
    variant: 'split',
    name: 'Split Newsletter Section',
    description: 'Newsletter signup with benefits on the side',
    keywords: [
      'benefits', 'perks', 'exclusive', 'insider', 'vip', 'members',
      'rewards', 'offers', 'deals', 'discounts'
    ],
    template: `
      <section class="newsletter-split">
        <div class="container grid-2col">
          <div class="benefits">
            <h3>{{benefitsHeadline}}</h3>
            <ul>
              {{#benefits}}
              <li>{{.}}</li>
              {{/benefits}}
            </ul>
          </div>
          <div class="signup">
            <h2>{{headline}}</h2>
            <p>{{description}}</p>
            <form class="newsletter-form">
              <input type="email" placeholder="{{placeholder}}" />
              <button type="submit" class="btn-primary">{{cta}}</button>
            </form>
          </div>
        </div>
      </section>
    `,
    requiredFields: ['headline', 'description', 'placeholder', 'cta', 'benefitsHeadline', 'benefits']
  },

  // ============= FOOTER LAYOUTS =============
  {
    id: 'footer-minimal',
    sectionType: 'footer',
    variant: 'minimal',
    name: 'Minimal Footer',
    description: 'Simple footer with essential links',
    keywords: [
      'simple', 'clean', 'minimal', 'basic', 'essential', 'straightforward'
    ],
    template: `
      <footer class="footer-minimal">
        <div class="container">
          <div class="footer-content">
            <p class="copyright">{{copyright}}</p>
            <nav class="footer-links">
              {{#links}}
              <a href="{{url}}">{{text}}</a>
              {{/links}}
            </nav>
          </div>
        </div>
      </footer>
    `,
    requiredFields: ['copyright', 'links']
  },
  {
    id: 'footer-comprehensive',
    sectionType: 'footer',
    variant: 'comprehensive',
    name: 'Comprehensive Footer',
    description: 'Full-featured footer with multiple columns',
    keywords: [
      'detailed', 'comprehensive', 'full', 'complete', 'extensive',
      'corporate', 'enterprise', 'professional', 'business'
    ],
    template: `
      <footer class="footer-comprehensive">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-column">
              <h4>{{aboutHeadline}}</h4>
              <p>{{aboutText}}</p>
            </div>
            {{#columns}}
            <div class="footer-column">
              <h4>{{title}}</h4>
              <ul>
                {{#links}}
                <li><a href="{{url}}">{{text}}</a></li>
                {{/links}}
              </ul>
            </div>
            {{/columns}}
          </div>
          <div class="footer-bottom">
            <p class="copyright">{{copyright}}</p>
            <div class="social-links">
              {{#socialLinks}}
              <a href="{{url}}" aria-label="{{platform}}">{{icon}}</a>
              {{/socialLinks}}
            </div>
          </div>
        </div>
      </footer>
    `,
    requiredFields: ['aboutHeadline', 'aboutText', 'columns', 'copyright', 'socialLinks']
  }
];

// Helper function to get layouts by section type
export function getLayoutsBySection(sectionType: LayoutDefinition['sectionType']): LayoutDefinition[] {
  return LAYOUTS.filter(layout => layout.sectionType === sectionType);
}

// Helper function to get layout by ID
export function getLayoutById(id: string): LayoutDefinition | undefined {
  return LAYOUTS.find(layout => layout.id === id);
}

// All section types
export const SECTION_TYPES = ['hero', 'product_grid', 'featured_products', 'testimonials', 'newsletter', 'footer'] as const;
