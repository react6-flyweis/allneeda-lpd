import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type DeadlineItem = {
  department: string;
  item: string;
  risk: "Critical" | "High" | "Medium";
  due: string;
};

const deadlineItems: DeadlineItem[] = [
  {
    department: "Legal Governance",
    item: "privacy - Data breach notification assessment",
    risk: "Critical",
    due: "23h",
  },
  {
    department: "Legal Governance",
    item: "regulatory - Health department inspection follow-up",
    risk: "High",
    due: "1d",
  },
  {
    department: "Legal Governance",
    item: "IP - Content copyright dispute escalation",
    risk: "Medium",
    due: "6d",
  },
  {
    department: "Regulatory Affairs",
    item: "subpoena - Civil subpoena for user transaction records",
    risk: "Critical",
    due: "13d",
  },
  {
    department: "Compliance",
    item: "Remediation - All 47 providers have verified permits",
    risk: "Medium",
    due: "13d",
  },
  {
    department: "Regulatory Affairs",
    item: "regulator_inquiry - Data protection compliance questionnaire",
    risk: "High",
    due: "20d",
  },
  {
    department: "Privacy Legal",
    item: "deletion request - EU-GDPR",
    risk: "High",
    due: "27d",
  },
  {
    department: "Privacy Legal",
    item: "access request - US-CA-CCPA",
    risk: "High",
    due: "42d",
  },
];

const riskPillMap: Record<DeadlineItem["risk"], string> = {
  Critical:
    "inline-flex rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white",
  High: "inline-flex rounded-full bg-rose-500 px-3 py-1 text-xs font-semibold text-white",
  Medium:
    "inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white",
};

const duePillMap: Record<string, string> = {
  "23h":
    "inline-flex rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white",
  "1d": "inline-flex rounded-full bg-rose-600 px-3 py-1 text-xs font-semibold text-white",
  "6d": "inline-flex rounded-full bg-slate-950 px-3 py-1 text-xs font-semibold text-white",
};

const defaultDuePill =
  "inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-900";

function DeadlineRadarCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 text-base font-semibold text-slate-900">
              <Clock className="h-4 w-4" />
              Deadline Radar
            </div>
            <p className="mt-1 text-sm text-slate-500">
              Next 20 deadlines across all departments
            </p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0 px-0">
        <div className="overflow-x-auto">
          <table className="min-w-220 border-separate border-spacing-0">
            <thead>
              <tr className="bg-slate-50 text-left text-[11px] uppercase tracking-[0.18em] text-slate-500">
                <th className="px-4 py-3">Department</th>
                <th className="px-4 py-3">Item</th>
                <th className="px-4 py-3">Risk</th>
                <th className="px-4 py-3">Due</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {deadlineItems.map((deadline, index) => (
                <tr
                  key={`${deadline.department}-${deadline.item}`}
                  className={cn(
                    "bg-white",
                    deadline.risk === "Critical" && "bg-rose-50",
                  )}
                >
                  <td className="px-3 py-2 text-xs font-medium text-slate-900">
                    {index + 1}. {deadline.department}
                  </td>
                  <td className="px-3 py-2 text-xs text-slate-600 max-w-85 truncate">
                    {deadline.item}
                  </td>
                  <td className="px-3 py-2">
                    <span className={riskPillMap[deadline.risk]}>
                      {deadline.risk}
                    </span>
                  </td>
                  <td className="px-3 py-2">
                    <span
                      className={duePillMap[deadline.due] ?? defaultDuePill}
                    >
                      {deadline.due}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default DeadlineRadarCard;
