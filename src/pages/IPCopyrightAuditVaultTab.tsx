import { useState } from "react";
import { Database, Lock } from "lucide-react";
import ExportAuditReportDialog from "@/components/ip-copyright/ExportAuditReportDialog";
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
import { TabsContent } from "@/components/ui/tabs";

const auditStats = [
  {
    title: "Evidence Records",
    value: "8,456",
    subtitle: "Immutable storage",
    valueClassName: "text-slate-900",
  },
  {
    title: "Chain of Custody",
    value: "100%",
    subtitle: "Audit compliance",
    valueClassName: "text-emerald-600",
  },
  {
    title: "SLA Compliance",
    value: "96.8%",
    subtitle: "Response time SLA",
    valueClassName: "text-emerald-600",
  },
  {
    title: "Audit Readiness",
    value: "Ready",
    subtitle: "Last audit: Q4 2025",
    valueClassName: "text-emerald-600",
  },
];

const auditRows = [
  {
    evidenceId: "EVD-78901",
    caseReference: "DMCA-2026-001",
    type: "Screenshot",
    timestamp: "Jan 25, 2026 14:23:45",
    custodyChain: "3 handlers",
    typeClassName: "bg-slate-950 text-white hover:bg-slate-950",
    custodyClassName: "bg-slate-950 text-white hover:bg-slate-950",
  },
  {
    evidenceId: "EVD-78902",
    caseReference: "TM-001",
    type: "Document",
    timestamp: "Jan 26, 2026 09:15:22",
    custodyChain: "2 handlers",
    typeClassName: "bg-slate-950 text-white hover:bg-slate-950",
    custodyClassName: "bg-slate-950 text-white hover:bg-slate-950",
  },
  {
    evidenceId: "EVD-78903",
    caseReference: "IP-012",
    type: "Video Recording",
    timestamp: "Jan 24, 2026 16:45:11",
    custodyChain: "5 handlers",
    typeClassName: "bg-slate-950 text-white hover:bg-slate-950",
    custodyClassName: "bg-slate-950 text-white hover:bg-slate-950",
  },
];

function IPCopyrightAuditVaultTab() {
  const [exportReportDialogOpen, setExportReportDialogOpen] = useState(false);

  return (
    <>
      <TabsContent value="audit-&-vault" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {auditStats.map((stat) => {
            return (
              <Card key={stat.title}>
                <CardHeader>
                  <CardTitle className="text-inherit font-medium">
                    {stat.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-1">
                  <p className={`font-semibold ${stat.valueClassName}`}>
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.subtitle}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <Card>
          <CardHeader className="gap-3 flex sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-1">
              <CardTitle className="flex items-center gap-2 text-inherit font-medium">
                <Database className="h-5 w-5" />
                Evidence Vault & Audit Log
              </CardTitle>
              <p className="text-muted-foreground">
                Immutable evidence storage with chain-of-custody tracking
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setExportReportDialogOpen(true)}
            >
              Export Report
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Evidence ID</TableHead>
                  <TableHead>Case Reference</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Custody Chain</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {auditRows.map((row) => {
                  return (
                    <TableRow key={row.evidenceId}>
                      <TableCell className="font-medium">
                        {row.evidenceId}
                      </TableCell>
                      <TableCell>{row.caseReference}</TableCell>
                      <TableCell>
                        <Badge className={row.typeClassName}>{row.type}</Badge>
                      </TableCell>
                      <TableCell>{row.timestamp}</TableCell>
                      <TableCell>
                        <Badge className={row.custodyClassName}>
                          {row.custodyChain}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            <Lock className="mr-2 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            Chain
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <ExportAuditReportDialog
        open={exportReportDialogOpen}
        onOpenChange={setExportReportDialogOpen}
      />
    </>
  );
}

export default IPCopyrightAuditVaultTab;
