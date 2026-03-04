import { TrendingUp, FolderKanban, Bell, Lightbulb } from "lucide-react"
import { DashboardLayout } from "@/components/DashboardLayout"
import { StatsCard } from "@/components/StatsCard"
import { ProvinceChart } from "@/components/charts/ProvinceChart"
import { SectorChart } from "@/components/charts/SectorChart"
import { TimeSeriesChart } from "@/components/charts/TimeSeriesChart"
import { OpportunitiesTable } from "@/components/OpportunitiesTable"
import { useLanguage } from "@/contexts/LanguageContext"
import { provinces, sectorDistribution, investmentByYear, opportunities } from "@/data/mockData"

const Dashboard = () => {
  const { t } = useLanguage()

  // Calculate stats
  const totalInvestment = investmentByYear[investmentByYear.length - 1]?.value || 0
  const totalOpportunities = opportunities.length
  const totalProvinces = provinces.length
  const activeAlerts = 15

  const provinceData = provinces.map((p) => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + "…" : p.name,
    investment: p.investment,
  }))

  const sectorData = sectorDistribution.map((s) => ({
    name: s.name,
    value: s.value,
  }))

  const recentOpportunities = opportunities.slice(0, 8)

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        {/* Conteúdo Principal */}
        <div className="p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatsCard
              title={t("stats.investment") || "Investimento Total"}
              value={`${(totalInvestment / 1000).toFixed(1)}B`}
              icon={TrendingUp}
              iconColor="text-sky-700"
              iconBgColor="bg-sky-100"
              trend={{ value: 10.1, isPositive: true }}
            />
            <StatsCard
              title={t("stats.opportunities") || "Oportunidades"}
              value={totalOpportunities}
              icon={FolderKanban}
              iconColor="text-emerald-700"
              iconBgColor="bg-emerald-100"
              trend={{ value: 5, isPositive: true }}
            />
            <StatsCard
              title={t("stats.activeAlerts") || "Alertas Ativos"}
              value={activeAlerts}
              icon={Bell}
              iconColor="text-amber-700"
              iconBgColor="bg-amber-100"
            />
            <StatsCard
              title={t("stats.provinces") || "Províncias"}
              value={totalProvinces}
              icon={Lightbulb}
              iconColor="text-purple-700"
              iconBgColor="bg-purple-100"
              trend={{ value: 2, isPositive: true }}
            />
          </div>

          {/* Time Series Chart - Full Width */}
          <div>
            <TimeSeriesChart
              data={investmentByYear}
              title={t("dash.evolution") || "Evolução do Investimento (2020-2026)"}
            />
          </div>

          {/* Charts Row - Province and Sector */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <ProvinceChart
              data={provinceData}
              title={t("dash.investment_province") || "Investimento por Província"}
            />
            <SectorChart
              data={sectorData}
              title={t("dash.distribution_sector") || "Distribuição por Sector"}
            />
          </div>

          {/* Opportunities Table */}
          <OpportunitiesTable
            opportunities={recentOpportunities}
            title={t("dash.recent_opportunities") || "Oportunidades Recentes"}
          />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
