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
import { Plus, Shield } from "lucide-react";
import ProcessDmcaNoticeDialog from "@/components/ip-copyright/ProcessDmcaNoticeDialog";
import ValidateDmcaNoticeDialog, {
  type DmcaNoticeValidationContext,
} from "@/components/ip-copyright/ValidateDmcaNoticeDialog";

const dmcaStats = [
  {
    title: "DMCA Agent Status",
    value: "Registered",
    subtitle: "Valid through 2026",
    valueClassName: "text-emerald-600",
  },
  {
    title: "Notices Received",
    value: "247",
    subtitle: "Last 30 days",
    valueClassName: "text-slate-900",
  },
  {
    title: "Takedowns",
    value: "189",
    subtitle: "76% completion rate",
    valueClassName: "text-slate-900",
  },
  {
    title: "Safe Harbor Status",
    value: "Compliant",
    subtitle: "Last audit: Jan 2026",
    valueClassName: "text-emerald-600",
  },
];

const dmcaIntakeNotices = [
  {
    id: "DMCA-2026-001",
    claimant: "Universal Music Group",
    contentId: "CONT-45678",
    status: "Validating",
    received: "Jan 25, 2026",
    actions: ["Validate", "Takedown"],
  },
  {
    id: "DMCA-2026-002",
    claimant: "Sony Pictures",
    contentId: "CONT-45679",
    status: "Pending Review",
    received: "Jan 26, 2026",
    actions: ["Validate", "Takedown"],
  },
  {
    id: "DMCA-2026-003",
    claimant: "Warner Bros",
    contentId: "CONT-45680",
    status: "Completed",
    received: "Jan 24, 2026",
    actions: ["View"],
  },
];

const dmcaStatusClassMap: Record<string, string> = {
  Validating: "bg-slate-950 text-white hover:bg-slate-950",
  "Pending Review": "bg-slate-200 text-slate-700 hover:bg-slate-200",
  Completed: "bg-slate-950 text-white hover:bg-slate-950",
};

function IPCopyrightDmcaTab() {
  const [processDialogOpen, setProcessDialogOpen] = useState(false);
  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [selectedNotice, setSelectedNotice] =
    useState<DmcaNoticeValidationContext | null>(null);

  function handleOpenValidateDialog(notice: DmcaNoticeValidationContext) {
    setSelectedNotice(notice);
    setValidateDialogOpen(true);
  }

  return (
    <>
      <TabsContent value="dmca" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {dmcaStats.map((stat) => {
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
                DMCA Notice Intake
              </CardTitle>
              <p className="text-muted-foreground">
                Incoming copyright infringement notices
              </p>
            </div>

            <Button
              className="w-full sm:w-auto"
              onClick={() => setProcessDialogOpen(true)}
            >
              <Plus className="h-4 w-4" />
              Process Notice
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Notice ID</TableHead>
                  <TableHead>Claimant</TableHead>
                  <TableHead>Content ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Received</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {dmcaIntakeNotices.map((notice) => {
                  return (
                    <TableRow key={notice.id}>
                      <TableCell className="font-medium">{notice.id}</TableCell>
                      <TableCell>{notice.claimant}</TableCell>
                      <TableCell>{notice.contentId}</TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${dmcaStatusClassMap[notice.status] ?? "bg-slate-200 text-slate-700 hover:bg-slate-200"}`}
                        >
                          {notice.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{notice.received}</TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {notice.actions.map((actionLabel) => {
                            return (
                              <Button
                                key={`${notice.id}-${actionLabel}`}
                                variant="outline"
                                size="sm"
                                className="h-8"
                                onClick={() => {
                                  if (actionLabel === "Validate") {
                                    handleOpenValidateDialog({
                                      id: notice.id,
                                      claimant: notice.claimant,
                                      contentId: notice.contentId,
                                      status: notice.status,
                                      received: notice.received,
                                    });
                                  }
                                }}
                              >
                                {actionLabel}
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

      <ProcessDmcaNoticeDialog
        open={processDialogOpen}
        onOpenChange={setProcessDialogOpen}
      />

      <ValidateDmcaNoticeDialog
        open={validateDialogOpen}
        onOpenChange={setValidateDialogOpen}
        noticeContext={selectedNotice}
      />
    </>
  );
}

export default IPCopyrightDmcaTab;
