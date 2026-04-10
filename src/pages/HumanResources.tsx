import { useState } from "react";
import {
  Activity,
  CalendarDays,
  ClipboardList,
  UserPlus,
  Users,
} from "lucide-react";
import GlobalFilters from "@/components/dashboard/GlobalFilters";
import PageHeader from "@/components/PageHeader";
import AddEmployeeActivityDialog from "@/components/employment/AddEmployeeActivityDialog";
import HRCalendarDialog from "@/components/employment/HRCalendarDialog";
import RecruitEmployeeDialog from "@/components/employment/RecruitEmployeeDialog";
import ScheduleReviewDialog from "@/components/employment/ScheduleReviewDialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

const summaryStats = [
  {
    title: "Total Employees",
    value: "248",
    change: "+12 this month",
    icon: <Users className="h-5 w-5" />,
    iconBg: "bg-sky-100 text-sky-700",
  },
  {
    title: "New Hires",
    value: "8",
    change: "This month",
    icon: <UserPlus className="h-5 w-5" />,
    iconBg: "bg-emerald-100 text-emerald-700",
  },
  {
    title: "Pending Reviews",
    value: "15",
    change: "Due this week",
    icon: <ClipboardList className="h-5 w-5" />,
    iconBg: "bg-violet-100 text-violet-700",
  },
  {
    title: "Attendance Rate",
    value: "96%",
    change: "+1% from last month",
    icon: <Activity className="h-5 w-5" />,
    iconBg: "bg-orange-100 text-orange-700",
  },
];

const recentActivities = [
  {
    name: "Sarah Johnson",
    role: "New Hire",
    team: "Engineering",
    date: "Nov 20, 2025",
    initials: "SJ",
  },
  {
    name: "Michael Chen",
    role: "Performance Review",
    team: "Marketing",
    date: "Nov 19, 2025",
    initials: "MC",
  },
  {
    name: "Emily Davis",
    role: "Leave Request",
    team: "Sales",
    date: "Nov 18, 2025",
    initials: "ED",
  },
  {
    name: "Robert Wilson",
    role: "Promotion",
    team: "Finance",
    date: "Nov 17, 2025",
    initials: "RW",
  },
  {
    name: "Jessica Taylor",
    role: "Project Kickoff",
    team: "Product Management",
    date: "Nov 16, 2025",
    initials: "JT",
  },
];

const quickActions = [
  {
    label: "Recruit Employee",
    icon: UserPlus,
  },
  {
    label: "Schedule Review",
    icon: ClipboardList,
  },
  {
    label: "View Calendar",
    icon: CalendarDays,
  },
];

const upcomingEvents = [
  {
    title: "Team Building Event",
    date: "Nov 25, 2025",
    attendees: "45 attendees",
  },
  {
    title: "Benefits Open Enrollment",
    date: "Dec 1, 2025",
    attendees: "248 attendees",
  },
  {
    title: "Performance Reviews",
    date: "Dec 5, 2025",
    attendees: "30 attendees",
  },
];

export default function HumanResources() {
  const [isRecruitEmployeeDialogOpen, setIsRecruitEmployeeDialogOpen] =
    useState(false);
  const [isAddEmployeeActivityDialogOpen, setIsAddEmployeeActivityDialogOpen] =
    useState(false);
  const [isScheduleReviewDialogOpen, setIsScheduleReviewDialogOpen] =
    useState(false);
  const [isHRCalendarDialogOpen, setIsHRCalendarDialogOpen] = useState(false);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Human Resources"
        subtitle="Manage employees, reviews, and HR processes"
        actions={
          <Button
            size="lg"
            className="whitespace-nowrap"
            onClick={() => setIsAddEmployeeActivityDialogOpen(true)}
          >
            + Add Employee
          </Button>
        }
      />

      <GlobalFilters />

      <div className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {summaryStats.map((stat) => (
          <Card key={stat.title} className="border border-slate-200">
            <CardContent className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold text-slate-950">
                    {stat.value}
                  </p>
                </div>
                <div
                  className={cn(
                    "inline-flex h-11 w-11 items-center justify-center rounded-2xl",
                    stat.iconBg,
                  )}
                >
                  {stat.icon}
                </div>
              </div>
              <p className="text-sm text-slate-500">{stat.change}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <Card className="border border-slate-200">
          <CardHeader className="">
            <div>
              <CardTitle className="text-xl">Recent Activities</CardTitle>
              <CardDescription>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivities.map((activity) => (
              <div
                key={activity.name}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar className="bg-slate-100 text-slate-900">
                      <AvatarFallback>{activity.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-semibold text-slate-950">
                        {activity.name}
                      </p>
                      <p className="text-sm text-slate-500">
                        {activity.role} • {activity.team}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card className="border border-slate-200">
            <CardHeader className="">
              <CardTitle className="text-xl">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {quickActions.map((action) => {
                const Icon = action.icon;
                return (
                  <Button
                    key={action.label}
                    type="button"
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      if (action.label === "Recruit Employee") {
                        setIsRecruitEmployeeDialogOpen(true);
                      }

                      if (action.label === "Schedule Review") {
                        setIsScheduleReviewDialogOpen(true);
                      }

                      if (action.label === "View Calendar") {
                        setIsHRCalendarDialogOpen(true);
                      }
                    }}
                    className="w-full justify-start h-12"
                  >
                    <Icon className="h-4 w-4" />
                    {action.label}
                  </Button>
                );
              })}
            </CardContent>
          </Card>

          <Card className="border border-slate-200">
            <CardHeader className="">
              <CardTitle className="text-xl">Upcoming Events</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={event.title}>
                  <p className="text-sm font-semibold text-slate-950">
                    {event.title}
                  </p>
                  <p className="text-sm text-slate-500">{event.date}</p>
                  <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                    <Users className="h-4 w-4" />
                    {event.attendees}
                  </p>
                  {index !== upcomingEvents.length - 1 && (
                    <div className="mt-4 border-t border-slate-200" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      <AddEmployeeActivityDialog
        open={isAddEmployeeActivityDialogOpen}
        onOpenChange={setIsAddEmployeeActivityDialogOpen}
      />

      <RecruitEmployeeDialog
        open={isRecruitEmployeeDialogOpen}
        onOpenChange={setIsRecruitEmployeeDialogOpen}
      />

      <ScheduleReviewDialog
        open={isScheduleReviewDialogOpen}
        onOpenChange={setIsScheduleReviewDialogOpen}
      />

      <HRCalendarDialog
        open={isHRCalendarDialogOpen}
        onOpenChange={setIsHRCalendarDialogOpen}
      />
    </div>
  );
}
