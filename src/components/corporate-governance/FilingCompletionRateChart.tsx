import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type FilingCompletionRateData = {
  quarter: string;
  rate: number;
};

const data: FilingCompletionRateData[] = [
  { quarter: "Q2 2025", rate: 95 },
  { quarter: "Q3 2025", rate: 99 },
  { quarter: "Q4 2025", rate: 100 },
  { quarter: "Q1 2026", rate: 100 },
];

const chartConfig = {
  rate: { label: "Completion Rate", color: "#2563eb" },
};

function FilingCompletionRateChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="filing-completion-rate"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={data}
          margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="quarter" />
          <YAxis domain={[90, 100]} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#2563eb"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </div>
  );
}

export default FilingCompletionRateChart;
