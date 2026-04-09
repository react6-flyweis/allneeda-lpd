import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, FileText, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const requestTypeOptions = [
  {
    value: "access",
    label: "Right to Access (Data Copy)",
    description: "Requester wants copy of their personal data",
  },
  {
    value: "portability",
    label: "Right to Data Portability",
    description: "Transfer data to another controller",
  },
  {
    value: "restriction",
    label: "Right to Restriction of Processing",
    description: "Limit how data is processed",
  },
  {
    value: "automated",
    label: "Automated Decision-Making Rights",
    description: "Challenge automated decisions",
  },
  {
    value: "erasure",
    label: "Right to Erasure (Deletion)",
    description: "Delete all personal data from systems",
  },
  {
    value: "rectification",
    label: "Right to Rectification",
    description: "Correct inaccurate personal data",
  },
  {
    value: "object",
    label: "Right to Object",
    description: "Object to specific data processing",
  },
  {
    value: "do_not_sell",
    label: "Do Not Sell My Data (CCPA)",
    description: "Opt-out of data sale",
  },
] as const;

const relationshipOptions = [
  "Customer / Client",
  "Current Employee",
  "Vendor / Supplier Contact",
  "Job Applicant / Former Employee",
  "Website Visitor / Newsletter Subscriber",
  "Other (Third Party, Legal Guardian, etc.)",
] as const;

const dataCategoryOptions = [
  "Personal Identifiers (Name, Email, Phone)",
  "Payment Data",
  "Cookies & Tracking Data",
  "Employment Records",
  "Account Information",
  "Location Data",
  "User-Generated Content",
  "Marketing Preferences",
  "Transaction History",
  "Device & Browser Data",
  "Communication Records",
  "All Personal Data",
] as const;

const regulatoryBasisOptions = [
  "GDPR (EU)",
  "UK GDPR",
  "POPIA (South Africa)",
  "CCPA (California)",
  "PIPEDA (Canada)",
  "PDPA (Singapore)",
  "CPRA (California)",
  "LGPD (Brazil)",
  "Other",
] as const;

const verificationMethodOptions = [
  "Email Verification (Token/Link)",
  "Phone / SMS Verification",
  "Government-Issued ID",
  "Account Login Credentials",
  "Sworn Statement / Notarized Declaration",
] as const;

const deadlineOptions = [
  "30 Days (GDPR Standard)",
  "45 Days (CCPA/CPRA)",
  "90 Days (Extended Deadline)",
  "Custom Deadline",
] as const;

const responseFormatOptions = [
  "PDF Document",
  "CSV / Excel Spreadsheet",
  "JSON (Machine-Readable)",
  "Physical Copy (Mail)",
] as const;

const complexityOptions = [
  "Low - Straightforward single request",
  "Medium - Multiple data sources or request types",
  "High - Complex exemptions or third-party data involved",
  "Critical - Legal risks, litigation potential, or high-profile requester",
] as const;

const exemptionOptions = [
  "Legal Privilege / Attorney Work Product",
  "Third-Party Personal Data (Cannot Disclose)",
  "National Security / Public Safety",
  "Trade Secrets / Confidential Business Information",
  "Ongoing Investigation / Law Enforcement",
  "Manifestly Unfounded or Excessive Request",
] as const;

const dataSourceOptions = [
  "Production Database",
  "Customer Support System",
  "HR Systems",
  "Third-Party Vendors",
  "CRM System",
  "Analytics Platform",
  "Email System",
  "Cloud Storage",
  "Marketing Automation",
  "Payment Processor",
  "Backup & Archives",
  "Legacy Systems",
] as const;

const dsarSchema = z.object({
  requesterName: z.string().min(1, "Requester name is required"),
  emailAddress: z.string().email("Enter a valid email address"),
  phoneNumber: z.string().optional(),
  requesterCountry: z.string().optional(),
  dataSubjectId: z.string().optional(),
  requestTypes: z.array(z.string()).min(1, "Select at least one request type"),
  relationship: z.string().min(1, "Select relationship to organization"),
  scopeDescription: z.string().optional(),
  dataCategories: z.array(z.string()).optional(),
  regulatoryBasis: z
    .array(z.string())
    .min(1, "Select at least one regulatory basis"),
  verificationMethod: z.string().min(1, "Verification method is required"),
  identityVerified: z.boolean().optional(),
  complianceDeadline: z.string().min(1, "Compliance deadline is required"),
  responseFormat: z.string().optional(),
  dataSources: z.array(z.string()).optional(),
  complexityRating: z.string().optional(),
  exemptions: z.array(z.string()).optional(),
  responseCoordinator: z.string().min(1, "Response coordinator is required"),
  urgentRequest: z.boolean().optional(),
  specialHandlingNotes: z.string().optional(),
});

type DSARFormValues = z.infer<typeof dsarSchema>;

interface OpenDSARDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: DSARFormValues) => void;
}

export default function OpenDSARDialog({
  open,
  onOpenChange,
  onSubmit,
}: OpenDSARDialogProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<DSARFormValues>({
    resolver: zodResolver(dsarSchema),
    defaultValues: {
      requesterName: "",
      emailAddress: "",
      phoneNumber: "",
      requesterCountry: "",
      dataSubjectId: "",
      requestTypes: [],
      relationship: "",
      scopeDescription: "",
      dataCategories: [],
      regulatoryBasis: [],
      verificationMethod: "",
      identityVerified: false,
      complianceDeadline: "",
      responseFormat: "",
      dataSources: [],
      complexityRating: "",
      exemptions: [],
      responseCoordinator: "",
      urgentRequest: false,
      specialHandlingNotes: "",
    },
  });

  const requesterName = useWatch({ control, name: "requesterName" }) ?? "";
  const emailAddress = useWatch({ control, name: "emailAddress" }) ?? "";
  const requestTypes = useWatch({ control, name: "requestTypes" }) ?? [];
  const regulatoryBasis = useWatch({ control, name: "regulatoryBasis" }) ?? [];
  const responseCoordinator =
    useWatch({ control, name: "responseCoordinator" }) ?? "";
  const relationship = useWatch({ control, name: "relationship" }) ?? "";
  const verificationMethod =
    useWatch({ control, name: "verificationMethod" }) ?? "";
  const complianceDeadline =
    useWatch({ control, name: "complianceDeadline" }) ?? "";

  const missingRequiredFields = useMemo(() => {
    const missing: string[] = [];

    if (!requesterName?.trim()) {
      missing.push("Requester Name");
    }
    if (!emailAddress?.trim()) {
      missing.push("Email");
    }
    if (requestTypes.length === 0) {
      missing.push("at least one Request Type");
    }
    if (!relationship) {
      missing.push("Data Subject Relationship");
    }
    if (regulatoryBasis.length === 0) {
      missing.push("at least one Jurisdictional Basis");
    }
    if (!verificationMethod) {
      missing.push("Verification Method");
    }
    if (!complianceDeadline) {
      missing.push("Regulatory Deadline");
    }
    if (!responseCoordinator?.trim()) {
      missing.push("Response Coordinator");
    }

    return missing;
  }, [
    complianceDeadline,
    relationship,
    regulatoryBasis.length,
    requestTypes.length,
    responseCoordinator,
    verificationMethod,
    requesterName,
    emailAddress,
  ]);

  function handleDialogOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  function onSubmitForm(values: DSARFormValues) {
    onSubmit?.(values);
    handleDialogOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="size-5 text-slate-700" />
            <DialogTitle>Open Data Subject Access Request (DSAR)</DialogTitle>
          </div>
          <DialogDescription>
            Process GDPR, CCPA, or other privacy regulation requests - Access,
            Deletion, Portability, Rectification
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3 px-5 pb-5 pt-3"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Requester Identification & Contact
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-3">
              <Field className="gap-1">
                <FieldLabel htmlFor="requesterName">
                  Requester Full Name *
                </FieldLabel>
                <Input
                  id="requesterName"
                  className="bg-slate-100"
                  placeholder="John Doe"
                  {...register("requesterName")}
                />
                <FieldError errors={[errors.requesterName]} />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="emailAddress">Email Address *</FieldLabel>
                <Input
                  id="emailAddress"
                  className="bg-slate-100"
                  placeholder="requester@example.com"
                  {...register("emailAddress")}
                />
                <FieldError errors={[errors.emailAddress]} />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="phoneNumber">Phone Number</FieldLabel>
                <Input
                  id="phoneNumber"
                  className="bg-slate-100"
                  placeholder="+1 (555) 123-4567"
                  {...register("phoneNumber")}
                />
              </Field>
            </FieldGroup>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="requesterCountry">
                  Requester Country/Region
                </FieldLabel>
                <Input
                  id="requesterCountry"
                  className="bg-slate-100"
                  placeholder="e.g., United States, Germany, United Kingdom"
                  {...register("requesterCountry")}
                />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="dataSubjectId">
                  Data Subject ID / Account Number
                </FieldLabel>
                <Input
                  id="dataSubjectId"
                  className="bg-slate-100"
                  placeholder="Customer ID, User ID, etc."
                  {...register("dataSubjectId")}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Request Type(s) *
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Select all applicable request types (multiple selections allowed)
            </p>
            <Controller
              control={control}
              name="requestTypes"
              render={({ field }) => (
                <div className="mt-3 grid gap-3 sm:grid-cols-2">
                  {requestTypeOptions.map((option) => {
                    const checked = field.value.includes(option.value);
                    return (
                      <label
                        key={option.value}
                        className="rounded-xl border border-slate-200 bg-white px-3 py-3 text-sm text-slate-900"
                      >
                        <div className="flex items-start gap-3">
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(nextChecked) => {
                              if (nextChecked) {
                                field.onChange([...field.value, option.value]);
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (value) => value !== option.value,
                                  ),
                                );
                              }
                            }}
                          />
                          <div>
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-slate-500">
                              {option.description}
                            </div>
                          </div>
                        </div>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <FieldError errors={[errors.requestTypes]} className="mt-2" />
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Data Subject Relationship to Organization *
            </h3>
            <Controller
              control={control}
              name="relationship"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-slate-100">
                    <SelectValue placeholder="Select relationship" />
                  </SelectTrigger>
                  <SelectContent>
                    {relationshipOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.relationship]} className="mt-2" />
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Scope of Request & Data Categories
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="scopeDescription">
                Scope Description
              </FieldLabel>
              <Textarea
                id="scopeDescription"
                className="min-h-20 bg-slate-100"
                placeholder="Describe the scope and specifics of the request..."
                {...register("scopeDescription")}
              />
            </Field>
            <p className="mt-3 text-xs text-slate-500">
              Data Categories Requested (Select all that apply)
            </p>
            <Controller
              control={control}
              name="dataCategories"
              render={({ field }) => (
                <div className="mt-3 grid gap-x-5 gap-y-1.5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {dataCategoryOptions.map((option) => {
                    const selectedValues = field.value ?? [];
                    const checked = selectedValues.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={checked}
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
                    );
                  })}
                </div>
              )}
            />
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Jurisdictional / Regulatory Basis *
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Which privacy regulation(s) apply to this request?
            </p>
            <Controller
              control={control}
              name="regulatoryBasis"
              render={({ field }) => (
                <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {regulatoryBasisOptions.map((option) => {
                    const selectedValues = field.value ?? [];
                    const checked = selectedValues.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={checked}
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
                    );
                  })}
                </div>
              )}
            />
            <FieldError errors={[errors.regulatoryBasis]} className="mt-2" />
          </section>

          <section className="rounded-xl border border-yellow-100 bg-yellow-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Identity Verification *
            </h3>
            <Controller
              control={control}
              name="verificationMethod"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full bg-slate-100">
                    <SelectValue placeholder="Select verification method" />
                  </SelectTrigger>
                  <SelectContent>
                    {verificationMethodOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            <FieldError errors={[errors.verificationMethod]} className="mt-2" />
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-800">
              <Controller
                control={control}
                name="identityVerified"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span>
                Identity has been verified (check only after verification is
                complete)
              </span>
            </label>
          </section>

          <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Regulatory Deadline & Response Timeline *
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="complianceDeadline">
                  Compliance Deadline *
                </FieldLabel>
                <Controller
                  control={control}
                  name="complianceDeadline"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select deadline" />
                      </SelectTrigger>
                      <SelectContent>
                        {deadlineOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.complianceDeadline]} />
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="responseFormat">
                  Preferred Response Format
                </FieldLabel>
                <Controller
                  control={control}
                  name="responseFormat"
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
                <FieldError errors={[errors.responseFormat]} />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Data Sources & Systems to Search
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Select all systems and databases where personal data may be stored
            </p>
            <Controller
              control={control}
              name="dataSources"
              render={({ field }) => (
                <div className="mt-3 grid gap-x-5 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
                  {dataSourceOptions.map((option) => {
                    const selectedValues = field.value ?? [];
                    const checked = selectedValues.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={checked}
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
                    );
                  })}
                </div>
              )}
            />
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Legal Complexity Assessment
            </h3>
            <FieldGroup className="mt-3 gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="complexityRating">
                  Complexity Rating
                </FieldLabel>
                <Controller
                  control={control}
                  name="complexityRating"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select complexity" />
                      </SelectTrigger>
                      <SelectContent>
                        {complexityOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>
              <div className="space-y-2">
                <FieldLabel>Potential Exemptions or Limitations</FieldLabel>
                <Controller
                  control={control}
                  name="exemptions"
                  render={({ field }) => (
                    <div className="grid gap-2 sm:grid-cols-2">
                      {exemptionOptions.map((option) => {
                        const selectedValues = field.value ?? [];
                        const checked = selectedValues.includes(option);
                        return (
                          <label
                            key={option}
                            className="flex items-center gap-2 text-sm text-slate-800"
                          >
                            <Checkbox
                              checked={checked}
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
                        );
                      })}
                    </div>
                  )}
                />
              </div>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Assignment & Priority
            </h3>
            <FieldGroup className="mt-3 gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="responseCoordinator">
                  Response Coordinator / DPO *
                </FieldLabel>
                <Input
                  id="responseCoordinator"
                  className="bg-slate-100"
                  placeholder="Name of Data Protection Officer or responsible person"
                  {...register("responseCoordinator")}
                />
                <FieldError errors={[errors.responseCoordinator]} />
              </Field>
              <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-3">
                <Controller
                  control={control}
                  name="urgentRequest"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <span className="text-sm text-slate-800">
                  Flag as Priority / Urgent Request
                </span>
              </div>
            </FieldGroup>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="specialHandlingNotes">
                Special Handling Notes / Internal Comments
              </FieldLabel>
              <Textarea
                id="specialHandlingNotes"
                className="min-h-20 bg-slate-100"
                placeholder="Internal notes, legal strategy, sensitive considerations..."
                {...register("specialHandlingNotes")}
              />
            </Field>
          </section>

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

          <DialogFooter className="border-t pt-4">
            <Button
              variant="outline"
              type="button"
              onClick={() => handleDialogOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <FileText className="size-4" />
              Open DSAR Case
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
