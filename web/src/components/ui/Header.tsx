import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { LogOut, Menu } from "lucide-react";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { user, logout } = useAuth();

  return (
    <header className="bg-gradient-to-r from-[#2c5f6f] to-[#3a7a8c] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-4">
        <div className="flex lg:hidden items-center justify-between">
          <button
            onClick={onMenuClick}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <Menu size={24} />
          </button>

          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="Mail Triage" className="w-8 h-8" />
            <h1 className="text-lg font-bold">Mail Triage</h1>
          </div>

          <div className="w-10"></div>
        </div>

        <div className="hidden lg:flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/logo.svg" alt="Mail Triage" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Mail Triage</h1>

            <nav className="flex items-center gap-6 ml-4 pl-4 border-l border-white/20">
              <Link
                to="/"
                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                Analisar
              </Link>
              <Link
                to="/dashboard"
                className="px-3 py-2 rounded-lg hover:bg-white/10 transition-all duration-200 hover:scale-105 cursor-pointer"
              >
                Dashboard
              </Link>
            </nav>
          </div>

          <nav className="flex items-center">
            <div className="flex items-center gap-4">
              {user?.picture && (
                <img
                  src={user.picture}
                  alt={user.name}
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                />
              )}
              <span className="text-sm">{user?.name}</span>
              <button
                onClick={logout}
                className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-700/40 transition-all duration-200 hover:scale-105 cursor-pointer"
                title="Sair"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}