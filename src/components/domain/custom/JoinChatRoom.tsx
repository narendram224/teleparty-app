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
import { User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useChatStore } from "@/store/chat.store";
import { TelepartyClient } from "teleparty-websocket-lib";
import { toast } from "react-toastify";

export function JoinChatRoom({ client }: { client: TelepartyClient }) {
  const [roomId, setRoomId] = useState("");
  const [nickname, setNickname] = useState("");
  const [open, setOpen] = useState(false);
  const router = useNavigate();

  const setNickNameToStore = useChatStore((state) => state.setNickName);
  const setRoomIdToStore = useChatStore((state) => state.setRoomId);

  const joinRoom = async (roomId: string, nickname: string) => {
    await client.joinChatRoom(nickname, roomId, "");
  };

  const handleJoinChatroom = async (roomId: string, userNickname: string) => {
    try {
      await joinRoom(roomId, userNickname);
      router(`/chat/${roomId}/${userNickname}`);
      setNickNameToStore(userNickname);
      setRoomIdToStore(roomId);
      toast.success("Room joined successfully");

      setOpen(false);
    } catch (error) {
      console.log(error);
      toast.success("Error while joining room");
      setOpen(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId && nickname) {
      handleJoinChatroom(roomId, nickname);
      setRoomId("");
      setNickname("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Join room
          <User />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Join the chatroom</DialogTitle>
          <DialogDescription>
            Enter a room name and your nickname to join chatroom.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="roomName" className="text-right">
                Room Id
                <span className="text-red-500">*</span>
              </Label>
              <Input
                id="roomName"
                value={roomId}
                onChange={(e) => setRoomId(e.target.value)}
                className="col-span-2"
              />
            </div>
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
            <Button type="submit" disabled={!roomId.trim() || !nickname.trim()}>
              Join Chatroom
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
