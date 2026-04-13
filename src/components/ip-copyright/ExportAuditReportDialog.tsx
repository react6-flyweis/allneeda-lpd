import { useEffect } from "react";
import {
  Controller,
  type Control,
  type FieldPathByValue,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Download } from "lucide-react";
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

const reportTypeOptions = [
  "Comprehensive Audit Report",
  "Compliance Summary",
  "Evidence Chain Report",
];
const reportScopeOptions = ["All Records", "Filtered Records", "Custom Range"];
const timePeriodOptions = ["Last 30 Days", "Last 90 Days", "Last 12 Months"];
const caseStatusOptions = ["All Statuses", "Open", "Under Review", "Resolved"];
const severityLevelOptions = [
  "All Severities",
  "Critical",
  "High",
  "Medium",
  "Low",
];
const departmentOptions = [
  "All Departments",
  "Legal",
  "Compliance",
  "Operations",
];
const exportFormatOptions = ["PDF Document", "CSV", "XLSX", "JSON"];
const deliveryMethodOptions = [
  "Direct Download",
  "Email Delivery",
  "Secure Link",
];
const groupByOptions = ["Case Type", "Department", "Status", "Date"];
const sortByOptions = [
  "Date (Newest First)",
  "Date (Oldest First)",
  "Severity",
  "Case ID",
];
const pageSizeOptions = ['Letter (8.5" x 11")', "A4", "Legal"];
const orientationOptions = ["Portrait", "Landscape"];
const retentionOptions = [
  "1 Year",
  "3 Years",
  "5 Years",
  "7 Years",
  "10 Years",
];
const archiveLocationOptions = [
  "Secure Vault (Primary)",
  "Cold Storage",
  "Regional Backup Vault",
];

const exportAuditReportSchema = z.object({
  reportType: z.string().min(1, "Report type is required"),
  reportScope: z.string().min(1, "Report scope is required"),
  timePeriod: z.string().min(1, "Time period is required"),

  includeEvidenceRecords: z.boolean(),
  includeAuditLogs: z.boolean(),
  includeChainOfCustody: z.boolean(),
  includeCaseReferences: z.boolean(),
  includeDmcaNotices: z.boolean(),
  includeTrademarkCases: z.boolean(),
  includeCopyrightClaims: z.boolean(),
  includeTakedownRequests: z.boolean(),
  includeCounterNotices: z.boolean(),
  includeAppeals: z.boolean(),

  includeScreenshots: z.boolean(),
  includeDocuments: z.boolean(),
  includeVideoRecordings: z.boolean(),
  includeAudioRecordings: z.boolean(),
  includeEmailThreads: z.boolean(),
  includeSystemLogs: z.boolean(),

  includeStatisticsMetrics: z.boolean(),
  includeTrendAnalysis: z.boolean(),
  includeComplianceMetrics: z.boolean(),
  includeSlaPerformance: z.boolean(),
  includeResponseTimes: z.boolean(),
  includeResolutionRates: z.boolean(),

  caseStatus: z.string().min(1, "Case status is required"),
  severityLevel: z.string().min(1, "Severity level is required"),
  department: z.string().min(1, "Department is required"),

  exportFormat: z.string().min(1, "Export format is required"),
  includeAttachments: z.boolean(),
  compressAttachments: z.boolean(),

  includeExecutiveSummary: z.boolean(),
  includeDetailedActivityLogs: z.boolean(),
  includeVisualChartsGraphs: z.boolean(),
  includeRecommendations: z.boolean(),

  redactPii: z.boolean(),
  redactSensitiveBusinessData: z.boolean(),
  includeDigitalSignature: z.boolean(),
  encryptExportedFile: z.boolean(),

  addWatermark: z.boolean(),
  watermarkText: z.string().optional(),

  recipientName: z.string().optional(),
  recipientEmail: z
    .string()
    .email("Enter a valid recipient email")
    .or(z.literal("")),
  recipientOrganization: z.string().optional(),
  deliveryMethod: z.string().min(1, "Delivery method is required"),

  includeComplianceStatement: z.boolean(),
  includeChainOfCustodyCertification: z.boolean(),
  certifyDataIntegrity: z.boolean(),
  includeHashVerificationCodes: z.boolean(),

  groupRecordsBy: z.string().min(1, "Group by is required"),
  sortBy: z.string().min(1, "Sort by is required"),
  pageSize: z.string().min(1, "Page size is required"),
  orientation: z.string().min(1, "Orientation is required"),
  includeTableOfContents: z.boolean(),
  includePageNumbers: z.boolean(),
  includeCoverPage: z.boolean(),

  reportTitle: z.string().optional(),
  reportAuthor: z.string().optional(),
  reportPurpose: z.string().optional(),
  reportNotes: z.string().optional(),

  archiveCopy: z.boolean(),
  retentionPeriod: z.string().min(1, "Retention period is required"),
  archiveLocation: z.string().min(1, "Archive location is required"),
});

type ExportAuditReportValues = z.infer<typeof exportAuditReportSchema>;

type ExportAuditReportDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onGenerate?: (values: ExportAuditReportValues) => void;
};

type BooleanName = FieldPathByValue<ExportAuditReportValues, boolean>;

const dataCategoryOptions: Array<{ name: BooleanName; label: string }> = [
  { name: "includeEvidenceRecords", label: "Evidence Records" },
  { name: "includeAuditLogs", label: "Audit Logs" },
  { name: "includeChainOfCustody", label: "Chain of Custody" },
  { name: "includeCaseReferences", label: "Case References" },
  { name: "includeDmcaNotices", label: "DMCA Notices" },
  { name: "includeTrademarkCases", label: "Trademark Cases" },
  { name: "includeCopyrightClaims", label: "Copyright Claims" },
  { name: "includeTakedownRequests", label: "Takedown Requests" },
  { name: "includeCounterNotices", label: "Counter-Notices" },
  { name: "includeAppeals", label: "Appeals" },
];

const evidenceTypeOptions: Array<{ name: BooleanName; label: string }> = [
  { name: "includeScreenshots", label: "Screenshots" },
  { name: "includeDocuments", label: "Documents" },
  { name: "includeVideoRecordings", label: "Video Recordings" },
  { name: "includeAudioRecordings", label: "Audio Recordings" },
  { name: "includeEmailThreads", label: "Email Threads" },
  { name: "includeSystemLogs", label: "System Logs" },
];

const metadataAnalyticsOptions: Array<{ name: BooleanName; label: string }> = [
  { name: "includeStatisticsMetrics", label: "Statistics & Metrics" },
  { name: "includeTrendAnalysis", label: "Trend Analysis" },
  { name: "includeComplianceMetrics", label: "Compliance Metrics" },
  { name: "includeSlaPerformance", label: "SLA Performance" },
  { name: "includeResponseTimes", label: "Response Times" },
  { name: "includeResolutionRates", label: "Resolution Rates" },
];

const reportSectionOptions: Array<{ name: BooleanName; label: string }> = [
  { name: "includeExecutiveSummary", label: "Executive Summary" },
  { name: "includeDetailedActivityLogs", label: "Detailed Activity Logs" },
  { name: "includeVisualChartsGraphs", label: "Visual Charts & Graphs" },
  { name: "includeRecommendations", label: "Recommendations" },
];

const securityPrivacyOptions: Array<{ name: BooleanName; label: string }> = [
  {
    name: "redactPii",
    label: "Redact personally identifiable information (PII)",
  },
  {
    name: "redactSensitiveBusinessData",
    label: "Redact sensitive business data",
  },
  {
    name: "includeDigitalSignature",
    label: "Include digital signature for authenticity",
  },
  { name: "encryptExportedFile", label: "Encrypt exported file with password" },
];

const complianceCertificationOptions: Array<{
  name: BooleanName;
  label: string;
}> = [
  { name: "includeComplianceStatement", label: "Include compliance statement" },
  {
    name: "includeChainOfCustodyCertification",
    label: "Include chain of custody certification",
  },
  { name: "certifyDataIntegrity", label: "Certify data integrity" },
  {
    name: "includeHashVerificationCodes",
    label: "Include hash verification codes",
  },
];

const layoutOptions: Array<{ name: BooleanName; label: string }> = [
  { name: "includeTableOfContents", label: "Table of Contents" },
  { name: "includePageNumbers", label: "Page Numbers" },
  { name: "includeCoverPage", label: "Cover Page" },
];

function BooleanField({
  name,
  control,
  label,
}: {
  name: BooleanName;
  control: Control<ExportAuditReportValues>;
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

function ExportAuditReportDialog({
  open,
  onOpenChange,
  onGenerate,
}: ExportAuditReportDialogProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ExportAuditReportValues>({
    resolver: zodResolver(exportAuditReportSchema),
    defaultValues: {
      reportType: "Comprehensive Audit Report",
      reportScope: "All Records",
      timePeriod: "Last 30 Days",
      includeEvidenceRecords: true,
      includeAuditLogs: true,
      includeChainOfCustody: true,
      includeCaseReferences: true,
      includeDmcaNotices: true,
      includeTrademarkCases: true,
      includeCopyrightClaims: true,
      includeTakedownRequests: true,
      includeCounterNotices: true,
      includeAppeals: true,
      includeScreenshots: true,
      includeDocuments: true,
      includeVideoRecordings: true,
      includeAudioRecordings: true,
      includeEmailThreads: true,
      includeSystemLogs: true,
      includeStatisticsMetrics: true,
      includeTrendAnalysis: true,
      includeComplianceMetrics: true,
      includeSlaPerformance: true,
      includeResponseTimes: true,
      includeResolutionRates: true,
      caseStatus: "All Statuses",
      severityLevel: "All Severities",
      department: "All Departments",
      exportFormat: "PDF Document",
      includeAttachments: true,
      compressAttachments: true,
      includeExecutiveSummary: true,
      includeDetailedActivityLogs: true,
      includeVisualChartsGraphs: true,
      includeRecommendations: false,
      redactPii: true,
      redactSensitiveBusinessData: false,
      includeDigitalSignature: true,
      encryptExportedFile: false,
      addWatermark: true,
      watermarkText: "CONFIDENTIAL - LEGAL DEPARTMENT",
      recipientName: "John Doe",
      recipientEmail: "recipient@example.com",
      recipientOrganization: "Organization name",
      deliveryMethod: "Direct Download",
      includeComplianceStatement: true,
      includeChainOfCustodyCertification: true,
      certifyDataIntegrity: true,
      includeHashVerificationCodes: true,
      groupRecordsBy: "Case Type",
      sortBy: "Date (Newest First)",
      pageSize: 'Letter (8.5" x 11")',
      orientation: "Portrait",
      includeTableOfContents: true,
      includePageNumbers: true,
      includeCoverPage: true,
      reportTitle: "",
      reportAuthor: "",
      reportPurpose: "",
      reportNotes: "",
      archiveCopy: true,
      retentionPeriod: "7 Years",
      archiveLocation: "Secure Vault (Primary)",
    },
  });

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open, reset]);

  function onSubmit(values: ExportAuditReportValues) {
    onGenerate?.(values);
    onOpenChange(false);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[94vh] sm:max-w-4xl overflow-y-auto gap-0">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Export Audit Report
          </DialogTitle>
          <DialogDescription>
            Generate comprehensive audit and evidence reports with customizable
            options
          </DialogDescription>
        </DialogHeader>

        <form className="space-y-5 py-4" onSubmit={handleSubmit(onSubmit)}>
          <section className="rounded-xl border border-blue-200 bg-blue-50 p-4 space-y-4">
            <h3 className="font-semibold text-blue-900">Report Type & Scope</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="reportType">Report Type</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="reportType"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="reportType"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.reportType]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="reportScope">Report Scope</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="reportScope"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="reportScope"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select report scope" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportScopeOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.reportScope]} />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Time Period</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="timePeriod">Select Time Period</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="timePeriod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="timePeriod"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select time period" />
                      </SelectTrigger>
                      <SelectContent>
                        {timePeriodOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.timePeriod]} />
              </FieldContent>
            </Field>
          </section>

          <section className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 space-y-4">
            <h3 className="font-semibold text-emerald-900">
              Data Categories to Include
            </h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {dataCategoryOptions.map((option) => (
                <BooleanField
                  key={option.name}
                  name={option.name}
                  control={control}
                  label={option.label}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Evidence Types</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {evidenceTypeOptions.map((option) => (
                <BooleanField
                  key={option.name}
                  name={option.name}
                  control={control}
                  label={option.label}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Metadata & Analytics</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {metadataAnalyticsOptions.map((option) => (
                <BooleanField
                  key={option.name}
                  name={option.name}
                  control={control}
                  label={option.label}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Case Filters</h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field className="gap-1">
                <FieldLabel htmlFor="caseStatus">Case Status</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="caseStatus"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="caseStatus"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          {caseStatusOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.caseStatus]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="severityLevel">Severity Level</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="severityLevel"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="severityLevel"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select severity" />
                        </SelectTrigger>
                        <SelectContent>
                          {severityLevelOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.severityLevel]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="department">Department</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="department"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="department"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departmentOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.department]} />
                </FieldContent>
              </Field>
            </div>
          </section>

          <section className="rounded-xl border border-violet-200 bg-violet-50 p-4 space-y-4">
            <h3 className="font-semibold text-violet-900">
              Export Format & Options
            </h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="exportFormat">Export Format</FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="exportFormat"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="exportFormat"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        {exportFormatOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.exportFormat]} />
              </FieldContent>
            </Field>

            <BooleanField
              name="includeAttachments"
              control={control}
              label="Include evidence file attachments"
            />
            <BooleanField
              name="compressAttachments"
              control={control}
              label="Compress attachments to reduce file size"
            />
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Report Sections</h3>
            <div className="grid gap-2 sm:grid-cols-2">
              {reportSectionOptions.map((option) => (
                <BooleanField
                  key={option.name}
                  name={option.name}
                  control={control}
                  label={option.label}
                />
              ))}
            </div>
          </section>

          <section className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-4">
            <h3 className="font-semibold text-amber-900">Security & Privacy</h3>
            {securityPrivacyOptions.map((option) => (
              <BooleanField
                key={option.name}
                name={option.name}
                control={control}
                label={option.label}
              />
            ))}
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Watermarking</h3>
            <BooleanField
              name="addWatermark"
              control={control}
              label="Add watermark to report pages"
            />
            <Field className="gap-1">
              <FieldLabel htmlFor="watermarkText">Watermark Text</FieldLabel>
              <FieldContent>
                <Input
                  id="watermarkText"
                  className="bg-gray-50"
                  {...register("watermarkText")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Recipient Information (Optional)</h3>
            <Field className="gap-1">
              <FieldLabel htmlFor="recipientName">Recipient Name</FieldLabel>
              <FieldContent>
                <Input
                  id="recipientName"
                  className="bg-gray-50"
                  {...register("recipientName")}
                />
              </FieldContent>
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="recipientEmail">
                  Recipient Email
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="recipientEmail"
                    className="bg-gray-50"
                    {...register("recipientEmail")}
                  />
                  <FieldError errors={[errors.recipientEmail]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="recipientOrganization">
                  Organization
                </FieldLabel>
                <FieldContent>
                  <Input
                    id="recipientOrganization"
                    className="bg-gray-50"
                    {...register("recipientOrganization")}
                  />
                </FieldContent>
              </Field>
            </div>

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
                        <SelectValue placeholder="Select delivery method" />
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
                <FieldError errors={[errors.deliveryMethod]} />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Compliance & Certification</h3>
            {complianceCertificationOptions.map((option) => (
              <BooleanField
                key={option.name}
                name={option.name}
                control={control}
                label={option.label}
              />
            ))}
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Additional Options</h3>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="groupRecordsBy">
                  Group Records By
                </FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="groupRecordsBy"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="groupRecordsBy"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select grouping" />
                        </SelectTrigger>
                        <SelectContent>
                          {groupByOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.groupRecordsBy]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="sortBy">Sort By</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="sortBy"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="sortBy"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select sort order" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortByOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.sortBy]} />
                </FieldContent>
              </Field>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field className="gap-1">
                <FieldLabel htmlFor="pageSize">Page Size</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="pageSize"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="pageSize"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select page size" />
                        </SelectTrigger>
                        <SelectContent>
                          {pageSizeOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.pageSize]} />
                </FieldContent>
              </Field>

              <Field className="gap-1">
                <FieldLabel htmlFor="orientation">Orientation</FieldLabel>
                <FieldContent>
                  <Controller
                    control={control}
                    name="orientation"
                    render={({ field }) => (
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger
                          id="orientation"
                          className="w-full bg-gray-50"
                        >
                          <SelectValue placeholder="Select orientation" />
                        </SelectTrigger>
                        <SelectContent>
                          {orientationOptions.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    )}
                  />
                  <FieldError errors={[errors.orientation]} />
                </FieldContent>
              </Field>
            </div>

            <div className="grid gap-2 sm:grid-cols-3">
              {layoutOptions.map((option) => (
                <BooleanField
                  key={option.name}
                  name={option.name}
                  control={control}
                  label={option.label}
                />
              ))}
            </div>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Report Metadata</h3>

            <Field className="gap-1">
              <FieldLabel htmlFor="reportTitle">Report Title</FieldLabel>
              <FieldContent>
                <Input
                  id="reportTitle"
                  className="bg-gray-50"
                  placeholder="e.g., Q1 2026 IP Compliance Audit"
                  {...register("reportTitle")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="reportAuthor">Report Author</FieldLabel>
              <FieldContent>
                <Input
                  id="reportAuthor"
                  className="bg-gray-50"
                  placeholder="Your name"
                  {...register("reportAuthor")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="reportPurpose">Report Purpose</FieldLabel>
              <FieldContent>
                <Textarea
                  id="reportPurpose"
                  className="bg-gray-50 min-h-20"
                  placeholder="Brief description of the report's purpose"
                  {...register("reportPurpose")}
                />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="reportNotes">Report Notes</FieldLabel>
              <FieldContent>
                <Textarea
                  id="reportNotes"
                  className="bg-gray-50 min-h-24"
                  placeholder="Any additional notes or context"
                  {...register("reportNotes")}
                />
              </FieldContent>
            </Field>
          </section>

          <section className="space-y-4 border-t pt-4">
            <h3 className="font-semibold">Archive Settings</h3>
            <BooleanField
              name="archiveCopy"
              control={control}
              label="Archive a copy of this report in the evidence vault"
            />

            <Field className="gap-1">
              <FieldLabel htmlFor="retentionPeriod">
                Retention Period
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="retentionPeriod"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="retentionPeriod"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        {retentionOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.retentionPeriod]} />
              </FieldContent>
            </Field>

            <Field className="gap-1">
              <FieldLabel htmlFor="archiveLocation">
                Archive Location
              </FieldLabel>
              <FieldContent>
                <Controller
                  control={control}
                  name="archiveLocation"
                  render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange}>
                      <SelectTrigger
                        id="archiveLocation"
                        className="w-full bg-gray-50"
                      >
                        <SelectValue placeholder="Select archive location" />
                      </SelectTrigger>
                      <SelectContent>
                        {archiveLocationOptions.map((option) => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}
                />
                <FieldError errors={[errors.archiveLocation]} />
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
            <Button type="submit">Generate Report</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default ExportAuditReportDialog;
