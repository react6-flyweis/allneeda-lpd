import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

type ComplianceScoreData = {
  quarter: string;
  score: number;
};

const complianceScoreData: ComplianceScoreData[] = [
  { quarter: "Q2 2025", score: 88 },
  { quarter: "Q3 2025", score: 91 },
  { quarter: "Q4 2025", score: 93 },
  { quarter: "Q1 2026", score: 94 },
];

const chartConfig = {
  score: { label: "Compliance Score", color: "#2563eb" },
};

function ComplianceScoreTrendChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="compliance-score-trend"
        config={chartConfig}
        className="h-full"
      >
        <LineChart
          data={complianceScoreData}
          margin={{ top: 20, right: 16, left: 0, bottom: 16 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="quarter" />
          <YAxis domain={[80, 100]} tick={{ fontSize: 12 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Line
            type="monotone"
            dataKey="score"
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

export default ComplianceScoreTrendChart;
