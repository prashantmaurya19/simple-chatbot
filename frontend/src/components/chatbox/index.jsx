//@ts-nocheck
import { twJoin } from "tailwind-merge";
import {
  ChatMessageBox,
  ChatMessageCard,
} from "./chatmsg-box";
import { useSelector } from "react-redux";
import { ChatFormCard } from "./chatform";

export function ChatBox() {
  /** @type {Array<import("./chatmsg-box").ChatMessage>} */
  const msg = useSelector((s) => s.chatmessages.msg_list);
  return (
    <div
      className={twJoin(
        "w-full h-[80vh]",
        "bg-secondary",
        "border-1 border-solid border-border",
        "rounded-2xl",
        "flex flex-col items-end",
        "overflow-y-auto",
        "p-2",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-secondary",
        "[&::-webkit-scrollbar-thumb]:bg-primary",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
      )}
    >
      {msg.map((v, k) => {
        return (
          <ChatMessageBox lr={v.sender == "Ai Response"} key={k}>
            {v.form ? <ChatFormCard /> : <ChatMessageCard msg={v} />}
          </ChatMessageBox>
        );
      })}
    </div>
  );
}
