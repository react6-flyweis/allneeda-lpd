import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type BrandCasesByTypeDatum = {
  type: string;
  count: number;
};

const brandCasesByTypeData: BrandCasesByTypeDatum[] = [
  { type: "Impersonation", count: 18 },
  { type: "Brand Misuse", count: 12 },
  { type: "Unauthorized Usage", count: 8 },
];

const chartConfig = {
  count: { label: "Cases", color: "#2563eb" },
};

function BrandCasesByTypeChart() {
  return (
    <div className="h-90">
      <ChartContainer
        id="brand-cases-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={brandCasesByTypeData}
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

export default BrandCasesByTypeChart;
