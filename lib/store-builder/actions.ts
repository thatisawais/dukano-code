'use server';

import { prisma } from '@/lib/prisma';
import { extractStoreMetadata } from './ai-client';
import { selectLayoutsForAllSections, getRecommendedSectionOrder } from './layout-ranker';
import { generateContentForAllSections } from './content-generator';
import { ColorTheme } from './store';

export interface GenerateStoreInput {
  userId: string;
  userPrompt: string;
  colorTheme: ColorTheme;
}

export interface GenerateStoreResult {
  success: boolean;
  storeId?: string;
  error?: string;
  data?: {
    storeName: string;
    storeDescription: string;
    category: string;
    sections: any[];
  };
}

/**
 * Generate a complete AI store from user prompt
 */
export async function generateStore(input: GenerateStoreInput): Promise<GenerateStoreResult> {
  try {
    const { userId, userPrompt, colorTheme } = input;

    // Step 1: Extract store metadata
    const metadata = await extractStoreMetadata(userPrompt);

    // Step 2: Select best layouts for each section
    const layoutSelections = await selectLayoutsForAllSections(userPrompt);

    // Step 3: Order sections optimally
    const orderedSelections = getRecommendedSectionOrder(layoutSelections);

    // Step 4: Generate content for all sections
    const generatedSections = await generateContentForAllSections(userPrompt, orderedSelections);

    // Step 5: Save to database
    const store = await prisma.store.create({
      data: {
        userId,
        name: metadata.storeName,
        description: metadata.storeDescription,
        prompt: userPrompt,
        colorTheme: colorTheme as any,
        status: 'draft',
        sections: {
          create: generatedSections.map((section) => ({
            sectionType: section.sectionType,
            layoutId: section.layoutId,
            layoutVariant: section.layoutVariant,
            order: section.order,
            content: section.content as any,
            keywords: orderedSelections.find(s => s.sectionType === section.sectionType)
              ?.selectedLayout.keywords || [],
            relevanceScore: orderedSelections.find(s => s.sectionType === section.sectionType)
              ?.score
          }))
        }
      },
      include: {
        sections: true
      }
    });

    return {
      success: true,
      storeId: store.id,
      data: {
        storeName: metadata.storeName,
        storeDescription: metadata.storeDescription,
        category: metadata.category,
        sections: generatedSections
      }
    };
  } catch (error) {
    console.error('Error generating store:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to generate store'
    };
  }
}

/**
 * Get store by ID
 */
export async function getStore(storeId: string) {
  try {
    const store = await prisma.store.findUnique({
      where: { id: storeId },
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      }
    });

    if (!store) {
      return { success: false, error: 'Store not found' };
    }

    return { success: true, data: store };
  } catch (error) {
    console.error('Error getting store:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get store'
    };
  }
}

/**
 * Get all stores for a user
 */
export async function getUserStores(userId: string) {
  try {
    const stores = await prisma.store.findMany({
      where: { userId },
      include: {
        sections: {
          orderBy: { order: 'asc' }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return { success: true, data: stores };
  } catch (error) {
    console.error('Error getting user stores:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to get stores'
    };
  }
}

/**
 * Update store section content
 */
export async function updateStoreSection(
  sectionId: string,
  content: Record<string, any>
) {
  try {
    const section = await prisma.storeSection.update({
      where: { id: sectionId },
      data: { content: content as any }
    });

    return { success: true, data: section };
  } catch (error) {
    console.error('Error updating section:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update section'
    };
  }
}

/**
 * Update store color theme
 */
export async function updateStoreTheme(storeId: string, colorTheme: ColorTheme) {
  try {
    const store = await prisma.store.update({
      where: { id: storeId },
      data: { colorTheme: colorTheme as any }
    });

    return { success: true, data: store };
  } catch (error) {
    console.error('Error updating theme:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update theme'
    };
  }
}

/**
 * Publish store
 */
export async function publishStore(storeId: string) {
  try {
    const store = await prisma.store.update({
      where: { id: storeId },
      data: { status: 'published' }
    });

    return { success: true, data: store };
  } catch (error) {
    console.error('Error publishing store:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to publish store'
    };
  }
}

/**
 * Delete store
 */
export async function deleteStore(storeId: string) {
  try {
    await prisma.store.delete({
      where: { id: storeId }
    });

    return { success: true };
  } catch (error) {
    console.error('Error deleting store:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete store'
    };
  }
}

/**
 * Reorder store sections
 */
export async function reorderStoreSections(
  storeId: string,
  sectionOrders: { sectionId: string; order: number }[]
) {
  try {
    // Update all sections in a transaction
    await prisma.$transaction(
      sectionOrders.map(({ sectionId, order }) =>
        prisma.storeSection.update({
          where: { id: sectionId },
          data: { order }
        })
      )
    );

    return { success: true };
  } catch (error) {
    console.error('Error reordering sections:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to reorder sections'
    };
  }
}

/**
 * Create or update user
 */
export async function upsertUser(email: string, name?: string) {
  try {
    const user = await prisma.user.upsert({
      where: { email },
      update: { name },
      create: { email, name }
    });

    return { success: true, data: user };
  } catch (error) {
    console.error('Error upserting user:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to upsert user'
    };
  }
}
