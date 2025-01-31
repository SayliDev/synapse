import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  addMessageThunk,
  createChatThunk,
  deleteChatThunk,
  fetchChatsThunk,
} from "@/store/slices/chatSlice";
import { useToast } from "./useToast";
import { EnhancedMessage } from "@/types/chatType";

export const useChat = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();

  // Sélecteurs
  const activeChat = useSelector((state: RootState) => state.chat.activeChat);
  const currentChat = useSelector((state: RootState) =>
    state.chat.chats.find((chat) => chat.id === activeChat)
  );
  const [isLoading, setIsLoading] = useState(false);

  // Création de message
  const createMessage = (content: string, isAi: boolean): EnhancedMessage => ({
    content,
    isAi,
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    status: "sent",
    annotations: [],
  });

  // Gestion de l'envoi de message
  const handleSendMessage = useCallback(
    async (content: string) => {
      try {
        setIsLoading(true);
        let targetChatId = activeChat;

        // Création d'une nouvelle conversation si nécessaire
        if (!targetChatId) {
          const result = await dispatch(createChatThunk()).unwrap();
          targetChatId = result.id;
        }

        // Ajout du message utilisateur
        const userMessage = createMessage(content, false);
        await dispatch(
          addMessageThunk({
            chatId: targetChatId,
            message: userMessage,
          })
        ).unwrap();

        // Simulation réponse IA
        const aiResponse = await new Promise<string>((resolve) =>
          setTimeout(
            () =>
              resolve(
                "# Titre de Niveau 1\n\n## Titre de Niveau 2\n\n### Titre de Niveau 3"
              ),
            1000
          )
        );

        // Ajout réponse IA
        const aiMessage = createMessage(aiResponse, true);
        await dispatch(
          addMessageThunk({
            chatId: targetChatId,
            message: aiMessage,
          })
        ).unwrap();
      } catch (error) {
        console.error("Erreur lors de l'envoi du message:", error);
        toast({
          variant: "destructive",
          title: "Erreur de communication",
          description:
            error instanceof Error ? error.message : "Une erreur est survenue",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [activeChat, dispatch, toast]
  );

  // Gestion de la suppression de chat
  const handleDeleteChat = useCallback(
    async (chatId: string) => {
      try {
        await dispatch(deleteChatThunk(chatId)).unwrap();
        toast({
          title: "Conversation supprimée",
          description: "La conversation a été supprimée avec succès",
        });
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        toast({
          variant: "destructive",
          title: "Erreur de suppression",
          description:
            error instanceof Error ? error.message : "Échec de la suppression",
        });
      }
    },
    [dispatch, toast]
  );

  // Chargement initial des conversations
  const loadChats = useCallback(async () => {
    try {
      setIsLoading(true);
      await dispatch(fetchChatsThunk()).unwrap();
    } catch (error) {
      console.error("Erreur de chargement:", error);
      toast({
        variant: "destructive",
        title: "Erreur de chargement",
        description: "Impossible de charger les conversations",
      });
    } finally {
      setIsLoading(false);
    }
  }, [dispatch, toast]);

  return {
    currentChat,
    isLoading,
    handleSendMessage,
    handleDeleteChat,
    loadChats,
    activeChatId: activeChat,
  };
};
