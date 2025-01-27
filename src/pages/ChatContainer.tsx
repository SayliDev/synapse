import ChatIntro from "@/components/chat/ChatIntro";
import ChatMessage from "@/components/chat/ChatMessage";
import MessageBar from "@/components/MessageBar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { RootState } from "@/store";
import { addMessage, createChat } from "@/store/slices/chatSlice";
import { chatTransition } from "@/styles/animations/chatTransition";
import STYLE_CONSTANTS from "@/utils/styleConstants";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const ChatContainer = () => {
  const dispatch = useDispatch();
  const activeChat = useSelector((state: RootState) => state.chat.activeChat);
  const currentChat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat.id === activeChat)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const createMessage = (content: string, isAi: boolean) => ({
    content,
    isAi,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  });

  /* -------------------------------------------------------------------------- */
  /*                      Gestion du scroll avec useEffect                      */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    // Scroll to bottom when messages are updated
    if (messagesContainerRef.current && currentChat?.messages.length) {
      messagesContainerRef.current.scrollTop =
        messagesContainerRef.current.scrollHeight;
    }
  }, [currentChat?.messages]);

  /* -------------------------------------------------------------------------- */
  /*                      Fonction pour générer un message                      */
  /* -------------------------------------------------------------------------- */

  const handleSendMessage = useCallback(
    async (content: string) => {
      if (!activeChat) {
        // Crée une conversation si aucune n'est active
        setPendingMessage(content); // Stocke le message en attente
        dispatch(createChat());
        return;
      }

      try {
        setIsLoading(true);

        // Ajout du message utilisateur
        const userMessage = createMessage(content, false);
        dispatch(addMessage({ chatId: activeChat, message: userMessage }));

        // Simulation de réponse API
        const aiResponse = await new Promise<string>((resolve) =>
          setTimeout(() => {
            resolve(
              ` # Titre de Niveau 1\n\n## Titre de Niveau 2\n\n### Titre de Niveau 3`
            );
          }, 1000)
        );

        // Ajout de la réponse AI
        const aiMessage = createMessage(aiResponse, true);
        dispatch(addMessage({ chatId: activeChat, message: aiMessage }));
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [activeChat, dispatch]
  );

  useEffect(() => {
    // Envoie un message en attente une fois la conversation créée
    if (pendingMessage && activeChat) {
      handleSendMessage(pendingMessage);
      setPendingMessage(null);
    }
  }, [activeChat, pendingMessage, handleSendMessage]); // Exécute lorsque activeChat change

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
