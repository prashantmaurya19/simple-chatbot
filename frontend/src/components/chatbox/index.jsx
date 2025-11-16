//@ts-nocheck
import { twJoin } from "tailwind-merge";
import { ChatMessageBox, ChatMessageCard } from "./chatmsg-box";
import { useSelector } from "react-redux";
import { ChatFormCard } from "./chatform";
import { Smile } from "lucide-react";

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
        "flex flex-col-reverse items-end",
        "overflow-y-auto",
        "p-2",
        // "flex-col-reverse",
        "[&::-webkit-scrollbar]:w-2",
        "[&::-webkit-scrollbar-track]:bg-secondary",
        "[&::-webkit-scrollbar-thumb]:bg-primary",
        "[&::-webkit-scrollbar-thumb]:rounded-full",
      )}
    >
      {msg.length == 0 ? (
        <article className={twJoin("wh-full flex-center", "opacity-10")}>
          <Smile width={100} height={80} />
          <span className={twJoin("text-center text-2xl ml-1", "select-none")}>
            Ask Ai Anything
          </span>
        </article>
      ) : (
        (function () {
          const res = [];
          for (let i = msg.length - 1; i > -1; i--)
            res.push(
              <ChatMessageBox lr={msg[i].sender == "Ai Response"} key={i}>
                {msg[i].form ? (
                  <ChatFormCard />
                ) : (
                  <ChatMessageCard msg={msg[i]} />
                )}
              </ChatMessageBox>,
            );
          return res;
        })()
      )}
    </div>
  );
}
