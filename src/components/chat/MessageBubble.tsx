import type { Message } from "@/stores/useChatStore";
import { format } from "date-fns";
import { Check } from "lucide-react";

export default function MessageBubble({ m }: { m: Message }) {
  const isMe = m.sender === "me";
  return (
    <div className={`flex ${isMe ? "justify-end" : "justify-start"} py-2`}>
      <div
        className={`${isMe ? "bg-green-100 text-black" : "bg-white text-muted-foreground"} max-w-[70%] p-3 rounded-lg shadow-sm`}
      >
        <div className="text-sm break-words">{m.text}</div>
        <div className="text-[10px] text-muted-foreground mt-1 flex items-center justify-end gap-1">
          <span>{format(m.ts, "hh:mm a")}</span>
          {isMe && <Check className="size-3 text-muted-foreground" />}
        </div>
      </div>
    </div>
  );
}
