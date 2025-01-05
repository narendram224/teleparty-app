/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/store/chat.store";
import { TelepartyClient } from "teleparty-websocket-lib";

export function CreateChatRoom({ client }: { client: TelepartyClient }) {
  const [nickname, setNickname] = useState("");
  const [open, setOpen] = useState(false);
  const setNickNameToStore = useChatStore((state: any) => state.setNickName);
  const setRoomIdToStore = useChatStore((state: any) => state.setRoomId);
  const router = useNavigate();

  const createRoom = async (roomName: string) => {
    console.log("create room");
    return await client.createChatRoom(roomName, "");
  };

  const handleCreateChatroom = async (userNickName: string) => {
    try {
      const roomId = await createRoom(userNickName);
      console.log("roomId", roomId);
      router(`/chat/${roomId}/${userNickName}`);
      setNickNameToStore(userNickName);
      setRoomIdToStore(roomId);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname) {
      handleCreateChatroom(nickname);
      setNickname("");
      setOpen(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Create room
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a new chatroom</DialogTitle>
          <DialogDescription>
            Enter a room name and your nickname to create a new chatroom.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="nickname" className="text-right">
                Nickname
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="nickname"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="col-span-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Create Chatroom</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
