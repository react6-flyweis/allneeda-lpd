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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const departments = [
  "Engineering",
  "Marketing",
  "Sales",
  "Finance",
  "Product Management",
  "Human Resources",
] as const;

const activityTypes = [
  "New Hire",
  "Performance Review",
  "Leave Request",
  "Promotion",
  "Project Kickoff",
] as const;

const employeeActivitySchema = z.object({
  employeeName: z.string().min(1, "Enter full name."),
  department: z.enum(departments, { error: "Select department." }),
  activityType: z.enum(activityTypes, { error: "Select activity type." }),
  activityDate: z.string().min(1, "Enter activity date."),
});

type EmployeeActivityValues = z.infer<typeof employeeActivitySchema>;

interface AddEmployeeActivityDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: EmployeeActivityValues) => void;
}

export default function AddEmployeeActivityDialog({
  open,
  onOpenChange,
  onCreate,
}: AddEmployeeActivityDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EmployeeActivityValues>({
    resolver: zodResolver(employeeActivitySchema),
    defaultValues: {
      employeeName: "",
      department: "Engineering",
      activityType: "New Hire",
      activityDate: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: EmployeeActivityValues) {
    onCreate?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add Employee Activity</DialogTitle>
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
            <Label htmlFor="department">Department</Label>
            <Controller
              control={control}
              name="department"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="department" className="w-full">
                    <SelectValue placeholder="Select department..." />
                  </SelectTrigger>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department} value={department}>
                        {department}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.department && (
              <p className="text-sm text-rose-600">
                {errors.department.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-type">Activity Type</Label>
            <Controller
              control={control}
              name="activityType"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger id="activity-type" className="w-full">
                    <SelectValue placeholder="Select activity type..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activityTypes.map((activityType) => (
                      <SelectItem key={activityType} value={activityType}>
                        {activityType}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.activityType && (
              <p className="text-sm text-rose-600">
                {errors.activityType.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity-date">Date</Label>
            <div className="relative">
              <Input
                id="activity-date"
                placeholder="dd / mm / yyyy"
                {...register("activityDate")}
                className="pr-10"
              />
              <CalendarDays className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
            </div>
            {errors.activityDate && (
              <p className="text-sm text-rose-600">
                {errors.activityDate.message}
              </p>
            )}
          </div>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">+ Add Employee</Button>
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
