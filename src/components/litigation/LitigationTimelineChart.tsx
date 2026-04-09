import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type TimelineData = {
  month: string;
  active: number;
  settled: number;
};

const data: TimelineData[] = [
  { month: "Jul", active: 2, settled: 1 },
  { month: "Aug", active: 3, settled: 1 },
  { month: "Sep", active: 2, settled: 1 },
  { month: "Oct", active: 3, settled: 1 },
  { month: "Nov", active: 2, settled: 1 },
  { month: "Dec", active: 2, settled: 1 },
  { month: "Jan", active: 1, settled: 1 },
];

const chartConfig = {
  active: { label: "Active", color: "#10b981" },
  settled: { label: "Settled", color: "#3b82f6" },
};

export default function LitigationTimelineChart() {
  return (
    <div className="h-[320px]">
      <ChartContainer
        id="litigation-timeline"
        config={chartConfig}
        className="h-full"
      >
        <LineChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="active"
            stroke="var(--color-active)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="settled"
            stroke="var(--color-settled)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}
