import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DepartmentWorkloadChart from "@/components/dashboard/DepartmentWorkloadChart";
import IssuesByRiskLevelChart from "@/components/dashboard/IssuesByRiskLevelChart";
import DeadlineRadarCard from "@/components/dashboard/DeadlineRadarCard";
import RiskHeatmapCard from "@/components/dashboard/RiskHeatmapCard";
import ActionCardsSection from "@/components/dashboard/ActionCardsSection";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import RecentPublicationsCard from "@/components/dashboard/RecentPublicationsCard";

type StatItem = {
  title: string;
  value: string;
  subText?: string;
  tagText?: string;
  color: "default" | "yellow" | "red" | "green" | "blue" | "purple";
  backgroundClass?: string;
};

const stats: StatItem[] = [
  { title: "Open Legal Intakes", value: "3", color: "blue" },
  {
    title: "Policies Pending",
    value: "1",
    tagText: "1 Effective",
    color: "yellow",
  },
  {
    title: "Regulatory Requests",
    value: "2",
    color: "yellow",
  },
  {
    title: "Permits Expiring",
    value: "1",
    subText: "Next 90 days",
    color: "blue",
  },
  { title: "COI Missing/Expired", value: "0", color: "red" },
  { title: "Compliance Overdue", value: "0", color: "red" },
  {
    title: "IP Takedowns",
    value: "2",
    tagText: "1 Repeat",
    color: "blue",
  },
  { title: "Contracts Expiring", value: "0", color: "yellow" },
  { title: "High-Risk Disputes", value: "1", color: "red" },
  { title: "Privacy Requests", value: "2", color: "purple" },
  {
    title: "Active Litigation",
    value: "1",
    color: "red",
    backgroundClass: "bg-rose-50",
  },
  {
    title: "Legal Health",
    value: "Good",
    subText: "92% compliant",
    color: "green",
    backgroundClass: "bg-emerald-50",
  },
];

const colorMap: Record<StatItem["color"], string> = {
  default: "border-slate-200 bg-white",
  blue: "border-blue-200 bg-white",
  yellow: "border-amber-200 bg-white",
  red: "border-rose-200 bg-white",
  purple: "border-violet-200 bg-white",
  green: "border-emerald-200 bg-white",
};

const textColorMap: Record<StatItem["color"], string> = {
  default: "text-slate-900",
  blue: "text-slate-900",
  yellow: "text-amber-800",
  red: "text-rose-700",
  purple: "text-violet-700",
  green: "text-emerald-700",
};

const badgeColorMap: Record<StatItem["color"], string> = {
  default:
    "inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white",
  blue: "inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white",
  yellow:
    "inline-flex items-center rounded-full bg-slate-900 px-2.5 py-1 text-[11px] font-medium text-white",
  red: "inline-flex items-center rounded-full bg-rose-600 px-2.5 py-1 text-[11px] font-medium text-white",
  purple:
    "inline-flex items-center rounded-full bg-violet-600 px-2.5 py-1 text-[11px] font-medium text-white",
  green:
    "inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-1 text-[11px] font-medium text-white",
};

function Dashboard() {
  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="My Dashboard"
          subtitle="Here’s what’s happening with your marketing campaigns today."
        />
      </section>

      <GlobalFilters />

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        {stats.map((stat) => {
          return (
            <Card
              key={stat.title}
              className={cn(
                colorMap[stat.color],
                stat.backgroundClass,
                "border p-0",
              )}
            >
              <CardContent className="min-h-24 p-4">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <h3 className="text-sm font-semibold text-slate-700">
                      {stat.title}
                    </h3>
                  </div>
                </div>

                <div
                  className={cn(
                    "text-3xl font-bold leading-none",
                    textColorMap[stat.color],
                  )}
                >
                  {stat.value}
                </div>

                {stat.tagText ? (
                  <div className="mt-2">
                    <span className={badgeColorMap[stat.color]}>
                      {stat.tagText}
                    </span>
                  </div>
                ) : null}

                {stat.subText && !stat.tagText && (
                  <p className="mt-2 text-xs text-slate-500">{stat.subText}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Issues by Risk Level - Trend</CardTitle>
            <p className="text-sm text-slate-500">
              Monthly breakdown of issues by risk severity
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <IssuesByRiskLevelChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Department Workload Distribution</CardTitle>
            <p className="text-sm text-slate-500">
              Active issues by department
            </p>
          </CardHeader>
          <CardContent className="pt-0">
            <DepartmentWorkloadChart />
          </CardContent>
        </Card>
      </section>

      <section className="grid gap-4 xl:grid-cols-2">
        <DeadlineRadarCard />
        <RiskHeatmapCard />
      </section>

      <ActionCardsSection />
      <RecentPublicationsCard />
    </div>
  );
}

export default Dashboard;
