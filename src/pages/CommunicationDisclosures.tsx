import { type ReactNode } from "react";
import {
  ArrowDown,
  ArrowUp,
  Check,
  FileText,
  MessageCircleMore,
  MessageSquare,
  Plus,
  Search,
  X,
} from "lucide-react";
import DiscussionCard, {
  type DiscussionItem,
} from "@/components/communication/DiscussionCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

type SummaryStat = {
  title: string;
  value: string;
  trend: string;
  isPositive: boolean;
};

const summaryStats: SummaryStat[] = [
  { title: "Total Discussions", value: "5", trend: "8%", isPositive: true },
  { title: "Open", value: "1", trend: "20%", isPositive: false },
  { title: "In Review", value: "1", trend: "2%", isPositive: true },
  { title: "Converted", value: "1", trend: "5%", isPositive: true },
];

const canNotDoItems = [
  "No approve/reject buttons",
  "No task creation",
  "No deadlines or SLAs",
  "No execution tracking",
];

const canDoItems = [
  "Communicate and clarify",
  "Exchange ideas and feedback",
  "Prepare for decisions",
  "Convert to Approval/Policy",
];

const conversionFlowItems = [
  "Discussion -> Approval (CEO/Director)",
  "Discussion -> Policy (CEO only)",
  "Converted = Read-only",
  "Execution starts after approval",
];

const discussions: DiscussionItem[] = [
  {
    title: "Request for New Analytics Tool",
    description:
      "Our team needs a better analytics tool for tracking user behavior. Current tool lacks real-time data and custom dashboards.",
    status: "in review",
    visibility: "department",
    department: "Marketing",
    topic: "Tools & Resources",
    owner: "Emily Carter (Marketing Manager)",
    date: "1/7/2025",
    participants: "3 participants",
    comments: "4 comments",
    tags: ["analytics", "tools", "budget"],
  },
  {
    title: "Clarification on Remote Work Policy",
    description:
      "Need clarification on the hybrid work schedule. Can we work remotely 3 days/week instead of 2?",
    status: "clarified",
    visibility: "company",
    department: "HR",
    topic: "Policy Clarification",
    owner: "David Lee (Software Engineer)",
    date: "1/6/2025",
    participants: "3 participants",
    comments: "4 comments",
    tags: ["remote-work", "policy", "hr"],
  },
  {
    title: "Budget Overage Explanation Needed",
    description:
      "Engineering department is 15% over budget for Q4. Need explanation and corrective action plan.",
    status: "waiting response",
    visibility: "private",
    department: "Finance",
    topic: "Budget & Spending",
    owner: "Emma Davis (CFO)",
    date: "1/5/2025",
    participants: "3 participants",
    comments: "3 comments",
    tags: ["budget", "finance", "engineering", "urgent"],
  },
  {
    title: "Customer Support AI Tool Suggestion",
    description:
      "Proposing AI-powered chatbot to handle tier-1 support queries and reduce response time.",
    status: "converted to approval",
    visibility: "department",
    approvalCode: "Approval APR-045",
    department: "Customer Support",
    topic: "Process Improvement",
    owner: "Rachel Wong (Support Lead)",
    date: "1/3/2025",
    participants: "3 participants",
    comments: "4 comments",
    tags: ["ai", "automation", "support", "approved"],
  },
  {
    title: "Product Roadmap Q1 2025 Discussion",
    description:
      "Open discussion on Q1 product priorities and feature requests from customers.",
    status: "open",
    visibility: "company",
    department: "Product",
    topic: "Strategy & Planning",
    owner: "Sarah Johnson (CEO)",
    date: "1/2/2025",
    participants: "4 participants",
    comments: "2 comments",
    tags: ["roadmap", "strategy", "q1-2025"],
  },
];

function RuleBlock({
  title,
  icon,
  items,
  iconClassName,
}: {
  title: string;
  icon: ReactNode;
  items: string[];
  iconClassName: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-[#E8F1FF] p-3">
      <h4 className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
        <span className={cn("inline-flex", iconClassName)}>{icon}</span>
        {title}
      </h4>
      <ul className="mt-1.5 space-y-1 text-xs text-slate-600">
        {items.map((item) => (
          <li key={item}>- {item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function CommunicationDisclosures() {
  return (
    <div className="space-y-4">
      <section className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-semibold text-slate-900">
            Communication &amp; Discussion
          </h2>
          <p className="text-xs text-slate-500">
            Discussions, Approval Policies, Policy execution - No execution -
            Developer-ready
          </p>
        </div>

        <div className="flex gap-2">
          <Button className="h-9 rounded-md bg-[#0e1e38] px-3 text-sm text-white hover:bg-[#0e1e38]/90">
            <MessageCircleMore className="h-4 w-4" />
            Chat/Meeting
          </Button>
          <Button className="h-9 rounded-md bg-[#0e1e38] px-3 text-sm text-white hover:bg-[#0e1e38]/90">
            <Plus className="h-4 w-4" />
            New Discussion
          </Button>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="px-2 text-base font-semibold text-slate-900">
          Discussion Department Dashboard
        </h3>

        <section className="grid gap-3 px-2 md:grid-cols-2 xl:grid-cols-4">
          {summaryStats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-lg border border-slate-200 bg-white p-3"
            >
              <p className="text-xs text-slate-500">{stat.title}</p>
              <div className="mt-2 flex items-end justify-between gap-2">
                <p className="text-2xl leading-none font-semibold text-slate-900">
                  {stat.value}
                </p>
                <p
                  className={cn(
                    "mb-1 flex items-center gap-0.5 text-xs font-medium",
                    stat.isPositive ? "text-emerald-600" : "text-rose-500",
                  )}
                >
                  {stat.isPositive ? (
                    <ArrowUp className="h-3 w-3" />
                  ) : (
                    <ArrowDown className="h-3 w-3" />
                  )}
                  {stat.trend}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-lg border border-blue-200 bg-white p-3">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-800">
            <MessageSquare className="h-4 w-4 text-blue-500" />
            Core Rules: Discussion # Decision
          </h3>
          <div className="mt-2 grid gap-2 lg:grid-cols-3">
            <RuleBlock
              title="What Discussion CANNOT Do"
              icon={<X className="h-3.5 w-3.5" />}
              iconClassName="text-rose-500"
              items={canNotDoItems}
            />
            <RuleBlock
              title="What Discussion CAN Do"
              icon={<Check className="h-3.5 w-3.5" />}
              iconClassName="text-emerald-600"
              items={canDoItems}
            />
            <RuleBlock
              title="Conversion Flow"
              icon={<FileText className="h-3.5 w-3.5" />}
              iconClassName="text-slate-400"
              items={conversionFlowItems}
            />
          </div>
        </section>

        <section className="rounded-lg border border-slate-200 bg-white p-2">
          <div className="grid gap-2 lg:grid-cols-[1fr_190px_190px_auto]">
            <div>
              <p className="mb-1 text-xs font-medium text-slate-600">Search</p>
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <Input
                  className="h-8 rounded-md border-slate-200 bg-slate-50 pl-7 text-xs"
                  placeholder="Search discussions..."
                />
              </div>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium text-slate-600">Status</p>
              <Select defaultValue="all-statuses">
                <SelectTrigger className="h-8 w-full rounded-md border-slate-200 bg-slate-50 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-statuses">All Statuses</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <p className="mb-1 text-xs font-medium text-slate-600">
                Visibility
              </p>
              <Select defaultValue="all-visibility">
                <SelectTrigger className="h-8 w-full rounded-md border-slate-200 bg-slate-50 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-visibility">All Visibility</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end pb-2 text-xs font-medium text-slate-500">
              5 results
            </div>
          </div>
        </section>
      </section>

      <section className="space-y-3">
        {discussions.map((item) => (
          <DiscussionCard key={item.title} item={item} />
        ))}
      </section>
    </div>
  );
}
