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

const createRegulatoryCaseSchema = z.object({
  type: z.string().min(1, "Please select a case type"),
  regulatorName: z.string().min(1, "Please enter a regulator name"),
  description: z.string().min(1, "Please add a description"),
  assignedAttorney: z.string().min(1, "Please enter an assigned attorney"),
  priority: z.string().min(1, "Please select a priority"),
});

export type CreateRegulatoryCaseFormValues = z.infer<
  typeof createRegulatoryCaseSchema
>;

interface CreateRegulatoryCaseDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: CreateRegulatoryCaseFormValues) => void;
}

const caseTypeOptions = ["Info Request", "Subpoena", "Notice", "Inquiry"];
const priorityOptions = ["Critical", "High", "Medium", "Low"];

export default function CreateRegulatoryCaseDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateRegulatoryCaseDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRegulatoryCaseFormValues>({
    resolver: zodResolver(createRegulatoryCaseSchema),
    defaultValues: {
      type: "",
      regulatorName: "",
      description: "",
      assignedAttorney: "",
      priority: "",
    },
  });

  function onSubmit(values: CreateRegulatoryCaseFormValues) {
    onCreate?.(values);
    onOpenChange(false);
    reset();
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Regulatory Case</DialogTitle>
          <DialogDescription>
            Enter the details of the new regulatory case.
          </DialogDescription>
        </DialogHeader>

        <form className="grid gap-4 pt-2" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="type">Type</Label>
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="type" className="w-full">
                    <SelectValue placeholder="Select type..." />
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
            {errors.type ? (
              <p className="text-sm text-rose-600">{errors.type.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="regulator-name">Regulator Name</Label>
            <Input
              id="regulator-name"
              placeholder="Enter here..."
              {...register("regulatorName")}
            />
            {errors.regulatorName ? (
              <p className="text-sm text-rose-600">
                {errors.regulatorName.message}
              </p>
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

          <div className="space-y-2">
            <Label htmlFor="assigned-attorney">Assigned Attorney</Label>
            <Input
              id="assigned-attorney"
              placeholder="Enter here..."
              {...register("assignedAttorney")}
            />
            {errors.assignedAttorney ? (
              <p className="text-sm text-rose-600">
                {errors.assignedAttorney.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority">Priority</Label>
            <Controller
              control={control}
              name="priority"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="priority" className="w-full">
                    <SelectValue placeholder="Select level..." />
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
            {errors.priority ? (
              <p className="text-sm text-rose-600">{errors.priority.message}</p>
            ) : null}
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">Create</Button>
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
