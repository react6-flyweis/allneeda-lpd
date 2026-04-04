import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type DepartmentWorkloadData = {
  department: string;
  issues: number;
};

const data: DepartmentWorkloadData[] = [
  { department: "Governance", issues: 24 },
  { department: "Policies", issues: 12 },
  { department: "Regulatory", issues: 8 },
  { department: "Permits", issues: 36 },
  { department: "Insurance", issues: 28 },
  { department: "Compliance", issues: 18 },
  { department: "IP", issues: 22 },
  { department: "Contracts", issues: 14 },
];

const chartConfig = {
  issues: { label: "Active issues", color: "#2563eb" },
};

function DepartmentWorkloadChart() {
  return (
    <div className="h-[320px]">
      <ChartContainer
        id="department-workload"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 16, left: 0, bottom: 32 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="department"
            interval={0}
            height={80}
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 12 }}
          />
          <YAxis axisLine={true} tickLine={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="issues"
            fill="var(--color-issues)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default DepartmentWorkloadChart;
