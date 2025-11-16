//@ts-nocheck
import { twJoin } from "tailwind-merge";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage, updateLastMessage } from "@/redux/chat-messages";
import { isUserDataExists } from "@/lib/user";
import { fetchAiResponse, formatPrompt } from "@/lib/api";
import { useRef } from "react";

export function PromptInputBox() {
  const p = useSelector((s) => s.chatmessages.prompt);
  const dispatch = useDispatch();
  const msg = useSelector((s) => s.chatmessages.msg_list);
  const text_ele = useRef(null);
  /** @function @param {string} prompt */
  const handlePromptSearch = (prompt) => {
    dispatch(
      pushMessage({ msg: prompt, sender: "You", form: false, prompt: false }),
    );
    dispatch(
      pushMessage({
        sender: "Ai Response",
        msg: "",
        form: !isUserDataExists(),
        prompt: isUserDataExists(),
      }),
    );
    console.log(
      p + `${msg.length == 0 ? "" : "\n"}${formatPrompt("You", prompt)}`,
    );
    fetchAiResponse(
      p + `\n${formatPrompt("You", prompt)}`,
      msg.length == 0,
    ).then((d) => {
      if (d == undefined) return;
      console.log(d);
      dispatch(
        updateLastMessage({
          sender: "Ai Response",
          msg: d.output_text,
          form: false,
          prompt: false,
          title: d.title,
          retry: d.error,
        }),
      );
    });
  };
  return (
    <div
      className={twJoin(
        "w-full",
        "rounded-[100px]",
        "flex-center",
        "dark:bg-input/30",
        "p-2",
        "focus-within:border-ring focus-within:ring-ring/50 ring-[3px]",
        "ring-primary/10",
        "transition-[color,box-shadow,ring]",
      )}
    >
      <Textarea
        ref={text_ele}
        className={twJoin(
          "h-full",
          "dark:bg-transparent",
          "border-none",
          "md:text-xl",
          "resize-none",
          "focus-visible:ring-0",
        )}
        onKeyDown={(e) => {
          if (e.key == "Enter" && !e.shiftKey) {
            handlePromptSearch(e.currentTarget.value);
            e.currentTarget.value = "";
            event.preventDefault();
          }
        }}
        placeholder="Enter your message"
      />
      <Button
        onClick={(e) => {
          handlePromptSearch(text_ele.current.value);
          text_ele.current.value = "";
        }}
        className={twJoin("h-[90%] aspect-square", "rounded-[100px]")}
      >
        <ArrowRight />
      </Button>
    </div>
  );
}
