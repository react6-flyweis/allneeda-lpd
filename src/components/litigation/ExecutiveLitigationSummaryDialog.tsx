import {
  AlertTriangle,
  CheckCircle2,
  FileClock,
  Send,
  ShieldAlert,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export type ExecutiveLitigationCase = {
  id: string;
  type: string;
  parties: string;
  jurisdiction: string;
  nextHearing: string;
  exposure: "low" | "medium" | "high";
  status: "active" | "settled";
};

interface ExecutiveLitigationSummaryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  litigationCase: ExecutiveLitigationCase | null;
}

const exposureTextMap: Record<ExecutiveLitigationCase["exposure"], string> = {
  low: "$25K-$100K",
  medium: "$100K-$1M",
  high: "$1M+",
};

const exposureBadgeTextMap: Record<
  ExecutiveLitigationCase["exposure"],
  string
> = {
  low: "LOW EXPOSURE",
  medium: "MEDIUM EXPOSURE",
  high: "HIGH EXPOSURE",
};

export default function ExecutiveLitigationSummaryDialog({
  open,
  onOpenChange,
  litigationCase,
}: ExecutiveLitigationSummaryDialogProps) {
  const winProbability =
    litigationCase?.exposure === "high"
      ? 48
      : litigationCase?.exposure === "low"
        ? 74
        : 65;
  const settlementLikelihood =
    litigationCase?.exposure === "high"
      ? 62
      : litigationCase?.exposure === "low"
        ? 35
        : 45;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <Users className="size-5 text-rose-600" />
            <DialogTitle>Executive Litigation Summary</DialogTitle>
          </div>
          <DialogDescription>
            High-level overview for executive decision-making | Confidential &
            Privileged
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 px-5 pb-5 pt-3">
          <section className="rounded-xl border border-rose-200 bg-rose-50 p-4">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-slate-900">
                  {litigationCase?.parties ?? "-"}
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                  Case ID:{" "}
                  <span className="font-semibold">
                    {litigationCase?.id ?? "-"}
                  </span>
                  {"  "}| Type:{" "}
                  <span className="font-semibold capitalize">
                    {litigationCase?.type ?? "-"}
                  </span>
                  {"  "}| Jurisdiction:{" "}
                  <span className="font-semibold">
                    {litigationCase?.jurisdiction ?? "-"}
                  </span>
                </p>
              </div>
              <Badge className="rounded-full bg-slate-900 px-3 py-1 text-xs text-white">
                {litigationCase
                  ? exposureBadgeTextMap[litigationCase.exposure]
                  : "EXPOSURE"}
              </Badge>
            </div>
          </section>

          <section className="grid gap-3 md:grid-cols-3">
            <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
              <p className="text-sm font-medium uppercase text-amber-700">
                Financial Exposure
              </p>
              <p className="mt-3 text-xl font-semibold text-amber-900">
                {litigationCase
                  ? exposureTextMap[litigationCase.exposure]
                  : "-"}
              </p>
              <p className="text-sm text-amber-700">
                Estimated Liability Range
              </p>
              <div className="mt-2 border-t border-amber-200 pt-2">
                <p className="font-semibold text-amber-900">
                  Legal Budget: TBD
                </p>
                <p className="text-sm text-amber-700">Allocated for defense</p>
              </div>
            </div>

            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
              <p className="text-sm font-medium uppercase text-blue-700">
                Case Status
              </p>
              <Badge className="mt-4 rounded-full bg-slate-900 px-3 py-1 text-xs text-white capitalize">
                {litigationCase?.status ?? "-"}
              </Badge>
              <p className="mt-2 text-sm text-blue-700 capitalize">
                Current Stage
              </p>
              <div className="mt-2 border-t border-blue-200 pt-2">
                <p className="font-semibold text-blue-900">Filed: 9/21/2025</p>
                <p className="text-sm text-blue-700">120 days pending</p>
              </div>
            </div>

            <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
              <p className="text-sm font-medium uppercase text-violet-700">
                Next Critical Date
              </p>
              <p className="mt-3 text-xl font-semibold text-violet-800">
                {litigationCase?.nextHearing ?? "-"}
              </p>
              <p className="text-sm text-violet-700">Next Hearing</p>
              <div className="mt-2 border-t border-violet-200 pt-2">
                <p className="font-semibold text-violet-900">45 days</p>
                <p className="text-sm text-violet-700">Until hearing</p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <AlertTriangle className="size-4 text-rose-500" />
              Risk Assessment & Probability Analysis
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-800">
                      Win Probability
                    </p>
                    <p className="font-semibold text-emerald-700">
                      {winProbability}%
                    </p>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-rose-200">
                    <div
                      className="h-full rounded-full bg-emerald-500"
                      style={{ width: `${winProbability}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Based on legal analysis and precedent
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-slate-800">
                      Settlement Likelihood
                    </p>
                    <p className="font-semibold text-blue-700">
                      {settlementLikelihood}%
                    </p>
                  </div>
                  <div className="mt-2 h-2 rounded-full bg-rose-200">
                    <div
                      className="h-full rounded-full bg-blue-500"
                      style={{ width: `${settlementLikelihood}%` }}
                    />
                  </div>
                  <p className="mt-1 text-sm text-slate-500">
                    Probability of out-of-court resolution
                  </p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="rounded-lg border border-rose-200 bg-white p-3">
                  <p className="text-sm font-semibold uppercase text-rose-700">
                    Exposure Level
                  </p>
                  <p className="mt-1 text-sm text-slate-800">
                    <Badge className="mr-2 bg-slate-900 text-white">
                      {litigationCase?.exposure?.toUpperCase() ?? "-"}
                    </Badge>
                    Financial risk to company
                  </p>
                </div>
                <div className="rounded-lg border border-rose-200 bg-white p-3">
                  <p className="text-sm font-semibold uppercase text-rose-700">
                    Reputational Risk
                  </p>
                  <p className="mt-1 text-sm text-slate-800">
                    <Badge className="mr-2 bg-slate-900 text-white">
                      MODERATE
                    </Badge>
                    Potential impact on brand
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <CheckCircle2 className="size-4 text-emerald-600" />
              Strategic Recommendation
            </h3>
            <div className="mt-3 rounded-lg border border-emerald-200 bg-white p-3">
              <p className="text-base font-semibold text-emerald-700">
                Recommended Course of Action
              </p>
              <p className="mt-1 text-sm text-slate-700">
                Continue with standard litigation defense strategy. Monitor for
                settlement opportunities but maintain strong defensive posture.
              </p>
            </div>
            <div className="mt-3 grid gap-3 md:grid-cols-2">
              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  Litigation Strategy
                </p>
                <p className="text-sm text-slate-700">
                  Motion to dismiss, followed by aggressive discovery
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-white p-3">
                <p className="text-sm font-semibold uppercase text-emerald-700">
                  Timeline Estimate
                </p>
                <p className="text-sm text-slate-700">
                  12-18 months to trial or settlement
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-blue-100 bg-blue-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <Users className="size-4 text-blue-600" />
              Resource Allocation & Legal Team
            </h3>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border border-blue-200 bg-white p-3">
                <p className="text-sm font-semibold uppercase text-blue-700">
                  Lead Counsel
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Internal Legal Team
                </p>
                <p className="text-sm text-slate-500">
                  Primary case management
                </p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-white p-3">
                <p className="text-sm font-semibold uppercase text-blue-700">
                  Outside Counsel
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  Regional Firm
                </p>
                <p className="text-sm text-slate-500">Litigation support</p>
              </div>
              <div className="rounded-lg border border-blue-200 bg-white p-3">
                <p className="text-sm font-semibold uppercase text-blue-700">
                  Estimated Legal Costs
                </p>
                <p className="text-sm font-semibold text-slate-800">
                  $75K - $150K
                </p>
                <p className="text-sm text-slate-500">
                  Defense costs projection
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <AlertTriangle className="size-4 text-amber-600" />
              Executive Action Items & Decisions Required
            </h3>
            <div className="mt-3 space-y-2">
              <label className="flex items-start gap-2 rounded-lg border border-yellow-300 bg-white px-3 py-2 text-sm text-slate-800">
                <Checkbox disabled />
                <span>
                  <strong>Approve litigation budget:</strong> Review and
                  authorize legal spend allocation for this case
                </span>
              </label>
              <label className="flex items-start gap-2 rounded-lg border border-yellow-300 bg-white px-3 py-2 text-sm text-slate-800">
                <Checkbox disabled />
                <span>
                  <strong>Settlement authority:</strong> Determine settlement
                  approval thresholds and negotiation parameters
                </span>
              </label>
              <label className="flex items-start gap-2 rounded-lg border border-yellow-300 bg-white px-3 py-2 text-sm text-slate-800">
                <Checkbox disabled />
                <span>
                  <strong>Insurance notification:</strong> Confirm insurance
                  carrier has been notified per policy requirements
                </span>
              </label>
            </div>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <FileClock className="size-4 text-violet-600" />
              Key Dates & Litigation Timeline
            </h3>
            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between rounded-lg border border-violet-200 bg-white px-3 py-2">
                <div>
                  <p className="font-medium text-slate-800">Case Filed</p>
                  <p className="text-sm text-slate-500">9/21/2025</p>
                </div>
                <Badge className="bg-slate-100 text-slate-700">Completed</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-violet-200 bg-white px-3 py-2">
                <div>
                  <p className="font-medium text-slate-800">Next Hearing</p>
                  <p className="text-sm text-slate-500">
                    {litigationCase?.nextHearing ?? "3/5/2026"}
                  </p>
                </div>
                <Badge className="bg-orange-500 text-white">Upcoming</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-violet-200 bg-white px-3 py-2">
                <div>
                  <p className="font-medium text-slate-800">
                    Discovery Deadline
                  </p>
                  <p className="text-sm text-slate-500">To be determined</p>
                </div>
                <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-violet-200 bg-white px-3 py-2">
                <div>
                  <p className="font-medium text-slate-800">
                    Trial / Arbitration Date
                  </p>
                  <p className="text-sm text-slate-500">To be determined</p>
                </div>
                <Badge className="bg-slate-100 text-slate-700">Pending</Badge>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-rose-300 bg-rose-50 p-4">
            <p className="flex items-start gap-2 text-sm text-rose-800">
              <ShieldAlert className="mt-0.5 size-4 shrink-0" />
              <span>
                <span className="block font-semibold uppercase">
                  Attorney-Client Privileged & Confidential
                </span>
                This executive summary contains attorney-client privileged
                information prepared for CEO decision-making. Distribution is
                strictly limited to executive leadership with need-to-know. Do
                not forward or discuss outside privileged channels. All
                litigation strategy and risk assessments are subject to change
                based on case developments.
              </span>
            </p>
          </section>

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Close
            </Button>
            <Button type="button" className="bg-blue-600 hover:bg-blue-700">
              <Send className="size-4" />
              Forward to Board
            </Button>
            <Button
              type="button"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <CheckCircle2 className="size-4" />
              Approve Recommendation
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
