'use server'
import { google } from "@ai-sdk/google";
import { streamText } from "ai";



export async function generate(prompt:string){
const result = await streamText({
    model: google('models/gemini-1.5-flash-latest'),
    prompt: prompt,
  });
  return {textStream: result.textStream}; 
}