import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DisputesByTypeDatum = {
  type: string;
  count: number;
};

const disputesByTypeData: DisputesByTypeDatum[] = [
  { type: "Chargeback", count: 36 },
  { type: "Refund", count: 28 },
  { type: "Service", count: 16 },
  { type: "Legal Threat", count: 6 },
  { type: "Injury", count: 2 },
];

const chartConfig = {
  count: { label: "Count", color: "#2563eb" },
};

function DisputesByTypeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="disputes-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={disputesByTypeData}
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

export default DisputesByTypeChart;
