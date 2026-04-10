import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Info, Scale } from "lucide-react";
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

const forwardingMethodOptions = [
  "Email to Registered Claimant Agent",
  "Platform Legal Portal",
  "Certified Mail",
];

const forwardCounterNoticeSchema = z.object({
  originalDmcaCase: z.string().min(1, "Original DMCA case is required"),
  originalClaimant: z.string().min(1, "Original claimant is required"),
  claimantEmail: z.string().email("Enter a valid claimant email"),
  claimantCompany: z.string().optional(),
  counterNoticeSummary: z.string().min(1, "Counter-notice summary is required"),
  userSwornStatementConfirmed: z.literal(true, {
    error: "User sworn statement confirmation is required",
  }),
  jurisdictionConsentConfirmed: z.literal(true, {
    error: "Jurisdiction consent confirmation is required",
  }),
  forwardingMethod: z.string().min(1, "Select forwarding method"),
  includeUserContactInfo: z.boolean().optional(),
  legalCoverLetter: z.string().optional(),
  responseDeadline: z.string().min(1, "Response deadline is required"),
  autoRestoreIfNoCourtAction: z.boolean().optional(),
  ccInternalCounsel: z.boolean().optional(),
  internalNotes: z.string().optional(),
});

export type ForwardCounterNoticeValues = z.infer<
  typeof forwardCounterNoticeSchema
>;

export type ForwardCounterNoticeContext = {
  originalCase: string;
};

type ForwardCounterNoticeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  context: ForwardCounterNoticeContext | null;
  onForward?: (values: ForwardCounterNoticeValues) => void;
};

export default function ForwardCounterNoticeDialog({
  open,
  onOpenChange,
  context,
  onForward,
}: ForwardCounterNoticeDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ForwardCounterNoticeValues>({
    resolver: zodResolver(forwardCounterNoticeSchema),
    defaultValues: {
      originalDmcaCase: "",
      originalClaimant: "",
      claimantEmail: "",
      claimantCompany: "",
      counterNoticeSummary: "",
      forwardingMethod: "",
      includeUserContactInfo: false,
      legalCoverLetter: "",
      responseDeadline: "",
      autoRestoreIfNoCourtAction: false,
      ccInternalCounsel: false,
      internalNotes: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        originalDmcaCase: context?.originalCase ?? "",
        originalClaimant: "",
        claimantEmail: "",
        claimantCompany: "",
        counterNoticeSummary: "",
        forwardingMethod: "",
        legalCoverLetter: "",
        responseDeadline: "",
        internalNotes: "",
      });
    }
  }, [context, open, reset]);

  if (!context) {
    return null;
  }

  function onSubmit(values: ForwardCounterNoticeValues) {
    onForward?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl max-h-[92vh] overflow-y-auto gap-0">
        <DialogHeader>
          <div className="flex gap-2">
            <Scale className="h-5 w-5" />
            <DialogTitle>Forward Counter-Notice to Claimant</DialogTitle>
          </div>
          <DialogDescription>
            Forward user counter-notice per DMCA 512(g) - 10-14 day claimant
            response window
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-lg border border-blue-200 bg-blue-50 p-4">
            <p className="flex items-center gap-2 font-semibold text-blue-900">
              <Info className="h-4 w-4" />
              DMCA 512(g) Safe Harbor Requirements
            </p>
            <p className="mt-2 text-sm text-blue-900">
              Upon receiving a valid counter-notice, you must promptly forward
              it to the original claimant. If the claimant does not file a court
              action within 10-14 business days, you must restore the content to
              maintain safe harbor protection.
            </p>
          </section>

          <section className="space-y-4">
            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
              <FieldLabel htmlFor="originalDmcaCase">
                Original DMCA Case *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="originalDmcaCase"
                  className="bg-gray-50"
                  placeholder="DMCA-2026-001"
                  {...register("originalDmcaCase")}
                />
                <FieldError errors={[errors.originalDmcaCase]} />
              </FieldContent>
            </Field>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
              <FieldLabel htmlFor="originalClaimant">
                Original Claimant *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="originalClaimant"
                  className="bg-gray-50"
                  placeholder="Copyright holder name"
                  {...register("originalClaimant")}
                />
                <FieldError errors={[errors.originalClaimant]} />
              </FieldContent>
            </Field>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
              <FieldLabel htmlFor="claimantEmail">Claimant Email *</FieldLabel>
              <FieldContent>
                <Input
                  id="claimantEmail"
                  className="bg-gray-50"
                  placeholder="legal@claimant.com"
                  {...register("claimantEmail")}
                />
                <FieldError errors={[errors.claimantEmail]} />
              </FieldContent>
            </Field>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
              <FieldLabel htmlFor="claimantCompany">
                Claimant Company
              </FieldLabel>
              <FieldContent>
                <Input
                  id="claimantCompany"
                  className="bg-gray-50"
                  placeholder="Company or organization name"
                  {...register("claimantCompany")}
                />
              </FieldContent>
            </Field>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-start sm:gap-4">
              <FieldLabel htmlFor="counterNoticeSummary">
                Counter-Notice Summary *
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="counterNoticeSummary"
                  rows={3}
                  className="bg-gray-50"
                  placeholder="Summarize the user's counter-notice claims, including their sworn statement and consent to jurisdiction"
                  {...register("counterNoticeSummary")}
                />
                <FieldError errors={[errors.counterNoticeSummary]} />
              </FieldContent>
            </Field>

            <div className="space-y-3 pl-0 sm:pl-[170px]">
              <p className="font-semibold">Counter-Notice Validation</p>

              <Field className="gap-1">
                <FieldContent>
                  <div className="flex items-start gap-3">
                    <Controller
                      control={control}
                      name="userSwornStatementConfirmed"
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
                      User provided sworn statement under penalty of perjury
                    </p>
                  </div>
                  <FieldError errors={[errors.userSwornStatementConfirmed]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldContent>
                  <div className="flex items-start gap-3">
                    <Controller
                      control={control}
                      name="jurisdictionConsentConfirmed"
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
                      User consents to jurisdiction of Federal District Court
                    </p>
                  </div>
                  <FieldError errors={[errors.jurisdictionConsentConfirmed]} />
                </FieldContent>
              </Field>
            </div>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
              <FieldLabel htmlFor="forwardingMethod">
                Forwarding Method *
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="forwardingMethod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="forwardingMethod"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select forwarding method" />
                      </SelectTrigger>
                      <SelectContent>
                        {forwardingMethodOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.forwardingMethod]} />
              </FieldContent>
            </Field>

            <div className="space-y-3 pl-0 sm:pl-[170px]">
              <Field className="gap-1">
                <FieldContent>
                  <div className="flex items-start gap-3">
                    <Controller
                      control={control}
                      name="includeUserContactInfo"
                      render={({ field }) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onCheckedChange={(checked) =>
                            field.onChange(Boolean(checked))
                          }
                          className="mt-0.5"
                        />
                      )}
                    />
                    <p>
                      Include user contact information (required by statute)
                    </p>
                  </div>
                </FieldContent>
              </Field>
            </div>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-start sm:gap-4">
              <FieldLabel htmlFor="legalCoverLetter">
                Legal Cover Letter
              </FieldLabel>
              <FieldContent>
                <Textarea
                  id="legalCoverLetter"
                  rows={3}
                  className="bg-gray-50"
                  placeholder="Optional cover letter explaining the counter-notice and next steps"
                  {...register("legalCoverLetter")}
                />
              </FieldContent>
            </Field>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-center sm:gap-4">
              <FieldLabel htmlFor="responseDeadline">
                Response Deadline *
              </FieldLabel>
              <FieldContent>
                <Input
                  id="responseDeadline"
                  className="bg-gray-50"
                  placeholder=""
                  {...register("responseDeadline")}
                />
                <FieldError errors={[errors.responseDeadline]} />
              </FieldContent>
            </Field>

            <div className="space-y-3 pl-0 sm:pl-[170px]">
              <Field className="gap-1">
                <FieldContent>
                  <div className="flex items-start gap-3">
                    <Controller
                      control={control}
                      name="autoRestoreIfNoCourtAction"
                      render={({ field }) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onCheckedChange={(checked) =>
                            field.onChange(Boolean(checked))
                          }
                          className="mt-0.5"
                        />
                      )}
                    />
                    <p>
                      Auto-restore content if no court action filed by deadline
                    </p>
                  </div>
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldContent>
                  <div className="flex items-start gap-3">
                    <Controller
                      control={control}
                      name="ccInternalCounsel"
                      render={({ field }) => (
                        <Checkbox
                          checked={Boolean(field.value)}
                          onCheckedChange={(checked) =>
                            field.onChange(Boolean(checked))
                          }
                          className="mt-0.5"
                        />
                      )}
                    />
                    <p>CC internal legal counsel on correspondence</p>
                  </div>
                </FieldContent>
              </Field>
            </div>

            <Field className="grid grid-cols-1 gap-2 sm:grid-cols-[170px_1fr] sm:items-start sm:gap-4">
              <FieldLabel htmlFor="internalNotes">Internal Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="internalNotes"
                  rows={3}
                  className="bg-gray-50"
                  placeholder="Internal tracking notes (not sent to claimant)"
                  {...register("internalNotes")}
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
            <Button type="submit">Forward Counter-Notice</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
