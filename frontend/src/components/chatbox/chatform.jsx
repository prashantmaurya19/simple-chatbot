//@ts-nocheck
import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { ChatMessageBox } from "./chatmsg-box";
import { isUserDataExists, setUserData } from "@/lib/user";
import { fetchAiResponse, fetchApi } from "@/lib/api";
import { useDispatch, useSelector } from "react-redux";
import { pushMessage } from "@/redux/chat-messages";

/**
 * @param {Partial<{list:Array<{value:string,label:string}>}>&import("react").HTMLProps} p
 */
export function SearchSelect({
  placeholder = "select demo",
  list = [
    { value: "demo1", label: "Demo1" },
    { value: "demo", label: "Demo" },
  ],
}) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {value
            ? list.find((framework) => framework.value === value)?.label
            : placeholder}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>No framework found.</CommandEmpty>
            <CommandGroup>
              {list.map((framework) => (
                <CommandItem
                  key={framework.value}
                  value={framework.value}
                  onSelect={(currentValue) => {
                    setValue(currentValue === value ? "" : currentValue);
                    setOpen(false);
                  }}
                >
                  {framework.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === framework.value ? "opacity-100" : "opacity-0",
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function ChatFormCard() {
  const messages = useSelector((s) => s.chatmessages.msg_list);
  const dispatch = useDispatch();
  return (
    <ChatMessageBox className="pr-[50%]">
      <Card>
        <CardHeader>
          <CardTitle className={"text-2xl"}>
            Hey there, i love to chat with u,after i know u
          </CardTitle>
          <CardDescription className={"text-xl"}>User Info</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  placeholder="eg Ajay Kumar"
                  required
                />
              </div>
              <div className="grid gap-2">
                <SearchSelect />
              </div>
              <div></div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={(e) => {
              if (!isUserDataExists()) {
                setUserData("fdsfsdf");
                dispatch(
                  pushMessage({
                    sender: "Ai Response",
                    msg: "",
                    form: false,
                    prompt: true,
                  }),
                );
              }
            }}
          >
            Sumit Details
          </Button>
        </CardFooter>
      </Card>
    </ChatMessageBox>
  );
}
