import { useMemo } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertCircle, Calendar, CircleDot, Plus } from "lucide-react";
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
  FieldContent,
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

const markTypeOptions = [
  "Word Mark (Standard Characters)",
  "Design Mark (Logo/Stylized)",
  "Composite (Word + Design)",
  "Sound Mark",
  "Color Mark",
] as const;

const trademarkStatusOptions = [
  "Pending Application",
  "Registered",
  "In Opposition",
  "Cancelled",
  "Abandoned",
] as const;

const legalStructureOptions = [
  "Corporation",
  "LLC",
  "Partnership",
  "Sole Proprietorship",
  "Trust",
] as const;

const jurisdictionOptions = [
  "United States",
  "European Union",
  "United Kingdom",
  "Canada",
  "Australia",
  "Japan",
  "China",
  "India",
  "Brazil",
  "Mexico",
  "South Korea",
  "Singapore",
] as const;

const niceClassOptions = Array.from(
  { length: 45 },
  (_, index) => `Class ${index + 1}`,
);

const formSchema = z.object({
  markName: z.string().min(1, "Mark name is required"),
  markType: z.string().min(1, "Mark type is required"),
  markDescription: z.string().optional(),
  applicationNumber: z.string().optional(),
  registrationNumber: z.string().optional(),
  filingDate: z.string().optional(),
  registrationDate: z.string().optional(),
  trademarkStatus: z.string().min(1, "Trademark status is required"),
  jurisdictions: z.array(z.string()).min(1, "Select at least one jurisdiction"),
  niceClasses: z.array(z.string()).min(1, "Select at least one Nice class"),
  goodsServicesCovered: z.string().optional(),
  ownerEntityName: z.string().min(1, "Owner entity name is required"),
  legalStructure: z.string().optional(),
  priorityClaimCountry: z.string().optional(),
  priorityClaimDate: z.string().optional(),
  madridProtocol: z.boolean().optional(),
  renewalDueDate: z.string().optional(),
  nextMaintenanceFilingDate: z.string().optional(),
  associatedDomains: z.string().optional(),
  enforcementMonitoring: z.boolean().optional(),
  prosecutionAttorney: z.string().optional(),
  legalCounselNotes: z.string().optional(),
});

export type AddTrademarkRegistrationFormValues = z.infer<typeof formSchema>;

interface AddTrademarkRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: AddTrademarkRegistrationFormValues) => void;
}

export default function AddTrademarkRegistrationDialog({
  open,
  onOpenChange,
  onSubmit,
}: AddTrademarkRegistrationDialogProps) {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<AddTrademarkRegistrationFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      markName: "",
      markType: "",
      markDescription: "",
      applicationNumber: "",
      registrationNumber: "",
      filingDate: "",
      registrationDate: "",
      trademarkStatus: "",
      jurisdictions: [],
      niceClasses: [],
      goodsServicesCovered: "",
      ownerEntityName: "",
      legalStructure: "",
      priorityClaimCountry: "",
      priorityClaimDate: "",
      madridProtocol: false,
      renewalDueDate: "",
      nextMaintenanceFilingDate: "",
      associatedDomains: "",
      enforcementMonitoring: false,
      prosecutionAttorney: "",
      legalCounselNotes: "",
    },
  });

  const markName = useWatch({ control, name: "markName" });
  const markType = useWatch({ control, name: "markType" });
  const trademarkStatus = useWatch({ control, name: "trademarkStatus" });
  const jurisdictions = useWatch({ control, name: "jurisdictions" }) ?? [];
  const niceClasses = useWatch({ control, name: "niceClasses" }) ?? [];
  const ownerEntityName = useWatch({ control, name: "ownerEntityName" });

  const missingRequiredFields = useMemo(() => {
    const missing: string[] = [];

    if (!markName?.trim()) {
      missing.push("Mark Name");
    }

    if (!markType?.trim()) {
      missing.push("Mark Type");
    }

    if (jurisdictions.length === 0) {
      missing.push("at least one Jurisdiction");
    }

    if (niceClasses.length === 0) {
      missing.push("at least one Nice Class");
    }

    if (!ownerEntityName?.trim()) {
      missing.push("Owner Entity");
    }

    if (!trademarkStatus?.trim()) {
      missing.push("Trademark Status");
    }

    return missing;
  }, [
    jurisdictions.length,
    markName,
    markType,
    niceClasses.length,
    ownerEntityName,
    trademarkStatus,
  ]);

  function handleDialogOpenChange(nextOpen: boolean) {
    onOpenChange(nextOpen);
    if (!nextOpen) {
      reset();
    }
  }

  function submit(values: AddTrademarkRegistrationFormValues) {
    onSubmit?.(values);
    handleDialogOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="max-h-[92vh] overflow-y-auto gap-0 p-0 sm:max-w-2xl">
        <DialogHeader className="px-5 pb-0 pt-4">
          <div className="flex items-center gap-2">
            <Plus className="size-4 text-slate-800" />
            <DialogTitle>Add Trademark Registration</DialogTitle>
          </div>
          <DialogDescription>
            Register new trademark, service mark, or brand asset in the Allneeda
            IP portfolio
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-3 px-5 pb-5 pt-3"
          onSubmit={handleSubmit(submit)}
        >
          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Trademark Identification
            </h3>
            <FieldGroup className="mt-3 grid gap-3">
              <Field className="gap-1">
                <FieldLabel htmlFor="markName">
                  Trademark / Mark Name *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="markName"
                    className="bg-slate-100"
                    placeholder="e.g., ALLNEEDA, ALLNEEDA Design"
                    {...register("markName")}
                  />
                  <FieldError errors={[errors.markName]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="markType">Mark Type *</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="markType"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="markType"
                          className="w-full bg-slate-100"
                        >
                          <SelectValue placeholder="Select mark type" />
                        </SelectTrigger>
                        <SelectContent>
                          {markTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.markType]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="markDescription">
                  Mark Description
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="markDescription"
                    className="min-h-20 bg-slate-100"
                    placeholder="Detailed description of the trademark, design elements, colors, etc."
                    {...register("markDescription")}
                  />
                </FieldContent>
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-violet-100 bg-violet-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Registration Details
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="applicationNumber">
                  Application Number
                </FieldLabel>
                <Input
                  id="applicationNumber"
                  className="bg-slate-100"
                  placeholder="e.g., 88/123456"
                  {...register("applicationNumber")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="registrationNumber">
                  Registration Number
                </FieldLabel>
                <Input
                  id="registrationNumber"
                  className="bg-slate-100"
                  placeholder="e.g., 5,123,456"
                  {...register("registrationNumber")}
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
                <FieldLabel htmlFor="registrationDate">
                  Registration Date
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="registrationDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("registrationDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>

              <Field className="gap-1 sm:col-span-2">
                <FieldLabel htmlFor="trademarkStatus">
                  Trademark Status *
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="trademarkStatus"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="trademarkStatus"
                          className="w-full bg-slate-100"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {trademarkStatusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.trademarkStatus]} />
                </FieldContent>
              </Field>
            </FieldGroup>
          </section>

          <section className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Jurisdictional Coverage *
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Select all countries/regions where trademark is filed or
              registered
            </p>
            <Controller
              control={control}
              name="jurisdictions"
              render={({ field }) => (
                <div className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2 lg:grid-cols-3">
                  {jurisdictionOptions.map((option) => {
                    const checked = field.value.includes(option);
                    return (
                      <label
                        key={option}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(nextChecked) => {
                            if (nextChecked) {
                              field.onChange([...field.value, option]);
                              return;
                            }

                            field.onChange(
                              field.value.filter((value) => value !== option),
                            );
                          }}
                        />
                        <span>{option}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <FieldError errors={[errors.jurisdictions]} className="mt-2" />
          </section>

          <section className="rounded-xl border border-amber-100 bg-amber-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Nice Classification - Goods & Services Classes *
            </h3>
            <p className="mt-1 text-xs text-slate-500">
              Select all Nice Classification classes (1-45) that apply
            </p>
            <Controller
              control={control}
              name="niceClasses"
              render={({ field }) => (
                <div className="mt-3 grid gap-x-5 gap-y-1.5 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
                  {niceClassOptions.map((className) => {
                    const checked = field.value.includes(className);
                    return (
                      <label
                        key={className}
                        className="flex items-center gap-2 text-sm text-slate-800"
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={(nextChecked) => {
                            if (nextChecked) {
                              field.onChange([...field.value, className]);
                              return;
                            }

                            field.onChange(
                              field.value.filter(
                                (value) => value !== className,
                              ),
                            );
                          }}
                        />
                        <span>{className}</span>
                      </label>
                    );
                  })}
                </div>
              )}
            />
            <FieldError errors={[errors.niceClasses]} className="mt-2" />
          </section>

          <Field className="gap-1">
            <FieldLabel htmlFor="goodsServicesCovered">
              Goods & Services Covered (ID of Goods/Services)
            </FieldLabel>
            <Textarea
              id="goodsServicesCovered"
              className="min-h-20 bg-slate-100"
              placeholder="Detailed description of goods and services covered by this trademark..."
              {...register("goodsServicesCovered")}
            />
          </Field>

          <section className="rounded-xl border border-sky-100 bg-sky-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Owner Entity & Legal Structure
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="ownerEntityName">
                  Owner Entity Name *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="ownerEntityName"
                    className="bg-slate-100"
                    placeholder="e.g., Allneeda Inc."
                    {...register("ownerEntityName")}
                  />
                  <FieldError errors={[errors.ownerEntityName]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="legalStructure">
                  Legal Structure
                </FieldLabel>
                <Controller
                  control={control}
                  name="legalStructure"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="legalStructure"
                        className="w-full bg-slate-100"
                      >
                        <SelectValue placeholder="Select structure" />
                      </SelectTrigger>
                      <SelectContent>
                        {legalStructureOptions.map((option) => (
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

          <section className="rounded-xl border border-yellow-200 bg-yellow-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Priority Claims & International Filing
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="priorityClaimCountry">
                  Priority Claim Country
                </FieldLabel>
                <Input
                  id="priorityClaimCountry"
                  className="bg-slate-100"
                  placeholder="e.g., United States"
                  {...register("priorityClaimCountry")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="priorityClaimDate">
                  Priority Claim Date
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="priorityClaimDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("priorityClaimDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
            </FieldGroup>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-800">
              <Controller
                control={control}
                name="madridProtocol"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span>
                Madrid Protocol Application (International Registration)
              </span>
            </label>
          </section>

          <section className="rounded-xl border border-rose-100 bg-rose-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Renewal & Maintenance Tracking
            </h3>
            <FieldGroup className="mt-3 grid gap-3 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="renewalDueDate">
                  Renewal Due Date
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="renewalDueDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("renewalDueDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="nextMaintenanceFilingDate">
                  Next Maintenance Filing Date
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="nextMaintenanceFilingDate"
                    className="bg-slate-100 pr-10"
                    placeholder="dd / mm / yyyy"
                    {...register("nextMaintenanceFilingDate")}
                  />
                  <Calendar className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-slate-500" />
                </div>
              </Field>
            </FieldGroup>
          </section>

          <Field className="gap-1">
            <FieldLabel htmlFor="associatedDomains">
              Associated Domain Names & Brand Assets
            </FieldLabel>
            <Textarea
              id="associatedDomains"
              className="min-h-20 bg-slate-100"
              placeholder="List domain names, social media handles, and other brand assets associated with this trademark (comma-separated)"
              {...register("associatedDomains")}
            />
          </Field>

          <section className="rounded-xl border border-cyan-100 bg-cyan-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Enforcement & Monitoring Settings
            </h3>
            <label className="mt-3 flex items-center gap-2 text-sm text-slate-800">
              <Controller
                control={control}
                name="enforcementMonitoring"
                render={({ field }) => (
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                )}
              />
              <span>
                Enable Active Enforcement Monitoring (watch services,
                marketplace monitoring)
              </span>
            </label>
          </section>

          <section className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="text-base font-medium text-slate-800">
              Legal Counsel & Prosecution Attorney
            </h3>
            <FieldGroup className="mt-3 grid gap-3">
              <Field className="gap-1">
                <FieldLabel htmlFor="prosecutionAttorney">
                  Prosecution Attorney / IP Counsel
                </FieldLabel>
                <Input
                  id="prosecutionAttorney"
                  className="bg-slate-100"
                  placeholder="Attorney name and firm handling prosecution"
                  {...register("prosecutionAttorney")}
                />
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="legalCounselNotes">
                  Legal Counsel Notes
                </FieldLabel>
                <Textarea
                  id="legalCounselNotes"
                  className="min-h-20 bg-slate-100"
                  placeholder="Internal notes, strategy considerations, or special instructions..."
                  {...register("legalCounselNotes")}
                />
              </Field>
            </FieldGroup>
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
              <CircleDot className="size-4" />
              Register Trademark
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
