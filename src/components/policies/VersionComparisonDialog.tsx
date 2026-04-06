import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Download, FileText } from "lucide-react";

type VersionComparisonRow = {
  id: string;
  policy: string;
  version: string;
  changeSummary: string;
  effectiveDate: string;
  publishedDate: string;
  status: string;
};

type VersionComparisonDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  currentVersion: VersionComparisonRow | null;
  previousVersion: VersionComparisonRow | null;
};

function VersionStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <span className="text-sm font-semibold text-muted-foreground">
        {label}
      </span>
      <span className="text-sm font-semibold text-slate-900">{value}</span>
    </div>
  );
}

export default function VersionComparisonDialog({
  open,
  onOpenChange,
  currentVersion,
  previousVersion,
}: VersionComparisonDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <DialogTitle>Version Comparison</DialogTitle>
              <DialogDescription>
                Detailed comparison showing changes between versions.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 lg:grid-cols-2 lg:items-center">
          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="mb-5 text-sm font-medium text-slate-500">
              Current Version ({currentVersion?.version ?? "—"})
            </p>
            <div className="grid gap-2">
              <VersionStat
                label="Version ID"
                value={currentVersion?.id ?? "—"}
              />
              <VersionStat
                label="Policy"
                value={currentVersion?.policy ?? "—"}
              />
              <VersionStat
                label="Effective"
                value={currentVersion?.effectiveDate ?? "—"}
              />
              <VersionStat
                label="Published"
                value={currentVersion?.publishedDate ?? "—"}
              />
            </div>
          </div>

          <div className="rounded-lg border border-slate-200 bg-white p-5">
            <p className="mb-5 text-sm font-medium text-slate-500">
              Previous Version ({previousVersion?.version ?? "—"})
            </p>
            <div className="grid gap-2">
              <VersionStat
                label="Version ID"
                value={previousVersion?.id ?? "—"}
              />
              <VersionStat
                label="Policy"
                value={previousVersion?.policy ?? "—"}
              />
              <VersionStat
                label="Effective"
                value={previousVersion?.effectiveDate ?? "—"}
              />
              <VersionStat
                label="Published"
                value={previousVersion?.publishedDate ?? "—"}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-slate-200 bg-[#EFF6FF] p-6">
          <div className="flex items-center gap-2 text-slate-900 font-semibold">
            <FileText className="h-4 w-4" />
            <span>Change Summary</span>
          </div>
          <p className="mt-3 leading-7 text-slate-700">
            {currentVersion?.changeSummary ??
              "Review the version comparison and export the diff report for audit purposes."}
          </p>
        </div>

        <DialogFooter className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button>
            <Download className="h-4 w-4" />
            Export Diff Report
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
