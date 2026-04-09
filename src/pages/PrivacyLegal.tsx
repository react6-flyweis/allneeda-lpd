import { Clock, Percent, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
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
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import DSARCompletionTimeChart from "@/components/privacy-legal/DSARCompletionTimeChart";
import PrivacyRequestsByTypeChart from "@/components/privacy-legal/PrivacyRequestsByTypeChart";
import OpenDSARDialog from "@/components/privacy-legal/OpenDSARDialog";
import ProcessDSARDialog, {
  type DSARProcessItem,
} from "@/components/privacy-legal/ProcessDSARDialog";
import { cn } from "@/lib/utils";

const summaryStats = [
  {
    title: "Open DSARs",
    value: "7",
    change: "+2% from last period",
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Deletion Requests",
    value: "2",
    change: "-12% from last period",
    icon: <Trash2 className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Pending Verification",
    value: "3",
    change: "-5.2% from last period",
    icon: <Clock className="h-4 w-4" />,
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    title: "On-Time Rate",
    value: "100%",
    change: "+1% from last period",
    icon: <Percent className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const dsarRows: DSARProcessItem[] = [
  {
    id: "DSAR-001",
    type: "deletion",
    requester: "USER-6677",
    jurisdiction: "EU-GDPR",
    verified: true,
    deadline: "2/13/2026",
    status: "In Review",
    daysRemaining: "28 days",
  },
  {
    id: "DSAR-002",
    type: "access",
    requester: "USER-8899",
    jurisdiction: "US-CA-CCPA",
    verified: false,
    deadline: "2/28/2026",
    status: "Open",
    daysRemaining: "43 days",
  },
  {
    id: "DSAR-003",
    type: "portability",
    requester: "USER-7123",
    jurisdiction: "EU-GDPR",
    verified: true,
    deadline: "2/10/2026",
    status: "Waiting Execution",
    daysRemaining: "25 days",
  },
  {
    id: "DSAR-004",
    type: "correction",
    requester: "USER-9456",
    jurisdiction: "US-CA-CCPA",
    verified: true,
    deadline: "2/23/2026",
    status: "In Review",
    daysRemaining: "38 days",
  },
  {
    id: "DSAR-005",
    type: "opt_out",
    requester: "USER-8234",
    jurisdiction: "US-CA-CCPA",
    verified: false,
    deadline: "2/25/2026",
    status: "Open",
    daysRemaining: "40 days",
  },
  {
    id: "DSAR-006",
    type: "deletion",
    requester: "USER-5678",
    jurisdiction: "EU-GDPR",
    verified: true,
    deadline: "2/7/2026",
    status: "Waiting Approval",
    daysRemaining: "22 days",
  },
  {
    id: "DSAR-007",
    type: "access",
    requester: "USER-3421",
    jurisdiction: "UK-GDPR",
    verified: false,
    deadline: "2/20/2026",
    status: "Open",
    daysRemaining: "35 days",
  },
];

const statusColorMap: Record<string, string> = {
  "In Review": "bg-amber-100 text-amber-700",
  Open: "bg-sky-100 text-sky-700",
  "Waiting Execution": "bg-violet-100 text-violet-700",
  "Waiting Approval": "bg-emerald-100 text-emerald-700",
};

export default function PrivacyLegal() {
  const [isOpenDSARDialogOpen, setIsOpenDSARDialogOpen] = useState(false);
  const [isProcessDSARDialogOpen, setIsProcessDSARDialogOpen] = useState(false);
  const [selectedDSAR, setSelectedDSAR] = useState<DSARProcessItem | null>(
    null,
  );

  function openProcessDialog(row: DSARProcessItem) {
    setSelectedDSAR(row);
    setIsProcessDSARDialogOpen(true);
  }

  return (
    <div className="space-y-8">
      <PageHeader
        title="Privacy Legal"
        subtitle="Here’s what’s happening with your marketing campaigns today."
      />

      <GlobalFilters />

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="border border-slate-200">
            <CardContent className="flex items-center gap-4">
              <div
                className={cn(
                  "inline-flex h-16 w-16 items-center justify-center rounded-3xl",
                  stat.iconBg,
                )}
              >
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-500">
                  {stat.title}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-emerald-600">
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-slate-200">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Privacy Requests (DSAR)</CardTitle>
            <p className="text-sm text-slate-500">
              Data subject access requests - GDPR/CCPA compliance
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsOpenDSARDialogOpen(true)}
          >
            <Plus className="h-4 w-4" /> Open DSAR
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Requester</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Verified</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dsarRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-slate-900">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>{row.requester}</TableCell>
                  <TableCell>{row.jurisdiction}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        row.verified
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-700",
                        "rounded-full",
                      )}
                    >
                      {row.verified ? "Yes" : "No"}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.deadline}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(statusColorMap[row.status], "rounded-full")}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openProcessDialog(row)}
                    >
                      Process
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-xl">DSAR Completion Time</CardTitle>
            <p className="text-sm text-slate-500">
              Average days to complete data subject access requests
            </p>
          </CardHeader>
          <CardContent className="h-85">
            <DSARCompletionTimeChart />
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-xl">Privacy Requests by Type</CardTitle>
            <p className="text-sm text-slate-500">
              Distribution of privacy request types
            </p>
          </CardHeader>
          <CardContent className="h-85">
            <PrivacyRequestsByTypeChart />
          </CardContent>
        </Card>
      </div>

      <OpenDSARDialog
        open={isOpenDSARDialogOpen}
        onOpenChange={setIsOpenDSARDialogOpen}
      />

      <ProcessDSARDialog
        open={isProcessDSARDialogOpen}
        onOpenChange={setIsProcessDSARDialogOpen}
        request={selectedDSAR}
      />
    </div>
  );
}
