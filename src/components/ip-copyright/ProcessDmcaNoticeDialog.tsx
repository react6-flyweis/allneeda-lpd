import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";

const processDmcaSchema = z.object({
  claimantName: z.string().min(1, "Claimant name is required"),
  email: z.string().email("Enter a valid email address"),
  company: z.string().optional(),
  copyrightOwner: z.string().min(1, "Copyright owner is required"),
  workDescription: z.string().min(1, "Work description is required"),
});

type ProcessDmcaNoticeFormValues = z.infer<typeof processDmcaSchema>;

type ProcessDmcaNoticeDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProcess?: (values: ProcessDmcaNoticeFormValues) => void;
};

export default function ProcessDmcaNoticeDialog({
  open,
  onOpenChange,
  onProcess,
}: ProcessDmcaNoticeDialogProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProcessDmcaNoticeFormValues>({
    resolver: zodResolver(processDmcaSchema),
    defaultValues: {
      claimantName: "",
      email: "",
      company: "",
      copyrightOwner: "",
      workDescription: "",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: ProcessDmcaNoticeFormValues) {
    onProcess?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Process DMCA Notice</DialogTitle>
          <DialogDescription>
            Record incoming DMCA copyright infringement notice per 17 U.S.C. §
            512(c)
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-4 pt-4" onSubmit={handleSubmit(onSubmit)}>
          <Field className="gap-1">
            <FieldLabel htmlFor="claimantName">Claimant Name *</FieldLabel>
            <FieldContent>
              <Input
                id="claimantName"
                placeholder="Enter here..."
                {...register("claimantName")}
              />
              <FieldError errors={[errors.claimantName]} />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel htmlFor="email">Email *</FieldLabel>
            <FieldContent>
              <Input
                id="email"
                placeholder="Enter here..."
                {...register("email")}
              />
              <FieldError errors={[errors.email]} />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel htmlFor="company">Company</FieldLabel>
            <FieldContent>
              <Input
                id="company"
                placeholder="Enter here..."
                {...register("company")}
              />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel htmlFor="copyrightOwner">Copyright Owner *</FieldLabel>
            <FieldContent>
              <Input
                id="copyrightOwner"
                placeholder="Enter here..."
                {...register("copyrightOwner")}
              />
              <FieldError errors={[errors.copyrightOwner]} />
            </FieldContent>
          </Field>

          <Field className="gap-1">
            <FieldLabel htmlFor="workDescription">
              Work Description *
            </FieldLabel>
            <FieldContent>
              <Textarea
                id="workDescription"
                placeholder="Add description"
                rows={5}
                {...register("workDescription")}
              />
              <FieldError errors={[errors.workDescription]} />
            </FieldContent>
          </Field>

          <DialogFooter className="pt-4 border-t grid grid-cols-2 gap-3">
            <Button type="submit">Process Notice</Button>
            <Button
              type="button"
              variant="outline"
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
