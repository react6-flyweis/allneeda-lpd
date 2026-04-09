import { cn } from "@/lib/utils";
import { useState } from "react";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
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
import { Badge } from "@/components/ui/badge";
import { BarChart3, CalendarDays, CheckCircle2, RotateCcw } from "lucide-react";
import LitigationExposureBandChart from "@/components/litigation/LitigationExposureBandChart";
import LitigationTimelineChart from "@/components/litigation/LitigationTimelineChart";
import CreateLitigationCaseDialog from "@/components/litigation/CreateLitigationCaseDialog";
import ExecutiveLitigationSummaryDialog, {
  type ExecutiveLitigationCase,
} from "@/components/litigation/ExecutiveLitigationSummaryDialog";

const summaryStats = [
  {
    title: "Active Cases",
    value: "5",
    change: "+2% from last period",
    icon: <CheckCircle2 className="h-5 w-5 text-violet-700" />,
    iconBg: "bg-violet-100",
  },
  {
    title: "High Exposure",
    value: "3",
    change: "-5.2% from last period",
    icon: <BarChart3 className="h-5 w-5 text-orange-700" />,
    iconBg: "bg-orange-100",
  },
  {
    title: "Upcoming Hearings",
    value: "5",
    change: "-12% from last period",
    icon: <CalendarDays className="h-5 w-5 text-emerald-700" />,
    iconBg: "bg-emerald-100",
  },
  {
    title: "Exposure Band",
    value: "Medium",
    change: "Good",
    icon: <RotateCcw className="h-5 w-5 text-sky-700" />,
    iconBg: "bg-sky-100",
  },
];

type LitigationCaseRow = ExecutiveLitigationCase;

const litigationCases: LitigationCaseRow[] = [
  {
    id: "LIT-001",
    type: "lawsuit",
    parties: "Smith v. Allneeda Inc",
    jurisdiction: "CA-N.D.",
    nextHearing: "3/2/2026",
    exposure: "medium",
    status: "active",
  },
  {
    id: "LIT-002",
    type: "arbitration",
    parties: "Johnson Food Services v. Allneeda Inc",
    jurisdiction: "US-NY",
    nextHearing: "2/13/2026",
    exposure: "high",
    status: "active",
  },
  {
    id: "LIT-003",
    type: "regulatory proceeding",
    parties: "FTC v. Allneeda Inc",
    jurisdiction: "US-DC",
    nextHearing: "3/17/2026",
    exposure: "high",
    status: "active",
  },
  {
    id: "LIT-004",
    type: "lawsuit",
    parties: "Martinez v. Allneeda Inc",
    jurisdiction: "TX",
    nextHearing: "-",
    exposure: "low",
    status: "settled",
  },
  {
    id: "LIT-005",
    type: "arbitration",
    parties: "Elite Contractors LLC v. Allneeda Inc",
    jurisdiction: "US-CA",
    nextHearing: "1/31/2026",
    exposure: "medium",
    status: "active",
  },
  {
    id: "LIT-006",
    type: "lawsuit",
    parties: "Chen v. Allneeda Inc (Class Action)",
    jurisdiction: "CA-S.D.",
    nextHearing: "4/1/2026",
    exposure: "high",
    status: "active",
  },
];

const exposureBadgeClasses: Record<LitigationCaseRow["exposure"], string> = {
  low: "bg-slate-100 text-slate-900",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-rose-100 text-rose-700",
};

const statusBadgeClasses: Record<LitigationCaseRow["status"], string> = {
  active: "bg-slate-950 text-white",
  settled: "bg-slate-100 text-slate-700",
};

export default function LitigationRisk() {
  const [isCreateCaseDialogOpen, setIsCreateCaseDialogOpen] = useState(false);
  const [isExecutiveSummaryOpen, setIsExecutiveSummaryOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<LitigationCaseRow | null>(
    null,
  );

  function openExecutiveSummary(row: LitigationCaseRow) {
    setSelectedCase(row);
    setIsExecutiveSummaryOpen(true);
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Litigation Risk"
        subtitle="Here’s what’s happening with your marketing campaigns today."
      />

      <GlobalFilters />

      <div className="grid gap-4 xl:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card
            key={stat.title}
            className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="space-y-4 py-6 px-5">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "grid h-12 w-12 place-items-center rounded-3xl",
                    stat.iconBg,
                  )}
                >
                  {stat.icon}
                </div>
                <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-500">
                  {stat.title}
                </span>
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p className="text-sm font-medium text-emerald-700">
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="overflow-hidden bg-white">
        <CardHeader className="border-b border-slate-200">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Litigation Dashboard
              </CardTitle>
              <p className="text-sm text-slate-500">
                Active lawsuits and legal risk management
              </p>
            </div>
            <Button
              className="whitespace-nowrap"
              onClick={() => setIsCreateCaseDialogOpen(true)}
            >
              + Create Case
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Parties</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Next Hearing</TableHead>
                <TableHead>Exposure</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {litigationCases.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-slate-900">
                    {row.id}
                  </TableCell>
                  <TableCell className="capitalize text-slate-700">
                    {row.type}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {row.parties}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {row.jurisdiction}
                  </TableCell>
                  <TableCell className="text-slate-700">
                    {row.nextHearing}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "text-xs font-semibold px-2 py-1",
                        exposureBadgeClasses[row.exposure],
                      )}
                    >
                      {row.exposure}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "text-xs font-semibold px-2 py-1",
                        statusBadgeClasses[row.status],
                      )}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => openExecutiveSummary(row)}
                    >
                      CEO Summary
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="rounded-3xl border border-rose-200 bg-rose-50 p-6 text-sm text-slate-900 shadow-sm">
        <h3 className="text-lg font-semibold text-rose-950">
          Restricted Access
        </h3>
        <p className="mt-2 text-slate-700">
          Litigation data is highly confidential - access logged and audited.
        </p>
        <ul className="mt-4 space-y-2 list-disc pl-5 text-slate-700">
          <li>
            Litigation data is highly confidential - access logged and audited
          </li>
          <li>CEO approval required for sharing outside LPD</li>
          <li>
            Do not store privileged attorney-client documents without secure
            process
          </li>
        </ul>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="overflow-hidden bg-white">
          <CardHeader className="border-b border-slate-200">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Litigation by Exposure Band
              </CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of litigation cases by financial exposure
              </p>
            </div>
          </CardHeader>
          <CardContent className="">
            <LitigationExposureBandChart />
          </CardContent>
        </Card>

        <Card className="overflow-hidden bg-white">
          <CardHeader className="border-b border-slate-200">
            <div>
              <CardTitle className="text-xl text-slate-900">
                Litigation Timeline
              </CardTitle>
              <p className="text-sm text-slate-500">
                Active vs settled cases over time
              </p>
            </div>
          </CardHeader>
          <CardContent className="">
            <LitigationTimelineChart />
          </CardContent>
        </Card>
      </div>

      <CreateLitigationCaseDialog
        open={isCreateCaseDialogOpen}
        onOpenChange={setIsCreateCaseDialogOpen}
      />

      <ExecutiveLitigationSummaryDialog
        open={isExecutiveSummaryOpen}
        onOpenChange={setIsExecutiveSummaryOpen}
        litigationCase={selectedCase}
      />
    </div>
  );
}
