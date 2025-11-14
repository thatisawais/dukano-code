import OpenAI from 'openai';

// Initialize OpenAI client
export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

/**
 * Rank layouts based on relevance to user prompt using AI
 */
export async function rankLayoutRelevance(
  userPrompt: string,
  layoutKeywords: string[],
  layoutId: string
): Promise<{ score: number; reasoning: string }> {
  try {
    const prompt = `
You are an AI assistant helping to rank layout relevance for a store builder.

User's store description: "${userPrompt}"

Layout keywords: ${layoutKeywords.join(', ')}

On a scale of 0 to 100, how relevant is this layout to the user's store description?
Consider the business type, industry, style, and overall theme.

Respond ONLY with a JSON object in this exact format:
{
  "score": <number between 0-100>,
  "reasoning": "<brief explanation>"
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a layout ranking assistant. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.3,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    const result = JSON.parse(content);
    return {
      score: Math.max(0, Math.min(100, result.score)),
      reasoning: result.reasoning
    };
  } catch (error) {
    console.error(`Error ranking layout ${layoutId}:`, error);
    // Fallback to keyword-based scoring
    return fallbackKeywordScoring(userPrompt, layoutKeywords);
  }
}

/**
 * Fallback scoring based on keyword matching
 */
function fallbackKeywordScoring(
  userPrompt: string,
  keywords: string[]
): { score: number; reasoning: string } {
  const promptLower = userPrompt.toLowerCase();
  const matchingKeywords = keywords.filter(keyword =>
    promptLower.includes(keyword.toLowerCase())
  );

  const score = Math.min(100, (matchingKeywords.length / keywords.length) * 100);

  return {
    score,
    reasoning: `Keyword-based scoring: ${matchingKeywords.length}/${keywords.length} keywords matched`
  };
}

/**
 * Generate content for a specific section using AI
 */
export async function generateSectionContent(
  userPrompt: string,
  sectionType: string,
  layoutVariant: string,
  requiredFields: string[]
): Promise<Record<string, any>> {
  try {
    const prompt = `
You are an AI content generator for a store builder application.

User's store description: "${userPrompt}"

Section type: ${sectionType}
Layout variant: ${layoutVariant}

Generate compelling content for the following fields: ${requiredFields.join(', ')}

Guidelines:
- Make the content relevant to the user's store description
- Use persuasive, engaging language
- Keep headlines concise (5-10 words)
- Keep descriptions to 1-2 sentences
- For product sections, generate realistic product examples based on the store type
- For testimonials, create believable customer reviews
- Maintain a professional but approachable tone

Respond ONLY with a JSON object where keys are the required fields.

Special field formats:
- If "products" is a field, return an array of 3-6 product objects with: name, description, price, image (placeholder URL)
- If "testimonials" is a field, return an array of 3 testimonial objects with: quote, authorName, authorTitle, rating (1-5), authorImage (placeholder URL)
- If "links" is a field, return an array of link objects with: text, url
- If "benefits" is a field, return an array of 3-4 benefit strings
- For image/video URLs, use placeholder services like "https://placehold.co/800x600/png?text=Hero+Image"

Respond with valid JSON only.
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a professional content generator. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error(`Error generating content for ${sectionType}:`, error);
    // Return fallback content
    return generateFallbackContent(sectionType, requiredFields);
  }
}

/**
 * Fallback content generation
 */
function generateFallbackContent(
  sectionType: string,
  requiredFields: string[]
): Record<string, any> {
  const fallback: Record<string, any> = {};

  requiredFields.forEach(field => {
    switch (field) {
      case 'headline':
        fallback[field] = 'Welcome to Our Store';
        break;
      case 'subheadline':
        fallback[field] = 'Discover amazing products and services';
        break;
      case 'ctaPrimary':
        fallback[field] = 'Get Started';
        break;
      case 'ctaSecondary':
        fallback[field] = 'Learn More';
        break;
      case 'sectionTitle':
        fallback[field] = 'Our Products';
        break;
      case 'products':
        fallback[field] = [
          {
            name: 'Product 1',
            description: 'Amazing product',
            price: '$99.99',
            image: 'https://placehold.co/400x400/png?text=Product+1'
          },
          {
            name: 'Product 2',
            description: 'Great product',
            price: '$149.99',
            image: 'https://placehold.co/400x400/png?text=Product+2'
          },
          {
            name: 'Product 3',
            description: 'Fantastic product',
            price: '$199.99',
            image: 'https://placehold.co/400x400/png?text=Product+3'
          }
        ];
        break;
      case 'testimonials':
        fallback[field] = [
          {
            quote: 'Great experience!',
            authorName: 'John Doe',
            authorTitle: 'Customer',
            rating: 5,
            authorImage: 'https://placehold.co/100x100/png?text=JD'
          }
        ];
        break;
      default:
        fallback[field] = `Default ${field}`;
    }
  });

  return fallback;
}

/**
 * Extract store metadata from user prompt
 */
export async function extractStoreMetadata(
  userPrompt: string
): Promise<{ storeName: string; storeDescription: string; category: string }> {
  try {
    const prompt = `
Analyze this store description and extract key metadata: "${userPrompt}"

Determine:
1. A suitable store name (if not explicitly mentioned, create one based on the description)
2. A concise store description (1-2 sentences)
3. The primary business category (e.g., fashion, tech, food, services, etc.)

Respond ONLY with a JSON object:
{
  "storeName": "<store name>",
  "storeDescription": "<description>",
  "category": "<category>"
}
`;

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a business analyst. Always respond with valid JSON only.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.5,
      response_format: { type: 'json_object' }
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No content in AI response');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error extracting store metadata:', error);
    return {
      storeName: 'My Store',
      storeDescription: userPrompt.slice(0, 200),
      category: 'general'
    };
  }
}
