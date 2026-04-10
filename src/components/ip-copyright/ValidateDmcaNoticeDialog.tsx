import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { CircleCheck } from "lucide-react";
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

const complianceChecklistItems = [
  {
    key: "signatureProvided",
    label: "Physical or electronic signature of authorized person",
  },
  {
    key: "copyrightedWorkIdentified",
    label: "Identification of copyrighted work claimed",
  },
  {
    key: "workDescriptionProvided",
    label: "Description of copyrighted work",
  },
  {
    key: "infringingMaterialLocated",
    label: "Identification of infringing material and location",
  },
  {
    key: "contactInformationProvided",
    label: "Contact information (address, phone, email)",
  },
  {
    key: "goodFaithStatementIncluded",
    label: "Good faith belief statement",
  },
  {
    key: "accuracyStatementIncluded",
    label: "Statement of accuracy under penalty of perjury",
  },
] as const;

const legalSufficiencyOptions = [
  "Sufficient",
  "Sufficient with Clarifications",
  "Insufficient",
];

const recommendedActionOptions = [
  "Proceed with Takedown",
  "Request Additional Information",
  "Escalate to Legal Counsel",
  "Reject Notice",
];

const validationDecisionOptions = [
  "Approved",
  "Approved with Notes",
  "Rejected",
];

const validateDmcaNoticeSchema = z.object({
  signatureProvided: z.literal(true, {
    error: "Signature confirmation is required.",
  }),
  copyrightedWorkIdentified: z.literal(true, {
    error: "Copyrighted work identification is required.",
  }),
  workDescriptionProvided: z.literal(true, {
    error: "Work description confirmation is required.",
  }),
  infringingMaterialLocated: z.literal(true, {
    error: "Infringing material identification is required.",
  }),
  contactInformationProvided: z.literal(true, {
    error: "Contact information confirmation is required.",
  }),
  goodFaithStatementIncluded: z.literal(true, {
    error: "Good faith statement confirmation is required.",
  }),
  accuracyStatementIncluded: z.literal(true, {
    error: "Accuracy statement confirmation is required.",
  }),
  legalSufficiency: z.string().min(1, "Select assessor"),
  deficiencyNotes: z.string().optional(),
  recommendedAction: z.string().min(1, "Select recommended action"),
  validationDecision: z.string().min(1, "Select decisior"),
  validatorName: z.string().min(1, "Validator name is required"),
  validationNotes: z.string().optional(),
});

export type ValidateDmcaNoticeValues = z.infer<typeof validateDmcaNoticeSchema>;

export type DmcaNoticeValidationContext = {
  id: string;
  claimant: string;
  contentId: string;
  status: string;
  received: string;
};

type ValidateDmcaNoticeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  noticeContext: DmcaNoticeValidationContext | null;
  onComplete?: (values: ValidateDmcaNoticeValues) => void;
};

export default function ValidateDmcaNoticeDialog({
  open,
  onOpenChange,
  noticeContext,
  onComplete,
}: ValidateDmcaNoticeDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ValidateDmcaNoticeValues>({
    resolver: zodResolver(validateDmcaNoticeSchema),
    defaultValues: {
      legalSufficiency: "",
      deficiencyNotes: "",
      recommendedAction: "",
      validationDecision: "",
      validatorName: "",
      validationNotes: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  if (!noticeContext) {
    return null;
  }

  function onSubmit(values: ValidateDmcaNoticeValues) {
    onComplete?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CircleCheck className="h-5 w-5" />
            Validate DMCA Notice
          </DialogTitle>
          <DialogDescription>
            Verify compliance with 17 U.S.C. § 512(c)(3)(A) statutory
            requirements
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-lg bg-slate-100 p-4">
            <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
              <p>
                <span className="font-semibold">Notice ID:</span>{" "}
                {noticeContext.id}
              </p>
              <p>
                <span className="font-semibold">Status:</span>{" "}
                {noticeContext.status}
              </p>
              <p>
                <span className="font-semibold">Claimant:</span>{" "}
                {noticeContext.claimant}
              </p>
              <p>
                <span className="font-semibold">Content ID:</span>{" "}
                {noticeContext.contentId}
              </p>
              <p>
                <span className="font-semibold">Received:</span>{" "}
                {noticeContext.received}
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="font-semibold">
              DMCA 512(c)(3)(A) Compliance Checklist
            </h3>

            {complianceChecklistItems.map((item) => {
              return (
                <Field key={item.key} className="gap-1">
                  <FieldContent>
                    <div className="flex items-start gap-3">
                      <Controller
                        control={control}
                        name={item.key}
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
                      <p>
                        {item.label} <span className="font-medium">*</span>
                      </p>
                    </div>
                    <FieldError errors={[errors[item.key]]} />
                  </FieldContent>
                </Field>
              );
            })}
          </section>

          <section className="border-t pt-4">
            <div className="space-y-4">
              <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4">
                <FieldLabel htmlFor="legalSufficiency">
                  Legal Sufficiency *
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="legalSufficiency"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="legalSufficiency"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select assessor" />
                        </SelectTrigger>
                        <SelectContent>
                          {legalSufficiencyOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.legalSufficiency]} />
                </FieldContent>
              </Field>

              <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-4">
                <FieldLabel htmlFor="deficiencyNotes">
                  Deficiency Notes
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="deficiencyNotes"
                    rows={3}
                    className="bg-gray-50"
                    placeholder="Document any deficiencies or missing elements"
                    {...register("deficiencyNotes")}
                  />
                </FieldContent>
              </Field>

              <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4">
                <FieldLabel htmlFor="recommendedAction">
                  Recommended Action *
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="recommendedAction"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="recommendedAction"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select recommended action" />
                        </SelectTrigger>
                        <SelectContent>
                          {recommendedActionOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.recommendedAction]} />
                </FieldContent>
              </Field>

              <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4">
                <FieldLabel htmlFor="validationDecision">
                  Validation Decision *
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="validationDecision"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="validationDecision"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select decisior" />
                        </SelectTrigger>
                        <SelectContent>
                          {validationDecisionOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.validationDecision]} />
                </FieldContent>
              </Field>

              <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:items-center sm:gap-4">
                <FieldLabel htmlFor="validatorName">
                  Validator Name *
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="validatorName"
                    className="bg-gray-50"
                    placeholder="Full name of legal reviewer"
                    {...register("validatorName")}
                  />
                  <FieldError errors={[errors.validatorName]} />
                </FieldContent>
              </Field>

              <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[160px_1fr] sm:items-start sm:gap-4">
                <FieldLabel htmlFor="validationNotes">
                  Validation Notes
                </FieldLabel>
                <FieldContent>
                  <Textarea
                    id="validationNotes"
                    rows={4}
                    className="bg-gray-50"
                    placeholder="Additional notes, observations, or concerns"
                    {...register("validationNotes")}
                  />
                </FieldContent>
              </Field>
            </div>
          </section>

          <DialogFooter className="pt-4 justify-end gap-3 sm:flex-row">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Cancel
            </Button>
            <Button type="submit">Complete Validation</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
