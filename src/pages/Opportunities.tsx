import { useState, useMemo } from "react";
import Layout from "@/components/Layout";
import OpportunityCard from "@/components/OpportunityCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { opportunities, provinces, sectors } from "@/data/mockData";
import { Search, SlidersHorizontal } from "lucide-react";

const Opportunities = () => {
  const { t } = useLanguage();
  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [sector, setSector] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState<"date" | "value">("date");

  const filtered = useMemo(() => {
    let result = opportunities.filter((o) => {
      const matchSearch = !search || o.title.toLowerCase().includes(search.toLowerCase()) || o.titleEn.toLowerCase().includes(search.toLowerCase());
      const matchProv = !province || o.province === province;
      const matchSec = !sector || o.sector === sector;
      const matchStat = !status || o.status === status;
      return matchSearch && matchProv && matchSec && matchStat;
    });
    result.sort((a, b) => sort === "value" ? b.value - a.value : new Date(b.date).getTime() - new Date(a.date).getTime());
    return result;
  }, [search, province, sector, status, sort]);

  const selectClass = "rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="section-title mb-8">{t("opp.title")}</h1>

        {/* Filters */}
        <div className="mb-8 flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={t("opp.search")}
              className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-3 text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <select value={province} onChange={(e) => setProvince(e.target.value)} className={selectClass}>
            <option value="">{t("opp.filter.province")}</option>
            {provinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
          </select>
          <select value={sector} onChange={(e) => setSector(e.target.value)} className={selectClass}>
            <option value="">{t("opp.filter.sector")}</option>
            {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className={selectClass}>
            <option value="">{t("opp.filter.status")}</option>
            <option value="planned">{t("card.planned")}</option>
            <option value="ongoing">{t("card.ongoing")}</option>
            <option value="completed">{t("card.completed")}</option>
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value as "date" | "value")} className={selectClass}>
            <option value="date">{t("opp.sort.date")}</option>
            <option value="value">{t("opp.sort.value")}</option>
          </select>
        </div>

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">{t("opp.no_results")}</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((opp) => <OpportunityCard key={opp.id} opp={opp} />)}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Opportunities;
