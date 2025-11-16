//@ts-nocheck
import {
  Calendar,
  ChevronRight,
  CirclePlus,
  History,
  Home,
  Inbox,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "../ui/collapsible";
import { createNewChat, openChat } from "@/redux/chat-messages";
import { truncate } from "@/lib/utils";

export function AppSidebar() {
  const dispatch = useDispatch();
  const chats = useSelector((s) => s.chatmessages.chats);
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <button
                    onClick={(e) => {
                      dispatch(createNewChat());
                    }}
                  >
                    <CirclePlus />
                    New Chat
                  </button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>User Data</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <Collapsible
                asChild
                defaultOpen={chats.length > 0}
                className="group/collapsible"
              >
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={"History"}>
                      <History />
                      <span>History</span>
                      <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub className={"gap-3 py-1"}>
                      {chats.map((subItem, index) => (
                        <SidebarMenuSubItem
                          className="hover:bg-secondary/85"
                          key={subItem.title}
                        >
                          <button
                            onClick={(e) => {
                              console.log(e.target);
                              dispatch(openChat(index));
                            }}
                          >
                            {truncate(subItem.title, 26)}
                          </button>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
