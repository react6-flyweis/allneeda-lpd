import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CalendarDays } from "lucide-react";

const owners = ["User 1", "User 2", "User 3", "User 4"] as const;

const assignRemediationSchema = z.object({
  owner: z.enum(owners, { error: "Please select an owner." }),
  dueDate: z.string().min(1, "Please select a due date."),
  acceptanceCriteria: z.string().min(10, "Please enter acceptance criteria."),
});

export type AssignRemediationFormValues = z.infer<
  typeof assignRemediationSchema
>;

type ReviewRow = {
  id: string;
  title: string;
  severity: "Low" | "Medium";
  status: "open" | "remediation_in_progress";
  published: string;
};

interface AssignRemediationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewRow: ReviewRow | null;
  onSubmit?: (values: AssignRemediationFormValues) => void;
}

export default function AssignRemediationDialog({
  open,
  onOpenChange,
  reviewRow,
  onSubmit,
}: AssignRemediationDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssignRemediationFormValues>({
    resolver: zodResolver(assignRemediationSchema),
    defaultValues: {
      owner: "User 1",
      dueDate: "",
      acceptanceCriteria: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        owner: "User 1",
        dueDate: "",
        acceptanceCriteria: "",
      });
    }
  }, [open, reset]);

  if (!reviewRow) {
    return null;
  }

  function handleFormSubmit(values: AssignRemediationFormValues) {
    onSubmit?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Assign Remediation</DialogTitle>
          <DialogDescription>
            Assign a remediation task for the selected compliance finding.
          </DialogDescription>
        </DialogHeader>

        <form
          className="space-y-4 pt-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <Field className="gap-1">
            <FieldLabel>Owner</FieldLabel>
            <FieldContent>
              <Controller
                control={control}
                name="owner"
                render={({ field }) => (
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select user..." />
                    </SelectTrigger>
                    <SelectContent>
                      {owners.map((owner) => (
                        <SelectItem key={owner} value={owner}>
                          {owner}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              <FieldError errors={errors.owner ? [errors.owner] : undefined} />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel>Due Date</FieldLabel>
            <FieldContent>
              <div className="relative">
                <Input
                  type="text"
                  placeholder="dd / mm / yyyy"
                  className="pr-11"
                  {...register("dueDate")}
                />
                <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              </div>
              <FieldError
                errors={errors.dueDate ? [errors.dueDate] : undefined}
              />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel>Acceptance Criteria</FieldLabel>
            <FieldContent>
              <Textarea
                placeholder="Enter acceptance criteria"
                className="min-h-30"
                {...register("acceptanceCriteria")}
              />
              <FieldError
                errors={
                  errors.acceptanceCriteria
                    ? [errors.acceptanceCriteria]
                    : undefined
                }
              />
            </FieldContent>
          </Field>

          <DialogFooter className="border-t pt-4 grid grid-cols-2 gap-5">
            <Button type="submit">Assign</Button>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
