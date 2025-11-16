//@ts-nocheck
import { ChatBox } from "@/components/chatbox";
import { PromptInputBox } from "@/components/inputbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight } from "lucide-react";
import { twJoin } from "tailwind-merge";

export function HomePage() {
  return (
    <div
      className={twJoin(
        "w-full grow-1 px-[5%] py-5",
        "gap-2",
        "flex items-center justify-between flex-col",
      )}
    >
      <ChatBox />
      <PromptInputBox />
    </div>
  );
}
