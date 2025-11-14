'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useStoreBuilder, DEFAULT_THEMES, ColorTheme } from '@/lib/store-builder/store';
import { generateStore } from '@/lib/store-builder/actions';
import { StoreRenderer } from './sections/StoreRenderer';
import { Loader2, Sparkles, Palette, Eye, Code } from 'lucide-react';

interface StoreBuilderUIProps {
  userId: string;
}

export function StoreBuilderUI({ userId }: StoreBuilderUIProps) {
  const {
    userPrompt,
    setUserPrompt,
    isGenerating,
    setGenerating,
    generationProgress,
    setGenerationProgress,
    error,
    setError,
    sections,
    setSections,
    colorTheme,
    setColorTheme,
    setStoreMetadata,
    setStoreId
  } = useStoreBuilder();

  const [activeTab, setActiveTab] = useState<'builder' | 'preview'>('builder');

  const handleGenerate = async () => {
    if (!userPrompt.trim() || userPrompt.trim().length < 10) {
      setError('Please provide a more detailed description of your store (at least 10 characters)');
      return;
    }

    setGenerating(true);
    setError(null);
    setGenerationProgress(0, 'Starting generation...');

    try {
      setGenerationProgress(20, 'Analyzing your store description...');

      const result = await generateStore({
        userId,
        userPrompt,
        colorTheme
      });

      if (!result.success || !result.data) {
        throw new Error(result.error || 'Failed to generate store');
      }

      setGenerationProgress(100, 'Complete!');

      // Update store state
      setStoreMetadata(
        result.data.storeName,
        result.data.storeDescription,
        result.data.category
      );
      setSections(result.data.sections);
      if (result.storeId) {
        setStoreId(result.storeId);
      }

      // Switch to preview tab
      setActiveTab('preview');
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate store');
    } finally {
      setGenerating(false);
      setGenerationProgress(0, '');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 flex items-center justify-center gap-3">
            <Sparkles className="w-10 h-10 text-primary" />
            AI Store Builder
          </h1>
          <p className="text-xl text-gray-600">
            Describe your business and watch AI create your perfect online store
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="space-y-6">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="builder" className="flex items-center gap-2">
              <Code className="w-4 h-4" />
              Builder
            </TabsTrigger>
            <TabsTrigger value="preview" className="flex items-center gap-2" disabled={sections.length === 0}>
              <Eye className="w-4 h-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="builder" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Describe Your Store</CardTitle>
                <CardDescription>
                  Tell us about your business, products, and target audience. The more details you provide, the better!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="prompt">Store Description</Label>
                  <Textarea
                    id="prompt"
                    placeholder="Example: I want to create an online store for handmade organic skincare products. My target audience is environmentally conscious women aged 25-45. I want a clean, natural aesthetic with earthy tones. I sell face creams, body lotions, and natural soaps."
                    value={userPrompt}
                    onChange={(e) => setUserPrompt(e.target.value)}
                    disabled={isGenerating}
                    className="min-h-[150px] text-base"
                  />
                  <p className="text-sm text-gray-500">
                    {userPrompt.length} characters (minimum 10 recommended)
                  </p>
                </div>

                {error && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
                    {error}
                  </div>
                )}

                {isGenerating && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-medium">{generationProgress}% Complete</span>
                    </div>
                    <Progress value={generationProgress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={handleGenerate}
                  disabled={isGenerating || userPrompt.trim().length < 10}
                  size="lg"
                  className="w-full text-lg"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Generating Your Store...
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-5 h-5 mr-2" />
                      Generate Store with AI
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="w-5 h-5" />
                  Choose Color Theme
                </CardTitle>
                <CardDescription>
                  Select a color theme for your store. You can customize colors later.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {Object.entries(DEFAULT_THEMES).map(([name, theme]) => (
                    <ThemeCard
                      key={name}
                      name={name}
                      theme={theme}
                      isSelected={colorTheme.primary === theme.primary}
                      onSelect={() => setColorTheme(theme)}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            {sections.length > 0 ? (
              <Card>
                <CardHeader>
                  <CardTitle>Store Preview</CardTitle>
                  <CardDescription>
                    Here's your AI-generated store. You can edit sections and customize content later.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="border rounded-lg overflow-hidden">
                    <StoreRenderer sections={sections} colorTheme={colorTheme} />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Sparkles className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                  <p className="text-lg text-gray-600">
                    No store generated yet. Go to the Builder tab to create your store!
                  </p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

interface ThemeCardProps {
  name: string;
  theme: ColorTheme;
  isSelected: boolean;
  onSelect: () => void;
}

function ThemeCard({ name, theme, isSelected, onSelect }: ThemeCardProps) {
  return (
    <button
      onClick={onSelect}
      className={`p-4 rounded-lg border-2 transition-all hover:shadow-lg ${
        isSelected ? 'border-primary shadow-md' : 'border-gray-200'
      }`}
    >
      <div className="space-y-2">
        <p className="font-semibold capitalize text-sm">{name}</p>
        <div className="flex gap-1">
          <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.primary }} />
          <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.secondary }} />
          <div className="w-8 h-8 rounded" style={{ backgroundColor: theme.accent }} />
        </div>
      </div>
    </button>
  );
}
