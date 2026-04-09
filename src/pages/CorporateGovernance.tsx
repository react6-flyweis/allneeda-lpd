import { CalendarCheck, CalendarPlus, Clock, Globe2, Eye } from "lucide-react";
import { useState } from "react";
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
import { Badge } from "@/components/ui/badge";
import FilingCompletionRateChart from "@/components/corporate-governance/FilingCompletionRateChart";
import FilingsByTypeChart from "@/components/corporate-governance/FilingsByTypeChart";
import AddCorporateEntityDialog from "@/components/corporate-governance/AddCorporateEntityDialog";
import EntityDetailsDialog, {
  type CorporateEntityDetail,
} from "@/components/corporate-governance/EntityDetailsDialog";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";

const overviewStats = [
  {
    title: "Active Entities",
    value: "6",
    change: "+2% from last period",
    icon: <CalendarCheck className="h-5 w-5 text-violet-600" />,
    iconBg: "bg-violet-100",
  },
  {
    title: "Upcoming Filings",
    value: "2",
    change: "+12% from last period",
    icon: <CalendarPlus className="h-5 w-5 text-emerald-600" />,
    iconBg: "bg-emerald-100",
  },
  {
    title: "Overdue Filings",
    value: "0",
    change: "-5.2% from last period",
    icon: <Clock className="h-5 w-5 text-orange-600" />,
    iconBg: "bg-orange-100",
  },
  {
    title: "Jurisdictions",
    value: "7",
    change: "+1% from last period",
    icon: <Globe2 className="h-5 w-5 text-sky-600" />,
    iconBg: "bg-sky-100",
  },
];

const entities: CorporateEntityDetail[] = [
  {
    id: "ENT-001",
    name: "Allneeda Inc",
    jurisdiction: "DE",
    formationDate: "1/10/2021",
    status: "active",
  },
  {
    id: "ENT-002",
    name: "Allneeda EU Operations GmbH",
    jurisdiction: "DE-Germany",
    formationDate: "5/15/2023",
    status: "active",
  },
  {
    id: "ENT-003",
    name: "Allneeda UK Limited",
    jurisdiction: "UK",
    formationDate: "8/22/2022",
    status: "active",
  },
  {
    id: "ENT-004",
    name: "Allneeda Canada Corp",
    jurisdiction: "CA-ON",
    formationDate: "2/14/2023",
    status: "active",
  },
  {
    id: "ENT-005",
    name: "Allneeda Asia Pacific Pte Ltd",
    jurisdiction: "SG",
    formationDate: "1/5/2024",
    status: "active",
  },
  {
    id: "ENT-006",
    name: "Allneeda France SAS",
    jurisdiction: "FR",
    formationDate: "11/10/2023",
    status: "active",
  },
  {
    id: "ENT-007",
    name: "Allneeda Holdings LLC",
    jurisdiction: "US-DE",
    formationDate: "12/1/2020",
    status: "inactive",
  },
];

const statusClasses: Record<string, string> = {
  active: "bg-emerald-100 text-emerald-700 border-transparent",
  inactive: "bg-slate-100 text-slate-700 border-transparent",
};

function CorporateGovernance() {
  const [isAddEntityDialogOpen, setIsAddEntityDialogOpen] = useState(false);
  const [isEntityDetailsOpen, setIsEntityDetailsOpen] = useState(false);
  const [selectedEntity, setSelectedEntity] =
    useState<CorporateEntityDetail | null>(null);

  function openEntityDetails(entity: CorporateEntityDetail) {
    setSelectedEntity(entity);
    setIsEntityDetailsOpen(true);
  }

  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="Corporate Governance"
          subtitle="Here’s what’s happening with your marketing campaigns today."
        />
      </section>

      <GlobalFilters />

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {overviewStats.map((stat) => (
          <Card
            key={stat.title}
            className="border border-slate-200 bg-white shadow-sm"
          >
            <CardContent className="flex items-center gap-4">
              <div
                className={`inline-flex h-14 w-14 items-center justify-center rounded-3xl ${stat.iconBg}`}
              >
                {stat.icon}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-600">
                  {stat.title}
                </p>
                <p className="mt-3 text-3xl font-semibold text-slate-950">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-emerald-600">
                  {stat.change}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <section>
        <Card>
          <CardHeader className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <CardTitle>Entity Registry</CardTitle>
              <p className="text-sm text-slate-500">
                Corporate entities and subsidiaries
              </p>
            </div>
            <Button size="sm" onClick={() => setIsAddEntityDialogOpen(true)}>
              + Add Entity
            </Button>
          </CardHeader>
          <CardContent>
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Company Name</TableHead>
                  <TableHead>Jurisdiction</TableHead>
                  <TableHead>Formation Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {entities.map((entity) => (
                  <TableRow key={entity.id} className="bg-white">
                    <TableCell className="font-medium text-slate-900">
                      {entity.id}
                    </TableCell>
                    <TableCell>{entity.name}</TableCell>
                    <TableCell>{entity.jurisdiction}</TableCell>
                    <TableCell>{entity.formationDate}</TableCell>
                    <TableCell>
                      <Badge className={statusClasses[entity.status]}>
                        {entity.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEntityDetails(entity)}
                      >
                        <Eye className="h-4 w-4" />
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <Card className="border border-slate-200">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Filing Completion Rate</CardTitle>
            <p className="text-sm text-slate-500">
              Percentage of regulatory filings completed on time
            </p>
          </CardHeader>
          <CardContent>
            <FilingCompletionRateChart />
          </CardContent>
        </Card>

        <Card className="border border-slate-200">
          <CardHeader className="flex flex-col gap-2">
            <CardTitle>Filings by Type</CardTitle>
            <p className="text-sm text-slate-500">
              Distribution of corporate filings
            </p>
          </CardHeader>
          <CardContent>
            <FilingsByTypeChart />
          </CardContent>
        </Card>
      </section>

      <AddCorporateEntityDialog
        open={isAddEntityDialogOpen}
        onOpenChange={setIsAddEntityDialogOpen}
      />

      <EntityDetailsDialog
        open={isEntityDetailsOpen}
        onOpenChange={setIsEntityDetailsOpen}
        entity={selectedEntity}
      />
    </div>
  );
}

export default CorporateGovernance;
