import { generateSectionContent } from './ai-client';
import { SectionLayoutSelection } from './layout-ranker';

export interface GeneratedSectionContent {
  sectionType: string;
  layoutId: string;
  layoutVariant: string;
  content: Record<string, any>;
  order: number;
}

/**
 * Generate content for all selected sections
 */
export async function generateContentForAllSections(
  userPrompt: string,
  layoutSelections: SectionLayoutSelection[]
): Promise<GeneratedSectionContent[]> {
  const contentPromises = layoutSelections.map(async (selection, index) => {
    const content = await generateSectionContent(
      userPrompt,
      selection.sectionType,
      selection.selectedLayout.variant,
      selection.selectedLayout.requiredFields
    );

    return {
      sectionType: selection.sectionType,
      layoutId: selection.selectedLayout.id,
      layoutVariant: selection.selectedLayout.variant,
      content,
      order: index
    };
  });

  return await Promise.all(contentPromises);
}

/**
 * Generate content for a single section
 */
export async function generateContentForSection(
  userPrompt: string,
  sectionType: string,
  layoutId: string,
  layoutVariant: string,
  requiredFields: string[]
): Promise<Record<string, any>> {
  return await generateSectionContent(
    userPrompt,
    sectionType,
    layoutVariant,
    requiredFields
  );
}

/**
 * Regenerate content for a specific section
 */
export async function regenerateSection(
  userPrompt: string,
  section: GeneratedSectionContent,
  additionalInstructions?: string
): Promise<GeneratedSectionContent> {
  const enhancedPrompt = additionalInstructions
    ? `${userPrompt}\n\nAdditional instructions: ${additionalInstructions}`
    : userPrompt;

  const layout = await import('./layouts').then(m =>
    m.getLayoutById(section.layoutId)
  );

  if (!layout) {
    throw new Error(`Layout not found: ${section.layoutId}`);
  }

  const newContent = await generateSectionContent(
    enhancedPrompt,
    section.sectionType,
    section.layoutVariant,
    layout.requiredFields
  );

  return {
    ...section,
    content: newContent
  };
}

/**
 * Update specific field content in a section
 */
export function updateSectionField(
  section: GeneratedSectionContent,
  fieldName: string,
  newValue: any
): GeneratedSectionContent {
  return {
    ...section,
    content: {
      ...section.content,
      [fieldName]: newValue
    }
  };
}

/**
 * Validate section content has all required fields
 */
export function validateSectionContent(
  content: Record<string, any>,
  requiredFields: string[]
): { isValid: boolean; missingFields: string[] } {
  const missingFields = requiredFields.filter(
    field => content[field] === undefined || content[field] === null
  );

  return {
    isValid: missingFields.length === 0,
    missingFields
  };
}

/**
 * Merge custom content with AI-generated content
 */
export function mergeContent(
  aiContent: Record<string, any>,
  customContent: Record<string, any>
): Record<string, any> {
  return {
    ...aiContent,
    ...customContent
  };
}
