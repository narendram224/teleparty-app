import { useChatStore } from "@/store/chat.store";
import { toast } from "react-toastify";
import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

const useChat = () => {
  const setMessagesToStore = useChatStore((state) => state.setMessages);

  const eventHandler: SocketEventHandler = {
    onConnectionReady: () => {
      toast.success("Connection has been established");
    },
    onClose: () => {
      toast.error("Socket has been closed,Please refresh the page");
    },
    onMessage: (message) => {
      console.log("Received message: ", message);
      if (message?.type === "sendMessage") {
        setMessagesToStore(message?.data);
      }
    },
  };

  const client = new TelepartyClient(eventHandler);

  return client;
};

export default useChat;
