import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { MapPin, Briefcase, Calendar, ArrowRight } from "lucide-react";
import { Opportunity } from "@/data/mockData";

const statusStyles: Record<string, string> = {
  planned: "bg-info/10 text-info",
  ongoing: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
};

const OpportunityCard = ({ opp }: { opp: Opportunity }) => {
  const { t, language } = useLanguage();
  const statusLabel = t(`card.${opp.status}`);

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-lg">
      <div className="mb-3 flex items-start justify-between gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[opp.status]}`}>
          {statusLabel}
        </span>
        <span className="text-xs text-muted-foreground">{new Date(opp.date).toLocaleDateString(language === "pt" ? "pt-MZ" : "en")}</span>
      </div>

      <h3 className="mb-2 font-serif text-lg leading-snug text-foreground">
        {language === "pt" ? opp.title : opp.titleEn}
      </h3>

      <div className="mb-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
        <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {opp.province}</span>
        <span className="flex items-center gap-1"><Briefcase className="h-3.5 w-3.5" /> {opp.sector}</span>
      </div>

      <div className="mt-auto flex items-center justify-between pt-3 border-t border-border">
        <span className="font-serif text-xl text-primary">{opp.value.toLocaleString()} M MT</span>
        <Link
          to={`/opportunities/${opp.id}`}
          className="flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-accent"
        >
          {t("card.details")} <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};

export default OpportunityCard;
