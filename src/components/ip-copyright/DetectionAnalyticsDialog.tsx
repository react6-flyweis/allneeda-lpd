import { useState } from "react";
import {
  BarChart3,
  CheckCircle2,
  Info,
  ShieldAlert,
  TrendingUp,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type DetectionAnalyticsDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const detectionMethodPerformance = [
  {
    label: "Perceptual Hash Matching",
    value: "5,234 detections (42%)",
    accuracy: "Accuracy: 96.8% | Avg confidence: 93%",
    progress: 42,
    barClassName: "bg-blue-600",
  },
  {
    label: "Audio Fingerprinting",
    value: "3,789 detections (30%)",
    accuracy: "Accuracy: 97.2% | Avg confidence: 95%",
    progress: 30,
    barClassName: "bg-purple-600",
  },
  {
    label: "Similarity Analysis (Visual)",
    value: "2,156 detections (17%)",
    accuracy: "Accuracy: 89.4% | Avg confidence: 78%",
    progress: 17,
    barClassName: "bg-emerald-500",
  },
  {
    label: "Metadata Analysis",
    value: "1,277 detections (11%)",
    accuracy: "Accuracy: 92.1% | Avg confidence: 85%",
    progress: 11,
    barClassName: "bg-orange-600",
  },
];

const contentDistribution = [
  {
    percent: "48%",
    label: "Video",
    value: "5,979 detections",
    percentClassName: "text-blue-600",
  },
  {
    percent: "32%",
    label: "Audio",
    value: "3,986 detections",
    percentClassName: "text-purple-600",
  },
  {
    percent: "20%",
    label: "Image",
    value: "2,491 detections",
    percentClassName: "text-emerald-600",
  },
];

const riskLevels = [
  {
    title: "High Risk",
    description: "Confidence ≥ 95%, repeat offenders",
    value: "2,347",
    share: "18.8%",
    rowClassName: "bg-rose-50",
    valueClassName: "text-red-600",
    iconClassName: "text-red-500",
    icon: XCircle,
  },
  {
    title: "Medium Risk",
    description: "Confidence 80-95%, some history",
    value: "5,892",
    share: "47.3%",
    rowClassName: "bg-orange-50",
    valueClassName: "text-orange-600",
    iconClassName: "text-orange-500",
    icon: ShieldAlert,
  },
  {
    title: "Low Risk",
    description: "Confidence 70-80%, first-time users",
    value: "4,217",
    share: "33.9%",
    rowClassName: "bg-amber-50",
    valueClassName: "text-amber-600",
    iconClassName: "text-amber-500",
    icon: Info,
  },
];

const actionOutcomes = [
  {
    value: "8,932",
    label: "Blocked Pre-Upload",
    share: "71.7%",
    cardClassName: "bg-emerald-50",
    valueClassName: "text-emerald-600",
  },
  {
    value: "1,856",
    label: "Removed Post-Upload",
    share: "14.9%",
    cardClassName: "bg-rose-50",
    valueClassName: "text-red-600",
  },
  {
    value: "1,234",
    label: "Under Review",
    share: "9.9%",
    cardClassName: "bg-blue-50",
    valueClassName: "text-blue-600",
  },
  {
    value: "434",
    label: "False Positive",
    share: "3.5%",
    cardClassName: "bg-slate-50",
    valueClassName: "text-slate-600",
  },
];

const keyInsights = [
  {
    title: "Peak Detection Time",
    description: "2:00 PM - 4:00 PM UTC (highest infringement attempts)",
    icon: CheckCircle2,
    colorClassName: "text-emerald-600",
    boxClassName: "bg-emerald-50",
  },
  {
    title: "Top Infringement Sources",
    description: "Music videos (45%), Movie clips (28%), TV content (18%)",
    icon: Info,
    colorClassName: "text-blue-600",
    boxClassName: "bg-blue-50",
  },
  {
    title: "Trending Pattern",
    description:
      "15% increase in audio fingerprint matches (possible viral music trend)",
    icon: TrendingUp,
    colorClassName: "text-orange-600",
    boxClassName: "bg-orange-50",
  },
  {
    title: "Prevention Success Rate",
    description:
      "71.7% of infringements blocked before publication (platform protection)",
    icon: ShieldAlert,
    colorClassName: "text-purple-600",
    boxClassName: "bg-purple-50",
  },
];

function DetectionAnalyticsDialog({
  open,
  onOpenChange,
}: DetectionAnalyticsDialogProps) {
  const [timeRange, setTimeRange] = useState("Last 7 Days");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Copyright Detection Analytics
          </DialogTitle>
          <DialogDescription>
            Comprehensive performance metrics and insights
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-medium">Time Range:</p>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-44 bg-gray-50">
                <SelectValue placeholder="Select time range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Last 7 Days">Last 7 Days</SelectItem>
                <SelectItem value="Last 30 Days">Last 30 Days</SelectItem>
                <SelectItem value="Last 90 Days">Last 90 Days</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            <Card className="border-slate-200">
              <CardContent className="space-y-4 p-5">
                <p>Total Detections</p>
                <div className="space-y-1">
                  <p className="text-3xl font-semibold text-slate-900">
                    12,456
                  </p>
                  <p className="text-sm text-emerald-600">
                    +15.3% vs previous period
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="space-y-4 p-5">
                <p>Pre-Upload Blocks</p>
                <div className="space-y-1">
                  <p className="text-3xl font-semibold text-emerald-600">
                    8,932
                  </p>
                  <p className="text-sm text-muted-foreground">
                    71.7% of total
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="space-y-4 p-5">
                <p>Post-Upload Flags</p>
                <div className="space-y-1">
                  <p className="text-3xl font-semibold text-orange-600">
                    3,524
                  </p>
                  <p className="text-sm text-muted-foreground">
                    28.3% of total
                  </p>
                </div>
              </CardContent>
            </Card>
            <Card className="border-slate-200">
              <CardContent className="space-y-4 p-5">
                <p>Accuracy Rate</p>
                <div className="space-y-1">
                  <p className="text-3xl font-semibold text-emerald-600">
                    94.2%
                  </p>
                  <p className="text-sm text-muted-foreground">
                    False positive: 2.1%
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-5">
              <p className="font-medium">Detection Method Performance</p>
              <div className="space-y-4">
                {detectionMethodPerformance.map((item) => {
                  return (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between gap-4 text-sm">
                        <p>{item.label}</p>
                        <p className="text-muted-foreground">{item.value}</p>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-200">
                        <div
                          className={`h-2 rounded-full ${item.barClassName}`}
                          style={{ width: `${item.progress}%` }}
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {item.accuracy}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-5">
              <p className="font-medium">Content Type Distribution</p>
              <div className="grid gap-4 sm:grid-cols-3">
                {contentDistribution.map((item) => {
                  return (
                    <Card
                      key={item.label}
                      className="border-slate-200 shadow-none"
                    >
                      <CardContent className="space-y-2 p-5 text-center">
                        <p
                          className={`text-3xl font-semibold ${item.percentClassName}`}
                        >
                          {item.percent}
                        </p>
                        <p>{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.value}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-5">
              <p className="font-medium">Risk Level Analysis</p>
              <div className="space-y-3">
                {riskLevels.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`flex items-center justify-between gap-4 rounded-xl p-4 ${item.rowClassName}`}
                    >
                      <div className="flex items-start gap-3">
                        <ItemIcon
                          className={`mt-0.5 h-5 w-5 ${item.iconClassName}`}
                        />
                        <div>
                          <p>{item.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p
                          className={`text-xl font-semibold ${item.valueClassName}`}
                        >
                          {item.value}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {item.share}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-5">
              <p className="font-medium">Action Outcomes (Last 7 Days)</p>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {actionOutcomes.map((item) => {
                  return (
                    <Card
                      key={item.label}
                      className={`border-slate-200 shadow-none ${item.cardClassName}`}
                    >
                      <CardContent className="space-y-1 p-4 text-center">
                        <p
                          className={`text-2xl font-semibold ${item.valueClassName}`}
                        >
                          {item.value}
                        </p>
                        <p className="text-sm">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {item.share}
                        </p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-5">
              <p className="font-medium">Key Performance Insights</p>
              <div className="space-y-3">
                {keyInsights.map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className={`flex items-start gap-3 rounded-xl p-4 ${item.boxClassName}`}
                    >
                      <ItemIcon
                        className={`mt-0.5 h-5 w-5 ${item.colorClassName}`}
                      />
                      <div>
                        <p>{item.title}</p>
                        <p className={`text-sm ${item.colorClassName}`}>
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardContent className="space-y-5 p-5">
              <p className="font-medium">Detection System Health</p>
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <p className="text-sm text-muted-foreground">System Uptime</p>
                  <p className="text-xl font-semibold text-emerald-600">
                    99.98%
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Avg Processing Time
                  </p>
                  <p className="text-xl font-semibold text-slate-900">
                    1.2 seconds
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Database Signatures
                  </p>
                  <p className="text-xl font-semibold text-slate-900">2.4M+</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Daily Throughput
                  </p>
                  <p className="text-xl font-semibold text-slate-900">
                    45,000+
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="pt-2 justify-end gap-3 sm:flex-row">
          <Button
            type="button"
            variant="outline"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
          <Button type="button">Export Analytics Report</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DetectionAnalyticsDialog;
