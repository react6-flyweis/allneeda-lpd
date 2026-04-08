import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type ContractCycleTimeDatum = {
  month: string;
  days: number;
};

const contractCycleTimeData: ContractCycleTimeDatum[] = [
  { month: "Jul", days: 18 },
  { month: "Aug", days: 17 },
  { month: "Sep", days: 15 },
  { month: "Oct", days: 14 },
  { month: "Nov", days: 16 },
  { month: "Dec", days: 15 },
  { month: "Jan", days: 13 },
];

const chartConfig = {
  days: { label: "Days", color: "#2563eb" },
};

function ContractCycleTimeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="contract-cycle-time"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={contractCycleTimeData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
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

export default ContractCycleTimeChart;
