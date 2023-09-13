export async function POST(req) {
  const { file } = await req.json();
  const response = await llamaCpp.chat.completions.create({
    model: "gpt-3.5-turbo",
    stream: true,
    max_tokens: 1000,
    messages,
  });
  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
