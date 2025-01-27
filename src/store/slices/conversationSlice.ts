// import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// type Message = {
//   id: string;
//   sender: "user" | "ai";
//   content: string;
//   timestamp: string;
// };

// type Conversation = {
//   id: string;
//   messages: Message[];
// };

// const initialState = {
//   conversations: [] as Conversation[],
//   activeConversationId: null as string | null,
// };

// const conversationSlice = createSlice({
//   name: "conversation",
//   initialState,
//   reducers: {
//     addConversation: (state, action: PayloadAction<{ id: string }>) => {
//       state.conversations.push({ id: action.payload.id, messages: [] });
//       state.activeConversationId = action.payload.id;
//     },
//     addMessage: (
//       state,
//       action: PayloadAction<{ conversationId: string; message: Message }>
//     ) => {
//       const conversation = state.conversations.find(
//         (c) => c.id === action.payload.conversationId
//       );
//       if (conversation) conversation.messages.push(action.payload.message);
//     },
//     setActiveConversation: (state, action: PayloadAction<string>) => {
//       state.activeConversationId = action.payload;
//     },
//   },
// });

// export const { addConversation, addMessage, setActiveConversation } =
//   conversationSlice.actions;
// export default conversationSlice.reducer;
