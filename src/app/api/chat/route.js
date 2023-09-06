import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const llamaCpp = new OpenAI({
  baseURL: "http://localhost:8000/v1",
});

export const runtime = "edge";

export async function POST(req) {
  const { messages } = await req.json();
  const response = await llamaCpp.chat.completions.create({
    stream: true,
    max_tokens: 1000,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
