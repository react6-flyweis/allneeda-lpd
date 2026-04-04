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
import { cn } from "@/lib/utils";

type PolicyRow = {
  id: string;
  type: string;
  audience: string;
  jurisdiction: string;
  version: string;
  status: string;
};

type PolicyLibraryCardProps = {
  initialRows?: PolicyRow[];
};

const statusClasses: Record<string, string> = {
  Published: "bg-slate-950 text-white",
  Draft: "bg-slate-100 text-slate-700",
};

function PolicyLibraryCard({ initialRows = [] }: PolicyLibraryCardProps) {
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
                      <Button variant="outline" size="sm">
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
    </>
  );
}

export default PolicyLibraryCard;
