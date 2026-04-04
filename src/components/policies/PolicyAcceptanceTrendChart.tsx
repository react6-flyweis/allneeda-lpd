import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type AcceptanceTrendData = {
  week: string;
  rate: number;
};

const acceptanceTrendData: AcceptanceTrendData[] = [
  { week: "W1", rate: 78 },
  { week: "W2", rate: 82 },
  { week: "W3", rate: 85 },
  { week: "W4", rate: 88 },
  { week: "W5", rate: 91 },
  { week: "W6", rate: 93 },
  { week: "W7", rate: 95 },
];

const chartConfig = {
  rate: { label: "Acceptance Rate", color: "#10b981" },
};

function PolicyAcceptanceTrendChart() {
  return (
    <div className="h-[320px]">
      <ChartContainer
        id="policy-acceptance-trend"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={acceptanceTrendData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="week" />
          <YAxis domain={[70, 100]} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="var(--color-rate)"
            strokeWidth={3}
            dot={{ r: 3 }}
            activeDot={{ r: 5 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default PolicyAcceptanceTrendChart;
