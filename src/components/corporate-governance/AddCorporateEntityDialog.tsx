import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, BookOpen, CircleDot } from "lucide-react";
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

const entityTypeOptions = [
  "Corporation (C-Corp)",
  "Limited Liability Company (LLC)",
  "Partnership",
  "Subsidiary",
  "Joint Venture",
  "Non-Profit Organization",
] as const;

const entityStatusOptions = [
  "Active",
  "Inactive",
  "Dissolved",
  "Pending Formation",
] as const;

const riskClassificationOptions = [
  "Low Risk",
  "Medium Risk",
  "High Risk",
  "Critical Risk",
] as const;

const ownershipStructureOptions = [
  "Wholly-Owned Subsidiary",
  "Majority-Owned (>50%)",
  "Minority Stake (<50%)",
  "Independent Entity",
] as const;

const addCorporateEntitySchema = z.object({
  legalEntityName: z.string().min(1, "Legal entity name is required"),
  entityType: z.string().min(1, "Entity type is required"),
  jurisdiction: z.string().min(1, "Jurisdiction is required"),
  entityRegistrationNumber: z.string().optional(),
  formationDate: z.string().min(1, "Formation date is required"),
  entityStatus: z.string().min(1, "Entity status is required"),
  primaryBusinessPurpose: z.string().optional(),
  parentEntity: z.string().optional(),
  ownershipStructure: z.string().optional(),
  keyOfficersAndDirectors: z.string().optional(),
  taxIdEin: z.string().optional(),
  stockOwnershipInformation: z.string().optional(),
  registeredAgentName: z.string().min(1, "Registered agent name is required"),
  registeredAgentAddress: z.string().optional(),
  principalOfficeAddress: z.string().optional(),
  annualReportRequirements: z.string().optional(),
  complianceOfficer: z.string().min(1, "Compliance officer is required"),
  riskClassification: z.string().min(1, "Risk classification is required"),
  specialConsiderations: z.string().optional(),
});

export type AddCorporateEntityFormValues = z.infer<
  typeof addCorporateEntitySchema
>;

interface AddCorporateEntityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: AddCorporateEntityFormValues) => void;
}

export default function AddCorporateEntityDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddCorporateEntityDialogProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddCorporateEntityFormValues>({
    resolver: zodResolver(addCorporateEntitySchema),
    defaultValues: {
      legalEntityName: "",
      entityType: "",
      jurisdiction: "",
      entityRegistrationNumber: "",
      formationDate: "",
      entityStatus: "",
      primaryBusinessPurpose: "",
      parentEntity: "",
      ownershipStructure: "",
      keyOfficersAndDirectors: "",
      taxIdEin: "",
      stockOwnershipInformation: "",
      registeredAgentName: "",
      registeredAgentAddress: "",
      principalOfficeAddress: "",
      annualReportRequirements: "",
      complianceOfficer: "",
      riskClassification: "",
      specialConsiderations: "",
    },
  });

  const legalEntityName = useWatch({ control, name: "legalEntityName" }) ?? "";
  const entityType = useWatch({ control, name: "entityType" }) ?? "";
  const jurisdiction = useWatch({ control, name: "jurisdiction" }) ?? "";
  const formationDate = useWatch({ control, name: "formationDate" }) ?? "";
  const entityStatus = useWatch({ control, name: "entityStatus" }) ?? "";
  const registeredAgentName =
    useWatch({ control, name: "registeredAgentName" }) ?? "";
  const complianceOfficer =
    useWatch({ control, name: "complianceOfficer" }) ?? "";
  const riskClassification =
    useWatch({ control, name: "riskClassification" }) ?? "";

  const missingRequiredFields = useMemo(() => {
    const missing: string[] = [];

    if (!legalEntityName.trim()) {
      missing.push("Legal Entity Name");
    }
    if (!entityType) {
      missing.push("Entity Type");
    }
    if (!jurisdiction.trim()) {
      missing.push("Jurisdiction");
    }
    if (!formationDate.trim()) {
      missing.push("Formation Date");
    }
    if (!entityStatus) {
      missing.push("Entity Status");
    }
    if (!registeredAgentName.trim()) {
      missing.push("Registered Agent Name");
    }
    if (!complianceOfficer.trim()) {
      missing.push("Compliance Officer");
    }
    if (!riskClassification) {
      missing.push("Risk Classification");
    }

    return missing;
  }, [
    complianceOfficer,
    entityStatus,
    entityType,
    formationDate,
    jurisdiction,
    legalEntityName,
    registeredAgentName,
    riskClassification,
  ]);

  function handleDialogOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  function onSubmitForm(values: AddCorporateEntityFormValues) {
    onSubmit?.(values);
    handleDialogOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <BookOpen className="size-5 text-slate-700" />
            <DialogTitle>Add New Corporate Entity</DialogTitle>
          </div>
          <DialogDescription>
            Register a new corporate entity, subsidiary, or legal entity in the
            governance system
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3 px-5 pb-5 pt-3"
          onSubmit={handleSubmit(onSubmitForm)}
        >
          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Basic Entity Information
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="legalEntityName">
                  Legal Entity Name *
                </FieldLabel>
                <Input
                  id="legalEntityName"
                  className="bg-slate-100"
                  placeholder="e.g., Allneeda Technologies Inc."
                  {...register("legalEntityName")}
                />
                <FieldError errors={[errors.legalEntityName]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="entityType">Entity Type *</FieldLabel>
                <Controller
                  control={control}
                  name="entityType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select entity type" />
                      </SelectTrigger>
                      <SelectContent>
                        {entityTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.entityType]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="jurisdiction">
                  Jurisdiction / State of Formation *
                </FieldLabel>
                <Input
                  id="jurisdiction"
                  className="bg-slate-100"
                  placeholder="e.g., Delaware, California"
                  {...register("jurisdiction")}
                />
                <FieldError errors={[errors.jurisdiction]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="entityRegistrationNumber">
                  Entity ID / Registration Number
                </FieldLabel>
                <Input
                  id="entityRegistrationNumber"
                  className="bg-slate-100"
                  placeholder="State registration number"
                  {...register("entityRegistrationNumber")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="formationDate">
                  Formation Date *
                </FieldLabel>
                <Input
                  id="formationDate"
                  className="bg-slate-100"
                  placeholder=""
                  {...register("formationDate")}
                />
                <FieldError errors={[errors.formationDate]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="entityStatus">Entity Status *</FieldLabel>
                <Controller
                  control={control}
                  name="entityStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {entityStatusOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.entityStatus]} />
              </Field>
            </FieldGroup>

            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="primaryBusinessPurpose">
                Primary Business Purpose
              </FieldLabel>
              <Textarea
                id="primaryBusinessPurpose"
                className="min-h-20 bg-slate-100"
                placeholder="Describe the primary business activities and purpose of this entity..."
                {...register("primaryBusinessPurpose")}
              />
            </Field>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Ownership & Corporate Structure
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="parentEntity">
                  Parent Entity (if applicable)
                </FieldLabel>
                <Input
                  id="parentEntity"
                  className="bg-slate-100"
                  placeholder="Name of parent company"
                  {...register("parentEntity")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="ownershipStructure">
                  Ownership Structure
                </FieldLabel>
                <Controller
                  control={control}
                  name="ownershipStructure"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select ownership structure" />
                      </SelectTrigger>
                      <SelectContent>
                        {ownershipStructureOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </Field>

              <Field className="gap-1 sm:col-span-2">
                <FieldLabel htmlFor="keyOfficersAndDirectors">
                  Key Officers & Directors
                </FieldLabel>
                <Textarea
                  id="keyOfficersAndDirectors"
                  className="min-h-20 bg-slate-100"
                  placeholder="List key officers, directors, and their titles..."
                  {...register("keyOfficersAndDirectors")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="taxIdEin">Tax ID / EIN</FieldLabel>
                <Input
                  id="taxIdEin"
                  className="bg-slate-100"
                  placeholder="Federal Tax ID / EIN"
                  {...register("taxIdEin")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="stockOwnershipInformation">
                  Stock / Ownership Information
                </FieldLabel>
                <Input
                  id="stockOwnershipInformation"
                  className="bg-slate-100"
                  placeholder="e.g., 1,000,000 shares authorized"
                  {...register("stockOwnershipInformation")}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Registered Agent & Addresses
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="registeredAgentName">
                  Registered Agent Name *
                </FieldLabel>
                <Input
                  id="registeredAgentName"
                  className="bg-slate-100"
                  placeholder="Name of registered agent"
                  {...register("registeredAgentName")}
                />
                <FieldError errors={[errors.registeredAgentName]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="registeredAgentAddress">
                  Registered Agent Address
                </FieldLabel>
                <Input
                  id="registeredAgentAddress"
                  className="bg-slate-100"
                  placeholder="Full registered agent address"
                  {...register("registeredAgentAddress")}
                />
              </Field>

              <Field className="gap-1 sm:col-span-2">
                <FieldLabel htmlFor="principalOfficeAddress">
                  Principal Office Address
                </FieldLabel>
                <Input
                  id="principalOfficeAddress"
                  className="bg-slate-100"
                  placeholder="Main business address"
                  {...register("principalOfficeAddress")}
                />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Compliance & Governance Requirements
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="annualReportRequirements">
                Annual Report & Filing Requirements
              </FieldLabel>
              <Textarea
                id="annualReportRequirements"
                className="min-h-20 bg-slate-100"
                placeholder="Describe annual filing requirements, franchise taxes, and deadlines..."
                {...register("annualReportRequirements")}
              />
            </Field>

            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="complianceOfficer">
                  Compliance Officer Assigned *
                </FieldLabel>
                <Input
                  id="complianceOfficer"
                  className="bg-slate-100"
                  placeholder="Name of assigned compliance officer"
                  {...register("complianceOfficer")}
                />
                <FieldError errors={[errors.complianceOfficer]} />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="riskClassification">
                  Risk Classification *
                </FieldLabel>
                <Controller
                  control={control}
                  name="riskClassification"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger className="w-full bg-slate-100">
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        {riskClassificationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.riskClassification]} />
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Special Notes & Additional Information
            </h3>
            <Field className="mt-3 gap-1">
              <FieldLabel htmlFor="specialConsiderations">
                Special Considerations & Notes
              </FieldLabel>
              <Textarea
                id="specialConsiderations"
                className="min-h-20 bg-slate-100"
                placeholder="Any special legal considerations, restrictions, ongoing matters, or important notes about this entity..."
                {...register("specialConsiderations")}
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
                Please complete all required fields (*):{" "}
                {missingRequiredFields.join(", ")}
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
              <CircleDot className="size-4" />
              Register Entity
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
