// ChatContainer.tsx
import ChatIntro from "@/components/chat/ChatIntro";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageBar from "@/components/MessageBar";
import { useState } from "react";

interface Message {
  content: string;
  isAi: boolean;
}

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [showIntro, setShowIntro] = useState(true);

  const handleSendMessage = async (content: string) => {
    setShowIntro(false);
    setMessages((prev) => [...prev, { content, isAi: false }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: `# Bonjour, 
je suis votre assistant. Que puis-je faire pour vous ?

Je peut faire :
- Rechercher des informations sur un sujet
- Rechercher des informations sur un sujet
- Rechercher des informations sur un sujet`,
          isAi: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col w-full h-full justify-between overflow-y-scroll pt-28 sm:pt-0">
      {/* Wrapper pour centrer le contenu */}
      <div
        className={`lg:max-w-[70%] sm:max-w-[90%] max-w-[100%] mx-auto w-full pt-0 sm:pt-10  px-0  sm:px-6 ${
          showIntro ? "" : "pb-28 "
        }`}
      >
        {showIntro ? (
          <ChatIntro />
        ) : (
          messages.map((message, index) => (
            <ChatMessage
              key={index}
              content={message.content}
              isAi={message.isAi}
            />
          ))
        )}
      </div>
      {/* Barre de message fixe en bas */}
      <div className="sticky bottom-0 w-full max-w-[90%]  sm:max-w-[70%] mx-auto bg-background/80 backdrop-blur-sm">
        <div className="mx-auto py-4">
          <MessageBar onSendMessage={handleSendMessage} />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
