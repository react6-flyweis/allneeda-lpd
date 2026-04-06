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
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Plus,
  ShieldCheck,
  Shield,
} from "lucide-react";
import CreatePermitRequirementDialog, {
  type PermitFormValues,
} from "@/components/permits/CreatePermitRequirementDialog";
import PageHeader from "@/components/PageHeader";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import VerificationTurnaroundChart from "@/components/permits/VerificationTurnaroundChart";
import PermitStatusDistributionChart from "@/components/permits/PermitStatusDistributionChart";
import { cn } from "@/lib/utils";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: ReactNode;
  iconBg: string;
};

type PermitRow = {
  id: string;
  provider: string;
  requirement: string;
  status: "verified" | "pending" | "rejected";
  expires: string;
  expiresMeta: string;
  uploaded: string;
};

const overviewStats: OverviewStat[] = [
  {
    title: "Pending Verification",
    value: "1",
    change: "-0.2% from last period",
    isPositive: false,
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Expiring Soon",
    value: "0",
    change: "0% from last period",
    isPositive: true,
    icon: <Clock className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Expired",
    value: "1",
    change: "-5.2% from last period",
    isPositive: false,
    icon: <AlertTriangle className="h-4 w-4" />,
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    title: "Active Blockers",
    value: "1",
    change: "-0.1% from last period",
    isPositive: false,
    icon: <CheckCircle2 className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const initialPermitRows: PermitRow[] = [
  {
    id: "PP-001",
    provider: "Golden Gate Catering",
    requirement: "PR-001",
    status: "verified",
    expires: "3/2/2026",
    expiresMeta: "44d",
    uploaded: "11/17/2025",
  },
  {
    id: "PP-002",
    provider: "Brooklyn Builders LLC",
    requirement: "PR-002",
    status: "pending",
    expires: "-",
    expiresMeta: "-",
    uploaded: "1/14/2026",
  },
  {
    id: "PP-003",
    provider: "SF Quick Bites",
    requirement: "PR-001",
    status: "rejected",
    expires: "1/11/2026",
    expiresMeta: "EXPIRED",
    uploaded: "1/6/2026",
  },
];

const statusColorMap: Record<PermitRow["status"], string> = {
  verified: "bg-slate-950 text-white",
  pending: "bg-slate-100 text-slate-900",
  rejected: "bg-rose-600 text-white",
};

const statusIconMap: Record<PermitRow["status"], ReactNode> = {
  verified: <ShieldCheck className="h-3.5 w-3.5" />,
  pending: <Shield className="h-3.5 w-3.5" />,
  rejected: <Shield className="h-3.5 w-3.5" />,
};

type BlockedProvider = {
  id: string;
  provider: string;
  reason: string;
  liftCriteria: string;
  created: string;
};

const blockedProviders: BlockedProvider[] = [
  {
    id: "PB-001",
    provider: "SF Quick Bites",
    reason: "Health permit expired",
    liftCriteria: "Upload and verify renewed health permit",
    created: "1/11/2026",
  },
];

const expiresMetaColorMap: Record<string, string> = {
  "44d": "bg-slate-100 text-slate-900",
  EXPIRED: "bg-rose-600 text-white",
  "-": "bg-slate-100 text-slate-900",
};

function PermitsLicensing() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [permitData, setPermitData] = useState<PermitRow[]>(initialPermitRows);

  const handleCreatePermit = (values: PermitFormValues) => {
    setPermitData((prev) => [
      ...prev,
      {
        id: `PP-${String(prev.length + 1).padStart(3, "0")}`,
        provider: values.providerName,
        requirement: values.permitType,
        status: "pending",
        expires: "-",
        expiresMeta: "-",
        uploaded: new Intl.DateTimeFormat("en-US").format(new Date()),
      },
    ]);
  };

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Permits & Licensing"
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

      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Permit Verification Queue</CardTitle>
            <p className="text-sm text-slate-500">
              Provider permits and licensing requirements
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsDialogOpen(true)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Requirement
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Requirement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Uploaded</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {permitData.map((item) => (
                <TableRow
                  key={item.id}
                  className={cn(
                    item.status === "rejected" ? "bg-rose-50" : "",
                    "transition-colors",
                  )}
                >
                  <TableCell className="font-medium text-slate-900 py-4">
                    {item.id}
                  </TableCell>
                  <TableCell className="py-4">{item.provider}</TableCell>
                  <TableCell className="py-4">{item.requirement}</TableCell>
                  <TableCell className="py-4">
                    <Badge
                      className={cn(
                        "rounded-full px-3 py-1 text-sm font-semibold inline-flex items-center gap-2",
                        statusColorMap[item.status],
                      )}
                    >
                      {statusIconMap[item.status]}
                      {item.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4">
                    <div className="flex items-center gap-2">
                      <span>{item.expires}</span>
                      {item.expiresMeta !== "-" && (
                        <Badge
                          className={cn(
                            "rounded-full px-2 py-1 text-xs font-semibold",
                            expiresMetaColorMap[item.expiresMeta],
                          )}
                        >
                          {item.expiresMeta}
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-4">{item.uploaded}</TableCell>
                  <TableCell className="py-4 space-x-2">
                    <Button variant="outline" size="sm">
                      Verify
                    </Button>
                    <Button variant="outline" size="sm">
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <Card>
          <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle>Blocked Providers</CardTitle>
              <p className="text-sm text-slate-500">
                Providers blocked due to permit issues
              </p>
            </div>
          </CardHeader>
          <CardContent className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Provider</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Lift Criteria</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {blockedProviders.map((provider) => (
                  <TableRow key={provider.id}>
                    <TableCell className="font-medium text-slate-900 py-4">
                      {provider.id}
                    </TableCell>
                    <TableCell className="py-4">{provider.provider}</TableCell>
                    <TableCell className="py-4">{provider.reason}</TableCell>
                    <TableCell className="py-4">
                      {provider.liftCriteria}
                    </TableCell>
                    <TableCell className="py-4">{provider.created}</TableCell>
                    <TableCell className="py-4">
                      <Button variant="destructive" size="sm">
                        Lift Blocker
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <section className="grid gap-4 xl:grid-cols-2">
          <Card>
            <CardHeader className="flex flex-col gap-4">
              <div>
                <CardTitle>Verification Turnaround Time</CardTitle>
                <p className="text-sm text-slate-500">
                  Average hours to verify permit submissions
                </p>
              </div>
            </CardHeader>
            <CardContent className="h-[320px]">
              <VerificationTurnaroundChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-col gap-4">
              <div>
                <CardTitle>Permit Status Distribution</CardTitle>
                <p className="text-sm text-slate-500">
                  Current status breakdown of all permits
                </p>
              </div>
            </CardHeader>
            <CardContent className="h-[320px]">
              <PermitStatusDistributionChart />
            </CardContent>
          </Card>
        </section>
      </section>

      <CreatePermitRequirementDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreate={handleCreatePermit}
      />
    </div>
  );
}

export default PermitsLicensing;
