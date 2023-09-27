import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const llamaCpp = new OpenAI({
  baseURL: "http://localhost:8000/",
  // baseURL: "http://localhost:8000/",
  // apiKey: process.env.OPENAI_API_KEY,
});

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();
  const response = await llamaCpp.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 1000,
    messages,
  });
  const res2 = await fetch("http://127.0.0.1:8000/chat/completions", {
    method: "POST",
    body: { message: "write a song about Jeff!" },
    headers: {
      "Content-Type": "application/json",
    },
  });

  console.log(res2);
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
