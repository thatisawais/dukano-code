import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import { GeneratedSectionContent } from './content-generator';
import { SectionLayoutSelection } from './layout-ranker';

export interface ColorTheme {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
  error: string;
  success: string;
}

export interface StoreBuilderState {
  // Store metadata
  storeId: string | null;
  storeName: string;
  storeDescription: string;
  userPrompt: string;
  category: string;

  // Generation state
  isGenerating: boolean;
  generationProgress: number;
  currentStep: string;
  error: string | null;

  // Layout selections
  layoutSelections: SectionLayoutSelection[];

  // Generated content
  sections: GeneratedSectionContent[];

  // Color theme
  colorTheme: ColorTheme;

  // Preview state
  isPreviewMode: boolean;
  selectedSectionId: string | null;

  // Actions
  setUserPrompt: (prompt: string) => void;
  setStoreMetadata: (name: string, description: string, category: string) => void;
  setGenerating: (isGenerating: boolean) => void;
  setGenerationProgress: (progress: number, step: string) => void;
  setError: (error: string | null) => void;
  setLayoutSelections: (selections: SectionLayoutSelection[]) => void;
  setSections: (sections: GeneratedSectionContent[]) => void;
  updateSection: (sectionIndex: number, updatedSection: GeneratedSectionContent) => void;
  removeSection: (sectionIndex: number) => void;
  reorderSections: (fromIndex: number, toIndex: number) => void;
  setColorTheme: (theme: ColorTheme) => void;
  updateColorThemeField: (field: keyof ColorTheme, value: string) => void;
  setPreviewMode: (isPreview: boolean) => void;
  setSelectedSection: (sectionId: string | null) => void;
  setStoreId: (storeId: string) => void;
  reset: () => void;
}

// Default color themes
export const DEFAULT_THEMES: Record<string, ColorTheme> = {
  modern: {
    primary: '#3B82F6',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937',
    error: '#EF4444',
    success: '#10B981'
  },
  elegant: {
    primary: '#1F2937',
    secondary: '#6B7280',
    accent: '#D1D5DB',
    background: '#F9FAFB',
    text: '#111827',
    error: '#DC2626',
    success: '#059669'
  },
  vibrant: {
    primary: '#EC4899',
    secondary: '#8B5CF6',
    accent: '#F59E0B',
    background: '#FFFFFF',
    text: '#1F2937',
    error: '#EF4444',
    success: '#10B981'
  },
  minimalist: {
    primary: '#000000',
    secondary: '#404040',
    accent: '#808080',
    background: '#FFFFFF',
    text: '#000000',
    error: '#DC2626',
    success: '#059669'
  },
  ocean: {
    primary: '#0EA5E9',
    secondary: '#06B6D4',
    accent: '#14B8A6',
    background: '#F0F9FF',
    text: '#0C4A6E',
    error: '#DC2626',
    success: '#059669'
  }
};

const initialState = {
  storeId: null,
  storeName: '',
  storeDescription: '',
  userPrompt: '',
  category: '',
  isGenerating: false,
  generationProgress: 0,
  currentStep: '',
  error: null,
  layoutSelections: [],
  sections: [],
  colorTheme: DEFAULT_THEMES.modern,
  isPreviewMode: false,
  selectedSectionId: null
};

export const useStoreBuilder = create<StoreBuilderState>()(
  devtools(
    persist(
      (set) => ({
        ...initialState,

        setUserPrompt: (prompt) => set({ userPrompt: prompt }),

        setStoreMetadata: (name, description, category) =>
          set({
            storeName: name,
            storeDescription: description,
            category
          }),

        setGenerating: (isGenerating) => set({ isGenerating }),

        setGenerationProgress: (progress, step) =>
          set({
            generationProgress: progress,
            currentStep: step
          }),

        setError: (error) => set({ error }),

        setLayoutSelections: (selections) => set({ layoutSelections: selections }),

        setSections: (sections) => set({ sections }),

        updateSection: (sectionIndex, updatedSection) =>
          set((state) => ({
            sections: state.sections.map((section, index) =>
              index === sectionIndex ? updatedSection : section
            )
          })),

        removeSection: (sectionIndex) =>
          set((state) => ({
            sections: state.sections.filter((_, index) => index !== sectionIndex)
          })),

        reorderSections: (fromIndex, toIndex) =>
          set((state) => {
            const newSections = [...state.sections];
            const [movedSection] = newSections.splice(fromIndex, 1);
            newSections.splice(toIndex, 0, movedSection);

            // Update order property
            return {
              sections: newSections.map((section, index) => ({
                ...section,
                order: index
              }))
            };
          }),

        setColorTheme: (theme) => set({ colorTheme: theme }),

        updateColorThemeField: (field, value) =>
          set((state) => ({
            colorTheme: {
              ...state.colorTheme,
              [field]: value
            }
          })),

        setPreviewMode: (isPreview) => set({ isPreviewMode: isPreview }),

        setSelectedSection: (sectionId) => set({ selectedSectionId: sectionId }),

        setStoreId: (storeId) => set({ storeId }),

        reset: () => set(initialState)
      }),
      {
        name: 'store-builder-storage',
        partialize: (state) => ({
          // Only persist these fields
          storeId: state.storeId,
          storeName: state.storeName,
          storeDescription: state.storeDescription,
          userPrompt: state.userPrompt,
          category: state.category,
          layoutSelections: state.layoutSelections,
          sections: state.sections,
          colorTheme: state.colorTheme
        })
      }
    )
  )
);

// Selectors for computed values
export const selectHasContent = (state: StoreBuilderState) => state.sections.length > 0;
export const selectSectionByType = (state: StoreBuilderState, type: string) =>
  state.sections.find(s => s.sectionType === type);
export const selectCanGenerate = (state: StoreBuilderState) =>
  state.userPrompt.trim().length > 10 && !state.isGenerating;
