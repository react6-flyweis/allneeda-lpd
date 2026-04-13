import { useEffect } from "react";
import {
  Controller,
  type Control,
  type FieldPathByValue,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Shield } from "lucide-react";
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

const brandTypeOptions = [
  "Corporate Brand",
  "Personal Brand",
  "Product Line",
  "Retail Brand",
];
const industryCategoryOptions = [
  "Technology",
  "Fashion",
  "Consumer Goods",
  "Media & Entertainment",
  "Healthcare",
  "Finance",
];
const alertThresholdOptions = [
  "High (Critical matches only)",
  "Medium (Alert on likely matches)",
  "Low (Alert on broad similarity)",
];
const preferredActionOptions = [
  "Immediate Takedown",
  "Warning + Grace Period",
  "Manual Legal Review",
];
const escalationCriteriaOptions = [
  "Repeat Violator",
  "High-Risk Platform",
  "Severe Reputation Harm",
];
const registryStatusOptions = [
  "Pending Review",
  "Under Verification",
  "Approved",
  "Rejected",
];
const verificationStatusOptions = [
  "Not Verified",
  "Partially Verified",
  "Verified",
];
const registryTierOptions = [
  "Standard (Basic protection)",
  "Advanced (Priority handling)",
  "Enterprise (Dedicated support)",
];

const brandRegistrySchema = z.object({
  brandName: z.string().min(1, "Brand name is required"),
  legalEntityName: z.string().min(1, "Legal entity name is required"),
  brandType: z.string().min(1, "Brand type is required"),
  industryCategory: z.string().min(1, "Industry category is required"),
  brandDescription: z.string().optional(),

  primaryContactName: z.string().optional(),
  primaryContactEmail: z
    .string()
    .email("Enter a valid email")
    .or(z.literal("")),
  primaryContactPhone: z.string().optional(),
  legalDepartmentEmail: z
    .string()
    .email("Enter a valid email")
    .or(z.literal("")),

  hasRegisteredTrademark: z.boolean(),

  brandLogoUrl: z.string().optional(),
  brandColors: z.string().optional(),
  brandFonts: z.string().optional(),
  officialDomains: z.string().optional(),
  officialSocialHandles: z.string().optional(),

  businessRegistrationDocument: z.string().optional(),
  trademarkCertificate: z.string().optional(),
  authorizationLetter: z.string().optional(),
  governmentIssuedId: z.string().optional(),

  protectBrandName: z.boolean(),
  protectLogoMarks: z.boolean(),
  protectTaglinesSlogans: z.boolean(),
  protectProductTradeDress: z.boolean(),
  protectedKeywordsPhrases: z.string().optional(),

  monitorImpersonationAccounts: z.boolean(),
  monitorCounterfeitProducts: z.boolean(),
  monitorUnauthorizedResale: z.boolean(),
  monitorTrademarkMisuse: z.boolean(),
  alertThreshold: z.string().min(1, "Alert threshold is required"),

  preferredActionForViolations: z
    .string()
    .min(1, "Preferred action is required"),
  requireLegalTeamReview: z.boolean(),
  autoApproveClearViolations: z.boolean(),
  escalationCriteria: z.string().min(1, "Escalation criteria is required"),

  worldwideProtection: z.boolean(),
  territoryUnitedStates: z.boolean(),
  territoryCanada: z.boolean(),
  territoryEuropeanUnion: z.boolean(),
  territoryUnitedKingdom: z.boolean(),
  territoryAustralia: z.boolean(),
  territoryJapan: z.boolean(),
  territoryChina: z.boolean(),
  territoryIndia: z.boolean(),
  territoryBrazil: z.boolean(),

  authorizedResellers: z.string().optional(),
  authorizedAffiliates: z.string().optional(),
  verifiedOfficialAccounts: z.string().optional(),

  allowFanContent: z.boolean(),
  allowParodySatire: z.boolean(),
  allowReviewCommentary: z.boolean(),
  requireNonOfficialDisclaimer: z.boolean(),

  registryStatus: z.string().min(1, "Registry status is required"),
  verificationStatus: z.string().min(1, "Verification status is required"),
  registryTier: z.string().min(1, "Registry tier is required"),
  registryExpirationDate: z.string().optional(),

  specialInstructions: z.string().optional(),
  registryNotes: z.string().optional(),
});

type BrandRegistryValues = z.infer<typeof brandRegistrySchema>;

type BrandRegistryDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmitRegistry?: (values: BrandRegistryValues) => void;
};

function BooleanField({
  name,
  control,
  label,
}: {
  name: FieldPathByValue<BrandRegistryValues, boolean>;
  control: Control<BrandRegistryValues>;
  label: string;
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
          <p>{label}</p>
        </div>
      </FieldContent>
    </Field>
  );
}

function BrandRegistryDialog({
  open,
  onOpenChange,
  onSubmitRegistry,
}: BrandRegistryDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<BrandRegistryValues>({
    resolver: zodResolver(brandRegistrySchema),
    defaultValues: {
      brandName: "",
      legalEntityName: "",
      brandType: "",
      industryCategory: "",
      brandDescription: "",
      primaryContactName: "",
      primaryContactEmail: "",
      primaryContactPhone: "",
      legalDepartmentEmail: "",
      hasRegisteredTrademark: false,
      brandLogoUrl: "",
      brandColors: "",
      brandFonts: "",
      officialDomains: "",
      officialSocialHandles: "",
      businessRegistrationDocument: "",
      trademarkCertificate: "",
      authorizationLetter: "",
      governmentIssuedId: "",
      protectBrandName: true,
      protectLogoMarks: true,
      protectTaglinesSlogans: true,
      protectProductTradeDress: false,
      protectedKeywordsPhrases: "",
      monitorImpersonationAccounts: true,
      monitorCounterfeitProducts: true,
      monitorUnauthorizedResale: true,
      monitorTrademarkMisuse: true,
      alertThreshold: "Medium (Alert on likely matches)",
      preferredActionForViolations: "Immediate Takedown",
      requireLegalTeamReview: false,
      autoApproveClearViolations: true,
      escalationCriteria: "Repeat Violator",
      worldwideProtection: false,
      territoryUnitedStates: false,
      territoryCanada: false,
      territoryEuropeanUnion: false,
      territoryUnitedKingdom: false,
      territoryAustralia: false,
      territoryJapan: false,
      territoryChina: false,
      territoryIndia: false,
      territoryBrazil: false,
      authorizedResellers: "",
      authorizedAffiliates: "",
      verifiedOfficialAccounts: "",
      allowFanContent: true,
      allowParodySatire: true,
      allowReviewCommentary: true,
      requireNonOfficialDisclaimer: true,
      registryStatus: "Pending Review",
      verificationStatus: "Not Verified",
      registryTier: "Standard (Basic protection)",
      registryExpirationDate: "",
      specialInstructions: "",
      registryNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: BrandRegistryValues) {
    onSubmitRegistry?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Brand Registry
          </DialogTitle>
          <DialogDescription>
            Register your brand for trademark protection and impersonation
            monitoring
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-4">
            <h3 className="font-semibold text-blue-900">Brand Information</h3>

            <Field className="gap-1">
              <FieldLabel htmlFor="brandName">Brand Name *</FieldLabel>
              <FieldContent>
                <Input
                  id="brandName"
                  className="bg-gray-50"
                  placeholder="e.g., Nike, Apple, Tesla"
                  {...register("brandName")}
                />
                <FieldError errors={[errors.brandName]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="legalEntityName">
                Legal Entity Name *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="legalEntityName"
                  className="bg-gray-50"
                  placeholder="Registered company name"
                  {...register("legalEntityName")}
                />
                <FieldError errors={[errors.legalEntityName]} />
              </FieldContent>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="brandType">Brand Type *</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="brandType"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="brandType"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {brandTypeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.brandType]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="industryCategory">
                  Industry Category *
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="industryCategory"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="industryCategory"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {industryCategoryOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.industryCategory]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="brandDescription">
                Brand Description
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="brandDescription"
                  className="bg-gray-50 min-h-22"
                  placeholder="Brief description of your brand and products/services"
                  {...register("brandDescription")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-4">
            <h3 className="font-semibold text-emerald-900">
              Contact Information
            </h3>

            <Field className="gap-1">
              <FieldLabel htmlFor="primaryContactName">
                Primary Contact Name
              </FieldLabel>
              <FieldContent>
                <Input
                  id="primaryContactName"
                  className="bg-gray-50"
                  placeholder="Full name"
                  {...register("primaryContactName")}
                />
              </FieldContent>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="primaryContactEmail">
                  Primary Contact Email *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="primaryContactEmail"
                    className="bg-gray-50"
                    placeholder="contact@brand.com"
                    {...register("primaryContactEmail")}
                  />
                  <FieldError errors={[errors.primaryContactEmail]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="primaryContactPhone">
                  Primary Contact Phone
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="primaryContactPhone"
                    className="bg-gray-50"
                    placeholder="+1 (555) 123-4567"
                    {...register("primaryContactPhone")}
                  />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="legalDepartmentEmail">
                Legal Department Email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="legalDepartmentEmail"
                  className="bg-gray-50"
                  placeholder="legal@brand.com"
                  {...register("legalDepartmentEmail")}
                />
                <FieldError errors={[errors.legalDepartmentEmail]} />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Trademark Information</h3>
            <BooleanField
              name="hasRegisteredTrademark"
              control={control}
              label="I have a registered trademark"
            />
            <p className="text-sm text-muted-foreground -mt-3">
              Check this if your brand has an official trademark registration
            </p>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Brand Assets</h3>

            <Field className="gap-1">
              <FieldLabel htmlFor="brandLogoUrl">Brand Logo URL</FieldLabel>
              <FieldContent>
                <Input
                  id="brandLogoUrl"
                  className="bg-gray-50"
                  placeholder="https://brand.com/logo.png"
                  {...register("brandLogoUrl")}
                />
              </FieldContent>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="brandColors">
                  Brand Colors (Hex Codes)
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="brandColors"
                    className="bg-gray-50"
                    placeholder="#000000, #FFFFFF"
                    {...register("brandColors")}
                  />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="brandFonts">Brand Fonts</FieldLabel>
                <FieldContent>
                  <Input
                    id="brandFonts"
                    className="bg-gray-50"
                    placeholder="Helvetica, Arial"
                    {...register("brandFonts")}
                  />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="officialDomains">
                Official Domains/Websites
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="officialDomains"
                  className="bg-gray-50 min-h-20"
                  placeholder="brand.com, shop.brand.com (one per line)"
                  {...register("officialDomains")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="officialSocialHandles">
                Official Social Media Handles
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="officialSocialHandles"
                  className="bg-gray-50 min-h-20"
                  placeholder="@brandname on Twitter, @brandname on Instagram (one per line)"
                  {...register("officialSocialHandles")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-violet-200 bg-violet-50 p-4 space-y-4">
            <h3 className="font-semibold text-violet-900">
              Verification Documents
            </h3>
            <p className="text-sm text-muted-foreground">
              Upload documents to verify brand ownership
            </p>

            <Field className="gap-1">
              <FieldLabel htmlFor="businessRegistrationDocument">
                Business Registration Document
              </FieldLabel>
              <FieldContent>
                <Input
                  id="businessRegistrationDocument"
                  className="bg-gray-50"
                  placeholder="Articles of incorporation, business license, etc."
                  {...register("businessRegistrationDocument")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="trademarkCertificate">
                Trademark Certificate
              </FieldLabel>
              <FieldContent>
                <Input
                  id="trademarkCertificate"
                  className="bg-gray-50"
                  placeholder="Official trademark registration certificate"
                  {...register("trademarkCertificate")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="authorizationLetter">
                Authorization Letter
              </FieldLabel>
              <FieldContent>
                <Input
                  id="authorizationLetter"
                  className="bg-gray-50"
                  placeholder="Letter authorizing you to represent the brand"
                  {...register("authorizationLetter")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="governmentIssuedId">
                Government-Issued ID
              </FieldLabel>
              <FieldContent>
                <Input
                  id="governmentIssuedId"
                  className="bg-gray-50"
                  placeholder="For identity verification"
                  {...register("governmentIssuedId")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Protection Scope</h3>

            <BooleanField
              name="protectBrandName"
              control={control}
              label="Protect brand name from unauthorized use"
            />
            <BooleanField
              name="protectLogoMarks"
              control={control}
              label="Protect logo and brand marks"
            />
            <BooleanField
              name="protectTaglinesSlogans"
              control={control}
              label="Protect taglines and slogans"
            />
            <BooleanField
              name="protectProductTradeDress"
              control={control}
              label="Protect product design and trade dress"
            />

            <Field className="gap-1">
              <FieldLabel htmlFor="protectedKeywordsPhrases">
                Protected Keywords/Phrases
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="protectedKeywordsPhrases"
                  className="bg-gray-50 min-h-20"
                  placeholder="List keywords to monitor (one per line)"
                  {...register("protectedKeywordsPhrases")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Monitoring Preferences</h3>

            <BooleanField
              name="monitorImpersonationAccounts"
              control={control}
              label="Monitor for impersonation accounts"
            />
            <BooleanField
              name="monitorCounterfeitProducts"
              control={control}
              label="Monitor for counterfeit products"
            />
            <BooleanField
              name="monitorUnauthorizedResale"
              control={control}
              label="Monitor for unauthorized resale"
            />
            <BooleanField
              name="monitorTrademarkMisuse"
              control={control}
              label="Monitor for trademark misuse"
            />

            <Field className="gap-1">
              <FieldLabel htmlFor="alertThreshold">Alert Threshold</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="alertThreshold"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="alertThreshold"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select threshold" />
                      </SelectTrigger>
                      <SelectContent>
                        {alertThresholdOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.alertThreshold]} />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-4">
            <h3 className="font-semibold text-amber-900">
              Enforcement Preferences
            </h3>

            <Field className="gap-1">
              <FieldLabel htmlFor="preferredActionForViolations">
                Preferred Action for Violations
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="preferredActionForViolations"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="preferredActionForViolations"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select preferred action" />
                      </SelectTrigger>
                      <SelectContent>
                        {preferredActionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.preferredActionForViolations]} />
              </FieldContent>
            </Field>

            <BooleanField
              name="requireLegalTeamReview"
              control={control}
              label="Require legal team review before enforcement action"
            />

            <BooleanField
              name="autoApproveClearViolations"
              control={control}
              label="Auto-approve enforcement for clear violations"
            />

            <Field className="gap-1">
              <FieldLabel htmlFor="escalationCriteria">
                Escalation Criteria
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="escalationCriteria"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="escalationCriteria"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select escalation criteria" />
                      </SelectTrigger>
                      <SelectContent>
                        {escalationCriteriaOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.escalationCriteria]} />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Geographic Scope</h3>

            <BooleanField
              name="worldwideProtection"
              control={control}
              label="Worldwide protection (all territories)"
            />

            <div className="space-y-2">
              <p className="text-sm font-medium">Protection Territories</p>
              <div className="grid gap-2 sm:grid-cols-3">
                <BooleanField
                  name="territoryUnitedStates"
                  control={control}
                  label="United States"
                />
                <BooleanField
                  name="territoryCanada"
                  control={control}
                  label="Canada"
                />
                <BooleanField
                  name="territoryEuropeanUnion"
                  control={control}
                  label="European Union"
                />
                <BooleanField
                  name="territoryUnitedKingdom"
                  control={control}
                  label="United Kingdom"
                />
                <BooleanField
                  name="territoryAustralia"
                  control={control}
                  label="Australia"
                />
                <BooleanField
                  name="territoryJapan"
                  control={control}
                  label="Japan"
                />
                <BooleanField
                  name="territoryChina"
                  control={control}
                  label="China"
                />
                <BooleanField
                  name="territoryIndia"
                  control={control}
                  label="India"
                />
                <BooleanField
                  name="territoryBrazil"
                  control={control}
                  label="Brazil"
                />
              </div>
            </div>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Authorized Partners</h3>

            <Field className="gap-1">
              <FieldLabel htmlFor="authorizedResellers">
                Authorized Resellers
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="authorizedResellers"
                  className="bg-gray-50 min-h-20"
                  placeholder="List authorized reseller accounts (one per line)"
                  {...register("authorizedResellers")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="authorizedAffiliates">
                Authorized Affiliates
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="authorizedAffiliates"
                  className="bg-gray-50 min-h-20"
                  placeholder="List authorized affiliate accounts (one per line)"
                  {...register("authorizedAffiliates")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="verifiedOfficialAccounts">
                Verified Official Accounts
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="verifiedOfficialAccounts"
                  className="bg-gray-50 min-h-20"
                  placeholder="List verified accounts owned by your brand (one per line)"
                  {...register("verifiedOfficialAccounts")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Content Policies</h3>
            <BooleanField
              name="allowFanContent"
              control={control}
              label="Allow fan-created content (fan art, tributes, etc.)"
            />
            <BooleanField
              name="allowParodySatire"
              control={control}
              label="Allow parody and satire content"
            />
            <BooleanField
              name="allowReviewCommentary"
              control={control}
              label="Allow review and commentary content"
            />
            <BooleanField
              name="requireNonOfficialDisclaimer"
              control={control}
              label="Require disclaimer for non-official content"
            />
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Registry Settings</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="registryStatus">
                  Registry Status
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="registryStatus"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="registryStatus"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {registryStatusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.registryStatus]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="verificationStatus">
                  Verification Status
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="verificationStatus"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="verificationStatus"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {verificationStatusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.verificationStatus]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="registryTier">Registry Tier</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="registryTier"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="registryTier"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select tier" />
                      </SelectTrigger>
                      <SelectContent>
                        {registryTierOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.registryTier]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="registryExpirationDate">
                Registry Expiration Date
              </FieldLabel>
              <FieldContent>
                <Input
                  id="registryExpirationDate"
                  className="bg-gray-50"
                  placeholder=""
                  {...register("registryExpirationDate")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Additional Information</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="specialInstructions">
                Special Instructions
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="specialInstructions"
                  className="bg-gray-50 min-h-20"
                  placeholder="Any special instructions for brand protection team"
                  {...register("specialInstructions")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="registryNotes">Registry Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="registryNotes"
                  className="bg-gray-50 min-h-20"
                  placeholder="Internal notes about this registry entry"
                  {...register("registryNotes")}
                />
              </FieldContent>
            </Field>
          </section>

          <DialogFooter className="pb-1">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Brand Registry</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default BrandRegistryDialog;
