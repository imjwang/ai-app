import { NextRequest, NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  // Extract the body and headers from the incoming request
  const requestBody = await req.text();

  // Forward the request to the desired endpoint
  const forwardedResponse = await fetch("http://127.0.0.1:8000/stream", {
    method: "POST",
    body: requestBody,
    headers: {
      "Content-Type": "application/json",
    },
  });

  // If the response is a stream, we'll forward it as such
  if (forwardedResponse.body) {
    const readable = forwardedResponse.body.getReader();
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await readable.read();

          if (done) {
            controller.close();
            return;
          }

          controller.enqueue(value);
        }
      },
    });

    return new NextResponse(stream, {
      headers: {
        ...Object.fromEntries(forwardedResponse.headers.entries()),
        "Content-Type":
          forwardedResponse.headers.get("Content-Type") ||
          "application/octet-stream",
      },
      status: forwardedResponse.status,
    });
  } else {
    // If for some reason it's not a stream, handle normally
    const responseData = await forwardedResponse.json();
    return NextResponse.json(responseData);
  }
}
