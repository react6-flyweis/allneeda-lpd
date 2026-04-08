import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
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

const templateCategories = [
  "Offer Letter",
  "Contract Agreement",
  "NDA",
  "Termination Letter",
  "Policy Document",
] as const;

const documentTypes = ["Template", "Letter", "Agreement", "Checklist"] as const;

const jurisdictions = [
  "California",
  "New York",
  "Texas",
  "Florida",
  "Illinois",
  "Federal",
  "Multi-State",
  "International",
] as const;

const employmentTypes = [
  "Full-Time",
  "Part-Time",
  "Contractor",
  "Intern",
  "Executive",
  "Temporary",
] as const;

const clauseOptions = [
  "At-Will Employment Clause",
  "Confidentiality / NDA",
  "IP Assignment Clause",
  "EEO Statement",
  "Arbitration Agreement",
  "Non-Compete Clause",
  "Benefits Disclaimer",
  "ADA Compliance Notice",
] as const;

const reviewFrequencies = [
  "Quarterly",
  "Bi-Annually",
  "Annually",
  "On Legal Change",
] as const;

const hrAccessLevels = [
  "HR Generalist",
  "HR Manager",
  "HR Director",
  "Legal + HR",
] as const;

const employmentTemplateSchema = z.object({
  templateName: z.string().min(1, "Enter template name."),
  templateCategory: z.enum(templateCategories, {
    error: "Select template category.",
  }),
  documentType: z.enum(documentTypes, {
    error: "Select document type.",
  }),
  templateDescription: z.string().min(1, "Enter template description."),
  jurisdictions: z
    .array(z.enum(jurisdictions))
    .min(1, "Select at least one jurisdiction."),
  employmentTypes: z
    .array(z.enum(employmentTypes))
    .min(1, "Select at least one employment type."),
  clauses: z.array(z.enum(clauseOptions)).optional(),
  variableFields: z.string().optional(),
  complianceRequirements: z.string().optional(),
  reviewFrequency: z.enum(reviewFrequencies, {
    error: "Select review frequency.",
  }),
  requiresLegalApproval: z.boolean().optional(),
  requiresHRApproval: z.boolean().optional(),
  hrAccessLevel: z.enum(hrAccessLevels, {
    error: "Select HR access level.",
  }),
  additionalNotes: z.string().optional(),
});

type EmploymentTemplateValues = z.infer<typeof employmentTemplateSchema>;

interface EmploymentTemplateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: EmploymentTemplateValues) => void;
}

export default function EmploymentTemplateDialog({
  open,
  onOpenChange,
  onCreate,
}: EmploymentTemplateDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitted },
  } = useForm<EmploymentTemplateValues>({
    resolver: zodResolver(employmentTemplateSchema),
    defaultValues: {
      templateName: "",
      templateCategory: "Offer Letter",
      documentType: "Template",
      templateDescription: "",
      jurisdictions: [],
      employmentTypes: [],
      clauses: [],
      variableFields: "",
      complianceRequirements: "",
      reviewFrequency: "Annually",
      requiresLegalApproval: false,
      requiresHRApproval: false,
      hrAccessLevel: "HR Generalist",
      additionalNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  const selectedJurisdictions = watch("jurisdictions");
  const selectedEmploymentTypes = watch("employmentTypes");

  const missingFields = [
    ...(errors.templateName ? ["Template Name"] : []),
    ...(errors.templateCategory ? ["Template Category"] : []),
    ...(errors.documentType ? ["Document Type"] : []),
    ...(errors.templateDescription ? ["Template Description"] : []),
    ...(errors.jurisdictions ? ["at least one Jurisdiction"] : []),
    ...(errors.employmentTypes ? ["at least one Employment Type"] : []),
    ...(errors.reviewFrequency ? ["Review Frequency"] : []),
    ...(errors.hrAccessLevel ? ["HR Access Level"] : []),
  ];

  function onSubmit(values: EmploymentTemplateValues) {
    onCreate?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Employment Template</DialogTitle>
          <DialogDescription>
            Create a new legal template for employment and workforce management.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <Card className="rounded-lg border border-sky-100 bg-sky-50">
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="template-name">Template Name *</Label>
                <Input
                  id="template-name"
                  className="bg-white"
                  placeholder="e.g., California At-Will Employment Offer Letter"
                  {...register("templateName")}
                />
                {errors.templateName && (
                  <p className="text-sm text-rose-600">
                    {errors.templateName.message}
                  </p>
                )}
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="template-category">Template Category *</Label>
                  <Controller
                    control={control}
                    name="templateCategory"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="template-category"
                          className="w-full bg-white"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {templateCategories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.templateCategory && (
                    <p className="text-sm text-rose-600">
                      {errors.templateCategory.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="document-type">Document Type *</Label>
                  <Controller
                    control={control}
                    name="documentType"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="document-type"
                          className="w-full bg-white"
                        >
                          <SelectValue placeholder="Select document type" />
                        </SelectTrigger>
                        <SelectContent>
                          {documentTypes.map((type) => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.documentType && (
                    <p className="text-sm text-rose-600">
                      {errors.documentType.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="template-description">
                  Template Description *
                </Label>
                <Textarea
                  id="template-description"
                  className="min-h-[120px] bg-white"
                  placeholder="Describe the purpose and use case for this template..."
                  {...register("templateDescription")}
                />
                {errors.templateDescription && (
                  <p className="text-sm text-rose-600">
                    {errors.templateDescription.message}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-violet-100 bg-violet-50">
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Applicable Jurisdiction(s) *
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Select all that apply
                </p>
              </div>

              <Controller
                control={control}
                name="jurisdictions"
                render={({ field }) => (
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {jurisdictions.map((jurisdiction) => {
                      const checked = field.value.includes(jurisdiction);
                      return (
                        <label
                          key={jurisdiction}
                          className="flex items-center gap-3 rounded-2xl border border-transparent bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300"
                        >
                          <Checkbox
                            checked={checked}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange([...field.value, jurisdiction]);
                              } else {
                                field.onChange(
                                  field.value.filter(
                                    (item) => item !== jurisdiction,
                                  ),
                                );
                              }
                            }}
                          />
                          <span className="capitalize">{jurisdiction}</span>
                        </label>
                      );
                    })}
                  </div>
                )}
              />
              <p className="text-xs text-slate-500">
                Selected: {selectedJurisdictions.length || "None"}
              </p>

              <div>
                <h3 className="text-sm font-semibold text-slate-900">
                  Employment Type Coverage *
                </h3>
                <p className="mt-1 text-sm text-slate-600">
                  Select all that apply
                </p>
              </div>

              <Controller
                control={control}
                name="employmentTypes"
                render={({ field }) => {
                  const value = field.value ?? [];
                  return (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {employmentTypes.map((type) => {
                        const checked = value.includes(type);
                        return (
                          <label
                            key={type}
                            className="flex items-center gap-3 rounded-2xl border border-transparent bg-white px-3 py-2 text-sm text-slate-700 transition hover:border-slate-300"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...value, type]);
                                } else {
                                  field.onChange(
                                    value.filter((item) => item !== type),
                                  );
                                }
                              }}
                            />
                            <span className="capitalize">{type}</span>
                          </label>
                        );
                      })}
                    </div>
                  );
                }}
              />
              <p className="text-xs text-slate-500">
                Selected: {selectedEmploymentTypes.length || "None"}
              </p>
            </CardContent>
          </Card>

          <Card className="rounded-lg border border-emerald-100 bg-emerald-50">
            <CardHeader>
              <CardTitle className="text-sm font-semibold text-slate-900">
                Required Legal Clauses
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-3 ">
              <Controller
                control={control}
                name="clauses"
                render={({ field }) => {
                  const value = field.value ?? [];
                  return (
                    <div className="grid grid-cols-2 gap-3">
                      {clauseOptions.map((clause) => {
                        const checked = value.includes(clause);
                        return (
                          <label
                            key={clause}
                            className="flex cursor-pointer items-center gap-3  text-sm text-slate-700 transition hover:border-slate-300"
                          >
                            <Checkbox
                              checked={checked}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  field.onChange([...value, clause]);
                                } else {
                                  field.onChange(
                                    value.filter((item) => item !== clause),
                                  );
                                }
                              }}
                            />
                            <span>{clause}</span>
                          </label>
                        );
                      })}
                    </div>
                  );
                }}
              />
            </CardContent>
          </Card>

          <div className="grid gap-6">
            <div className="space-y-2">
              <Label htmlFor="variable-fields">
                Variable Fields / Placeholders
              </Label>
              <Textarea
                id="variable-fields"
                className="min-h-[120px] bg-white"
                placeholder="List customizable fields (e.g., [EMPLOYEE_NAME], [START_DATE], [JOB_TITLE], [SALARY], [DEPARTMENT])..."
                {...register("variableFields")}
              />
              <p className="text-xs text-slate-500">
                Define merge fields that will be populated when the template is
                used.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="compliance-requirements">
                Compliance Requirements & Regulatory References
              </Label>
              <Textarea
                id="compliance-requirements"
                className="min-h-[120px] bg-white"
                placeholder="List applicable laws, regulations, and compliance requirements (e.g., FLSA, Title VII, FMLA, state-specific employment laws...)"
                {...register("complianceRequirements")}
              />
              <p className="text-xs text-slate-500">
                Document relevant legal and regulatory compliance requirements.
              </p>
            </div>
          </div>

          <Card className="rounded-lg border border-amber-100 bg-amber-50">
            <CardContent className="space-y-6">
              <div className="grid gap-6">
                <div className="space-y-2">
                  <Label htmlFor="review-frequency">Review Frequency *</Label>
                  <Controller
                    control={control}
                    name="reviewFrequency"
                    render={({ field }) => (
                      <Select
                        onValueChange={field.onChange}
                        value={field.value}
                      >
                        <SelectTrigger
                          id="review-frequency"
                          className="w-full bg-white"
                        >
                          <SelectValue placeholder="Select review schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          {reviewFrequencies.map((frequency) => (
                            <SelectItem key={frequency} value={frequency}>
                              {frequency}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  {errors.reviewFrequency && (
                    <p className="text-sm text-rose-600">
                      {errors.reviewFrequency.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-slate-700 transition hover:border-slate-300">
                  <Controller
                    control={control}
                    name="requiresLegalApproval"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    )}
                  />
                  <span>Requires Legal Counsel Approval</span>
                </label>
                <label className="flex cursor-pointer items-center gap-3  text-sm text-slate-700 transition hover:border-slate-300">
                  <Controller
                    control={control}
                    name="requiresHRApproval"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                      />
                    )}
                  />
                  <span>Requires HR Director Approval</span>
                </label>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-2">
            <Label htmlFor="hr-access-level">HR Access Level *</Label>
            <Controller
              control={control}
              name="hrAccessLevel"
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger
                    id="hr-access-level"
                    className="w-full bg-white"
                  >
                    <SelectValue placeholder="Select HR access level" />
                  </SelectTrigger>
                  <SelectContent>
                    {hrAccessLevels.map((level) => (
                      <SelectItem key={level} value={level}>
                        {level}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.hrAccessLevel && (
              <p className="text-sm text-rose-600">
                {errors.hrAccessLevel.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="additional-notes">
              Additional Notes / Usage Guidelines
            </Label>
            <Textarea
              id="additional-notes"
              className="min-h-[120px] bg-white"
              placeholder="Any additional notes, usage guidelines, or special instructions for this template..."
              {...register("additionalNotes")}
            />
          </div>

          {isSubmitted && missingFields.length > 0 ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-slate-700">
              <div className="font-semibold text-slate-900">
                Required Fields Missing
              </div>
              <p className="mt-2 leading-6">
                Please complete: {missingFields.join(", ")}.
              </p>
            </div>
          ) : null}

          <DialogFooter className="pt-4 border-t border-slate-200 grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Create Template</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
