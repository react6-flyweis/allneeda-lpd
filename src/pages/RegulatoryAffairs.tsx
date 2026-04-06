import { type ReactNode, useState } from "react";
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
import { AlertTriangle, Clock, FileText, Plus, ShieldAlert, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import CreateRegulatoryCaseDialog, {
  type CreateRegulatoryCaseFormValues,
} from "@/components/RegulatoryCaseDialog";
import RegulatoryCaseDetailsDialog from "@/components/RegulatoryCaseDetailsDialog";
import RegulatoryResponseDialog from "@/components/RegulatoryResponseDialog";
import ResponseTimeTrendChart from "@/components/regulatory-affairs/ResponseTimeTrendChart";
import CasesBySensitivityChart from "@/components/regulatory-affairs/CasesBySensitivityChart";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  iconBg: string;
};

type RegulatoryCaseRow = {
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

const overviewStats: OverviewStat[] = [
  {
    title: "Open Cases",
    value: "5",
    change: "+0.2% from last period",
    isPositive: true,
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Overdue",
    value: "0",
    change: "0% from last period",
    isPositive: true,
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Highly Sensitive",
    value: "1",
    change: "-0.1% from last period",
    isPositive: false,
    icon: <ShieldAlert className="h-4 w-4" />,
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    title: "Avg Response Time",
    value: "8.5d",
    change: "-5.2% from last period",
    isPositive: true,
    icon: <Clock className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const priorityColorMap: Record<RegulatoryCaseRow["priority"], string> = {
  Critical: "bg-rose-600 text-white",
  High: "bg-slate-950 text-white",
  Medium: "bg-slate-200 text-slate-700",
  Low: "bg-slate-100 text-slate-700",
};

const sensitivityColorMap: Record<RegulatoryCaseRow["sensitivity"], string> = {
  "highly sensitive": "bg-rose-600 text-white",
  sensitive: "bg-slate-950 text-white",
  normal: "bg-slate-200 text-slate-700",
};

const getDeadlineBadgeClass = (deadline: string) => {
  if (deadline === "Overdue") {
    return "bg-rose-600 text-white";
  }

  const match = deadline.match(/^(\d+)d$/);
  if (!match) {
    return "bg-slate-100 text-slate-900";
  }

  const days = Number(match[1]);
  if (days <= 5) {
    return "bg-rose-600 text-white";
  }
  if (days <= 14) {
    return "";
  }
  return "bg-slate-100 text-slate-900";
};

const initialRegulatoryCases: RegulatoryCaseRow[] = [
  {
    id: "REG-001",
    type: "Subpoena",
    regulator: "California Attorney General Office",
    description: "CA Attorney General - Data Request for User Activity Q4 2025",
    assignedTo: "Sarah Chen",
    priority: "Critical",
    jurisdiction: "California, USA",
    sensitivity: "highly sensitive",
    responseStatus: "In Draft",
    dateReceived: "1/6/2026",
    deadline: "4d",
    docs: 12,
    tags: ["data-request", "privacy"],
    status: "In Progress",
  },
  {
    id: "REG-002",
    type: "Info Request",
    regulator: "NYC Department of Health",
    description: "NYC Health Dept - Restaurant Verification Process Inquiry",
    assignedTo: "Michael Torres",
    priority: "Medium",
    jurisdiction: "New York, USA",
    sensitivity: "normal",
    responseStatus: "Not Started",
    dateReceived: "1/13/2026",
    deadline: "20d",
    docs: 3,
    tags: ["food-safety", "permits"],
    status: "Pending Review",
  },
  {
    id: "REG-003",
    type: "Notice",
    regulator: "EU Data Protection Supervisor",
    description: "EU GDPR - Notice of Processing Audit",
    assignedTo: "Amanda Lopez",
    priority: "High",
    jurisdiction: "EU",
    sensitivity: "sensitive",
    responseStatus: "Under Review",
    dateReceived: "1/9/2026",
    deadline: "14d",
    docs: 8,
    tags: ["gdpr", "audit"],
    status: "Awaiting Response",
  },
  {
    id: "REG-004",
    type: "Inquiry",
    regulator: "Federal Trade Commission",
    description: "FTC - Advertising Practices Review",
    assignedTo: "David Kim",
    priority: "High",
    jurisdiction: "USA - Federal",
    sensitivity: "sensitive",
    responseStatus: "Not Started",
    dateReceived: "1/15/2026",
    deadline: "29d",
    docs: 0,
    tags: ["advertising", "ftc"],
    status: "Open",
  },
  {
    id: "REG-005",
    type: "Info Request",
    regulator: "UK Information Commissioner’s Office",
    description: "UK ICO - User Data Processing Questions",
    assignedTo: "Emily Watson",
    priority: "Medium",
    jurisdiction: "United Kingdom",
    sensitivity: "normal",
    responseStatus: "In Draft",
    dateReceived: "1/11/2026",
    deadline: "13d",
    docs: 5,
    tags: ["uk", "data-protection"],
    status: "In Review",
  },
];

function RegulatoryAffairs() {
  const [regulatoryCases, setRegulatoryCases] = useState<RegulatoryCaseRow[]>(
    initialRegulatoryCases,
  );
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isDraftResponseOpen, setIsDraftResponseOpen] = useState(false);
  const [selectedCase, setSelectedCase] = useState<RegulatoryCaseRow | null>(
    null,
  );

  const openDetailsDialog = (item: RegulatoryCaseRow) => {
    setSelectedCase(item);
    setIsDetailsDialogOpen(true);
  };

  const openDraftResponseDialog = (item: RegulatoryCaseRow) => {
    setSelectedCase(item);
    setIsDraftResponseOpen(true);
  };

  const handleCreateCase = (values: CreateRegulatoryCaseFormValues) => {
    setRegulatoryCases((prev) => [
      {
        id: `REG-${prev.length + 1}`,
        type: values.type as RegulatoryCaseRow["type"],
        regulator: values.regulatorName,
        description: values.description,
        assignedTo: values.assignedAttorney,
        priority: values.priority as RegulatoryCaseRow["priority"],
        jurisdiction: "TBD",
        sensitivity: "normal",
        responseStatus: "Not Started",
        dateReceived: new Date().toLocaleDateString("en-US"),
        deadline: "30d",
        docs: 0,
        tags: [],
        status: "Open",
      },
      ...prev,
    ]);
  };

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Regulatory Affairs"
          subtitle="Here’s what’s happening with your marketing campaigns today."
        />
      </section>

      <GlobalFilters />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-slate-200 bg-white shadow-sm py-4"
          >
            <CardContent className="px-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${stat.iconBg}`}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{stat.title}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p
                className={`mt-4 text-sm ${stat.isPositive ? "text-emerald-600" : "text-rose-600"}`}
              >
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Regulatory Case Inbox</CardTitle>
            <p className="text-sm text-slate-500">
              Regulator requests, subpoenas, and official notices
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsCreateDialogOpen(true)}
          >
            <Plus />
            Create Case
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Regulator</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Jurisdiction</TableHead>
                <TableHead>Sensitivity</TableHead>
                <TableHead>Response Status</TableHead>
                <TableHead>Date Received</TableHead>
                <TableHead>Deadline</TableHead>
                <TableHead>Docs</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regulatoryCases.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium text-slate-900">
                    {item.id}
                  </TableCell>
                  <TableCell>{item.type}</TableCell>
                  <TableCell>{item.regulator}</TableCell>
                  <TableCell className="max-w-70 truncate">
                    {item.description}
                  </TableCell>
                  <TableCell>{item.assignedTo}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-lg",
                        priorityColorMap[item.priority],
                      )}
                    >
                      {item.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.jurisdiction}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        "rounded-lg",
                        sensitivityColorMap[item.sensitivity],
                      )}
                    >
                      {item.sensitivity}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn("rounded-lg")}>
                      {item.responseStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.dateReceived}</TableCell>
                  <TableCell className="flex gap-1 items-center">
                    <Clock className="h-3.5 w-3.5" />
                    <Badge
                      className={cn(
                        "rounded-lg",
                        getDeadlineBadgeClass(item.deadline),
                      )}
                    >
                      {item.deadline}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="rounded-lg bg-gray-100 text-slate-900">
                      {item.docs}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-1 flex-wrap">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="rounded-lg">
                        {tag}
                      </Badge>
                    ))}
                  </TableCell>
                  <TableCell>
                    <Badge className={cn("rounded-lg bg-gray-100 text-black")}>
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDetailsDialog(item)}
                    >
                      View Details
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openDraftResponseDialog(item)}
                    >
                      Draft Response
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <CreateRegulatoryCaseDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreate={handleCreateCase}
      />
      <RegulatoryCaseDetailsDialog
        open={isDetailsDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCase(null);
          }
          setIsDetailsDialogOpen(open);
        }}
        regulatoryCase={selectedCase}
      />
      <RegulatoryResponseDialog
        open={isDraftResponseOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedCase(null);
          }
          setIsDraftResponseOpen(open);
        }}
        regulatoryCase={selectedCase}
      />

      <Card className="bg-amber-50 border border-amber-100 text-slate-900">
        <CardHeader>
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-amber-700" />
            <div>
              <CardTitle>Critical Governance Requirements</CardTitle>
              <p className="text-sm text-slate-600">
                Mandatory controls that must be enforced for regulatory cases
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              No evidence exports without CEO/CTO/CFO approval token
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              All notice access logged and audited
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              Overdue sensitive cases escalated to CEO automatically
            </li>
            <li className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              Deadline compliance rate target: 100%
            </li>
          </ul>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Response Time Trend</CardTitle>
              <p className="text-sm text-slate-500">
                Average days to respond to regulatory requests
              </p>
            </div>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <ResponseTimeTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Cases by Sensitivity Level</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of cases by sensitivity classification
              </p>
            </div>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <CasesBySensitivityChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default RegulatoryAffairs;
