import {
  ArrowUpRight,
  AlertTriangle,
  FileText,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { type ReactNode, useState } from "react";
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
import CreateLegalHoldDialog, {
  type CreateLegalHoldFormValues,
} from "@/components/legal-governance/CreateLegalHoldDialog";
import LegalIntakeCard from "@/components/legal-governance/LegalIntakeCard";
import LegalMemoLibraryCard from "@/components/legal-governance/LegalMemoLibraryCard";
import PageHeader from "@/components/PageHeader";
import LegalIntakeVolumeChart from "@/components/legal-governance/LegalIntakeVolumeChart";
import SlaComplianceTrendChart from "@/components/legal-governance/SlaComplianceTrendChart";
import GlobalFilters from "@/components/dashboard/GlobalFilters";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  iconBg: string;
};

type LegalHoldRow = {
  id: string;
  scopeType: string;
  scopeId: string;
  reason: string;
  liftCriteria: string;
  owner: string;
  created: string;
};

const overviewStats: OverviewStat[] = [
  {
    title: "Open Intakes",
    value: "3",
    change: "+0.2% from last period",
    isPositive: true,
    icon: <ArrowUpRight className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Active Holds",
    value: "2",
    change: "0% from last period",
    isPositive: true,
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "SLA Breaches",
    value: "0",
    change: "-0.1% from last period",
    isPositive: false,
    icon: <AlertTriangle className="h-4 w-4" />,
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    title: "Published Memos",
    value: "1",
    change: "-5.2% from last period",
    isPositive: false,
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const initialHoldRows: LegalHoldRow[] = [
  {
    id: "LH-001",
    scopeType: "City Launch",
    scopeId: "CITY-ATL",
    reason: "Business license application pending approval",
    liftCriteria: "License approved and verified by LPD",
    owner: "GSD",
    created: "1/2/2026",
  },
  {
    id: "LH-002",
    scopeType: "Provider Golive",
    scopeId: "PROV-5678",
    reason: "COI expired - awaiting renewed insurance",
    liftCriteria: "Valid COI verified with min $2M coverage",
    owner: "COO",
    created: "1/9/2026",
  },
];

function LegalGovernance() {
  const [holdRows, setHoldRows] = useState<LegalHoldRow[]>(initialHoldRows);
  const [isCreateHoldOpen, setIsCreateHoldOpen] = useState(false);

  const handleCreateHold = (values: CreateLegalHoldFormValues) => {
    setHoldRows((current) => [
      ...current,
      {
        id: `LH-${String(current.length + 1).padStart(3, "0")}`,
        scopeType: values.scopeType,
        scopeId: values.scopeId,
        reason: values.reason,
        liftCriteria: values.liftCriteria,
        owner: values.ownerDirectory,
        created: new Date().toLocaleDateString("en-US"),
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Legal Governance"
          subtitle="Here’s what’s happening with your marketing campaigns today."
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
                  className={`flex size-12 items-center justify-center rounded-full ${item.iconBg}`}
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

      <LegalIntakeCard />

      <section className="space-y-4">
        <LegalMemoLibraryCard />

        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Active Holds & Blockers</CardTitle>
              <p className="text-sm text-slate-500">
                Legal holds preventing launches and operations
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateHoldOpen(true)}
            >
              <Lock className="mr-2 h-4 w-4" />
              Create Hold
            </Button>
          </CardHeader>
          <CreateLegalHoldDialog
            open={isCreateHoldOpen}
            onOpenChange={setIsCreateHoldOpen}
            onCreate={handleCreateHold}
          />
          <CardContent>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Scope Type</TableHead>
                  <TableHead>Scope ID</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Lift Criteria</TableHead>
                  <TableHead>Owner</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdRows.map((hold) => (
                  <TableRow key={hold.id} className="bg-amber-50">
                    <TableCell className="font-medium text-slate-900">
                      {hold.id}
                    </TableCell>
                    <TableCell>{hold.scopeType}</TableCell>
                    <TableCell>{hold.scopeId}</TableCell>
                    <TableCell>{hold.reason}</TableCell>
                    <TableCell>{hold.liftCriteria}</TableCell>
                    <TableCell>{hold.owner}</TableCell>
                    <TableCell>{hold.created}</TableCell>
                    <TableCell>
                      <Button variant="destructive" size="sm">
                        Lift Hold
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Intake Volume by Category</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of legal intakes across categories
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <LegalIntakeVolumeChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>SLA Compliance Trend</CardTitle>
              <p className="text-sm text-slate-500">
                Monthly SLA compliance rate vs 95% target
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <SlaComplianceTrendChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default LegalGovernance;
