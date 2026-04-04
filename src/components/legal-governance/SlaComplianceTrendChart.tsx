import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type SlaTrendData = {
  month: string;
  compliance: number;
  target: number;
};

const slaTrendData: SlaTrendData[] = [
  { month: "Jul", compliance: 92, target: 95 },
  { month: "Aug", compliance: 89, target: 95 },
  { month: "Sep", compliance: 94, target: 95 },
  { month: "Oct", compliance: 96, target: 95 },
  { month: "Nov", compliance: 93, target: 95 },
  { month: "Dec", compliance: 91, target: 95 },
  { month: "Jan", compliance: 95, target: 95 },
];

const chartConfig = {
  compliance: { label: "Actual", color: "#2563eb" },
  target: { label: "Target (95%)", color: "#22c55e" },
};

function SlaComplianceTrendChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="sla-compliance-trend"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={slaTrendData}
          margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis domain={[85, 100]} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line
            type="monotone"
            dataKey="compliance"
            stroke="var(--color-compliance)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
          <Line
            type="monotone"
            dataKey="target"
            stroke="var(--color-target)"
            strokeWidth={3}
            dot={false}
            strokeDasharray="4 4"
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default SlaComplianceTrendChart;
