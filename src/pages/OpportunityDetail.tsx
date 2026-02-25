// pages/OpportunityDetail.tsx (ou o caminho do seu arquivo)
import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { opportunities } from "@/data/mockData";
import {
  ArrowLeft,
  MapPin,
  Briefcase,
  Clock,
  Building2,
  Calendar,
  Download,
  Bell,
  Mail,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import MozambiqueMap from "@/components/MozambiqueMap"; // ✅ JÁ ESTÁ IMPORTADO!

const statusStyles: Record<string, string> = {
  planned: "bg-info/10 text-info",
  ongoing: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
};

const OpportunityDetail = () => {
  const { id } = useParams();
  const { t, language } = useLanguage();
  const { isAuthenticated } = useAuth();
  const opp = opportunities.find((o) => o.id === id);

  if (!opp)
    return (
      <Layout>
        <div className="container mx-auto px-4 py-20 text-center">
          <p className="text-muted-foreground">Oportunidade não encontrada.</p>
          <Link to="/opportunities">
            <Button variant="outline" className="mt-4">
              {t("detail.back")}
            </Button>
          </Link>
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <Link
          to="/opportunities"
          className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {t("detail.back")}
        </Link>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main */}
          <div className="lg:col-span-2">
            <div className="mb-4 flex items-center gap-3">
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium ${statusStyles[opp.status]}`}
              >
                {t(`card.${opp.status}`)}
              </span>
            </div>
            <h1 className="font-serif text-3xl text-foreground md:text-4xl">
              {language === "pt" ? opp.title : opp.titleEn}
            </h1>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
              {[
                {
                  icon: MapPin,
                  label: t("card.province"),
                  value: opp.province,
                },
                { icon: Briefcase, label: t("card.sector"), value: opp.sector },
                {
                  icon: Clock,
                  label: t("detail.timeline"),
                  value: opp.timeline,
                },
                {
                  icon: Building2,
                  label: t("detail.entity"),
                  value: opp.entity,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  className="rounded-xl border border-border bg-card p-4"
                >
                  <item.icon className="mb-2 h-5 w-5 text-primary" />
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  <p className="font-medium text-foreground">{item.value}</p>
                </div>
              ))}
              <div className="rounded-xl stat-gradient p-4 text-primary-foreground col-span-2 sm:col-span-1">
                <p className="text-xs opacity-80">{t("card.value")}</p>
                <p className="font-serif text-2xl">
                  {opp.value.toLocaleString()} M MT
                </p>
              </div>
            </div>

            {/*  MAPA INTERATIVO COM LEAFLET */}
            <div className="mt-8 rounded-xl border border-border bg-card p-6">
              <h2 className="mb-4 font-serif text-xl flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" /> Localização
              </h2>
              <MozambiqueMap
                highlightProvince={opp.province}
                onProvinceClick={(province) => {
                  toast.info(`Você clicou em ${province}`);
                }}
              />
              <p className="mt-3 text-sm text-muted-foreground">
                <MapPin className="inline h-3.5 w-3.5 mr-1" />
                Província de {opp.province} destacada no mapa
              </p>
            </div>

            {/* Descrição */}
            <div className="mt-8">
              <h2 className="mb-3 font-serif text-xl">Descrição</h2>
              <p className="leading-relaxed text-muted-foreground">
                {language === "pt" ? opp.description : opp.descriptionEn}
              </p>
            </div>

            {/* Procurement - restricted */}
            {opp.procurement.length > 0 && (
              <div className="mt-8">
                <h2 className="mb-4 font-serif text-xl">
                  {t("detail.suppliers")}
                </h2>
                {isAuthenticated ? (
                  <div className="space-y-3">
                    {opp.procurement.map((p, i) => (
                      <div
                        key={i}
                        className="rounded-xl border border-border bg-card p-4"
                      >
                        <h4 className="font-medium text-foreground">
                          {p.item}
                        </h4>
                        <div className="mt-2 flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> {p.deadline}
                          </span>
                          <span className="flex items-center gap-1">
                            <Mail className="h-3.5 w-3.5" /> {p.contact}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-border bg-muted/50 p-8 text-center">
                    <Lock className="mx-auto mb-3 h-8 w-8 text-muted-foreground" />
                    <p className="mb-2 font-medium text-foreground">
                      Conteúdo exclusivo para MPMEs registadas
                    </p>
                    <p className="mb-4 text-sm text-muted-foreground">
                      Faça login ou registe-se para ver detalhes de procurement
                      e contactos.
                    </p>
                    <Link to="/login">
                      <Button size="sm">Criar Conta Gratuita</Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="flex flex-col gap-4">
            {isAuthenticated ? (
              <>
                <Button
                  className="gap-2"
                  onClick={() =>
                    toast.success("Alerta configurado com sucesso!")
                  }
                >
                  <Bell className="h-4 w-4" /> {t("detail.subscribe")}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => toast.info("Download iniciado!")}
                >
                  <Download className="h-4 w-4" /> {t("detail.download")}
                </Button>
                <Button
                  variant="outline"
                  className="gap-2"
                  onClick={() => toast.info("Redirecionando...")}
                >
                  <Mail className="h-4 w-4" /> {t("detail.contact")}
                </Button>
              </>
            ) : (
              <div className="rounded-xl border border-border bg-card p-6 text-center">
                <Lock className="mx-auto mb-3 h-6 w-6 text-muted-foreground" />
                <p className="mb-2 text-sm font-medium">Acesso Restrito</p>
                <p className="mb-4 text-xs text-muted-foreground">
                  Faça login para receber alertas, baixar documentos e contactar
                  entidades.
                </p>
                <Link to="/login">
                  <Button size="sm" className="w-full">
                    Entrar / Registar
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OpportunityDetail;
