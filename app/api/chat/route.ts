import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const prompt = messages.map((m: any) => m.role === "user" && m.content).join("\n");

  const { text } = await generateText({
    model: google("models/gemini-2.0-flash-exp"),
    prompt,
  });

  console.log("Generated text:", text);

  return new Response(
    JSON.stringify({
      role: "assistant", // or "ai" (depending on your version of @ai-sdk/react)
      content: text,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
}
