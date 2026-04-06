import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type CasesBySensitivityData = {
  sensitivity: string;
  count: number;
};

const casesBySensitivityData: CasesBySensitivityData[] = [
  { sensitivity: "Normal", count: 15 },
  { sensitivity: "Sensitive", count: 8 },
  { sensitivity: "Highly Sensitive", count: 3 },
];

const chartConfig = {
  count: { label: "Cases", color: "#2563eb" },
};

function CasesBySensitivityChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="cases-by-sensitivity"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={casesBySensitivityData}
          margin={{ top: 20, right: 16, left: 0, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="sensitivity"
            interval={0}
            height={48}
            tick={{ fontSize: 12, dy: 8 }}
          />
          <YAxis axisLine={true} tickLine={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="var(--color-count)" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default CasesBySensitivityChart;
