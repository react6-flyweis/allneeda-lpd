import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { FileText, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
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

export type ContractRequest = {
  id: string;
  type: string;
  urgencyLevel?: string;
  vendor: string;
  requester: string;
  businessJustification?: string;
  estimatedValue?: string;
  executionDate?: string;
  department?: string;
  businessVertical?: string;
  specialTerms?: string;
  status: "approval" | "signed" | "review" | "draft";
  created: string;
};

const reviewSchema = z.object({
  reviewerName: z.string().min(1, "Enter reviewer name"),
  legalNotes: z.string().min(1, "Enter legal notes"),
  riskAssessment: z.string().min(1, "Select risk level"),
  recommendedChanges: z.string().optional(),
  termsToNegotiate: z.string().optional(),
  complianceIssues: z.string().optional(),
  reviewDecision: z.string().min(1, "Select review decision"),
  nextSteps: z.string().optional(),
  gdprCompliance: z.boolean().optional(),
  ccpaCompliance: z.boolean().optional(),
  soc2Compliance: z.boolean().optional(),
  hipaaCompliance: z.boolean().optional(),
  liabilityConcerns: z.boolean().optional(),
  indemnificationReview: z.boolean().optional(),
  dataPrivacyReview: z.boolean().optional(),
  ipRightsReview: z.boolean().optional(),
});

type ReviewContractRequestFormValues = z.infer<typeof reviewSchema>;

const riskOptions = ["Critical", "High", "Medium", "Low"];
const reviewDecisionOptions = [
  "Approve",
  "Approve with Changes",
  "Request Changes",
  "Reject",
];

interface ReviewContractRequestDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  request: ContractRequest | null;
  onComplete?: (values: ReviewContractRequestFormValues) => void;
}

export default function ReviewContractRequestDialog({
  open,
  onOpenChange,
  request,
  onComplete,
}: ReviewContractRequestDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitted },
  } = useForm<ReviewContractRequestFormValues>({
    resolver: zodResolver(reviewSchema),
    defaultValues: {
      reviewerName: "",
      legalNotes: "",
      riskAssessment: "",
      recommendedChanges: "",
      termsToNegotiate: "",
      complianceIssues: "",
      reviewDecision: "",
      nextSteps: "",
      gdprCompliance: false,
      ccpaCompliance: false,
      soc2Compliance: false,
      hipaaCompliance: false,
      liabilityConcerns: false,
      indemnificationReview: false,
      dataPrivacyReview: false,
      ipRightsReview: false,
    },
  });

  useEffect(() => {
    reset({
      reviewerName: "",
      legalNotes: "",
      riskAssessment: "",
      recommendedChanges: "",
      termsToNegotiate: "",
      complianceIssues: "",
      reviewDecision: "",
      nextSteps: "",
      gdprCompliance: false,
      ccpaCompliance: false,
      soc2Compliance: false,
      hipaaCompliance: false,
      liabilityConcerns: false,
      indemnificationReview: false,
      dataPrivacyReview: false,
      ipRightsReview: false,
    });
  }, [request, reset]);

  const onSubmit = (values: ReviewContractRequestFormValues) => {
    onComplete?.(values);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <FileText className="size-5" />
            <DialogTitle>Review Contract Request</DialogTitle>
          </div>
          <DialogDescription>
            Review and provide feedback on a contract request.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 mt-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full bg-slate-200 p-2 text-slate-700">
              <Info className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Contract Review Process
              </p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                Review the contract request, provide legal notes, assess risk,
                and make recommendations for changes or approval.
              </p>
            </div>
          </div>
        </div>

        <form className="grid gap-6 py-4" onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="contract-type">Contract Type</Label>
              <Input
                className="bg-gray-50"
                id="contract-type"
                value={request?.type ?? ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="urgency-level">Urgency Level</Label>
              <Input
                className="bg-gray-50"
                id="urgency-level"
                value={request?.urgencyLevel ?? ""}
                disabled
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="vendor-name">Vendor/Partner Name</Label>
              <Input
                className="bg-gray-50"
                id="vendor-name"
                value={request?.vendor ?? ""}
                disabled
              />
              <p className="text-sm text-slate-500">
                Legal entity name of the other party
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="requester-name">Requester Name</Label>
              <Input
                className="bg-gray-50"
                id="requester-name"
                value={request?.requester ?? ""}
                disabled
              />
              <p className="text-sm text-slate-500">
                Business stakeholder requesting contract
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business-justification">
              Business Justification
            </Label>
            <Textarea
              className="bg-gray-50"
              id="business-justification"
              value={request?.businessJustification ?? ""}
              readOnly
              rows={5}
            />
            <p className="text-sm text-slate-500">
              Detailed explanation of why this contract is needed
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="estimated-value">Estimated Contract Value</Label>
              <Input
                className="bg-gray-50"
                id="estimated-value"
                value={request?.estimatedValue ?? ""}
                disabled
              />
              <p className="text-sm text-slate-500">
                Total contract value or annual spend
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="execution-date">Desired Execution Date</Label>
              <Input
                className="bg-gray-50"
                id="execution-date"
                value={request?.executionDate ?? ""}
                disabled
              />
              <p className="text-sm text-slate-500">
                Target date for signed agreement
              </p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="department">Department</Label>
              <Input
                className="bg-gray-50"
                id="department"
                value={request?.department ?? ""}
                disabled
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="business-vertical">Business Vertical</Label>
              <Input
                className="bg-gray-50"
                id="business-vertical"
                value={request?.businessVertical ?? ""}
                disabled
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="special-terms">Special Terms or Requirements</Label>
            <Textarea
              className="bg-gray-50"
              id="special-terms"
              value={request?.specialTerms ?? ""}
              rows={4}
              readOnly
            />
            <p className="text-sm text-slate-500">
              Any non-standard terms or specific requirements
            </p>
          </div>

          <section className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="mb-4 flex items-center gap-2">
              <div className="rounded-full bg-slate-100 p-2 text-slate-700">
                <Info className="h-4 w-4" />
              </div>
              <h3 className="text-sm font-semibold text-slate-900">
                Compliance Requirements
              </h3>
            </div>
            <div className="grid gap-3">
              <div className="flex items-center gap-3 ">
                <Controller
                  control={control}
                  name="gdprCompliance"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    GDPR Compliance Required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 ">
                <Controller
                  control={control}
                  name="ccpaCompliance"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    CCPA Compliance Required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 ">
                <Controller
                  control={control}
                  name="soc2Compliance"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    SOC 2 Compliance Required
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 ">
                <Controller
                  control={control}
                  name="hipaaCompliance"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    HIPAA Compliance Required
                  </p>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-2">
            <Label htmlFor="reviewer-name">Reviewer Name *</Label>
            <Input
              className="bg-gray-50"
              id="reviewer-name"
              placeholder="e.g., John Doe"
              {...register("reviewerName")}
            />
            {errors.reviewerName && (
              <p className="text-sm text-rose-600">
                {errors.reviewerName.message}
              </p>
            )}
            <p className="text-sm text-slate-500">Name of the legal reviewer</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="legal-notes">Legal Notes *</Label>
            <Textarea
              className="bg-gray-50"
              id="legal-notes"
              rows={5}
              placeholder="Provide detailed legal notes and observations..."
              {...register("legalNotes")}
            />
            {errors.legalNotes && (
              <p className="text-sm text-rose-600">
                {errors.legalNotes.message}
              </p>
            )}
            <p className="text-sm text-slate-500">
              Detailed legal notes and observations
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="risk-assessment">Risk Assessment *</Label>
            <Controller
              control={control}
              name="riskAssessment"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select risk level" />
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
            {errors.riskAssessment && (
              <p className="text-sm text-rose-600">
                {errors.riskAssessment.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="recommended-changes">Recommended Changes</Label>
            <Textarea
              className="bg-gray-50"
              id="recommended-changes"
              rows={4}
              placeholder="Document any recommended changes or clarifications..."
              {...register("recommendedChanges")}
            />
            <p className="text-sm text-slate-500">
              Any recommended changes or clarifications
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="terms-to-negotiate">Terms to Negotiate</Label>
            <Textarea
              className="bg-gray-50"
              id="terms-to-negotiate"
              rows={4}
              placeholder="Document any terms that need negotiation..."
              {...register("termsToNegotiate")}
            />
            <p className="text-sm text-slate-500">
              Any terms that need negotiation
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="compliance-issues">Compliance Issues</Label>
            <Textarea
              className="bg-gray-50"
              id="compliance-issues"
              rows={4}
              placeholder="Document any compliance issues or concerns..."
              {...register("complianceIssues")}
            />
            <p className="text-sm text-slate-500">
              Any compliance issues or concerns
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="review-decision">Review Decision *</Label>
            <Controller
              control={control}
              name="reviewDecision"
              render={({ field }) => (
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select review decision" />
                  </SelectTrigger>
                  <SelectContent>
                    {reviewDecisionOptions.map((option) => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.reviewDecision && (
              <p className="text-sm text-rose-600">
                {errors.reviewDecision.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="next-steps">Next Steps</Label>
            <Textarea
              className="bg-gray-50"
              id="next-steps"
              rows={4}
              placeholder="Document any next steps or actions required..."
              {...register("nextSteps")}
            />
            <p className="text-sm text-slate-500">
              Any next steps or actions required
            </p>
          </div>

          <section className="">
            <div className="grid gap-3">
              <div className="">
                <p className="font-medium text-slate-900">Liability Concerns</p>
                <Controller
                  control={control}
                  name="liabilityConcerns"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <p className="text-sm text-slate-500">
                  Indicate if there are any liability concerns
                </p>
              </div>
              <div className="">
                <p className="font-medium text-slate-900">
                  Indemnification Review
                </p>
                <Controller
                  control={control}
                  name="indemnificationReview"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <p className="text-sm text-slate-500">
                  Indicate if indemnification terms need review
                </p>
              </div>
              <div className="">
                <p className="font-medium text-slate-900">
                  Data Privacy Review
                </p>
                <Controller
                  control={control}
                  name="dataPrivacyReview"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <p className="text-sm text-slate-500">
                  Indicate if data privacy terms need review
                </p>
              </div>
              <div className="">
                <p className="font-medium text-slate-900">IP Rights Review</p>
                <Controller
                  control={control}
                  name="ipRightsReview"
                  render={({ field }) => (
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  )}
                />
                <p className="text-sm text-slate-500">
                  Indicate if IP rights terms need review
                </p>
              </div>
            </div>
          </section>

          {isSubmitted && Object.keys(errors).length > 0 ? (
            <div className="rounded-3xl border border-amber-200 bg-amber-50 p-4 text-sm text-slate-800">
              <p className="font-semibold text-amber-900">
                Required Fields Missing
              </p>
              <p className="mt-2 text-slate-700">
                Please complete: Reviewer Name, Legal Notes, Risk Assessment,
                and Review Decision
              </p>
            </div>
          ) : null}

          <DialogFooter className="pt-4 border-t border-slate-200 gap-3 ">
            <Button
              variant="outline"
              type="button"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500">
              <FileText />
              Complete Review
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
