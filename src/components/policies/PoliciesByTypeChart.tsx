import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type PoliciesByTypeData = {
  type: string;
  count: number;
};

const policiesByTypeData: PoliciesByTypeData[] = [
  { type: "ToS", count: 5 },
  { type: "Privacy", count: 3 },
  { type: "Creator", count: 4 },
  { type: "Merchant", count: 2 },
  { type: "Cookie", count: 2 },
];

const chartConfig = {
  count: { label: "Policies", color: "#3b82f6" },
};

function PoliciesByTypeChart() {
  return (
    <div className="h-[320px]">
      <ChartContainer
        id="policies-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={policiesByTypeData}
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
    </div>
  );
}

export default PoliciesByTypeChart;
