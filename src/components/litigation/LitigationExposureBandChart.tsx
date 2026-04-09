import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from "recharts";

type ExposureData = {
  band: string;
  cases: number;
};

const data: ExposureData[] = [
  { band: "Low", cases: 3 },
  { band: "Medium", cases: 2 },
  { band: "High", cases: 1 },
];

const chartConfig = {
  cases: { label: "Cases", color: "#7c3aed" },
};

export default function LitigationExposureBandChart() {
  return (
    <div className="h-[320px]">
      <ChartContainer
        id="litigation-exposure-band"
        config={chartConfig}
        className="h-full"
      >
        <BarChart data={data} margin={{ top: 20, right: 16, left: 0, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="band" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="cases" fill="var(--color-cases)" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}
