import { X, Mail, BarChart3, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const { user, logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <img src="/logo.svg" alt="Mail Triage" className="w-8 h-8" />
              <span className="text-lg font-bold text-[#2c5f6f]">Mail Triage</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
            >
              <X size={24} className="text-gray-600" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            <div className="mb-6">
              <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-[#2c5f6f]/10 to-[#3a7a8c]/10 rounded-lg">
                {user?.picture && (
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">
                    {user?.name}
                  </p>
                </div>
              </div>
            </div>

            <nav className="space-y-2">
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#2c5f6f]/10 rounded-lg transition-colors cursor-pointer"
              >
                <Mail size={20} className="text-[#2c5f6f]" />
                <span className="font-medium">Analisar Email</span>
              </Link>

              <Link
                to="/dashboard"
                onClick={onClose}
                className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-[#2c5f6f]/10 rounded-lg transition-colors cursor-pointer"
              >
                <BarChart3 size={20} className="text-[#2c5f6f]" />
                <span className="font-medium">Dashboard</span>
              </Link>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors font-medium cursor-pointer"
            >
              <LogOut size={20} />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
