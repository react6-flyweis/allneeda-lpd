import { Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import PageHeader from "@/components/common_components/PageHeader";

type FilterOption = {
  label: string;
  options: string[];
};

type StatItem = {
  title: string;
  value: string;
  subText?: string;
  color: "default" | "yellow" | "red" | "green" | "blue" | "purple";
};

const filterFields: FilterOption[] = [
  { label: "Country", options: ["All Countries", "USA", "Canada"] },
  { label: "State", options: ["All States", "California", "Texas"] },
  { label: "City", options: ["All Cities", "San Francisco", "Austin"] },
  { label: "ZIP", options: ["All ZIP Codes", "94103", "78701"] },
  { label: "Vertical", options: ["All Verticals", "Compliance", "Legal"] },
  { label: "Time", options: ["Last 24 Hours", "Last 7 Days", "Last 30 Days"] },
  { label: "Risk", options: ["All Risk Levels", "Low", "Medium", "High"] },
];

const stats: StatItem[] = [
  { title: "Open Legal Intakes", value: "3", color: "blue" },
  {
    title: "Policies Pending",
    value: "1",
    subText: "1 Effective",
    color: "yellow",
  },
  { title: "Regulatory Requests", value: "2", color: "purple" },
  {
    title: "Permits Expiring",
    value: "1",
    subText: "Next 90 days",
    color: "blue",
  },
  { title: "COI Missing/Expired", value: "0", color: "red" },
  { title: "Compliance Overdue", value: "0", color: "red" },
  { title: "IP Takedowns", value: "2", color: "blue" },
  { title: "Contracts Expiring", value: "0", color: "yellow" },
  { title: "High-Risk Disputes", value: "1", color: "red" },
  { title: "Privacy Requests", value: "2", color: "purple" },
  { title: "Active Litigation", value: "1", color: "red" },
  {
    title: "Legal Health",
    value: "Good",
    subText: "92% compliant",
    color: "green",
  },
];

const colorMap: Record<StatItem["color"], string> = {
  default: "border-slate-200 bg-white",
  blue: "border-blue-200 bg-blue-50",
  yellow: "border-amber-200 bg-amber-50",
  red: "border-rose-200 bg-rose-50",
  purple: "border-violet-200 bg-violet-50",
  green: "border-emerald-200 bg-emerald-50",
};

function Dashboard() {
  const [filters, setFilters] = useState<Record<string, string>>(
    Object.fromEntries(
      filterFields.map((item) => [item.label, item.options[0]]),
    ),
  );
  const [search, setSearch] = useState("");

  function updateFilter(label: string, value: string) {
    setFilters((prev) => ({ ...prev, [label]: value }));
  }

  return (
    <div className="space-y-6 p-4 md:p-6">
      <section>
        <PageHeader
          title="My Dashboard"
          subtitle="Here’s what’s happening with your marketing campaigns today."
        />
      </section>

      <section className="rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm">
        <p className="mb-3 text-sm font-semibold text-slate-700">
          Global Filters
        </p>

        <div className="mb-4 grid gap-2 md:grid-cols-4">
          {filterFields.slice(0, 4).map((field) => (
            <Select
              key={field.label}
              value={filters[field.label]}
              onValueChange={(value) => updateFilter(field.label, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={field.label} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}
        </div>

        <div className="grid gap-2 md:grid-cols-4">
          {filterFields.slice(4).map((field) => (
            <Select
              key={field.label}
              value={filters[field.label]}
              onValueChange={(value) => updateFilter(field.label, value)}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={field.label} />
              </SelectTrigger>
              <SelectContent>
                {field.options.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ))}

          <div className="relative w-full">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="search for any thing else..."
              className="pl-9"
            />
          </div>
        </div>
      </section>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {stats.map((stat) => {
          return (
            <Card
              key={stat.title}
              className={`${colorMap[stat.color]} border p-0`}
            >
              <CardContent className="min-h-24 p-4">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-slate-700">
                    {stat.title}
                  </h3>
                  <span className="text-xs font-medium text-slate-500">
                    {stat.subText || ""}
                  </span>
                </div>
                <div className="text-3xl font-bold text-slate-900">
                  {stat.value}
                </div>
                {stat.subText && stat.value !== "Good" && (
                  <p className="text-xs text-slate-500">{stat.subText}</p>
                )}
              </CardContent>
            </Card>
          );
        })}
      </section>
    </div>
  );
}

export default Dashboard;
