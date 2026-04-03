import { useState } from "react";
import { MoveRight } from "lucide-react";
import allneedaLogo from "@/assets/Logo.svg";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";

type Props = {
  onConfirm?: () => void;
  className?: string;
};

export default function LogoutDialogTrigger({ onConfirm, className }: Props) {
  const [open, setOpen] = useState(false);

  function handleConfirm() {
    setOpen(false);
    if (onConfirm) onConfirm();
    else console.log("Logout confirmed");
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`flex gap-2 items-center p-1 rounded-full group/logout hover:bg-red-100 transition-all w-11 hover:w-full overflow-hidden duration-300 ${className ?? ""}`}
      >
        <div className="size-8 shrink-0 duration-200 group-hover/logout:bg-red-500 bg-white rounded-full flex justify-end items-center transition-colors">
          <MoveRight className="text-sidebar size-6 group-hover/logout:text-white transition-colors" />
        </div>
        <span className="hidden group-hover/logout:block text-nowrap text-red-500 font-semibold font-poppins">
          Log out
        </span>
      </button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent size="default">
          <AlertDialogHeader className="flex flex-col items-center!">
            <AlertDialogMedia className="size-24 rounded-full bg-black">
              <img
                src={allneedaLogo}
                alt="Allneeda"
                className="w-16 h-16 object-contain"
              />
            </AlertDialogMedia>

            <AlertDialogTitle className="font-poppins text-2xl font-bold mt-6">
              Please confirm if you'd like to log out.
            </AlertDialogTitle>
            <AlertDialogDescription className="text-center  font-poppins">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter className="sm:justify-center gap-6">
            <AlertDialogAction
              variant="destructive"
              className="flex-1 rounded-full! bg-red-500 text-xl text-white h-11"
              size="lg"
              onClick={handleConfirm}
            >
              Yes
            </AlertDialogAction>
            <AlertDialogCancel
              className="flex-1 rounded-full! bg-gray-500 text-xl text-white h-11"
              size="lg"
            >
              No
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
