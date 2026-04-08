import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type EmploymentCasesByTypeDatum = {
  type: string;
  cases: number;
};

const casesByTypeData: EmploymentCasesByTypeDatum[] = [
  { type: "Termination", cases: 8 },
  { type: "Dispute", cases: 5 },
  { type: "Policy Question", cases: 12 },
  { type: "Compliance", cases: 6 },
];

const chartConfig = {
  cases: { label: "Cases", color: "#3b82f6" },
};

function EmploymentCasesByTypeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="employment-cases-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={casesByTypeData}
          margin={{ top: 20, right: 16, left: 0, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="type"
            interval={0}
            height={48}
            tick={{ fontSize: 12, dy: 8 }}
          />
          <YAxis axisLine={true} tickLine={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="cases"
            fill="var(--color-cases)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default EmploymentCasesByTypeChart;
