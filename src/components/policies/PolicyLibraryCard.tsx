import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CreatePolicyDialog, {
  type PolicyFormValues,
} from "@/components/policies/CreatePolicyDialog";
import EditPolicyDialog from "@/components/policies/EditPolicyDialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { useState } from "react";

type PolicyRow = {
  id: string;
  type: string;
  audience: string;
  jurisdiction: string;
  version: string;
  status: string;
  description?: string;
};

type PolicyLibraryCardProps = {
  initialRows?: PolicyRow[];
};

const statusClasses: Record<string, string> = {
  Published: "bg-slate-950 text-white",
  Draft: "bg-slate-100 text-slate-700",
};

function PolicyLibraryCard({ initialRows = [] }: PolicyLibraryCardProps) {
  const [rows, setRows] = useState<PolicyRow[]>(initialRows);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<PolicyRow | null>(null);

  const onSubmit = (values: PolicyFormValues) => {
    const newRow: PolicyRow = {
      id: `POL-${String(rows.length + 1).padStart(3, "0")}`,
      type: values.type,
      audience: values.audience,
      jurisdiction: values.jurisdiction,
      version: "v1",
      status: values.status,
      description: values.description,
    };

    setRows((current) => [newRow, ...current]);
    setIsDialogOpen(false);
  };

  const openEditDialog = (policy: PolicyRow) => {
    setSelectedPolicy(policy);
    setEditDialogOpen(true);
  };

  const handlePolicyUpdate = (id: string, values: PolicyFormValues) => {
    setRows((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              type: values.type,
              audience: values.audience,
              jurisdiction: values.jurisdiction,
              status: values.status,
              description: values.description,
            }
          : row,
      ),
    );
    setEditDialogOpen(false);
    setSelectedPolicy(null);
  };

  return (
    <>
      <Card>
        <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Policy Library</CardTitle>
            <p className="text-sm text-slate-500">
              Platform policies and legal documents
            </p>
          </div>
          <CreatePolicyDialog
            isOpen={isDialogOpen}
            onOpenChange={setIsDialogOpen}
            onPolicyCreate={onSubmit}
          />
        </CardHeader>

        <CardContent>
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Audience</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Current Version</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((policy) => (
                  <TableRow key={policy.id}>
                    <TableCell className="font-medium text-slate-900">
                      {policy.id}
                    </TableCell>
                    <TableCell>{policy.type}</TableCell>
                    <TableCell>{policy.audience}</TableCell>
                    <TableCell>{policy.jurisdiction}</TableCell>
                    <TableCell>{policy.version}</TableCell>
                    <TableCell>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-3 py-1 text-xs font-semibold",
                          statusClasses[policy.status],
                        )}
                      >
                        {policy.status}
                      </span>
                    </TableCell>
                    <TableCell className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEditDialog(policy)}
                      >
                        Edit Draft
                      </Button>
                      <Button variant="outline" size="sm">
                        Versions
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <EditPolicyDialog
        isOpen={editDialogOpen}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedPolicy(null);
          }
          setEditDialogOpen(open);
        }}
        policy={selectedPolicy}
        onPolicyUpdate={handlePolicyUpdate}
      />
    </>
  );
}

export default PolicyLibraryCard;
