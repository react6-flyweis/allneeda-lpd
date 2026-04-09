import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertTriangle,
  Briefcase,
  Calendar,
  FileText,
  Info,
  Landmark,
  Lock,
  Scale,
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

const caseTypeOptions = [
  "Lawsuit",
  "Arbitration",
  "Regulatory Proceeding",
] as const;

const statusOptions = ["Active", "Settled", "Dismissed", "Judgment"] as const;

const priorityOptions = ["Low", "Medium", "High", "Critical"] as const;

const exposureBandOptions = [
  "Low (Under $100K)",
  "Medium ($100K - $1M)",
  "High (Over $1M)",
] as const;

const litigationCaseSchema = z.object({
  caseName: z.string().min(1, "Case name is required"),
  caseType: z.string().min(1, "Case type is required"),
  caseNumber: z.string().optional(),
  plaintiff: z.string().min(1, "Plaintiff is required"),
  defendant: z.string().min(1, "Defendant is required"),
  jurisdiction: z.string().min(1, "Jurisdiction is required"),
  courtName: z.string().optional(),
  filingDate: z.string().optional(),
  judgeAssigned: z.string().optional(),
  estimatedLiabilityMin: z.string().optional(),
  estimatedLiabilityMax: z.string().optional(),
  legalBudget: z.string().optional(),
  insuranceCoverage: z.string().optional(),
  exposureBand: z.string().min(1, "Exposure band is required"),
  leadAttorney: z.string().optional(),
  coCounsel: z.string().optional(),
  currentStatus: z.string().optional(),
  priorityLevel: z.string().optional(),
  litigationStrategy: z.string().optional(),
  nextHearingDate: z.string().optional(),
  discoveryDeadline: z.string().optional(),
  motionsDeadline: z.string().optional(),
  trialDate: z.string().optional(),
  statuteLimitations: z.string().optional(),
  winProbability: z.string().optional(),
  settlementLikelihood: z.string().optional(),
  caseDescription: z.string().optional(),
  legalTheories: z.string().optional(),
  supportingDocs: z.string().optional(),
});

export type CreateLitigationCaseFormValues = z.infer<
  typeof litigationCaseSchema
>;

interface CreateLitigationCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: CreateLitigationCaseFormValues) => void;
}

export default function CreateLitigationCaseDialog({
  open,
  onOpenChange,
  onSubmit,
}: CreateLitigationCaseDialogProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateLitigationCaseFormValues>({
    resolver: zodResolver(litigationCaseSchema),
    defaultValues: {
      caseName: "",
      caseType: "",
      caseNumber: "",
      plaintiff: "",
      defendant: "",
      jurisdiction: "",
      courtName: "",
      filingDate: "",
      judgeAssigned: "",
      estimatedLiabilityMin: "",
      estimatedLiabilityMax: "",
      legalBudget: "",
      insuranceCoverage: "",
      exposureBand: "",
      leadAttorney: "",
      coCounsel: "",
      currentStatus: "",
      priorityLevel: "",
      litigationStrategy: "",
      nextHearingDate: "",
      discoveryDeadline: "",
      motionsDeadline: "",
      trialDate: "",
      statuteLimitations: "",
      winProbability: "",
      settlementLikelihood: "",
      caseDescription: "",
      legalTheories: "",
      supportingDocs: "",
    },
  });

  function handleDialogOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  function submitForm(values: CreateLitigationCaseFormValues) {
    onSubmit?.(values);
    handleDialogOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <Scale className="size-5 text-slate-700" />
            <DialogTitle>Create New Litigation Case</DialogTitle>
          </div>
          <DialogDescription>
            Register a new lawsuit, arbitration, or regulatory proceeding. All
            fields marked with * are required.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3 px-5 pb-5 pt-3"
          onSubmit={handleSubmit(submitForm)}
        >
          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <FileText className="size-4" />
              Case Identification
            </h3>

            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="caseName">Case Name / Title *</FieldLabel>
              <Input
                id="caseName"
                className="bg-slate-100"
                placeholder="e.g., Smith v. Allneeda Inc."
                {...register("caseName")}
              />
              <FieldError errors={[errors.caseName]} />
            </Field>

            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="caseType">Case Type *</FieldLabel>
                <Controller
                  control={control}
                  name="caseType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select case type" />
                      </SelectTrigger>
                      <SelectContent>
                        {caseTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.caseType]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="caseNumber">Case Number</FieldLabel>
                <Input
                  id="caseNumber"
                  className="bg-slate-100"
                  placeholder="e.g., 23-CV-12345"
                  {...register("caseNumber")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="plaintiff">Plaintiff *</FieldLabel>
                <Input
                  id="plaintiff"
                  className="bg-slate-100"
                  placeholder="Plaintiff name"
                  {...register("plaintiff")}
                />
                <FieldError errors={[errors.plaintiff]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="defendant">Defendant *</FieldLabel>
                <Input
                  id="defendant"
                  className="bg-slate-100"
                  placeholder="Defendant name"
                  {...register("defendant")}
                />
                <FieldError errors={[errors.defendant]} />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <Landmark className="size-4" />
              Legal Venue & Proceedings
            </h3>

            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="jurisdiction">Jurisdiction *</FieldLabel>
                <Input
                  id="jurisdiction"
                  className="bg-slate-100"
                  placeholder="e.g., CA-N.D., US-NY"
                  {...register("jurisdiction")}
                />
                <FieldError errors={[errors.jurisdiction]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="courtName">
                  Court / Tribunal Name
                </FieldLabel>
                <Input
                  id="courtName"
                  className="bg-slate-100"
                  placeholder="e.g., U.S. District Court"
                  {...register("courtName")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="filingDate">Filing Date</FieldLabel>
                <div className="relative">
                  <Input
                    id="filingDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("filingDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="judgeAssigned">
                  Judge / Arbitrator Assigned
                </FieldLabel>
                <Input
                  id="judgeAssigned"
                  className="bg-slate-100"
                  placeholder="Judge name"
                  {...register("judgeAssigned")}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <AlertTriangle className="size-4" />
              Financial Exposure & Budget
            </h3>

            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="estimatedLiabilityMin">
                  Estimated Liability (Min)
                </FieldLabel>
                <Input
                  id="estimatedLiabilityMin"
                  className="bg-slate-100"
                  placeholder="Minimum exposure ($)"
                  {...register("estimatedLiabilityMin")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="estimatedLiabilityMax">
                  Estimated Liability (Max)
                </FieldLabel>
                <Input
                  id="estimatedLiabilityMax"
                  className="bg-slate-100"
                  placeholder="Maximum exposure ($)"
                  {...register("estimatedLiabilityMax")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="legalBudget">
                  Legal Budget Allocated
                </FieldLabel>
                <Input
                  id="legalBudget"
                  className="bg-slate-100"
                  placeholder="Budget ($)"
                  {...register("legalBudget")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="insuranceCoverage">
                  Insurance Coverage Details
                </FieldLabel>
                <Input
                  id="insuranceCoverage"
                  className="bg-slate-100"
                  placeholder="Policy # and coverage"
                  {...register("insuranceCoverage")}
                />
              </Field>

              <Field className="gap-1 sm:col-span-1">
                <FieldLabel htmlFor="exposureBand">Exposure Band *</FieldLabel>
                <Controller
                  control={control}
                  name="exposureBand"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select exposure level" />
                      </SelectTrigger>
                      <SelectContent>
                        {exposureBandOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.exposureBand]} />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <Briefcase className="size-4" />
              Case Management & Strategy
            </h3>

            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="leadAttorney">Lead Attorney</FieldLabel>
                <Input
                  id="leadAttorney"
                  className="bg-slate-100"
                  placeholder="Lead counsel name"
                  {...register("leadAttorney")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="coCounsel">
                  Co-Counsel / Outside Firm
                </FieldLabel>
                <Input
                  id="coCounsel"
                  className="bg-slate-100"
                  placeholder="Co-counsel or firm name"
                  {...register("coCounsel")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="currentStatus">Current Status</FieldLabel>
                <Controller
                  control={control}
                  name="currentStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {statusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="priorityLevel">Priority Level</FieldLabel>
                <Controller
                  control={control}
                  name="priorityLevel"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((option) => (
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

            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="litigationStrategy">
                Litigation Strategy
              </FieldLabel>
              <Textarea
                id="litigationStrategy"
                className="min-h-20 bg-slate-100"
                placeholder="Describe the litigation strategy (e.g., aggressive defense, settlement-focused, motion to dismiss)"
                {...register("litigationStrategy")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <AlertTriangle className="size-4" />
              Timeline & Key Deadlines
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="nextHearingDate">
                  Next Hearing / Conference Date
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="nextHearingDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("nextHearingDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="discoveryDeadline">
                  Discovery Deadline
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="discoveryDeadline"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("discoveryDeadline")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="motionsDeadline">
                  Motions Deadline
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="motionsDeadline"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("motionsDeadline")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="trialDate">
                  Trial / Arbitration Date
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="trialDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("trialDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
              <Field className="gap-1 sm:col-span-1">
                <FieldLabel htmlFor="statuteLimitations">
                  Statute of Limitations
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="statuteLimitations"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("statuteLimitations")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <Info className="size-4" />
              Risk Assessment & Probability
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="winProbability">
                  Win Probability (%)
                </FieldLabel>
                <Input
                  id="winProbability"
                  className="bg-slate-100"
                  placeholder="0-100"
                  {...register("winProbability")}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="settlementLikelihood">
                  Settlement Likelihood (%)
                </FieldLabel>
                <Input
                  id="settlementLikelihood"
                  className="bg-slate-100"
                  placeholder="0-100"
                  {...register("settlementLikelihood")}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="flex items-center gap-2 text-base font-medium text-slate-900">
              <FileText className="size-4" />
              Case Details & Documentation
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="caseDescription">
                Case Description / Summary of Claims
              </FieldLabel>
              <Textarea
                id="caseDescription"
                className="min-h-20 bg-slate-100"
                placeholder="Provide a detailed description of the case, including key allegations, claims, and factual background"
                {...register("caseDescription")}
              />
            </Field>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="legalTheories">
                Legal Theories & Causes of Action
              </FieldLabel>
              <Textarea
                id="legalTheories"
                className="min-h-20 bg-slate-100"
                placeholder="List the legal theories, causes of action, and applicable statutes or regulations"
                {...register("legalTheories")}
              />
            </Field>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="supportingDocs">
                Supporting Documentation References
              </FieldLabel>
              <Input
                id="supportingDocs"
                className="bg-slate-100"
                placeholder="Document IDs, file references, or links to case materials"
                {...register("supportingDocs")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-blue-700">
            <p className="flex items-start gap-2 text-sm">
              <Lock className="mt-0.5 size-4 shrink-0" />
              <span>
                <span className="block font-semibold">
                  Attorney-Client Privilege & Confidentiality
                </span>
                All litigation case information is protected by attorney-client
                privilege. This system maintains strict confidentiality. Do not
                share case details outside authorized legal personnel without
                proper authorization. CEO approval required for external
                disclosure.
              </span>
            </p>
          </section>

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-red-600 hover:bg-red-700">
              <Scale className="size-4" />
              Create Litigation Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
