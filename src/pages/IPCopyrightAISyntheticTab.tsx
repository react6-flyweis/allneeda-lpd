import { useState } from "react";
import { Bot } from "lucide-react";
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
import ConfigureAISyntheticPolicyDialog from "@/components/ip-copyright/ConfigureAISyntheticPolicyDialog";

const aiSyntheticStats = [
  {
    title: "AI-Generated Content",
    value: "3,456",
    subtitle: "Labeled & tracked",
    valueClassName: "text-slate-900",
  },
  {
    title: "Deepfake Detections",
    value: "12",
    subtitle: "Flagged for review",
    valueClassName: "text-red-600",
  },
  {
    title: "Voice/Likeness Claims",
    value: "8",
    subtitle: "Active cases",
    valueClassName: "text-orange-600",
  },
  {
    title: "Training Data Opt-Outs",
    value: "1,234",
    subtitle: "Creator requests",
    valueClassName: "text-emerald-600",
  },
];

const aiSyntheticRows = [
  {
    contentId: "CONT-AI-001",
    aiType: "Deepfake Video",
    riskCategory: "Celebrity Likeness",
    creator: "USER-67890",
    status: "Flagged",
    actions: ["Remove", "Review"],
    rowClassName: "bg-rose-50",
    aiTypeClassName: "bg-rose-600 text-white hover:bg-rose-600",
    riskClassName: "bg-rose-600 text-white hover:bg-rose-600",
    statusClassName: "bg-rose-600 text-white hover:bg-rose-600",
  },
  {
    contentId: "CONT-AI-002",
    aiType: "Voice Clone",
    riskCategory: "Unauthorized Voice",
    creator: "USER-67891",
    status: "Under Review",
    actions: ["Validate", "Contact"],
    rowClassName: "bg-orange-50",
    aiTypeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    riskClassName: "bg-orange-600 text-white hover:bg-orange-600",
    statusClassName: "bg-orange-600 text-white hover:bg-orange-600",
  },
  {
    contentId: "CONT-AI-003",
    aiType: "AI Art",
    riskCategory: "Properly Labeled",
    creator: "USER-67892",
    status: "Compliant",
    actions: ["View"],
    rowClassName: "bg-emerald-50",
    aiTypeClassName: "bg-slate-950 text-white hover:bg-slate-950",
    riskClassName: "bg-slate-950 text-white hover:bg-slate-950",
    statusClassName: "bg-slate-950 text-white hover:bg-slate-950",
  },
];

function IPCopyrightAISyntheticTab() {
  const [policyDialogOpen, setPolicyDialogOpen] = useState(false);

  return (
    <>
      <TabsContent value="ai/synthetic" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {aiSyntheticStats.map((stat) => {
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
                <Bot className="h-5 w-5" />
                AI & Synthetic Media Monitoring
              </CardTitle>
              <p className="text-muted-foreground">
                AI content labeling, deepfake detection, and rights management
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setPolicyDialogOpen(true)}
            >
              AI Policy Settings
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Content ID</TableHead>
                  <TableHead>AI Type</TableHead>
                  <TableHead>Risk Category</TableHead>
                  <TableHead>Creator</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {aiSyntheticRows.map((row) => {
                  return (
                    <TableRow key={row.contentId} className={row.rowClassName}>
                      <TableCell className="font-medium">
                        {row.contentId}
                      </TableCell>
                      <TableCell>
                        <Badge className={row.aiTypeClassName}>
                          {row.aiType}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={row.riskClassName}>
                          {row.riskCategory}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.creator}</TableCell>
                      <TableCell>
                        <Badge className={row.statusClassName}>
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          {row.actions.map((action) => {
                            return (
                              <Button
                                key={`${row.contentId}-${action}`}
                                variant="outline"
                                size="sm"
                                className="h-8"
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

      <ConfigureAISyntheticPolicyDialog
        open={policyDialogOpen}
        onOpenChange={setPolicyDialogOpen}
      />
    </>
  );
}

export default IPCopyrightAISyntheticTab;
