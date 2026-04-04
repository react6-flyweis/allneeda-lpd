import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
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
import { type IntakeRow } from "./types";

const statusOptions = ["Open", "In Review", "Waiting Approval", "Closed"];
const riskOptions = ["Critical", "High", "Medium", "Low"];

interface ReviewLegalIntakeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  intake: IntakeRow | null;
  onSave: (status: string, risk: string) => void;
  onCancel: () => void;
}

type ReviewLegalIntakeFormValues = {
  status: string;
  risk: string;
  notes: string;
};

export default function ReviewLegalIntakeDialog({
  open,
  onOpenChange,
  intake,
  onSave,
  onCancel,
}: ReviewLegalIntakeDialogProps) {
  const { control, register, handleSubmit, reset } =
    useForm<ReviewLegalIntakeFormValues>({
      defaultValues: {
        status: "",
        risk: "",
        notes: "",
      },
    });

  useEffect(() => {
    if (intake) {
      reset({ status: intake.status, risk: intake.risk, notes: "" });
    } else {
      reset({ status: "", risk: "", notes: "" });
    }
  }, [intake, reset]);

  const onSubmit = (values: ReviewLegalIntakeFormValues) => {
    onSave(values.status, values.risk);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Review Legal Intake {intake?.id}</DialogTitle>
          <DialogDescription>
            Review and update the legal intake status and risk level.
          </DialogDescription>
        </DialogHeader>

        {intake ? (
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-900">Category:</span>
                <span>{intake.category}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-900">Product:</span>
                <span>{intake.product}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-900">
                  Jurisdiction:
                </span>
                <span>{intake.jurisdiction}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-900">
                  Description:
                </span>
                <span className="text-right">{intake.description}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-900">Owner:</span>
                <span>{intake.owner}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="font-semibold text-slate-900">Created:</span>
                <span>{intake.created}</span>
              </div>
              <div className="flex items-center justify-between gap-4 col-span-full sm:col-auto">
                <span className="font-semibold text-slate-900">SLA Due:</span>
                <span>{intake.slaDue}</span>
              </div>
            </div>
          </div>
        ) : null}

        <form className="space-y-4 pt-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="review-status">Status</Label>
            <Controller
              control={control}
              name="status"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level..." />
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
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-risk">Risk Level</Label>
            <Controller
              control={control}
              name="risk"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select level..." />
                  </SelectTrigger>
                  <SelectContent>
                    {riskOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-notes">Review Notes</Label>
            <Textarea
              id="review-notes"
              placeholder="Add your review notes here..."
              rows={5}
              {...register("notes")}
            />
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">Save</Button>
            <Button variant="outline" type="button" onClick={onCancel}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
