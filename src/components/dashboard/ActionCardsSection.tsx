import { AlertCircle, Lock, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type ActionItem = {
  title: string;
  description: string;
  badge: string;
  status: string;
  statusClass: string;
};

type ActionCard = {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  iconColorClass: string;
  backgroundClass: string;
  borderClass: string;
  items: ActionItem[];
};

const actionCards: ActionCard[] = [
  {
    title: "Active Blockers & Holds",
    subtitle: "Legal holds preventing operations",
    icon: Lock,
    iconColorClass: "text-amber-600",
    backgroundClass: "bg-amber-50",
    borderClass: "border-amber-200",
    items: [
      {
        title: "City Launch Hold - Atlanta",
        description: "Business license pending approval",
        badge: "Owner: GSD",
        status: "Active",
        statusClass: "bg-rose-600",
      },
      {
        title: "Provider Go-Live Block",
        description: "COI expired - awaiting renewed insurance",
        badge: "Owner: COO",
        status: "Active",
        statusClass: "bg-rose-600",
      },
    ],
  },
  {
    title: "CEO Escalations",
    subtitle: "Items requiring CEO approval token",
    icon: AlertCircle,
    iconColorClass: "text-violet-600",
    backgroundClass: "bg-violet-50",
    borderClass: "border-violet-200",
    items: [
      {
        title: "GDPR Breach Assessment Memo",
        description: "Critical privacy incident - notification decision",
        badge: "7.1 Legal Governance",
        status: "Awaiting",
        statusClass: "bg-slate-950",
      },
      {
        title: "Subpoena Evidence Request",
        description: "CTO approval needed for data export",
        badge: "7.3 Regulatory Affairs",
        status: "Awaiting",
        statusClass: "bg-slate-950",
      },
    ],
  },
];

function ActionCardsSection() {
  return (
    <section className="grid gap-4 xl:grid-cols-2">
      {actionCards.map((card) => (
        <Card
          key={card.title}
          className={cn(
            card.backgroundClass,
            card.borderClass,
            "border p-4 shadow-sm gap-0",
          )}
        >
          <CardHeader className="px-0 pb-4 pt-0">
            <div className="flex items-center gap-2">
              <card.icon className={cn("size-5", card.iconColorClass)} />
              <CardTitle>{card.title}</CardTitle>
            </div>

            <p className="text-sm text-slate-500">{card.subtitle}</p>
          </CardHeader>
          <CardContent className="px-0 pt-0">
            <div className="space-y-4">
              {card.items.map((item) => (
                <div
                  key={item.title}
                  className="rounded-lg border border-slate-200 bg-white p-3 shadow-sm"
                >
                  <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                    <div>
                      <h3 className="text-base font-semibold text-slate-900">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-sm text-slate-500">
                        {item.description}
                      </p>
                    </div>
                    <span
                      className={cn(
                        item.statusClass,
                        "inline-flex rounded-full px-3 py-1 text-xs font-semibold text-white",
                      )}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="mt-4 inline-flex items-center rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-sm text-slate-700">
                    {item.badge}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </section>
  );
}

export default ActionCardsSection;
