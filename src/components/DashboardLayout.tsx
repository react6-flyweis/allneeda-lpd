import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import AppSidebar from "./AppSidebar";
import { SidebarInset, SidebarProvider } from "./ui/sidebar";

const DashboardLayout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <SidebarProvider className="">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <AppSidebar />

      {/* Main Content Area */}
      <SidebarInset className="flex-1 flex flex-col min-w-0 bg-[--dark-blue]">
        <Header />

        <div className="flex-1 p-4 md:p-6 md:pr-4">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default DashboardLayout;
