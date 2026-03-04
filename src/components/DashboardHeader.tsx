import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { LogOut, Globe, X, Menu, Bell, PanelRightOpen, LayoutDashboard } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"

interface DashboardHeaderProps {
  sidebarOpen: boolean
  onToggleSidebar: () => void
}

export function DashboardHeader({ sidebarOpen, onToggleSidebar }: DashboardHeaderProps) {
  const navigate = useNavigate()
  const { user, logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  return (
    <header className="sticky top-0 z-40 h-16 bg-white border-b border-slate-200 shadow-sm">
      <div className="flex h-full items-center justify-between px-6">
        {/* Left: Toggle Button */}
        <button
          onClick={onToggleSidebar}
          className="text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg p-2 transition-colors"
          title={sidebarOpen ? "Fechar sidebar" : "Abrir sidebar"}
        >
          {/* {sidebarOpen ? <PanelRightOpen className="h-5 w-5" /> : <Menu className="h-5 w-5" />} */}
          {sidebarOpen ? <LayoutDashboard className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* Right: Language Switcher + User Dropdown */}
        <div className="flex items-center gap-6">
          {/* Language Switcher */}
          <div className="flex items-center gap-2">
            <Globe className="h-4 w-4 text-slate-600" />
            <button
              onClick={() => setLanguage("pt")}
              className={cn(
                "px-2 py-1 text-xs rounded transition-colors font-medium",
                language === "pt" ? "bg-green-100 text-green-700" : "text-slate-600 hover:text-slate-900"
              )}
            >
              PT
            </button>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setLanguage("en")}
              className={cn(
                "px-2 py-1 text-xs rounded transition-colors font-medium",
                language === "en" ? "bg-green-100 text-green-700" : "text-slate-600 hover:text-slate-900"
              )}
            >
              EN
            </button>
          </div>

          {/* Notification Icon */}
          <button className="relative text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg p-2 transition-colors" title="Notificações">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white font-medium">
              3
            </span>
          </button>

          {/* User Dropdown */}
          <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-slate-100 transition-colors"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase() || "U"}
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-slate-900">{user?.name || "Utilizador"}</p>
              <p className="text-xs text-slate-500">{user?.company || "Empresa"}</p>
            </div>
          </button>

          {/* Dropdown Menu */}
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 rounded-lg bg-white border border-slate-200 shadow-lg">
              {/* User Info */}
              <div className="border-b border-slate-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-medium">
                    {user?.name?.charAt(0).toUpperCase() || "U"}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{user?.name || "Utilizador"}</p>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* User Details */}
              <div className="border-b border-slate-200 p-4 text-sm">
                {user?.company && (
                  <div className="mb-2">
                    <p className="text-xs text-slate-500">Empresa</p>
                    <p className="text-slate-900 font-medium">{user.company}</p>
                  </div>
                )}
                {user?.phone && (
                  <div className="mb-2">
                    <p className="text-xs text-slate-500">Telefone</p>
                    <p className="text-slate-900 font-medium">{user.phone}</p>
                  </div>
                )}
                {user?.province && (
                  <div>
                    <p className="text-xs text-slate-500">Província</p>
                    <p className="text-slate-900 font-medium">{user.province}</p>
                  </div>
                )}
              </div>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                {t("nav.logout") || "Sair"}
              </button>
            </div>
          )}
            </div>
        </div>
      </div>

      {/* Overlay to close dropdown */}
      {dropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setDropdownOpen(false)}
        />
      )}
    </header>
  )
}
