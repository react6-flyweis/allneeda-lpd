import { AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { cn } from "@/lib/utils";

type HeatmapLevelKey = "Low" | "Med" | "High" | "Crit";

const heatmapRows: Array<{
  label: string;
  values: Record<HeatmapLevelKey, number>;
}> = [
  { label: "Food", values: { Low: 2, Med: 3, High: 5, Crit: 0 } },
  { label: "Social", values: { Low: 2, Med: 3, High: 1, Crit: 1 } },
  { label: "Home Services", values: { Low: 2, Med: 3, High: 1, Crit: 0 } },
  {
    label: "Influencer Marketplace",
    values: { Low: 2, Med: 3, High: 1, Crit: 0 },
  },
];

const heatmapLevelConfig: Array<{
  key: HeatmapLevelKey;
  label: string;
  classes: string;
}> = [
  {
    key: "Low",
    label: "Low",
    classes: "border border-emerald-200 bg-emerald-100 text-emerald-700",
  },
  {
    key: "Med",
    label: "Med",
    classes: "border border-amber-200 bg-amber-100 text-amber-700",
  },
  {
    key: "High",
    label: "High",
    classes: "border border-orange-200 bg-orange-100 text-orange-700",
  },
  {
    key: "Crit",
    label: "Crit",
    classes: "border border-rose-200 bg-rose-100 text-rose-700",
  },
];

function RiskHeatmapCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-base font-semibold text-slate-900">
              <AlertTriangle className="h-4 w-4" />
              Risk Heatmap
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Issues by product vertical and risk level
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-4 md:grid-cols-[auto_1fr]">
          <div className="space-y-4 text-sm font-semibold text-slate-900">
            {heatmapRows.map((row) => (
              <div key={row.label} className="py-3">
                {row.label}
              </div>
            ))}
          </div>
          <div className="space-y-3">
            {heatmapRows.map((row) => (
              <div key={row.label} className="grid gap-3 sm:grid-cols-4">
                {heatmapLevelConfig.map((level) => (
                  <div
                    key={level.key}
                    className={cn("rounded p-2 text-center", level.classes)}
                  >
                    <div className="text-xs font-semibold uppercase tracking-[0.18em]">
                      {level.label}
                    </div>
                    <div className="mt-1 text-2xl font-semibold text-slate-900">
                      {row.values[level.key]}
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default RiskHeatmapCard;
