import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertCircleIcon,
  CalendarDays,
  FileText,
  Mail,
  Send,
} from "lucide-react";

const informationTypes = [
  "Update Certificate of Insurance",
  "Coverage Details/Clarification",
  "Additional Insured Endorsement",
  "Complete Policy Documents",
  "Claims History Report",
  "Proof of Premium Payment",
  "Policy Renewal Information",
  "Insurer Contact Information",
  "Other (specify in description)",
] as const;

const urgencyLevels = [
  "Low - Standard Request",
  "Medium - Standard Request",
  "High - Expedited",
  "Critical - Immediate",
] as const;

const deliveryMethods = [
  "Email (Fastest)",
  "Insurance Portal (Secure)",
  "Phone Follow-up",
  "Physical Mail (Certified)",
] as const;

const quickTemplates = [
  {
    label: "Updated COI",
    message:
      "Please provide an updated Certificate of Insurance that reflects the current coverage limits and additional insured endorsements.",
  },
  {
    label: "Coverage Details",
    message:
      "We need clarification on the policy coverage limits and the scope of insured operations for the current certificate.",
  },
  {
    label: "Add'l Insured",
    message:
      "Please confirm whether our organization is listed as an additional insured and provide the corresponding endorsement document.",
  },
  {
    label: "Full Policy Docs",
    message:
      "Please share the complete policy documents, including endorsements and declarations page, for our review.",
  },
];

const requestInfoSchema = z.object({
  informationType: z.enum(informationTypes, {
    error: "Please select an information type.",
  }),
  requestDetails: z
    .string()
    .min(20, "Please describe the information needed in more detail."),
  urgencyLevel: z.enum(urgencyLevels, {
    error: "Please select an urgency level.",
  }),
  responseDeadline: z.string().min(1, "Please select a response deadline."),
  deliveryMethod: z.enum(deliveryMethods).optional(),
  internalNotes: z.string().optional(),
});

export type RequestAdditionalInfoFormValues = z.infer<typeof requestInfoSchema>;

type InsuranceReviewRow = {
  id: string;
  provider: string;
  policyNumber: string;
  insurer: string;
  coverageAmount: string;
  expires: string;
  assignedTo: string;
};

interface RequestAdditionalInfoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewRow: InsuranceReviewRow | null;
  onSubmit?: (values: RequestAdditionalInfoFormValues) => void;
}

export default function RequestAdditionalInfoDialog({
  open,
  onOpenChange,
  reviewRow,
  onSubmit,
}: RequestAdditionalInfoDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<RequestAdditionalInfoFormValues>({
    resolver: zodResolver(requestInfoSchema),
    defaultValues: {
      informationType: "Update Certificate of Insurance",
      requestDetails: "",
      urgencyLevel: "Medium - Standard Request",
      responseDeadline: "",
      deliveryMethod: "Email (Fastest)",
      internalNotes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        informationType: "Update Certificate of Insurance",
        requestDetails: "",
        urgencyLevel: "Medium - Standard Request",
        responseDeadline: "",
        deliveryMethod: "Email (Fastest)",
        internalNotes: "",
      });
    }
  }, [open, reset]);

  if (!reviewRow) {
    return null;
  }

  const requestId = `REQ-INFO-${reviewRow.id.replace(/[^0-9]/g, "") || reviewRow.id}`;
  const requestDate = new Date().toLocaleDateString("en-US");

  function handleTemplateSelect(message: string) {
    setValue("requestDetails", message, { shouldDirty: true });
  }

  function handleFormSubmit(values: RequestAdditionalInfoFormValues) {
    onSubmit?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5" />
            <DialogTitle>Request Additional Information</DialogTitle>
          </div>
          <DialogDescription>
            Request missing or updated insurance information from{" "}
            {reviewRow.provider}.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-6 pt-4"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Card className="bg-slate-50 border-slate-200">
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-slate-900">
                <FileText className="h-5 w-5 text-slate-700" />
                <div>
                  <p className="text-sm font-semibold">Current COI Details</p>
                  <p className="text-sm text-slate-500">
                    Verify the current certificate details before requesting
                    additional information.
                  </p>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="grid gap-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      COI ID:
                    </span>
                    <span>{reviewRow.id}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Policy #:
                    </span>
                    <span>{reviewRow.policyNumber}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Coverage:
                    </span>
                    <span>{reviewRow.coverageAmount}</span>
                  </div>
                </div>

                <div className="grid gap-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Provider:
                    </span>
                    <span>{reviewRow.provider}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Insurer:
                    </span>
                    <span>{reviewRow.insurer}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900">
                      Expires:
                    </span>
                    <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800">
                      <CalendarDays className="h-4 w-4" />
                      {reviewRow.expires}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Quick Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {quickTemplates.map((template) => (
                  <Button
                    key={template.label}
                    variant="outline"
                    size="sm"
                    type="button"
                    className="rounded-full px-4"
                    onClick={() => handleTemplateSelect(template.message)}
                  >
                    {template.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Field className="gap-1">
              <FieldLabel htmlFor="informationType">
                Information Type *
              </FieldLabel>
              <FieldDescription className="text-xs">
                Select type of information needed.
              </FieldDescription>
              <FieldContent>
                <Controller
                  control={control}
                  name="informationType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-gray-50">
                        <SelectValue placeholder="Select type of information needed" />
                      </SelectTrigger>
                      <SelectContent>
                        {informationTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
              <FieldError errors={[errors.informationType]} />
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="requestDetails">
                Detailed Request *
              </FieldLabel>
              <FieldDescription className="text-xs">
                Clearly describe what information is needed and why.
              </FieldDescription>
              <FieldContent>
                <Textarea
                  id="requestDetails"
                  rows={7}
                  className="bg-gray-50"
                  placeholder="Provide a detailed description of the information being requested..."
                  {...register("requestDetails")}
                />
              </FieldContent>
              <FieldError errors={[errors.requestDetails]} />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="urgencyLevel">Urgency Level *</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="urgencyLevel"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger className="w-full bg-gray-50">
                          <SelectValue placeholder="Select urgency level" />
                        </SelectTrigger>
                        <SelectContent>
                          {urgencyLevels.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                </FieldContent>
                <FieldError errors={[errors.urgencyLevel]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="responseDeadline">
                  Response Needed By *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="responseDeadline"
                    type="date"
                    className="w-full bg-gray-50"
                    {...register("responseDeadline")}
                  />
                </FieldContent>
                <FieldError errors={[errors.responseDeadline]} />
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="deliveryMethod">
                Preferred Delivery Method
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-gray-50">
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
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="internalNotes">
                Internal Notes (Not Shared)
              </FieldLabel>
              <FieldDescription className="text-xs">
                Private notes for internal insurance or compliance team
                tracking.
              </FieldDescription>
              <FieldContent>
                <Textarea
                  id="internalNotes"
                  rows={5}
                  className="bg-gray-50"
                  placeholder="Internal tracking notes, previous communication history, special considerations..."
                  {...register("internalNotes")}
                />
              </FieldContent>
            </Field>
          </div>

          <Card className="border border-slate-200 bg-[#FAF5FF]">
            <CardHeader>
              <div className="flex items-center gap-2 text-slate-900">
                <AlertCircleIcon className="h-4 w-4" />
                <CardTitle>Request Tracking</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-slate-600">
              <div className="grid gap-2">
                <div className="flex justify-between gap-4 text-slate-900">
                  <span>Request ID:</span>
                  <span>{requestId}</span>
                </div>
                <div className="flex justify-between gap-4 text-slate-900">
                  <span>Requested By:</span>
                  <span>{reviewRow.assignedTo}</span>
                </div>
                <div className="flex justify-between gap-4 text-slate-900">
                  <span>Request Date:</span>
                  <span>{requestDate}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Status Change:</span>
                  <span className="font-medium text-amber-700">
                    pending → needs-info
                  </span>
                </div>
                <div className="flex justify-between gap-4">
                  <span>Communication:</span>
                  <span className="font-medium text-emerald-700">
                    Auto-email to provider
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="pt-4 border-t border-slate-200 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_auto]">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Send className="mr-2 h-4 w-4" />
              Send Information Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
