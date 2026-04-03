import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Copy, Phone, Share2 } from "lucide-react";
import { useState } from "react";

interface JoiningInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function JoiningInfoDialog({
  open,
  onOpenChange,
}: JoiningInfoDialogProps) {
  const meetingLink = "meet.google.com/vim-xzay-n";
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(meetingLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore clipboard errors silently
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader className="">
          <DialogTitle className="text-lg font-medium">
            Here’s your joining info
          </DialogTitle>

          <DialogDescription>
            Send this to people you want to meet with. Be sure to save it so you
            can use it later, too.
          </DialogDescription>
        </DialogHeader>

        <div className="bg-blue-100 p-3 rounded mb-2">
          <div className="flex items-center gap-2 bg-white p-2 rounded">
            <span className="text-sm text-gray-800 flex-1 truncate">
              {meetingLink}
            </span>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-blue-600"
              onClick={handleCopy}
            >
              <Copy className="h-4 w-4" />
            </Button>
          </div>

          <div className="mt-3 text-sm text-muted-foreground">
            <p>Dial-in: (US) +1 401-584-3501</p>
            <p>PIN: 408 659 995#</p>
          </div>

          <div className="mt-3 flex flex-col gap-2">
            <button className="text-blue-600 text-sm font-medium hover:underline text-left flex items-center gap-2">
              <Phone className="h-3 w-3" /> More phone numbers
            </button>
            <button className="text-blue-600 text-sm font-medium hover:underline text-left flex items-center gap-2">
              <Share2 className="h-3 w-3" /> Share full details
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
