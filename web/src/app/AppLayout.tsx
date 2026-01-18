import { Header } from "../components/ui/Header";

import { Outlet } from "react-router-dom";

export function AppLayout() {
  return (
    <div className="font-poppins min-h-screen bg-gradient-to-br from-[#fdfcfb] via-[#f9f6f1] to-[#f3ede3]">
      <Header />
      <Outlet />
    </div>
  )
}