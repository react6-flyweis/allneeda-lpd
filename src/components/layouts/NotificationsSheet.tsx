import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Trash2 } from "lucide-react";

import NotificationDialog from "@/components/layouts/NotificationDialog";
import notificationsEmptyIllustration from "@/assets/notifications-empty.png";
import greyNotificationIcon from "@/assets/icons/greyNotificationIcon.svg";

const mockNotifications = [
  {
    id: "1",
    title: "CEO Wants an emergency update",
    description:
      "Currently you onboarding 2 providers/day, but CEO wants to upscale the onboarding rate to 6 provider/day",
    canReply: true,
  },
  {
    id: "2",
    title: "Headline...",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    canReply: false,
  },
  {
    id: "3",
    title: "Headline...",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    canReply: false,
  },
  {
    id: "4",
    title: "Headline...",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
    canReply: false,
  },
];

export default function NotificationsSheet() {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedNotification, setSelectedNotification] = useState<{
    id: string;
    title: string;
    description: string;
    canReply?: boolean;
  } | null>(null);

  const openNotification = (n: {
    id: string;
    title: string;
    description: string;
    canReply?: boolean;
  }) => {
    setSelectedNotification(n);
    setDialogOpen(true);
  };

  const handleDeleteNotification = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setNotifications((prev) => prev.filter((p) => p.id !== id));

    if (selectedNotification?.id === id) {
      setDialogOpen(false);
      setSelectedNotification(null);
    }
  };

  const handleDeleteAll = () => {
    setNotifications([]);
    setDialogOpen(false);
    setSelectedNotification(null);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <img src={greyNotificationIcon} alt="Notifications" />
        </Button>
      </SheetTrigger>

      <SheetContent side="right" className="sm:max-w-sm gap-0">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl">Notifications</SheetTitle>
              <SheetDescription className="mt-1">
                You have {notifications.length} notifications
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="p-4 overflow-auto flex flex-col gap-4 flex-1">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-2 py-10 w-full">
              <img
                src={notificationsEmptyIllustration}
                alt="No Notifications"
                className="mb-4"
              />

              <h3 className="text-lg font-semibold">No Notifications</h3>
              <p className="text-sm text-muted-foreground">
                Notification Inbox Empty
              </p>
            </div>
          ) : (
            notifications.map((n) => (
              <div
                key={n.id}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") openNotification(n);
                }}
                onClick={() => openNotification(n)}
                className="relative rounded-xl border border-border bg-card p-3 shadow-sm cursor-pointer hover:bg-muted-foreground/5 transition"
              >
                <h3 className="font-medium">{n.title}</h3>
                <p className="text-xs text-muted-foreground mt-2">
                  {n.description}
                </p>

                {!n.canReply ? (
                  <button
                    aria-label="Delete notification"
                    className="absolute right-3 top-3 text-destructive"
                    onClick={(e) => handleDeleteNotification(e, n.id)}
                  >
                    <Trash2 className="size-4" />
                  </button>
                ) : null}
              </div>
            ))
          )}
        </div>

        <SheetFooter className="items-center">
          {notifications.length > 0 ? (
            <Button
              variant="outline"
              className="border-destructive text-destructive w-64"
              onClick={handleDeleteAll}
            >
              Delete All Notifications
            </Button>
          ) : (
            <Button variant="ghost" disabled className="w-64">
              No notifications
            </Button>
          )}
        </SheetFooter>
      </SheetContent>

      {/* Notification detail dialog */}
      <NotificationDialog
        open={dialogOpen}
        onOpenChange={(v) => {
          if (!v) setSelectedNotification(null);
          setDialogOpen(v);
        }}
        notification={selectedNotification}
        onSend={(id) => {
          setNotifications((prev) => prev.filter((p) => p.id !== id));
          setDialogOpen(false);
          setSelectedNotification(null);
        }}
      />
    </Sheet>
  );
}
