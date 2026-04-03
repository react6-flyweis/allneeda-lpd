import { create } from "zustand";
import { nanoid } from "nanoid";

export type Message = {
  id: string;
  sender: "me" | "them";
  text: string;
  ts: number;
};

export type Chat = {
  id: string;
  name: string;
  avatar?: string;
  lastMessage?: string;
  unread?: number;
};

type ChatState = {
  chats: Chat[];
  messages: Record<string, Message[]>;
  selectedChatId?: string;
  selectChat: (id: string) => void;
  sendMessage: (chatId: string, text: string) => void;
  addIncoming: (chatId: string, text: string) => void;
};

export const useChatStore = create<ChatState>((set) => ({
  chats: [
    {
      id: "1",
      name: "Sarah Johnson",
      lastMessage: "See you tomorrow!",
      unread: 2,
    },
    {
      id: "2",
      name: "Team Discussion",
      lastMessage: "Let me check and get back to you",
    },
    { id: "3", name: "Alex Martinez", lastMessage: "Thanks for your help!" },
  ],
  messages: {
    "1": [
      {
        id: nanoid(),
        sender: "them",
        text: "Hey! How are you doing?",
        ts: Date.now() - 1000 * 60 * 60,
      },
      {
        id: nanoid(),
        sender: "me",
        text: "Hi Sarah! I'm doing great, thanks for asking!",
        ts: Date.now() - 1000 * 60 * 59,
      },
    ],
    "2": [],
    "3": [],
  },
  selectedChatId: undefined,
  selectChat(id) {
    set({ selectedChatId: id });
    // mark unread as 0 for selected chat
    set((state) => ({
      chats: state.chats.map((c) => (c.id === id ? { ...c, unread: 0 } : c)),
    }));
  },
  sendMessage(chatId, text) {
    const msg: Message = { id: nanoid(), sender: "me", text, ts: Date.now() };
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), msg],
      },
      chats: state.chats.map((c) =>
        c.id === chatId ? { ...c, lastMessage: text } : c,
      ),
    }));
  },
  addIncoming(chatId, text) {
    const msg: Message = { id: nanoid(), sender: "them", text, ts: Date.now() };
    set((state) => ({
      messages: {
        ...state.messages,
        [chatId]: [...(state.messages[chatId] || []), msg],
      },
      chats: state.chats.map((c) =>
        c.id === chatId
          ? { ...c, lastMessage: text, unread: (c.unread || 0) + 1 }
          : c,
      ),
    }));
  },
}));
