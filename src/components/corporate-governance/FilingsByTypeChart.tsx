import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type FilingsByTypeData = {
  filingType: string;
  count: number;
};

const data: FilingsByTypeData[] = [
  { filingType: "Annual Report", count: 4 },
  { filingType: "Tax Filing", count: 8 },
  { filingType: "License Renewal", count: 12 },
  { filingType: "Compliance", count: 6 },
];

const chartConfig = {
  count: { label: "Filings", color: "#2563eb" },
};

function FilingsByTypeChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="filings-by-type"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={data}
          margin={{ top: 20, right: 16, left: 0, bottom: 32 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="filingType"
            interval={0}
            height={60}
            tick={{ fontSize: 12 }}
            angle={-35}
            textAnchor="end"
          />
          <YAxis axisLine={true} tickLine={true} />
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

export default FilingsByTypeChart;
