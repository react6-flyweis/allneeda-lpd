import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import NotificationsSheet from "@/components/layouts/NotificationsSheet";
import RoleMenu from "@/components/layouts/RoleMenu";
import ChatDialog from "@/components/chat/ChatDialog";

import searchIcon from "@/assets/icons/SearchIcon.svg";
import greyChatIcon from "@/assets/icons/greyChatIcon.svg";

import { SidebarTrigger } from "./ui/sidebar";

export default function Topbar() {
  const [role, setRole] = useState("LPD");

  return (
    <header className="w-full px-6 py-3 flex items-center justify-between bg-background ">
      <SidebarTrigger className="lg:hidden" />

      <div className="flex-1 max-w-sm">
        <InputGroup className="bg-[#E8F1FF] rounded-full border-0">
          <InputGroupAddon align="inline-start">
            <img src={searchIcon} alt="Search" />
          </InputGroupAddon>
          <InputGroupInput placeholder="Search" aria-label="Search" />
        </InputGroup>
      </div>

      <div className="flex items-center gap-4 ml-6">
        <ChatDialog>
          <Button variant="ghost" size="icon" aria-label="Messages">
            <img src={greyChatIcon} alt="Messages" />
          </Button>
        </ChatDialog>

        <NotificationsSheet />

        <RoleMenu role={role} setRole={setRole} />
      </div>
    </header>
  );
}
