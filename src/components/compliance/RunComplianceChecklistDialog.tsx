import { useMemo, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AuditExecutionStep,
  AuditReviewStep,
  ChecklistSetupStep,
  Stepper,
  checklistTemplates,
  type AssessmentResult,
  type AuditItem,
  type ProgressStats,
} from "@/components/compliance/RunComplianceChecklistSteps";

const templateItemsMap: Record<
  (typeof checklistTemplates)[number],
  AuditItem[]
> = {
  "Food Safety Compliance (10 items)": [
    {
      id: "food-1",
      itemNo: "ITEM-001",
      section: "Health Permits",
      title: "All providers have current health department permits on file",
      severity: "Critical",
    },
    {
      id: "food-2",
      itemNo: "ITEM-002",
      section: "Health Permits",
      title: "Health permit expiration dates tracked and monitored",
      severity: "High",
    },
    {
      id: "food-3",
      itemNo: "ITEM-003",
      section: "Food Safety",
      title: "Food handler certifications verified for all staff",
      severity: "Critical",
    },
    {
      id: "food-4",
      itemNo: "ITEM-004",
      section: "Food Safety",
      title: "Temperature control procedures documented",
      severity: "High",
    },
    {
      id: "food-5",
      itemNo: "ITEM-005",
      section: "Insurance",
      title: "General liability insurance (minimum $2M) verified",
      severity: "Critical",
    },
    {
      id: "food-6",
      itemNo: "ITEM-006",
      section: "Insurance",
      title: "Product liability coverage confirmed",
      severity: "High",
    },
    {
      id: "food-7",
      itemNo: "ITEM-007",
      section: "Background Checks",
      title: "Background checks completed for delivery personnel",
      severity: "Medium",
    },
    {
      id: "food-8",
      itemNo: "ITEM-008",
      section: "Policy Compliance",
      title: "Provider agreement signed and acceptance tracked",
      severity: "Medium",
    },
    {
      id: "food-9",
      itemNo: "ITEM-009",
      section: "Inspections",
      title: "Recent health inspection reports on file (within 12 months)",
      severity: "High",
    },
    {
      id: "food-10",
      itemNo: "ITEM-010",
      section: "Training",
      title: "Allergy awareness training completed",
      severity: "Medium",
    },
  ],
  "Provider Onboarding Compliance (10 items)": [
    {
      id: "onboard-1",
      itemNo: "ITEM-001",
      section: "Identity Verification",
      title: "Government-issued identity is verified for each provider",
      severity: "Critical",
    },
    {
      id: "onboard-2",
      itemNo: "ITEM-002",
      section: "Identity Verification",
      title: "Business entity registration documents are validated",
      severity: "High",
    },
    {
      id: "onboard-3",
      itemNo: "ITEM-003",
      section: "Licensing",
      title: "Required state licenses are active at onboarding time",
      severity: "Critical",
    },
    {
      id: "onboard-4",
      itemNo: "ITEM-004",
      section: "Licensing",
      title: "License numbers are captured in system records",
      severity: "High",
    },
    {
      id: "onboard-5",
      itemNo: "ITEM-005",
      section: "Insurance",
      title: "Insurance certificate meets minimum coverage policy",
      severity: "Critical",
    },
    {
      id: "onboard-6",
      itemNo: "ITEM-006",
      section: "Insurance",
      title: "Insurance expiration alerts are configured",
      severity: "High",
    },
    {
      id: "onboard-7",
      itemNo: "ITEM-007",
      section: "Background Review",
      title: "Background and sanctions checks are completed",
      severity: "Medium",
    },
    {
      id: "onboard-8",
      itemNo: "ITEM-008",
      section: "Background Review",
      title: "Any screening exceptions have documented approvals",
      severity: "Medium",
    },
    {
      id: "onboard-9",
      itemNo: "ITEM-009",
      section: "Contracting",
      title: "Service agreements include mandatory compliance clauses",
      severity: "High",
    },
    {
      id: "onboard-10",
      itemNo: "ITEM-010",
      section: "Contracting",
      title: "Signed contracts are stored in central document repository",
      severity: "Low",
    },
  ],
  "Generic Compliance Audit (5 items)": [
    {
      id: "generic-1",
      itemNo: "ITEM-001",
      section: "Documentation",
      title: "Required policy documentation is complete and current",
      severity: "High",
    },
    {
      id: "generic-2",
      itemNo: "ITEM-002",
      section: "Documentation",
      title: "Version control and approvals are recorded",
      severity: "Medium",
    },
    {
      id: "generic-3",
      itemNo: "ITEM-003",
      section: "Operational Controls",
      title: "Operational controls are executed and evidenced",
      severity: "Critical",
    },
    {
      id: "generic-4",
      itemNo: "ITEM-004",
      section: "Training",
      title: "Mandatory compliance training completion exceeds threshold",
      severity: "Medium",
    },
    {
      id: "generic-5",
      itemNo: "ITEM-005",
      section: "Incidents",
      title: "Incident response process is documented and followed",
      severity: "High",
    },
  ],
};

const checklistSchema = z.object({
  checklistName: z.string().min(3, "Please enter a checklist name."),
  executionDate: z.string().min(1, "Please select an execution date."),
  checklistTemplate: z.string().min(1, "Please select a template."),
  productVertical: z.string().min(1, "Please select a product vertical."),
  assignedAuditor: z.string().min(1, "Please assign an auditor."),
  auditScopeDescription: z.string().min(10, "Please describe the audit scope."),
});

export type RunComplianceChecklistFormValues = z.infer<typeof checklistSchema>;

interface RunComplianceChecklistDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit?: (values: RunComplianceChecklistFormValues) => void;
}

export default function RunComplianceChecklistDialog({
  open,
  onOpenChange,
  onSubmit,
}: RunComplianceChecklistDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [assessments, setAssessments] = useState<
    Record<string, AssessmentResult>
  >({});

  const {
    control,
    register,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RunComplianceChecklistFormValues>({
    resolver: zodResolver(checklistSchema),
    defaultValues: {
      checklistName: "",
      executionDate: "",
      checklistTemplate: "",
      productVertical: "",
      assignedAuditor: "",
      auditScopeDescription: "",
    },
  });

  const selectedTemplate = useWatch({
    control,
    name: "checklistTemplate",
  });

  const activeAuditItems = useMemo(() => {
    if (!selectedTemplate) {
      return [];
    }

    return (
      templateItemsMap[
        selectedTemplate as (typeof checklistTemplates)[number]
      ] ?? []
    );
  }, [selectedTemplate]);

  const groupedAuditItems = useMemo(() => {
    const groups: Record<string, AuditItem[]> = {};

    activeAuditItems.forEach((item) => {
      if (!groups[item.section]) {
        groups[item.section] = [];
      }
      groups[item.section].push(item);
    });

    return groups;
  }, [activeAuditItems]);

  const progressStats = useMemo<ProgressStats>(() => {
    const total = activeAuditItems.length;
    const values = activeAuditItems.map((item) => assessments[item.id]);
    const passed = values.filter((value) => value === "pass").length;
    const failed = values.filter((value) => value === "fail").length;
    const na = values.filter((value) => value === "na").length;
    const completed = passed + failed + na;
    const score = total === 0 ? 0 : Math.round((passed / total) * 100);

    return { total, passed, failed, na, completed, score };
  }, [activeAuditItems, assessments]);

  function handleDialogOpenChange(nextOpen: boolean) {
    if (nextOpen) {
      setCurrentStep(1);
      setAssessments({});
      reset({
        checklistName: "",
        executionDate: "",
        checklistTemplate: "",
        productVertical: "",
        assignedAuditor: "",
        auditScopeDescription: "",
      });
    }

    onOpenChange(nextOpen);
  }

  function handleAssessmentChange(itemId: string, value: AssessmentResult) {
    setAssessments((current) => ({
      ...current,
      [itemId]: value,
    }));
  }

  function handleSetupSubmit() {
    setAssessments({});
    setCurrentStep(2);
  }

  function handleGoToReview() {
    const nextAssessments: Record<string, AssessmentResult> = {
      ...assessments,
    };

    activeAuditItems.forEach((item) => {
      if (!nextAssessments[item.id]) {
        nextAssessments[item.id] = "na";
      }
    });

    setAssessments(nextAssessments);
    setCurrentStep(3);
  }

  function handleFormSubmit(values: RunComplianceChecklistFormValues) {
    onSubmit?.(values);
    handleDialogOpenChange(false);
  }

  const reviewValues = getValues();

  return (
    <Dialog open={open} onOpenChange={handleDialogOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div>
            <DialogTitle>Run Compliance Checklist</DialogTitle>
            <DialogDescription>
              Execute a compliance audit checklist and automatically generate
              findings for failures
            </DialogDescription>
          </div>

          <Stepper currentStep={currentStep} />
        </DialogHeader>

        {currentStep === 1 && (
          <ChecklistSetupStep
            control={control}
            errors={errors}
            register={register}
            handleSubmit={handleSubmit}
            onCancel={() => handleDialogOpenChange(false)}
            onNext={handleSetupSubmit}
          />
        )}

        {currentStep === 2 && (
          <AuditExecutionStep
            groupedAuditItems={groupedAuditItems}
            assessments={assessments}
            progressStats={progressStats}
            onBack={() => setCurrentStep(1)}
            onCancel={() => handleDialogOpenChange(false)}
            onReview={handleGoToReview}
            onAssessmentChange={handleAssessmentChange}
          />
        )}

        {currentStep === 3 && (
          <AuditReviewStep
            reviewValues={reviewValues}
            progressStats={progressStats}
            onBack={() => setCurrentStep(2)}
            onCancel={() => handleDialogOpenChange(false)}
            onComplete={handleSubmit(handleFormSubmit)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
