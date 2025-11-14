# AI-Powered Store Builder Module

A comprehensive AI-powered store builder for creating fully customized e-commerce websites from natural language descriptions.

## Features

✨ **AI-Powered Generation**: Describe your business in plain language and get a complete store template
🎨 **Smart Layout Selection**: AI ranks and selects the best layouts for each section based on your business type
📝 **Automated Content Creation**: AI generates compelling headlines, descriptions, and product content
🎨 **Customizable Themes**: Multiple color themes with easy customization
💾 **Database Integration**: Full PostgreSQL storage with Prisma ORM
🔄 **Editable Sections**: Update and customize any section after generation
📱 **Responsive Design**: All layouts are mobile-friendly

## Architecture

### Directory Structure

```
lib/store-builder/
├── actions.ts              # Server actions for store CRUD operations
├── ai-client.ts            # OpenAI integration for ranking and content generation
├── content-generator.ts    # Content generation utilities
├── layouts.ts              # Predefined layout definitions with keyword mappings
├── layout-ranker.ts        # AI-powered layout ranking algorithm
├── store.ts                # Zustand state management
├── theme-utils.ts          # Color theme utilities
└── index.ts                # Main exports

components/store-builder/
├── sections/
│   ├── HeroSection.tsx
│   ├── ProductGridSection.tsx
│   ├── FeaturedProductsSection.tsx
│   ├── TestimonialsSection.tsx
│   ├── NewsletterSection.tsx
│   ├── FooterSection.tsx
│   └── StoreRenderer.tsx   # Main renderer component
└── StoreBuilderUI.tsx      # Main UI component

prisma/
└── schema.prisma           # Database schema (User, Store, StoreSection)
```

## Getting Started

### 1. Environment Setup

Create a `.env` file with the following variables:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/dukano_db?schema=public"
OPENAI_API_KEY="your_openai_api_key_here"
```

### 2. Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations (if you have a database)
npx prisma migrate dev --name init

# Or push schema directly
npx prisma db push
```

### 3. Install Dependencies

The following packages are already installed:
- `prisma` & `@prisma/client` - Database ORM
- `openai` - AI integration
- `zustand` - State management
- `zod` - Schema validation

### 4. Use the Store Builder

Navigate to `/store-builder` in your application to access the AI Store Builder interface.

## Usage

### Basic Usage

```typescript
import { StoreBuilderUI } from '@/components/store-builder/StoreBuilderUI';

export default function Page() {
  const userId = 'user-123'; // Get from your auth system

  return <StoreBuilderUI userId={userId} />;
}
```

### Programmatic Store Generation

```typescript
import { generateStore } from '@/lib/store-builder/actions';
import { DEFAULT_THEMES } from '@/lib/store-builder/store';

const result = await generateStore({
  userId: 'user-123',
  userPrompt: 'I want to create an online store for handmade jewelry...',
  colorTheme: DEFAULT_THEMES.elegant
});

if (result.success) {
  console.log('Store generated:', result.storeId);
  console.log('Sections:', result.data.sections);
}
```

### Retrieve a Store

```typescript
import { getStore } from '@/lib/store-builder/actions';

const result = await getStore(storeId);
if (result.success && result.data) {
  const store = result.data;
  console.log('Store:', store.name);
  console.log('Sections:', store.sections);
}
```

### Render a Store

```typescript
import { StoreRenderer } from '@/components/store-builder/sections/StoreRenderer';

<StoreRenderer
  sections={sections}
  colorTheme={colorTheme}
/>
```

## Layout System

### Available Section Types

1. **Hero** - Hero banners with various styles
   - `minimal` - Clean centered hero
   - `image-right` - Hero with image on the right
   - `bold` - Full-width background image hero
   - `video-background` - Hero with video background

2. **Product Grid** - Product display sections
   - `3-column` - Classic 3-column grid
   - `masonry` - Pinterest-style masonry layout
   - `list` - Horizontal list view with details

3. **Featured Products** - Highlighted product sections
   - `carousel` - Sliding carousel of featured items
   - `split` - Two large featured products side-by-side

4. **Testimonials** - Customer review sections
   - `grid` - Grid of testimonial cards
   - `slider` - Sliding testimonials with large quotes

5. **Newsletter** - Email signup sections
   - `centered` - Simple centered signup
   - `split` - Signup with benefits listed

6. **Footer** - Footer sections
   - `minimal` - Simple footer with essential links
   - `comprehensive` - Full-featured multi-column footer

### Keyword Mapping

Each layout has associated keywords that help the AI rank relevance:

```typescript
{
  id: 'hero-minimal',
  keywords: [
    'minimal', 'clean', 'simple', 'modern', 'elegant',
    'professional', 'corporate', 'tech', 'saas', 'startup'
  ],
  // ...
}
```

## AI Integration

### Layout Ranking

The AI analyzes your prompt and ranks each layout based on keyword relevance:

```typescript
const rankedLayouts = await rankLayoutsForSection(
  "I sell luxury handmade jewelry",
  'hero'
);
// Returns layouts sorted by relevance score (0-100)
```

### Content Generation

The AI generates contextual content for each section:

```typescript
const content = await generateSectionContent(
  userPrompt,
  'hero',
  'minimal',
  ['headline', 'subheadline', 'ctaPrimary']
);
// Returns: { headline: "...", subheadline: "...", ctaPrimary: "..." }
```

## State Management

The module uses Zustand for state management:

```typescript
import { useStoreBuilder } from '@/lib/store-builder/store';

function Component() {
  const {
    sections,
    colorTheme,
    isGenerating,
    setColorTheme,
    updateSection
  } = useStoreBuilder();

  // Use the store state and actions
}
```

## Color Themes

### Predefined Themes

- **Modern** - Blue and purple with orange accents
- **Elegant** - Grayscale with subtle accents
- **Vibrant** - Pink and purple with bold colors
- **Minimalist** - Pure black and white
- **Ocean** - Blue and teal color scheme

### Custom Themes

```typescript
import { ColorTheme } from '@/lib/store-builder/store';

const customTheme: ColorTheme = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  accent: '#F59E0B',
  background: '#FFFFFF',
  text: '#1F2937',
  error: '#EF4444',
  success: '#10B981'
};

setColorTheme(customTheme);
```

## Database Schema

### User Model
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  stores    Store[]
}
```

### Store Model
```prisma
model Store {
  id          String         @id @default(cuid())
  userId      String
  name        String
  description String?
  prompt      String
  colorTheme  Json
  status      String         @default("draft")
  sections    StoreSection[]
}
```

### StoreSection Model
```prisma
model StoreSection {
  id              String   @id @default(cuid())
  storeId         String
  sectionType     String
  layoutId        String
  layoutVariant   String
  order           Int
  content         Json
  keywords        String[]
  relevanceScore  Float?
}
```

## API / Server Actions

### Generate Store
```typescript
generateStore({ userId, userPrompt, colorTheme })
```

### Get Store
```typescript
getStore(storeId)
```

### Get User Stores
```typescript
getUserStores(userId)
```

### Update Section
```typescript
updateStoreSection(sectionId, content)
```

### Update Theme
```typescript
updateStoreTheme(storeId, colorTheme)
```

### Publish Store
```typescript
publishStore(storeId)
```

### Delete Store
```typescript
deleteStore(storeId)
```

### Reorder Sections
```typescript
reorderStoreSections(storeId, sectionOrders)
```

## Example Prompts

### Good Prompts (Detailed)

✅ "I want to create an online store for handmade organic skincare products. My target audience is environmentally conscious women aged 25-45. I want a clean, natural aesthetic with earthy tones. I sell face creams, body lotions, and natural soaps."

✅ "Create a modern tech store for selling smart home devices and IoT products. Target audience is tech-savvy homeowners aged 30-50. I want a sleek, futuristic design with blue and white colors."

✅ "Build a boutique fashion store for vintage clothing and accessories. The vibe should be retro and nostalgic, targeting fashion-forward millennials. Use warm, nostalgic colors."

### Poor Prompts (Too Vague)

❌ "I want a store"
❌ "Online shop"
❌ "Selling products"

## Customization

### Adding New Layouts

1. Add layout definition to `lib/store-builder/layouts.ts`:

```typescript
{
  id: 'hero-custom',
  sectionType: 'hero',
  variant: 'custom',
  name: 'Custom Hero',
  description: 'Your custom hero layout',
  keywords: ['custom', 'unique', 'special'],
  template: `...`,
  requiredFields: ['headline', 'subheadline']
}
```

2. Create corresponding React component in `components/store-builder/sections/`

3. Add to the section renderer switch statement

### Customizing AI Behavior

Modify prompts in `lib/store-builder/ai-client.ts` to adjust:
- Layout ranking criteria
- Content generation style
- Metadata extraction logic

## Performance Considerations

- Layout ranking and content generation run in parallel for speed
- Prisma client is singleton to avoid connection pooling issues
- State is persisted to localStorage for better UX
- Image placeholders are used to avoid loading delays

## Security

- All server actions validate inputs
- Database operations use Prisma's built-in SQL injection protection
- OpenAI API key is server-side only
- User authentication should be implemented for production

## Future Enhancements

- [ ] Drag-and-drop section reordering
- [ ] In-place content editing
- [ ] Image upload and management
- [ ] Export to static HTML/CSS
- [ ] A/B testing different layouts
- [ ] Analytics integration
- [ ] Multi-language support
- [ ] Custom CSS injection
- [ ] Template marketplace
- [ ] Collaboration features

## Troubleshooting

### OpenAI API Errors

If AI generation fails, the system falls back to keyword-based scoring and template content. Check:
- `OPENAI_API_KEY` is set correctly
- API quota is not exceeded
- Network connectivity

### Database Connection Issues

Ensure:
- PostgreSQL is running
- `DATABASE_URL` is correct
- Prisma client is generated (`npx prisma generate`)

### State Not Persisting

Check:
- localStorage is enabled in browser
- No conflicting state management
- Zustand persist middleware is configured

## Contributing

To extend the store builder:

1. Add new section types in `layouts.ts`
2. Create corresponding React components
3. Update the renderer to include new sections
4. Add keywords for AI ranking
5. Test with various prompts

## License

This module is part of the Dukano project.

## Support

For issues or questions, please refer to the main project documentation.
