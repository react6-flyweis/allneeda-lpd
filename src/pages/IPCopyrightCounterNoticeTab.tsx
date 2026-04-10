import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import { Scale } from "lucide-react";
import ForwardCounterNoticeDialog, {
  type ForwardCounterNoticeContext,
} from "@/components/ip-copyright/ForwardCounterNoticeDialog";

const counterNoticeStats = [
  {
    title: "Active Counter-Notices",
    value: "18",
    subtitle: "Pending validation",
    valueClassName: "text-slate-900",
  },
  {
    title: "Appeals Filed",
    value: "12",
    subtitle: "Last 30 days",
    valueClassName: "text-slate-900",
  },
  {
    title: "Restorations",
    value: "7",
    subtitle: "Content restored",
    valueClassName: "text-emerald-600",
  },
  {
    title: "Avg. Resolution Time",
    value: "8.5 days",
    subtitle: "Within 10-14 day window",
    valueClassName: "text-slate-900",
  },
];

const counterNoticeRows = [
  {
    id: "CN-001",
    originalCase: "DMCA-2026-001",
    user: "USER-12345",
    status: "Awaiting Claimant",
    daysRemaining: "7 days",
    actions: ["Review", "Forward"],
  },
  {
    id: "CN-002",
    originalCase: "DMCA-2026-002",
    user: "USER-12346",
    status: "Legal Review",
    daysRemaining: "12 days",
    actions: ["Review", "Restore"],
  },
];

const counterNoticeStatusClassMap: Record<string, string> = {
  "Awaiting Claimant": "bg-slate-950 text-white hover:bg-slate-950",
  "Legal Review": "bg-slate-200 text-slate-700 hover:bg-slate-200",
};

function IPCopyrightCounterNoticeTab() {
  const [forwardDialogOpen, setForwardDialogOpen] = useState(false);
  const [forwardContext, setForwardContext] =
    useState<ForwardCounterNoticeContext | null>(null);

  function handleOpenForwardDialog(context: ForwardCounterNoticeContext) {
    setForwardContext(context);
    setForwardDialogOpen(true);
  }

  return (
    <>
      <TabsContent value="counter-notice" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {counterNoticeStats.map((stat) => {
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
                <Scale className="h-5 w-5" />
                Counter-Notice Queue
              </CardTitle>
              <p className="text-muted-foreground">
                User disputes and counter-claims
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() =>
                handleOpenForwardDialog({
                  originalCase: counterNoticeRows[0]?.originalCase ?? "",
                })
              }
            >
              Forward to Claimant
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Counter ID</TableHead>
                  <TableHead>Original Case</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Days Remaining</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {counterNoticeRows.map((row) => {
                  return (
                    <TableRow key={row.id}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.originalCase}</TableCell>
                      <TableCell>{row.user}</TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${counterNoticeStatusClassMap[row.status] ?? "bg-slate-200 text-slate-700 hover:bg-slate-200"}`}
                        >
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-slate-200 font-medium text-slate-700 hover:bg-slate-200">
                          {row.daysRemaining}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {row.actions.map((action) => {
                            return (
                              <Button
                                key={`${row.id}-${action}`}
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  if (action === "Forward") {
                                    handleOpenForwardDialog({
                                      originalCase: row.originalCase,
                                    });
                                  }
                                }}
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

      <ForwardCounterNoticeDialog
        open={forwardDialogOpen}
        onOpenChange={setForwardDialogOpen}
        context={forwardContext}
      />
    </>
  );
}

export default IPCopyrightCounterNoticeTab;
