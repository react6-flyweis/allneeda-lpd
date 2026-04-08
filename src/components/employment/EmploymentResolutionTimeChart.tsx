import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type EmploymentResolutionDatum = {
  month: string;
  days: number;
};

const resolutionData: EmploymentResolutionDatum[] = [
  { month: "Jul", days: 12 },
  { month: "Aug", days: 11 },
  { month: "Sep", days: 10 },
  { month: "Oct", days: 9 },
  { month: "Nov", days: 10 },
  { month: "Dec", days: 8 },
  { month: "Jan", days: 8 },
];

const chartConfig = {
  days: { label: "Days", color: "#2563eb" },
};

function EmploymentResolutionTimeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="employment-resolution-time"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={resolutionData}
          margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis axisLine={true} tickLine={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="days"
            stroke="var(--color-days)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default EmploymentResolutionTimeChart;
