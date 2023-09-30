import OpenAI from "openai";
import { NextResponse } from "next/server";

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

  NextResponse.json(response);
}
