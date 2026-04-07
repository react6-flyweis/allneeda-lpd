import { useState } from "react";
import type { ReactNode } from "react";
import {
  AlertTriangle,
  CalendarDays,
  ClipboardCheck,
  XOctagon,
} from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RunComplianceChecklistDialog from "@/components/compliance/RunComplianceChecklistDialog";
import AssignRemediationDialog from "@/components/insurance/AssignRemediationDialog";
import ReviewRemediationTaskDialog from "@/components/insurance/ReviewRemediationTaskDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import ComplianceScoreTrendChart from "@/components/compliance/ComplianceScoreTrendChart";
import FindingsBySeverityChart from "@/components/compliance/FindingsBySeverityChart";

type StatItem = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  iconBg: string;
  isPositive: boolean;
};

type FindingRow = {
  id: string;
  title: string;
  severity: "Low" | "Medium";
  status: "open" | "remediation_in_progress";
  published: string;
};

const stats: StatItem[] = [
  {
    title: "Pending Review",
    value: "0",
    change: "-0.2% from last period",
    icon: <ClipboardCheck className="h-5 w-5" />,
    iconBg: "bg-violet-100 text-violet-700",
    isPositive: true,
  },
  {
    title: "Expiring (30d)",
    value: "1",
    change: "-1% from last period",
    icon: <CalendarDays className="h-5 w-5" />,
    iconBg: "bg-sky-100 text-sky-700",
    isPositive: true,
  },
  {
    title: "Expired",
    value: "0",
    change: "-5.2% from last period",
    icon: <XOctagon className="h-5 w-5" />,
    iconBg: "bg-rose-100 text-rose-700",
    isPositive: true,
  },
  {
    title: "Blockers",
    value: "1",
    change: "-0.1% from last period",
    icon: <AlertTriangle className="h-5 w-5" />,
    iconBg: "bg-red-100 text-red-700",
    isPositive: false,
  },
];

const findings: FindingRow[] = [
  {
    id: "CF-001",
    title: "Incomplete permit documentation for 12% of active food providers",
    severity: "Medium",
    status: "remediation_in_progress",
    published: "1/8/2026",
  },
  {
    id: "CF-002",
    title: "Policy acceptance tracking gaps",
    severity: "Low",
    status: "open",
    published: "1/8/2026",
  },
];

type RemediationTaskRow = {
  id: string;
  owner: string;
  acceptanceCriteria: string;
  dueDate: string;
  status: "in_progress" | "pending";
  findingId: string;
};

const remediationTasks: RemediationTaskRow[] = [
  {
    id: "RT-001",
    owner: "COO",
    acceptanceCriteria:
      "All 47 providers have verified permits or are suspended",
    dueDate: "1/30/2026",
    status: "in_progress",
    findingId: "CF-001",
  },
];

const remediationStatusColorMap: Record<RemediationTaskRow["status"], string> =
  {
    in_progress: "bg-slate-900 text-white",
    pending: "bg-slate-700 text-white",
  };

const badgeColorMap: Record<FindingRow["status"], string> = {
  open: "bg-slate-900 text-white",
  remediation_in_progress: "bg-slate-700 text-white",
};

const severityColorMap: Record<FindingRow["severity"], string> = {
  Low: "bg-slate-900 text-white",
  Medium: "bg-slate-700 text-white",
};

function Compliance() {
  const [isRunChecklistOpen, setIsRunChecklistOpen] = useState(false);
  const [isAssignRemediationOpen, setIsAssignRemediationOpen] = useState(false);
  const [isReviewRemediationOpen, setIsReviewRemediationOpen] = useState(false);
  const [selectedFinding, setSelectedFinding] = useState<FindingRow | null>(
    null,
  );
  const [selectedRemediationTask, setSelectedRemediationTask] =
    useState<RemediationTaskRow | null>(null);

  function openAssignRemediationDialog(finding: FindingRow) {
    setSelectedFinding(finding);
    setIsAssignRemediationOpen(true);
  }

  function openReviewRemediationDialog(task: RemediationTaskRow) {
    setSelectedRemediationTask(task);
    setIsReviewRemediationOpen(true);
  }

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Compliance"
          subtitle="Here's what's happening with your marketing campaigns today."
        />
      </section>

      <GlobalFilters />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-slate-200 bg-white/90"
          >
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <div className="mt-3 text-3xl font-semibold text-slate-900">
                    {stat.value}
                  </div>
                </div>
                <div className={cn("rounded-2xl p-3", stat.iconBg)}>
                  {stat.icon}
                </div>
              </div>
              <p
                className={cn(
                  "mt-4 text-sm font-medium",
                  stat.isPositive ? "text-emerald-600" : "text-rose-600",
                )}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Compliance Findings</CardTitle>
              <p className="text-sm text-slate-500">
                Issues requiring remediation
              </p>
            </div>
            <CardAction>
              <Button size="sm" onClick={() => setIsRunChecklistOpen(true)}>
                + Run Checklist
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent className="pt-0">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Published</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {findings.map((finding) => (
                  <TableRow key={finding.id}>
                    <TableCell className="font-medium text-slate-900 py-4">
                      {finding.id}
                    </TableCell>
                    <TableCell className="py-4 text-slate-700">
                      {finding.title}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                          severityColorMap[finding.severity],
                        )}
                      >
                        {finding.severity}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                          badgeColorMap[finding.status],
                        )}
                      >
                        {finding.status}
                      </span>
                    </TableCell>
                    <TableCell className="py-4 text-slate-700">
                      {finding.published}
                    </TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openAssignRemediationDialog(finding)}
                      >
                        Assign Remediation
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="space-y-4">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Remediation Tasks</CardTitle>
              <p className="text-sm text-slate-500">
                Critical follow-up actions for current compliance findings.
              </p>
            </div>
            <CardAction>
              <Button size="sm">Review All</Button>
            </CardAction>
          </CardHeader>
          <CardContent className="pt-0">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Acceptance Criteria</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {remediationTasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium text-slate-900 py-4">
                      {task.id}
                    </TableCell>
                    <TableCell className="py-4 text-slate-700">
                      {task.owner}
                    </TableCell>
                    <TableCell className="py-4 text-slate-700">
                      {task.acceptanceCriteria}
                    </TableCell>
                    <TableCell className="py-4 text-slate-700">
                      {task.dueDate}
                    </TableCell>
                    <TableCell className="py-4">
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                          remediationStatusColorMap[task.status],
                        )}
                      >
                        {task.status === "in_progress"
                          ? "in progress"
                          : "pending"}
                      </span>
                    </TableCell>
                    <TableCell className="py-4">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openReviewRemediationDialog(task)}
                      >
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <RunComplianceChecklistDialog
        open={isRunChecklistOpen}
        onOpenChange={setIsRunChecklistOpen}
      />

      <AssignRemediationDialog
        open={isAssignRemediationOpen}
        onOpenChange={setIsAssignRemediationOpen}
        reviewRow={selectedFinding}
      />

      <ReviewRemediationTaskDialog
        open={isReviewRemediationOpen}
        onOpenChange={setIsReviewRemediationOpen}
        reviewTask={selectedRemediationTask}
      />

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Compliance Score Trend</CardTitle>
              <p className="text-sm text-slate-500">
                Quarterly compliance score progression.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <ComplianceScoreTrendChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Findings by Severity</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of compliance findings.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <FindingsBySeverityChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Compliance;
