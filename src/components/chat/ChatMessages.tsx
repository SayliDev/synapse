import { chatTransition } from "@/styles/animations/chatTransition";
import { ChatMessagesProps } from "@/types/chatType";
import STYLE_CONSTANTS from "@/utils/styleConstants";
import { AnimatePresence, motion } from "framer-motion";
import ChatIntro from "./ChatIntro";
import ChatMessage from "./ChatMessage";

export const ChatMessages = ({
  currentChat,
  containerRef,
}: ChatMessagesProps) => (
  <AnimatePresence mode="wait">
    {!currentChat || currentChat.messages.length === 0 ? (
      <motion.div
        key="intro"
        variants={chatTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={STYLE_CONSTANTS.messageWrapper}
      >
        <ChatIntro />
      </motion.div>
    ) : (
      <motion.div
        key="chat"
        variants={chatTransition}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`${STYLE_CONSTANTS.messageWrapper} pb-32`}
      >
        {currentChat.messages.map((message) => (
          <ChatMessage
            key={message.id}
            content={message.content}
            isAi={message.isAi}
            containerRef={containerRef}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
);
