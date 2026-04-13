import { useState } from "react";
import { Shield } from "lucide-react";
import BrandRegistryDialog from "@/components/ip-copyright/BrandRegistryDialog";
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

const trademarkStats = [
  {
    title: "Trademark Cases",
    value: "67",
    subtitle: "Active investigations",
    valueClassName: "text-slate-900",
  },
  {
    title: "Impersonation Reports",
    value: "34",
    subtitle: "High priority",
    valueClassName: "text-red-600",
  },
  {
    title: "Fake Listings",
    value: "89",
    subtitle: "Pending removal",
    valueClassName: "text-orange-600",
  },
  {
    title: "Verification Requests",
    value: "156",
    subtitle: "In queue",
    valueClassName: "text-slate-900",
  },
];

const trademarkRows = [
  {
    caseId: "TM-001",
    type: "Celebrity Impersonation",
    typeClassName: "bg-rose-600 text-white hover:bg-rose-600",
    brandEntity: "Verified Actor Account",
    reportedBy: "Official Management",
    severity: "Critical",
    severityClassName: "bg-rose-600 text-white hover:bg-rose-600",
    rowClassName: "bg-rose-50/50",
    actions: ["Suspend", "Review"],
  },
  {
    caseId: "TM-002",
    type: "Trademark Misuse",
    typeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    brandEntity: "Nike Brand Assets",
    reportedBy: "Nike Legal Team",
    severity: "High",
    severityClassName: "bg-orange-600 text-white hover:bg-orange-600",
    rowClassName: "bg-amber-50/70",
    actions: ["Takedown", "Contact"],
  },
  {
    caseId: "TM-003",
    type: "Fake Listing",
    typeClassName: "bg-slate-200 text-slate-800 hover:bg-slate-200",
    brandEntity: "Apple Products",
    reportedBy: "Consumer Report",
    severity: "Medium",
    severityClassName: "bg-slate-950 text-white hover:bg-slate-950",
    rowClassName: "bg-white",
    actions: ["Investigate", "Remove"],
  },
];

function IPCopyrightTrademarkTab() {
  const [brandRegistryDialogOpen, setBrandRegistryDialogOpen] = useState(false);

  return (
    <>
      <TabsContent value="trademark" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {trademarkStats.map((stat) => {
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
                <Shield className="h-5 w-5" />
                Trademark & Impersonation Queue
              </CardTitle>
              <p className="text-muted-foreground">
                Brand protection and identity verification enforcement
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setBrandRegistryDialogOpen(true)}
            >
              Brand Registry
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Case ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Brand/Entity</TableHead>
                  <TableHead>Reported By</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {trademarkRows.map((row) => {
                  return (
                    <TableRow key={row.caseId} className={row.rowClassName}>
                      <TableCell className="font-medium">
                        {row.caseId}
                      </TableCell>
                      <TableCell>
                        <Badge className={row.typeClassName}>{row.type}</Badge>
                      </TableCell>
                      <TableCell className="font-semibold">
                        {row.brandEntity}
                      </TableCell>
                      <TableCell>{row.reportedBy}</TableCell>
                      <TableCell>
                        <Badge className={row.severityClassName}>
                          {row.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {row.actions.map((action) => {
                            const isSuspend = action === "Suspend";

                            return (
                              <Button
                                key={`${row.caseId}-${action}`}
                                variant={isSuspend ? "default" : "outline"}
                                size="sm"
                                className={
                                  isSuspend
                                    ? "h-8 bg-rose-600 hover:bg-rose-700"
                                    : "h-8"
                                }
                              >
                                {action}
                              </Button>
                            );
                          })}
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

      <BrandRegistryDialog
        open={brandRegistryDialogOpen}
        onOpenChange={setBrandRegistryDialogOpen}
      />
    </>
  );
}

export default IPCopyrightTrademarkTab;
