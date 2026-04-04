import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from "./ui/sidebar";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef } from "react";
import {
  AlertTriangleIcon,
  Building2Icon,
  CheckCircle2Icon,
  ClipboardCheckIcon,
  CopyrightIcon,
  FileTextIcon,
  GavelIcon,
  Globe2Icon,
  Grid2X2Icon,
  LockIcon,
  MessageCircleIcon,
  ScaleIcon,
  ShieldCheckIcon,
  ShieldIcon,
  UsersIcon,
} from "lucide-react";

import allneedaLogo from "@/assets/Logo.svg";
import LogoutDialog from "./LogoutDialog";

export default function AppSidebar() {
  const location = useLocation();
  const activeItemRef = useRef<HTMLLIElement>(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [location.pathname]);

  const menuItems = [
    {
      icon: Grid2X2Icon,
      label: "Dashboard",
      key: "Dashboard",
      path: "/dashboard",
    },
    {
      icon: GavelIcon,
      label: "Legal Governance",
      key: "legal-governance",
      path: "/legal-governance",
    },
    {
      icon: FileTextIcon,
      label: "Policies & Documents",
      key: "policies-documents",
      path: "/policies-documents",
    },
    {
      icon: Globe2Icon,
      label: "Regulatory Affairs",
      key: "regulatory-affairs",
      path: "/regulatory-affairs",
    },
    {
      icon: ClipboardCheckIcon,
      label: "Permits & Licensing",
      key: "permits-licensing",
      path: "/permits-licensing",
    },
    {
      icon: ShieldIcon,
      label: "Insurance",
      key: "insurance",
      path: "/insurance",
    },
    {
      icon: CheckCircle2Icon,
      label: "Compliance",
      key: "compliance",
      path: "/compliance",
    },
    {
      icon: CopyrightIcon,
      label: "IP & Copyright",
      key: "ip-copyright",
      path: "/ip-copyright",
    },
    {
      icon: UsersIcon,
      label: "Contracts",
      key: "contracts",
      path: "/contracts",
    },
    {
      icon: ScaleIcon,
      label: "Disputes & Claims",
      key: "disputes-claims",
      path: "/disputes-claims",
    },
    {
      icon: UsersIcon,
      label: "Employment Legal",
      key: "employment-legal",
      path: "/employment-legal",
    },
    {
      icon: ShieldCheckIcon,
      label: "Brand Protection",
      key: "brand-protection",
      path: "/brand-protection",
    },
    {
      icon: LockIcon,
      label: "Privacy Legal",
      key: "privacy-legal",
      path: "/privacy-legal",
    },
    {
      icon: Building2Icon,
      label: "Corporate Governance",
      key: "corporate-governance",
      path: "/corporate-governance",
    },
    {
      icon: AlertTriangleIcon,
      label: "Litigation Risk",
      key: "litigation-risk",
      path: "/litigation-risk",
    },
    {
      icon: UsersIcon,
      label: "Human Resources",
      key: "human-resources",
      path: "/human-resources",
    },
    {
      icon: MessageCircleIcon,
      label: "Communication & Disclosures",
      key: "communication-disclosures",
      path: "/communication-disclosures",
    },
  ];

  return (
    <Sidebar className="border-0 shadow-none rounded-r-4xl overflow-hidden">
      <SidebarHeader className="px-3 py-4 font-poppins">
        <div className="flex flex-col items-center">
          <img
            src={allneedaLogo}
            alt="Allneeda Logo"
            className="size-20 w-auto mb-2"
          />
          <div className="text-sidebar-foreground truncate font-poppins">
            Legal & Permit Directory
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="pl-4 pt-4 border-0 shadow-none">
        <SidebarMenu className="space-y-1">
          {menuItems.map((m) => {
            const isActive =
              location.pathname === m.path ||
              location.pathname.startsWith(`${m.path}/`);
            return (
              <SidebarMenuItem
                key={m.label}
                ref={isActive ? activeItemRef : null}
              >
                <SidebarMenuButton
                  asChild
                  isActive={isActive}
                  className="relative overflow-visible h-10 pl-4 rounded-l-full data-[active=true]:font-semibold data-[active=true]:before:absolute data-[active=true]:before:right-0 data-[active=true]:before:-top-[20px] data-[active=true]:before:h-[20px] data-[active=true]:before:w-[20px] data-[active=true]:before:bg-[radial-gradient(circle_at_0_0,transparent_20px,var(--sidebar-accent)_20.5px)] data-[active=true]:before:content-[''] data-[active=true]:after:absolute data-[active=true]:after:right-0 data-[active=true]:after:-bottom-[20px] data-[active=true]:after:h-[20px] data-[active=true]:after:w-[20px] data-[active=true]:after:bg-[radial-gradient(circle_at_0_20px,transparent_20px,var(--sidebar-accent)_20.5px)] data-[active=true]:after:content-['']"
                >
                  <NavLink
                    to={m.path}
                    className="flex items-center gap-2 w-full font-poppins"
                  >
                    <m.icon />
                    <span className="truncate">{m.label}</span>
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter>
        {/* Logout button */}
        <LogoutDialog />
      </SidebarFooter>

      {/* 
      <SidebarRail /> */}
    </Sidebar>
  );
}
