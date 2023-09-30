import { atom, useSetAtom, useAtom } from "jotai";
import { useCallback } from "react";
import { nanoid } from "nanoid";

export type Message = {
  id: string;
  createdAt?: Date;
  content: string;
  role: "user" | "assistant";
};
//TODO change into a store + provider
const createChatAtoms = (initialValue = new Map()) => {
  const baseAtom = atom<Map<string, Message>>(initialValue);
  const valueAtom = atom(get => get(baseAtom));

  const setAtom = atom(null, (get, set, update: Message) =>
    set(baseAtom, prev => {
      return new Map(
        prev.set(update.id, {
          id: update.id,
          content: `${prev.has(update.id) ? prev.get(update.id)!.content : ""}${
            update.content
          }`,
          role: update.role,
        } as Message)
      );
    })
  );
  const initAtom = atom(null, (get, set) => {
    set(baseAtom, new Map());
  })
  return {valueAtom, setAtom, initAtom};
};

const {valueAtom: messageAtom, setAtom: setMessageAtom, initAtom} = createChatAtoms();
export { messageAtom, setMessageAtom, initAtom };

export const inputAtom = atom("");
export const isLoadingAtom = atom(false);
export const isErrorAtom = atom(false);

export function useChat() {
  const [, setMessages] = useAtom(setMessageAtom);

  // const setMessage = useSetAtom(messageAtom);
  const [input, setInput] = useAtom(inputAtom);
  const setError = useSetAtom(isErrorAtom);
  const setLoading = useSetAtom(isLoadingAtom);

  const searchHandler = useCallback(async () => {
    const body = JSON.stringify({ message: input });
    const userid = nanoid();
    setMessages({ id: userid, content: input, role: "user" } as Message);
    const resid = nanoid();
    setInput("");
    setLoading(true);
    let res;
    //TODO move this to api route
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
        const parsedData = JSON.parse(data);
        setMessages({
          id: resid,
          content: parsedData.data,
          role: "assistant",
        } as Message);
      });

      await handleStreamRecursively();
    };

    await handleStreamRecursively();
    setLoading(false);
  }, [input, setError, setLoading, setMessages, setInput]);

  return {
    searchHandler,
  };
}
