import { useMemo } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, FileText } from "lucide-react";

const permitFormSchema = z.object({
  providerName: z.string().min(1, "Please enter a provider name"),
  permitType: z.string().min(1, "Please select a permit/license type"),
  jurisdiction: z.string().min(1, "Please enter a jurisdiction"),
  requirementDescription: z.string().min(1, "Please describe the requirement"),
  renewalFrequency: z.string().min(1, "Please select renewal frequency"),
  initialExpiryMonths: z.number().min(1, "Please enter expiry months"),
  priorityLevel: z.string().min(1, "Please select a priority level"),
  assignedOfficer: z
    .string()
    .min(1, "Please enter an assigned compliance officer"),
});

export type PermitFormValues = z.infer<typeof permitFormSchema>;

const permitTypeOptions = [
  "Business License",
  "Professional License",
  "Operating Permit",
  "Health Permit",
  "Safety Certificate",
  "Insurance Certificate",
  "Tax Registration",
  "Environmental Permit",
  "Zoning Permit",
  "Building Permit",
];
const renewalFrequencyOptions = [
  "Annual",
  "Biennial (Every 2 years)",
  "Triennial (Every 3 years)",
  "Quarterly",
  "Monthly",
  "One-time (No renewal)",
];
const priorityOptions = [
  "Critical - Blocks Operations",
  "High - Required Soon",
  "Medium - Standard Timeline",
  "Low - Nice to Have",
];

interface CreatePermitRequirementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: PermitFormValues) => void;
}

export default function CreatePermitRequirementDialog({
  open,
  onOpenChange,
  onCreate,
}: CreatePermitRequirementDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PermitFormValues>({
    resolver: zodResolver(permitFormSchema),
    defaultValues: {
      providerName: "",
      permitType: "",
      jurisdiction: "",
      requirementDescription: "",
      renewalFrequency: "",
      initialExpiryMonths: 12,
      priorityLevel: "",
      assignedOfficer: "",
    },
  });

  const watchValues = watch();

  const calculatedExpiry = useMemo(() => {
    const months = Number(watchValues.initialExpiryMonths) || 0;
    const date = new Date();
    date.setMonth(date.getMonth() + months);
    return new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }).format(date);
  }, [watchValues.initialExpiryMonths]);

  const createdDate = useMemo(() => {
    return new Intl.DateTimeFormat("en-US", {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    }).format(new Date());
  }, []);

  const onSubmit = (values: PermitFormValues) => {
    onCreate?.(values);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Permit Requirement</DialogTitle>
          <DialogDescription>
            Create a new licensing or permit requirement for a provider
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-6 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <Card className="bg-[#EFF6FF] border gap-4 border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <FileText className="size-5" />
                <CardTitle>Provider & Permit Details</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="">
              <div className="space-y-5">
                <Field className="gap-1">
                  <FieldLabel htmlFor="providerName">
                    Provider Name *
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="providerName"
                      className="bg-white"
                      placeholder="e.g., ABC Insurance Co., XYZ Logistics Inc."
                      {...register("providerName")}
                    />
                    <FieldError errors={[errors.providerName]} />
                  </FieldContent>
                </Field>

                <div className="grid gap-4 md:grid-cols-2">
                  <Field className="gap-1">
                    <FieldLabel htmlFor="permitType">
                      Permit/License Type *
                    </FieldLabel>
                    <FieldContent>
                      <Controller
                        control={control}
                        name="permitType"
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger
                              id="permitType"
                              className="w-full bg-white"
                            >
                              <SelectValue placeholder="Select permit type" />
                            </SelectTrigger>
                            <SelectContent>
                              {permitTypeOptions.map((option) => (
                                <SelectItem key={option} value={option}>
                                  {option}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                      />
                      <FieldError errors={[errors.permitType]} />
                    </FieldContent>
                  </Field>

                  <Field className="gap-1">
                    <FieldLabel htmlFor="jurisdiction">
                      Jurisdiction *
                    </FieldLabel>
                    <FieldContent>
                      <Input
                        id="jurisdiction"
                        className="bg-white"
                        placeholder="e.g., CA, NY, Federal"
                        {...register("jurisdiction")}
                      />
                      <FieldError errors={[errors.jurisdiction]} />
                    </FieldContent>
                  </Field>
                </div>
              </div>
            </CardContent>
          </Card>

          <Field className="gap-1">
            <FieldLabel htmlFor="requirementDescription">
              Requirement Description *
            </FieldLabel>
            <FieldDescription className="text-sm text-slate-500">
              Describe the specific permit or license requirement
            </FieldDescription>
            <FieldContent>
              <Textarea
                id="requirementDescription"
                placeholder="e.g., State business operating license required for all commercial activities within California jurisdiction..."
                rows={5}
                {...register("requirementDescription")}
              />
              <FieldError errors={[errors.requirementDescription]} />
            </FieldContent>
          </Field>

          <Card className="border border-slate-200 bg-[#EFF6FF]">
            <CardHeader>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <Calendar className="size-5" />
                <CardTitle>Compliance Timeline & Priority</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="grid gap-4 md:grid-cols-2">
                <Field className="gap-1">
                  <FieldLabel htmlFor="renewalFrequency">
                    Renewal Frequency
                  </FieldLabel>
                  <FieldContent>
                    <Controller
                      control={control}
                      name="renewalFrequency"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="renewalFrequency"
                            className="w-full bg-white"
                          >
                            <SelectValue placeholder="Select..." />
                          </SelectTrigger>
                          <SelectContent>
                            {renewalFrequencyOptions.map((option) => (
                              <SelectItem key={option} value={option}>
                                {option}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      )}
                    />
                    <FieldError errors={[errors.renewalFrequency]} />
                  </FieldContent>
                </Field>

                <Field className="gap-1">
                  <FieldLabel htmlFor="initialExpiryMonths">
                    Initial Expiry (Months)
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="initialExpiryMonths"
                      className="bg-white"
                      type="number"
                      min={1}
                      {...register("initialExpiryMonths", {
                        valueAsNumber: true,
                      })}
                    />
                    <p className="text-xs text-slate-500">
                      Calculated expiry: {calculatedExpiry}
                    </p>
                    <FieldError errors={[errors.initialExpiryMonths]} />
                  </FieldContent>
                </Field>
              </div>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <Field className="gap-1">
                  <FieldLabel htmlFor="priorityLevel">
                    Priority Level
                  </FieldLabel>
                  <FieldContent>
                    <Controller
                      control={control}
                      name="priorityLevel"
                      render={({ field }) => (
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            id="priorityLevel"
                            className="w-full bg-white"
                          >
                            <SelectValue placeholder="Select..." />
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
                    <FieldError errors={[errors.priorityLevel]} />
                  </FieldContent>
                </Field>

                <Field className="gap-1">
                  <FieldLabel htmlFor="assignedOfficer">
                    Assigned Compliance Officer
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="assignedOfficer"
                      className="bg-white"
                      placeholder="e.g., J. Smith, Legal Team"
                      {...register("assignedOfficer")}
                    />
                    <FieldError errors={[errors.assignedOfficer]} />
                  </FieldContent>
                </Field>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-violet-200/70 bg-violet-50">
            <CardHeader>
              <div className="flex items-center gap-3 text-sm font-semibold">
                <CardTitle>New Requirement Preview</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="space-y-2">
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm">Provider</p>
                  <p className="text-sm text-slate-900 text-right">
                    {watchValues.providerName || "Not specified"}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm">Permit Type</p>
                  <p className="text-sm text-slate-900 text-right">
                    {watchValues.permitType || "Not selected"}
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm">Initial Status</p>
                  <div className="flex justify-end">
                    <Badge className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-900">
                      Pending Verification
                    </Badge>
                  </div>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm">Created By</p>
                  <p className="text-sm text-slate-900 text-right">
                    Current User
                  </p>
                </div>
                <div className="grid grid-cols-2 items-center gap-4">
                  <p className="text-sm">Created Date</p>
                  <p className="text-sm text-slate-900 text-right">
                    {createdDate}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <DialogFooter className="pt-4 border-t grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Button type="submit">Create Requirement</Button>
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
