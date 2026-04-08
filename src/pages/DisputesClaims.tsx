import { useState } from "react";
import { ShieldAlert, AlertCircle, DollarSign, Clock3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PageHeader from "@/components/PageHeader";
import { cn } from "@/lib/utils";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import DisputeResolutionTimeChart from "@/components/disputes/DisputeResolutionTimeChart";
import DisputesByTypeChart from "@/components/disputes/DisputesByTypeChart";
import PublishMemoDialog from "@/components/disputes/PublishMemoDialog";

const summaryStats = [
  {
    title: "Open Disputes",
    value: "7",
    change: "-0.2% from last period",
    icon: <ShieldAlert className="size-5 text-violet-700" />,
    iconBg: "bg-violet-50",
  },
  {
    title: "High Risk",
    value: "3",
    change: "-5.2% from last period",
    icon: <AlertCircle className="size-5 text-rose-700" />,
    iconBg: "bg-rose-50",
  },
  {
    title: "Total Value",
    value: "$223,050",
    change: "+12% from last period",
    icon: <DollarSign className="size-5 text-emerald-700" />,
    iconBg: "bg-emerald-50",
  },
  {
    title: "Avg Response",
    value: "36h",
    change: "-1% from last period",
    icon: <Clock3 className="size-5 text-sky-700" />,
    iconBg: "bg-sky-50",
  },
];

type EscalationRow = {
  id: string;
  type: string;
  value: string;
  risk: string;
  status: string;
  caseId: string;
};

const escalationRows: EscalationRow[] = [
  {
    id: "DC-001",
    type: "legal threat",
    value: "$50,000",
    risk: "High",
    status: "In Review",
    caseId: "CS-9876",
  },
  {
    id: "DC-002",
    type: "chargeback",
    value: "$1,200",
    risk: "Medium",
    status: "Waiting Execution",
    caseId: "CS-9877",
  },
  {
    id: "DC-003",
    type: "injury claim",
    value: "$125,000",
    risk: "Critical",
    status: "In Review",
    caseId: "CS-9981",
  },
  {
    id: "DC-004",
    type: "refund dispute",
    value: "$2,500",
    risk: "Low",
    status: "Waiting Execution",
    caseId: "CS-9823",
  },
  {
    id: "DC-005",
    type: "service complaint",
    value: "$8,500",
    risk: "Medium",
    status: "Open",
    caseId: "CS-9845",
  },
  {
    id: "DC-006",
    type: "legal threat",
    value: "$35,000",
    risk: "High",
    status: "In Review",
    caseId: "CS-9812",
  },
  {
    id: "DC-007",
    type: "chargeback",
    value: "$850",
    risk: "Low",
    status: "Waiting Approval",
    caseId: "CS-9834",
  },
];

const riskBadgeClasses: Record<string, string> = {
  Critical: "bg-red-600 text-white",
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-900",
};

const statusBadgeClasses: Record<string, string> = {
  "In Review": "bg-slate-950 text-white",
  "Waiting Execution": "bg-slate-100 text-slate-700",
  Open: "bg-emerald-100 text-emerald-700",
  "Waiting Approval": "bg-sky-100 text-sky-700",
};

export default function DisputesClaims() {
  const [isMemoDialogOpen, setIsMemoDialogOpen] = useState(false);
  const [selectedDispute, setSelectedDispute] = useState<EscalationRow | null>(
    null,
  );

  function openPublishMemoDialog(row: EscalationRow) {
    setSelectedDispute(row);
    setIsMemoDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Disputes & Claims"
        subtitle="Here’s what’s happening with your marketing campaigns today."
      />

      <GlobalFilters />

      <div className="grid gap-4 xl:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="space-y-4 py-6 px-5">
              <div className="flex items-center justify-between gap-4">
                <div
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                    stat.iconBg,
                  )}
                >
                  {stat.icon}
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.25em] text-slate-500">
                  {stat.title}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm text-slate-500">{stat.change}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Dispute Escalations
              </CardTitle>
              <p className="text-sm text-slate-500">
                Legal oversight for high-risk disputes.
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>CS Case</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {escalationRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-slate-900">
                    {row.id}
                  </TableCell>
                  <TableCell className="capitalize text-slate-700">
                    {row.type}
                  </TableCell>
                  <TableCell className="text-slate-700">{row.value}</TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                        riskBadgeClasses[row.risk],
                      )}
                    >
                      {row.risk}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                        statusBadgeClasses[row.status],
                      )}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell className="text-slate-700">{row.caseId}</TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openPublishMemoDialog(row)}
                    >
                      Publish Memo
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="h-full overflow-hidden bg-white">
          <CardHeader className="items-center gap-4 sm:flex-row flex-col">
            <div>
              <CardTitle>Dispute Resolution Time</CardTitle>
              <p className="text-sm text-slate-500">
                Average days to resolve disputes.
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-[340px] px-4 pb-4 pt-2">
            <DisputeResolutionTimeChart />
          </CardContent>
        </Card>

        <Card className="h-full overflow-hidden bg-white">
          <CardHeader className="items-center gap-4 sm:flex-row flex-col">
            <div>
              <CardTitle>Disputes by Type</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution and value of disputes by type.
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-[340px] px-4 pb-4 pt-2">
            <DisputesByTypeChart />
          </CardContent>
        </Card>
      </div>

      <PublishMemoDialog
        open={isMemoDialogOpen}
        onOpenChange={(open: boolean) => {
          setIsMemoDialogOpen(open);
          if (!open) {
            setSelectedDispute(null);
          }
        }}
        dispute={selectedDispute}
      />
    </div>
  );
}
