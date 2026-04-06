import {
  Download,
  CheckCircle2,
  Users,
  AlertTriangle,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const reportMetrics = [
  {
    label: "Avg. Acceptance Rate",
    value: "92.5%",
    detail: "Across active policies",
    icon: CheckCircle2,
    highlightClass: "text-emerald-600",
  },
  {
    label: "Total Users",
    value: "154,408",
    detail: "Included in report",
    icon: Users,
    highlightClass: "text-sky-600",
  },
  {
    label: "Pending Acceptances",
    value: "15,087",
    detail: "Outstanding acknowledgements",
    icon: AlertTriangle,
    highlightClass: "text-orange-600",
  },
];

const reportRows = [
  {
    id: "POL-001",
    type: "Privacy",
    version: "v3",
    totalUsers: "54,642",
    accepted: "48,962",
    pending: "5,680",
    rate: "89.6%",
  },
  {
    id: "POL-002",
    type: "ToS",
    version: "v5",
    totalUsers: "49,461",
    accepted: "45,013",
    pending: "4,448",
    rate: "91.0%",
  },
  {
    id: "POL-003",
    type: "Community",
    version: "v1",
    totalUsers: "49,784",
    accepted: "47,110",
    pending: "2,674",
    rate: "94.6%",
  },
];

function formatReportDate() {
  return new Date().toLocaleString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

function buildCsvContent() {
  const header = [
    "Policy ID",
    "Type",
    "Version",
    "Total Users",
    "Accepted",
    "Pending",
    "Rate",
  ];
  const rows = reportRows.map((row) => [
    row.id,
    row.type,
    row.version,
    row.totalUsers,
    row.accepted,
    row.pending,
    row.rate,
  ]);

  const csv = [header, ...rows]
    .map((row) =>
      row.map((value) => `"${value.replace(/"/g, '""')}"`).join(","),
    )
    .join("\n");

  return `data:text/csv;charset=utf-8,${encodeURIComponent(csv)}`;
}

interface PolicyAcceptanceReportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function PolicyAcceptanceReportDialog({
  open,
  onOpenChange,
}: PolicyAcceptanceReportDialogProps) {
  const handleDownload = () => {
    const csvUrl = buildCsvContent();
    const link = document.createElement("a");
    link.href = csvUrl;
    link.download = "policy-acceptance-report.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <DialogTitle>Policy Acceptance Report</DialogTitle>
              <DialogDescription>
                Comprehensive acceptance metrics for all active policies.
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-4 md:grid-cols-3 mt-4">
          {reportMetrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div
                key={metric.label}
                className="rounded-lg border border-slate-200 flex items-center bg-white p-5 gap-3 shadow-sm"
              >
                <Icon className={cn(metric.highlightClass, "size-7")} />

                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {metric.label}
                  </p>
                  <p
                    className={cn(
                      "mt-3 text-3xl font-semibold text-slate-950",
                      metric.highlightClass,
                    )}
                  >
                    {metric.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          <div className="overflow-x-auto">
            <Table className="min-w-full bg-white">
              <TableHeader>
                <TableRow>
                  <TableHead>Policy ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Version</TableHead>
                  <TableHead>Total Users</TableHead>
                  <TableHead>Accepted</TableHead>
                  <TableHead>Pending</TableHead>
                  <TableHead>Rate</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reportRows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className="font-medium text-slate-900">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.version}</TableCell>
                    <TableCell>{row.totalUsers}</TableCell>
                    <TableCell className="text-emerald-600">
                      {row.accepted}
                    </TableCell>
                    <TableCell className="text-orange-600">
                      {row.pending}
                    </TableCell>
                    <TableCell>
                      <span className="inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white">
                        {row.rate}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        <div className="mt-6 rounded-lg border border-orange-100 bg-orange-50 p-4 text-sm text-slate-700">
          <div className="flex items-center gap-2 font-semibold text-slate-900">
            <AlertCircle className="h-4 w-4" />
            Compliance Alerts
          </div>
          <p className="mt-2">
            Privacy (v3) has 87.8% acceptance — 2,927 users pending
            acknowledgement.
          </p>
        </div>

        <div className="mt-4 border-t border-slate-200 pt-4 text-xs text-slate-500">
          Report generated on: {formatReportDate()}
          <br />
          Data source: Platform Policy Acceptance Logs (Immutable & Auditable)
        </div>

        <DialogFooter className="pt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Button onClick={handleDownload}>
            <Download className="h-4 w-4" />
            Download CSV
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
