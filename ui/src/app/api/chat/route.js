import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const llamaCpp = new OpenAI({
  // baseURL: "http://localhost:8000/v1",
  apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req) {
  const { messages } = await req.json();
  const response = await llamaCpp.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 1000,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
