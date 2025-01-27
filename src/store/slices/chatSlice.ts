import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EnhancedMessage } from "../../types/chatType";

interface Chat {
  id: string;
  title: string;
  messages: EnhancedMessage[];
  createdAt: string;
}

interface ChatState {
  chats: Chat[];
  activeChat: string | null;
}

const initialState: ChatState = {
  chats: [],
  activeChat: null,
};

export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    createChat: (state) => {
      const newChat: Chat = {
        id: crypto.randomUUID(),
        title: "New Chat",
        messages: [],
        createdAt: new Date().toISOString(),
      };
      state.chats.push(newChat);
      state.activeChat = newChat.id;
    },
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    addMessage: (
      state,
      action: PayloadAction<{ chatId: string; message: EnhancedMessage }>
    ) => {
      const chat = state.chats.find((c) => c.id === action.payload.chatId);
      if (chat) {
        chat.messages.push(action.payload.message);
        // Mise à jour du titre de la conversation basé sur le premier message de l'user si elle reste "New Chat"
        if (chat.title === "New Chat" && !action.payload.message.isAi) {
          chat.title = action.payload.message.content.slice(0, 30) + "...";
        }
      }
    },
    deleteChat: (state, action: PayloadAction<string>) => {
      state.chats = state.chats.filter((chat) => chat.id !== action.payload);
      if (state.activeChat === action.payload) {
        state.activeChat = state.chats[0]?.id || null;
      }
    },
  },
});

export const { createChat, setActiveChat, addMessage, deleteChat } =
  chatSlice.actions;
export default chatSlice.reducer;
