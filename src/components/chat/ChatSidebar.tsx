import { useChatStore } from "@/stores/useChatStore";
import { Search, Menu, XIcon, Link, Plus } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { MeetingDialog } from "./MeetingDialog";
import { JoiningInfoDialog } from "./JoiningInfoDialog";
import { useState } from "react";

function ChatCard({
  id,
  name,
  lastMessage,
  unread,
}: {
  id: string;
  name: string;
  lastMessage?: string;
  unread?: number;
}) {
  const messages = useChatStore((s) => s.messages[id] || []);
  const last = messages[messages.length - 1];
  const time = last ? format(last.ts, "hh:mm a") : "";
  const selectChat = useChatStore((s) => s.selectChat);
  const selectedChatId = useChatStore((s) => s.selectedChatId);
  const isSelected = selectedChatId === id;

  return (
    <div
      onClick={() => selectChat(id)}
      className={`flex items-center gap-3 p-3 hover:bg-muted cursor-pointer ${
        isSelected ? "bg-muted" : ""
      }`}
    >
      <div className="relative">
        <div className="size-12 rounded-full bg-muted flex items-center justify-center">
          {name.slice(0, 2)}
        </div>
        {unread ? (
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white">
            {unread > 99 ? "99+" : unread}
          </div>
        ) : null}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <div className="font-medium truncate">{name}</div>
          <div className="flex items-center gap-2">
            <div className="text-xs text-muted-foreground">{time}</div>
            {unread ? (
              <div className="w-5 h-5 bg-emerald-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-white">
                {unread}
              </div>
            ) : null}
          </div>
        </div>
        <div className="text-xs text-muted-foreground truncate">
          {lastMessage}
        </div>
      </div>
    </div>
  );
}

export default function ChatSidebar() {
  const chats = useChatStore((s) => s.chats);
  const [meetingDialogOpen, setMeetingDialogOpen] = useState(false);
  const [joinInfoOpen, setJoinInfoOpen] = useState(false);

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-3 border-b">
        <div className="flex mb-2 items-center justify-between">
          <Button className="rounded-full aspect-square text-foreground bg-accent border">
            <XIcon className="size-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost">
                <Menu />
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="start" className="rounded-lg p-3 w-56">
              <DropdownMenuItem
                className="gap-3 py-2 text-sm"
                onSelect={() => setJoinInfoOpen(true)}
              >
                <Link className="size-4" />
                <span className="truncate">Create a meeting for later</span>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="gap-3 py-2 text-sm"
                onSelect={() => setMeetingDialogOpen(true)}
              >
                <Plus className="size-4" />
                <span className="truncate">Start an instant meeting</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground size-4" />
          <input
            placeholder="Search or start new chat"
            className="w-full rounded-lg pl-10 pr-3 py-2 text-sm bg-accent placeholder:text-muted-foreground outline-none"
          />
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {chats.map((c) => (
          <ChatCard key={c.id} {...c} />
        ))}
      </div>

      <MeetingDialog
        open={meetingDialogOpen}
        onOpenChange={setMeetingDialogOpen}
      />
      <JoiningInfoDialog open={joinInfoOpen} onOpenChange={setJoinInfoOpen} />
    </div>
  );
}
