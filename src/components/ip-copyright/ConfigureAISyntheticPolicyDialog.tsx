import { useEffect } from "react";
import {
  Controller,
  type Control,
  type FieldPathByValue,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Bot } from "lucide-react";
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

const deepfakeActionOptions = [
  "Flag for Manual Review",
  "Auto Remove",
  "Restrict Visibility",
];
const consentVerificationOptions = [
  "Upload Signed Document",
  "Verified Consent Portal",
  "Third-Party Verification",
];
const labelPlacementOptions = [
  "Visible Overlay (on content)",
  "Description Field",
  "Metadata Only",
];
const watermarkStandardOptions = [
  "C2PA (Content Authenticity Initiative)",
  "Custom Invisible Watermark",
  "Platform Native Signature",
];
const platformActionOptions = [
  "Warning Only",
  "Content Removal",
  "Account Suspension",
  "Permanent Ban",
];
const reportFrequencyOptions = ["Weekly", "Monthly", "Quarterly"];

const configureAISyntheticPolicySchema = z.object({
  enableAutomatedDetection: z.boolean(),
  detectionConfidenceThreshold: z
    .string()
    .min(1, "Confidence threshold is required"),
  autoLabelDetectedContent: z.boolean(),
  requireCreatorDisclosureOnUpload: z.boolean(),

  monitorAiGeneratedImages: z.boolean(),
  monitorAiGeneratedAudioMusic: z.boolean(),
  monitorDeepfakesFaceSwaps: z.boolean(),
  monitorAiGeneratedVideo: z.boolean(),
  monitorAiGeneratedText: z.boolean(),
  monitorVoiceClones: z.boolean(),

  defaultDeepfakeAction: z
    .string()
    .min(1, "Default deepfake action is required"),
  removeCelebrityDeepfakes: z.boolean(),
  removePoliticianDeepfakes: z.boolean(),
  userReportThreshold: z.string().min(1, "Report threshold is required"),

  requireVoiceConsent: z.boolean(),
  requireLikenessConsent: z.boolean(),
  consentVerificationMethod: z
    .string()
    .min(1, "Consent verification method is required"),
  voiceCloneThreshold: z.string().min(1, "Voice clone threshold is required"),

  allowTrainingByDefault: z.boolean(),
  honorCreatorOptOut: z.boolean(),
  optOutProcessingTimeDays: z.string().min(1, "Processing time is required"),
  provideTrainingTransparencyReport: z.boolean(),

  mandatoryAiLabel: z.boolean(),
  labelPlacement: z.string().min(1, "Label placement is required"),
  labelText: z.string().min(1, "Label text is required"),
  labelColorHex: z.string().min(1, "Label color is required"),

  requireTrainingDataDisclosure: z.boolean(),
  requireModelDisclosure: z.boolean(),
  requirePromptDisclosure: z.boolean(),
  prohibitMisleadingAiContent: z.boolean(),

  embedInvisibleWatermark: z.boolean(),
  watermarkStandard: z.string().min(1, "Watermark standard is required"),
  embedCreationMetadata: z.boolean(),
  trackProvenanceHistory: z.boolean(),

  protectOriginalArtists: z.boolean(),
  styleMimicryThreshold: z
    .string()
    .min(1, "Style mimicry threshold is required"),
  autoFlagStyleCopies: z.boolean(),
  allowMonetizationAiArt: z.boolean(),

  firstViolationAction: z.string().min(1, "First violation action is required"),
  repeatViolationAction: z
    .string()
    .min(1, "Repeat violation action is required"),
  severeViolationAction: z
    .string()
    .min(1, "Severe violation action is required"),
  enableAppealProcess: z.boolean(),

  complyEuAiAct: z.boolean(),
  complyUsStateLaws: z.boolean(),
  ageGateAiContent: z.boolean(),
  requireAgeVerificationDeepfakes: z.boolean(),

  publishTransparencyReports: z.boolean(),
  reportFrequency: z.string().min(1, "Report frequency is required"),
  shareDetectionMethodsPublicly: z.boolean(),

  integrateContentIdSystem: z.boolean(),
  integrateRightsHolderPortal: z.boolean(),
  provideThirdPartyApiAccess: z.boolean(),

  gracePeriodDays: z.string().min(1, "Grace period is required"),
  applyPolicyRetroactively: z.boolean(),
  policyEffectiveDate: z.string().optional(),
  policyNotes: z.string().optional(),
});

type ConfigureAISyntheticPolicyValues = z.infer<
  typeof configureAISyntheticPolicySchema
>;

type ConfigureAISyntheticPolicyDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave?: (values: ConfigureAISyntheticPolicyValues) => void;
};

function BooleanField({
  name,
  control,
  label,
  description,
}: {
  name: FieldPathByValue<ConfigureAISyntheticPolicyValues, boolean>;
  control: Control<ConfigureAISyntheticPolicyValues>;
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
            {description ? (
              <p className="text-sm text-muted-foreground">{description}</p>
            ) : null}
          </div>
        </div>
      </FieldContent>
    </Field>
  );
}

function ConfigureAISyntheticPolicyDialog({
  open,
  onOpenChange,
  onSave,
}: ConfigureAISyntheticPolicyDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConfigureAISyntheticPolicyValues>({
    resolver: zodResolver(configureAISyntheticPolicySchema),
    defaultValues: {
      enableAutomatedDetection: true,
      detectionConfidenceThreshold: "85",
      autoLabelDetectedContent: true,
      requireCreatorDisclosureOnUpload: true,

      monitorAiGeneratedImages: true,
      monitorAiGeneratedAudioMusic: true,
      monitorDeepfakesFaceSwaps: true,
      monitorAiGeneratedVideo: true,
      monitorAiGeneratedText: true,
      monitorVoiceClones: true,

      defaultDeepfakeAction: "Flag for Manual Review",
      removeCelebrityDeepfakes: true,
      removePoliticianDeepfakes: true,
      userReportThreshold: "3",

      requireVoiceConsent: true,
      requireLikenessConsent: true,
      consentVerificationMethod: "Upload Signed Document",
      voiceCloneThreshold: "80",

      allowTrainingByDefault: false,
      honorCreatorOptOut: true,
      optOutProcessingTimeDays: "30",
      provideTrainingTransparencyReport: true,

      mandatoryAiLabel: true,
      labelPlacement: "Visible Overlay (on content)",
      labelText: "[AI Generated]",
      labelColorHex: "#FF6B00",

      requireTrainingDataDisclosure: true,
      requireModelDisclosure: false,
      requirePromptDisclosure: false,
      prohibitMisleadingAiContent: true,

      embedInvisibleWatermark: true,
      watermarkStandard: "C2PA (Content Authenticity Initiative)",
      embedCreationMetadata: true,
      trackProvenanceHistory: true,

      protectOriginalArtists: true,
      styleMimicryThreshold: "75",
      autoFlagStyleCopies: true,
      allowMonetizationAiArt: false,

      firstViolationAction: "Warning Only",
      repeatViolationAction: "Content Removal",
      severeViolationAction: "Account Suspension",
      enableAppealProcess: true,

      complyEuAiAct: true,
      complyUsStateLaws: true,
      ageGateAiContent: false,
      requireAgeVerificationDeepfakes: true,

      publishTransparencyReports: true,
      reportFrequency: "Quarterly",
      shareDetectionMethodsPublicly: false,

      integrateContentIdSystem: true,
      integrateRightsHolderPortal: true,
      provideThirdPartyApiAccess: false,

      gracePeriodDays: "7",
      applyPolicyRetroactively: false,
      policyEffectiveDate: "",
      policyNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: ConfigureAISyntheticPolicyValues) {
    onSave?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            AI & Synthetic Media Policy Settings
          </DialogTitle>
          <DialogDescription>
            Configure AI content detection, deepfake policies, and synthetic
            media governance
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-4">
            <h3 className="font-semibold text-blue-900">
              AI Content Detection
            </h3>
            <BooleanField
              name="enableAutomatedDetection"
              control={control}
              label="Enable automated AI content detection"
              description="Use ML models to detect AI-generated content"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="detectionConfidenceThreshold">
                Detection Confidence Threshold (%)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="detectionConfidenceThreshold"
                  className="bg-gray-50"
                  {...register("detectionConfidenceThreshold")}
                />
                <p className="text-sm text-muted-foreground">
                  Minimum confidence to flag content as AI-generated
                </p>
                <FieldError errors={[errors.detectionConfidenceThreshold]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="autoLabelDetectedContent"
              control={control}
              label="Automatically label detected AI content"
            />
            <BooleanField
              name="requireCreatorDisclosureOnUpload"
              control={control}
              label="Require creators to disclose AI-generated content at upload"
            />
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-3">
            <h3 className="font-semibold text-emerald-900">
              Content Types to Monitor
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              <BooleanField
                name="monitorAiGeneratedImages"
                control={control}
                label="AI-generated images"
              />
              <BooleanField
                name="monitorAiGeneratedVideo"
                control={control}
                label="AI-generated video"
              />
              <BooleanField
                name="monitorAiGeneratedAudioMusic"
                control={control}
                label="AI-generated audio/music"
              />
              <BooleanField
                name="monitorAiGeneratedText"
                control={control}
                label="AI-generated text"
              />
              <BooleanField
                name="monitorDeepfakesFaceSwaps"
                control={control}
                label="Deepfakes (face swaps)"
              />
              <BooleanField
                name="monitorVoiceClones"
                control={control}
                label="Voice clones/synthesis"
              />
            </div>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Deepfake Policy</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="defaultDeepfakeAction">
                Default Action for Detected Deepfakes
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="defaultDeepfakeAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="defaultDeepfakeAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {deepfakeActionOptions.map((option) => (
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
            <BooleanField
              name="removeCelebrityDeepfakes"
              control={control}
              label="Automatically remove celebrity deepfakes without consent"
            />
            <BooleanField
              name="removePoliticianDeepfakes"
              control={control}
              label="Automatically remove politician deepfakes (election integrity)"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="userReportThreshold">
                User Report Threshold for Review
              </FieldLabel>
              <FieldContent>
                <Input
                  id="userReportThreshold"
                  className="bg-gray-50"
                  {...register("userReportThreshold")}
                />
                <p className="text-sm text-muted-foreground">
                  Number of user reports before escalation
                </p>
                <FieldError errors={[errors.userReportThreshold]} />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Voice & Likeness Rights</h3>
            <BooleanField
              name="requireVoiceConsent"
              control={control}
              label="Require documented consent for voice cloning/synthesis"
            />
            <BooleanField
              name="requireLikenessConsent"
              control={control}
              label="Require documented consent for likeness/face usage"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="consentVerificationMethod">
                Consent Verification Method
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="consentVerificationMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="consentVerificationMethod"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {consentVerificationOptions.map((option) => (
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
              <FieldLabel htmlFor="voiceCloneThreshold">
                Voice Clone Detection Threshold (%)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="voiceCloneThreshold"
                  className="bg-gray-50"
                  {...register("voiceCloneThreshold")}
                />
                <p className="text-sm text-muted-foreground">
                  Similarity threshold to flag voice cloning
                </p>
                <FieldError errors={[errors.voiceCloneThreshold]} />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3">
            <h3 className="font-semibold text-purple-900">
              Training Data Policies
            </h3>
            <BooleanField
              name="allowTrainingByDefault"
              control={control}
              label="Allow platform content to be used for AI training by default"
              description="If disabled, opt-in required from creators"
            />
            <BooleanField
              name="honorCreatorOptOut"
              control={control}
              label="Honor creator opt-out requests for AI training data"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="optOutProcessingTimeDays">
                Opt-Out Processing Time (days)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="optOutProcessingTimeDays"
                  className="bg-gray-50"
                  {...register("optOutProcessingTimeDays")}
                />
                <p className="text-sm text-muted-foreground">
                  Maximum time to process opt-out requests
                </p>
                <FieldError errors={[errors.optOutProcessingTimeDays]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="provideTrainingTransparencyReport"
              control={control}
              label="Provide transparency report on training data usage"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Labeling Requirements</h3>
            <BooleanField
              name="mandatoryAiLabel"
              control={control}
              label="Mandatory AI-generated label on all AI content"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="labelPlacement">Label Placement</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="labelPlacement"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="labelPlacement"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select placement" />
                      </SelectTrigger>
                      <SelectContent>
                        {labelPlacementOptions.map((option) => (
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
              <FieldLabel htmlFor="labelText">Label Text</FieldLabel>
              <FieldContent>
                <Input
                  id="labelText"
                  className="bg-gray-50"
                  {...register("labelText")}
                />
                <FieldError errors={[errors.labelText]} />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="labelColorHex">Label Color (Hex)</FieldLabel>
              <FieldContent>
                <div className="flex items-center gap-3">
                  <Input className="w-20 bg-gray-50" value="#" readOnly />
                  <Input
                    id="labelColorHex"
                    className="bg-gray-50"
                    {...register("labelColorHex")}
                  />
                </div>
                <FieldError errors={[errors.labelColorHex]} />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Creator Obligations</h3>
            <BooleanField
              name="requireTrainingDataDisclosure"
              control={control}
              label="Require disclosure of training data sources"
            />
            <BooleanField
              name="requireModelDisclosure"
              control={control}
              label="Require disclosure of AI model used"
            />
            <BooleanField
              name="requirePromptDisclosure"
              control={control}
              label="Require disclosure of prompts used"
            />
            <BooleanField
              name="prohibitMisleadingAiContent"
              control={control}
              label="Prohibit misleading AI content (fake news, impersonation)"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Synthetic Media Standards</h3>
            <BooleanField
              name="embedInvisibleWatermark"
              control={control}
              label="Embed invisible watermark in synthetic media"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="watermarkStandard">
                Watermark Standard
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="watermarkStandard"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="watermarkStandard"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select standard" />
                      </SelectTrigger>
                      <SelectContent>
                        {watermarkStandardOptions.map((option) => (
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
            <BooleanField
              name="embedCreationMetadata"
              control={control}
              label="Embed creation metadata (model, timestamp, etc.)"
            />
            <BooleanField
              name="trackProvenanceHistory"
              control={control}
              label="Track content provenance and modification history"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Rights Management</h3>
            <BooleanField
              name="protectOriginalArtists"
              control={control}
              label="Protect original artists from unauthorized AI style mimicry"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="styleMimicryThreshold">
                Style Mimicry Detection Threshold (%)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="styleMimicryThreshold"
                  className="bg-gray-50"
                  {...register("styleMimicryThreshold")}
                />
                <p className="text-sm text-muted-foreground">
                  Similarity threshold to flag style copying
                </p>
                <FieldError errors={[errors.styleMimicryThreshold]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="autoFlagStyleCopies"
              control={control}
              label="Automatically flag potential style copies for review"
            />
            <BooleanField
              name="allowMonetizationAiArt"
              control={control}
              label="Allow monetization of AI-generated art"
            />
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-3">
            <h3 className="font-semibold text-amber-900">
              Platform Actions & Enforcement
            </h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="firstViolationAction">
                First Violation Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="firstViolationAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="firstViolationAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformActionOptions.map((option) => (
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
              <FieldLabel htmlFor="repeatViolationAction">
                Repeat Violation Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="repeatViolationAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="repeatViolationAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformActionOptions.map((option) => (
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
              <FieldLabel htmlFor="severeViolationAction">
                Severe Violation Action
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="severeViolationAction"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="severeViolationAction"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select action" />
                      </SelectTrigger>
                      <SelectContent>
                        {platformActionOptions.map((option) => (
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
            <BooleanField
              name="enableAppealProcess"
              control={control}
              label="Enable appeal process for enforcement actions"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Compliance & Legal</h3>
            <BooleanField
              name="complyEuAiAct"
              control={control}
              label="Comply with EU AI Act requirements"
            />
            <BooleanField
              name="complyUsStateLaws"
              control={control}
              label="Comply with US state laws (CA, TX, TN, etc.)"
            />
            <BooleanField
              name="ageGateAiContent"
              control={control}
              label="Age-gate AI-generated content"
            />
            <BooleanField
              name="requireAgeVerificationDeepfakes"
              control={control}
              label="Require age verification for deepfake creation tools"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Reporting & Transparency</h3>
            <BooleanField
              name="publishTransparencyReports"
              control={control}
              label="Publish public AI transparency reports"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="reportFrequency">
                Report Frequency
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="reportFrequency"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="reportFrequency"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportFrequencyOptions.map((option) => (
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
            <BooleanField
              name="shareDetectionMethodsPublicly"
              control={control}
              label="Share AI detection methods and accuracy metrics publicly"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Integration Settings</h3>
            <BooleanField
              name="integrateContentIdSystem"
              control={control}
              label="Integrate with Content ID system"
            />
            <BooleanField
              name="integrateRightsHolderPortal"
              control={control}
              label="Integrate with Rights-Holder Portal"
            />
            <BooleanField
              name="provideThirdPartyApiAccess"
              control={control}
              label="Provide API access for third-party AI detection tools"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Additional Settings</h3>
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="gracePeriodDays">
                Grace Period for Compliance (days)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="gracePeriodDays"
                  className="bg-gray-50"
                  {...register("gracePeriodDays")}
                />
                <p className="text-sm text-muted-foreground">
                  Days to allow creators to comply with new policies
                </p>
                <FieldError errors={[errors.gracePeriodDays]} />
              </FieldContent>
            </Field>
            <BooleanField
              name="applyPolicyRetroactively"
              control={control}
              label="Apply policy retroactively to existing content"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="policyEffectiveDate">
                Policy Effective Date
              </FieldLabel>
              <FieldContent>
                <Input
                  id="policyEffectiveDate"
                  className="bg-gray-50"
                  {...register("policyEffectiveDate")}
                />
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
            <Button type="submit">Save AI Policy Settings</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ConfigureAISyntheticPolicyDialog;
