import { useState } from "react";
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
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import {
  AlertTriangle,
  ShieldCheck,
  ShieldAlert,
  Clock3,
  FileSearch,
  CalendarDays,
} from "lucide-react";
import COIVerificationTimeChart from "@/components/insurance/COIVerificationTimeChart";
import CoverageComplianceByVerticalChart from "@/components/insurance/CoverageComplianceByVerticalChart";
import RequestAdditionalInfoDialog from "@/components/insurance/RequestAdditionalInfoDialog";
import { cn } from "@/lib/utils";

type SummaryStat = {
  title: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  iconBg: string;
};

type ReviewRow = {
  id: string;
  provider: string;
  vertical: string;
  policyNumber: string;
  insurer: string;
  namedInsured: string;
  coverageType: string;
  coverageAmount: string;
  additionalInsured: string;
  assignedTo: string;
  priority: string;
  uploadDate: string;
  expires: string;
  expiryStatus?: "soon" | "expired";
  docs: number;
  status: string;
  reviewNotes: string;
};

const summaryStats: SummaryStat[] = [
  {
    title: "Pending Review",
    value: "0",
    change: "-0.2% from last period",
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Expiring (30d)",
    value: "1",
    change: "-1% from last period",
    icon: <Clock3 className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    title: "Expired",
    value: "0",
    change: "-5.2% from last period",
    icon: <ShieldAlert className="h-4 w-4" />,
    iconBg: "bg-rose-100 text-rose-700",
  },
  {
    title: "Blockers",
    value: "1",
    change: "-0.1% from last period",
    icon: <FileSearch className="h-4 w-4" />,
    iconBg: "bg-amber-100 text-amber-700",
  },
];

const priorityBadgeClasses: Record<string, string> = {
  Low: "bg-slate-950 text-white",
  Medium: "bg-slate-950 text-white",
  High: "bg-slate-950 text-white",
  Critical: "bg-rose-600 text-white",
};

const statusBadgeClasses: Record<string, string> = {
  pending: "bg-slate-950 text-white",
  verified: "bg-slate-950 text-white",
  expired: "bg-rose-600 text-white",
  rejected: "bg-rose-600 text-white",
  "needs-info": "bg-slate-950 text-white",
};

const expiryBadgeClasses: Record<string, string> = {
  soon: "bg-sky-100 text-sky-700",
  expired: "bg-rose-100 text-rose-700",
};

type InsuranceBlocker = {
  provider: string;
  reason: string;
  liftCriteria: string;
};

const insuranceBlockers: InsuranceBlocker[] = [
  {
    provider: "Brooklyn Builders LLC",
    reason: "Coverage below minimum requirement ($1M required)",
    liftCriteria: "Submit COI with minimum $1M coverage",
  },
];

const reviewRows: ReviewRow[] = [
  {
    id: "COI-001",
    provider: "Golden Gate Catering",
    vertical: "Food",
    policyNumber: "SF-BUS-2025-4478291",
    insurer: "State Farm Business",
    namedInsured: "Golden Gate Catering LLC",
    coverageType: "General Liability & Product Liability",
    coverageAmount: "$2.0M",
    additionalInsured: "Yes",
    assignedTo: "Jennifer Park",
    priority: "Medium",
    uploadDate: "1/14/2026",
    expires: "4/16/2026",
    docs: 3,
    status: "pending",
    reviewNotes: "Awaiting additional insured endorsement verification",
  },
  {
    id: "COI-002",
    provider: "Bay Area Plumbing",
    vertical: "Home Services",
    policyNumber: "HFD-GL-2025-889342",
    insurer: "The Hartford",
    namedInsured: "Bay Area Plumbing Services",
    coverageType: "General Liability",
    coverageAmount: "$1.0M",
    additionalInsured: "Yes",
    assignedTo: "Marcus Thompson",
    priority: "High",
    uploadDate: "1/2/2026",
    expires: "1/31/2026",
    expiryStatus: "soon",
    docs: 2,
    status: "verified",
    reviewNotes: "Verified. Expiring soon - renewal required.",
  },
  {
    id: "COI-003",
    provider: "Elite Home Cleaners",
    vertical: "Home Services",
    policyNumber: "PRG-COM-2024-765221",
    insurer: "Progressive Commercial",
    namedInsured: "Elite Home Cleaners",
    coverageType: "General Liability",
    coverageAmount: "$0.5M",
    additionalInsured: "No",
    assignedTo: "Sarah Chen",
    priority: "Critical",
    uploadDate: "12/27/2025",
    expires: "1/11/2026",
    expiryStatus: "expired",
    docs: 1,
    status: "rejected",
    reviewNotes: "EXPIRED - Coverage insufficient. Provider blocked.",
  },
  {
    id: "COI-004",
    provider: "Downtown Deli Express",
    vertical: "Food",
    policyNumber: "TRV-BUS-2025-992847",
    insurer: "Travelers Insurance",
    namedInsured: "Downtown Deli Express Corp",
    coverageType: "General Liability & Product Liability",
    coverageAmount: "$3.0M",
    additionalInsured: "Yes",
    assignedTo: "Jennifer Park",
    priority: "Low",
    uploadDate: "1/11/2026",
    expires: "7/15/2026",
    docs: 4,
    status: "verified",
    reviewNotes: "All requirements met. Coverage exceeds minimum.",
  },
  {
    id: "COI-005",
    provider: "QuickFix Electrical",
    vertical: "Home Services",
    policyNumber: "LM-ELEC-2025-334291",
    insurer: "Liberty Mutual",
    namedInsured: "QuickFix Electrical Services Inc",
    coverageType: "General Liability & Workers Comp",
    coverageAmount: "$2.0M",
    additionalInsured: "Yes",
    assignedTo: "Marcus Thompson",
    priority: "High",
    uploadDate: "1/9/2026",
    expires: "2/10/2026",
    docs: 2,
    status: "needs-info",
    reviewNotes: "Additional insured endorsement not visible. Requested info.",
  },
];

function Insurance() {
  const [requestDialogOpen, setRequestDialogOpen] = useState(false);
  const [selectedReviewRow, setSelectedReviewRow] = useState<ReviewRow | null>(
    null,
  );

  function openRequestDialog(row: ReviewRow) {
    setSelectedReviewRow(row);
    setRequestDialogOpen(true);
  }

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Insurance"
          subtitle="Here’s what's happening with your insurance portfolio today."
        />
      </section>

      <GlobalFilters />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {summaryStats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-slate-200 bg-white shadow-sm py-4"
          >
            <CardContent className="px-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    stat.iconBg,
                  )}
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
              <p className="mt-4 text-sm text-slate-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>COI Review Queue</CardTitle>
            <p className="text-sm text-slate-500">
              Certificate of insurance verification
            </p>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-425">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Vertical</TableHead>
                <TableHead>Policy Number</TableHead>
                <TableHead>Insurer</TableHead>
                <TableHead>Named Insured</TableHead>
                <TableHead>Coverage Type</TableHead>
                <TableHead>Coverage</TableHead>
                <TableHead>Add'l Insured</TableHead>
                <TableHead>Assigned To</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Upload Date</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Docs</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Review Notes</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewRows.map((row) => (
                <TableRow
                  key={row.id}
                  className="odd:bg-rose-50 hover:bg-slate-100"
                >
                  <TableCell className="font-medium text-slate-900">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.provider}</TableCell>
                  <TableCell>
                    <Badge className="bg-slate-100 text-slate-900">
                      {row.vertical}
                    </Badge>
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.policyNumber}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.insurer}
                  </TableCell>
                  <TableCell className="whitespace-nowrap">
                    {row.namedInsured}
                  </TableCell>
                  <TableCell>{row.coverageType}</TableCell>
                  <TableCell>{row.coverageAmount}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        row.additionalInsured === "Yes"
                          ? "bg-emerald-600 text-white"
                          : "bg-rose-600 text-white",
                      )}
                    >
                      {row.additionalInsured}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.assignedTo}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        priorityBadgeClasses[row.priority] ??
                          "bg-slate-100 text-slate-900",
                      )}
                    >
                      {row.priority}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.uploadDate}</TableCell>
                  <TableCell className="space-y-2">
                    <div className="flex items-center gap-2 text-slate-600 whitespace-nowrap">
                      <CalendarDays className="h-4 w-4" />
                      {row.expires}
                    </div>
                    {row.expiryStatus ? (
                      <Badge
                        className={cn(
                          expiryBadgeClasses[row.expiryStatus] ??
                            "bg-slate-100 text-slate-900",
                        )}
                      >
                        {row.expiryStatus === "soon" ? "Soon" : "EXPIRED"}
                      </Badge>
                    ) : null}
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-slate-100 text-slate-900">
                      {row.docs}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        statusBadgeClasses[row.status] ??
                          "bg-slate-950 text-white",
                      )}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.reviewNotes}</TableCell>
                  <TableCell className="flex gap-2">
                    <Button size="sm" variant="outline" className="">
                      Verify
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      className=""
                      onClick={() => openRequestDialog(row)}
                    >
                      Request Info
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="border border-slate-200 bg-white shadow-sm">
        <CardHeader className="border-b border-slate-200">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-rose-500" />
            <CardTitle>Insurance Blockers</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table className="min-w-225">
            <TableHeader>
              <TableRow>
                <TableHead>Provider</TableHead>
                <TableHead>Reason</TableHead>
                <TableHead>Lift Criteria</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {insuranceBlockers.map((blocker) => (
                <TableRow key={blocker.provider} className="bg-amber-50">
                  <TableCell className="font-medium text-slate-900">
                    {blocker.provider}
                  </TableCell>
                  <TableCell>{blocker.reason}</TableCell>
                  <TableCell>{blocker.liftCriteria}</TableCell>
                  <TableCell>
                    <Button size="sm" variant="destructive">
                      Lift
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <RequestAdditionalInfoDialog
        open={requestDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedReviewRow(null);
          }
          setRequestDialogOpen(open);
        }}
        reviewRow={selectedReviewRow}
        onSubmit={(values) => {
          console.log("Insurance request submitted", values);
        }}
      />

      <section className="grid gap-4 md:grid-cols-2">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div>
              <CardTitle>COI Verification Time</CardTitle>
              <p className="text-sm text-slate-500">
                Average hours to verify certificate of insurance
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-85">
            <COIVerificationTimeChart />
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div>
              <CardTitle>Coverage Compliance by Vertical</CardTitle>
              <p className="text-sm text-slate-500">
                Compliant vs non-compliant providers
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-85">
            <CoverageComplianceByVerticalChart />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

export default Insurance;
