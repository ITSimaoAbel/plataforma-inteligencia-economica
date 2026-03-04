"use client"

import { useNavigate, useLocation } from "react-router-dom"
import { LayoutDashboard, FileText, Bell, ShoppingCart, Lightbulb, Globe, LogOut, Briefcase } from "lucide-react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext"
import { useAuth } from "@/contexts/AuthContext"

interface SidebarProps {
  className?: string
  isOpen: boolean
  onToggleSidebar: () => void
}

export function Sidebar({ className, isOpen, onToggleSidebar }: SidebarProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const { logout } = useAuth()
  const { language, setLanguage, t } = useLanguage()

  const handleLogout = async () => {
    await logout()
    navigate("/")
  }

  const menuItems = [
    { icon: LayoutDashboard, label: t("nav.dashboard") || "Dashboard", href: "/dashboard" },
    { icon: Briefcase, label: t("nav.opportunities") || "Oportunidades", href: "/opportunities" },
    { icon: Bell, label: t("nav.alerts") || "Alertas", href: "/alerts" },
    { icon: FileText, label: t("nav.reports") || "Relatórios", href: "/reports" },
    { icon: Lightbulb, label: t("nav.mpme") || "Para MPME", href: "/mpme" },
  ]

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-gradient-to-b from-green-900 to-green-800 text-white shadow-lg transition-all duration-300 overflow-y-auto",
        isOpen ? "w-64" : "w-20",
        className
      )}
    >
      {/* Logo */}
      <div className={cn("flex items-center justify-center border-b border-white/10", isOpen ? "h-20 px-4" : "h-20")}>
        {isOpen && (
          <div className="text-center">
            <h1 className="text-xl font-bold">Inteligência Económica</h1>
            <p className="text-xs text-white/60">Moçambique</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="mt-6 flex-1 px-3 space-y-2 overflow-y-auto pb-32">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.href
          return (
            <button
              key={item.href}
              onClick={() => navigate(item.href)}
              className={cn(
                "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-white/25 text-white shadow-md"
                  : "text-white/80 hover:bg-white/15 hover:text-white",
                !isOpen && "justify-center px-2"
              )}
              title={!isOpen ? item.label : ""}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {isOpen && <span>{item.label}</span>}
            </button>
          )
        })}
      </nav>

      {/* Language Switcher & Logout */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/10 p-4 space-y-3">

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={cn(
            "w-full flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-all duration-200 text-white/80 hover:bg-red-600 hover:text-red-100",
            !isOpen && "justify-center px-2"
          )}
          title={!isOpen ? t("nav.logout") || "Sair" : ""}
        >
          <LogOut className="h-5 w-5" />
          {isOpen && <span>{t("nav.logout") || "Sair"}</span>}
        </button>
      </div>
    </aside>
  )
}
