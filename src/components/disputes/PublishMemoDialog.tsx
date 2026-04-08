import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertTriangle, FileText, Lock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const confidentialityLevels = [
  "Internal",
  "Confidential",
  "Strictly Confidential",
  "Attorney-Client Privileged",
] as const;

const distributionOptions = [
  "Customer Success / Support Team",
  "Executive Leadership (CEO, CFO, General Counsel)",
  "Finance Team (for reserves/accruals)",
  "Compliance & Risk Management",
] as const;

const memoSchema = z.object({
  authorName: z.string().min(1, "Enter author name."),
  memoSubject: z.string().min(1, "Enter memo subject."),
  background: z.string().min(1, "Enter dispute background and context."),
  legalAnalysis: z.string().min(1, "Enter legal analysis and findings."),
  riskAssessment: z.string().min(1, "Enter risk and exposure assessment."),
  resolutionStrategy: z
    .string()
    .min(1, "Enter recommended resolution strategy."),
  actionItems: z.string().optional(),
  confidentialityLevel: z.enum(confidentialityLevels, {
    error: "Select confidentiality level.",
  }),
  distribution: z.array(
    z.enum(distributionOptions, {
      error: "Please select at least one distribution recipient.",
    }),
  ),
  acknowledge: z.literal(true, {
    error: "You must acknowledge attorney-client privileged handling.",
  }),
});

type PublishMemoFormValues = z.infer<typeof memoSchema>;

type DisputeSummary = {
  id: string;
  type: string;
  value: string;
  risk: string;
  status: string;
  caseId: string;
};

interface PublishMemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  dispute: DisputeSummary | null;
  onPublish?: (values: PublishMemoFormValues) => void;
}

const riskBadgeClasses: Record<string, string> = {
  Critical: "bg-red-600 text-white",
  High: "bg-rose-100 text-rose-700",
  Medium: "bg-amber-100 text-amber-700",
  Low: "bg-slate-100 text-slate-900",
};

const statusBadgeClasses: Record<string, string> = {
  "In Review": "bg-slate-950 text-white",
  "Waiting Execution": "bg-slate-100 text-slate-700",
  Open: "bg-emerald-100 text-emerald-700",
  "Waiting Approval": "bg-sky-100 text-sky-700",
};

export default function PublishMemoDialog({
  open,
  onOpenChange,
  dispute,
  onPublish,
}: PublishMemoDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<PublishMemoFormValues>({
    resolver: zodResolver(memoSchema),
    defaultValues: {
      authorName: "",
      memoSubject: "",
      background: "",
      legalAnalysis: "",
      riskAssessment: "",
      resolutionStrategy: "",
      actionItems: "",
      confidentialityLevel: "Internal",
      distribution: [],
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (!dispute) {
    return null;
  }

  const errorFields = [
    { key: "authorName", label: "Author Name" },
    { key: "memoSubject", label: "Memo Subject" },
    { key: "background", label: "Dispute Background & Context" },
    { key: "legalAnalysis", label: "Legal Analysis & Findings" },
    { key: "riskAssessment", label: "Risk & Exposure Assessment" },
    { key: "resolutionStrategy", label: "Recommended Resolution Strategy" },
    { key: "confidentialityLevel", label: "Confidentiality Level" },
    { key: "acknowledge", label: "Attorney-Client Privilege Acknowledgement" },
  ] as const;

  const missingFields = errorFields
    .filter((field) => errors[field.key])
    .map((field) => field.label);

  function onSubmit(values: PublishMemoFormValues) {
    onPublish?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <DialogTitle>Publish Legal Memo</DialogTitle>
          </div>
          <DialogDescription>
            Create and distribute a legal memo regarding this dispute case.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <Card className="rounded-3xl border border-rose-100 bg-rose-50">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-rose-100 text-rose-700">
                  <ShieldAlert className="size-5" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-slate-900">
                    Dispute Case Summary
                  </p>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Dispute ID:
                      </span>
                      <span>{dispute.id}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Type:
                      </span>
                      <span className="capitalize">{dispute.type}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Value:
                      </span>
                      <span>{dispute.value}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Risk Level:
                      </span>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                          riskBadgeClasses[dispute.risk] ??
                            "bg-slate-100 text-slate-900",
                        )}
                      >
                        {dispute.risk}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">
                        Status:
                      </span>
                      <span
                        className={cn(
                          "inline-flex rounded-full px-2 py-1 text-xs font-semibold",
                          statusBadgeClasses[dispute.status] ??
                            "bg-slate-100 text-slate-900",
                        )}
                      >
                        {dispute.status}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 text-sm text-slate-700">
                      <span className="font-semibold text-slate-900">
                        CS Case:
                      </span>
                      <span>{dispute.caseId}</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-3xl border border-amber-200 bg-amber-50">
            <CardContent className="space-y-4 p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-amber-100 p-2 text-amber-700">
                  <Lock className="size-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Attorney-Client Privilege Notice
                  </p>
                  <p className="mt-1 text-sm leading-6 text-slate-700">
                    This legal memo may contain privileged and confidential
                    attorney-client communications. Ensure proper distribution
                    controls and confidentiality markings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="author-name">
                  Memo Author (Legal Counsel) *
                </Label>
                <Input
                  id="author-name"
                  className="bg-gray-50"
                  placeholder="e.g., Michael Chen, Associate General Counsel"
                  {...register("authorName")}
                />
                {errors.authorName && (
                  <p className="text-sm text-rose-600">
                    {errors.authorName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="memo-subject">Memo Subject/Title *</Label>
                <Input
                  id="memo-subject"
                  className="bg-gray-50"
                  placeholder="e.g., Legal Analysis and Recommended Strategy - Dispute Case DSP-001"
                  {...register("memoSubject")}
                />
                {errors.memoSubject && (
                  <p className="text-sm text-rose-600">
                    {errors.memoSubject.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="background">Dispute Background & Context *</Label>
              <Textarea
                id="background"
                className="min-h-[120px] bg-gray-50"
                placeholder="Provide comprehensive background on the dispute, including timeline, parties involved, key events, and current status."
                {...register("background")}
              />
              {errors.background && (
                <p className="text-sm text-rose-600">
                  {errors.background.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="legal-analysis">
                Legal Analysis & Findings *
              </Label>
              <Textarea
                id="legal-analysis"
                className="min-h-[120px] bg-gray-50"
                placeholder="Document legal analysis, applicable law, precedents, contractual obligations, liability assessment, and legal strengths/weaknesses."
                {...register("legalAnalysis")}
              />
              {errors.legalAnalysis && (
                <p className="text-sm text-rose-600">
                  {errors.legalAnalysis.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="risk-assessment">
                Risk & Exposure Assessment *
              </Label>
              <Textarea
                id="risk-assessment"
                className="min-h-[120px] bg-gray-50"
                placeholder="Assess potential financial exposure, reputational risk, regulatory implications, and likelihood of adverse outcomes."
                {...register("riskAssessment")}
              />
              {errors.riskAssessment && (
                <p className="text-sm text-rose-600">
                  {errors.riskAssessment.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="resolution-strategy">
                Recommended Resolution Strategy *
              </Label>
              <Textarea
                id="resolution-strategy"
                className="min-h-[120px] bg-gray-50"
                placeholder="Recommend specific strategy (settlement, litigation, mediation, etc.), settlement ranges, negotiation approach, and rationale."
                {...register("resolutionStrategy")}
              />
              {errors.resolutionStrategy && (
                <p className="text-sm text-rose-600">
                  {errors.resolutionStrategy.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="action-items">Action Items & Next Steps</Label>
              <Textarea
                id="action-items"
                className="min-h-[120px] bg-gray-50"
                placeholder="List specific action items, deadlines, responsible parties, and immediate next steps required."
                {...register("actionItems")}
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="confidentiality-level">
                  Confidentiality Level *
                </Label>
                <Controller
                  control={control}
                  name="confidentialityLevel"
                  render={({ field }) => (
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger
                        id="confidentiality-level"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select confidentiality level" />
                      </SelectTrigger>
                      <SelectContent>
                        {confidentialityLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.confidentialityLevel && (
                  <p className="text-sm text-rose-600">
                    {errors.confidentialityLevel.message}
                  </p>
                )}
              </div>
            </div>

            <Card className="border border-slate-200 bg-white">
              <CardHeader>
                <CardTitle className="text-sm font-semibold text-slate-900">
                  Distribution List
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Controller
                  control={control}
                  name="distribution"
                  render={({ field }) => (
                    <div className="space-y-3">
                      {distributionOptions.map((option) => {
                        const checked = field.value.includes(option);

                        return (
                          <label
                            key={option}
                            className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 transition hover:border-slate-300"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(value) => {
                                if (value) {
                                  field.onChange([...field.value, option]);
                                } else {
                                  field.onChange(
                                    field.value.filter(
                                      (item) => item !== option,
                                    ),
                                  );
                                }
                              }}
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  )}
                />
              </CardContent>
            </Card>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 ">
              <label className="flex cursor-pointer items-start gap-3">
                <Controller
                  control={control}
                  name="acknowledge"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={(value) =>
                        field.onChange(Boolean(value))
                      }
                    />
                  )}
                />
                <div className="space-y-1">
                  <p className="text-sm font-semibold text-blue-800">
                    I acknowledge this memo may contain attorney-client
                    privileged communications and must be handled accordingly *
                  </p>
                </div>
              </label>
              {errors.acknowledge && (
                <p className="mt-2 text-sm text-rose-600">
                  {errors.acknowledge.message}
                </p>
              )}
            </div>

            {isSubmitted && missingFields.length > 0 ? (
              <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
                <div className="flex items-center gap-2 font-semibold text-slate-900">
                  <AlertTriangle className="size-4 text-amber-700" />
                  Required Fields Missing
                </div>
                <p className="mt-2 text-sm leading-6">
                  Please complete: {missingFields.join(", ")}.
                </p>
              </div>
            ) : null}
          </div>

          <DialogFooter className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Publish Memo</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
