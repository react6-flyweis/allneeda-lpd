import {
  CheckCircle2,
  FileText,
  ShieldCheck,
  AlertTriangle,
  CalendarDays,
} from "lucide-react";
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
import PolicyAcceptanceTrendChart from "@/components/policies/PolicyAcceptanceTrendChart";
import PoliciesByTypeChart from "@/components/policies/PoliciesByTypeChart";
import PolicyLibraryCard from "@/components/policies/PolicyLibraryCard";
import PageHeader from "@/components/PageHeader";
import GlobalFilters from "@/components/dashboard/GlobalFilters";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
};

type PolicyRow = {
  id: string;
  type: string;
  audience: string;
  jurisdiction: string;
  version: string;
  status: string;
};

type PolicyVersionRow = {
  id: string;
  policy: string;
  version: string;
  changeSummary: string;
  effectiveDate: string;
  daysUntilEffective: string;
  status: string;
};

const overviewStats: OverviewStat[] = [
  {
    title: "Total Policies",
    value: "3",
    change: "+0.2% from last period",
    isPositive: true,
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Published",
    value: "2",
    change: "0% from last period",
    isPositive: true,
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "In Draft",
    value: "1",
    change: "-0.1% from last period",
    isPositive: false,
    icon: <AlertTriangle className="h-4 w-4" />,
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    title: "Effective Soon",
    value: "1",
    change: "+5.2% from last period",
    isPositive: true,
    icon: <CheckCircle2 className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const policyRows: PolicyRow[] = [
  {
    id: "POL-001",
    type: "Privacy",
    audience: "User",
    jurisdiction: "Global",
    version: "v3",
    status: "Published",
  },
  {
    id: "POL-002",
    type: "ToS",
    audience: "Provider",
    jurisdiction: "US",
    version: "v5",
    status: "Published",
  },
  {
    id: "POL-003",
    type: "Community",
    audience: "Creator",
    jurisdiction: "Global",
    version: "v1",
    status: "Draft",
  },
];

const policyVersionRows: PolicyVersionRow[] = [
  {
    id: "PV-001",
    policy: "Privacy",
    version: "v3",
    changeSummary: "Updated data retention periods per GDPR requirements",
    effectiveDate: "1/23/2026",
    daysUntilEffective: "6d",
    status: "Published",
  },
  {
    id: "PV-002",
    policy: "ToS",
    version: "v5",
    changeSummary: "Added dispute resolution procedures",
    effectiveDate: "12/17/2025",
    daysUntilEffective: "",
    status: "Published",
  },
];

function PoliciesDocuments() {
  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Policies & Documents"
          subtitle="Here’s what's happening with your marketing campaigns today."
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

      <PolicyLibraryCard initialRows={policyRows} />

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Recent Policy Versions</CardTitle>
            <p className="text-sm text-slate-500">
              Version history and change tracking
            </p>
          </div>
          <Button variant="outline" size="sm">
            <FileText className="h-4 w-4" />
            Generate Acceptance Report
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>Version ID</TableHead>
                <TableHead>Policy</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Change Summary</TableHead>
                <TableHead>Effective Date</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {policyVersionRows.map((version) => (
                <TableRow key={version.id}>
                  <TableCell className="font-medium text-slate-900">
                    {version.id}
                  </TableCell>
                  <TableCell>{version.policy}</TableCell>
                  <TableCell>{version.version}</TableCell>
                  <TableCell>{version.changeSummary}</TableCell>
                  <TableCell className="flex items-center gap-2 text-slate-600">
                    <CalendarDays className="h-4 w-4" />
                    {version.effectiveDate}
                  </TableCell>
                  <TableCell>
                    <span className="inline-flex rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-900">
                      {version.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm">
                      View Diff
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="bg-sky-50 border border-sky-100 text-slate-900">
        <CardHeader>
          <div>
            <CardTitle>Governance & Guardrails</CardTitle>
            <p className="text-sm text-slate-600">
              Policy governance guidance for the legal lifecycle
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <ul className="space-y-3 text-sm">
            <li className="flex gap-3 text-slate-700">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              Published versions cannot be edited; only new versions allowed
            </li>
            <li className="flex gap-3 text-slate-700">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              Acceptance logs must be immutable and auditable
            </li>
            <li className="flex gap-3 text-slate-700">
              <span className="mt-1 h-2.5 w-2.5 rounded-full bg-slate-950" />
              LPD defines acceptance requirements; Product/Automation enforces
              in app
            </li>
          </ul>
        </CardContent>
      </Card>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Policy Acceptance Rate - Weekly Trend</CardTitle>
              <p className="text-sm text-slate-500">
                Percentage of users accepting new policy versions
              </p>
            </div>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <PolicyAcceptanceTrendChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Policies by Type</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of active policies
              </p>
            </div>
          </CardHeader>
          <CardContent className="pb-4 pt-0">
            <PoliciesByTypeChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
export default PoliciesDocuments;
