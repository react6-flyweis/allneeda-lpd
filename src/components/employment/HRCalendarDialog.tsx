import { CalendarDays, ClipboardList, Users, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface HRCalendarDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const calendarItems = [
  {
    title: "Performance Reviews",
    description: "30 employees scheduled for quarterly reviews",
    date: "Dec 5, 2025",
    icon: ClipboardList,
    bg: "bg-sky-50",
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    title: "Team Building Event",
    description: "45 attendees · Location: Conference Room A",
    date: "Nov 25, 2025",
    icon: Users,
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "New Hire Onboarding",
    description: "3 new employees starting · Engineering & Sales",
    date: "Nov 27, 2025",
    icon: UserPlus,
    bg: "bg-violet-50",
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Benefits Open Enrollment",
    description: "248 employees · Deadline: Dec 15, 2025",
    date: "Dec 1, 2025",
    icon: CalendarDays,
    bg: "bg-emerald-50",
    iconBg: "bg-emerald-100 text-emerald-700",
  },
];

const summaryItems = [
  { label: "Scheduled Reviews", value: "5" },
  { label: "New Hires Starting", value: "3" },
  { label: "Team Events", value: "1" },
  { label: "Leave Requests Pending", value: "7" },
];

export default function HRCalendarDialog({
  open,
  onOpenChange,
}: HRCalendarDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>HR Calendar - November 2025</DialogTitle>
          <DialogDescription>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 pt-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-sky-500" />
                Reviews
              </span>
              <span className="inline-flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                Events
              </span>
              <span className="inline-flex items-center gap-2  ">
                <span className="h-2.5 w-2.5 rounded-full bg-violet-500" />
                Onboarding
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {calendarItems.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className={`rounded-lg border border-slate-200 ${item.bg} p-4`}
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-start gap-4">
                      <span
                        className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${item.iconBg}`}
                      >
                        <Icon className="h-5 w-5" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-slate-950">
                          {item.title}
                        </p>
                        <p className="mt-1 text-sm text-slate-600">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500">{item.date}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="rounded-lg bg-gray-50 border border-slate-200  p-6">
            <p className="text-sm font-semibold text-slate-950">
              This Week Summary
            </p>
            <div className="mt-4 space-y-3 text-sm text-slate-600">
              {summaryItems.map((item) => (
                <div
                  key={item.label}
                  className="flex items-center justify-between"
                >
                  <span>{item.label}</span>
                  <span className="font-semibold text-slate-900">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DialogFooter className="pt-6">
          <Button className="w-full" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
