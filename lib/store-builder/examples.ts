/**
 * Example usage of the AI Store Builder module
 * These are code examples showing how to use the various functions
 */

import {
  generateStore,
  getStore,
  getUserStores,
  updateStoreSection,
  updateStoreTheme,
  publishStore
} from './actions';
import { DEFAULT_THEMES } from './store';
import {
  rankLayoutsForSection,
  selectLayoutsForAllSections,
  calculateTemplateQualityScore
} from './layout-ranker';
import {
  generateContentForAllSections,
  regenerateSection
} from './content-generator';

// ============================================
// Example 1: Generate a Complete Store
// ============================================

export async function exampleGenerateStore() {
  const result = await generateStore({
    userId: 'user-123',
    userPrompt: `
      I want to create an online store for handmade organic skincare products.
      My target audience is environmentally conscious women aged 25-45.
      I want a clean, natural aesthetic with earthy tones.
      I sell face creams, body lotions, and natural soaps made from sustainable ingredients.
    `,
    colorTheme: DEFAULT_THEMES.elegant
  });

  if (result.success) {
    console.log('✅ Store generated successfully!');
    console.log('Store ID:', result.storeId);
    console.log('Store Name:', result.data?.storeName);
    console.log('Number of sections:', result.data?.sections.length);
    return result.storeId;
  } else {
    console.error('❌ Generation failed:', result.error);
  }
}

// ============================================
// Example 2: Retrieve and Display a Store
// ============================================

export async function exampleGetStore(storeId: string) {
  const result = await getStore(storeId);

  if (result.success && result.data) {
    console.log('Store:', result.data.name);
    console.log('Description:', result.data.description);
    console.log('Status:', result.data.status);
    console.log('Sections:');

    result.data.sections.forEach((section, index) => {
      console.log(`  ${index + 1}. ${section.sectionType} (${section.layoutVariant})`);
    });

    return result.data;
  }
}

// ============================================
// Example 3: Get All Stores for a User
// ============================================

export async function exampleGetUserStores(userId: string) {
  const result = await getUserStores(userId);

  if (result.success && result.data) {
    console.log(`User has ${result.data.length} store(s)`);

    result.data.forEach((store, index) => {
      console.log(`\n${index + 1}. ${store.name}`);
      console.log(`   Status: ${store.status}`);
      console.log(`   Sections: ${store.sections.length}`);
      console.log(`   Created: ${store.createdAt}`);
    });

    return result.data;
  }
}

// ============================================
// Example 4: Update Section Content
// ============================================

export async function exampleUpdateSection(sectionId: string) {
  const newContent = {
    headline: 'New Headline',
    subheadline: 'Updated subheadline text',
    ctaPrimary: 'Shop Now'
  };

  const result = await updateStoreSection(sectionId, newContent);

  if (result.success) {
    console.log('✅ Section updated successfully');
    return result.data;
  }
}

// ============================================
// Example 5: Change Store Theme
// ============================================

export async function exampleChangeTheme(storeId: string) {
  const result = await updateStoreTheme(storeId, DEFAULT_THEMES.ocean);

  if (result.success) {
    console.log('✅ Theme updated to Ocean');
    return result.data;
  }
}

// ============================================
// Example 6: Rank Layouts for a Section
// ============================================

export async function exampleRankLayouts() {
  const userPrompt = 'Luxury jewelry store with elegant design';

  const rankedLayouts = await rankLayoutsForSection(userPrompt, 'hero');

  console.log('Ranked Hero Layouts:');
  rankedLayouts.forEach((ranked, index) => {
    console.log(`${index + 1}. ${ranked.layout.name}`);
    console.log(`   Score: ${ranked.score}/100`);
    console.log(`   Reason: ${ranked.reasoning}`);
  });

  return rankedLayouts;
}

// ============================================
// Example 7: Select Best Layouts for All Sections
// ============================================

export async function exampleSelectAllLayouts() {
  const userPrompt = 'Modern tech gadget store for smart home devices';

  const selections = await selectLayoutsForAllSections(userPrompt);

  console.log('Selected Layouts for Each Section:');
  selections.forEach((selection) => {
    console.log(`\n${selection.sectionType}:`);
    console.log(`  Layout: ${selection.selectedLayout.name}`);
    console.log(`  Variant: ${selection.selectedLayout.variant}`);
    console.log(`  Score: ${selection.score}/100`);
  });

  // Calculate quality score
  const quality = calculateTemplateQualityScore(selections);
  console.log(`\nOverall Quality: ${quality.overallScore.toFixed(1)}/100`);
  console.log(`Recommendation: ${quality.recommendation}`);

  return selections;
}

// ============================================
// Example 8: Generate Content for Sections
// ============================================

export async function exampleGenerateContent() {
  const userPrompt = 'Eco-friendly yoga apparel and accessories';

  // First, select layouts
  const selections = await selectLayoutsForAllSections(userPrompt);

  // Then generate content
  const generatedSections = await generateContentForAllSections(
    userPrompt,
    selections
  );

  console.log('Generated Content:');
  generatedSections.forEach((section) => {
    console.log(`\n${section.sectionType}:`);
    console.log(JSON.stringify(section.content, null, 2));
  });

  return generatedSections;
}

// ============================================
// Example 9: Regenerate Specific Section
// ============================================

export async function exampleRegenerateSection(section: any) {
  const result = await regenerateSection(
    'Original prompt...',
    section,
    'Make it more professional and corporate'
  );

  console.log('Regenerated section content:');
  console.log(JSON.stringify(result.content, null, 2));

  return result;
}

// ============================================
// Example 10: Publish Store
// ============================================

export async function examplePublishStore(storeId: string) {
  const result = await publishStore(storeId);

  if (result.success) {
    console.log('✅ Store published successfully!');
    console.log('Store is now live and accessible to users');
    return result.data;
  }
}

// ============================================
// Example 11: Complete Workflow
// ============================================

export async function exampleCompleteWorkflow() {
  console.log('Starting complete store builder workflow...\n');

  // Step 1: Generate store
  console.log('Step 1: Generating store...');
  const generateResult = await generateStore({
    userId: 'demo-user',
    userPrompt: 'Artisan coffee roastery with a rustic, warm aesthetic',
    colorTheme: DEFAULT_THEMES.modern
  });

  if (!generateResult.success || !generateResult.storeId) {
    console.error('Failed to generate store');
    return;
  }

  const storeId = generateResult.storeId;
  console.log(`✅ Store created: ${storeId}\n`);

  // Step 2: Retrieve store
  console.log('Step 2: Retrieving store...');
  const storeResult = await getStore(storeId);
  console.log(`✅ Store retrieved: ${storeResult.data?.name}\n`);

  // Step 3: Update a section (example: update hero section)
  console.log('Step 3: Updating hero section...');
  const heroSection = storeResult.data?.sections.find(
    (s) => s.sectionType === 'hero'
  );

  if (heroSection) {
    await updateStoreSection(heroSection.id, {
      ...heroSection.content,
      headline: 'Freshly Roasted Artisan Coffee'
    });
    console.log('✅ Hero section updated\n');
  }

  // Step 4: Change theme
  console.log('Step 4: Changing color theme...');
  await updateStoreTheme(storeId, DEFAULT_THEMES.elegant);
  console.log('✅ Theme changed to Elegant\n');

  // Step 5: Publish store
  console.log('Step 5: Publishing store...');
  await publishStore(storeId);
  console.log('✅ Store published!\n');

  console.log('Workflow complete! 🎉');
  return storeId;
}

// ============================================
// Usage Tips
// ============================================

/*
USAGE TIPS:

1. Always provide detailed prompts for better results
   Good: "Modern tech store for smart home devices targeting homeowners aged 30-50"
   Bad: "Store for products"

2. Choose appropriate themes based on your brand
   - Modern: Tech, SaaS, Startups
   - Elegant: Luxury, Professional Services
   - Vibrant: Fashion, Creative, Youth-oriented
   - Minimalist: Design agencies, Portfolios
   - Ocean: Health, Wellness, Nature

3. Quality scores interpretation:
   - 80-100: Excellent match
   - 60-79: Good match
   - 40-59: Moderate match
   - 0-39: Poor match (consider providing more details)

4. Section order matters:
   - Hero should always be first
   - Footer should always be last
   - Featured Products before Product Grid for emphasis
   - Testimonials near the end for social proof
   - Newsletter before Footer for maximum visibility

5. Content regeneration:
   - Use additional instructions to refine tone
   - Examples: "more professional", "more casual", "more technical"

6. Performance optimization:
   - Generation runs in parallel where possible
   - Expect 10-30 seconds for complete store generation
   - Individual section updates are fast (2-5 seconds)
*/
