import { configureStore } from "@reduxjs/toolkit";
// import conversationReducer from "./slices/conversationSlice";
import chatReducer from "./slices/chatSlice";

export const store = configureStore({
  reducer: {
    // conversation: conversationReducer,
    chat: chatReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
