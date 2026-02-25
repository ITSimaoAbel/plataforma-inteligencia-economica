import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { provinces, sectorDistribution, investmentByYear } from "@/data/mockData";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, CartesianGrid, Legend } from "recharts";
import { Download, TrendingUp, Target, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const COLORS = ["#166534", "#15803d", "#16a34a", "#22c55e", "#4ade80", "#86efac", "#bbf7d0", "#dcfce7"];

const Dashboard = () => {
  const { t, language } = useLanguage();

  const provinceData = provinces.map((p) => ({
    name: p.name.length > 10 ? p.name.substring(0, 10) + "…" : p.name,
    fullName: p.name,
    investment: p.investment,
  }));

  const sectorData = sectorDistribution.map((s) => ({
    name: language === "pt" ? s.name : s.nameEn,
    value: s.value,
  }));

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="section-title">{t("dash.title")}</h1>
          <Button variant="outline" className="gap-2" onClick={() => toast.info("Exportando dados...")}>
            <Download className="h-4 w-4" /> {t("dash.export")}
          </Button>
        </div>

        {/* KPIs */}
        <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {[
            { icon: TrendingUp, value: "125.7B MT", label: t("stats.investment") },
            { icon: Target, value: "138", label: t("stats.opportunities") },
            { icon: MapPin, value: "11", label: t("stats.provinces") },
            { icon: TrendingUp, value: "+10.8%", label: "YoY Growth" },
          ].map((kpi, i) => (
            <div key={i} className="rounded-xl border border-border bg-card p-5">
              <kpi.icon className="mb-2 h-5 w-5 text-primary" />
              <p className="font-serif text-2xl text-foreground">{kpi.value}</p>
              <p className="text-sm text-muted-foreground">{kpi.label}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Bar Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-serif text-lg">{t("dash.investment_province")}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={provinceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} M MT`} />
                <Bar dataKey="investment" fill="hsl(147, 63%, 23%)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-serif text-lg">{t("dash.distribution_sector")}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={sectorData} cx="50%" cy="50%" innerRadius={60} outerRadius={100} dataKey="value" label={({ name, value }) => `${name} ${value}%`}>
                  {sectorData.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Line Chart */}
          <div className="rounded-xl border border-border bg-card p-6 lg:col-span-2">
            <h3 className="mb-4 font-serif text-lg">{t("dash.evolution")}</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={investmentByYear}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="year" />
                <YAxis />
                <Tooltip formatter={(v: number) => `${v.toLocaleString()} M MT`} />
                <Line type="monotone" dataKey="value" stroke="hsl(147, 63%, 23%)" strokeWidth={3} dot={{ fill: "hsl(147, 63%, 23%)" }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
