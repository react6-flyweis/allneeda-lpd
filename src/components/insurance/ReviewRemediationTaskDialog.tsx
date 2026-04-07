import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import {
  Check,
  CheckCircle2,
  ClipboardCheck,
  Info,
  MinusCircle,
  XCircle,
} from "lucide-react";

const reviewRemediationTaskSchema = z.object({
  completionEvidence: z
    .string()
    .min(10, "Please provide completion evidence details."),
  qualityScore: z
    .number()
    .min(0, "Quality score must be between 0 and 100.")
    .max(100, "Quality score must be between 0 and 100."),
  reviewerNotes: z.string().optional(),
  followUpActions: z.string().optional(),
  acceptanceCriteriaStatus: z.enum(["verified", "not_verified"], {
    error: "Please mark acceptance criteria status.",
  }),
  reviewDecision: z.enum(["approve", "reject", "request_changes"], {
    error: "Please select a review decision.",
  }),
});

type ReviewRemediationTaskFormValues = z.infer<
  typeof reviewRemediationTaskSchema
>;

type ReviewTask = {
  id: string;
  owner: string;
  acceptanceCriteria: string;
  dueDate: string;
  status: "in_progress" | "pending";
  findingId: string;
};

interface ReviewRemediationTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  reviewTask: ReviewTask | null;
  onSubmit?: (values: ReviewRemediationTaskFormValues) => void;
}

const statusColorMap: Record<ReviewTask["status"], string> = {
  in_progress: "bg-slate-950 text-white",
  pending: "bg-slate-700 text-white",
};

const statusLabelMap: Record<ReviewTask["status"], string> = {
  in_progress: "in progress",
  pending: "pending",
};

function FieldErrorText({ message }: { message?: string }) {
  if (!message) {
    return null;
  }

  return <p className="mt-1 text-xs font-medium text-rose-600">{message}</p>;
}

export default function ReviewRemediationTaskDialog({
  open,
  onOpenChange,
  reviewTask,
  onSubmit,
}: ReviewRemediationTaskDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ReviewRemediationTaskFormValues>({
    resolver: zodResolver(reviewRemediationTaskSchema),
    defaultValues: {
      completionEvidence: "",
      qualityScore: 0,
      reviewerNotes: "",
      followUpActions: "",
      acceptanceCriteriaStatus: "not_verified",
      reviewDecision: undefined,
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        completionEvidence: "",
        qualityScore: 0,
        reviewerNotes: "",
        followUpActions: "",
        acceptanceCriteriaStatus: "not_verified",
        reviewDecision: undefined,
      });
    }
  }, [open, reset]);

  if (!reviewTask) {
    return null;
  }

  function handleFormSubmit(values: ReviewRemediationTaskFormValues) {
    onSubmit?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] overflow-y-auto  sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <ClipboardCheck className="h-5 w-5" />
            Review Remediation Task
          </DialogTitle>
          <DialogDescription className="max-w-2xl text-sm text-slate-500">
            Review the completion evidence and acceptance criteria for the
            remediation task.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <section className="rounded-2xl border border-blue-200 bg-blue-50/50 p-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Info className="h-4 w-4" />
              <p className="text-base font-medium">Task Record Details</p>
            </div>

            <dl className="mt-4 grid grid-cols-[92px_1fr] gap-y-1 text-sm sm:grid-cols-[110px_1fr]">
              <dt className="text-slate-600">Task ID:</dt>
              <dd className="text-right font-mono text-slate-800">
                {reviewTask.id}
              </dd>

              <dt className="text-slate-600">Owner:</dt>
              <dd className="text-right text-slate-800">
                <span className="inline-flex rounded-full border border-slate-300 px-3 py-1 text-sm">
                  {reviewTask.owner}
                </span>
              </dd>

              <dt className="text-slate-600">Due Date:</dt>
              <dd className="text-right text-slate-800">
                {reviewTask.dueDate}
              </dd>

              <dt className="text-slate-600">Status:</dt>
              <dd className="text-right">
                <span
                  className={cn(
                    "inline-flex rounded-full px-3 py-1 text-sm font-medium",
                    statusColorMap[reviewTask.status],
                  )}
                >
                  {statusLabelMap[reviewTask.status]}
                </span>
              </dd>

              <dt className="text-slate-600">Finding ID:</dt>
              <dd className="text-right text-slate-800">
                {reviewTask.findingId}
              </dd>
            </dl>
          </section>

          <section>
            <label className="mb-2 block text-base font-medium text-slate-900">
              Completion Evidence
            </label>
            <Textarea
              className="min-h-24 border-slate-200 bg-slate-200/40 text-sm placeholder:text-slate-500"
              placeholder="Upload or describe the completion evidence here..."
              {...register("completionEvidence")}
            />
            <FieldErrorText message={errors.completionEvidence?.message} />
          </section>

          <section>
            <label className="mb-2 block text-base font-medium text-slate-900">
              Quality Score
            </label>
            <Input
              type="number"
              className="h-10 border-slate-200 bg-slate-200/40 text-sm"
              {...register("qualityScore", { valueAsNumber: true })}
            />
            <FieldErrorText message={errors.qualityScore?.message} />
          </section>

          <section>
            <label className="mb-2 block text-base font-medium text-slate-900">
              Reviewer Notes
            </label>
            <Textarea
              className="min-h-24 border-slate-200 bg-slate-200/40 text-sm placeholder:text-slate-500"
              placeholder="Enter any additional notes or observations..."
              {...register("reviewerNotes")}
            />
          </section>

          <section>
            <label className="mb-2 block text-base font-medium text-slate-900">
              Follow-up Actions
            </label>
            <Textarea
              className="min-h-24 border-slate-200 bg-slate-200/40 text-sm placeholder:text-slate-500"
              placeholder="Describe any follow-up actions required..."
              {...register("followUpActions")}
            />
          </section>

          <section className="rounded-2xl border border-slate-300 bg-slate-100 p-4">
            <div className="flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-base font-medium">Acceptance Criteria</p>
            </div>

            <Controller
              control={control}
              name="acceptanceCriteriaStatus"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="mt-4 space-y-2"
                >
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-slate-900">
                      <RadioGroupItem value="verified" />
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Verified
                    </label>

                    <label className="inline-flex cursor-pointer items-center gap-2 text-slate-900">
                      <RadioGroupItem value="not_verified" />
                      <XCircle className="h-4 w-4 text-rose-500" />
                      Not Verified
                    </label>

                    <p className="text-slate-900">
                      {reviewTask.acceptanceCriteria}
                    </p>
                  </div>
                </RadioGroup>
              )}
            />
            <FieldErrorText
              message={errors.acceptanceCriteriaStatus?.message}
            />
          </section>

          <section className="rounded-2xl border border-slate-300 bg-slate-100 p-4">
            <div className="flex items-center gap-2 text-slate-900">
              <CheckCircle2 className="h-4 w-4" />
              <p className="text-base font-medium">Review Decision</p>
            </div>

            <Controller
              control={control}
              name="reviewDecision"
              render={({ field }) => (
                <RadioGroup
                  value={field.value}
                  onValueChange={field.onChange}
                  className="mt-4"
                >
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
                    <label className="inline-flex cursor-pointer items-center gap-2 text-slate-900">
                      <RadioGroupItem value="approve" />
                      <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                      Approve
                    </label>

                    <label className="inline-flex cursor-pointer items-center gap-2 text-slate-900">
                      <RadioGroupItem value="reject" />
                      <XCircle className="h-4 w-4 text-rose-500" />
                      Reject
                    </label>

                    <label className="inline-flex cursor-pointer items-center gap-2 text-slate-900">
                      <RadioGroupItem value="request_changes" />
                      <MinusCircle className="h-4 w-4 text-slate-500" />
                      Request Changes
                    </label>
                  </div>
                </RadioGroup>
              )}
            />
            <FieldErrorText message={errors.reviewDecision?.message} />
          </section>

          <DialogFooter className="border-t border-slate-300 pt-4">
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              className="bg-emerald-600 text-white hover:bg-emerald-700"
            >
              <Check className="h-4 w-4" />
              Complete Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
