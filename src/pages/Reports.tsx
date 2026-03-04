import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { reports } from "@/data/mockData";
import { FileText, Download, Calendar, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const Reports = () => {
  const { t, language } = useLanguage();
  const [filter, setFilter] = useState("");

  const filtered = filter ? reports.filter((r) => r.category === filter) : reports;

  return (
    <DashboardLayout>
      <div className="w-full px-6 py-8">
        <h1 className="section-title mb-8">{t("section.reports.title")}</h1>

        <div className="mb-8 flex gap-2">
          {["", "Sectorial", "Provincial", "Especial"].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                filter === cat ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              {cat || (language === "pt" ? "Todos" : "All")}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((report) => (
            <div key={report.id} className="rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="mb-2 flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(report.date).toLocaleDateString(language === "pt" ? "pt-MZ" : "en")}
                <span className="rounded-full bg-secondary px-2 py-0.5 font-medium text-secondary-foreground">
                  {report.category}
                </span>
              </div>
              <h3 className="mb-2 font-serif text-lg text-foreground">
                {language === "pt" ? report.title : report.titleEn}
              </h3>
              <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                {language === "pt" ? report.description : report.descriptionEn}
              </p>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="gap-1" onClick={() => toast.info("Abrindo relatório...")}>
                  <Eye className="h-3.5 w-3.5" /> {language === "pt" ? "Ver" : "View"}
                </Button>
                <Button size="sm" variant="outline" className="gap-1" onClick={() => toast.success("Download iniciado!")}>
                  <Download className="h-3.5 w-3.5" /> PDF
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Reports;
