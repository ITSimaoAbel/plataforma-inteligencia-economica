import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Menu, X, Globe, User, LogOut, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const Header = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { path: "/", label: t("nav.home") },
    { path: "/opportunities", label: t("nav.opportunities") },
    { path: "/dashboard", label: t("nav.dashboard") },
    { path: "/alerts", label: t("nav.alerts") },
    { path: "/reports", label: t("nav.reports") },
    { path: "/mpme", label: t("nav.mpme") },
    { path: "/about", label: t("nav.about") },
  ];

  const isActive = (path: string) =>
    location.pathname === path ||
    (path !== "/" && location.pathname.startsWith(path));

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="hidden font-serif text-lg text-foreground sm:block">
            Inteligência Econômica
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                isActive(item.path)
                  ? "bg-secondary text-secondary-foreground"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          {user?.isAdmin && (
            <Link
              to="/admin"
              className={`flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                location.pathname.startsWith("/admin")
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <UserCheck className="h-3.5 w-3.5" /> Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLanguage(language === "pt" ? "en" : "pt")}
            className="flex items-center gap-1 rounded-md px-2 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <Globe className="h-4 w-4" />
            <span className="font-medium">
              {language === "pt" ? "EN" : "PT"}
            </span>
          </button>

          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <Link to="/profile">
                <Button variant="ghost" size="sm" className="gap-1">
                  <User className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {user?.name?.split(" ")[0]}
                  </span>
                </Button>
              </Link>
              <Button variant="ghost" size="sm" onClick={logout}>
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Link to="/login">
              <Button size="sm">{t("nav.login")}</Button>
            </Link>
          )}

          <button
            className="rounded-md p-2 lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="border-t border-border bg-card px-4 py-4 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileOpen(false)}
                className={`rounded-md px-3 py-2.5 text-sm font-medium ${
                  isActive(item.path)
                    ? "bg-secondary text-secondary-foreground"
                    : "text-muted-foreground"
                }`}
              >
                {item.label}
              </Link>
            ))}
            {user?.isAdmin && (
              <Link
                to="/admin"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-1 rounded-md px-3 py-2.5 text-sm font-medium text-primary"
              >
                <UserCheck className="h-3.5 w-3.5" /> Admin
              </Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
