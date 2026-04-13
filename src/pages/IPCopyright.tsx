import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import IPCopyrightAISyntheticTab from "./IPCopyrightAISyntheticTab";
import IPCopyrightAuditVaultTab from "./IPCopyrightAuditVaultTab";
import IPCopyrightCounterNoticeTab from "./IPCopyrightCounterNoticeTab";
import IPCopyrightDetectionTab from "./IPCopyrightDetectionTab";
import IPCopyrightDmcaTab from "./IPCopyrightDmcaTab";
import IPCopyrightEducationTab from "./IPCopyrightEducationTab";
import IPCopyrightOverviewTab from "./IPCopyrightOverviewTab";
import IPCopyrightRepeatInfringerTab from "./IPCopyrightRepeatInfringerTab";
import IPCopyrightRightsHolderTab from "./IPCopyrightRightsHolderTab";
import IPCopyrightTrademarkTab from "./IPCopyrightTrademarkTab";
import IPCopyrightWatermarkTab from "./IPCopyrightWatermarkTab";

const tabLabels = [
  "Overview",
  "DMCA",
  "Counter-Notice",
  "Repeat Infringer",
  "Detection",
  "Watermark",
  "Rights-Holder",
  "Education",
  "AI/Synthetic",
  "Trademark",
  "Audit & Vault",
];

function IPCopyright() {
  return (
    <div className="space-y-6">
      <section>
        <PageHeader
          title="IP & Copyright"
          subtitle="Here’s what’s happening with your marketing campaigns today."
        />
      </section>

      <GlobalFilters />

      <Tabs defaultValue="overview" className="">
        <TabsList className="w-full justify-start overflow-x-auto overflow-y-hidden rounded-full bg-white p-1 whitespace-nowrap">
          {tabLabels.map((label) => {
            const value = label.toLowerCase().replace(/\s+/g, "-");
            return (
              <TabsTrigger
                key={label}
                value={value}
                className="flex-none! min-w-35 rounded-full data-[state=active]:bg-slate-900 data-[state=active]:text-white"
              >
                {label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <IPCopyrightOverviewTab />
        <IPCopyrightDmcaTab />
        <IPCopyrightCounterNoticeTab />
        <IPCopyrightRepeatInfringerTab />
        <IPCopyrightDetectionTab />
        <IPCopyrightWatermarkTab />
        <IPCopyrightRightsHolderTab />
        <IPCopyrightEducationTab />
        <IPCopyrightAISyntheticTab />
        <IPCopyrightTrademarkTab />
        <IPCopyrightAuditVaultTab />

        {tabLabels.slice(11).map((label) => {
          const value = label.toLowerCase().replace(/\s+/g, "-");
          return (
            <TabsContent key={label} value={value} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>{label}</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-slate-600">
                  <div className="space-y-3">
                    <p>
                      This section is reserved for {label} details and workflow.
                    </p>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm text-slate-500">
                          Placeholder content for the {label} tab.
                        </p>
                      </div>
                      <Button variant="secondary">View {label}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}

export default IPCopyright;
