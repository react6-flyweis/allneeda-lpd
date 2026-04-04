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

const draftMemoSchema = z.object({
  title: z.string().min(1, "Please enter a title"),
  contentSummary: z.string().min(1, "Please enter a summary"),
  intakeId: z.string().min(1, "Please enter an intake ID"),
  approvalRequired: z.enum(["Yes", "No"]),
});

export type DraftMemoFormValues = z.infer<typeof draftMemoSchema>;

interface DraftLegalMemoDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: DraftMemoFormValues) => void;
}

export default function DraftLegalMemoDialog({
  open,
  onOpenChange,
  onSubmit,
}: DraftLegalMemoDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DraftMemoFormValues>({
    resolver: zodResolver(draftMemoSchema),
    defaultValues: {
      title: "",
      contentSummary: "",
      intakeId: "",
      approvalRequired: "No",
    },
  });

  const handleFormSubmit = (values: DraftMemoFormValues) => {
    onSubmit?.(values);
    onOpenChange(false);
    reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Draft Legal Memo</DialogTitle>
          <DialogDescription>Create a new legal memo.</DialogDescription>
        </DialogHeader>

        <form
          className="grid gap-4 pt-2"
          onSubmit={handleSubmit(handleFormSubmit)}
        >
          <div className="space-y-2">
            <Label htmlFor="memo-title">Title</Label>
            <Input
              id="memo-title"
              placeholder="Enter title..."
              {...register("title")}
            />
            {errors.title ? (
              <p className="text-sm text-rose-600">{errors.title.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="content-summary">Content Summary</Label>
            <Textarea
              id="content-summary"
              placeholder="Add summary"
              rows={4}
              {...register("contentSummary")}
            />
            {errors.contentSummary ? (
              <p className="text-sm text-rose-600">
                {errors.contentSummary.message}
              </p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="intake-id">Intake ID</Label>
            <Input
              id="intake-id"
              placeholder="Enter ID..."
              {...register("intakeId")}
            />
            {errors.intakeId ? (
              <p className="text-sm text-rose-600">{errors.intakeId.message}</p>
            ) : null}
          </div>

          <div className="space-y-2">
            <Label htmlFor="approval-required">Approval Required</Label>
            <Controller
              name="approvalRequired"
              control={control}
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select option..." />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Yes">Yes</SelectItem>
                    <SelectItem value="No">No</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <DialogFooter className="border-t pt-3 w-full grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Draft</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
