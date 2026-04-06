import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
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
import { Input } from "@/components/ui/input";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AlertTriangle, FileText, Send } from "lucide-react";
import type { RegulatoryCaseRow } from "@/components/RegulatoryCaseDetailsDialog";

const deliveryMethods = [
  "Email (Standard)",
  "Registered Mail",
  "Secure Portal",
] as const;

const responseDraftSchema = z.object({
  draft: z.string().min(1, "Please enter a response draft."),
  deliveryMethod: z.enum(
    ["Email (Standard)", "Registered Mail", "Secure Portal"] as const,
    {
      error: "Please select a delivery method.",
    },
  ),
  targetDate: z.string().min(1, "Please select a target submission date."),
  evidenceReferences: z.string().optional(),
  internalNotes: z.string().optional(),
});

export type ResponseDraftFormValues = z.infer<typeof responseDraftSchema>;

interface RegulatoryResponseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  regulatoryCase: RegulatoryCaseRow | null;
  onSaveDraft?: (values: ResponseDraftFormValues) => void;
  onSubmitReview?: (values: ResponseDraftFormValues) => void;
}

const quickTemplates = [
  "Standard Info Request",
  "Subpoena Response",
  "Notice Acknowledgment",
];

function getDeadlineBadgeClass(deadline: string) {
  const relativeMatch = deadline.match(/^(\d+)d$/);
  if (relativeMatch) {
    const days = Number(relativeMatch[1]);
    if (days <= 5) {
      return "bg-rose-600 text-white";
    }
    if (days <= 14) {
      return "bg-amber-100 text-amber-700";
    }
    return "bg-slate-100 text-slate-900";
  }
  return "bg-rose-600 text-white";
}

export default function RegulatoryResponseDialog({
  open,
  onOpenChange,
  regulatoryCase,
  onSaveDraft,
  onSubmitReview,
}: RegulatoryResponseDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<ResponseDraftFormValues>({
    resolver: zodResolver(responseDraftSchema),
    defaultValues: {
      draft: "",
      deliveryMethod: "Email (Standard)",
      targetDate: "",
      evidenceReferences: "",
      internalNotes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        draft: "",
        deliveryMethod: "Email (Standard)",
        targetDate: "",
        evidenceReferences: "",
        internalNotes: "",
      });
    }
  }, [open, regulatoryCase, reset]);

  if (!regulatoryCase) {
    return null;
  }

  const caseData = regulatoryCase;

  function handleTemplateSelect(template: string) {
    const templateText =
      template === "Subpoena Response"
        ? `Dear ${caseData.regulator},\n\nPlease find our formal response to the subpoena request. We have reviewed the documentation and are preparing the required materials for submission within the designated deadline.\n\nSincerely,\n${caseData.assignedTo}`
        : template === "Notice Acknowledgment"
          ? `Dear ${caseData.regulator},\n\nWe acknowledge receipt of your notice and are currently reviewing the relevant materials. We will follow up promptly with any additional information required.\n\nRegards,\n${caseData.assignedTo}`
          : `Dear ${caseData.regulator},\n\nPlease find attached our formal response to the information request. We are working to ensure all required information is provided in line with the applicable regulatory requirements.\n\nSincerely,\n${caseData.assignedTo}`;

    setValue("draft", templateText, { shouldDirty: true });
  }

  function handleSaveDraft() {
    const values = getValues();
    onSaveDraft?.(values);
    onOpenChange(false);
    reset();
  }

  function onSubmit(values: ResponseDraftFormValues) {
    onSubmitReview?.(values);
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex gap-2">
            <Send className="h-5 w-5" />
            <DialogTitle>Draft Response to Regulatory Request</DialogTitle>
          </div>
          <DialogDescription>
            Prepare formal response for case {regulatoryCase.id}
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <Card className="bg-[#EFF6FF] border border-[#BEDBFF]">
            <CardContent className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText className="h-5 w-5" />

                <div>
                  <p className="text-sm font-semibold text-slate-900">
                    Case Context
                  </p>
                  <p className="text-sm text-slate-500">
                    Details from the selected regulatory request.
                  </p>
                </div>
              </div>

              <div className="">
                <div className="flex gap-5">
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Case ID:
                      </span>
                      <span>{regulatoryCase.id}</span>
                    </div>
                    <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                      <span className="font-semibold text-slate-900">
                        Regulator:
                      </span>
                      <span>{regulatoryCase.regulator}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-slate-500">Type:</span>
                      <Badge variant="outline" className="rounded-lg">
                        {regulatoryCase.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <span className="text-sm text-slate-500">Deadline:</span>
                      <Badge
                        className={`rounded-lg ${getDeadlineBadgeClass(regulatoryCase.deadline)}`}
                      >
                        {regulatoryCase.deadline}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="border-t border-slate-200 pt-4 mt-3">
                  <p className="text-sm text-slate-500">Request</p>
                  <p className="mt-2 text-sm leading-6 text-slate-800">
                    {regulatoryCase.description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="">
            <CardHeader className="">
              <CardTitle className="text-sm font-semibold text-slate-900">
                Quick Templates
              </CardTitle>
            </CardHeader>
            <CardContent className="">
              <div className="flex flex-wrap gap-3">
                {quickTemplates.map((template) => (
                  <Button
                    key={template}
                    variant="outline"
                    size="sm"
                    type="button"
                    className="rounded-full px-4"
                    onClick={() => handleTemplateSelect(template)}
                  >
                    {template}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Field className="gap-1">
            <FieldLabel htmlFor="draft" className="">
              Response Letter Content <span className="">*</span>
            </FieldLabel>
            <FieldDescription className="text-xs">
              Draft your formal response to the regulatory request
            </FieldDescription>

            <FieldContent>
              <Textarea
                id="draft"
                rows={10}
                className="min-h-72 bg-gray-100"
                {...register("draft")}
                placeholder="Enter your formal response here..."
              />
              <FieldError errors={[errors.draft]} />
            </FieldContent>
          </Field>

          <div className="grid gap-4 sm:grid-cols-2">
            <Field className="gap-1">
              <FieldLabel
                htmlFor="delivery-method"
                className="text-sm font-semibold text-slate-900"
              >
                Delivery Method <span className="text-rose-600">*</span>
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-gray-100">
                        <SelectValue placeholder="Select delivery method" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryMethods.map((method) => (
                          <SelectItem key={method} value={method}>
                            {method}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.deliveryMethod]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel
                htmlFor="target-date"
                className="text-sm font-semibold text-slate-900"
              >
                Target Submission Date <span className="text-rose-600">*</span>
              </FieldLabel>

              <FieldContent>
                <Input
                  id="target-date"
                  type="date"
                  className="bg-gray-100"
                  {...register("targetDate")}
                />
                <FieldError errors={[errors.targetDate]} />
              </FieldContent>
            </Field>
          </div>

          <Field className="gap-1">
            <FieldLabel htmlFor="evidence-references">
              Evidence & Document References
            </FieldLabel>
            <FieldDescription className="text-xs">
              List document IDs, filenames, or evidence items being submitted
            </FieldDescription>

            <FieldContent>
              <Textarea
                id="evidence-references"
                rows={4}
                className="bg-gray-100"
                {...register("evidenceReferences")}
                placeholder="e.g., DOC-2024-001, Financial_Records_Q4.pdf, Email_Chain_2024.msg"
              />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel htmlFor="internal-notes">
              Internal Notes (Not Shared)
            </FieldLabel>
            <FieldDescription className="text-xs">
              Private notes for internal legal team review and tracking
            </FieldDescription>

            <FieldContent>
              <Textarea
                id="internal-notes"
                rows={4}
                className="bg-gray-100"
                {...register("internalNotes")}
                placeholder="Internal strategy notes, review comments, risk assessments..."
              />
            </FieldContent>
          </Field>

          <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5 text-sm text-slate-900">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-5 w-5 text-rose-600" />
              <div>
                <p className="font-semibold">Sensitive Case Warning</p>
                <p className="text-slate-600">
                  This is a HIGHLY SENSITIVE case and requires additional
                  controls.
                </p>
              </div>
            </div>
            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <span className="mt-1 text-rose-600">⚠️</span>
                <span>This is a HIGHLY SENSITIVE case</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-slate-700">🔒</span>
                <span>
                  Response requires CEO/CTO/CFO approval before submission
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-1 text-slate-700">📄</span>
                <span>All draft actions are logged and audited</span>
              </li>
            </ul>
          </div>

          <Card className="bg-slate-50 border border-slate-200">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Draft Metadata
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3 text-sm text-slate-700">
              <div className="space-y-1">
                <p className="text-slate-500">Draft By:</p>
                <p className="font-semibold text-slate-900">
                  {caseData.assignedTo}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500">Draft Date:</p>
                <p className="font-semibold text-slate-900">
                  {new Date().toLocaleString("en-US", {
                    month: "numeric",
                    day: "numeric",
                    year: "numeric",
                    hour: "numeric",
                    minute: "2-digit",
                    second: "2-digit",
                  })}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-slate-500">Status Change:</p>
                <p className="font-semibold text-rose-700">
                  Not Started → {caseData.status}
                </p>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="pt-4 border-t grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1fr]">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <div className="grid grid-cols-2 gap-3">
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
              >
                Save Draft
              </Button>
              <Button
                type="submit"
                className="bg-slate-950 text-white hover:bg-slate-900"
              >
                <Send className="h-4 w-4" />
                Submit for Review
              </Button>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
