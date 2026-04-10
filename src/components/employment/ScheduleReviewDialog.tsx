import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
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

const reviewTypes = [
  "Performance Review",
  "Probation Review",
  "Annual Review",
  "Development Review",
] as const;

const scheduleReviewSchema = z.object({
  employeeName: z.string().min(1, "Enter full name."),
  reviewType: z.enum(reviewTypes, { error: "Select review type." }),
  reviewDate: z.string().min(1, "Enter the review date."),
  reviewTime: z.string().min(1, "Enter the review time."),
  notes: z.string().optional(),
});

type ScheduleReviewValues = z.infer<typeof scheduleReviewSchema>;

interface ScheduleReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSchedule?: (values: ScheduleReviewValues) => void;
}

export default function ScheduleReviewDialog({
  open,
  onOpenChange,
  onSchedule,
}: ScheduleReviewDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ScheduleReviewValues>({
    resolver: zodResolver(scheduleReviewSchema),
    defaultValues: {
      employeeName: "",
      reviewType: "Performance Review",
      reviewDate: "",
      reviewTime: "",
      notes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: ScheduleReviewValues) {
    onSchedule?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Review</DialogTitle>
          <DialogDescription>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-2">
            <Label htmlFor="employee-name">Employee Name</Label>
            <Input
              id="employee-name"
              placeholder="Enter full name"
              {...register("employeeName")}
            />
            {errors.employeeName && (
              <p className="text-sm text-rose-600">
                {errors.employeeName.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-type">Review Type</Label>
            <Controller
              control={control}
              name="reviewType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="review-type" className="w-full">
                    <SelectValue placeholder="Select review type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {reviewTypes.map((reviewType) => (
                      <SelectItem key={reviewType} value={reviewType}>
                        {reviewType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.reviewType && (
              <p className="text-sm text-rose-600">
                {errors.reviewType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-date">Date</Label>
            <div className="relative">
              <Input
                id="review-date"
                placeholder="dd / mm / yyyy"
                {...register("reviewDate")}
                className="pr-10"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
            {errors.reviewDate && (
              <p className="text-sm text-rose-600">
                {errors.reviewDate.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-time">Time</Label>
            <Input
              id="review-time"
              placeholder="-- : -- --"
              {...register("reviewTime")}
            />
            {errors.reviewTime && (
              <p className="text-sm text-rose-600">
                {errors.reviewTime.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea
              id="notes"
              placeholder="Enter notes..."
              rows={6}
              {...register("notes")}
            />
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">Schedule Review</Button>
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
