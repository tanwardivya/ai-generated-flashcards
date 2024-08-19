import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

// Define the type for flashcards
interface Flashcard {
  front: string;
  back: string;
}

interface FlashcardResponse {
  flashcards: Flashcard[];
}

const systemPrompt = `
You are a flashcard generator. Your task is to generate flashcards based on the given topic or content. Follow these guidelines:
1. Create clear and concise questions for the front of the flashcard.
2. Provide accurate and detailed answers on the back of the flashcard.
3. Focus on one key concept or fact per flashcard.
4. Use bullet points or short sentences for clarity.
5. Include relevant examples to illustrate concepts.
6. Utilize images or diagrams to enhance visual learning.
7. Emphasize important terms with bold or italic text.
8. Group flashcards by related topics for structured learning.
9. Mix question types to engage different aspects of learning.
10. Regularly review and update flashcards for retention.
11. Only generate 10 flashcards

Remember, the goal is to facilitate learning and improve retention of information through these flashcards.

Return in the following JSON format:
{
  "flashcards": [{
    "front": string,
    "back": string
  }]
}
`;

export async function POST(req: NextRequest): Promise<NextResponse> {
  const openai = new OpenAI();
  const data = await req.text();

  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: data },
    ],
    model: 'gpt-4o',
  });

  const flashcardsResponse: FlashcardResponse = JSON.parse(completion.choices[0].message?.content || '{}');

  return NextResponse.json(flashcardsResponse.flashcards);
}
