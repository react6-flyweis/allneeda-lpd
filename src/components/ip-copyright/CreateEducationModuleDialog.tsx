import { useEffect } from "react";
import {
  Controller,
  type Control,
  type FieldPathByValue,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { BookOpen } from "lucide-react";
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

const moduleTypeOptions = ["Mandatory", "Post-Strike", "Optional"];
const primaryAudienceOptions = [
  "All New Creators",
  "Users with 1+ Strike",
  "Content Creators",
  "Partner Accounts",
];
const triggerConditionOptions = [
  "When to show this module",
  "After first upload",
  "After first strike",
  "During onboarding",
];
const contentFormatOptions = [
  "Interactive (Videos + Quiz + Examples)",
  "Video Only",
  "Article + Quiz",
  "Slide Course",
];
const deliveryMethodOptions = [
  "In-Platform (Modal/Page)",
  "Email + Landing Page",
  "In-App Notification",
];
const moduleStatusOptions = ["Draft (Not published)", "Published", "Archived"];

const createEducationModuleSchema = z.object({
  moduleTitle: z.string().min(1, "Module title is required"),
  moduleType: z.string().min(1, "Module type is required"),
  moduleDescription: z.string().min(1, "Module description is required"),
  learningObjectives: z.string().optional(),

  primaryTargetAudience: z.string().min(1, "Primary audience is required"),
  requiredAccountCreation: z.boolean(),
  requiredFirstUpload: z.boolean(),
  requiredAfterStrike: z.boolean(),
  requiredAnnualRecertification: z.boolean(),
  requiredContentMonetization: z.boolean(),
  requiredAdvancedFeatures: z.boolean(),
  triggerCondition: z.string().min(1, "Trigger condition is required"),
  minimumAccountAgeDays: z.string().optional(),

  contentFormat: z.string().min(1, "Content format is required"),
  estimatedDurationMinutes: z.string().min(1, "Estimated duration is required"),
  numberOfSections: z.string().optional(),
  includeVideoContent: z.boolean(),
  includeQuizAssessment: z.boolean(),
  includeInteractiveExamples: z.boolean(),

  numberOfQuestions: z.string().optional(),
  passingScorePercent: z.string().optional(),
  allowQuizRetakes: z.boolean(),
  maximumAttempts: z.string().optional(),
  awardCertificate: z.boolean(),

  deliveryMethod: z.string().min(1, "Delivery method is required"),
  showBeforeFirstUpload: z.boolean(),
  showImmediatelyAfterStrike: z.boolean(),
  showDuringSignupFlow: z.boolean(),
  autoEnrollMatchingUsers: z.boolean(),

  trackCompletionRate: z.boolean(),
  trackTimeSpent: z.boolean(),
  trackQuizScores: z.boolean(),
  measureEffectiveness: z.boolean(),

  measureStrikeReduction: z.boolean(),
  measureTakedownReduction: z.boolean(),
  baselinePeriodDays: z.string().optional(),
  comparisonPeriodDays: z.string().optional(),

  awardPoints: z.boolean(),
  unlockAchievementBadge: z.boolean(),

  languageEnglish: z.boolean(),
  languageSpanish: z.boolean(),
  languageFrench: z.boolean(),
  languageGerman: z.boolean(),
  languagePortuguese: z.boolean(),
  languageJapanese: z.boolean(),
  languageKorean: z.boolean(),
  languageChinese: z.boolean(),
  languageHindi: z.boolean(),
  enableAutoTranslation: z.boolean(),

  moduleStatus: z.string().min(1, "Module status is required"),
  publishedDate: z.string().optional(),
  lastUpdated: z.string().optional(),
  legalReviewRequired: z.boolean(),

  allowUserFeedback: z.boolean(),
  showAdditionalResources: z.boolean(),
  resourceLinks: z.string().optional(),
  supportContactEmail: z.string().optional(),
  moduleNotes: z.string().optional(),
});

type CreateEducationModuleValues = z.infer<typeof createEducationModuleSchema>;

type CreateEducationModuleDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate?: (values: CreateEducationModuleValues) => void;
};

function BooleanField({
  name,
  control,
  label,
  description,
}: {
  name: FieldPathByValue<CreateEducationModuleValues, boolean>;
  control: Control<CreateEducationModuleValues>;
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

function CreateEducationModuleDialog({
  open,
  onOpenChange,
  onCreate,
}: CreateEducationModuleDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateEducationModuleValues>({
    resolver: zodResolver(createEducationModuleSchema),
    defaultValues: {
      moduleTitle: "",
      moduleType: "",
      moduleDescription: "",
      learningObjectives: "",
      primaryTargetAudience: "",
      requiredAccountCreation: false,
      requiredFirstUpload: false,
      requiredAfterStrike: false,
      requiredAnnualRecertification: false,
      requiredContentMonetization: false,
      requiredAdvancedFeatures: false,
      triggerCondition: "When to show this module",
      minimumAccountAgeDays: "0",
      contentFormat: "Interactive (Videos + Quiz + Examples)",
      estimatedDurationMinutes: "15",
      numberOfSections: "5",
      includeVideoContent: true,
      includeQuizAssessment: true,
      includeInteractiveExamples: true,
      numberOfQuestions: "10",
      passingScorePercent: "80",
      allowQuizRetakes: true,
      maximumAttempts: "3",
      awardCertificate: false,
      deliveryMethod: "In-Platform (Modal/Page)",
      showBeforeFirstUpload: false,
      showImmediatelyAfterStrike: false,
      showDuringSignupFlow: false,
      autoEnrollMatchingUsers: false,
      trackCompletionRate: true,
      trackTimeSpent: true,
      trackQuizScores: true,
      measureEffectiveness: true,
      measureStrikeReduction: true,
      measureTakedownReduction: true,
      baselinePeriodDays: "30",
      comparisonPeriodDays: "30",
      awardPoints: false,
      unlockAchievementBadge: false,
      languageEnglish: false,
      languageSpanish: false,
      languageFrench: false,
      languageGerman: false,
      languagePortuguese: false,
      languageJapanese: false,
      languageKorean: false,
      languageChinese: false,
      languageHindi: false,
      enableAutoTranslation: false,
      moduleStatus: "Draft (Not published)",
      publishedDate: "",
      lastUpdated: "",
      legalReviewRequired: true,
      allowUserFeedback: true,
      showAdditionalResources: true,
      resourceLinks: "",
      supportContactEmail: "support@platform.com",
      moduleNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: CreateEducationModuleValues) {
    onCreate?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Create Education Module
          </DialogTitle>
          <DialogDescription>
            Design copyright awareness and compliance training for creators
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-4">
            <h3 className="font-semibold text-blue-900">Module Information</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="moduleTitle">Module Title *</FieldLabel>
              <FieldContent>
                <Input
                  id="moduleTitle"
                  className="bg-gray-50"
                  placeholder="e.g., Copyright Basics 101"
                  {...register("moduleTitle")}
                />
                <FieldError errors={[errors.moduleTitle]} />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="moduleType">Module Type *</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="moduleType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="moduleType"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                      <SelectContent>
                        {moduleTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.moduleType]} />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="moduleDescription">
                Module Description *
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="moduleDescription"
                  rows={3}
                  className="bg-gray-50"
                  placeholder="Brief description of what this module teaches"
                  {...register("moduleDescription")}
                />
                <FieldError errors={[errors.moduleDescription]} />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="learningObjectives">
                Learning Objectives
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="learningObjectives"
                  rows={3}
                  className="bg-gray-50"
                  placeholder="What will users learn? (one per line)"
                  {...register("learningObjectives")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-4">
            <h3 className="font-semibold text-emerald-900">Target Audience</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="primaryTargetAudience">
                Primary Target Audience *
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="primaryTargetAudience"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="primaryTargetAudience"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {primaryAudienceOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.primaryTargetAudience]} />
              </FieldContent>
            </Field>

            <div className="space-y-2">
              <p>Required For (Select all that apply)</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <BooleanField
                  name="requiredAccountCreation"
                  control={control}
                  label="Account Creation"
                />
                <BooleanField
                  name="requiredFirstUpload"
                  control={control}
                  label="First Upload"
                />
                <BooleanField
                  name="requiredAfterStrike"
                  control={control}
                  label="After Strike"
                />
                <BooleanField
                  name="requiredAnnualRecertification"
                  control={control}
                  label="Annual Recertification"
                />
                <BooleanField
                  name="requiredContentMonetization"
                  control={control}
                  label="Content Monetization"
                />
                <BooleanField
                  name="requiredAdvancedFeatures"
                  control={control}
                  label="Advanced Features"
                />
              </div>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="triggerCondition">
                Trigger Condition
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="triggerCondition"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="triggerCondition"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select trigger" />
                      </SelectTrigger>
                      <SelectContent>
                        {triggerConditionOptions.map((option) => (
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
              <FieldLabel htmlFor="minimumAccountAgeDays">
                Minimum Account Age (days)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="minimumAccountAgeDays"
                  className="bg-gray-50"
                  {...register("minimumAccountAgeDays")}
                />
                <p className="text-sm text-muted-foreground">
                  Show module only after account exists for X days
                </p>
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Module Content</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="contentFormat">Content Format</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="contentFormat"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="contentFormat"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {contentFormatOptions.map((option) => (
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
              <FieldLabel htmlFor="estimatedDurationMinutes">
                Estimated Duration (minutes) *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="estimatedDurationMinutes"
                  className="bg-gray-50"
                  {...register("estimatedDurationMinutes")}
                />
                <FieldError errors={[errors.estimatedDurationMinutes]} />
              </FieldContent>
            </Field>

            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="numberOfSections">
                Number of Sections
              </FieldLabel>
              <FieldContent>
                <Input
                  id="numberOfSections"
                  className="bg-gray-50"
                  {...register("numberOfSections")}
                />
              </FieldContent>
            </Field>

            <BooleanField
              name="includeVideoContent"
              control={control}
              label="Include video content"
            />
            <BooleanField
              name="includeQuizAssessment"
              control={control}
              label="Include quiz/assessment"
            />
            <BooleanField
              name="includeInteractiveExamples"
              control={control}
              label="Include interactive examples/scenarios"
            />
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Quiz & Assessment</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="numberOfQuestions">
                  Number of Questions
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="numberOfQuestions"
                    className="bg-gray-50"
                    {...register("numberOfQuestions")}
                  />
                </FieldContent>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="passingScorePercent">
                  Passing Score (%)
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="passingScorePercent"
                    className="bg-gray-50"
                    {...register("passingScorePercent")}
                  />
                </FieldContent>
              </Field>
            </div>
            <BooleanField
              name="allowQuizRetakes"
              control={control}
              label="Allow quiz retakes"
            />
            <Field className="gap-1 max-w-sm">
              <FieldLabel htmlFor="maximumAttempts">
                Maximum Attempts
              </FieldLabel>
              <FieldContent>
                <Input
                  id="maximumAttempts"
                  className="bg-gray-50"
                  {...register("maximumAttempts")}
                />
              </FieldContent>
            </Field>
            <BooleanField
              name="awardCertificate"
              control={control}
              label="Award certificate upon completion"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Delivery Settings</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="deliveryMethod">Delivery Method</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="deliveryMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="deliveryMethod"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {deliveryMethodOptions.map((option) => (
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
              name="showBeforeFirstUpload"
              control={control}
              label="Show before first upload"
            />
            <BooleanField
              name="showImmediatelyAfterStrike"
              control={control}
              label="Show immediately after strike"
            />
            <BooleanField
              name="showDuringSignupFlow"
              control={control}
              label="Show during signup flow"
            />
            <BooleanField
              name="autoEnrollMatchingUsers"
              control={control}
              label="Auto-enroll matching users"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Tracking & Analytics</h3>
            <BooleanField
              name="trackCompletionRate"
              control={control}
              label="Track completion rate"
            />
            <BooleanField
              name="trackTimeSpent"
              control={control}
              label="Track time spent in module"
            />
            <BooleanField
              name="trackQuizScores"
              control={control}
              label="Track quiz scores and attempts"
            />
            <BooleanField
              name="measureEffectiveness"
              control={control}
              label="Measure effectiveness (behavior change)"
            />

            <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-3">
              <h4 className="font-semibold text-purple-900">
                Effectiveness Metrics
              </h4>
              <BooleanField
                name="measureStrikeReduction"
                control={control}
                label="Measure strike reduction after completion"
              />
              <BooleanField
                name="measureTakedownReduction"
                control={control}
                label="Measure takedown notice reduction"
              />
              <div className="grid gap-4 sm:grid-cols-2">
                <Field className="gap-1">
                  <FieldLabel htmlFor="baselinePeriodDays">
                    Baseline Period (days)
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="baselinePeriodDays"
                      className="bg-gray-50"
                      {...register("baselinePeriodDays")}
                    />
                    <p className="text-sm text-muted-foreground">
                      Period before module
                    </p>
                  </FieldContent>
                </Field>
                <Field className="gap-1">
                  <FieldLabel htmlFor="comparisonPeriodDays">
                    Comparison Period (days)
                  </FieldLabel>
                  <FieldContent>
                    <Input
                      id="comparisonPeriodDays"
                      className="bg-gray-50"
                      {...register("comparisonPeriodDays")}
                    />
                    <p className="text-sm text-muted-foreground">
                      Period after module
                    </p>
                  </FieldContent>
                </Field>
              </div>
            </div>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Gamification (Optional)</h3>
            <BooleanField
              name="awardPoints"
              control={control}
              label="Award points upon completion"
            />
            <BooleanField
              name="unlockAchievementBadge"
              control={control}
              label="Unlock achievement badge"
            />
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Localization</h3>
            <p>Available Languages (Select all that apply)</p>
            <div className="grid gap-2 sm:grid-cols-3">
              <BooleanField
                name="languageEnglish"
                control={control}
                label="English"
              />
              <BooleanField
                name="languageSpanish"
                control={control}
                label="Spanish"
              />
              <BooleanField
                name="languageFrench"
                control={control}
                label="French"
              />
              <BooleanField
                name="languageGerman"
                control={control}
                label="German"
              />
              <BooleanField
                name="languagePortuguese"
                control={control}
                label="Portuguese"
              />
              <BooleanField
                name="languageJapanese"
                control={control}
                label="Japanese"
              />
              <BooleanField
                name="languageKorean"
                control={control}
                label="Korean"
              />
              <BooleanField
                name="languageChinese"
                control={control}
                label="Chinese"
              />
              <BooleanField
                name="languageHindi"
                control={control}
                label="Hindi"
              />
            </div>
            <BooleanField
              name="enableAutoTranslation"
              control={control}
              label="Enable automatic translation for other languages"
            />
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Module Settings</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="moduleStatus">Module Status</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="moduleStatus"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="moduleStatus"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        {moduleStatusOptions.map((option) => (
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
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="publishedDate">Published Date</FieldLabel>
                <FieldContent>
                  <Input
                    id="publishedDate"
                    className="bg-gray-50"
                    {...register("publishedDate")}
                  />
                </FieldContent>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="lastUpdated">Last Updated</FieldLabel>
                <FieldContent>
                  <Input
                    id="lastUpdated"
                    className="bg-gray-50"
                    {...register("lastUpdated")}
                  />
                </FieldContent>
              </Field>
            </div>
            <BooleanField
              name="legalReviewRequired"
              control={control}
              label="Legal team review required before publishing"
            />
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Additional Settings</h3>
            <BooleanField
              name="allowUserFeedback"
              control={control}
              label="Allow user feedback on module"
            />
            <BooleanField
              name="showAdditionalResources"
              control={control}
              label="Show additional resources and links"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="resourceLinks">Resource Links</FieldLabel>
              <FieldContent>
                <Textarea
                  id="resourceLinks"
                  rows={3}
                  className="bg-gray-50"
                  placeholder="Additional resources (one per line)"
                  {...register("resourceLinks")}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="supportContactEmail">
                Contact Email (Support)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="supportContactEmail"
                  className="bg-gray-50"
                  {...register("supportContactEmail")}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="moduleNotes">Module Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="moduleNotes"
                  rows={4}
                  className="bg-gray-50"
                  placeholder="Internal notes about this module"
                  {...register("moduleNotes")}
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
            <Button type="submit">Create Module</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default CreateEducationModuleDialog;
