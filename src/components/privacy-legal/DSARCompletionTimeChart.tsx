import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type DSARCompletionTimeDatum = {
  month: string;
  days: number;
};

const dsarCompletionTimeData: DSARCompletionTimeDatum[] = [
  { month: "Jul", days: 28 },
  { month: "Aug", days: 27 },
  { month: "Sep", days: 25 },
  { month: "Oct", days: 24 },
  { month: "Nov", days: 27 },
  { month: "Dec", days: 22 },
  { month: "Jan", days: 21 },
];

const chartConfig = {
  days: { label: "Days", color: "#2563eb" },
};

function DSARCompletionTimeChart() {
  return (
    <div className="h-90">
      <ChartContainer
        id="dsar-completion-time"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={dsarCompletionTimeData}
          margin={{ top: 24, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="days"
            stroke="var(--color-days)"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default DSARCompletionTimeChart;
