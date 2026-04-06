import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type ResponseTimeTrendData = {
  month: string;
  days: number;
};

const responseTimeTrendData: ResponseTimeTrendData[] = [
  { month: "Jul", days: 9.5 },
  { month: "Aug", days: 10.2 },
  { month: "Sep", days: 8.8 },
  { month: "Oct", days: 8.3 },
  { month: "Nov", days: 9.4 },
  { month: "Dec", days: 8.7 },
  { month: "Jan", days: 8.1 },
];

const chartConfig = {
  days: { label: "Response Time (days)", color: "#3b82f6" },
};

function ResponseTimeTrendChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="response-time-trend"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={responseTimeTrendData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis domain={[0, 12]} />
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

export default ResponseTimeTrendChart;
