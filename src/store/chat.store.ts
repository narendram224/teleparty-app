import { create } from "zustand";

export interface Message {
  body: string;
  isSystemMessage: boolean;
  messageId: string;
  permId: string;
  userIcon: string;
  userNickname: string;
  timestamp: number;
  userSettings: {
    userIcon: string;
    userNickname: string;
  };
}

interface ChatStore {
  nickName: string | null;
  roomId: string | null;
  messages: Message[];
  setNickName: (nickName: string) => void;
  setRoomId: (roomId: string) => void;
  setMessages: (o: Message) => void;
}

export const useChatStore = create<ChatStore>((set) => ({
  nickName: null,
  roomId: null,
  messages: [],
  setNickName: (nickName: string) => set({ nickName }),
  setRoomId: (roomId: string) => set({ roomId }),
  setMessages: (o: Message) => {
    set((state: ChatStore) => ({
      messages: [...state.messages, o],
    }));
  },
}));
