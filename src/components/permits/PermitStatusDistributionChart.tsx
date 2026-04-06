import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type PermitStatusDatum = {
  status: string;
  count: number;
};

const permitStatusData: PermitStatusDatum[] = [
  { status: "Verified", count: 160 },
  { status: "Pending", count: 30 },
  { status: "Rejected", count: 6 },
  { status: "Needs Info", count: 12 },
];

const chartConfig = {
  count: { label: "Count", color: "#2563eb" },
};

function PermitStatusDistributionChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="permit-status-distribution"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={permitStatusData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="status" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="count"
            fill="var(--color-count)"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default PermitStatusDistributionChart;
