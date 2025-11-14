import { rankLayoutRelevance } from './ai-client';
import { LAYOUTS, LayoutDefinition, SECTION_TYPES, getLayoutsBySection } from './layouts';

export interface RankedLayout {
  layout: LayoutDefinition;
  score: number;
  reasoning: string;
}

export interface SectionLayoutSelection {
  sectionType: string;
  selectedLayout: LayoutDefinition;
  score: number;
  reasoning: string;
  alternativeLayouts: RankedLayout[];
}

/**
 * Rank all layouts for a specific section type based on user prompt
 */
export async function rankLayoutsForSection(
  userPrompt: string,
  sectionType: LayoutDefinition['sectionType']
): Promise<RankedLayout[]> {
  const layouts = getLayoutsBySection(sectionType);

  // Rank each layout in parallel for performance
  const rankingPromises = layouts.map(async (layout) => {
    const { score, reasoning } = await rankLayoutRelevance(
      userPrompt,
      layout.keywords,
      layout.id
    );

    return {
      layout,
      score,
      reasoning
    };
  });

  const rankedLayouts = await Promise.all(rankingPromises);

  // Sort by score descending
  return rankedLayouts.sort((a, b) => b.score - a.score);
}

/**
 * Select the best layout for each section type
 */
export async function selectLayoutsForAllSections(
  userPrompt: string
): Promise<SectionLayoutSelection[]> {
  const selections: SectionLayoutSelection[] = [];

  // Process each section type in parallel
  const sectionPromises = SECTION_TYPES.map(async (sectionType) => {
    const rankedLayouts = await rankLayoutsForSection(userPrompt, sectionType);

    if (rankedLayouts.length === 0) {
      throw new Error(`No layouts found for section type: ${sectionType}`);
    }

    const topLayout = rankedLayouts[0];
    const alternatives = rankedLayouts.slice(1, 4); // Keep top 3 alternatives

    return {
      sectionType,
      selectedLayout: topLayout.layout,
      score: topLayout.score,
      reasoning: topLayout.reasoning,
      alternativeLayouts: alternatives
    };
  });

  return await Promise.all(sectionPromises);
}

/**
 * Get recommended section order based on layout types
 * This determines the optimal order of sections on the homepage
 */
export function getRecommendedSectionOrder(
  selections: SectionLayoutSelection[]
): SectionLayoutSelection[] {
  // Define the standard order for sections
  const standardOrder = [
    'hero',
    'featured_products',
    'product_grid',
    'testimonials',
    'newsletter',
    'footer'
  ];

  // Sort selections based on the standard order
  const ordered = [...selections].sort((a, b) => {
    const indexA = standardOrder.indexOf(a.sectionType);
    const indexB = standardOrder.indexOf(b.sectionType);
    return indexA - indexB;
  });

  return ordered;
}

/**
 * Calculate overall store template quality score
 */
export function calculateTemplateQualityScore(
  selections: SectionLayoutSelection[]
): {
  overallScore: number;
  sectionScores: Record<string, number>;
  recommendation: string;
} {
  const sectionScores: Record<string, number> = {};
  let totalScore = 0;

  selections.forEach(selection => {
    sectionScores[selection.sectionType] = selection.score;
    totalScore += selection.score;
  });

  const overallScore = totalScore / selections.length;

  let recommendation = '';
  if (overallScore >= 80) {
    recommendation = 'Excellent match! This template is highly relevant to your store.';
  } else if (overallScore >= 60) {
    recommendation = 'Good match. Consider customizing some sections for better fit.';
  } else if (overallScore >= 40) {
    recommendation = 'Moderate match. You may want to adjust several sections.';
  } else {
    recommendation = 'Low match. Consider providing more details about your store for better results.';
  }

  return {
    overallScore,
    sectionScores,
    recommendation
  };
}

/**
 * Re-rank a specific section with additional context
 */
export async function rerankSection(
  userPrompt: string,
  sectionType: LayoutDefinition['sectionType'],
  additionalContext?: string
): Promise<RankedLayout[]> {
  const enhancedPrompt = additionalContext
    ? `${userPrompt}\n\nAdditional context for ${sectionType}: ${additionalContext}`
    : userPrompt;

  return rankLayoutsForSection(enhancedPrompt, sectionType);
}
