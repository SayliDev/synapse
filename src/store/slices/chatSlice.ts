// src/store/slices/chatSlice.ts
import { chatService } from "@/services/chatService";
import { Chat, EnhancedMessage } from "@/types/chatType";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

// Thunks
export const fetchChatsThunk = createAsyncThunk("chat/fetchChats", async () => {
  return await chatService.fetchChats();
});

export const createChatThunk = createAsyncThunk("chat/createChat", async () => {
  const newChat = {
    id: crypto.randomUUID(),
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString(),
  };
  return await chatService.createChat(newChat);
});

export const addMessageThunk = createAsyncThunk(
  "chat/addMessage",
  async (payload: { chatId: string; message: EnhancedMessage }) => {
    await chatService.addMessage(payload.chatId, payload.message);
    return payload;
  }
);

export const deleteChatThunk = createAsyncThunk(
  "chat/deleteChat",
  async (chatId: string) => {
    await chatService.deleteChat(chatId);
    return chatId;
  }
);

// Initial state
const initialState: {
  activeChat: string | null;
  searchQuery: string;
  chats: Chat[];
} = {
  activeChat: null,
  searchQuery: "",
  chats: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setActiveChat: (state, action: PayloadAction<string>) => {
      state.activeChat = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatsThunk.fulfilled, (state, action) => {
        state.chats = action.payload;
      })
      .addCase(createChatThunk.fulfilled, (state, action) => {
        state.chats.unshift(action.payload);
        state.activeChat = action.payload.id;
      })
      .addCase(addMessageThunk.fulfilled, (state, action) => {
        const chat = state.chats.find((c) => c.id === action.payload.chatId);
        if (chat) {
          chat.messages.push(action.payload.message);
          if (chat.title === "New Chat" && !action.payload.message.isAi) {
            chat.title = action.payload.message.content.slice(0, 30) + "...";
          }
        }
      })
      .addCase(deleteChatThunk.fulfilled, (state, action) => {
        state.chats = state.chats.filter(
          (chat: Chat) => chat.id !== action.payload
        );
        if (state.activeChat === action.payload) {
          state.activeChat = state.chats[0]?.id || null;
        }
      });
  },
});

export const { setActiveChat, setSearchQuery } = chatSlice.actions;
export default chatSlice.reducer;
