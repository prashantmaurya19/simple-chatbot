//@ts-nocheck
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Copy } from "lucide-react";
import { useEffect, useState } from "react";
import { twJoin } from "tailwind-merge";
import { fetchAiResponse, PROMPT_SENDER_NAME_SUBSTITUTION } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage, updateLastMessage } from "@/redux/chat-messages";
import { Button } from "../ui/button";

/**
 * @typedef {"Ai Response"|"You"} SenderType
 * @typedef {{msg:string,sender:SenderType,form?:boolean,prompt?:boolean,retry?:boolean}} ChatMessage
 * @param {{msg:ChatMessage}&import("react").HTMLProps} p
 */
export function ChatMessageCard({
  msg = { msg: "no text", sender: "Ai Response" },
}) {
  const p = useSelector((s) => s.chatmessages.prompt);
  const dispatch = useDispatch();
  return (
    <Card>
      <CardHeader>
        <CardTitle>{msg.sender}</CardTitle>
        <CardDescription>Card Description</CardDescription>
        {msg.retry ? (
          <CardAction>
            <Button
              variant="outline"
              onClick={(e) => {
                dispatch(
                  updateLastMessage({
                    sender: "Ai Response",
                    msg: "",
                    retry: false,
                  }),
                );
                console.log(p);
                fetchAiResponse(p).then((d) => {
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
              }}
            >
              Try Again
            </Button>
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className={cn({ "flex flex-col gap-3": msg.msg == "" })}>
        {msg.msg == "" ? (
          <>
            <Skeleton className="h-5 w-[60%]" />
            <Skeleton className="h-5 w-[40%]" />
            <Skeleton className="h-5 w-[50%]" />
          </>
        ) : (
          msg.msg.split("\n").map((v, i) => (
            <p className={"whitespace-pre-wrap"} key={i}>
              {v}
            </p>
          ))
        )}
      </CardContent>
    </Card>
  );
}

/**
 * @param {Partial<{lr:boolean}>&import("react").HTMLProps} p
 */
export function ChatMessageBox({ lr = true, className, children, ...a }) {
  return (
    <article
      {...a}
      className={cn(
        "w-full h-max",
        "block",
        {
          "pr-[30%]": lr,
          "pl-[30%]": !lr,
        },
        className,
      )}
    >
      {children}
    </article>
  );
}
