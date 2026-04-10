import {
  Building2,
  CalendarDays,
  Circle,
  FileText,
  Globe,
  Lock,
  MessageCircle,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

type DiscussionStatus =
  | "in review"
  | "clarified"
  | "waiting response"
  | "converted to approval"
  | "open";

type Visibility = "department" | "company" | "private";

export type DiscussionItem = {
  title: string;
  description: string;
  status: DiscussionStatus;
  visibility: Visibility;
  approvalCode?: string;
  department: string;
  topic: string;
  owner: string;
  date: string;
  participants: string;
  comments: string;
  tags: string[];
};

const statusColorMap: Record<DiscussionStatus, string> = {
  "in review": "bg-violet-100 text-violet-700 border-violet-200",
  clarified: "bg-emerald-100 text-emerald-700 border-emerald-200",
  "waiting response": "bg-amber-100 text-amber-700 border-amber-200",
  "converted to approval": "bg-orange-100 text-orange-700 border-orange-200",
  open: "bg-blue-100 text-blue-700 border-blue-200",
};

const visibilityColorMap: Record<Visibility, string> = {
  department: "bg-white text-slate-700 border-slate-300",
  company: "bg-white text-slate-700 border-slate-300",
  private: "bg-white text-slate-700 border-slate-300",
};

const statusDotColorMap: Record<DiscussionStatus, string> = {
  "in review": "text-violet-500",
  clarified: "text-emerald-500",
  "waiting response": "text-amber-500",
  "converted to approval": "text-orange-500",
  open: "text-blue-500",
};

function VisibilityIcon({ visibility }: { visibility: Visibility }) {
  if (visibility === "private") {
    return <Lock className="h-3.5 w-3.5" />;
  }

  if (visibility === "company") {
    return <Globe className="h-3.5 w-3.5" />;
  }

  return <Building2 className="h-3.5 w-3.5" />;
}

type DiscussionCardProps = {
  item: DiscussionItem;
};

export default function DiscussionCard({ item }: DiscussionCardProps) {
  return (
    <Card className="gap-3 py-4">
      <CardContent className="space-y-2 px-4">
        <div className="flex  items-start justify-between gap-2">
          <div className="space-y-1">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className=" leading-tight font-semibold text-slate-900">
                {item.title}
              </h3>

              <Badge
                variant="outline"
                className={cn(
                  "h-5 rounded-full border px-2 text-xs font-medium capitalize",
                  statusColorMap[item.status],
                )}
              >
                <Circle
                  className={cn(
                    "mr-1 h-2.5 w-2.5 fill-current stroke-none",
                    statusDotColorMap[item.status],
                  )}
                />
                {item.status}
              </Badge>

              <Badge
                variant="outline"
                className={cn(
                  "h-5 rounded-full border px-2 text-xs font-medium capitalize",
                  visibilityColorMap[item.visibility],
                )}
              >
                <VisibilityIcon visibility={item.visibility} />
                {item.visibility}
              </Badge>

              {item.approvalCode && (
                <Badge
                  variant="outline"
                  className="h-5 rounded-full border border-violet-200 bg-violet-100 px-2 text-xs font-medium text-violet-700"
                >
                  {item.approvalCode}
                </Badge>
              )}
            </div>

            <p className="text-sm leading-6 text-slate-600">
              {item.description}
            </p>
          </div>

          <Button
            variant="outline"
            className="h-9 rounded-xl border-slate-300 px-4 text-sm font-medium text-slate-700"
          >
            View Details
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500">
          <span className="flex items-center gap-1.5">
            <Building2 className="h-3.5 w-3.5" />
            {item.department}
          </span>
          <span className="flex items-center gap-1.5">
            <FileText className="h-4 w-4" />
            {item.topic}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {item.owner}
          </span>
          <span className="flex items-center gap-1.5">
            <CalendarDays className="h-4 w-4" />
            {item.date}
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="h-4 w-4" />
            {item.participants}
          </span>
          <span className="flex items-center gap-1.5">
            <MessageCircle className="h-4 w-4" />
            {item.comments}
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <Badge
              key={`${item.title}-${tag}`}
              variant="outline"
              className="rounded-md border-slate-300 bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
            >
              {tag}
            </Badge>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
