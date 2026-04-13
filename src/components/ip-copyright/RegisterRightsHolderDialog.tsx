import { useEffect } from "react";
import {
  Controller,
  type Control,
  type FieldPathByValue,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { UserRoundPlus } from "lucide-react";
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

const organizationTypes = [
  "Label",
  "Studio",
  "Stock Provider",
  "Creator",
  "Publisher",
];
const verificationMethods = [
  "Business Registration",
  "Government ID",
  "Legal Certification",
];
const monitoringScopes = [
  "Platform-Wide",
  "Region-Specific",
  "Category-Specific",
];

const registerRightsHolderSchema = z.object({
  organizationName: z.string().min(1, "Organization name is required"),
  legalName: z.string().min(1, "Legal name is required"),
  organizationType: z.string().min(1, "Organization type is required"),
  country: z.string().min(1, "Country is required"),

  primaryContactName: z.string().min(1, "Primary contact name is required"),
  primaryEmail: z.string().email("Enter a valid primary email"),
  primaryPhone: z.string().optional(),
  secondaryEmail: z.string().optional(),
  legalDepartmentEmail: z.string().optional(),

  verificationMethod: z.string().min(1, "Verification method is required"),
  businessRegistrationNumber: z.string().optional(),
  taxIdEin: z.string().optional(),
  trademarkRegistrationNumbers: z.string().optional(),

  portalAccessEnabled: z.boolean(),
  selfServiceTakedownsEnabled: z.boolean(),
  bulkNoticeSubmissionEnabled: z.boolean(),
  apiAccessEnabled: z.boolean(),

  categoryMusic: z.boolean(),
  categoryFilmVideo: z.boolean(),
  categoryTvShows: z.boolean(),
  categoryImagesPhotos: z.boolean(),
  categoryBooksText: z.boolean(),
  categorySoftware: z.boolean(),
  categoryGames: z.boolean(),
  categoryPodcastsAudio: z.boolean(),

  estimatedReferenceFiles: z.string().optional(),
  monitoringScope: z.string().min(1, "Monitoring scope is required"),
  geographicRestrictions: z.string().optional(),

  preferredJurisdiction: z.string().optional(),
  dmcaAgentRegistered: z.boolean(),
  counterNoticeResponseEmail: z.string().optional(),
  legalEscalationContact: z.string().optional(),

  termsAccepted: z.boolean(
    "You must accept the rights-holder terms to continue",
  ),
  signedAgreementUploaded: z.boolean(),
  agreementDate: z.string().optional(),
  agreementRenewalDate: z.string().optional(),

  officialWebsiteUrl: z.string().optional(),
  socialMediaHandles: z.string().optional(),
  additionalNotes: z.string().optional(),

  notifyLegalTeam: z.boolean(),
  logViolationsForCompliance: z.boolean(),
});

type RegisterRightsHolderValues = z.infer<typeof registerRightsHolderSchema>;

type RegisterRightsHolderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onRegister?: (values: RegisterRightsHolderValues) => void;
};

function BooleanField({
  name,
  control,
  label,
  description,
}: {
  name: FieldPathByValue<RegisterRightsHolderValues, boolean>;
  control: Control<RegisterRightsHolderValues>;
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

function RegisterRightsHolderDialog({
  open,
  onOpenChange,
  onRegister,
}: RegisterRightsHolderDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterRightsHolderValues>({
    resolver: zodResolver(registerRightsHolderSchema),
    defaultValues: {
      organizationName: "",
      legalName: "",
      organizationType: "",
      country: "",
      primaryContactName: "",
      primaryEmail: "",
      primaryPhone: "",
      secondaryEmail: "",
      legalDepartmentEmail: "",
      verificationMethod: "Business Registration",
      businessRegistrationNumber: "",
      taxIdEin: "",
      trademarkRegistrationNumbers: "",
      portalAccessEnabled: true,
      selfServiceTakedownsEnabled: true,
      bulkNoticeSubmissionEnabled: false,
      apiAccessEnabled: false,
      categoryMusic: false,
      categoryFilmVideo: false,
      categoryTvShows: false,
      categoryImagesPhotos: false,
      categoryBooksText: false,
      categorySoftware: false,
      categoryGames: false,
      categoryPodcastsAudio: false,
      estimatedReferenceFiles: "",
      monitoringScope: "Platform-Wide",
      geographicRestrictions: "",
      preferredJurisdiction: "",
      dmcaAgentRegistered: false,
      counterNoticeResponseEmail: "",
      legalEscalationContact: "",
      termsAccepted: false,
      signedAgreementUploaded: false,
      agreementDate: "",
      agreementRenewalDate: "",
      officialWebsiteUrl: "",
      socialMediaHandles: "",
      additionalNotes: "",
      notifyLegalTeam: true,
      logViolationsForCompliance: true,
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: RegisterRightsHolderValues) {
    onRegister?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserRoundPlus className="h-5 w-5" />
            Register New Rights-Holder
          </DialogTitle>
          <DialogDescription>
            Onboard verified brands, labels, studios, and content creators
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-4">
            <h3 className="font-semibold text-blue-900">
              Organization Information
            </h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="organizationName">
                Organization Name *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="organizationName"
                  className="bg-gray-50"
                  placeholder="e.g., Universal Music Group"
                  {...register("organizationName")}
                />
                <FieldError errors={[errors.organizationName]} />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="legalName">Legal Name *</FieldLabel>
              <FieldContent>
                <Input
                  id="legalName"
                  className="bg-gray-50"
                  placeholder="Full legal entity name"
                  {...register("legalName")}
                />
                <FieldError errors={[errors.legalName]} />
              </FieldContent>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="organizationType">
                  Organization Type *
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="organizationType"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="organizationType"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          {organizationTypes.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.organizationType]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="country">Country *</FieldLabel>
                <FieldContent>
                  <Input
                    id="country"
                    className="bg-gray-50"
                    placeholder="Headquarters country"
                    {...register("country")}
                  />
                  <FieldError errors={[errors.country]} />
                </FieldContent>
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-4">
            <h3 className="font-semibold text-emerald-900">
              Contact Information
            </h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="primaryContactName">
                Primary Contact Name *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="primaryContactName"
                  className="bg-gray-50"
                  placeholder="Full name of main contact"
                  {...register("primaryContactName")}
                />
                <FieldError errors={[errors.primaryContactName]} />
              </FieldContent>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="primaryEmail">Primary Email *</FieldLabel>
                <FieldContent>
                  <Input
                    id="primaryEmail"
                    className="bg-gray-50"
                    placeholder="contact@organization.com"
                    {...register("primaryEmail")}
                  />
                  <FieldError errors={[errors.primaryEmail]} />
                </FieldContent>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="primaryPhone">Primary Phone</FieldLabel>
                <FieldContent>
                  <Input
                    id="primaryPhone"
                    className="bg-gray-50"
                    placeholder="+1 (555) 123-4567"
                    {...register("primaryPhone")}
                  />
                </FieldContent>
              </Field>
            </div>
            <Field className="gap-1">
              <FieldLabel htmlFor="secondaryEmail">
                Secondary Email (Optional)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="secondaryEmail"
                  className="bg-gray-50"
                  placeholder="backup@organization.com"
                  {...register("secondaryEmail")}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="legalDepartmentEmail">
                Legal Department Email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="legalDepartmentEmail"
                  className="bg-gray-50"
                  placeholder="legal@organization.com"
                  {...register("legalDepartmentEmail")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Verification & Identity Documents</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="verificationMethod">
                Verification Method
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="verificationMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="verificationMethod"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent>
                        {verificationMethods.map((option) => (
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
                <FieldLabel htmlFor="businessRegistrationNumber">
                  Business Registration Number
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="businessRegistrationNumber"
                    className="bg-gray-50"
                    placeholder="e.g., 12-3456789"
                    {...register("businessRegistrationNumber")}
                  />
                </FieldContent>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="taxIdEin">Tax ID / EIN</FieldLabel>
                <FieldContent>
                  <Input
                    id="taxIdEin"
                    className="bg-gray-50"
                    placeholder="e.g., 12-3456789"
                    {...register("taxIdEin")}
                  />
                </FieldContent>
              </Field>
            </div>
            <Field className="gap-1">
              <FieldLabel htmlFor="trademarkRegistrationNumbers">
                Trademark Registration Numbers (comma-separated)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="trademarkRegistrationNumbers"
                  className="bg-gray-50"
                  placeholder="e.g., 1234567, 7654321"
                  {...register("trademarkRegistrationNumbers")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-3">
            <h3 className="font-semibold">Portal Access & Capabilities</h3>
            <BooleanField
              name="portalAccessEnabled"
              control={control}
              label="Enable rights-holder portal access"
              description="Grant login credentials and dashboard access"
            />
            <BooleanField
              name="selfServiceTakedownsEnabled"
              control={control}
              label="Self-service takedown requests"
              description="Allow direct submission of DMCA notices"
            />
            <BooleanField
              name="bulkNoticeSubmissionEnabled"
              control={control}
              label="Bulk notice submission capability"
              description="Submit multiple takedown notices at once"
            />
            <BooleanField
              name="apiAccessEnabled"
              control={control}
              label="API access for automated monitoring"
              description="Programmatic access to detection and takedown APIs"
            />
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Rights & Content Information</h3>
            <div className="space-y-2">
              <p>Content Categories (Select all that apply)</p>
              <div className="grid gap-2 sm:grid-cols-2">
                <BooleanField
                  name="categoryMusic"
                  control={control}
                  label="Music"
                />
                <BooleanField
                  name="categoryFilmVideo"
                  control={control}
                  label="Film/Video"
                />
                <BooleanField
                  name="categoryTvShows"
                  control={control}
                  label="TV Shows"
                />
                <BooleanField
                  name="categoryImagesPhotos"
                  control={control}
                  label="Images/Photos"
                />
                <BooleanField
                  name="categoryBooksText"
                  control={control}
                  label="Books/Text"
                />
                <BooleanField
                  name="categorySoftware"
                  control={control}
                  label="Software"
                />
                <BooleanField
                  name="categoryGames"
                  control={control}
                  label="Games"
                />
                <BooleanField
                  name="categoryPodcastsAudio"
                  control={control}
                  label="Podcasts/Audio"
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="estimatedReferenceFiles">
                  Estimated Reference Files
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="estimatedReferenceFiles"
                    className="bg-gray-50"
                    placeholder="e.g., 5000"
                    {...register("estimatedReferenceFiles")}
                  />
                  <p className="text-sm text-muted-foreground">
                    Number of works to monitor
                  </p>
                </FieldContent>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="monitoringScope">
                  Monitoring Scope
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="monitoringScope"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="monitoringScope"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select scope" />
                        </SelectTrigger>
                        <SelectContent>
                          {monitoringScopes.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.monitoringScope]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="gap-1">
              <FieldLabel htmlFor="geographicRestrictions">
                Geographic Restrictions (Optional)
              </FieldLabel>
              <FieldContent>
                <Input
                  id="geographicRestrictions"
                  className="bg-gray-50"
                  placeholder="e.g., US, CA, UK, EU"
                  {...register("geographicRestrictions")}
                />
                <p className="text-sm text-muted-foreground">
                  Countries where rights are held (comma-separated)
                </p>
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Legal Framework</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="preferredJurisdiction">
                Preferred Jurisdiction
              </FieldLabel>
              <FieldContent>
                <Input
                  id="preferredJurisdiction"
                  className="bg-gray-50"
                  placeholder="e.g., Delaware, USA"
                  {...register("preferredJurisdiction")}
                />
              </FieldContent>
            </Field>
            <BooleanField
              name="dmcaAgentRegistered"
              control={control}
              label="DMCA agent registered with US Copyright Office"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="counterNoticeResponseEmail">
                Counter-Notice Response Email
              </FieldLabel>
              <FieldContent>
                <Input
                  id="counterNoticeResponseEmail"
                  className="bg-gray-50"
                  placeholder="counter-notices@organization.com"
                  {...register("counterNoticeResponseEmail")}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="legalEscalationContact">
                Legal Escalation Contact
              </FieldLabel>
              <FieldContent>
                <Input
                  id="legalEscalationContact"
                  className="bg-gray-50"
                  placeholder="Name and email for urgent legal matters"
                  {...register("legalEscalationContact")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-4">
            <h3 className="font-semibold text-amber-900">Agreement & Terms</h3>
            <BooleanField
              name="termsAccepted"
              control={control}
              label="I agree to the Rights-Holder Terms of Service and Platform Agreement *"
              description="Required to complete registration"
            />
            <FieldError errors={[errors.termsAccepted]} />
            <BooleanField
              name="signedAgreementUploaded"
              control={control}
              label="Signed agreement document uploaded to legal records"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="agreementDate">Agreement Date</FieldLabel>
                <FieldContent>
                  <Input
                    id="agreementDate"
                    className="bg-gray-50"
                    {...register("agreementDate")}
                  />
                </FieldContent>
              </Field>
              <Field className="gap-1">
                <FieldLabel htmlFor="agreementRenewalDate">
                  Agreement Renewal Date
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="agreementRenewalDate"
                    className="bg-gray-50"
                    {...register("agreementRenewalDate")}
                  />
                </FieldContent>
              </Field>
            </div>
          </section>

          <section className="border-t pt-4 space-y-4">
            <h3 className="font-semibold">Additional Information</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="officialWebsiteUrl">
                Official Website URL
              </FieldLabel>
              <FieldContent>
                <Input
                  id="officialWebsiteUrl"
                  className="bg-gray-50"
                  placeholder="https://www.organization.com"
                  {...register("officialWebsiteUrl")}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="socialMediaHandles">
                Social Media Handles
              </FieldLabel>
              <FieldContent>
                <Input
                  id="socialMediaHandles"
                  className="bg-gray-50"
                  placeholder="@twitter, @instagram, linkedin.com/company/name"
                  {...register("socialMediaHandles")}
                />
              </FieldContent>
            </Field>
            <Field className="gap-1">
              <FieldLabel htmlFor="additionalNotes">
                Additional Notes
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="additionalNotes"
                  rows={4}
                  className="bg-gray-50"
                  placeholder="Any additional information about this rights-holder"
                  {...register("additionalNotes")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="border-t pt-4 space-y-3">
            <BooleanField
              name="notifyLegalTeam"
              control={control}
              label="Notify legal team of all enforcement actions"
            />
            <BooleanField
              name="logViolationsForCompliance"
              control={control}
              label="Log all violations for compliance records"
            />
          </section>

          <DialogFooter className="pt-4 justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Register Rights-Holder</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default RegisterRightsHolderDialog;
