import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import Layout from "@/components/Layout";
import StatCard from "@/components/StatCard";
import OpportunityCard from "@/components/OpportunityCard";
import { opportunities, reports } from "@/data/mockData";
import {
  TrendingUp,
  MapPin,
  Layers,
  Target,
  ArrowRight,
  FileText,
  Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-mozambique.jpg";

const Index = () => {
  const { t, language } = useLanguage();
  const featured = opportunities.slice(0, 3);
  const recentReports = reports.slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <img
          src={heroImage}
          alt="Moçambique"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-gradient absolute inset-0" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <p className="mb-4 text-sm font-semibold tracking-[0.3em] text-primary-foreground/70">
            {t("hero.label")}
          </p>
          <h1 className="mx-auto mb-6 max-w-4xl font-serif text-2xl leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
            {t("hero.title")}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-primary-foreground/80">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link to="/opportunities">
              <Button size="lg" className="gap-2 text-base">
                {t("hero.cta1")} <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                size="lg"
                variant="outline"
                className="gap-2 border-primary-foreground/30 text-base text-black hover:bg-primary-foreground/10"
              >
                {t("hero.cta2")}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="container mx-auto -mt-16 relative z-20 px-4">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <StatCard
            icon={TrendingUp}
            value="125.7B MT"
            label={t("stats.investment")}
            delay={0}
          />
          <StatCard
            icon={MapPin}
            value="11"
            label={t("stats.provinces")}
            delay={100}
          />
          <StatCard
            icon={Layers}
            value="23"
            label={t("stats.sectors")}
            delay={200}
          />
          <StatCard
            icon={Target}
            value="138"
            label={t("stats.opportunities")}
            delay={300}
          />
        </div>
      </section>

      {/* Featured */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-10 text-center">
          <p className="section-label">{t("section.featured")}</p>
          <h2 className="section-title mt-2">{t("section.featured.title")}</h2>
          <p className="mt-3 text-muted-foreground">
            {t("section.featured.subtitle")}
          </p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((opp) => (
            <OpportunityCard key={opp.id} opp={opp} />
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/opportunities">
            <Button variant="outline" className="gap-2">
              {t("general.view_all")} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Reports */}
      <section className="section-alt-bg py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 text-center">
            <p className="section-label">{t("section.reports")}</p>
            <h2 className="section-title mt-2">{t("section.reports.title")}</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {recentReports.map((report) => (
              <div
                key={report.id}
                className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <Calendar className="h-3.5 w-3.5" />
                  {new Date(report.date).toLocaleDateString(
                    language === "pt" ? "pt-MZ" : "en",
                  )}
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground">
                    {report.category}
                  </span>
                </div>
                <h3 className="mb-2 font-serif text-lg text-foreground">
                  {language === "pt" ? report.title : report.titleEn}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {language === "pt"
                    ? report.description
                    : report.descriptionEn}
                </p>
                <Link
                  to="/reports"
                  className="mt-4 flex items-center gap-1 text-sm font-medium text-primary hover:text-accent"
                >
                  <FileText className="h-4 w-4" /> {t("general.download")}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
