import { RootState } from "@/store";
import { addMessage, createChat } from "@/store/slices/chatSlice";
import { Message } from "@/types/chatType";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "./useToast";

export const useChat = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const activeChat = useSelector((state: RootState) => state.chat.activeChat);
  const currentChat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat.id === activeChat)
  );

  const [isLoading, setIsLoading] = useState(false);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);

  const createMessage = (content: string, isAi: boolean): Message => ({
    content,
    isAi,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
  });

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
              `  # Titre de Niveau 1\n\n## Titre de Niveau 2\n\n### Titre de Niveau 3`
            );
          }, 1000)
        );

        // Ajout de la réponse AI
        const aiMessage = createMessage(aiResponse, true);
        dispatch(addMessage({ chatId: activeChat, message: aiMessage }));
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);

        toast({
          variant: "destructive",
          title: "Erreur lors de l'envoi du message",
          description:
            error instanceof Error
              ? error.message
              : "Veuillez essayer plus tard.",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [activeChat, toast, dispatch]
  );

  return {
    currentChat,
    isLoading,
    pendingMessage,
    setPendingMessage,
    handleSendMessage,
  };
};
