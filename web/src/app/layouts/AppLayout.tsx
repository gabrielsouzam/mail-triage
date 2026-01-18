import { Outlet } from "react-router-dom";
import { Header } from "../../components/ui/Header";
import { MobileSidebar } from "../../components/ui/MobileSidebar";
import { useState } from "react";

export function AppLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#f9f6f1] to-[#f3ede3]">
      <Header onMenuClick={() => setIsSidebarOpen(true)} />
      <Outlet />
      <MobileSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
    </div>
  );
}