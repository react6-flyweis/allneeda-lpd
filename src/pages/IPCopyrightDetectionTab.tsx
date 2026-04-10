import { useState } from "react";
import { Eye } from "lucide-react";
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
import DetectionAnalyticsDialog from "@/components/ip-copyright/DetectionAnalyticsDialog";

const detectionStats = [
  {
    title: "Pre-Upload Blocks",
    value: "1,247",
    subtitle: "Last 24 hours",
    valueClassName: "text-emerald-600",
  },
  {
    title: "Post-Upload Detections",
    value: "89",
    subtitle: "Flagged for review",
    valueClassName: "text-orange-600",
  },
  {
    title: "Audio Matches",
    value: "456",
    subtitle: "Music database hits",
    valueClassName: "text-slate-900",
  },
  {
    title: "Detection Accuracy",
    value: "94.2%",
    subtitle: "False positive rate: 2.1%",
    valueClassName: "text-emerald-600",
  },
];

const detectionRows = [
  {
    id: "DET-45678",
    contentType: "Video",
    matchType: "Perceptual Hash",
    confidence: "98%",
    risk: "High Risk",
    rowClassName: "bg-white",
    confidenceClassName: "bg-slate-950 text-white hover:bg-slate-950",
    riskClassName: "bg-red-600 text-white hover:bg-red-600",
    actionLabels: ["Block", "Allow"],
  },
  {
    id: "DET-45679",
    contentType: "Audio",
    matchType: "Audio Fingerprint",
    confidence: "95%",
    risk: "Medium Risk",
    rowClassName: "bg-white",
    confidenceClassName: "bg-slate-950 text-white hover:bg-slate-950",
    riskClassName: "bg-orange-600 text-white hover:bg-orange-600",
    actionLabels: ["Block", "Allow"],
  },
  {
    id: "DET-45680",
    contentType: "Image",
    matchType: "Similarity Analysis",
    confidence: "72%",
    risk: "Low Risk",
    rowClassName: "bg-white",
    confidenceClassName: "bg-slate-200 text-slate-700 hover:bg-slate-200",
    riskClassName: "bg-amber-600 text-white hover:bg-amber-600",
    actionLabels: ["Review", "Allow"],
  },
];

function IPCopyrightDetectionTab() {
  const [analyticsOpen, setAnalyticsOpen] = useState(false);

  return (
    <>
      <TabsContent value="detection" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {detectionStats.map((stat) => {
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
                <Eye className="h-5 w-5" />
                Real-Time Detection Feed
              </CardTitle>
              <p className="text-muted-foreground">
                Hash matching, similarity analysis, and audio fingerprinting
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setAnalyticsOpen(true)}
            >
              View Analytics
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Detection ID</TableHead>
                  <TableHead>Content Type</TableHead>
                  <TableHead>Match Type</TableHead>
                  <TableHead>Confidence</TableHead>
                  <TableHead>User Risk Score</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {detectionRows.map((row) => {
                  return (
                    <TableRow key={row.id} className={row.rowClassName}>
                      <TableCell className="font-medium">{row.id}</TableCell>
                      <TableCell>{row.contentType}</TableCell>
                      <TableCell>
                        <Badge className="bg-slate-950 font-medium text-white hover:bg-slate-950">
                          {row.matchType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={`font-medium ${row.confidenceClassName}`}
                        >
                          {row.confidence}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={`font-medium ${row.riskClassName}`}>
                          {row.risk}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {row.actionLabels.map((actionLabel) => {
                            return (
                              <Button
                                key={`${row.id}-${actionLabel}`}
                                variant="outline"
                                size="sm"
                                className="h-8"
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

      <DetectionAnalyticsDialog
        open={analyticsOpen}
        onOpenChange={setAnalyticsOpen}
      />
    </>
  );
}

export default IPCopyrightDetectionTab;
