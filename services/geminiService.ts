import { GoogleGenAI } from "@google/genai";
import { NewsCategory, NewsResponse } from "../types";

export const fetchNews = async (category: NewsCategory): Promise<NewsResponse> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const modelId = 'gemini-2.5-flash';

  const systemInstruction = `
    You are the Editor-in-Chief of "The WorldPress," a prestigious, high-end daily newspaper known for its objective, in-depth, and sophisticated reporting similar to The New York Times or The Financial Times.

    Your Task:
    Create a front-page news digest for the selected category based on real-time Google Search data.

    Style & Formatting Guide (Strict Adherence Required):
    1.  **Tone:** Professional, authoritative, journalistic, and concise. Avoid sensationalism.
    2.  **Format:** Use Markdown.
    3.  **The Lead Story:** Start with one major "Lead Story" that dominates the news cycle. Use a level 2 header (##) for the headline. Follow with 2-3 paragraphs of synthesis, context, and why it matters.
    4.  **Secondary Stories:** Follow with 3-4 significant secondary stories. Use level 3 headers (###) for these. Keep them to 1-2 paragraphs each.
    5.  **Visual Structure:** Do NOT use bullet points for the main narratives. Write in full, flowy paragraphs like a newspaper article.
    6.  **Citations:** Explicitly mention the source publications in the text (e.g., "As reported by The Financial Times...", "According to an investigation by Le Monde...").

    Goal: The user should feel like they are reading the front page of a premium Sunday paper.
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: category.prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
      },
    });

    const text = response.text;
    const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
    
    const groundingChunks = chunks.map((chunk: any) => {
        if (chunk.web) {
            return {
                web: {
                    uri: chunk.web.uri,
                    title: chunk.web.title
                }
            };
        }
        return {};
    }).filter((c: any) => c.web);


    return {
      markdown: text || "No news content available at the moment.",
      groundingChunks: groundingChunks,
      timestamp: new Date().toLocaleTimeString(),
    };

  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
};