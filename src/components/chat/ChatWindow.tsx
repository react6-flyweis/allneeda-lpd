import { useChatStore } from "@/stores/useChatStore";
import MessageBubble from "./MessageBubble";
import MessageInput from "./MessageInput";
import { Video, Phone, Search, MoreHorizontal } from "lucide-react";
import chatBG from "@/assets/chat-bg.png";

export default function ChatWindow() {
  const selected = useChatStore((s) => s.selectedChatId);
  const chats = useChatStore((s) => s.chats);
  const messages = useChatStore((s) => s.messages)[selected || ""] || [];

  const chat = chats.find((c) => c.id === selected);

  return (
    <div className="flex-1 flex flex-col h-full">
      <div className="px-4 py-3 border-b flex items-center gap-3">
        <div className="size-10 rounded-full bg-muted flex items-center justify-center">
          {chat?.name?.slice(0, 2)}
        </div>
        <div className="flex-1">
          <div className="font-medium">
            {chat?.name ?? "Select a conversation"}
          </div>
          <div className="text-xs text-muted-foreground">
            {chat?.lastMessage}
          </div>
        </div>
        <div className="text-xs text-muted-foreground">online</div>
        <div className="flex items-center gap-2">
          <button className="p-2 rounded-full hover:bg-muted">
            <Video className="size-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <Phone className="size-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <Search className="size-4" />
          </button>
          <button className="p-2 rounded-full hover:bg-muted">
            <MoreHorizontal className="size-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-auto p-4">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30 pointer-events-none"
          style={{ backgroundImage: `url(${chatBG})` }}
        />
        <div className="relative z-10">
          {selected ? (
            messages.map((m) => <MessageBubble key={m.id} m={m} />)
          ) : (
            <div className="h-full flex items-center justify-center text-muted-foreground">
              Open a chat to start messaging
            </div>
          )}
        </div>
      </div>

      <MessageInput />
    </div>
  );
}
