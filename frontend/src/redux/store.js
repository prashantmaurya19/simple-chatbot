import { configureStore } from "@reduxjs/toolkit";
import chatMessagesSlice from "./chat-messages";

export const store = configureStore({
  reducer: { chatmessages: chatMessagesSlice },
});
