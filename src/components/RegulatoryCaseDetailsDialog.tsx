import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Archive,
  CalendarDays,
  FileText,
  ShieldAlert,
  Send,
  UploadCloud,
  UserCheck,
} from "lucide-react";

export type RegulatoryCaseRow = {
  id: string;
  type: string;
  regulator: string;
  description: string;
  assignedTo: string;
  priority: "Critical" | "High" | "Medium" | "Low";
  jurisdiction: string;
  sensitivity: "highly sensitive" | "sensitive" | "normal";
  responseStatus:
    | "In Draft"
    | "Not Started"
    | "Under Review"
    | "Awaiting Response"
    | "Open";
  dateReceived: string;
  deadline: string;
  docs: number;
  tags: string[];
  status:
    | "In Progress"
    | "Pending Review"
    | "Awaiting Response"
    | "Open"
    | "In Review";
};

interface RegulatoryCaseDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  regulatoryCase: RegulatoryCaseRow | null;
}

const statusBadgeClasses: Record<RegulatoryCaseRow["status"], string> = {
  "In Progress": "bg-slate-100 text-slate-900",
  "Pending Review": "bg-orange-100 text-orange-700",
  "Awaiting Response": "bg-sky-100 text-sky-700",
  Open: "bg-emerald-100 text-emerald-700",
  "In Review": "bg-violet-100 text-violet-700",
};

const priorityBadgeClasses: Record<RegulatoryCaseRow["priority"], string> = {
  Critical: "bg-rose-600 text-white",
  High: "bg-slate-950 text-white",
  Medium: "bg-slate-200 text-slate-700",
  Low: "bg-slate-100 text-slate-700",
};

const sensitivityBadgeClasses: Record<
  RegulatoryCaseRow["sensitivity"],
  string
> = {
  "highly sensitive": "bg-rose-600 text-white",
  sensitive: "bg-slate-950 text-white",
  normal: "bg-slate-200 text-slate-700",
};

function getDeadlineStatus(deadline: string) {
  const relativeMatch = deadline.match(/^(\d+)d$/);

  if (relativeMatch) {
    const days = Number(relativeMatch[1]);
    if (days <= 5) {
      return { label: deadline, className: "bg-rose-600 text-white" };
    }
    if (days <= 14) {
      return { label: deadline, className: "bg-amber-100 text-amber-700" };
    }

    return { label: deadline, className: "bg-slate-100 text-slate-900" };
  }

  const parsed = new Date(deadline);
  if (Number.isNaN(parsed.getTime())) {
    return { label: "TBD", className: "bg-slate-100 text-slate-900" };
  }

  const now = new Date();
  const midnightNow = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );
  const midnightDeadline = new Date(
    parsed.getFullYear(),
    parsed.getMonth(),
    parsed.getDate(),
  );
  const diffDays = Math.ceil(
    (midnightDeadline.getTime() - midnightNow.getTime()) /
      (1000 * 60 * 60 * 24),
  );

  if (diffDays <= 0) {
    return { label: "Overdue", className: "bg-rose-600 text-white" };
  }
  if (diffDays <= 5) {
    return { label: `${diffDays}d`, className: "bg-rose-600 text-white" };
  }
  if (diffDays <= 14) {
    return { label: `${diffDays}d`, className: "bg-amber-100 text-amber-700" };
  }

  return { label: `${diffDays}d`, className: "bg-slate-100 text-slate-900" };
}

export default function RegulatoryCaseDetailsDialog({
  open,
  onOpenChange,
  regulatoryCase,
}: RegulatoryCaseDetailsDialogProps) {
  if (!regulatoryCase) {
    return null;
  }

  const caseIdentificationRows = [
    {
      label: "Case ID:",
      value: (
        <span className="font-semibold text-slate-900">
          {regulatoryCase.id}
        </span>
      ),
    },
    {
      label: "Type:",
      value: (
        <Badge className="rounded-full bg-slate-100 text-slate-900 px-3 py-1.5">
          {regulatoryCase.type}
        </Badge>
      ),
    },
    {
      label: "Status:",
      value: (
        <Badge
          className={`rounded-full px-3 py-1.5 ${statusBadgeClasses[regulatoryCase.status]}`}
        >
          {regulatoryCase.status}
        </Badge>
      ),
    },
  ];

  const regulatorInformationRows = [
    {
      label: "Name:",
      value: (
        <span className="font-semibold text-slate-900">
          {regulatoryCase.regulator}
        </span>
      ),
    },
    {
      label: "Jurisdiction:",
      value: (
        <span className="font-semibold text-slate-900">
          {regulatoryCase.jurisdiction}
        </span>
      ),
    },
    {
      label: "Received:",
      value: (
        <span className="font-semibold text-slate-900">
          {regulatoryCase.dateReceived}
        </span>
      ),
    },
  ];

  const deadlineStatus = getDeadlineStatus(regulatoryCase.deadline);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-slate-900" />
            <DialogTitle>Regulatory Case Details</DialogTitle>
          </div>
          <DialogDescription>
            Complete information for case {regulatoryCase.id}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4">
          <div className="grid gap-4 xl:grid-cols-[1.2fr_1fr]">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Case Identification
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <div className="grid gap-3">
                  {caseIdentificationRows.map((row) => (
                    <div
                      className="flex items-center justify-between"
                      key={row.label}
                    >
                      <span>{row.label}</span>
                      {row.value}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Regulator Information
                </CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-slate-600">
                <div className="grid gap-3">
                  {regulatorInformationRows.map((row) => (
                    <div
                      className="flex items-center justify-between"
                      key={row.label}
                    >
                      <span>{row.label}</span>
                      {row.value}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Case Description
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 text-sm leading-7 text-slate-700">
              {regulatoryCase.description}
            </CardContent>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2 ">
            <Card>
              <CardContent>
                <div className="flex items-start gap-3">
                  <ShieldAlert className="h-5 w-5 text-rose-600" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Priority & Classification
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Priority Level:</span>
                        <Badge
                          className={cn(
                            "rounded-full px-3 py-1.5",
                            priorityBadgeClasses[regulatoryCase.priority],
                          )}
                        >
                          {regulatoryCase.priority}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Sensitivity:</span>
                        <Badge
                          className={cn(
                            "rounded-full px-3 py-1.5",
                            sensitivityBadgeClasses[regulatoryCase.sensitivity],
                          )}
                        >
                          {regulatoryCase.sensitivity}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex items-start gap-3">
                  <CalendarDays className="h-5 w-5 text-slate-900" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Timeline & Deadline
                    </p>
                    <div className="mt-4 space-y-3 text-sm text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Deadline:</span>
                        <span className="font-semibold text-slate-900">
                          {regulatoryCase.deadline}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Days Remaining:</span>
                        <Badge
                          className={cn(
                            "rounded-full px-3 py-1.5",
                            deadlineStatus.className,
                          )}
                        >
                          {deadlineStatus.label}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex items-start gap-3">
                  <UserCheck className="h-5 w-5 text-slate-900" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Assignment
                    </p>
                    <div className="mt-4 text-sm text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Assigned To:</span>
                        <span className="font-semibold text-slate-900">
                          {regulatoryCase.assignedTo}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <div className="flex items-start gap-3">
                  <FileText className="h-5 w-5 text-slate-900" />
                  <div>
                    <p className="text-sm font-semibold text-slate-900">
                      Response Progress
                    </p>
                    <div className="mt-4 text-sm text-slate-600">
                      <div className="flex items-center justify-between">
                        <span>Status:</span>
                        <Badge
                          className={`rounded-full px-3 py-1.5 ${statusBadgeClasses[regulatoryCase.status]}`}
                        >
                          {regulatoryCase.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardContent>
              <div className="flex items-center gap-3">
                <Archive className="h-5 w-5 text-slate-900" />
                <p className="text-sm font-semibold text-slate-900">
                  Documents & Metadata
                </p>
              </div>
              <div className="mt-5 grid gap-4 text-sm text-slate-600">
                <div className="flex items-center justify-between">
                  <span>Documents:</span>
                  <Badge className="rounded-full bg-slate-100 px-3 py-1.5 text-slate-900">
                    {regulatoryCase.docs}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-slate-800 font-medium">Tags:</span>
                  {regulatoryCase.tags.length ? (
                    regulatoryCase.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full px-3 py-1.5"
                      >
                        {tag}
                      </Badge>
                    ))
                  ) : (
                    <span className="text-slate-500">None</span>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-rose-50 border border-rose-100">
            <CardContent>
              <div className="flex items-start gap-3 text-rose-700">
                <ShieldAlert className="h-5 w-5" />
                <div>
                  <p className="text-sm font-semibold text-rose-700">
                    Governance Alerts
                  </p>
                  <p className="mt-3 text-sm leading-6">
                    Highly Sensitive - CEO/CTO/CFO approval required for
                    evidence export
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-violet-50 border border-violet-100">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Audit Trail
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-slate-600">
              <div className="grid gap-3">
                <div className="flex items-center justify-between">
                  <span>Created:</span>
                  <span className="font-semibold text-slate-900">
                    1/7/2026, 1:16:51 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Last Updated:</span>
                  <span className="font-semibold text-slate-900">
                    1/16/2026, 1:16:51 PM
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Access Logged:</span>
                  <span className="font-semibold text-emerald-700">
                    ✓ All views audited
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-4">
          <Button variant="outline" className="w-full sm:w-auto">
            <UploadCloud className="mr-2 h-4 w-4" />
            Upload Evidence
          </Button>
          <Button className="w-full sm:w-auto">
            <Send className="mr-2 h-4 w-4" />
            Draft Response
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
