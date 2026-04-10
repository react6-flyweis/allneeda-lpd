import { useState } from "react";
import { AlertTriangle } from "lucide-react";
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
import ConfigureRepeatInfringerPolicyDialog from "@/components/ip-copyright/ConfigureRepeatInfringerPolicyDialog";

const repeatInfringerStats = [
  {
    title: "Tracked Infringers",
    value: "156",
    subtitle: "Active monitoring",
    valueClassName: "text-slate-900",
  },
  {
    title: "Strike Actions",
    value: "34",
    subtitle: "Last 30 days",
    valueClassName: "text-orange-600",
  },
  {
    title: "Account Suspensions",
    value: "12",
    subtitle: "Active suspensions",
    valueClassName: "text-red-600",
  },
  {
    title: "Permanent Bans",
    value: "3",
    subtitle: "Last 90 days",
    valueClassName: "text-rose-700",
  },
];

const escalationRows = [
  {
    userId: "USER-89012",
    strikes: "3 Strikes",
    penaltyStatus: "Ban Pending",
    windowExpiry: "Rolling 90 days",
    nextAction: "Permanent Ban Review",
    actionLabel: "Execute Ban",
    rowClassName: "bg-rose-50",
    strikeBadgeClassName: "bg-rose-600 text-white hover:bg-rose-600",
    statusBadgeClassName: "bg-rose-600 text-white hover:bg-rose-600",
    actionButtonVariant: "destructive" as const,
  },
  {
    userId: "USER-89013",
    strikes: "2 Strikes",
    penaltyStatus: "Suspended",
    windowExpiry: "45 days remaining",
    nextAction: "Upload Limit: 0/day",
    actionLabel: "Review",
    rowClassName: "bg-orange-50",
    strikeBadgeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    statusBadgeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    actionButtonVariant: "outline" as const,
  },
  {
    userId: "USER-89014",
    strikes: "1 Strike",
    penaltyStatus: "Warning Active",
    windowExpiry: "72 days remaining",
    nextAction: "Upload Limit: 5/day",
    actionLabel: "Monitor",
    rowClassName: "bg-amber-50",
    strikeBadgeClassName: "bg-amber-600 text-white hover:bg-amber-600",
    statusBadgeClassName: "bg-slate-950 text-white hover:bg-slate-950",
    actionButtonVariant: "outline" as const,
  },
];

function IPCopyrightRepeatInfringerTab() {
  const [configureDialogOpen, setConfigureDialogOpen] = useState(false);

  return (
    <>
      <TabsContent value="repeat-infringer" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {repeatInfringerStats.map((stat) => {
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
                <AlertTriangle className="h-5 w-5 text-red-600" />
                Strike Escalation Matrix
              </CardTitle>
              <p className="text-muted-foreground">
                Automated penalty enforcement via AWM
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setConfigureDialogOpen(true)}
            >
              Configure Policy
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User ID</TableHead>
                  <TableHead>Strikes</TableHead>
                  <TableHead>Penalty Status</TableHead>
                  <TableHead>Window Expiry</TableHead>
                  <TableHead>Next Action</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {escalationRows.map((row) => {
                  return (
                    <TableRow key={row.userId} className={row.rowClassName}>
                      <TableCell className="font-medium">
                        {row.userId}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${row.strikeBadgeClassName}`}
                        >
                          {row.strikes}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${row.statusBadgeClassName}`}
                        >
                          {row.penaltyStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.windowExpiry}</TableCell>
                      <TableCell>{row.nextAction}</TableCell>
                      <TableCell>
                        <Button
                          variant={row.actionButtonVariant}
                          size="sm"
                          className="h-8"
                        >
                          {row.actionLabel}
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </TabsContent>

      <ConfigureRepeatInfringerPolicyDialog
        open={configureDialogOpen}
        onOpenChange={setConfigureDialogOpen}
      />
    </>
  );
}

export default IPCopyrightRepeatInfringerTab;
