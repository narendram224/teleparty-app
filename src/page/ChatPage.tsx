"use client";

import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarMenus from "@/components/domain/custom/Sidebar";
import DefaultChatPage from "@/components/domain/custom/DefaultChat";
import { TelepartyClient } from "teleparty-websocket-lib";

export function ChatPage({ client }: { client: TelepartyClient }) {
  return (
    <SidebarProvider className="w-full">
      <SidebarMenus client={client} />
      <DefaultChatPage client={client} />
    </SidebarProvider>
  );
}
