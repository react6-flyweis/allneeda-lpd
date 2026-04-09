import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type PrivacyRequestsByTypeDatum = {
  type: string;
  count: number;
};

const privacyRequestsByTypeData: PrivacyRequestsByTypeDatum[] = [
  { type: "Access", count: 45 },
  { type: "Deletion", count: 32 },
  { type: "Correction", count: 18 },
  { type: "Portability", count: 12 },
  { type: "Opt-out", count: 28 },
];

const chartConfig = {
  count: { label: "Requests", color: "#2563eb" },
};

function PrivacyRequestsByTypeChart() {
  return (
    <div className="h-90">
      <ChartContainer
        id="privacy-requests-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={privacyRequestsByTypeData}
          margin={{ top: 24, right: 16, left: 0, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="type"
            interval={0}
            height={56}
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

export default PrivacyRequestsByTypeChart;
