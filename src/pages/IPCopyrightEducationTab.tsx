import { useState } from "react";
import { BookOpen } from "lucide-react";
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
import CreateEducationModuleDialog from "@/components/ip-copyright/CreateEducationModuleDialog";

const educationStats = [
  {
    title: "Pre-Upload Warnings",
    value: "2,345",
    subtitle: "Shown last 7 days",
    valueClassName: "text-slate-900",
  },
  {
    title: "Strike Explanations",
    value: "156",
    subtitle: "Delivered",
    valueClassName: "text-slate-900",
  },
  {
    title: "Education Modules",
    value: "89%",
    subtitle: "Completion rate",
    valueClassName: "text-emerald-600",
  },
  {
    title: "Appeal Guidance",
    value: "67",
    subtitle: "Resources accessed",
    valueClassName: "text-slate-900",
  },
];

const educationRows = [
  {
    module: "Copyright Basics 101",
    type: "Mandatory",
    targetAudience: "All New Creators",
    completions: "1,245 / 1,400",
    effectiveness: "92% reduction",
    typeBadgeClassName: "bg-slate-950 text-white hover:bg-slate-950",
    effectivenessBadgeClassName: "bg-slate-950 text-white hover:bg-slate-950",
  },
  {
    module: "Strike System Explained",
    type: "Post-Strike",
    targetAudience: "Users with 1+ Strike",
    completions: "156 / 156",
    effectiveness: "78% improvement",
    typeBadgeClassName: "bg-orange-600 text-white hover:bg-orange-600",
    effectivenessBadgeClassName: "bg-slate-950 text-white hover:bg-slate-950",
  },
  {
    module: "Fair Use Guidelines",
    type: "Optional",
    targetAudience: "Content Creators",
    completions: "567 views",
    effectiveness: "N/A",
    typeBadgeClassName: "bg-slate-200 text-slate-700 hover:bg-slate-200",
    effectivenessBadgeClassName:
      "bg-slate-200 text-slate-700 hover:bg-slate-200",
  },
];

function IPCopyrightEducationTab() {
  const [moduleDialogOpen, setModuleDialogOpen] = useState(false);

  return (
    <>
      <TabsContent value="education" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {educationStats.map((stat) => {
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
                <BookOpen className="h-5 w-5" />
                Creator Education Programs
              </CardTitle>
              <p className="text-muted-foreground">
                Copyright awareness and compliance training
              </p>
            </div>

            <Button
              variant="outline"
              className="w-full sm:w-auto"
              onClick={() => setModuleDialogOpen(true)}
            >
              Create Module
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Module</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Target Audience</TableHead>
                  <TableHead>Completions</TableHead>
                  <TableHead>Effectiveness</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {educationRows.map((row) => {
                  return (
                    <TableRow key={row.module}>
                      <TableCell className="font-semibold">
                        {row.module}
                      </TableCell>
                      <TableCell>
                        <Badge className={row.typeBadgeClassName}>
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.targetAudience}</TableCell>
                      <TableCell>{row.completions}</TableCell>
                      <TableCell>
                        <Badge className={row.effectivenessBadgeClassName}>
                          {row.effectiveness}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="outline" size="sm" className="h-8">
                          Edit
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

      <CreateEducationModuleDialog
        open={moduleDialogOpen}
        onOpenChange={setModuleDialogOpen}
      />
    </>
  );
}

export default IPCopyrightEducationTab;
