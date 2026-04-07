import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardAction,
} from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Clock3, Repeat, ShieldCheck, BookOpen } from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
} from "recharts";
import { cn } from "@/lib/utils";
import CreateIPCaseDialog from "@/components/ip-copyright/CreateIPCaseDialog";
import ValidateIPCaseDialog from "@/components/ip-copyright/ValidateIPCaseDialog";

type SummaryStat = {
  title: string;
  value: string;
  change: string;
  icon: ReactNode;
  iconBg: string;
};

type CaseRow = {
  id: string;
  type: string;
  contentId: string;
  complainant: string;
  status: string;
  created: string;
  uploaderId: string;
  submitted: string;
};

const overviewStats: SummaryStat[] = [
  {
    title: "Open Cases",
    value: "2",
    change: "-0.2% from last period",
    icon: <BookOpen className="h-4 w-4" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    title: "Pending Validation",
    value: "1",
    change: "-1% from last period",
    icon: <Clock3 className="h-4 w-4" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Counter Notices",
    value: "1",
    change: "-5.2% from last period",
    icon: <ShieldCheck className="h-4 w-4" />,
    iconBg: "bg-amber-100 text-amber-700",
  },
  {
    title: "Repeat Infringers",
    value: "1",
    change: "-1% from last period",
    icon: <Repeat className="h-4 w-4" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
];

const caseRows: CaseRow[] = [
  {
    id: "IP-001",
    type: "copyright",
    contentId: "CONT-7890",
    complainant: "PhotoStock Inc",
    status: "approved",
    created: "1/11/2026",
    uploaderId: "USER-4567",
    submitted: "1/14/2026",
  },
  {
    id: "IP-002",
    type: "trademark",
    contentId: "CONT-1122",
    complainant: "Nike Inc",
    status: "validating",
    created: "1/15/2026",
    uploaderId: "BRAND-7821",
    submitted: "1/15/2026",
  },
  {
    id: "IP-003",
    type: "copyright",
    contentId: "CONT-5566",
    complainant: "Music Rights Org",
    status: "counter notice",
    created: "1/2/2026",
    uploaderId: "CREATOR-9988",
    submitted: "1/2/2026",
  },
];

const statusBadgeClasses: Record<string, string> = {
  approved: "bg-emerald-100 text-emerald-700",
  validating: "bg-sky-100 text-sky-700",
  "counter notice": "bg-amber-100 text-amber-700",
};

type RepeatInfringerRow = {
  id: string;
  entityType: string;
  strikes: number;
  lastStrike: string;
  flagged: boolean;
};

const repeatInfringers: RepeatInfringerRow[] = [
  {
    id: "USER-4567",
    entityType: "User",
    strikes: 2,
    lastStrike: "1/11/2026",
    flagged: false,
  },
  {
    id: "CREATOR-9988",
    entityType: "Creator",
    strikes: 3,
    lastStrike: "1/6/2026",
    flagged: true,
  },
];

const responseTimeData = [
  { month: "Jul", hours: 28 },
  { month: "Aug", hours: 26 },
  { month: "Sep", hours: 24 },
  { month: "Oct", hours: 22 },
  { month: "Nov", hours: 23 },
  { month: "Dec", hours: 21 },
  { month: "Jan", hours: 20 },
];

const casesByTypeData = [
  { type: "Copyright", count: 45 },
  { type: "Trademark", count: 18 },
  { type: "Impersonation", count: 12 },
];

function IPCopyrightOverviewTab() {
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [validateDialogOpen, setValidateDialogOpen] = useState(false);
  const [selectedCaseForValidation, setSelectedCaseForValidation] =
    useState<CaseRow | null>(null);

  function handleOpenValidationDialog(row: CaseRow) {
    setSelectedCaseForValidation(row);
    setValidateDialogOpen(true);
  }

  return (
    <TabsContent value="overview" className="space-y-6">
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-slate-200 bg-white shadow-sm py-4"
          >
            <CardContent className="px-4">
              <div className="flex items-center gap-4">
                <div
                  className={cn(
                    "flex h-12 w-12 items-center justify-center rounded-full",
                    stat.iconBg,
                  )}
                >
                  {stat.icon}
                </div>
                <div>
                  <p className="font-semibold text-slate-700">{stat.title}</p>
                  <p className="mt-3 text-3xl font-bold text-slate-900">
                    {stat.value}
                  </p>
                </div>
              </div>
              <p className="mt-4 text-sm text-slate-600">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="items-center gap-4 sm:flex-row flex-col">
          <div>
            <CardTitle>IP Case Inbox</CardTitle>
            <p className="text-sm text-slate-500">
              Copyright and trademark complaints (DMCA)
            </p>
          </div>
          <CardAction>
            <Button onClick={() => setCreateDialogOpen(true)}>
              + Create IP Case
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Content ID</TableHead>
                <TableHead>Complainant</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {caseRows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell className="capitalize">{row.type}</TableCell>
                  <TableCell>{row.contentId}</TableCell>
                  <TableCell>{row.complainant}</TableCell>
                  <TableCell>
                    <Badge className={statusBadgeClasses[row.status]}>
                      {row.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{row.created}</TableCell>
                  <TableCell className="space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleOpenValidationDialog(row)}
                    >
                      Validate
                    </Button>
                    <Button size="sm" variant="outline">
                      Approve
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <section className="space-y-4">
        <Card>
          <CardHeader className="items-center gap-4 sm:flex-row flex-col">
            <div>
              <CardTitle>Repeat Infringers</CardTitle>
              <p className="text-sm text-slate-500">
                High-risk entities with repeated copyright or trademark strikes.
              </p>
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Entity ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Strikes</TableHead>
                  <TableHead>Last Strike</TableHead>
                  <TableHead>Flagged</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {repeatInfringers.map((row) => (
                  <TableRow
                    key={row.id}
                    className={row.flagged ? "bg-slate-50" : undefined}
                  >
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.entityType}</TableCell>
                    <TableCell>
                      <Badge className="bg-rose-100 text-rose-700">
                        {row.strikes}
                      </Badge>
                    </TableCell>
                    <TableCell>{row.lastStrike}</TableCell>
                    <TableCell>
                      <Badge
                        className={
                          row.flagged
                            ? "bg-rose-100 text-rose-700"
                            : "bg-slate-100 text-slate-700"
                        }
                      >
                        {row.flagged ? "YES" : "No"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        Escalate
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-4 xl:grid-cols-2">
          <Card className="h-full">
            <CardHeader className="items-center gap-4 sm:flex-row flex-col">
              <div>
                <CardTitle>Takedown Response Time</CardTitle>
                <p className="text-sm text-slate-500">
                  Average hours to process takedown requests.
                </p>
              </div>
            </CardHeader>
            <CardContent className="h-[340px] px-4 pb-4 pt-2">
              <ChartContainer
                id="takedown-response-time"
                config={{ hours: { label: "Hours", color: "#2563eb" } }}
                className="h-full"
              >
                <LineChart
                  data={responseTimeData}
                  margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line
                    type="monotone"
                    dataKey="hours"
                    stroke="var(--color-hours)"
                    strokeWidth={3}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                  />
                </LineChart>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="h-full">
            <CardHeader className="items-center gap-4 sm:flex-row flex-col">
              <div>
                <CardTitle>IP Cases by Type</CardTitle>
                <p className="text-sm text-slate-500">
                  Distribution of IP infringement cases.
                </p>
              </div>
            </CardHeader>
            <CardContent className="h-[340px] px-4 pb-4 pt-2">
              <ChartContainer
                id="ip-cases-by-type"
                config={{ count: { label: "Cases", color: "#3b82f6" } }}
                className="h-full"
              >
                <BarChart
                  data={casesByTypeData}
                  margin={{ top: 20, right: 16, left: 0, bottom: 24 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis
                    dataKey="type"
                    interval={0}
                    height={48}
                    tick={{ fontSize: 12, dy: 8 }}
                  />
                  <YAxis axisLine={true} tickLine={true} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar
                    dataKey="count"
                    fill="var(--color-count)"
                    radius={[8, 8, 0, 0]}
                  />
                </BarChart>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>
      </section>

      <CreateIPCaseDialog
        open={createDialogOpen}
        onOpenChange={setCreateDialogOpen}
      />
      <ValidateIPCaseDialog
        open={validateDialogOpen}
        onOpenChange={setValidateDialogOpen}
        caseContext={selectedCaseForValidation}
      />
    </TabsContent>
  );
}

export default IPCopyrightOverviewTab;
