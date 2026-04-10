import { useState } from "react";
import { Fingerprint } from "lucide-react";
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
import ConfigureWatermarkRulesDialog from "@/components/ip-copyright/ConfigureWatermarkRulesDialog";

const watermarkStats = [
  {
    title: "Watermark Compliance",
    value: "87.3%",
    subtitle: "Platform-wide",
    valueClassName: "text-emerald-600",
  },
  {
    title: "Removal Detections",
    value: "45",
    subtitle: "Last 7 days",
    valueClassName: "text-red-600",
  },
  {
    title: "Attribution Violations",
    value: "78",
    subtitle: "Pending enforcement",
    valueClassName: "text-orange-600",
  },
  {
    title: "Penalties Issued",
    value: "23",
    subtitle: "Last 30 days",
    valueClassName: "text-slate-900",
  },
];

const watermarkAlerts = [
  {
    contentId: "CONT-78901",
    violationType: "Watermark Removed",
    userId: "USER-34567",
    detectionTime: "2 hours ago",
    penalty: "Strike + Suspension",
    actionLabel: "Enforce",
    rowClassName: "bg-rose-50",
    violationBadgeClassName: "bg-rose-600 text-white hover:bg-rose-600",
    penaltyBadgeClassName: "bg-rose-600 text-white hover:bg-rose-600",
    actionButtonVariant: "destructive" as const,
  },
  {
    contentId: "CONT-78902",
    violationType: "Attribution Missing",
    userId: "USER-34568",
    detectionTime: "5 hours ago",
    penalty: "Warning",
    actionLabel: "Enforce",
    rowClassName: "bg-orange-50",
    violationBadgeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    penaltyBadgeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    actionButtonVariant: "outline" as const,
  },
  {
    contentId: "CONT-78903",
    violationType: "Watermark Obscured",
    userId: "USER-34569",
    detectionTime: "1 day ago",
    penalty: "Notice Sent",
    actionLabel: "Monitor",
    rowClassName: "bg-amber-50",
    violationBadgeClassName: "bg-amber-600 text-white hover:bg-amber-600",
    penaltyBadgeClassName: "bg-amber-600 text-white hover:bg-amber-600",
    actionButtonVariant: "outline" as const,
  },
];

function IPCopyrightWatermarkTab() {
  const [rulesOpen, setRulesOpen] = useState(false);

  return (
    <>
      <TabsContent value="watermark" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {watermarkStats.map((stat) => {
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
                <Fingerprint className="h-5 w-5" />
                Watermark Tampering Alerts
              </CardTitle>
              <p className="text-muted-foreground">
                Mandatory watermarking and attribution enforcement
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setRulesOpen(true)}
            >
              Configure Rules
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content ID</TableHead>
                  <TableHead>Violation Type</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Detection Time</TableHead>
                  <TableHead>Penalty</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {watermarkAlerts.map((row) => {
                  return (
                    <TableRow key={row.contentId} className={row.rowClassName}>
                      <TableCell className="font-medium">
                        {row.contentId}
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${row.violationBadgeClassName}`}
                        >
                          {row.violationType}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.userId}</TableCell>
                      <TableCell>{row.detectionTime}</TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${row.penaltyBadgeClassName}`}
                        >
                          {row.penalty}
                        </Badge>
                      </TableCell>
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

      <ConfigureWatermarkRulesDialog
        open={rulesOpen}
        onOpenChange={setRulesOpen}
      />
    </>
  );
}

export default IPCopyrightWatermarkTab;
