// pages/Opportunities.tsx
import { useState, useMemo } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import OpportunityCard from "@/components/OpportunityCard";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { opportunities, provinces, sectors } from "@/data/mockData";
import { Search, SlidersHorizontal, Lock } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Opportunities = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();

  const [search, setSearch] = useState("");
  const [province, setProvince] = useState("");
  const [sector, setSector] = useState("");
  const [status, setStatus] = useState("");
  const [sort, setSort] = useState<"date" | "value">("date");

  const filtered = useMemo(() => {
    let result = opportunities.filter((o) => {
      const matchSearch =
        !search ||
        o.title.toLowerCase().includes(search.toLowerCase()) ||
        o.titleEn.toLowerCase().includes(search.toLowerCase());
      const matchProv = !province || o.province === province;
      const matchSec = !sector || o.sector === sector;
      const matchStat = !status || o.status === status;
      return matchSearch && matchProv && matchSec && matchStat;
    });
    result.sort((a, b) =>
      sort === "value"
        ? b.value - a.value
        : new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
    return result;
  }, [search, province, sector, status, sort]);

  // If not authenticated, show only the first 3
  const displayedOpportunities = isAuthenticated
    ? filtered
    : filtered.slice(0, 3);

  const selectClass =
    "rounded-lg border border-border bg-card px-3 py-2 text-sm text-foreground";

  return (
    <DashboardLayout>
      <div className="w-full px-6 py-8">
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
          <select
            value={province}
            onChange={(e) => setProvince(e.target.value)}
            className={selectClass}
          >
            <option value="">{t("opp.filter.province")}</option>
            {provinces.map((p) => (
              <option key={p.id} value={p.name}>
                {p.name}
              </option>
            ))}
          </select>
          <select
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            className={selectClass}
          >
            <option value="">{t("opp.filter.sector")}</option>
            {sectors.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className={selectClass}
          >
            <option value="">{t("opp.filter.status")}</option>
            <option value="planned">{t("card.planned")}</option>
            <option value="ongoing">{t("card.ongoing")}</option>
            <option value="completed">{t("card.completed")}</option>
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as "date" | "value")}
            className={selectClass}
          >
            <option value="date">{t("opp.sort.date")}</option>
            <option value="value">{t("opp.sort.value")}</option>
          </select>
        </div>

        {/* Restricted access message for non-logged in users */}
        {!isAuthenticated && (
          <div className="mb-6 rounded-lg bg-gray-50 border border-gray-200 p-4 text-gray-800">
            <div className="flex items-start gap-3">
              <Lock className="h-5 w-5 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium">
                  {t("opportunities.limited_access")}
                </p>
                <p className="text-sm mt-1">
                  <Link
                    to="/login"
                    className="font-medium underline hover:text-gray-900"
                  >
                    {t("opportunities.login")}
                  </Link>{" "}
                  {t("opportunities.or")}
                  <Link
                    to="/register"
                    className="font-medium underline hover:text-gray-900 ml-1"
                  >
                    {t("opportunities.register")}
                  </Link>{" "}
                  {t("opportunities.login_to_see_all")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Results */}
        {filtered.length === 0 ? (
          <p className="text-center text-muted-foreground py-20">
            {t("opp.no_results")}
          </p>
        ) : (
          <>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {displayedOpportunities.map((opp) => (
                <OpportunityCard
                  key={opp.id}
                  opp={opp}
                  isLimited={
                    !isAuthenticated &&
                    opp ===
                      displayedOpportunities[displayedOpportunities.length - 1]
                  }
                />
              ))}
            </div>

            {/* If not logged in and there are more opportunities, show login button */}
            {!isAuthenticated && filtered.length > 3 && (
              <div className="mt-8 text-center">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border"></div>
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-background px-4 text-sm text-muted-foreground">
                      + {filtered.length - 3} {t("opportunities.hidden")}
                    </span>
                  </div>
                </div>
                <Link to="/login">
                  <Button className="mt-6 gap-2">
                    <Lock className="h-4 w-4" />
                    {t("opportunities.login_button")}
                  </Button>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default Opportunities;
