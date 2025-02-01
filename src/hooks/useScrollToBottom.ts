import { Chat } from "@/types/chatType";
import { RefObject, useEffect } from "react";

export const useScrollToBottom = (
  containerRef: RefObject<HTMLDivElement>,
  currentChat: Chat | undefined
) => {
  useEffect(() => {
    if (containerRef.current && currentChat?.messages.length) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [currentChat?.messages, containerRef]);
};
