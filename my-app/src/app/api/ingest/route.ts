import { COMPLEX_HEADER, createChunkDecoder } from "ai";
import { NextResponse } from "next/server";
// import { useSetAtom } from "jotai";
// import { chatAtom } from "@/lib/utils";

export async function GET() {
  const body = JSON.stringify({ message: "What does Jeff's father do?" });
  // const setMessage = () => useSetAtom(chatAtom);

  const res = await fetch("http://127.0.0.1:8000/stream", {
    method: "POST",
    body,
    headers: {
      "Content-Type": "application/json",
    },
  });

  const reader = res.body?.getReader();
  // const isComplexMode = res.headers.get(COMPLEX_HEADER) === "true";
  // const decode = createChunkDecoder();
  const decoder = new TextDecoder("utf-8");

  const handleStreamRecursively = async () => {
    const { done, value } = await reader.read();

    if (done) {
      return;
    }

    const dataStrings = decoder
      .decode(value)
      .trim()
      .split("data: ")
      .filter(Boolean);

    dataStrings.forEach((data: any) => {
      const parsedData = JSON.parse(data);
      console.log(parsedData);

      // setMessage((e) => e + parsedData);
    });

    await handleStreamRecursively();
  };

  await handleStreamRecursively();

  // let streamedResponse = "";
  // while (true) {
  //   const { done, value } = await reader.read();
  //   if (done) break;
  //   streamedResponse += decode(value);
  //   console.log(streamedResponse);
  // }
  // console.log(streamedResponse);

  // const res = await fetch("http://127.0.0.1:8000/test");
  // const json = await res.json();
  // console.log(json);
  return NextResponse.json({ message: "Hello, world!" });
}
