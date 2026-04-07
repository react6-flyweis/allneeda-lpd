import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, FileText, Info, Shield } from "lucide-react";
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
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
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

type CreateIPCaseDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: CreateIPCaseFormValues) => void;
};

const createIPCaseSchema = z.object({
  caseType: z.string().min(1, "Please select a case type"),
  severity: z.string().min(1, "Please select a severity level"),
  contentId: z.string().min(1, "Please enter a content ID"),
  uploaderId: z.string().min(1, "Please enter uploader/infringer ID"),
  complainantName: z.string().min(1, "Please enter complainant full name"),
  complainantEmail: z.string().email("Please enter a valid email address"),
  organization: z.string().optional(),
  infringementDescription: z
    .string()
    .min(1, "Please provide infringement description"),
  evidenceUrls: z.string().optional(),
  platform: z.string().optional(),
  contentVertical: z.string().optional(),
  requestedAction: z.string().optional(),
});

export type CreateIPCaseFormValues = z.infer<typeof createIPCaseSchema>;

const caseTypeOptions = ["Copyright", "Trademark", "Brand Impersonation"];
const severityOptions = ["Critical", "High", "Medium", "Low"];
const verticalOptions = [
  "Marketplace",
  "Social",
  "Creator Economy",
  "Streaming",
  "Gaming",
];
const requestedActionOptions = [
  "Immediate Takedown",
  "Review & Validate",
  "Request Counter Notice",
  "Escalate to Legal",
];

const requiredFieldLabels: Record<string, string> = {
  caseType: "Case Type",
  contentId: "Content ID",
  uploaderId: "Uploader ID",
  complainantName: "Complainant Name",
  complainantEmail: "Email",
  infringementDescription: "Infringement Description",
};

export default function CreateIPCaseDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateIPCaseDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateIPCaseFormValues>({
    resolver: zodResolver(createIPCaseSchema),
    defaultValues: {
      caseType: "",
      severity: "",
      contentId: "",
      uploaderId: "",
      complainantName: "",
      complainantEmail: "",
      organization: "",
      infringementDescription: "",
      evidenceUrls: "",
      platform: "",
      contentVertical: "",
      requestedAction: "",
    },
  });

  const watchedValues = useWatch({ control });

  const missingRequiredFields = useMemo(() => {
    return Object.entries(requiredFieldLabels)
      .filter(([fieldName]) => {
        const rawValue =
          watchedValues[fieldName as keyof CreateIPCaseFormValues];
        return typeof rawValue !== "string" || rawValue.trim().length === 0;
      })
      .map(([, label]) => label);
  }, [watchedValues]);

  function onSubmit(values: CreateIPCaseFormValues) {
    onCreate?.(values);
    onOpenChange(false);
    reset();
  }

  function handleDialogOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto gap-0">
        <DialogHeader className="">
          <div className="flex items-start gap-3">
            <Shield className="size-5 text-slate-700" />

            <DialogTitle>Create IP Case</DialogTitle>
          </div>
          <DialogDescription className="">
            Document intellectual property infringement claims (DMCA, trademark,
            brand impersonation)
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-5 py-5" onSubmit={handleSubmit(onSubmit)}>
          <Card className="border-blue-200 rounded-lg bg-blue-50 gap-3">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="size-6" />
                IP Case Intake
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-blue-700">
                All IP cases begin in "intake" status and require validation
                before takedown actions. High-severity cases automatically
                trigger legal review workflows.
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="caseType">Case Type *</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="caseType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="caseType"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select infringement type" />
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
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="severity">Severity</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="severity"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="severity"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select severity level" />
                      </SelectTrigger>
                      <SelectContent>
                        {severityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.severity]} />
              </FieldContent>
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="contentId">Content ID *</FieldLabel>
              <FieldContent>
                <Input
                  id="contentId"
                  className="bg-gray-50"
                  placeholder="e.g., CONT-12345"
                  {...register("contentId")}
                />
                <FieldDescription>Platform content identifier</FieldDescription>
                <FieldError errors={[errors.contentId]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="uploaderId">
                Uploader/Infringer ID *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="uploaderId"
                  className="bg-gray-50"
                  placeholder="e.g., USER-67890"
                  {...register("uploaderId")}
                />
                <FieldDescription>
                  User account of alleged infringer
                </FieldDescription>
                <FieldError errors={[errors.uploaderId]} />
              </FieldContent>
            </Field>
          </div>

          <Card className="gap-4">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="size-4" />
                Complainant Information
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
              <Field className="gap-1">
                <FieldLabel htmlFor="complainantName">Full Name *</FieldLabel>
                <FieldContent>
                  <Input
                    id="complainantName"
                    className="bg-gray-50"
                    placeholder="John Smith"
                    {...register("complainantName")}
                  />
                  <FieldError errors={[errors.complainantName]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="complainantEmail">
                  Email Address *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="complainantEmail"
                    className="bg-gray-50"
                    placeholder="john.smith@company.com"
                    {...register("complainantEmail")}
                  />
                  <FieldError errors={[errors.complainantEmail]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="organization">
                  Company/Organization
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="organization"
                    className="bg-gray-50"
                    placeholder="Acme Corp"
                    {...register("organization")}
                  />
                </FieldContent>
              </Field>
            </CardContent>
          </Card>

          <Field className="gap-1">
            <FieldLabel htmlFor="infringementDescription">
              Infringement Description *
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="infringementDescription"
                className="bg-gray-50"
                rows={5}
                placeholder="Describe the intellectual property violation, including what is being infringed, how it's being used without permission, and the scope of infringement..."
                {...register("infringementDescription")}
              />
              <FieldDescription>
                Detailed description of the IP violation and claimed rights
              </FieldDescription>
              <FieldError errors={[errors.infringementDescription]} />
            </FieldContent>
          </Field>

          <div className="grid gap-4 md:grid-cols-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="evidenceUrls">Evidence URLs</FieldLabel>
              <FieldContent>
                <Input
                  id="evidenceUrls"
                  className="bg-gray-50"
                  placeholder="https://example.com/proof.jpg"
                  {...register("evidenceUrls")}
                />
                <FieldDescription>
                  Link to screenshots, documents, or proof
                </FieldDescription>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="platform">Platform/Marketplace</FieldLabel>
              <FieldContent>
                <Input
                  id="platform"
                  className="bg-gray-50"
                  placeholder="e.g., Main App, Seller Portal"
                  {...register("platform")}
                />
              </FieldContent>
            </Field>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Field className="gap-1">
              <FieldLabel htmlFor="contentVertical">
                Content Vertical
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="contentVertical"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="contentVertical"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select vertical" />
                      </SelectTrigger>
                      <SelectContent>
                        {verticalOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="requestedAction">
                Requested Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="requestedAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="requestedAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {requestedActionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>
          </div>

          {missingRequiredFields.length > 0 ? (
            <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-amber-900">
              <p className="flex items-center gap-2 text-sm font-semibold">
                <AlertCircle className="size-4" />
                Required Fields Missing
              </p>
              <p className="mt-1 text-sm">
                Please complete: {missingRequiredFields.join(", ")}
              </p>
            </div>
          ) : null}

          <DialogFooter className="border-t pt-5">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500">
              <Shield className="size-4" />
              Create IP Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
