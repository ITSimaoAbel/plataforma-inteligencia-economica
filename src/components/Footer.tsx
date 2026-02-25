import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Footer = () => {
  const { t } = useLanguage();
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success("Newsletter subscrita com sucesso!");
      setEmail("");
    }
  };

  return (
    <footer className="footer-gradient text-[hsl(var(--footer-foreground))]">
      <div className="container mx-auto px-4 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <span className="text-sm font-bold text-primary-foreground">IE</span>
              </div>
              <span className="font-serif text-lg text-[hsl(0,0%,95%)]">Inteligência Econômica</span>
            </div>
            <p className="text-sm leading-relaxed opacity-70">
              {t("footer.description")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 font-semibold text-[hsl(0,0%,95%)]">{t("footer.links")}</h4>
            <nav className="flex flex-col gap-2">
              {[
                { to: "/opportunities", label: t("nav.opportunities") },
                { to: "/dashboard", label: t("nav.dashboard") },
                { to: "/reports", label: t("nav.reports") },
                { to: "/mpme", label: t("nav.mpme") },
                { to: "/about", label: t("nav.about") },
              ].map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm opacity-70 transition-opacity hover:opacity-100"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 font-semibold text-[hsl(0,0%,95%)]">{t("footer.contact")}</h4>
            <div className="flex flex-col gap-3 text-sm opacity-70">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> info@ie-mocambique.co.mz
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +258 21 123 456
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Maputo, Moçambique
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 font-semibold text-[hsl(0,0%,95%)]">{t("footer.newsletter")}</h4>
            <form onSubmit={handleNewsletter} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("footer.newsletter.placeholder")}
                className="flex-1 rounded-lg border border-[hsl(0,0%,20%)] bg-[hsl(0,0%,12%)] px-3 py-2 text-sm text-[hsl(0,0%,95%)] placeholder:opacity-50"
                required
              />
              <button
                type="submit"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-accent"
              >
                {t("footer.newsletter.button")}
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-[hsl(0,0%,15%)] pt-6 text-center text-sm opacity-50">
          © 2026 Inteligência Econômica Moçambique. {t("footer.rights")}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
