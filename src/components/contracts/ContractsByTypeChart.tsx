import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type ContractsByTypeDatum = {
  type: string;
  count: number;
};

const contractsByTypeData: ContractsByTypeDatum[] = [
  { type: "NDA", count: 24 },
  { type: "MSA", count: 12 },
  { type: "SOW", count: 14 },
  { type: "DPA", count: 8 },
  { type: "Enterprise", count: 18 },
];

const chartConfig = {
  count: { label: "Contracts", color: "#2563eb" },
};

function ContractsByTypeChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="contracts-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={contractsByTypeData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="type" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default ContractsByTypeChart;
