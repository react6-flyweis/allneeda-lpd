import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { PlusIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
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

type CreatePolicyDialogProps = {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onPolicyCreate: (values: PolicyFormValues) => void;
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

export default function CreatePolicyDialog({
  isOpen,
  onOpenChange,
  onPolicyCreate,
}: CreatePolicyDialogProps) {
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

  const handleSubmitForm = (values: PolicyFormValues) => {
    onPolicyCreate(values);
    reset();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className="bg-slate-950 text-white hover:bg-slate-800"
        >
          <PlusIcon className="h-4 w-4" />
          Create Policy
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Policy</DialogTitle>
          <DialogDescription>
            Add a new policy to the platform.
          </DialogDescription>
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
            <Button type="submit">Create</Button>
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
