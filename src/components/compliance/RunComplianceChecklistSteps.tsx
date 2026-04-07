import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormHandleSubmit,
  type UseFormRegister,
} from "react-hook-form";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { DialogClose, DialogFooter } from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  Calendar,
  CheckCircle2,
  CircleCheck,
  CircleX,
  Info,
  MinusCircle,
  ShieldCheck,
} from "lucide-react";

type ChecklistFormValues = {
  checklistName: string;
  executionDate: string;
  checklistTemplate: string;
  productVertical: string;
  assignedAuditor: string;
  auditScopeDescription: string;
};

export const checklistTemplates = [
  "Food Safety Compliance (10 items)",
  "Provider Onboarding Compliance (10 items)",
  "Generic Compliance Audit (5 items)",
] as const;

export const productVerticals = [
  "Food & Beverage",
  "Retail & Shopping",
  "Home Services",
  "Healthcare",
  "Beauty & Wellness",
] as const;

export const auditors = [
  "Sarah Chen (Compliance Manager)",
  "Michael Torres (Legal Ops)",
  "Jessica Park (QA Lead)",
  "David Kumar (Risk Analyst)",
] as const;

export const auditTemplateCodeMap: Record<
  (typeof checklistTemplates)[number],
  string
> = {
  "Food Safety Compliance (10 items)": "TPL-FOOD-001",
  "Provider Onboarding Compliance (10 items)": "TPL-PRV-001",
  "Generic Compliance Audit (5 items)": "TPL-GEN-001",
};

const severityColorMap: Record<string, string> = {
  Critical: "bg-rose-600 text-white",
  High: "bg-orange-500 text-white",
  Medium: "bg-amber-500 text-white",
  Low: "bg-blue-500 text-white",
};

const stepItems = [
  { label: "Setup" },
  { label: "Execute" },
  { label: "Review" },
];

export type AssessmentResult = "pass" | "fail" | "na";

export interface AuditItem {
  id: string;
  itemNo: string;
  section: string;
  title: string;
  severity: "Critical" | "High" | "Medium" | "Low";
}

export type ProgressStats = {
  total: number;
  passed: number;
  failed: number;
  na: number;
  completed: number;
  score: number;
};

function formatReviewDate(dateValue: string) {
  if (!dateValue) {
    return "";
  }

  const date = new Date(dateValue);
  if (Number.isNaN(date.getTime())) {
    return dateValue;
  }

  return date.toLocaleDateString("en-US");
}

function getStepStatus(currentStep: number, stepIndex: number) {
  const stepNumber = stepIndex + 1;

  if (stepNumber < currentStep) {
    return "complete";
  }

  if (stepNumber === currentStep) {
    return "active";
  }

  return "pending";
}

export function Stepper({ currentStep }: { currentStep: number }) {
  return (
    <div className="border-b py-4">
      <div className="mx-auto flex max-w-xl items-center justify-between gap-2">
        {stepItems.map((item, index) => {
          const status = getStepStatus(currentStep, index);

          return (
            <div key={item.label} className="flex flex-1 items-center gap-2">
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    "inline-flex h-8 w-8 items-center justify-center rounded-full border text-sm font-semibold",
                    status === "active" && "border-blue-600 text-blue-600",
                    status === "complete" &&
                      "border-emerald-500 text-emerald-600",
                    status === "pending" && "border-slate-200 text-slate-400",
                  )}
                >
                  {index + 1}
                </span>
                <span
                  className={cn(
                    "text-sm font-medium",
                    status === "active" && "text-blue-600",
                    status === "complete" && "text-emerald-600",
                    status === "pending" && "text-slate-400",
                  )}
                >
                  {item.label}
                </span>
              </div>
              {index < stepItems.length - 1 && (
                <div className="h-px flex-1 bg-slate-300" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ChecklistSetupStep({
  control,
  errors,
  register,
  handleSubmit,
  onCancel,
  onNext,
}: {
  control: Control<ChecklistFormValues>;
  errors: FieldErrors<ChecklistFormValues>;
  register: UseFormRegister<ChecklistFormValues>;
  handleSubmit: UseFormHandleSubmit<ChecklistFormValues>;
  onCancel: () => void;
  onNext: () => void;
}) {
  return (
    <>
      <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5 text-sm text-blue-700">
        <div className="flex items-center gap-2 text-slate-900">
          <Info className="h-4 w-4" />
          <p className="font-medium">Checklist Configuration</p>
        </div>
        <p className="mt-2 leading-6">
          Configure the compliance audit parameters. Select a template to load
          pre-defined checklist items.
        </p>
      </div>

      <form className="space-y-6 pt-1" onSubmit={handleSubmit(onNext)}>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field>
            <FieldLabel>Checklist Name *</FieldLabel>
            <FieldContent>
              <Input
                placeholder="e.g., Q1 2026 Food Safety Audit"
                {...register("checklistName")}
              />
              <FieldError errors={[errors.checklistName]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Execution Date *</FieldLabel>
            <FieldContent>
              <div className="relative">
                <Input
                  type="date"
                  placeholder="dd / mm / yyyy"
                  className="pr-10"
                  {...register("executionDate")}
                />
                <Calendar className="pointer-events-none absolute right-3 top-2.5 h-4 w-4 text-slate-500" />
              </div>
              <FieldError errors={[errors.executionDate]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Checklist Template *</FieldLabel>
            <FieldContent>
              <Controller
                name="checklistTemplate"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger size="sm">
                      <SelectValue placeholder="Select a compliance template" />
                    </SelectTrigger>
                    <SelectContent>
                      {checklistTemplates.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.checklistTemplate]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Product Vertical *</FieldLabel>
            <FieldContent>
              <Controller
                name="productVertical"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger size="sm">
                      <SelectValue placeholder="Select vertical" />
                    </SelectTrigger>
                    <SelectContent>
                      {productVerticals.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.productVertical]} />
            </FieldContent>
          </Field>
        </div>

        <div className="grid gap-4">
          <Field>
            <FieldLabel>Assigned Auditor *</FieldLabel>
            <FieldContent>
              <Controller
                name="assignedAuditor"
                control={control}
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger size="sm">
                      <SelectValue placeholder="Select auditor" />
                    </SelectTrigger>
                    <SelectContent>
                      {auditors.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.assignedAuditor]} />
            </FieldContent>
          </Field>

          <Field>
            <FieldLabel>Audit Scope Description</FieldLabel>
            <FieldContent>
              <Textarea
                className="min-h-30"
                placeholder="Describe the scope of this audit (providers, regions, time period, etc.)"
                {...register("auditScopeDescription")}
              />
              <FieldError errors={[errors.auditScopeDescription]} />
            </FieldContent>
          </Field>
        </div>

        <DialogFooter className="border-t pt-4">
          <DialogClose asChild>
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </DialogClose>
          <Button type="submit">Begin Audit →</Button>
        </DialogFooter>
      </form>
    </>
  );
}

function ProgressSummary({ progressStats }: { progressStats: ProgressStats }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <p className="text-sm font-semibold text-slate-800">Progress</p>
      <div className="mt-4 grid gap-4 text-center sm:grid-cols-4">
        <div>
          <p className="text-4xl font-bold text-blue-600">
            {progressStats.completed}/{progressStats.total}
          </p>
          <p className="text-sm text-slate-500">Completed</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-emerald-600">
            {progressStats.passed}
          </p>
          <p className="text-sm text-slate-500">Passed</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-rose-600">
            {progressStats.failed}
          </p>
          <p className="text-sm text-slate-500">Failed</p>
        </div>
        <div>
          <p className="text-4xl font-bold text-slate-600">
            {progressStats.na}
          </p>
          <p className="text-sm text-slate-500">N/A</p>
        </div>
      </div>
    </div>
  );
}

function AuditItemCard({
  item,
  value,
  onChange,
}: {
  item: AuditItem;
  value?: AssessmentResult;
  onChange: (itemId: string, value: AssessmentResult) => void;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap items-center gap-2">
        <p className="text-base font-medium text-slate-800">{item.title}</p>
        <Badge
          className={cn(
            "rounded-full px-2.5 py-0.5 text-xs",
            severityColorMap[item.severity],
          )}
        >
          {item.severity}
        </Badge>
      </div>

      <p className="mt-1 text-xs font-semibold tracking-wide text-slate-400">
        {item.itemNo}
      </p>

      <div className="mt-3">
        <p className="text-sm font-medium text-slate-700">
          Assessment Result *
        </p>
        <RadioGroup
          value={value}
          onValueChange={(value) =>
            onChange(item.id, value as AssessmentResult)
          }
          className="mt-2 flex flex-wrap gap-5"
        >
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <RadioGroupItem value="pass" />
            <CircleCheck className="h-4 w-4 text-emerald-500" />
            Pass
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <RadioGroupItem value="fail" />
            <CircleX className="h-4 w-4 text-rose-500" />
            Fail
          </label>
          <label className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-slate-700">
            <RadioGroupItem value="na" />
            <MinusCircle className="h-4 w-4 text-slate-500" />
            N/A
          </label>
        </RadioGroup>
      </div>
    </div>
  );
}

function AuditSection({
  section,
  items,
  assessments,
  onAssessmentChange,
}: {
  section: string;
  items: AuditItem[];
  assessments: Record<string, AssessmentResult>;
  onAssessmentChange: (itemId: string, value: AssessmentResult) => void;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 p-5">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-semibold text-slate-800">{section}</h3>
        <Badge variant="outline" className="rounded-full px-2.5 py-1 text-xs">
          {items.filter((item) => assessments[item.id]).length}/{items.length}
        </Badge>
      </div>
      <div className="space-y-3">
        {items.map((item) => (
          <AuditItemCard
            key={item.id}
            item={item}
            value={assessments[item.id]}
            onChange={onAssessmentChange}
          />
        ))}
      </div>
    </div>
  );
}

export function AuditExecutionStep({
  groupedAuditItems,
  assessments,
  progressStats,
  onBack,
  onReview,
  onCancel,
  onAssessmentChange,
}: {
  groupedAuditItems: Record<string, AuditItem[]>;
  assessments: Record<string, AssessmentResult>;
  progressStats: ProgressStats;
  onBack: () => void;
  onReview: () => void;
  onCancel: () => void;
  onAssessmentChange: (itemId: string, value: AssessmentResult) => void;
}) {
  return (
    <>
      <div className="rounded-2xl border border-violet-200 bg-violet-50 p-5 text-sm text-violet-700">
        <div className="flex items-center gap-2 text-slate-900">
          <Info className="h-4 w-4" />
          <p className="font-medium">Audit Execution</p>
        </div>
        <p className="mt-2 leading-6">
          Review each requirement and mark as Pass, Fail, or N/A. Failed items
          will automatically generate compliance findings.
        </p>
      </div>

      <ProgressSummary progressStats={progressStats} />

      <div className="space-y-4">
        {Object.entries(groupedAuditItems).map(([section, items]) => (
          <AuditSection
            key={section}
            section={section}
            items={items}
            assessments={assessments}
            onAssessmentChange={onAssessmentChange}
          />
        ))}
      </div>

      <DialogFooter className="border-t pt-4">
        <DialogClose asChild>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button variant="outline" type="button" onClick={onBack}>
          ← Back to Setup
        </Button>
        <Button type="button" onClick={onReview}>
          Review Results →
        </Button>
      </DialogFooter>
    </>
  );
}

function ReviewDetails({
  reviewValues,
  progressStats,
}: {
  reviewValues: ChecklistFormValues;
  progressStats: ProgressStats;
}) {
  return (
    <div className="rounded-2xl border border-blue-200 bg-blue-50 p-5">
      <div className="flex items-center gap-2 text-slate-900">
        <Info className="h-4 w-4" />
        <p className="font-medium">Audit Record Details</p>
      </div>

      <dl className="mt-4 grid grid-cols-[140px_1fr] gap-y-1 text-sm sm:grid-cols-[180px_1fr]">
        <dt className="text-slate-600">Checklist ID:</dt>
        <dd className="text-right font-mono font-semibold text-slate-700">
          CC-003
        </dd>

        <dt className="text-slate-600">Name:</dt>
        <dd className="text-right text-slate-700">
          {reviewValues.checklistName || "-"}
        </dd>

        <dt className="text-slate-600">Template:</dt>
        <dd className="text-right text-slate-700">
          {reviewValues.checklistTemplate
            ? auditTemplateCodeMap[
                reviewValues.checklistTemplate as (typeof checklistTemplates)[number]
              ]
            : "-"}
        </dd>

        <dt className="text-slate-600">Vertical:</dt>
        <dd className="text-right text-slate-700">
          {reviewValues.productVertical || "-"}
        </dd>

        <dt className="text-slate-600">Auditor:</dt>
        <dd className="text-right text-slate-700">
          {reviewValues.assignedAuditor || "-"}
        </dd>

        <dt className="text-slate-600">Execution Date:</dt>
        <dd className="text-right text-slate-700">
          {formatReviewDate(reviewValues.executionDate)}
        </dd>

        <dt className="text-slate-600">Findings Generated:</dt>
        <dd className="text-right font-semibold text-rose-600">
          {progressStats.failed}
        </dd>
      </dl>
    </div>
  );
}

export function AuditReviewStep({
  reviewValues,
  progressStats,
  onBack,
  onCancel,
  onComplete,
}: {
  reviewValues: ChecklistFormValues;
  progressStats: ProgressStats;
  onBack: () => void;
  onCancel: () => void;
  onComplete: () => void;
}) {
  return (
    <>
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm text-emerald-700">
        <div className="flex items-center gap-2 text-slate-900">
          <CheckCircle2 className="h-4 w-4" />
          <p className="font-medium">Audit Complete - Review Results</p>
        </div>
        <p className="mt-2 leading-6">
          Review the audit results below. Clicking "Complete Audit" will create
          compliance findings for all failed items.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-5">
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Compliance Score</p>
          <p className="mt-5 text-4xl font-semibold text-rose-600">
            {progressStats.score}%
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Total Items</p>
          <p className="mt-5 text-4xl font-semibold text-blue-600">
            {progressStats.total}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Passed</p>
          <p className="mt-5 text-4xl font-semibold text-emerald-600">
            {progressStats.passed}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">Failed</p>
          <p className="mt-5 text-4xl font-semibold text-rose-600">
            {progressStats.failed}
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">N/A</p>
          <p className="mt-5 text-4xl font-semibold text-slate-600">
            {progressStats.na}
          </p>
        </div>
      </div>

      <ReviewDetails
        reviewValues={reviewValues}
        progressStats={progressStats}
      />

      <DialogFooter className="border-t pt-4">
        <DialogClose asChild>
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
        </DialogClose>
        <Button variant="outline" type="button" onClick={onBack}>
          ← Back to Audit
        </Button>
        <Button
          type="button"
          className="bg-emerald-600 text-white hover:bg-emerald-700"
          onClick={onComplete}
        >
          <ShieldCheck className="h-4 w-4" />
          Complete Audit & Generate Findings
        </Button>
      </DialogFooter>
    </>
  );
}
