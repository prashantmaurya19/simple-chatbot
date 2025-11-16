//@ts-nocheck
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { twJoin } from "tailwind-merge";
import { Button } from "@/components/ui/button";
import { isDarkMode, toggleDarkMode } from "@/lib/utils";
import { Moon, Sun } from "lucide-react";
import { SidebarTrigger } from "../ui/sidebar";
import { useSelector } from "react-redux";

export function NavBar() {
  const chat_title = useSelector((s) => s.chatmessages.title);
  return (
    <div
      className={twJoin(
        "w-full h-[5%]",
        "border-b-1 border-solid border-primary",
        // "debug outline-primary",
        "flex items-center justify-between",
        "px-2",
        "py-0",
      )}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <SidebarTrigger className={"w-[2vw]"} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <span
        className={twJoin(
          "min-w-[10%] max-w-max max-h-[97%]",
          "bg-foreground/10 flex-center text-lg",
          "rounded-2xl ",
          "border-primary border-1 border-solid",
          "px-4",
        )}
      >
        {chat_title}
      </span>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button
              variant="outline"
              className={"aspect-square"}
              onClick={(e) => {
                toggleDarkMode();
                localStorage.setItem(
                  "dark",
                  "" + document.documentElement.classList.contains("dark"),
                );
              }}
            >
              {isDarkMode() ? <Sun /> : <Moon />}
            </Button>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}
