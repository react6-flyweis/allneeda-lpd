import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertCircle,
  AlertTriangle,
  Calendar,
  Check,
  CheckCircle2,
  Eye,
  Info,
  XCircle,
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const clauseStatusOptions = [
  "Compliant",
  "Needs update",
  "Not applicable",
] as const;

const approvalOptions = [
  {
    id: "approve-as-is",
    value: "approve-as-is",
    label: "Approve as-is - Template is fully compliant and current",
    icon: CheckCircle2,
  },
  {
    id: "approve-with-minor-updates",
    value: "approve-with-minor-updates",
    label: "Approve with minor updates - Template requires minor revisions",
    icon: Info,
  },
  {
    id: "needs-major-revision",
    value: "needs-major-revision",
    label: "Needs major revision - Template requires significant legal updates",
    icon: AlertTriangle,
  },
  {
    id: "deprecate-template",
    value: "deprecate-template",
    label: "Deprecate template - Template is no longer legally valid",
    icon: XCircle,
  },
] as const;

const approvalIconColorMap: Record<
  (typeof approvalOptions)[number]["value"],
  string
> = {
  "approve-as-is": "text-emerald-500",
  "approve-with-minor-updates": "text-sky-500",
  "needs-major-revision": "text-amber-500",
  "deprecate-template": "text-rose-500",
};

const statusBadgeColorMap: Record<"active" | "needs review", string> = {
  active: "bg-slate-900 text-white",
  "needs review": "bg-rose-100 text-rose-700",
};

const reviewSchema = z.object({
  reviewDate: z.string().min(1, "Review date is required"),
  reviewerName: z.string().min(1, "Reviewer name is required"),
  legalChecklistRecentUpdates: z.boolean(),
  legalChecklistJurisdiction: z.boolean(),
  atWillEmploymentClause: z.string().optional(),
  arbitrationAgreement: z.string().optional(),
  confidentialityClause: z.string().optional(),
  nonCompeteClause: z.string().optional(),
  ipAssignmentClause: z.string().optional(),
  flsaCompliant: z.boolean().optional(),
  titleViiCompliant: z.boolean().optional(),
  adaCompliant: z.boolean().optional(),
  stateSpecificCompliant: z.boolean().optional(),
  requiredUpdates: z.string().optional(),
  variableFieldsReview: z.string().optional(),
  approvalRecommendation: z.enum(
    [
      "approve-as-is",
      "approve-with-minor-updates",
      "needs-major-revision",
      "deprecate-template",
    ],
    { error: "Approval recommendation is required" },
  ),
  legalCounselNotes: z.string().optional(),
  nextReviewDate: z.string().min(1, "Next review date is required"),
});

export type ReviewEmploymentTemplateFormValues = z.infer<typeof reviewSchema>;

export type EmploymentTemplateReviewItem = {
  id: string;
  name: string;
  type: string;
  jurisdiction: string;
  lastReviewed: string;
  status: "active" | "needs review";
};

interface ReviewEmploymentTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  template: EmploymentTemplateReviewItem | null;
  onSubmitReview?: (values: ReviewEmploymentTemplateFormValues) => void;
}

export default function ReviewEmploymentTemplateDialog({
  open,
  onOpenChange,
  template,
  onSubmitReview,
}: ReviewEmploymentTemplateDialogProps) {
  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ReviewEmploymentTemplateFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewDate: "",
      reviewerName: "",
      legalChecklistRecentUpdates: false,
      legalChecklistJurisdiction: false,
      atWillEmploymentClause: "",
      arbitrationAgreement: "",
      confidentialityClause: "",
      nonCompeteClause: "",
      ipAssignmentClause: "",
      flsaCompliant: false,
      titleViiCompliant: false,
      adaCompliant: false,
      stateSpecificCompliant: false,
      requiredUpdates: "",
      variableFieldsReview: "",
      approvalRecommendation: undefined,
      legalCounselNotes: "",
      nextReviewDate: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const reviewDate = useWatch({ control, name: "reviewDate" });
  const reviewerName = useWatch({ control, name: "reviewerName" });
  const legalChecklistRecentUpdates = useWatch({
    control,
    name: "legalChecklistRecentUpdates",
  });
  const legalChecklistJurisdiction = useWatch({
    control,
    name: "legalChecklistJurisdiction",
  });
  const approvalRecommendation = useWatch({
    control,
    name: "approvalRecommendation",
  });
  const nextReviewDate = useWatch({ control, name: "nextReviewDate" });

  const missingRequiredFields = useMemo(() => {
    const missing: string[] = [];

    if (!reviewDate) {
      missing.push("Review Date");
    }

    if (!reviewerName) {
      missing.push("Reviewer Name");
    }

    if (!legalChecklistRecentUpdates || !legalChecklistJurisdiction) {
      missing.push("Legal Compliance Checklist (both items)");
    }

    if (!approvalRecommendation) {
      missing.push("Approval Recommendation");
    }

    if (!nextReviewDate) {
      missing.push("Next Review Date");
    }

    return missing;
  }, [
    approvalRecommendation,
    legalChecklistJurisdiction,
    legalChecklistRecentUpdates,
    nextReviewDate,
    reviewDate,
    reviewerName,
  ]);

  function submitReview(values: ReviewEmploymentTemplateFormValues) {
    if (
      !values.legalChecklistRecentUpdates ||
      !values.legalChecklistJurisdiction
    ) {
      return;
    }

    onSubmitReview?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto sm:max-w-2xl p-0">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <Eye className="h-5 w-5 text-slate-700" />
            <DialogTitle>Review Employment Template</DialogTitle>
          </div>
          <DialogDescription>
            Conduct legal review and compliance assessment for template:{" "}
            {template?.name ?? "-"}
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3 px-5 pb-5"
          onSubmit={handleSubmit(submitReview)}
        >
          <section className="rounded-xl border border-sky-100 bg-slate-100/70 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Template Summary
            </h3>
            <div className="mt-3 grid gap-3 text-sm text-slate-800 sm:grid-cols-2">
              <p>
                <span className="font-semibold">Template ID:</span>{" "}
                {template?.id ?? "-"}
              </p>
              <p>
                <span className="font-semibold">Type:</span>{" "}
                {template?.type ?? "-"}
              </p>
              <p>
                <span className="font-semibold">Jurisdiction:</span>{" "}
                {template?.jurisdiction ?? "-"}
              </p>
              <p>
                <span className="font-semibold">Last Reviewed:</span>{" "}
                {template?.lastReviewed ?? "-"}
              </p>
            </div>
            <div className="mt-3 flex items-center gap-2 text-sm">
              <span className="font-semibold text-slate-800">
                Current Status:
              </span>
              <Badge
                className={cn(
                  "rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
                  template
                    ? statusBadgeColorMap[template.status]
                    : "bg-slate-200 text-slate-700",
                )}
              >
                {template?.status ?? "-"}
              </Badge>
            </div>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Review Metadata
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="space-y-2">
                <FieldLabel htmlFor="review-date">Review Date *</FieldLabel>
                <div className="relative">
                  <Input
                    id="review-date"
                    placeholder="dd / mm / yyyy"
                    className="bg-slate-100 pr-10"
                    {...register("reviewDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
                </div>
                <FieldError errors={[errors.reviewDate]} />
              </Field>

              <Field className="space-y-2">
                <FieldLabel htmlFor="reviewer-name">
                  Reviewer Name (Legal Counsel) *
                </FieldLabel>
                <Input
                  id="reviewer-name"
                  placeholder="Attorney name"
                  className="bg-slate-100"
                  {...register("reviewerName")}
                />
                <FieldError errors={[errors.reviewerName]} />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Legal Compliance Checklist
            </h3>
            <div className="mt-3 space-y-2.5">
              <label className="flex items-center gap-2.5 text-sm text-slate-800">
                <Controller
                  control={control}
                  name="legalChecklistRecentUpdates"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span>
                  ✓ Reviewed recent employment law updates and amendments *
                </span>
              </label>

              <label className="flex items-center gap-2.5 text-sm text-slate-800">
                <Controller
                  control={control}
                  name="legalChecklistJurisdiction"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span>
                  ✓ Verified jurisdictional compliance and regulatory changes *
                </span>
              </label>
            </div>
            <p className="mt-4 text-sm text-emerald-700">
              Both compliance checks must be completed before proceeding
            </p>
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Clause Validity Assessment
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              <Field className="space-y-2">
                <FieldLabel>At-Will Employment Clause</FieldLabel>
                <Controller
                  control={control}
                  name="atWillEmploymentClause"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseStatusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="space-y-2">
                <FieldLabel>Arbitration Agreement</FieldLabel>
                <Controller
                  control={control}
                  name="arbitrationAgreement"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseStatusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="space-y-2">
                <FieldLabel>Confidentiality / NDA Clause</FieldLabel>
                <Controller
                  control={control}
                  name="confidentialityClause"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseStatusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="space-y-2">
                <FieldLabel>Non-Compete Clause</FieldLabel>
                <Controller
                  control={control}
                  name="nonCompeteClause"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseStatusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="space-y-2">
                <FieldLabel>IP Assignment Clause</FieldLabel>
                <Controller
                  control={control}
                  name="ipAssignmentClause"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {clauseStatusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-rose-100 bg-rose-50/60 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Regulatory Compliance Verification
            </h3>
            <div className="mt-3 grid gap-2.5 text-sm text-slate-800 sm:grid-cols-2">
              <label className="flex items-center gap-2.5">
                <Controller
                  control={control}
                  name="flsaCompliant"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span>FLSA Compliant (Fair Labor Standards Act)</span>
              </label>

              <label className="flex items-center gap-2.5">
                <Controller
                  control={control}
                  name="titleViiCompliant"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span>Title VII Compliant (Civil Rights Act)</span>
              </label>

              <label className="flex items-center gap-2.5">
                <Controller
                  control={control}
                  name="adaCompliant"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span>ADA Compliant (Americans with Disabilities Act)</span>
              </label>

              <label className="flex items-center gap-2.5">
                <Controller
                  control={control}
                  name="stateSpecificCompliant"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span>State-Specific Employment Law Compliant</span>
              </label>
            </div>
          </section>

          <Field className="space-y-2">
            <FieldLabel htmlFor="required-updates">
              Required Updates / Modifications Identified
            </FieldLabel>
            <Textarea
              id="required-updates"
              className="min-h-24 bg-slate-100"
              placeholder="Document any required changes, updates, or modifications to the template..."
              {...register("requiredUpdates")}
            />
          </Field>

          <Field className="space-y-2">
            <FieldLabel htmlFor="variable-fields-review">
              Variable Fields Review / Updates
            </FieldLabel>
            <Textarea
              id="variable-fields-review"
              className="min-h-24 bg-slate-100"
              placeholder="Review variable fields and placeholders - note any needed changes..."
              {...register("variableFieldsReview")}
            />
          </Field>

          <section className="rounded-xl border border-sky-100 bg-sky-50/70 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Approval Recommendation *
            </h3>
            <Controller
              control={control}
              name="approvalRecommendation"
              render={({ field }) => (
                <div className="mt-3 space-y-2.5">
                  {approvalOptions.map((option) => {
                    const Icon = option.icon;
                    const selected = field.value === option.value;

                    return (
                      <label
                        key={option.id}
                        className={cn(
                          "flex cursor-pointer items-center gap-2.5 rounded-md border border-transparent px-1 py-1 text-sm text-slate-800 transition",
                          selected && "border-sky-200 bg-white",
                        )}
                      >
                        <Checkbox
                          checked={selected}
                          onCheckedChange={(checked) => {
                            field.onChange(checked ? option.value : "");
                          }}
                        />
                        <Icon
                          className={cn(
                            "h-4 w-4",
                            approvalIconColorMap[option.value],
                          )}
                        />
                        <span>{option.label}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <FieldError
              errors={[errors.approvalRecommendation]}
              className="mt-2"
            />
          </section>

          <Field className="space-y-2">
            <FieldLabel htmlFor="legal-counsel-notes">
              Legal Counsel Review Notes & Comments
            </FieldLabel>
            <Textarea
              id="legal-counsel-notes"
              className="min-h-24 bg-slate-100"
              placeholder="Detailed legal analysis, findings, recommendations, and any additional comments..."
              {...register("legalCounselNotes")}
            />
          </Field>

          <Field className="space-y-2">
            <FieldLabel htmlFor="next-review-date">
              Schedule Next Review Date *
            </FieldLabel>
            <div className="relative">
              <Input
                id="next-review-date"
                className="bg-slate-100 pr-10"
                placeholder="dd / mm / yyyy"
                {...register("nextReviewDate")}
              />
              <Calendar className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
            <p className="text-sm text-slate-500">
              Based on template review frequency and current compliance status
            </p>
            <FieldError errors={[errors.nextReviewDate]} />
          </Field>

          {missingRequiredFields.length > 0 ? (
            <section className="rounded-xl border border-amber-300 bg-amber-50 p-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="mt-0.5 h-4 w-4 text-amber-600" />
                <div>
                  <p className="font-semibold text-amber-700">
                    Required Fields Missing
                  </p>
                  <p className="mt-1 text-sm text-amber-700">
                    Please complete: {missingRequiredFields.join(", ")}
                  </p>
                </div>
              </div>
            </section>
          ) : null}

          <DialogFooter className="border-t pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Check className="mr-2 h-4 w-4" />
              Submit Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
