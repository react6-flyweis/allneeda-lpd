import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import LegalIntakeDialog from "@/components/legal-governance/LegalIntakeDialog";
import ReviewLegalIntakeDialog from "@/components/dashboard/ReviewLegalIntakeDialog";
import { type IntakeRow } from "@/components/dashboard/types";

const riskOptions = ["All Risk Levels", "Critical", "High", "Medium", "Low"];
const statusOptions = [
  "All Statuses",
  "Open",
  "In Review",
  "Waiting Approval",
  "Closed",
];

const initialIntakeRows: IntakeRow[] = [
  {
    id: "L1-001",
    category: "Regulatory",
    description: "Health department inspection follow-up required",
    product: "Food",
    jurisdiction: "CA-SF",
    owner: "Sarah Chen",
    created: "1/12/2026",
    slaDue: "1/19/2026",
    risk: "High",
    status: "In Review",
  },
  {
    id: "L1-002",
    category: "Privacy",
    description: "Data breach notification assessment",
    product: "Social",
    jurisdiction: "US-NY",
    owner: "Michael Torres",
    created: "1/10/2026",
    slaDue: "1/11/2026",
    risk: "Critical",
    status: "Waiting Approval",
  },
  {
    id: "L1-003",
    category: "IP",
    description: "Content copyright dispute escalation",
    product: "Influencer Marketplace",
    jurisdiction: "US-CA",
    owner: "Amanda Lopez",
    created: "1/08/2026",
    slaDue: "1/14/2026",
    risk: "Medium",
    status: "Open",
  },
];

const riskClasses: Record<string, string> = {
  Low: "bg-emerald-100 text-emerald-700",
  Medium: "bg-slate-950 text-white",
  Critical: "bg-rose-600 text-white",
  High: "bg-rose-600 text-white",
};

const statusClasses: Record<string, string> = {
  Open: "bg-slate-100 text-slate-700",
  "In Review": "bg-slate-100 text-slate-700",
  "Waiting Approval": "bg-black text-white",
  Closed: "bg-slate-100 text-slate-700",
};

export default function LegalIntakeCard() {
  const [rows, setRows] = useState(initialIntakeRows);
  const [riskFilter, setRiskFilter] = useState(riskOptions[0]);
  const [statusFilter, setStatusFilter] = useState(statusOptions[0]);
  const [isCreateIntakeOpen, setIsCreateIntakeOpen] = useState(false);
  const [isReviewOpen, setIsReviewOpen] = useState(false);
  const [selectedIntake, setSelectedIntake] = useState<IntakeRow | null>(null);

  const filteredRows = rows.filter(
    (row) =>
      (riskFilter === riskOptions[0] || row.risk === riskFilter) &&
      (statusFilter === statusOptions[0] || row.status === statusFilter),
  );

  const openReviewDialog = (row: IntakeRow) => {
    setSelectedIntake(row);
    setIsReviewOpen(true);
  };

  const closeReviewDialog = () => {
    setIsReviewOpen(false);
    setSelectedIntake(null);
  };

  const handleReviewSave = (status: string, risk: string) => {
    if (!selectedIntake) {
      return;
    }

    setRows((currentRows) =>
      currentRows.map((row) =>
        row.id === selectedIntake.id
          ? {
              ...row,
              status,
              risk,
            }
          : row,
      ),
    );
    closeReviewDialog();
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Legal Intake Queue</CardTitle>
            <p className="text-sm text-slate-500">
              Manage legal issues and risk triage
            </p>
          </div>
          <Button size="sm" onClick={() => setIsCreateIntakeOpen(true)}>
            Create Intake
          </Button>
        </CardHeader>

        <LegalIntakeDialog
          open={isCreateIntakeOpen}
          onOpenChange={setIsCreateIntakeOpen}
        />

        <CardContent>
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-3">
              <Select value={riskFilter} onValueChange={setRiskFilter}>
                <SelectTrigger className="w-48 bg-slate-100">
                  <SelectValue placeholder="All Risk Levels" />
                </SelectTrigger>
                <SelectContent>
                  {riskOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-48 bg-slate-100">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  {statusOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Risk</TableHead>
                <TableHead>SLA Due</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell className="font-medium text-slate-900">
                    {row.id}
                  </TableCell>
                  <TableCell>{row.category}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{row.product}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${
                        riskClasses[row.risk] ?? "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {row.risk}
                    </span>
                  </TableCell>
                  <TableCell>{row.slaDue}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-lg px-2 py-1 text-xs font-semibold ${
                        statusClasses[row.status] ??
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {row.status}
                    </span>
                  </TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => openReviewDialog(row)}
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

      <ReviewLegalIntakeDialog
        open={isReviewOpen}
        onOpenChange={(open) => !open && closeReviewDialog()}
        intake={selectedIntake}
        onSave={handleReviewSave}
        onCancel={closeReviewDialog}
      />
    </>
  );
}
