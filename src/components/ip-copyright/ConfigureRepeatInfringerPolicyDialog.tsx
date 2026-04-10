import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Field,
  FieldContent,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const penaltyOptions = [
  "Warning + Upload Limit",
  "Account Suspensior",
  "Permanent Bar",
];

const configureRepeatInfringerPolicySchema = z.object({
  strike1ViolationCount: z.string().min(1, "Required"),
  strike1TimeWindow: z.string().min(1, "Required"),
  strike1PenaltyAction: z.string().min(1, "Required"),
  strike1UploadLimit: z.string().min(1, "Required"),

  strike2ViolationCount: z.string().min(1, "Required"),
  strike2TimeWindow: z.string().min(1, "Required"),
  strike2PenaltyAction: z.string().min(1, "Required"),
  strike2UploadLimit: z.string().min(1, "Required"),

  strike3ViolationCount: z.string().min(1, "Required"),
  strike3TimeWindow: z.string().min(1, "Required"),
  strike3PenaltyAction: z.string().min(1, "Required"),

  enableRollingTimeWindow: z.boolean(),
  rollingWindowPeriodDays: z.string().min(1, "Required"),
  enableStrikeDecay: z.boolean(),

  enableAwmAutomation: z.boolean(),
  autoSendWarningEmails: z.boolean(),
  autoSuspendAtStrike2: z.boolean(),
  requireLegalReviewForPermanentBan: z.boolean(),

  appealWindowDays: z.string().min(1, "Required"),
  appealsRequireLegalReview: z.boolean(),
  autoRestoreIfNoAppealFiled: z.boolean(),

  notifyUserOnEachStrike: z.boolean(),
  notifyLegalOnEnforcementAction: z.boolean(),
  gracePeriodForFirstTimeOffenders: z.boolean(),
  policyNotes: z.string().optional(),
});

type ConfigureRepeatInfringerPolicyValues = z.infer<
  typeof configureRepeatInfringerPolicySchema
>;

type ConfigureRepeatInfringerPolicyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (values: ConfigureRepeatInfringerPolicyValues) => void;
};

export default function ConfigureRepeatInfringerPolicyDialog({
  open,
  onOpenChange,
  onSave,
}: ConfigureRepeatInfringerPolicyDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConfigureRepeatInfringerPolicyValues>({
    resolver: zodResolver(configureRepeatInfringerPolicySchema),
    defaultValues: {
      strike1ViolationCount: "1",
      strike1TimeWindow: "90",
      strike1PenaltyAction: "Warning + Upload Limit",
      strike1UploadLimit: "5",

      strike2ViolationCount: "2",
      strike2TimeWindow: "90",
      strike2PenaltyAction: "Account Suspensior",
      strike2UploadLimit: "0",

      strike3ViolationCount: "3",
      strike3TimeWindow: "90",
      strike3PenaltyAction: "Permanent Bar",

      enableRollingTimeWindow: true,
      rollingWindowPeriodDays: "90",
      enableStrikeDecay: false,

      enableAwmAutomation: true,
      autoSendWarningEmails: true,
      autoSuspendAtStrike2: true,
      requireLegalReviewForPermanentBan: true,

      appealWindowDays: "14",
      appealsRequireLegalReview: true,
      autoRestoreIfNoAppealFiled: false,

      notifyUserOnEachStrike: true,
      notifyLegalOnEnforcementAction: true,
      gracePeriodForFirstTimeOffenders: false,
      policyNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: ConfigureRepeatInfringerPolicyValues) {
    onSave?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[92vh] overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Configure Repeat Infringer Policy
          </DialogTitle>
          <DialogDescription>
            Set strike thresholds, penalties, and automated enforcement rules
            (AWM)
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-lg border border-amber-200 bg-amber-50 p-4 space-y-4">
            <h3 className="font-semibold text-amber-900">
              Strike 1 - First Offense
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="strike1ViolationCount">
                  Violation Count
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="strike1ViolationCount"
                    className="bg-gray-50"
                    {...register("strike1ViolationCount")}
                  />
                  <FieldError errors={[errors.strike1ViolationCount]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="strike1TimeWindow">
                  Time Window (Days)
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="strike1TimeWindow"
                    className="bg-gray-50"
                    {...register("strike1TimeWindow")}
                  />
                  <FieldError errors={[errors.strike1TimeWindow]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="strike1PenaltyAction">
                Penalty Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="strike1PenaltyAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="strike1PenaltyAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select penalty action" />
                      </SelectTrigger>
                      <SelectContent>
                        {penaltyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.strike1PenaltyAction]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="strike1UploadLimit">
                Upload Limit (Per Day)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="strike1UploadLimit"
                  className="bg-gray-50"
                  {...register("strike1UploadLimit")}
                />
                <FieldError errors={[errors.strike1UploadLimit]} />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-lg border border-orange-200 bg-orange-50 p-4 space-y-4">
            <h3 className="font-semibold text-orange-900">
              Strike 2 - Second Offense
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="strike2ViolationCount">
                  Violation Count
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="strike2ViolationCount"
                    className="bg-gray-50"
                    {...register("strike2ViolationCount")}
                  />
                  <FieldError errors={[errors.strike2ViolationCount]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="strike2TimeWindow">
                  Time Window (Days)
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="strike2TimeWindow"
                    className="bg-gray-50"
                    {...register("strike2TimeWindow")}
                  />
                  <FieldError errors={[errors.strike2TimeWindow]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="strike2PenaltyAction">
                Penalty Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="strike2PenaltyAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="strike2PenaltyAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select penalty action" />
                      </SelectTrigger>
                      <SelectContent>
                        {penaltyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.strike2PenaltyAction]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="strike2UploadLimit">
                Upload Limit (Per Day)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="strike2UploadLimit"
                  className="bg-gray-50"
                  {...register("strike2UploadLimit")}
                />
                <FieldError errors={[errors.strike2UploadLimit]} />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-lg border border-rose-200 bg-rose-50 p-4 space-y-4">
            <h3 className="font-semibold text-rose-900">
              Strike 3 - Third Offense
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="strike3ViolationCount">
                  Violation Count
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="strike3ViolationCount"
                    className="bg-gray-50"
                    {...register("strike3ViolationCount")}
                  />
                  <FieldError errors={[errors.strike3ViolationCount]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="strike3TimeWindow">
                  Time Window (Days)
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="strike3TimeWindow"
                    className="bg-gray-50"
                    {...register("strike3TimeWindow")}
                  />
                  <FieldError errors={[errors.strike3TimeWindow]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="strike3PenaltyAction">
                Penalty Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="strike3PenaltyAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="strike3PenaltyAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select penalty action" />
                      </SelectTrigger>
                      <SelectContent>
                        {penaltyOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.strike3PenaltyAction]} />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">Rolling Window & Decay Settings</h3>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="enableRollingTimeWindow"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <div>
                    <p>Enable rolling time window for strikes</p>
                    <p className="text-sm text-muted-foreground">
                      Strikes expire after the time window passes
                    </p>
                  </div>
                </div>
              </FieldContent>
            </Field>

            <Field className="max-w-sm gap-1">
              <FieldLabel htmlFor="rollingWindowPeriodDays">
                Rolling Window Period (Days)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="rollingWindowPeriodDays"
                  className="bg-gray-50"
                  {...register("rollingWindowPeriodDays")}
                />
                <FieldError errors={[errors.rollingWindowPeriodDays]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="enableStrikeDecay"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <div>
                    <p>Enable strike decay for good behavior</p>
                    <p className="text-sm text-muted-foreground">
                      Remove strikes if user maintains compliance
                    </p>
                  </div>
                </div>
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">AWM Automation Settings</h3>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="enableAwmAutomation"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <div>
                    <p>Enable automated enforcement via AWM</p>
                    <p className="text-sm text-muted-foreground">
                      Automatically apply penalties when thresholds are met
                    </p>
                  </div>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="autoSendWarningEmails"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Auto-send warning emails to users</p>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="autoSuspendAtStrike2"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Auto-suspend accounts at Strike 2</p>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="requireLegalReviewForPermanentBan"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Require legal review before permanent ban</p>
                </div>
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">Appeal Process Configuration</h3>

            <Field className="max-w-sm gap-1">
              <FieldLabel htmlFor="appealWindowDays">
                Appeal Window (Days)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="appealWindowDays"
                  className="bg-gray-50"
                  {...register("appealWindowDays")}
                />
                <FieldError errors={[errors.appealWindowDays]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="appealsRequireLegalReview"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Appeals require legal team review</p>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="autoRestoreIfNoAppealFiled"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Auto-restore account if no appeal filed within window</p>
                </div>
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-3 border-t pt-4">
            <h3 className="font-semibold">
              Notification & Additional Settings
            </h3>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="notifyUserOnEachStrike"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Notify user immediately upon each strike</p>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="notifyLegalOnEnforcementAction"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Notify legal team of all enforcement actions</p>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldContent>
                <div className="flex items-start gap-3">
                  <Controller
                    control={control}
                    name="gracePeriodForFirstTimeOffenders"
                    render={({ field }) => (
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={(checked) =>
                          field.onChange(Boolean(checked))
                        }
                        className="mt-0.5"
                      />
                    )}
                  />
                  <p>Grace period for first-time offenders</p>
                </div>
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="policyNotes">Policy Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="policyNotes"
                  rows={4}
                  className="bg-gray-50"
                  placeholder="Additional notes about this policy configuration"
                  {...register("policyNotes")}
                />
              </FieldContent>
            </Field>
          </section>

          <DialogFooter className="pt-4 justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Save Policy Configuration</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
