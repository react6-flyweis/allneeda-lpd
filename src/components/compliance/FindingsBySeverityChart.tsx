import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type FindingsBySeverityData = {
  severity: string;
  count: number;
};

const findingsBySeverityData: FindingsBySeverityData[] = [
  { severity: "Low", count: 12 },
  { severity: "Medium", count: 8 },
  { severity: "High", count: 4 },
  { severity: "Critical", count: 1 },
];

const chartConfig = {
  count: { label: "Findings", color: "#2563eb" },
};

function FindingsBySeverityChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="findings-by-severity"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={findingsBySeverityData}
          margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="severity" />
          <YAxis tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="count" fill="#2563eb" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default FindingsBySeverityChart;
