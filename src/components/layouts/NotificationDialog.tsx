import { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function NotificationDialog({
  open,
  onOpenChange,
  notification,
  onSend,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  notification: {
    id: string;
    title: string;
    description: string;
    canReply?: boolean;
  } | null;
  onSend?: (id: string, reply: string, attachment: File | null) => void;
}) {
  const [reply, setReply] = useState("");
  const [attachment, setAttachment] = useState<File | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleAttachClick = () => {
    inputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0] ?? null;
    setAttachment(f);
  };

  const handleRemoveAttachment = () => setAttachment(null);

  const handleSend = () => {
    // TODO: wire this to backend notification reply API
    console.log("Sending reply:", {
      notificationId: notification?.id,
      reply,
      attachment,
    });

    // notify parent
    if (notification?.id && onSend) {
      onSend(notification.id, reply, attachment);
    }

    // Reset state and close
    setReply("");
    setAttachment(null);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-2xl max-h-[80vh] overflow-y-auto"
      >
        <DialogHeader className="border-b">
          <DialogTitle className="text-lg">{notification?.title}</DialogTitle>
        </DialogHeader>

        <div className="">{notification?.description}</div>

        {notification?.canReply ? (
          <>
            <div className="">
              <Textarea
                placeholder="Enter your reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                className="min-h-28"
              />

              {attachment ? (
                <div className="mt-1 flex items-center gap-3">
                  <div className="rounded bg-muted px-3 py-1 text-sm">
                    {attachment.name}
                  </div>
                  <button
                    type="button"
                    aria-label="Remove attachment"
                    className="text-muted-foreground"
                    onClick={handleRemoveAttachment}
                  >
                    <X className="size-4" />
                  </button>
                </div>
              ) : null}

              <input
                ref={inputRef}
                type="file"
                className="hidden"
                onChange={handleFileChange}
                aria-hidden
              />
            </div>

            <DialogFooter>
              <div className="flex items-center justify-between w-full gap-3">
                <div />

                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    onClick={handleAttachClick}
                    className="rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100"
                  >
                    Attach Document
                  </Button>

                  <DialogClose asChild>
                    <Button onClick={handleSend} className="rounded-lg">
                      Send Reply
                    </Button>
                  </DialogClose>
                </div>
              </div>
            </DialogFooter>
          </>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
