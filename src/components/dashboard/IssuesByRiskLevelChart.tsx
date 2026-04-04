import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type RiskTrendData = {
  month: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
};

const data: RiskTrendData[] = [
  { month: "Jul", critical: 1, high: 5, medium: 8, low: 12 },
  { month: "Aug", critical: 1, high: 6, medium: 10, low: 15 },
  { month: "Sep", critical: 2, high: 5, medium: 12, low: 11 },
  { month: "Oct", critical: 1, high: 7, medium: 9, low: 14 },
  { month: "Nov", critical: 1, high: 4, medium: 11, low: 12 },
  { month: "Dec", critical: 2, high: 5, medium: 7, low: 13 },
  { month: "Jan", critical: 1, high: 5, medium: 11, low: 9 },
];

const chartConfig = {
  critical: { label: "Critical", color: "#ef4444" },
  high: { label: "High", color: "#f59e0b" },
  medium: { label: "Medium", color: "#eab308" },
  low: { label: "Low", color: "#22c55e" },
};

function IssuesByRiskLevelChart() {
  return (
    <div className="h-[320px]">
      <ChartContainer id="risk-trend" config={chartConfig} className="h-full">
        <LineChart
          data={data}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="low"
            stroke="var(--color-low)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="medium"
            stroke="var(--color-medium)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="high"
            stroke="var(--color-high)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="critical"
            stroke="var(--color-critical)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default IssuesByRiskLevelChart;
