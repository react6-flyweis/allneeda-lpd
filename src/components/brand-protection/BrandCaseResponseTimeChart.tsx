import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type ResponseTimeDatum = {
  month: string;
  hours: number;
};

const responseTimeData: ResponseTimeDatum[] = [
  { month: "Jul", hours: 32 },
  { month: "Aug", hours: 31 },
  { month: "Sep", hours: 29 },
  { month: "Oct", hours: 25 },
  { month: "Nov", hours: 26 },
  { month: "Dec", hours: 24 },
  { month: "Jan", hours: 23 },
];

const chartConfig = {
  hours: { label: "Hours", color: "#2563eb" },
};

function BrandCaseResponseTimeChart() {
  return (
    <div className="h-90">
      <ChartContainer
        id="brand-case-response-time"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={responseTimeData}
          margin={{ top: 24, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="month" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="hours"
            stroke="var(--color-hours)"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default BrandCaseResponseTimeChart;
