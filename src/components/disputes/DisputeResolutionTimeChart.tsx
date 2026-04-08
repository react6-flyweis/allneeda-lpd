import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type DisputeResolutionDatum = {
  month: string;
  days: number;
};

const disputeResolutionData: DisputeResolutionDatum[] = [
  { month: "Jul", days: 45 },
  { month: "Aug", days: 43 },
  { month: "Sep", days: 40 },
  { month: "Oct", days: 38 },
  { month: "Nov", days: 42 },
  { month: "Dec", days: 37 },
  { month: "Jan", days: 34 },
];

const chartConfig = {
  days: { label: "Days", color: "#2563eb" },
};

function DisputeResolutionTimeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="dispute-resolution-time"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={disputeResolutionData}
          margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
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
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default DisputeResolutionTimeChart;
