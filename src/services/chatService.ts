import { db } from "@/lib/firebase";
import { Chat, EnhancedMessage } from "@/types/chatType";
import {
  collection,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  getDocs,
  arrayUnion,
  query,
  orderBy,
} from "firebase/firestore";

export const chatService = {
  async createChat(newChat: Chat) {
    try {
      await setDoc(doc(db, "chats", newChat.id), newChat);
      return newChat;
    } catch (error) {
      console.error("Error creating chat:", error);
      throw error;
    }
  },

  async fetchChats() {
    try {
      const querySnapshot = await getDocs(
        query(collection(db, "chats"), orderBy("createdAt", "desc"))
      );
      return querySnapshot.docs.map((doc) => doc.data() as Chat);
    } catch (error) {
      console.error("Error fetching chats:", error);
      throw error;
    }
  },

  async addMessage(chatId: string, message: EnhancedMessage) {
    try {
      const chatRef = doc(db, "chats", chatId);
      await updateDoc(chatRef, {
        messages: arrayUnion(message),
        ...(message.isAi
          ? {}
          : {
              title: message.content.slice(0, 30) + "...",
            }),
      });
    } catch (error) {
      console.error("Error adding message:", error);
      throw error;
    }
  },

  async deleteChat(chatId: string) {
    try {
      await deleteDoc(doc(db, "chats", chatId));
    } catch (error) {
      console.error("Error deleting chat:", error);
      throw error;
    }
  },
};
