import useTypewriterEffect from "@/hooks/useTypewriterEffect";
import { ChatMessageProps } from "@/types/chatType";
import { memo, useCallback, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import MarkdownRenderer from "../ui/MarkdownRenderer";
import MessageActions from "./MessageActions";
import { motion } from "framer-motion";

const ChatMessage = ({ content, isAi, containerRef }: ChatMessageProps) => {
  const messageRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                   Fonction pour faire scroll vers le bas                   */
  /* -------------------------------------------------------------------------- */

  const scrollToBottom = useCallback(() => {
    if (containerRef.current && messageRef.current) {
      const messageElement = messageRef.current;
      const container = containerRef.current;
      const scrollPosition =
        messageElement.offsetTop + messageElement.clientHeight;
      const containerHeight = container.clientHeight;
      const offset = 100;

      container.scrollTo({
        top: scrollPosition - containerHeight + offset,
        behavior: "smooth",
      });
    }
  }, [containerRef]);

  const visibleContent = useTypewriterEffect(content, isAi, scrollToBottom);

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <motion.div
      key={content}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      ref={messageRef}
      className={`flex gap-4 items-start p-4 ${
        isAi ? "" : "flex-row-reverse text-right items-start"
      }`}
      role="article"
      aria-label={isAi ? "Message de l'assistant" : "Votre message"}
    >
      <Avatar>
        {isAi ? (
          <AvatarFallback>IA</AvatarFallback>
        ) : (
          <AvatarImage src="https://github.com/shadcn.png" alt="user" />
        )}
      </Avatar>
      <div className={`flex-1 ${isAi ? "prose prose-invert" : ""}`}>
        {isAi ? (
          <MarkdownRenderer content={visibleContent} />
        ) : (
          <p className="text-zinc-50">{content}</p>
        )}
        <MessageActions isAi={isAi} />
      </div>
    </motion.div>
  );
};

export default memo(ChatMessage);
