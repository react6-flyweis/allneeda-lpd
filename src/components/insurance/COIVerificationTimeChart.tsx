import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type COIVerificationTimeDatum = {
  month: string;
  hours: number;
};

const coiVerificationTimeData: COIVerificationTimeDatum[] = [
  { month: "Jul", hours: 58 },
  { month: "Aug", hours: 52 },
  { month: "Sep", hours: 47 },
  { month: "Oct", hours: 45 },
  { month: "Nov", hours: 47 },
  { month: "Dec", hours: 43 },
  { month: "Jan", hours: 40 },
];

const chartConfig = {
  hours: { label: "Hours", color: "#2563eb" },
};

function COIVerificationTimeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="coi-verification-time"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={coiVerificationTimeData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
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
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default COIVerificationTimeChart;
