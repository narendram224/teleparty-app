import { useChatStore } from "@/store/chat.store";
import { TelepartyClient, SocketEventHandler } from "teleparty-websocket-lib";

const useChat = () => {
  const setMessagesToStore = useChatStore((state) => state.setMessages);

  const eventHandler: SocketEventHandler = {
    onConnectionReady: () => {
      console.info("Connection has been established");
    },
    onClose: () => {
      console.info("Socket has been closed");
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
