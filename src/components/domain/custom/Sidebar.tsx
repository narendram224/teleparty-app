import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { CreateChatRoom } from "./CreateChatRoom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { JoinChatRoom } from "./JoinChatRoom";
import { TelepartyClient } from "teleparty-websocket-lib";
type Chatroom = {
  id: number;
  name: string;
};

const SidebarMenus = ({ client }: { client: TelepartyClient }) => {
  const chatrooms: Chatroom[] = [];

  return (
    <Sidebar className="w-78 border-r">
      <SidebarHeader className="p-4 border-b ">
        <h2 className="text-lg font-semibold mb-2">Chatrooms</h2>
        <div className="flex gap-2">
          <CreateChatRoom client={client} />
          <JoinChatRoom client={client} />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <ScrollArea className="h-full">
          <div className="p-4 space-y-2">
            {chatrooms.map((room) => (
              <Button
                key={room.id}
                // variant={activeChatroom?.id === room.id ? "secondary" : "ghost"}
                className="w-full justify-start"
                // onClick={() => setActiveChatroom(room)}
              >
                <Avatar className="h-6 w-6 mr-2">
                  <AvatarFallback>{room.name[0]}</AvatarFallback>
                </Avatar>
                <span>{room.name}</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </SidebarContent>
    </Sidebar>
  );
};

export default SidebarMenus;
