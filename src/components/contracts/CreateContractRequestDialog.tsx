import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

const contractRequestSchema = z.object({
  contractType: z.string().min(1, "Select a contract type"),
  urgencyLevel: z.string().min(1, "Select urgency level"),
  vendorName: z.string().min(1, "Enter vendor or partner name"),
  requesterName: z.string().min(1, "Enter requester name"),
  businessJustification: z.string().min(1, "Provide business justification"),
  estimatedValue: z.string().optional(),
  executionDate: z.string().optional(),
  department: z.string().optional(),
  businessVertical: z.string().optional(),
  specialTerms: z.string().optional(),
  gdpr: z.boolean().optional(),
  ccpa: z.boolean().optional(),
  soc2: z.boolean().optional(),
  hipaa: z.boolean().optional(),
});

type ContractRequestFormValues = z.infer<typeof contractRequestSchema>;

const contractTypeOptions = [
  "Non - Disclosure Agreement (NDA)",
  "Master Service Agreement (MSA)",
  "Statement of Work (SOW)",
  "Data Processing Agreement (DPA)",
  "Influencer Agreement",
  "Enterprise Terms & Conditions",
];

const urgencyOptions = [
  "Standard - 5-7 Business Days",
  "Expedited - 48 Hours",
  "Critical - 24 Hours",
];

const verticalOptions = [
  "Food & Beverage",
  "Retail & Shopping",
  "Home Services",
  "Healthcare",
  "Beauty & Wellness",
  "Entertainment",
  "Education",
];

interface CreateContractRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: ContractRequestFormValues) => void;
}

export default function CreateContractRequestDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateContractRequestDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ContractRequestFormValues>({
    resolver: zodResolver(contractRequestSchema),
    defaultValues: {
      contractType: "",
      urgencyLevel: "",
      vendorName: "",
      requesterName: "",
      businessJustification: "",
      estimatedValue: "",
      executionDate: "",
      department: "",
      businessVertical: "",
      specialTerms: "",
      gdpr: false,
      ccpa: false,
      soc2: false,
      hipaa: false,
    },
  });

  const onSubmit = (values: ContractRequestFormValues) => {
    onCreate?.(values);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Contract Request</DialogTitle>
          <DialogDescription>
            Submit a new contract or vendor agreement request for legal review
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 mt-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full bg-slate-200 p-2 text-slate-700">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Contract Request Process
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                All contract requests begin in "draft" status and proceed
                through legal review, approval, and signature stages. Expedited
                requests require executive approval.
              </p>
            </div>
          </div>
        </div>

        <form className="grid gap-6 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contract-type">Contract Type *</Label>
              <Controller
                control={control}
                name="contractType"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select contract type" />
                    </SelectTrigger>
                    <SelectContent>
                      {contractTypeOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.contractType && (
                <p className="text-sm text-rose-600">
                  {errors.contractType.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency-level">Urgency Level *</Label>
              <Controller
                control={control}
                name="urgencyLevel"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      {urgencyOptions.map((option) => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.urgencyLevel && (
                <p className="text-sm text-rose-600">
                  {errors.urgencyLevel.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Vendor/Partner Name *</Label>
              <Input
                id="vendor-name"
                placeholder="e.g., Acme Corporation"
                {...register("vendorName")}
              />
              {errors.vendorName && (
                <p className="text-sm text-rose-600">
                  {errors.vendorName.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="requester-name">Requester Name *</Label>
              <Input
                id="requester-name"
                placeholder="e.g., Jane Smith"
                {...register("requesterName")}
              />
              {errors.requesterName && (
                <p className="text-sm text-rose-600">
                  {errors.requesterName.message}
                </p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-justification">
              Business Justification *
            </Label>
            <Textarea
              id="business-justification"
              rows={5}
              placeholder="Explain the business need, strategic purpose, and expected benefits of this contract..."
              {...register("businessJustification")}
            />
            {errors.businessJustification && (
              <p className="text-sm text-rose-600">
                {errors.businessJustification.message}
              </p>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="estimated-value">Estimated Contract Value</Label>
              <Input
                id="estimated-value"
                placeholder="e.g., $50,000"
                {...register("estimatedValue")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="execution-date">Desired Execution Date</Label>
              <div className="relative">
                <CalendarDays className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="execution-date"
                  placeholder="dd / mm / yyyy"
                  className="pl-10"
                  {...register("executionDate")}
                />
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                id="department"
                placeholder="e.g., Marketing, Engineering"
                {...register("department")}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-vertical">Business Vertical</Label>
              <Controller
                control={control}
                name="businessVertical"
                render={({ field }) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
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
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-terms">Special Terms or Requirements</Label>
            <Textarea
              id="special-terms"
              rows={4}
              placeholder="Document any special provisions, custom terms, liability caps, indemnification requirements, or specific clauses needed..."
              {...register("specialTerms")}
            />
            <p className="text-sm text-slate-500">
              Any non-standard terms or specific requirements
            </p>
          </div>

          <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                <Info className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Compliance Requirements
              </h3>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Controller
                  control={control}
                  name="gdpr"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    GDPR Compliance Required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Controller
                  control={control}
                  name="ccpa"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    CCPA Compliance Required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Controller
                  control={control}
                  name="soc2"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    SOC 2 Compliance Required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <Controller
                  control={control}
                  name="hipaa"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    HIPAA Compliance Required
                  </p>
                </div>
              </div>
            </div>
          </section>

          {isSubmitted && Object.keys(errors).length > 0 ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-800">
              <p className="font-semibold text-amber-900">
                Required Fields Missing
              </p>
              <p className="mt-2 text-slate-700">
                Please complete: Contract Type, Vendor Name, Requester Name,
                Business Justification, and Urgency Level
              </p>
            </div>
          ) : null}

          <DialogFooter className="pt-4 border-t border-slate-200 gap-3 sm:justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
