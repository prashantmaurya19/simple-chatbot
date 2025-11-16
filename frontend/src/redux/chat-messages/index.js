import { formatPrompt } from "@/lib/api";
import { createSlice } from "@reduxjs/toolkit";

function saveData(chats) {
  localStorage.setItem("user_chat", JSON.stringify(chats));
}
function loadData() {
  const data = localStorage.getItem("user_chat");
  return data == undefined ? [] : JSON.parse(data);
}

/**
 * @param {string} msg
 * @param {import("@/components/chatbox/chatmsg-box").SenderType} sender
 * @param {string} prompt
 */
function concatPrompt(msg, sender, prompt) {
  return msg == "" || msg == "Something Went Wrong"
    ? prompt
    : prompt.concat(`\n${formatPrompt(sender, msg)}`);
}

/**
 * @param {string} prev_title
 * @param {string} title
 */
function handleUpdateChatTitle(prev_title, title) {
  console.log(prev_title, title);
  return title == undefined || title == "" ? prev_title : title;
}
const initialState = {
  title: "New Chat",
  /** @type {Array<import("@/components/chatbox/chatmsg-box").ChatMessage>}*/
  msg_list: [],
  prompt: "",
  index: -1,
  chats: loadData(),
};

export const chatMessagesSlice = createSlice({
  name: "chat-messages",
  initialState,
  reducers: {
    createNewChat(state, action) {
      if (state.index == -1) return;
      state.chats[state.index].messages = state.msg_list;
      saveData();
      state.index = -1;
      state.title = "New Chat";
      state.msg_list = [];
      state.prompt = "";
    },
    openChat(state, action) {
      if (action.payload == state.index) return;
      state.index = action.payload;
      state.title = state.chats[state.index].title;
      state.msg_list = state.chats[state.index].messages;
      state.prompt = state.msg_list.reduce((pre, curr, i) => {
        return pre.concat(`\n${formatPrompt(curr.sender, curr.msg)}`);
      }, "");
    },
    pushMessage(state, action) {
      state.msg_list.push(action.payload);
      state.prompt = concatPrompt(
        action.payload.msg,
        action.payload.sender,
        state.prompt,
      );
      if (state.index > -1) state.chats[state.index].messages = state.msg_list;
      saveData(state.chats);
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
      state.title = handleUpdateChatTitle(state.title, action.payload.title);
      if (state.title !== "New Chat" && state.index == -1) {
        state.index = 0;
        state.chats.unshift({ title: state.title, messages: state.msg_list });
      }
      if (state.index > -1) state.chats[state.index].messages = state.msg_list;
      state.prompt = concatPrompt(
        action.payload.msg,
        action.payload.sender,
        state.prompt,
      );
      saveData(state.chats);
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  pushMessage,
  openChat,
  createNewChat,
  updateLastMessage,
  updateMessage,
} = chatMessagesSlice.actions;

export default chatMessagesSlice.reducer;
