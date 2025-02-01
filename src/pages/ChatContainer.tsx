import { ChatMessages } from "@/components/chat/ChatMessages";
import MessageBar from "@/components/MessageBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useChat } from "@/hooks/useChat";
import { useScrollToBottom } from "@/hooks/useScrollToBottom";
import { STYLE_CONSTANTS } from "@/utils/constants";
import { motion } from "framer-motion";
import { useRef } from "react";

const ChatContainer = () => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const { currentChat, isLoading, handleSendMessage } = useChat();

  useScrollToBottom(messagesContainerRef, currentChat);

  return (
    <TooltipProvider>
      <div className={STYLE_CONSTANTS.container}>
        <div
          ref={messagesContainerRef}
          className={STYLE_CONSTANTS.messagesContainer}
        >
          <ChatMessages
            currentChat={currentChat}
            containerRef={messagesContainerRef}
          />
        </div>
        <motion.div
          className={STYLE_CONSTANTS.messageBar}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="mx-auto py-4">
            <MessageBar
              onSendMessage={handleSendMessage}
              isLoading={isLoading}
            />
          </div>
        </motion.div>
      </div>
    </TooltipProvider>
  );
};

export default ChatContainer;
