import ChatIntro from "@/components/chat/ChatIntro";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageBar from "@/components/MessageBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import STYLE_CONSTANTS from "@/utils/styleConstants";
import { chatTransition } from "@/styles/animations/chatTransition";
import { EnhancedMessage } from "@/types/chatType";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

const ChatContainer = () => {
  const [messages, setMessages] = useState<EnhancedMessage[]>([]);
  const [showIntro, setShowIntro] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  /* -------------------------------------------------------------------------- */
  /*                      Fonction pour générer un message                      */
  /* -------------------------------------------------------------------------- */

  const createMessage = (content: string, isAi: boolean): EnhancedMessage => ({
    content,
    isAi,
    id: crypto.randomUUID(),
    timestamp: new Date(),
  });

  /* -------------------------------------------------------------------------- */
  /*                      Gestion du scroll avec useEffect                      */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  /* -------------------------------------------------------------------------- */
  /*                  Gestion optimisée de l'envoi des messages                 */
  /* -------------------------------------------------------------------------- */

  const handleSendMessage = useCallback(async (content: string) => {
    try {
      setIsLoading(true);
      setShowIntro(false);

      // Ajout du message utilisateur
      const userMessage = createMessage(content, false);
      setMessages((prev) => [...prev, userMessage]);

      // Simulation de réponse API
      const aiResponse = await new Promise<string>((resolve) =>
        setTimeout(() => {
          resolve(`

# Titre de Niveau 1

## Titre de Niveau 2

### Titre de Niveau 3
          `);
        }, 1000)
      );

      // Ajout de la réponse AI
      const aiMessage = createMessage(aiResponse, true);
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Erreur lors de l'envoi du message:", error);
      // TODO ajouter notification d'erreur (toast)
    } finally {
      setIsLoading(false);
    }
  }, []);

  /* -------------------------------------------------------------------------- */
  /*                                   Render                                   */
  /* -------------------------------------------------------------------------- */

  return (
    <TooltipProvider>
      <div className={STYLE_CONSTANTS.container}>
        <div
          ref={messagesContainerRef}
          className={STYLE_CONSTANTS.messagesContainer}
        >
          <AnimatePresence mode="wait">
            {showIntro ? (
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
                {messages.map((message) => (
                  <ChatMessage
                    content={message.content}
                    isAi={message.isAi}
                    containerRef={messagesContainerRef}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
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
