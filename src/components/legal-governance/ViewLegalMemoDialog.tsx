import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type LegalMemo = {
  id: string;
  title: string;
  version: string;
  status: string;
  published: string;
  contentSummary: string;
  intakeId: string;
  approvalRequired: string;
};

interface ViewLegalMemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  memo: LegalMemo | null;
}

export default function ViewLegalMemoDialog({
  open,
  onOpenChange,
  memo,
}: ViewLegalMemoDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton
        className="sm:max-w-xl max-h-[90vh] overflow-y-auto"
      >
        <DialogHeader className="">
          <DialogTitle>View Legal Memo {memo?.id ?? ""}</DialogTitle>
          <DialogDescription>Review the legal memo details.</DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-slate-50 p-5 text-sm">
          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-medium text-slate-700">Title:</span>
            <span className="text-slate-950">{memo?.title ?? "-"}</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-medium text-slate-700">Version:</span>
            <span className="text-slate-950">{memo?.version ?? "-"}</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-medium text-slate-700">Status:</span>
            <Badge
              className="inline-flex items-center gap-2 rounded-full px-3 py-1"
              variant="outline"
            >
              <CheckCircle2 className="h-4 w-4" />
              {memo?.status ?? "-"}
            </Badge>
          </div>

          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-medium text-slate-700 ">
              Published:
            </span>
            <span className="text-slate-950">{memo?.published ?? "-"}</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-start">
            <span className="text-sm font-medium text-slate-700 ">
              Content Summary:
            </span>
            <span className="text-slate-950 break-words">
              {memo?.contentSummary ?? "-"}
            </span>
          </div>

          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-medium text-slate-700 ">
              Intake ID:
            </span>
            <span className="text-slate-950">{memo?.intakeId ?? "-"}</span>
          </div>

          <div className="grid gap-2 sm:grid-cols-[160px_minmax(0,1fr)] sm:items-center">
            <span className="text-sm font-medium text-slate-700 ">
              Approval Required:
            </span>
            <span className="text-slate-950">
              {memo?.approvalRequired ?? "-"}
            </span>
          </div>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button
            className="w-full"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Cancel
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
