import { atom, useAtomValue, useSetAtom, useAtom } from "jotai";
import { parse } from "path";
import { useCallback } from "react";

export type Message = {
  createdAt?: Date;
  content: string;
  role: "system" | "user" | "assistant" | "function";
};

export const messageAtom = atom<Message | null>(null);

export const inputAtom = atom("");
export const isLoadingAtom = atom(false);
export const isErrorAtom = atom(false);

export function useChat() {
  const setMessage = useSetAtom(messageAtom);
  const [input, setInput] = useAtom(inputAtom);
  const setError = useSetAtom(isErrorAtom);
  const setLoading = useSetAtom(isLoadingAtom);

  const searchHandler = useCallback(async () => {
    const body = JSON.stringify({ message: input });
    setInput("");
    setLoading(true);
    let res;
    try {
      res = await fetch("http://127.0.0.1:8000/stream", {
        method: "POST",
        body,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      setError(true);
      setLoading(false);
      return;
    }

    const reader = res.body?.getReader();
    const decoder = new TextDecoder("utf-8");

    const handleStreamRecursively = async () => {
      if (!reader) {
        //need message about no reader
        setError(true);
        return;
      }
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
        // console.log(data);
        const parsedData = JSON.parse(data);
        console.log(parsedData);
        setMessage(e => {
          return {
            content: e?.content + parsedData.data,
            role: "assistant",
          } as Message;
        });
      });

      await handleStreamRecursively();
    };

    await handleStreamRecursively();
    setLoading(false);
  }, [input, setError, setLoading, setMessage, setInput]);

  return {
    searchHandler,
  };
}
