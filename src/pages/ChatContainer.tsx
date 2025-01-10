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
    // Cacher l'intro dès qu'un message est envoyé
    setShowIntro(false);

    // Ajouter le message de l'utilisateur
    setMessages((prev) => [...prev, { content, isAi: false }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          content: `# Hello World
This is some **bold text** and *italic text*.

- Item 1
- Item 2
- Item 3

\`\`\`css
:root {
  font-family: Inter;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@layer base {
  :root {
    --radius: 0.5rem;
  }
}

.custom-pre-bg pre {
  background-color: transparent !important;
}
\`\`\``,
          isAi: true,
        },
      ]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-full w-full sm:w-[62%]">
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
      <div className="fixed bottom-0 left-0 w-screen p-4 pl-4 sm:pl-16">
        <MessageBar onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatContainer;
