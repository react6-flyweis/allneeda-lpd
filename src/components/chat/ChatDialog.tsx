import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import ChatLayout from "./ChatLayout";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export default function ChatDialog({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <Dialog>
      {children ? (
        <DialogTrigger asChild>{children}</DialogTrigger>
      ) : (
        <DialogTrigger>
          <Button variant="ghost" size="icon" aria-label="Open messages">
            <MessageCircle />
          </Button>
        </DialogTrigger>
      )}

      <DialogContent
        className="sm:max-w-4xl w-[98%] p-0 overflow-hidden"
        showCloseButton={false}
      >
        <div className="h-[85vh]">
          <ChatLayout />
        </div>
      </DialogContent>
    </Dialog>
  );
}
