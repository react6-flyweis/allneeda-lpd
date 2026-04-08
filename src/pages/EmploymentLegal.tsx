import {
  ArrowUpRight,
  FileText,
  ShieldCheck,
  AlertTriangle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import EmploymentCasesByTypeChart from "@/components/employment/EmploymentCasesByTypeChart";
import EmploymentResolutionTimeChart from "@/components/employment/EmploymentResolutionTimeChart";
import PageHeader from "@/components/PageHeader";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import EmploymentTemplateDialog from "@/components/EmploymentTemplateDialog";
import { cn } from "@/lib/utils";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
};

type TemplateRow = {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  lastReviewed: string;
  status: "active" | "needs review";
};

const statusBadgeClasses: Record<TemplateRow["status"], string> = {
  active: "bg-emerald-100 text-emerald-700",
  "needs review": "bg-rose-100 text-rose-700",
};

const overviewStats: OverviewStat[] = [
  {
    title: "Active Templates",
    value: "4",
    change: "+2% from last period",
    isPositive: true,
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Needs Review",
    value: "3",
    change: "-5.2% from last period",
    isPositive: false,
    icon: <AlertTriangle className="h-4 w-4" />,
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    title: "Open Cases",
    value: "1",
    change: "-12% from last period",
    isPositive: true,
    icon: <ArrowUpRight className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Termination Reviews",
    value: "1",
    change: "+1% from last period",
    isPositive: true,
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const initialTemplateRows: TemplateRow[] = [
  {
    id: "WT-001",
    name: "US Employee Offer Letter",
    type: "offer letter",
    jurisdiction: "US-CA",
    lastReviewed: "10/18/2025",
    status: "active",
  },
  {
    id: "WT-002",
    name: "Contractor Agreement - General",
    type: "contractor agreement",
    jurisdiction: "US-General",
    lastReviewed: "6/30/2025",
    status: "needs review",
  },
  {
    id: "WT-003",
    name: "Employee NDA - Technology",
    type: "NDA",
    jurisdiction: "US-CA",
    lastReviewed: "12/2/2025",
    status: "active",
  },
  {
    id: "WT-004",
    name: "Termination Letter - At-Will Employment",
    type: "termination letter",
    jurisdiction: "US-TX",
    lastReviewed: "7/20/2025",
    status: "needs review",
  },
  {
    id: "WT-005",
    name: "Contractor Agreement - EU Compliant",
    type: "contractor agreement",
    jurisdiction: "EU-GDPR",
    lastReviewed: "12/17/2025",
    status: "active",
  },
  {
    id: "WT-006",
    name: "Offer Letter - New York State",
    type: "offer letter",
    jurisdiction: "US-NY",
    lastReviewed: "9/18/2025",
    status: "active",
  },
  {
    id: "WT-007",
    name: "Executive NDA - Board Level",
    type: "NDA",
    jurisdiction: "US-DE",
    lastReviewed: "5/11/2025",
    status: "needs review",
  },
];

function EmploymentLegal() {
  const [templateRows] = useState<TemplateRow[]>(initialTemplateRows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Employment Legal"
          subtitle="Here’s what's happening with your marketing campaigns today."
          actions={
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsDialogOpen(true)}
            >
              + Create Template
            </Button>
          }
        />
      </section>

      <GlobalFilters />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((item) => (
          <Card
            key={item.title}
            className="border border-slate-200 bg-white shadow-sm py-4"
          >
            <CardContent className="px-4">
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-full ${item.iconBg}`}
                >
                  {item.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{item.title}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {item.value}
                  </p>
                </div>
              </div>
              <p
                className={`mt-4 text-sm ${item.isPositive ? "text-emerald-600" : "text-rose-600"}`}
              >
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Employment Templates</CardTitle>
            <p className="text-sm text-slate-500">
              Legal templates for workforce management
            </p>
          </div>
          <div className="hidden md:block">
            <Button variant="secondary" onClick={() => setIsDialogOpen(true)}>
              + Create Template
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Last Reviewed</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {templateRows.map((row) => (
                  <TableRow key={row.id} className="hover:bg-slate-50">
                    <TableCell className="font-medium text-slate-900">
                      {row.id}
                    </TableCell>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>{row.type}</TableCell>
                    <TableCell>{row.jurisdiction}</TableCell>
                    <TableCell>{row.lastReviewed}</TableCell>
                    <TableCell>
                      <Badge
                        className={cn(
                          "rounded-full px-3 py-1 text-xs font-semibold",
                          statusBadgeClasses[row.status],
                        )}
                      >
                        {row.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Review
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="h-full">
          <CardHeader className="items-center gap-4 sm:flex-row flex-col">
            <div>
              <CardTitle>Employment Case Resolution Time</CardTitle>
              <p className="text-sm text-slate-500">
                Average days to resolve employment cases.
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-[340px] px-4 pb-4 pt-2">
            <EmploymentResolutionTimeChart />
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader className="items-center gap-4 sm:flex-row flex-col">
            <div>
              <CardTitle>Employment Cases by Type</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of employment cases.
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-[340px] px-4 pb-4 pt-2">
            <EmploymentCasesByTypeChart />
          </CardContent>
        </Card>
      </section>

      <EmploymentTemplateDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
      />
    </div>
  );
}

export default EmploymentLegal;
