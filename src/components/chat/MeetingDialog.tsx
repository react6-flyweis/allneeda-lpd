import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Copy,
  Mic,
  MicOff,
  Video,
  VideoOff,
  MoreVertical,
  Phone,
  Hand,
  MonitorUp,
  Smile,
  Users,
  MessageSquare,
  Lock,
  X,
  UserPlus,
  Share2,
  PhoneOff,
  Settings,
  Grid3x3,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface MeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MeetingDialog({ open, onOpenChange }: MeetingDialogProps) {
  const [micOn, setMicOn] = useState(true);
  const [cameraOn, setCameraOn] = useState(false);
  const [showJoiningInfo, setShowJoiningInfo] = useState(true);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        showCloseButton={false}
        className="sm:max-w-5xl h-[90vh] p-0 gap-0 bg-[#0F172B] border-none text-white overflow-hidden flex flex-col"
      >
        {/* Main Content Area */}
        <div className="flex-1 bg-[#8B1A45] m-4 rounded-2xl relative overflow-hidden flex items-center justify-center">
          {/* Back Button */}
          <div className="absolute top-4 left-4 z-10">
            <Button
              variant="ghost"
              size="icon"
              className="bg-white/20 hover:bg-white/30 rounded-full text-white h-10 w-10"
              onClick={() => onOpenChange(false)}
            >
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </div>

          {/* Joining Info Card */}
          {showJoiningInfo && (
            <div className="absolute left-4 top-20 z-20 bg-white text-black p-4 rounded-lg shadow-lg max-w-xs w-full animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-medium">Your meeting's ready</h3>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowJoiningInfo(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-4 gap-2">
                <UserPlus className="h-4 w-4" />
                Add others
              </Button>

              <p className="text-sm text-gray-600 mb-2">
                Or share this joining info with others you want in the meeting
              </p>

              <div className="flex items-center gap-2 bg-gray-100 p-2 rounded mb-4">
                <span className="text-sm text-gray-700 flex-1 truncate">
                  meet.google.com/vim-xzay-n
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-blue-600"
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>

              <div className="space-y-1 text-sm text-gray-600 mb-4">
                <p>Dial-in: (US) +1 401-584-3501</p>
                <p>PIN: 408 659 995#</p>
              </div>

              <div className="flex flex-col gap-2">
                <button className="text-blue-600 text-sm font-medium hover:underline text-left flex items-center gap-2">
                  <Phone className="h-3 w-3" /> More phone numbers
                </button>
                <button className="text-blue-600 text-sm font-medium hover:underline text-left flex items-center gap-2">
                  <Share2 className="h-3 w-3" /> Share full details
                </button>
              </div>

              <div className="mt-4 pt-4 border-t flex items-center gap-2">
                <span className="text-xs text-gray-500">
                  Joined as varunkumar@fyweb.technology
                </span>
              </div>
            </div>
          )}

          {/* Center Avatar Area */}
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="h-32 w-32 rounded-full bg-[#EA4335] flex items-center justify-center shadow-2xl">
                <Avatar className="h-28 w-28 border-4 border-[#A5273F]">
                  <AvatarImage src="" />{" "}
                  {/* Placeholder for user image if needed */}
                  <AvatarFallback className="bg-transparent text-white text-5xl">
                    <Users className="h-16 w-16 opacity-50" />
                  </AvatarFallback>
                </Avatar>
              </div>
              {/* Pulse animations or status rings could go here */}
            </div>

            {/* Mini controls overlay on video/avatar area if needed */}
            <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                {micOn ? (
                  <MicOff className="h-4 w-4 text-red-500" />
                ) : (
                  <Mic className="h-4 w-4" />
                )}
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <VideoOff className="h-4 w-4 text-red-500" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-8 w-8 text-white hover:bg-white/20 rounded-full"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Control Bar */}
        <div className="px-6 pb-3 flex items-center justify-between bg-[#0F172B]">
          {/* Left: Time and Meeting Code */}
          <div className="flex items-center gap-4 text-white/90 hidden md:flex min-w-50">
            <span className="text-sm font-medium">10:44 AM</span>
            <span className="text-white/20">|</span>
            <span className="text-sm font-medium">vim-xzay-gnn</span>
          </div>

          {/* Center: Main Controls */}
          <div className="flex items-center gap-2 justify-center flex-1">
            <ControlBadge
              active={micOn}
              onClick={() => setMicOn(!micOn)}
              iconOn={<Mic className="h-5 w-5" />}
              iconOff={<MicOff className="h-5 w-5" />}
              danger={!micOn} // In image, mic is white (maybe on?) but usually red is off. Image has white mic. Let's assume white is neutral/on.
            />
            <ControlBadge
              active={cameraOn}
              onClick={() => setCameraOn(!cameraOn)}
              iconOn={<Video className="h-5 w-5" />}
              iconOff={<VideoOff className="h-5 w-5" />}
              danger={!cameraOn} // Image has red camera icon.
            />
            <ControlBadge iconOn={<Hand className="h-5 w-5" />} />
            <ControlBadge iconOn={<MonitorUp className="h-5 w-5" />} />
            <ControlBadge iconOn={<Smile className="h-5 w-5" />} />
            <ControlBadge iconOn={<MoreVertical className="h-5 w-5" />} />

            <Button
              size="icon"
              className="size-12 rounded-full bg-red-600 hover:bg-red-700 text-white ml-2"
              onClick={() => onOpenChange(false)}
            >
              <PhoneOff className="h-5 w-5" />
            </Button>
          </div>

          {/* Right: Secondary Controls */}
          <div className="flex items-center gap-3 justify-end ">
            <Button size="icon" variant="ghost" className="rounded-full">
              <Settings className="h-5 w-5" />
            </Button>
            <div className="relative">
              <Button size="icon" variant="ghost" className="rounded-full">
                <Users className="h-5 w-5" />
              </Button>
              <Badge className="bg-blue-500 absolute top-0 text-[8px] right-0 aspect-square">
                1
              </Badge>
            </div>
            <Button size="icon" variant="ghost" className=" rounded-full">
              <MessageSquare className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Grid3x3 className="h-5 w-5" />
            </Button>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Lock className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Helper component for control buttons
function ControlBadge({
  active = true,
  danger = false,
  iconOn,
  iconOff,
  onClick,
}: {
  active?: boolean;
  danger?: boolean;
  iconOn: React.ReactNode;
  iconOff?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={onClick}
      className={cn(
        "h-10 w-10 rounded-full transition-colors",
        danger
          ? "bg-red-600 text-white hover:bg-red-700"
          : "bg-[#3C4043] text-white hover:bg-[#4d5155]",
      )}
    >
      {active ? iconOn : iconOff || iconOn}
    </Button>
  );
}
