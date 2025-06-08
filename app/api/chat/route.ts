import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(req: Request) {
  const { messages } = await req.json();

  const { text } = await generateText({
model: google("models/gemini-2.0-flash-exp"),
prompt: messages
})

  return text
}