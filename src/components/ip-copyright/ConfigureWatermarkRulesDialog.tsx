import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Fingerprint } from "lucide-react";
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
import { Field, FieldContent, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const watermarkPositionOptions = ["Bottom Right", "Bottom Left", "Top Right", "Top Left"];
const penaltyRemovalOptions = ["Strike + Suspension", "Warning Only", "Immediate Takedown"];
const attributionFormatOptions = ["Creator Name + Source Link", "Creator Name Only", "Source Link Only"];
const attributionPlacementOptions = ["Description Field", "Caption", "Overlay Footer"];
const violationActionOptions = ["Warning", "Strike", "Suspension"];

const configureWatermarkRulesSchema = z.object({
  watermarkRequired: z.boolean(),
  preferredWatermarkPosition: z.string().min(1, "Select a watermark position"),
  minimumSizePercent: z.string().min(1, "Enter minimum size"),
  minimumOpacityPercent: z.string().min(1, "Enter minimum opacity"),
  penaltyForWatermarkRemoval: z.string().min(1, "Select a penalty"),

  attributionRequired: z.boolean(),
  attributionFormat: z.string().min(1, "Select attribution format"),
  attributionPlacement: z.string().min(1, "Select attribution placement"),
  penaltyForMissingAttribution: z.string().min(1, "Select a penalty"),

  autoDetectWatermarkRemoval: z.boolean(),
  autoDetectWatermarkTampering: z.boolean(),
  detectionConfidenceThreshold: z.string().min(1, "Enter confidence threshold"),
  requireManualReview: z.boolean(),

  autoEnforcePenalties: z.boolean(),
  gracePeriodHours: z.string().min(1, "Enter grace period"),
  escalateRepeatViolations: z.boolean(),
  notifyImmediatelyUponDetection: z.boolean(),

  firstViolationAction: z.string().min(1, "Select first violation action"),
  secondViolationAction: z.string().min(1, "Select second violation action"),
  thirdViolationAction: z.string().min(1, "Select third violation action"),
  suspensionDurationDays: z.string().min(1, "Enter suspension duration"),

  automaticallyRemoveViolatingContent: z.boolean(),
  allowAppeals: z.boolean(),
  appealWindowDays: z.string().min(1, "Enter appeal window"),
  autoRestoreAfterFix: z.boolean(),

  allowFairUseExemptions: z.boolean(),
  allowEducationalExemptions: z.boolean(),
  exemptionsRequireLegalApproval: z.boolean(),

  notifyLegalTeam: z.boolean(),
  logAllViolations: z.boolean(),
  policyNotes: z.string().optional(),
});

type ConfigureWatermarkRulesValues = z.infer<typeof configureWatermarkRulesSchema>;

type ConfigureWatermarkRulesDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (values: ConfigureWatermarkRulesValues) => void;
};

function BooleanField({
  name,
  control,
  label,
  description,
}: {
  name: keyof ConfigureWatermarkRulesValues;
  control: Parameters<typeof Controller>[0]["control"];
  label: string;
  description?: string;
}) {
  return (
    <Field className="gap-1">
      <FieldContent>
        <div className="flex items-start gap-3">
          <Controller
            control={control}
            name={name}
            render={({ field }) => (
              <Checkbox
                checked={Boolean(field.value)}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                className="mt-0.5"
              />
            )}
          />
          <div>
            <p>{label}</p>
            {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
          </div>
        </div>
      </FieldContent>
    </Field>
  );
}

function ConfigureWatermarkRulesDialog({
  open,
  onOpenChange,
  onSave,
}: ConfigureWatermarkRulesDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConfigureWatermarkRulesValues>({
    resolver: zodResolver(configureWatermarkRulesSchema),
    defaultValues: {
      watermarkRequired: true,
      preferredWatermarkPosition: "Bottom Right",
      minimumSizePercent: "5",
      minimumOpacityPercent: "70",
      penaltyForWatermarkRemoval: "Strike + Suspension",
      attributionRequired: true,
      attributionFormat: "Creator Name + Source Link",
      attributionPlacement: "Description Field",
      penaltyForMissingAttribution: "Warning Only",
      autoDetectWatermarkRemoval: true,
      autoDetectWatermarkTampering: true,
      detectionConfidenceThreshold: "85",
      requireManualReview: false,
      autoEnforcePenalties: true,
      gracePeriodHours: "24",
      escalateRepeatViolations: true,
      notifyImmediatelyUponDetection: true,
      firstViolationAction: "Warning",
      secondViolationAction: "Strike",
      thirdViolationAction: "Suspension",
      suspensionDurationDays: "7",
      automaticallyRemoveViolatingContent: false,
      allowAppeals: true,
      appealWindowDays: "14",
      autoRestoreAfterFix: true,
      allowFairUseExemptions: true,
      allowEducationalExemptions: false,
      exemptionsRequireLegalApproval: true,
      notifyLegalTeam: true,
      logAllViolations: true,
      policyNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: ConfigureWatermarkRulesValues) {
    onSave?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5" />
            Configure Watermark & Attribution Rules
          </DialogTitle>
          <DialogDescription>
            Set mandatory requirements, detection thresholds, and enforcement policies
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-4">
            <h3 className="font-semibold text-blue-900">Watermark Requirements</h3>

            <BooleanField
              name="watermarkRequired"
              control={control}
              label="Watermark required on all user-generated content"
              description="Enforce watermark presence for platform protection"
            />

            <Field className="gap-1">
              <FieldLabel htmlFor="preferredWatermarkPosition">Preferred Watermark Position</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="preferredWatermarkPosition"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="preferredWatermarkPosition" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select position" />
                      </SelectTrigger>
                      <SelectContent>
                        {watermarkPositionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.preferredWatermarkPosition]} />
              </FieldContent>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="minimumSizePercent">Minimum Size (% of content)</FieldLabel>
                <FieldContent>
                  <Input id="minimumSizePercent" className="bg-gray-50" {...register("minimumSizePercent")} />
                  <FieldError errors={[errors.minimumSizePercent]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="minimumOpacityPercent">Minimum Opacity (%)</FieldLabel>
                <FieldContent>
                  <Input id="minimumOpacityPercent" className="bg-gray-50" {...register("minimumOpacityPercent")} />
                  <FieldError errors={[errors.minimumOpacityPercent]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="penaltyForWatermarkRemoval">Penalty for Watermark Removal</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="penaltyForWatermarkRemoval"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="penaltyForWatermarkRemoval" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select penalty" />
                      </SelectTrigger>
                      <SelectContent>
                        {penaltyRemovalOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.penaltyForWatermarkRemoval]} />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-4">
            <h3 className="font-semibold text-emerald-900">Attribution Requirements</h3>

            <BooleanField
              name="attributionRequired"
              control={control}
              label="Attribution required for shared/reposted content"
              description="Require proper credit to original creators"
            />

            <Field className="gap-1">
              <FieldLabel htmlFor="attributionFormat">Attribution Format</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="attributionFormat"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="attributionFormat" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributionFormatOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.attributionFormat]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="attributionPlacement">Attribution Placement</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="attributionPlacement"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="attributionPlacement" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select placement" />
                      </SelectTrigger>
                      <SelectContent>
                        {attributionPlacementOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.attributionPlacement]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="penaltyForMissingAttribution">Penalty for Missing Attribution</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="penaltyForMissingAttribution"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="penaltyForMissingAttribution" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select penalty" />
                      </SelectTrigger>
                      <SelectContent>
                        {penaltyRemovalOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.penaltyForMissingAttribution]} />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Detection Settings</h3>
            <BooleanField
              name="autoDetectWatermarkRemoval"
              control={control}
              label="Auto-detect watermark removal"
            />
            <BooleanField
              name="autoDetectWatermarkTampering"
              control={control}
              label="Auto-detect watermark obscuring/tampering"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="detectionConfidenceThreshold">Detection Confidence Threshold (%)</FieldLabel>
              <FieldContent>
                <Input id="detectionConfidenceThreshold" className="bg-gray-50" {...register("detectionConfidenceThreshold")} />
                <p className="text-sm text-muted-foreground">Minimum confidence to trigger violation (70-99%)</p>
                <FieldError errors={[errors.detectionConfidenceThreshold]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="requireManualReview"
              control={control}
              label="Require manual review before enforcement"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Enforcement Actions</h3>
            <BooleanField
              name="autoEnforcePenalties"
              control={control}
              label="Auto-enforce penalties upon detection"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="gracePeriodHours">Grace Period (Hours)</FieldLabel>
              <FieldContent>
                <Input id="gracePeriodHours" className="bg-gray-50" {...register("gracePeriodHours")} />
                <p className="text-sm text-muted-foreground">Time to fix violation before enforcement</p>
                <FieldError errors={[errors.gracePeriodHours]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="escalateRepeatViolations"
              control={control}
              label="Escalate penalties for repeat violations"
            />
            <BooleanField
              name="notifyImmediatelyUponDetection"
              control={control}
              label="Notify user immediately upon violation detection"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Penalty Escalation</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="firstViolationAction">First Violation Action</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="firstViolationAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="firstViolationAction" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {violationActionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="secondViolationAction">Second Violation Action</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="secondViolationAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="secondViolationAction" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {violationActionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="thirdViolationAction">Third Violation Action</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="thirdViolationAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger id="thirdViolationAction" className="w-full bg-gray-50">
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {violationActionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="suspensionDurationDays">Suspension Duration (Days)</FieldLabel>
              <FieldContent>
                <Input id="suspensionDurationDays" className="bg-gray-50" {...register("suspensionDurationDays")} />
                <FieldError errors={[errors.suspensionDurationDays]} />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Content Actions</h3>
            <BooleanField
              name="automaticallyRemoveViolatingContent"
              control={control}
              label="Automatically remove violating content"
            />
            <BooleanField
              name="allowAppeals"
              control={control}
              label="Allow users to appeal violations"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="appealWindowDays">Appeal Window (Days)</FieldLabel>
              <FieldContent>
                <Input id="appealWindowDays" className="bg-gray-50" {...register("appealWindowDays")} />
                <FieldError errors={[errors.appealWindowDays]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="autoRestoreAfterFix"
              control={control}
              label="Auto-restore content after user fixes violation"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Exemptions & Special Cases</h3>
            <BooleanField
              name="allowFairUseExemptions"
              control={control}
              label="Allow fair use exemptions (commentary, criticism, etc.)"
            />
            <BooleanField
              name="allowEducationalExemptions"
              control={control}
              label="Allow educational/academic use exemptions"
            />
            <BooleanField
              name="exemptionsRequireLegalApproval"
              control={control}
              label="Exemptions require legal team approval"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Additional Settings</h3>
            <BooleanField
              name="notifyLegalTeam"
              control={control}
              label="Notify legal team of all enforcement actions"
            />
            <BooleanField
              name="logAllViolations"
              control={control}
              label="Log all violations for compliance records"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="policyNotes">Policy Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="policyNotes"
                  rows={4}
                  className="bg-gray-50"
                  placeholder="Additional notes about this rules configuration"
                  {...register("policyNotes")}
                />
              </FieldContent>
            </Field>
          </section>

          <DialogFooter className="pt-4 justify-end gap-3 sm:flex-row">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Rules Configuration</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ConfigureWatermarkRulesDialog;
