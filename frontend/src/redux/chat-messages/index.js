import { formatPrompt } from "@/lib/api";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  title: "New Chat",
  /** @type {Array<import("@/components/chatbox/chatmsg-box").ChatMessage>}*/
  msg_list: [],
  prompt: "",
  chats: {},
};

export const chatMessagesSlice = createSlice({
  name: "chat-messages",
  initialState,
  reducers: {
    pushMessage(state, action) {
      state.msg_list.push(action.payload);
      if (action.payload.msg != "")
        state.prompt = state.prompt.concat(
          `\n${formatPrompt(action.payload.sender, action.payload.msg)}`,
        );
    },
    updateMessage(state, action) {
      state.msg_list[action.payload.index] = {
        ...state.msg_list[action.payload.index],
        ...action.payload.msg,
      };
    },
    updateLastMessage(state, action) {
      state.msg_list[state.msg_list.length - 1] = {
        ...state.msg_list[state.msg_list.length - 1],
        ...action.payload,
      };
      if (
        action.payload.msg != "" &&
        action.payload.msg != "Something Went Wrong"
      )
        state.prompt = state.prompt.concat(
          `\n${formatPrompt(action.payload.sender, action.payload.msg)}`,
        );
    },
  },
});

// Action creators are generated for each case reducer function
export const { pushMessage, updateLastMessage, updateMessage } =
  chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
