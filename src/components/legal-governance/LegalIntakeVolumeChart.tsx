import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type IntakeVolumeData = {
  category: string;
  intakes: number;
};

const intakeVolumeData: IntakeVolumeData[] = [
  { category: "Policy", intakes: 8 },
  { category: "Regulatory", intakes: 6 },
  { category: "Privacy", intakes: 5 },
  { category: "IP", intakes: 4 },
  { category: "Permits", intakes: 3 },
  { category: "Disputes", intakes: 7 },
  { category: "Contracts", intakes: 5 },
  { category: "Other", intakes: 4 },
];

const chartConfig = {
  intakes: { label: "Intake Volume", color: "#8b5cf6" },
};

function LegalIntakeVolumeChart() {
  return (
    <div className="h-80">
      <ChartContainer
        id="legal-intake-volume"
        config={chartConfig}
        className="h-full"
      >
        <BarChart
          data={intakeVolumeData}
          margin={{ top: 20, right: 16, left: 0, bottom: 24 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis
            dataKey="category"
            interval={0}
            height={60}
            angle={-45}
            textAnchor="end"
            tick={{ fontSize: 12, dy: 8 }}
          />
          <YAxis axisLine={true} tickLine={true} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar
            dataKey="intakes"
            fill="var(--color-intakes)"
            radius={[8, 8, 0, 0]}
          />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

export default LegalIntakeVolumeChart;
