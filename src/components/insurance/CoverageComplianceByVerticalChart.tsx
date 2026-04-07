import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type CoverageComplianceDatum = {
  vertical: string;
  compliant: number;
};

const coverageComplianceData: CoverageComplianceDatum[] = [
  { vertical: "Restaurant", compliant: 45 },
  { vertical: "Contractor", compliant: 38 },
  { vertical: "Transport", compliant: 52 },
  { vertical: "Professional", compliant: 42 },
];

const chartConfig = {
  compliant: { label: "Compliant providers", color: "#2563eb" },
};

function CoverageComplianceByVerticalChart() {
  return (
    <div className="h-full">
      <ChartContainer
        id="coverage-compliance-by-vertical"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={coverageComplianceData}
          margin={{ top: 20, right: 16, left: 0, bottom: 4 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="vertical" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="compliant"
            fill="var(--color-compliant)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default CoverageComplianceByVerticalChart;
