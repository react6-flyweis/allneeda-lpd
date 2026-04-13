import { useState } from "react";
import { UserRoundPlus } from "lucide-react";
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
import RegisterRightsHolderDialog from "@/components/ip-copyright/RegisterRightsHolderDialog";

const rightsHolderStats = [
  {
    title: "Registered Rights-Holders",
    value: "342",
    subtitle: "Verified accounts",
    valueClassName: "text-slate-900",
  },
  {
    title: "Reference Files",
    value: "12,456",
    subtitle: "Active monitoring",
    valueClassName: "text-slate-900",
  },
  {
    title: "Bulk Notices",
    value: "89",
    subtitle: "Last 30 days",
    valueClassName: "text-slate-900",
  },
  {
    title: "Reuse Permissions",
    value: "234",
    subtitle: "Active licenses",
    valueClassName: "text-emerald-600",
  },
];

const rightsHolderRows = [
  {
    organization: "Universal Music Group",
    type: "Major Label",
    status: "Verified",
    referenceFiles: "3,245 files",
    activeNotices: "12 active",
    activeNoticesClassName: "bg-orange-600 text-white hover:bg-orange-600",
  },
  {
    organization: "Sony Pictures Entertainment",
    type: "Studio",
    status: "Verified",
    referenceFiles: "2,178 files",
    activeNotices: "8 active",
    activeNoticesClassName: "bg-orange-600 text-white hover:bg-orange-600",
  },
  {
    organization: "Getty Images",
    type: "Stock Provider",
    status: "Verified",
    referenceFiles: "8,912 files",
    activeNotices: "0 active",
    activeNoticesClassName: "bg-emerald-600 text-white hover:bg-emerald-600",
  },
];

function IPCopyrightRightsHolderTab() {
  const [registerDialogOpen, setRegisterDialogOpen] = useState(false);

  return (
    <>
      <TabsContent value="rights-holder" className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {rightsHolderStats.map((stat) => {
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
                <UserRoundPlus className="h-5 w-5" />
                Rights-Holder Registry
              </CardTitle>
              <p className="text-muted-foreground">
                Verified brands, labels, and creators
              </p>
            </div>

            <Button
              className="w-full sm:w-auto"
              onClick={() => setRegisterDialogOpen(true)}
            >
              + Add Rights-Holder
            </Button>
          </CardHeader>

          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Organization</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reference Files</TableHead>
                  <TableHead>Active Notices</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {rightsHolderRows.map((row) => {
                  return (
                    <TableRow key={row.organization}>
                      <TableCell className="font-semibold">
                        {row.organization}
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-slate-950 text-white hover:bg-slate-950">
                          {row.type}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-slate-950 text-white hover:bg-slate-950">
                          {row.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{row.referenceFiles}</TableCell>
                      <TableCell>
                        <Badge className={row.activeNoticesClassName}>
                          {row.activeNotices}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-2">
                          <Button variant="outline" size="sm" className="h-8">
                            Portal
                          </Button>
                          <Button variant="outline" size="sm" className="h-8">
                            View
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

      <RegisterRightsHolderDialog
        open={registerDialogOpen}
        onOpenChange={setRegisterDialogOpen}
      />
    </>
  );
}

export default IPCopyrightRightsHolderTab;
