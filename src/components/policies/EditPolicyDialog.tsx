import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const policyFormSchema = z.object({
  type: z.string().min(1, "Please select a policy type"),
  audience: z.string().min(1, "Please select an audience"),
  jurisdiction: z.string().min(1, "Please enter a jurisdiction"),
  status: z.string().min(1, "Please select a status"),
  description: z.string().min(1, "Please add a description"),
});

export type PolicyFormValues = z.infer<typeof policyFormSchema>;

export type PolicyRow = PolicyFormValues & {
  id: string;
  version: string;
};

const policyTypeOptions = [
  "Terms of Service",
  "Privacy Policy",
  "Cookie Policy",
  "Community Guidelines",
  "Creator Policy",
  "Merchant Agreement",
  "Advertising Policy",
  "Refund Policy",
];

const audienceOptions = [
  "User",
  "Provider",
  "Creator",
  "Business",
  "Employee",
  "Vendor",
  "Content",
  "Contract",
];

const statusOptions = ["Draft", "Published"];

type EditPolicyDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  policy: PolicyRow | null;
  onPolicyUpdate: (id: string, values: PolicyFormValues) => void;
};

export default function EditPolicyDialog({
  isOpen,
  onOpenChange,
  policy,
  onPolicyUpdate,
}: EditPolicyDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PolicyFormValues>({
    resolver: zodResolver(policyFormSchema),
    defaultValues: {
      type: "",
      audience: "",
      jurisdiction: "",
      status: "Draft",
      description: "",
    },
  });

  useEffect(() => {
    if (policy) {
      reset({
        type: policy.type,
        audience: policy.audience,
        jurisdiction: policy.jurisdiction,
        status: policy.status,
        description: policy.description ?? "",
      });
    }
  }, [policy, reset]);

  const handleSubmitForm = (values: PolicyFormValues) => {
    if (!policy) {
      return;
    }

    onPolicyUpdate(policy.id, values);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Policy</DialogTitle>
          <DialogDescription>Update the selected policy.</DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4 pt-2"
          onSubmit={handleSubmit(handleSubmitForm)}
        >
          <div className="space-y-2">
            <Label htmlFor="policy-type">Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="policy-type" className="w-full">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {policyTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.type ? (
              <p className="text-sm text-rose-600">{errors.type.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="audience">Audience</Label>
            <Controller
              control={control}
              name="audience"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="audience" className="w-full">
                    <SelectValue placeholder="Select audience..." />
                  </SelectTrigger>
                  <SelectContent>
                    {audienceOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.audience ? (
              <p className="text-sm text-rose-600">{errors.audience.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="jurisdiction">Jurisdiction</Label>
            <Input
              id="jurisdiction"
              placeholder="Enter jurisdiction..."
              {...register("jurisdiction")}
            />
            {errors.jurisdiction ? (
              <p className="text-sm text-rose-600">
                {errors.jurisdiction.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="status" className="w-full">
                    <SelectValue placeholder="Select status..." />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.status ? (
              <p className="text-sm text-rose-600">{errors.status.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Add description"
              rows={4}
              {...register("description")}
            />
            {errors.description ? (
              <p className="text-sm text-rose-600">
                {errors.description.message}
              </p>
            ) : null}
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">Save</Button>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
