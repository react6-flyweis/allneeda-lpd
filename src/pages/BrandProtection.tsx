import { ArrowUpRight, ShieldCheck, Tag, Flag, Briefcase } from "lucide-react";
import { useState } from "react";
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
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import BrandCaseResponseTimeChart from "@/components/brand-protection/BrandCaseResponseTimeChart";
import BrandCasesByTypeChart from "@/components/brand-protection/BrandCasesByTypeChart";
import AddTrademarkRegistrationDialog from "@/components/brand-protection/AddTrademarkRegistrationDialog";
import { cn } from "@/lib/utils";

const summaryStats = [
  {
    title: "Registered Marks",
    value: "7",
    change: "+2% from last period",
    icon: <Tag className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Active Marks",
    value: "6",
    change: "-12% from last period",
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    title: "Open Brand Cases",
    value: "1",
    change: "-5.2% from last period",
    icon: <Flag className="h-4 w-4" />,
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    title: "Impersonation",
    value: "1",
    change: "+1% from last period",
    icon: <Briefcase className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
];

const trademarkRows = [
  {
    name: "Allneeda",
    clazz: "Class 35, 42",
    owner: "Allneeda Inc",
    filed: "3/15/2022",
    renewal: "4/11/2027",
    status: "active",
  },
  {
    name: "Allneeda Logo",
    clazz: "Class 35",
    owner: "Allneeda Inc",
    filed: "6/20/2022",
    renewal: "6/20/2027",
    status: "active",
  },
  {
    name: "Allneeda Connect",
    clazz: "Class 9, 42",
    owner: "Allneeda Inc",
    filed: "1/10/2023",
    renewal: "1/8/2028",
    status: "active",
  },
  {
    name: "Allneeda Pro",
    clazz: "Class 35, 41",
    owner: "Allneeda Inc",
    filed: "8/22/2023",
    renewal: "6/24/2028",
    status: "pending",
  },
  {
    name: "Quick Service Badge",
    clazz: "Class 35",
    owner: "Allneeda Inc",
    filed: "11/5/2021",
    renewal: "7/15/2026",
    status: "active",
  },
  {
    name: "Allneeda Marketplace",
    clazz: "Class 35, 38, 42",
    owner: "Allneeda Inc",
    filed: "9/14/2022",
    renewal: "8/19/2027",
    status: "active",
  },
  {
    name: "Instant Connect Icon",
    clazz: "Class 9",
    owner: "Allneeda Inc",
    filed: "12/1/2020",
    renewal: "3/2/2026",
    status: "active",
  },
];

const statusColorMap: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700",
  pending: "bg-amber-100 text-amber-700",
};

export default function BrandProtection() {
  const [isAddTrademarkDialogOpen, setIsAddTrademarkDialogOpen] =
    useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Brand Protection"
        subtitle="Here’s what’s happening with your marketing campaigns today."
      />

      <GlobalFilters />

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="border border-slate-200">
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                    stat.iconBg,
                  )}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm text-slate-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border border-slate-200">
        <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl">Trademark Registry</CardTitle>
            <p className="text-sm text-slate-500">
              Allneeda brand assets and trademarks
            </p>
          </div>
          <Button
            variant="default"
            size="sm"
            onClick={() => setIsAddTrademarkDialogOpen(true)}
          >
            <ArrowUpRight className="h-4 w-4" /> Add Trademark
          </Button>
        </CardHeader>
        <CardContent className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Mark Name</TableHead>
                <TableHead>Class</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead>Filed</TableHead>
                <TableHead>Renewal</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trademarkRows.map((row) => (
                <TableRow key={row.name}>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.clazz}</TableCell>
                  <TableCell>{row.owner}</TableCell>
                  <TableCell>{row.filed}</TableCell>
                  <TableCell>{row.renewal}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(statusColorMap[row.status], "rounded-full")}
                    >
                      {row.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-4 xl:grid-cols-2">
        <Card className="border border-slate-200">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-xl">Brand Case Response Time</CardTitle>
            <p className="text-sm text-slate-500">
              Average hours to respond to brand protection cases
            </p>
          </CardHeader>
          <CardContent className="h-80">
            <BrandCaseResponseTimeChart />
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle className="text-xl">Brand Cases by Type</CardTitle>
            <p className="text-sm text-slate-500">
              Distribution of brand protection cases
            </p>
          </CardHeader>
          <CardContent className="h-80">
            <BrandCasesByTypeChart />
          </CardContent>
        </Card>
      </div>

      <AddTrademarkRegistrationDialog
        open={isAddTrademarkDialogOpen}
        onOpenChange={setIsAddTrademarkDialogOpen}
      />
    </div>
  );
}
