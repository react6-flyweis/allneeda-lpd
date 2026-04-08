import { useState } from "react";
import { ArrowUpRight, FileText, Lock, Plus, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
import CreateContractRequestDialog from "@/components/contracts/CreateContractRequestDialog";
import ReviewContractRequestDialog, {
  type ContractRequest as ContractRequestType,
} from "@/components/contracts/ReviewContractRequestDialog";
import ContractCycleTimeChart from "@/components/contracts/ContractCycleTimeChart";
import ContractsByTypeChart from "@/components/contracts/ContractsByTypeChart";

type OverviewStat = {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: React.ReactNode;
  iconBg: string;
};

type ContractRequest = ContractRequestType;

const overviewStats: OverviewStat[] = [
  {
    title: "Open Cases",
    value: "2",
    change: "-0.2% from last period",
    isPositive: false,
    icon: <ArrowUpRight className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Pending Validation",
    value: "1",
    change: "-1% from last period",
    isPositive: false,
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Counter Notices",
    value: "1",
    change: "-5.2% from last period",
    isPositive: false,
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-orange-100 text-orange-700",
  },
  {
    title: "Repeat Infringers",
    value: "1",
    change: "-1% from last period",
    isPositive: false,
    icon: <Lock className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
];

const contractRequests: ContractRequest[] = [
  {
    id: "CR-001",
    type: "DPA",
    vendor: "CloudData Analytics Inc",
    requester: "CTO",
    status: "approval",
    created: "1/4/2026",
  },
  {
    id: "CR-002",
    type: "Influencer Agreement",
    vendor: "Taylor Swift Management",
    requester: "CMO",
    status: "signed",
    created: "12/17/2025",
  },
  {
    id: "CR-003",
    type: "MSA",
    vendor: "Global Logistics Partners LLC",
    requester: "COO",
    status: "review",
    created: "1/11/2026",
  },
  {
    id: "CR-004",
    type: "NDA",
    vendor: "Tech Innovations Corp",
    requester: "VP Product",
    status: "signed",
    created: "12/2/2025",
  },
  {
    id: "CR-005",
    type: "SOW",
    vendor: "Design Studio Pro",
    requester: "Head of Design",
    status: "draft",
    created: "1/13/2026",
  },
  {
    id: "CR-006",
    type: "Enterprise Terms",
    vendor: "Fortune 500 Retailer Inc",
    requester: "VP Sales",
    status: "approval",
    created: "1/8/2026",
  },
  {
    id: "CR-007",
    type: "DPA",
    vendor: "SecureCloud Storage Solutions",
    requester: "CISO",
    status: "review",
    created: "1/10/2026",
  },
];

const statusColorMap: Record<ContractRequest["status"], string> = {
  approval: "bg-emerald-100 text-emerald-700",
  signed: "bg-sky-100 text-sky-700",
  review: "bg-amber-100 text-amber-700",
  draft: "bg-violet-100 text-violet-700",
};

function Contracts() {
  const [isCreateRequestOpen, setIsCreateRequestOpen] = useState(false);
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] =
    useState<ContractRequest | null>(null);

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Contracts"
          subtitle="Here’s what's happening with your marketing campaigns today."
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
                className={`mt-4 text-sm ${
                  item.isPositive ? "text-emerald-600" : "text-rose-600"
                }`}
              >
                {item.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Contract Requests</CardTitle>
              <p className="text-sm text-slate-500">
                Manage vendor agreements and contracts
              </p>
            </div>
            <Button onClick={() => setIsCreateRequestOpen(true)}>
              <Plus />
              Create Request
            </Button>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Requester</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contractRequests.map((request) => (
                  <TableRow key={request.id} className="bg-slate-50/50">
                    <TableCell className="font-medium text-slate-900">
                      {request.id}
                    </TableCell>
                    <TableCell>{request.type}</TableCell>
                    <TableCell>{request.vendor}</TableCell>
                    <TableCell>{request.requester}</TableCell>
                    <TableCell>
                      <Badge className={statusColorMap[request.status]}>
                        {request.status}
                      </Badge>
                    </TableCell>
                    <TableCell>{request.created}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedRequest(request);
                          setIsReviewDialogOpen(true);
                        }}
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

      <section className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div>
              <CardTitle>Contract Cycle Time</CardTitle>
              <p className="text-sm text-slate-500">
                Average days to complete contract requests
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-72 px-4 pb-4 pt-0">
            <ContractCycleTimeChart />
          </CardContent>
        </Card>

        <Card className="border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <div>
              <CardTitle>Contracts by Type</CardTitle>
              <p className="text-sm text-slate-500">
                Distribution of contract types
              </p>
            </div>
          </CardHeader>
          <CardContent className="h-72 px-4 pb-4 pt-0">
            <ContractsByTypeChart />
          </CardContent>
        </Card>
      </section>

      <CreateContractRequestDialog
        open={isCreateRequestOpen}
        onOpenChange={setIsCreateRequestOpen}
      />
      <ReviewContractRequestDialog
        open={isReviewDialogOpen}
        onOpenChange={(open) => {
          setIsReviewDialogOpen(open);
          if (!open) {
            setSelectedRequest(null);
          }
        }}
        request={selectedRequest}
      />
    </div>
  );
}

export default Contracts;
