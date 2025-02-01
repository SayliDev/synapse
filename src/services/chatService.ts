import { db } from "@/lib/firebase";
import { Chat, EnhancedMessage } from "@/types/chatType";
import {
  arrayUnion,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export const chatService = {
  async createChat(newChat: Chat, userId: string) {
    newChat.userId = userId;
    await setDoc(doc(db, "chats", newChat.id), newChat);
    return newChat;
  },

  async fetchChats(userId: string) {
    const q = query(
      collection(db, "chats"),
      where("userId", "==", userId),
      orderBy("createdAt", "desc")
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => doc.data() as Chat);
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
