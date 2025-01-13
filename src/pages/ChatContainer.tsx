import ChatIntro from "@/components/chat/ChatIntro";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageBar from "@/components/MessageBar";
import { TooltipProvider } from "@/components/ui/tooltip";
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
          content: `
          
# Titre de Niveau 1

## Titre de Niveau 2

### Titre de Niveau 3

**Texte en gras**  
*Texte en italique*  
~~Texte barré~~  

> Ceci est une citation.  

[Un lien vers OpenAI](https://www.openai.com)  
![Une image descriptive](https://placehold.co/150)

- Liste non ordonnée :
  - Élément 1
  - Élément 2
    - Sous-élément

1. Liste ordonnée :
   1. Premier élément
   2. Deuxième élément

\`Du code inline\`

\`\`\`javascript
// Exemple de code en bloc
function helloWorld() {
  console.log("Hello, World!");
}
\`\`\`

| Titre 1  | Titre 2     | Titre 3  |
|----------|-------------|----------|
| Cellule  | Une autre   | Encore   |
| Contenu  | Exemple     | Plus     |
`,
          isAi: true,
        },
      ]);
    }, 1000);
  };

  return (
    <TooltipProvider>
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
    </TooltipProvider>
  );
};

export default ChatContainer;
