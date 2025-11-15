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

export function NavBar() {
  return (
    <div
      className={twJoin(
        "w-full h-[6%]",
        "debug outline-primary",
        "flex items-center justify-between",
	"px-4"
      )}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <SidebarTrigger className={"w-[2vw]"} />
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <Button
              variant="outline"
              className={"w-[2vw]"}
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
