import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, Calendar, CheckCircle2, Eye } from "lucide-react";
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

const legalReviewStatusOptions = [
  "Pending Review",
  "Approved - Ready to Send",
  "Needs Revision",
] as const;

const finalApprovalStatusOptions = [
  "Pending Approval",
  "Approved - Ready to Deliver",
  "Rejected - Needs Rework",
] as const;

const deliveryMethodOptions = [
  "Email (Encrypted)",
  "Secure Portal Download",
  "Physical Mail (Certified)",
  "In-Person Pickup",
] as const;

const responseFormatOptions = [
  "PDF Document",
  "CSV / Excel Spreadsheet",
  "JSON (Machine-Readable)",
  "Physical Copy (Mail)",
] as const;

const searchableSystems = [
  "Production Database",
  "Customer Support (Zendesk)",
  "HR System (BambooHR)",
  "Third-Party Vendors",
  "CRM System (Salesforce)",
  "Analytics Platform",
  "Email System (Gmail)",
  "Cloud Storage (AWS S3)",
  "Marketing Automation",
  "Payment Processor (Stripe)",
  "Backup & Archives",
  "Legacy Systems",
] as const;

const qaChecklistOptions = [
  "Data accuracy verified - Information is complete and correct",
  "Completeness verified - All requested data has been collected",
  "Redactions reviewed - Sensitive information properly redacted",
  "Regulatory compliance verified - Meets GDPR/CCPA/applicable law requirements",
  "Third-party personal data removed - Only requester's data included",
] as const;

const processSchema = z.object({
  searchedSystems: z.array(z.string()).optional(),
  dataCollectionSummary: z.string().optional(),
  redactionRequirements: z.string().optional(),
  legalReviewer: z.string().optional(),
  legalReviewStatus: z.string().optional(),
  legalReviewNotes: z.string().optional(),
  preferredResponseFormat: z.string().optional(),
  responsePackageReady: z.boolean().optional(),
  responseLetterDrafted: z.boolean().optional(),
  responseLetterContent: z.string().optional(),
  qaChecklist: z.array(z.string()).optional(),
  finalApprover: z.string().optional(),
  finalApprovalStatus: z.string().optional(),
  deliveryMethod: z.string().optional(),
  trackingNumber: z.string().optional(),
  dateDelivered: z.string().optional(),
  caseClosureNotes: z.string().optional(),
});

type ProcessDSARFormValues = z.infer<typeof processSchema>;

export type DSARProcessItem = {
  id: string;
  type: string;
  requester: string;
  jurisdiction: string;
  verified: boolean;
  deadline: string;
  status: string;
  daysRemaining: string;
};

interface ProcessDSARDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: DSARProcessItem | null;
  onComplete?: (values: ProcessDSARFormValues) => void;
}

export default function ProcessDSARDialog({
  open,
  onOpenChange,
  request,
  onComplete,
}: ProcessDSARDialogProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ProcessDSARFormValues>({
    resolver: zodResolver(processSchema),
    defaultValues: {
      searchedSystems: [],
      dataCollectionSummary: "",
      redactionRequirements: "",
      legalReviewer: "",
      legalReviewStatus: "",
      legalReviewNotes: "",
      preferredResponseFormat: "",
      responsePackageReady: false,
      responseLetterDrafted: false,
      responseLetterContent: "",
      qaChecklist: [],
      finalApprover: "",
      finalApprovalStatus: "",
      deliveryMethod: "",
      trackingNumber: "",
      dateDelivered: "",
      caseClosureNotes: "",
    },
  });

  const searchedSystems = useWatch({ control, name: "searchedSystems" }) ?? [];
  const legalReviewStatus =
    useWatch({ control, name: "legalReviewStatus" }) ?? "";
  const responsePackageReady =
    useWatch({ control, name: "responsePackageReady" }) ?? false;
  const responseLetterDrafted =
    useWatch({ control, name: "responseLetterDrafted" }) ?? false;
  const qaChecklist = useWatch({ control, name: "qaChecklist" }) ?? [];
  const finalApprovalStatus =
    useWatch({ control, name: "finalApprovalStatus" }) ?? "";
  const deliveryMethod = useWatch({ control, name: "deliveryMethod" }) ?? "";

  const processingIncompleteItems = useMemo(() => {
    const missing: string[] = [];

    if (searchedSystems.length === 0) {
      missing.push("At least one system searched");
    }
    if (legalReviewStatus !== "Approved - Ready to Send") {
      missing.push("Legal Review approved");
    }
    if (!responsePackageReady) {
      missing.push("Response Package compiled");
    }
    if (!responseLetterDrafted) {
      missing.push("Response Letter drafted");
    }
    if (qaChecklist.length < qaChecklistOptions.length) {
      missing.push("All QA checks completed");
    }
    if (finalApprovalStatus !== "Approved - Ready to Deliver") {
      missing.push('Final Approval status set to "Approved"');
    }
    if (!deliveryMethod) {
      missing.push("Delivery Method selected");
    }

    return missing;
  }, [
    deliveryMethod,
    finalApprovalStatus,
    legalReviewStatus,
    qaChecklist.length,
    responseLetterDrafted,
    responsePackageReady,
    searchedSystems.length,
  ]);

  function handleDialogOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  function onSubmitForm(values: ProcessDSARFormValues) {
    onComplete?.(values);
    handleDialogOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <Eye className="size-5 text-slate-700" />
            <DialogTitle>Process DSAR: {request?.id ?? "-"}</DialogTitle>
          </div>
          <DialogDescription>
            Complete data collection, legal review, response assembly, and
            delivery workflow
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3 px-5 pb-5 pt-3"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Request Summary
            </h3>
            <div className="mt-3 grid gap-4 text-sm text-slate-800 sm:grid-cols-4">
              <div>
                <p className="text-xs text-slate-500">Request ID</p>
                <p className="font-semibold">{request?.id ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Request Type</p>
                <p>{request?.type ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Requester</p>
                <p>{request?.requester ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Deadline</p>
                <p className="font-semibold text-rose-600">
                  {request?.deadline ?? "-"}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Jurisdiction</p>
                <p>{request?.jurisdiction ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Identity Verified</p>
                <Badge
                  className={cn(
                    "rounded-full",
                    request?.verified
                      ? "bg-slate-900 text-white"
                      : "bg-slate-200 text-slate-700",
                  )}
                >
                  {request?.verified ? "Yes" : "No"}
                </Badge>
              </div>
              <div>
                <p className="text-xs text-slate-500">Current Status</p>
                <p>{request?.status ?? "-"}</p>
              </div>
              <div>
                <p className="text-xs text-slate-500">Days Remaining</p>
                <p className="font-semibold text-orange-600">
                  {request?.daysRemaining ?? "-"}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 1: Data Collection & Retrieval
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Check all systems where personal data has been searched and
              collected
            </p>
            <Controller
              control={control}
              name="searchedSystems"
              render={({ field }) => {
                const selectedValues = field.value ?? [];
                return (
                  <div className="mt-3 grid gap-x-5 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                    {searchableSystems.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={selectedValues.includes(option)}
                          onCheckedChange={(nextChecked) => {
                            if (nextChecked) {
                              field.onChange([...selectedValues, option]);
                            } else {
                              field.onChange(
                                selectedValues.filter(
                                  (value) => value !== option,
                                ),
                              );
                            }
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                );
              }}
            />
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="dataCollectionSummary">
                Data Collection Summary
              </FieldLabel>
              <Textarea
                id="dataCollectionSummary"
                className="min-h-20 bg-slate-100"
                placeholder="Describe what personal data was found and collected from each system..."
                {...register("dataCollectionSummary")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 2: Redaction & Privacy Review
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="redactionRequirements">
                Redaction Requirements & Third-Party Data
              </FieldLabel>
              <Textarea
                id="redactionRequirements"
                className="min-h-20 bg-slate-100"
                placeholder="Document what information must be redacted (third-party personal data, trade secrets, privileged information, etc.)..."
                {...register("redactionRequirements")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 3: Legal Review & Approval
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="legalReviewer">
                  Legal Reviewer / DPO
                </FieldLabel>
                <Input
                  id="legalReviewer"
                  className="bg-slate-100"
                  placeholder="Name of reviewing attorney or DPO"
                  {...register("legalReviewer")}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="legalReviewStatus">
                  Legal Review Status
                </FieldLabel>
                <Controller
                  control={control}
                  name="legalReviewStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select review status" />
                      </SelectTrigger>
                      <SelectContent>
                        {legalReviewStatusOptions.map((option) => (
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
              <FieldLabel htmlFor="legalReviewNotes">
                Legal Review Notes & Exemptions Applied
              </FieldLabel>
              <Textarea
                id="legalReviewNotes"
                className="min-h-20 bg-slate-100"
                placeholder="Legal analysis, exemptions claimed, special considerations..."
                {...register("legalReviewNotes")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-indigo-100 bg-indigo-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 4: Response Package Assembly
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="preferredResponseFormat">
                Preferred Response Format
              </FieldLabel>
              <Controller
                control={control}
                name="preferredResponseFormat"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full bg-slate-100">
                      <SelectValue placeholder="Select response format" />
                    </SelectTrigger>
                    <SelectContent>
                      {responseFormatOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
            </Field>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-800">
              <Controller
                control={control}
                name="responsePackageReady"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span>
                Response package has been compiled and is ready for delivery
              </span>
            </label>
          </section>

          <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 5: Response Letter to Data Subject
            </h3>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-800">
              <Controller
                control={control}
                name="responseLetterDrafted"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span>Response letter has been drafted</span>
            </label>
            <Field className="mt-2 gap-1">
              <FieldLabel htmlFor="responseLetterContent">
                Response Letter Content
              </FieldLabel>
              <Textarea
                id="responseLetterContent"
                className="min-h-24 bg-slate-100"
                placeholder="Draft the response letter to the data subject, explaining what data is being provided, any exemptions applied, and next steps..."
                {...register("responseLetterContent")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 6: Quality Assurance Checklist
            </h3>
            <p className="mt-2 text-xs text-slate-500">
              Complete all QA checks before final approval
            </p>
            <Controller
              control={control}
              name="qaChecklist"
              render={({ field }) => {
                const selectedValues = field.value ?? [];
                return (
                  <div className="mt-3 space-y-2">
                    {qaChecklistOptions.map((option) => (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={selectedValues.includes(option)}
                          onCheckedChange={(nextChecked) => {
                            if (nextChecked) {
                              field.onChange([...selectedValues, option]);
                            } else {
                              field.onChange(
                                selectedValues.filter(
                                  (value) => value !== option,
                                ),
                              );
                            }
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    ))}
                  </div>
                );
              }}
            />
          </section>

          <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 7: Final Approval & Sign-Off
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="finalApprover">
                  Final Approver (DPO / Legal Counsel)
                </FieldLabel>
                <Input
                  id="finalApprover"
                  className="bg-slate-100"
                  placeholder="Name of final approver"
                  {...register("finalApprover")}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="finalApprovalStatus">
                  Final Approval Status
                </FieldLabel>
                <Controller
                  control={control}
                  name="finalApprovalStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select approval status" />
                      </SelectTrigger>
                      <SelectContent>
                        {finalApprovalStatusOptions.map((option) => (
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

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 8: Delivery Method & Tracking
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="deliveryMethod">
                  Delivery Method
                </FieldLabel>
                <Controller
                  control={control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryMethodOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.deliveryMethod]} />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="trackingNumber">
                  Tracking Number / Confirmation
                </FieldLabel>
                <Input
                  id="trackingNumber"
                  className="bg-slate-100"
                  placeholder="Email receipt ID, tracking number, etc."
                  {...register("trackingNumber")}
                />
              </Field>
              <Field className="gap-1 sm:col-span-1">
                <FieldLabel htmlFor="dateDelivered">Date Delivered</FieldLabel>
                <div className="relative">
                  <Input
                    id="dateDelivered"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("dateDelivered")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Phase 9: Case Closure & Documentation
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="caseClosureNotes">
                Case Closure Notes & Archival Information
              </FieldLabel>
              <Textarea
                id="caseClosureNotes"
                className="min-h-20 bg-slate-100"
                placeholder="Final notes, lessons learned, archival location, retention schedule..."
                {...register("caseClosureNotes")}
              />
            </Field>
          </section>

          {processingIncompleteItems.length > 0 ? (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="size-4" />
                Processing Incomplete
              </p>
              <p className="mt-1 text-sm">
                Required to complete: {processingIncompleteItems.join(", ")}
              </p>
            </div>
          ) : null}

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700"
            >
              <CheckCircle2 className="size-4" />
              Complete DSAR & Close Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
