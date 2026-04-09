import {
  Building2,
  CircleCheck,
  Eye,
  FileText,
  Info,
  Scale,
  UserRound,
  Users,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type CorporateEntityDetail = {
  id: string;
  name: string;
  jurisdiction: string;
  formationDate: string;
  status: "active" | "inactive";
  taxIdReference?: string;
  entityAge?: string;
  daysSinceFormation?: string;
  nextAnnualFiling?: string;
  goodStandingStatus?: string;
  lastAnnualReportFiled?: string;
  registeredAgent?: string;
  complianceOfficer?: string;
  relatedFilings?: Array<{
    label: string;
    status: string;
    tone: "warning" | "success" | "info";
  }>;
};

interface EntityDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  entity: CorporateEntityDetail | null;
}

const filingBadgeColorMap: Record<"warning" | "success" | "info", string> = {
  warning: "border-orange-400 bg-orange-50 text-orange-600",
  success: "border-emerald-500 bg-emerald-50 text-emerald-600",
  info: "border-blue-500 bg-blue-50 text-blue-600",
};

export default function EntityDetailsDialog({
  open,
  onOpenChange,
  entity,
}: EntityDetailsDialogProps) {
  const relatedFilings = entity?.relatedFilings ?? [
    {
      label: "Annual Report (DE)",
      status: "Due in 119 days",
      tone: "warning",
    },
    {
      label: "Franchise Tax Payment",
      status: "Filed",
      tone: "success",
    },
    {
      label: "Statement of Information",
      status: "Due in 260 days",
      tone: "info",
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <Eye className="size-5 text-slate-700" />
            <DialogTitle>Entity Details</DialogTitle>
          </div>
          <DialogDescription>
            Comprehensive information for {entity?.name ?? "entity"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 px-5 pb-5 pt-3">
          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="text-base font-medium text-slate-900">
              Basic Entity Information
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Entity ID</p>
                <p className="text-base font-semibold text-slate-900">
                  {entity?.id ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Legal Entity Name</p>
                <p className="text-base font-semibold text-slate-900">
                  {entity?.name ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Jurisdiction</p>
                <p className="text-base text-slate-900">
                  {entity?.jurisdiction ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Formation Date</p>
                <p className="text-base text-slate-900">
                  {entity?.formationDate ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Tax ID / EIN Reference</p>
                <p className="text-base text-slate-900">
                  {entity?.taxIdReference ?? "EIN-***-****12"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Entity Status</p>
                <Badge
                  className={cn(
                    "rounded-full px-2.5 py-0.5 text-xs uppercase",
                    entity?.status === "inactive"
                      ? "bg-slate-200 text-slate-700"
                      : "bg-slate-900 text-white",
                  )}
                >
                  {entity?.status ?? "-"}
                </Badge>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-900">
              Entity Metrics
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-sm text-slate-600">Entity Age</p>
                <p className="text-base font-semibold text-slate-900">
                  {entity?.entityAge ?? "5 years"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Days Since Formation</p>
                <p className="text-base font-semibold text-slate-900">
                  {entity?.daysSinceFormation ?? "1835 days"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Next Annual Filing</p>
                <p className="text-base font-semibold text-orange-600">
                  {entity?.nextAnnualFiling ?? "1/10/2028"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="text-base font-medium text-slate-900">
              Compliance & Governance
            </h3>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <div>
                <p className="text-sm text-slate-600">Good Standing Status</p>
                <p className="mt-1 flex items-center gap-2 text-base font-semibold text-emerald-700">
                  <CircleCheck className="size-5" />
                  {entity?.goodStandingStatus ?? "In Good Standing"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">
                  Last Annual Report Filed
                </p>
                <p className="text-base text-slate-900">
                  {entity?.lastAnnualReportFiled ?? "3/15/2026"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Registered Agent</p>
                <p className="text-base text-slate-900">
                  {entity?.registeredAgent ?? "Corporation Service Company"}
                </p>
              </div>
              <div>
                <p className="text-sm text-slate-600">Compliance Officer</p>
                <p className="text-base text-slate-900">
                  {entity?.complianceOfficer ?? "Jennifer Martinez"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h3 className="text-base font-medium text-slate-900">
              Related Filings & Deadlines
            </h3>
            <div className="mt-3 space-y-2.5">
              {relatedFilings.map((filing) => (
                <div
                  key={filing.label}
                  className="flex items-center justify-between gap-4"
                >
                  <p className="text-base text-slate-700">{filing.label}</p>
                  <Badge
                    className={cn(
                      "rounded-full border px-3 py-1 text-sm font-medium",
                      filingBadgeColorMap[filing.tone],
                    )}
                  >
                    {filing.status}
                  </Badge>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-100 p-4">
            <h3 className="text-base font-medium text-slate-900">
              Quick Actions
            </h3>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button variant="outline" className="gap-2 bg-white">
                <FileText className="size-4" />
                View Documents
              </Button>
              <Button variant="outline" className="gap-2 bg-white">
                <Users className="size-4" />
                View Officers
              </Button>
              <Button variant="outline" className="gap-2 bg-white">
                <Building2 className="size-4" />
                View Bylaws
              </Button>
              <Button variant="outline" className="gap-2 bg-white">
                <Scale className="size-4" />
                View Contracts
              </Button>
            </div>
          </section>

          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="flex items-start gap-3">
              <Info className="mt-0.5 size-5 text-blue-700" />
              <span className="text-sm text-blue-700">
                <span className="block font-semibold">Entity Management</span>
                This entity is actively managed in the Corporate Governance
                system. All compliance deadlines are tracked and monitored
                automatically. Contact the Legal Operations team for
                modifications.
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
            <Button type="button">
              <UserRound className="size-4" />
              Edit Entity
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
