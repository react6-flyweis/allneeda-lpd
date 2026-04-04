import { Eye, FileText } from "lucide-react";
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
import DraftLegalMemoDialog, {
  type DraftMemoFormValues,
} from "@/components/legal-governance/DraftLegalMemoDialog";
import ViewLegalMemoDialog from "@/components/legal-governance/ViewLegalMemoDialog";

type LegalMemo = {
  id: string;
  title: string;
  version: string;
  status: string;
  published: string;
  contentSummary: string;
  intakeId: string;
  approvalRequired: "Yes" | "No";
};

const initialMemoRows: LegalMemo[] = [
  {
    id: "LM-001",
    title: "SF Health Dept Compliance Requirements",
    version: "v1",
    status: "Published",
    published: "1/14/2026",
    contentSummary:
      "Recommendations for remediation and permit renewal process",
    intakeId: "LI-001",
    approvalRequired: "Yes",
  },
  {
    id: "LM-002",
    title: "GDPR Breach Assessment",
    version: "v2",
    status: "Awaiting Approval",
    published: "-",
    contentSummary: "Evaluation of breach notice obligations and next steps",
    intakeId: "LI-002",
    approvalRequired: "Yes",
  },
];

const statusColorMap: Record<string, string> = {
  Published: "bg-slate-100 text-slate-700",
  "Awaiting Approval": "bg-slate-100 text-slate-700",
  Draft: "bg-slate-100 text-slate-700",
};

export default function LegalMemoLibraryCard() {
  const [memoRows, setMemoRows] = useState<LegalMemo[]>(initialMemoRows);
  const [isDraftOpen, setIsDraftOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [selectedMemo, setSelectedMemo] = useState<LegalMemo | null>(null);

  const handleDraftMemoSubmit = (values: DraftMemoFormValues) => {
    setMemoRows((currentRows) => [
      {
        id: `LM-${String(currentRows.length + 1).padStart(3, "0")}`,
        title: values.title,
        version: "Draft",
        status:
          values.approvalRequired === "Yes" ? "Awaiting Approval" : "Draft",
        published: "-",
        contentSummary: values.contentSummary,
        intakeId: values.intakeId,
        approvalRequired: values.approvalRequired,
      },
      ...currentRows,
    ]);
  };

  const handleViewDialogOpenChange = (open: boolean) => {
    if (!open) {
      setSelectedMemo(null);
    }

    setIsViewOpen(open);
  };

  return (
    <>
      <DraftLegalMemoDialog
        open={isDraftOpen}
        onOpenChange={setIsDraftOpen}
        onSubmit={handleDraftMemoSubmit}
      />
      <ViewLegalMemoDialog
        open={isViewOpen}
        onOpenChange={handleViewDialogOpenChange}
        memo={selectedMemo}
      />
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Legal Memo Library</CardTitle>
            <p className="text-sm text-slate-500">
              Published legal positions and recommendations
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsDraftOpen(true)}
          >
            <FileText className="mr-2 h-4 w-4" />
            Draft Memo
          </Button>
        </CardHeader>

        <CardContent>
          <Table className="min-w-full">
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Version</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Published</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memoRows.map((memo) => (
                <TableRow key={memo.id}>
                  <TableCell className="font-medium text-slate-900">
                    {memo.id}
                  </TableCell>
                  <TableCell>{memo.title}</TableCell>
                  <TableCell>{memo.version}</TableCell>
                  <TableCell>
                    <span
                      className={`inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold ${
                        statusColorMap[memo.status] ??
                        "bg-slate-100 text-slate-700"
                      }`}
                    >
                      {memo.status}
                    </span>
                  </TableCell>
                  <TableCell>{memo.published}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSelectedMemo(memo);
                        setIsViewOpen(true);
                      }}
                    >
                      <Eye className="mr-2 h-4 w-4" />
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
