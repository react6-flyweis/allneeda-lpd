import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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

const createLegalHoldSchema = z.object({
  scopeType: z.string().min(1, "Please select a scope type"),
  scopeId: z.string().min(1, "Please enter a scope ID"),
  reason: z.string().min(1, "Please add a reason"),
  liftCriteria: z.string().min(1, "Please add lift criteria"),
  ownerDirectory: z.string().min(1, "Please enter an owner directory"),
});

export type CreateLegalHoldFormValues = z.infer<typeof createLegalHoldSchema>;

const scopeTypeOptions = [
  "City Launch",
  "Provider Go-Live",
  "Content Publish",
  "Payout",
];

interface CreateLegalHoldDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: CreateLegalHoldFormValues) => void;
}

export default function CreateLegalHoldDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateLegalHoldDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateLegalHoldFormValues>({
    resolver: zodResolver(createLegalHoldSchema),
    defaultValues: {
      scopeType: "",
      scopeId: "",
      reason: "",
      liftCriteria: "",
      ownerDirectory: "",
    },
  });

  const onSubmit = (values: CreateLegalHoldFormValues) => {
    onCreate?.(values);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create Legal Hold</DialogTitle>
          <DialogDescription>Add a new legal hold.</DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="scope-type">Scope Type</Label>
            <Controller
              control={control}
              name="scopeType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {scopeTypeOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.scopeType ? (
              <p className="text-sm text-rose-600">
                {errors.scopeType.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="scope-id">Scope ID</Label>
            <Input
              id="scope-id"
              placeholder="Enter ID..."
              {...register("scopeId")}
            />
            {errors.scopeId ? (
              <p className="text-sm text-rose-600">{errors.scopeId.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="reason">Reason</Label>
            <Textarea
              id="reason"
              placeholder="Add reason"
              rows={4}
              {...register("reason")}
            />
            {errors.reason ? (
              <p className="text-sm text-rose-600">{errors.reason.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="lift-criteria">Lift Criteria</Label>
            <Textarea
              id="lift-criteria"
              placeholder="Add criteria"
              rows={4}
              {...register("liftCriteria")}
            />
            {errors.liftCriteria ? (
              <p className="text-sm text-rose-600">
                {errors.liftCriteria.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="owner-directory">Owner Directory</Label>
            <Input
              id="owner-directory"
              placeholder="e.g., CTO, CMO, etc..."
              {...register("ownerDirectory")}
            />
            {errors.ownerDirectory ? (
              <p className="text-sm text-rose-600">
                {errors.ownerDirectory.message}
              </p>
            ) : null}
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">Draft</Button>
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
