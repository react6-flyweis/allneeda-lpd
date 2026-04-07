import { useEffect, useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Circle,
  Info,
  Shield,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
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

const checklistItems = [
  "Verify complainant identity and authority",
  "Review evidence quality and authenticity",
  "Assess claim legitimacy and legal basis",
  "Check for repeat infringer status",
  "Verify content matches description",
] as const;

const validationOptions = [
  {
    value: "pass",
    label: "Pass",
    icon: CheckCircle2,
    iconClass: "text-emerald-500",
  },
  { value: "fail", label: "Fail", icon: XCircle, iconClass: "text-rose-500" },
  {
    value: "pending",
    label: "Pending Review",
    icon: AlertTriangle,
    iconClass: "text-amber-500",
  },
] as const;

const decisionOptions = ["Valid Claim", "Invalid Claim", "Needs Escalation"];
const riskLevelOptions = ["Critical", "High", "Medium", "Low"];
const nextActionOptions = [
  "Issue immediate takedown",
  "Request additional evidence",
  "Escalate to legal counsel",
  "Mark for counter-notice review",
  "Continue monitoring",
];

const validateIPCaseSchema = z.object({
  checkIdentity: z.enum(["pass", "fail", "pending"]),
  checkEvidence: z.enum(["pass", "fail", "pending"]),
  checkLegalBasis: z.enum(["pass", "fail", "pending"]),
  checkRepeatInfringer: z.enum(["pass", "fail", "pending"]),
  checkContentMatch: z.enum(["pass", "fail", "pending"]),
  validatorNotes: z
    .string()
    .min(10, "Please provide validator notes and findings."),
  validationDecision: z.string().min(1, "Please select a validation decision."),
  riskLevel: z.string().min(1, "Please select a risk level."),
  recommendedAction: z.string().min(1, "Please select a recommended action."),
});

type ValidateIPCaseFormValues = z.infer<typeof validateIPCaseSchema>;

export type IPCaseValidationContext = {
  id: string;
  type: string;
  contentId: string;
  complainant: string;
  uploaderId: string;
  submitted: string;
};

type ValidateIPCaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  caseContext: IPCaseValidationContext | null;
  onComplete?: (values: ValidateIPCaseFormValues) => void;
};

const requiredFieldLabels: Record<keyof ValidateIPCaseFormValues, string> = {
  checkIdentity: "Checklist: Verify complainant identity and authority",
  checkEvidence: "Checklist: Review evidence quality and authenticity",
  checkLegalBasis: "Checklist: Assess claim legitimacy and legal basis",
  checkRepeatInfringer: "Checklist: Check for repeat infringer status",
  checkContentMatch: "Checklist: Verify content matches description",
  validatorNotes: "Validator notes",
  validationDecision: "Validation decision",
  riskLevel: "Risk level",
  recommendedAction: "Recommended next action",
};

function ChecklistDecisionRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: "pass" | "fail" | "pending" | undefined;
  onChange: (value: "pass" | "fail" | "pending") => void;
}) {
  return (
    <div className="space-y-1.5">
      <p className="text-sm font-medium text-slate-800">{label}</p>
      <RadioGroup
        value={value}
        onValueChange={(nextValue) =>
          onChange(nextValue as "pass" | "fail" | "pending")
        }
        className="flex flex-wrap items-center gap-4"
      >
        {validationOptions.map((option) => {
          const OptionIcon = option.icon;
          return (
            <label
              key={option.value}
              className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700"
            >
              <RadioGroupItem value={option.value} />
              <OptionIcon className={cn("h-4 w-4", option.iconClass)} />
              <span>{option.label}</span>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}

export default function ValidateIPCaseDialog({
  open,
  onOpenChange,
  caseContext,
  onComplete,
}: ValidateIPCaseDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidateIPCaseFormValues>({
    resolver: zodResolver(validateIPCaseSchema),
    defaultValues: {
      checkIdentity: undefined,
      checkEvidence: undefined,
      checkLegalBasis: undefined,
      checkRepeatInfringer: undefined,
      checkContentMatch: undefined,
      validatorNotes: "",
      validationDecision: "",
      riskLevel: "",
      recommendedAction: "",
    },
  });

  const watchedValues = useWatch({ control });

  const missingRequiredFields = useMemo(() => {
    return Object.entries(requiredFieldLabels)
      .filter(([fieldName]) => {
        const rawValue =
          watchedValues[fieldName as keyof ValidateIPCaseFormValues];
        return typeof rawValue !== "string" || rawValue.trim().length === 0;
      })
      .map(([, label]) => label);
  }, [watchedValues]);

  useEffect(() => {
    if (open) {
      reset({
        checkIdentity: undefined,
        checkEvidence: undefined,
        checkLegalBasis: undefined,
        checkRepeatInfringer: undefined,
        checkContentMatch: undefined,
        validatorNotes: "",
        validationDecision: "",
        riskLevel: "",
        recommendedAction: "",
      });
    }
  }, [open, reset]);

  if (!caseContext) {
    return null;
  }

  function onSubmit(values: ValidateIPCaseFormValues) {
    onComplete?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Shield className="h-5 w-5 text-slate-700" />
            Validate IP Case
          </DialogTitle>
          <DialogDescription className="text-sm text-slate-500">
            Review and validate intellectual property infringement claim
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 py-3">
          <section className="rounded-xl border border-slate-200 p-4">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <Circle className="h-4 w-4" />
              Case Context
            </h3>

            <dl className="mt-3 grid gap-x-6 gap-y-3 text-sm md:grid-cols-2">
              <div>
                <dt className="text-slate-400">Case ID:</dt>
                <dd className="text-base font-semibold text-slate-800">
                  {caseContext.id}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Type:</dt>
                <dd className="text-base font-semibold capitalize text-slate-800">
                  {caseContext.type}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Content ID:</dt>
                <dd className="text-base text-slate-700">
                  {caseContext.contentId}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Uploader ID:</dt>
                <dd className="text-base text-slate-700">
                  {caseContext.uploaderId}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Complainant:</dt>
                <dd className="text-base font-semibold text-slate-800">
                  {caseContext.complainant}
                </dd>
              </div>
              <div>
                <dt className="text-slate-400">Submitted:</dt>
                <dd className="text-base text-slate-700">
                  {caseContext.submitted}
                </dd>
              </div>
            </dl>
          </section>

          <section className="rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
            <div className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <Info className="h-5 w-5" />
              Validation Process
            </div>
            <p className="mt-2 text-sm text-blue-600">
              Complete all validation checks to assess the claim&apos;s
              validity. Validate complainant identity, evidence quality, and
              legal basis before recommending action.
            </p>
          </section>

          <section className="rounded-xl border border-slate-200 px-4 py-3">
            <h3 className="flex items-center gap-2 text-base font-semibold text-slate-800">
              <CheckCircle2 className="h-5 w-5" />
              Validation Checklist
            </h3>

            <div className="mt-3 space-y-3">
              <Field className="gap-1">
                <FieldContent>
                  <Controller
                    control={control}
                    name="checkIdentity"
                    render={({ field }) => (
                      <ChecklistDecisionRow
                        label={checklistItems[0]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError errors={[errors.checkIdentity]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldContent>
                  <Controller
                    control={control}
                    name="checkEvidence"
                    render={({ field }) => (
                      <ChecklistDecisionRow
                        label={checklistItems[1]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError errors={[errors.checkEvidence]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldContent>
                  <Controller
                    control={control}
                    name="checkLegalBasis"
                    render={({ field }) => (
                      <ChecklistDecisionRow
                        label={checklistItems[2]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError errors={[errors.checkLegalBasis]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldContent>
                  <Controller
                    control={control}
                    name="checkRepeatInfringer"
                    render={({ field }) => (
                      <ChecklistDecisionRow
                        label={checklistItems[3]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError errors={[errors.checkRepeatInfringer]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldContent>
                  <Controller
                    control={control}
                    name="checkContentMatch"
                    render={({ field }) => (
                      <ChecklistDecisionRow
                        label={checklistItems[4]}
                        value={field.value}
                        onChange={field.onChange}
                      />
                    )}
                  />
                  <FieldError errors={[errors.checkContentMatch]} />
                </FieldContent>
              </Field>
            </div>
          </section>

          <Field className="gap-1">
            <FieldLabel htmlFor="validatorNotes" className="text-sm">
              Validator Notes &amp; Findings *
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="validatorNotes"
                className="min-h-20 bg-slate-50"
                placeholder="Document your validation findings, evidence assessment, identity verification results, and any concerns or observations..."
                {...register("validatorNotes")}
              />
              <FieldDescription>
                Detailed notes will be included in the case record
              </FieldDescription>
              <FieldError errors={[errors.validatorNotes]} />
            </FieldContent>
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="validationDecision" className="text-sm">
                Validation Decision *
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="validationDecision"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="validationDecision"
                        className="w-full bg-slate-50"
                      >
                        <SelectValue placeholder="Select decision" />
                      </SelectTrigger>
                      <SelectContent>
                        {decisionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.validationDecision]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="riskLevel" className="text-sm">
                Risk Level
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="riskLevel"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="riskLevel"
                        className="w-full bg-slate-50"
                      >
                        <SelectValue placeholder="Assess risk" />
                      </SelectTrigger>
                      <SelectContent>
                        {riskLevelOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.riskLevel]} />
              </FieldContent>
            </Field>
          </div>

          <Field className="gap-1">
            <FieldLabel htmlFor="recommendedAction" className="text-sm">
              Recommended Next Action
            </FieldLabel>
            <FieldContent>
              <Controller
                control={control}
                name="recommendedAction"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger
                      id="recommendedAction"
                      className="w-full bg-slate-50"
                    >
                      <SelectValue placeholder="Select recommended action" />
                    </SelectTrigger>
                    <SelectContent>
                      {nextActionOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={[errors.recommendedAction]} />
            </FieldContent>
          </Field>

          {missingRequiredFields.length > 0 ? (
            <section className="rounded-xl border border-amber-400 bg-amber-50 px-4 py-3 text-amber-900">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="h-4 w-4" />
                Validation Incomplete
              </p>
              <p className="mt-1 text-sm">
                Please complete: {missingRequiredFields.join(", ")}
              </p>
            </section>
          ) : null}

          <DialogFooter className="border-t pt-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              <CheckCircle2 className="h-4 w-4" />
              Complete Validation
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
