'use server'
import { google } from "@ai-sdk/google";
import { streamText } from "ai";



export async function generate(prompt:string){
const result = await streamText({
    model: google('gemini-2.0-flash'),
    prompt: prompt,
  });
  return {textStream: result.textStream}; 
}