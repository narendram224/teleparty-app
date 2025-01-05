"use client";

import { useState } from "react";
import { Copy, Send } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarProvider } from "@/components/ui/sidebar";
import SidebarMenus from "./Sidebar";
import { useChatStore } from "@/store/chat.store";
import { useParams } from "react-router-dom";
import { SocketMessageTypes, TelepartyClient } from "teleparty-websocket-lib";

export function Chat({ client }: { client: TelepartyClient }) {
  const messageList = useChatStore((state) => state.messages);
  const nickname = useChatStore((state) => state.nickName);
  const [newMessage, setNewMessage] = useState("");

  const setNickNameToStore = useChatStore((state) => state.setNickName);
  const setRoomIdToStore = useChatStore((state) => state.setRoomId);
  const activeChatroom = useChatStore((state) => state.roomId);

  const params = useParams();
  if (params.nickname && params.id && !nickname && !activeChatroom) {
    setNickNameToStore(params.nickname);
    setRoomIdToStore(params.id);
  }

  const sendMessage = (message: string) => {
    try {
      return client.sendMessage(SocketMessageTypes.SEND_MESSAGE, {
        body: message,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && nickname && activeChatroom) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  return (
    <SidebarProvider>
      <SidebarMenus client={client} />
      <Card className="flex-1 flex flex-col">
        <CardHeader>
          <CardTitle
            onClick={() => navigator.clipboard.writeText(activeChatroom || "")}
          >
            <div className="flex gap-2 cursor-pointer">
              <b> Room Id</b>
              <span className="text-sm text-blue-700 ">
                {activeChatroom ? activeChatroom : "Select a chatroom"}
              </span>
              <Copy color="blue" />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-hidden">
          <ScrollArea className="h-full pr-4">
            {messageList.map((message) => (
              <div
                key={message?.messageId}
                className={`flex mb-4 ${
                  message?.userNickname === nickname
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] rounded-lg p-3 ${
                    message?.userNickname === nickname
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <p className="font-semibold text-sm">
                    {message?.userNickname}
                  </p>
                  <p>{message?.body}</p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex w-full space-x-2"
          >
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={
                activeChatroom
                  ? "Type your message..."
                  : "Select a chatroom to start chatting"
              }
              className="flex-1"
              disabled={!activeChatroom}
            />
            <Button type="submit" disabled={!activeChatroom}>
              <Send className="h-4 w-4" />
              <span className="sr-only">Send</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </SidebarProvider>
  );
}
