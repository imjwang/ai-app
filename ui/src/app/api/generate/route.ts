import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  // Extract the body and headers from the incoming request
  const { message } = await req.json();

  const res = await fetch("http:/127.0.0.1:8000/generate", {
    method: "POST",
    body: JSON.stringify({ message }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const { component } = await res.json();
  console.log(component);
  return NextResponse.json(component);
}
