import { Filter, Search } from "lucide-react";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type FilterOption = {
  label: string;
  options: string[];
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

function GlobalFilters() {
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
    <Card>
      <CardHeader>
        <CardTitle>Global Filters</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-5 lg:grid-cols-[auto_1fr]">
          <div className="flex gap-2 text-sm font-medium text-slate-700">
            <Filter className="h-4 w-4 text-slate-500" />
            Filters:
          </div>

          <div className="grid gap-2 md:grid-cols-4">
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
        </div>
      </CardContent>
    </Card>
  );
}

export default GlobalFilters;
