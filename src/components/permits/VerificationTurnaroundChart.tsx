import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type VerificationTurnaroundDatum = {
  month: string;
  hours: number;
};

const verificationTurnaroundData: VerificationTurnaroundDatum[] = [
  { month: "Jul", hours: 55 },
  { month: "Aug", hours: 50 },
  { month: "Sep", hours: 47 },
  { month: "Oct", hours: 44 },
  { month: "Nov", hours: 46 },
  { month: "Dec", hours: 41 },
  { month: "Jan", hours: 38 },
];

const chartConfig = {
  hours: { label: "Hours", color: "#2563eb" },
};

function VerificationTurnaroundChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="verification-turnaround"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={verificationTurnaroundData}
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

export default VerificationTurnaroundChart;
