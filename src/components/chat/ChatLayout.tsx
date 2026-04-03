import ChatSidebar from "./ChatSidebar";
import ChatWindow from "./ChatWindow";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useChatStore } from "@/stores/useChatStore";

export default function ChatLayout() {
  const { id } = useParams();
  const selectChat = useChatStore((s) => s.selectChat);

  useEffect(() => {
    if (id) selectChat(id);
  }, [id, selectChat]);

  return (
    <div className="flex h-full bg-chat-page">
      <div className="w-[320px] border-r border-border bg-white">
        <ChatSidebar />
      </div>

      <div className="flex-1 flex flex-col">
        <ChatWindow />
      </div>
    </div>
  );
}
