import Layout from "@/components/Layout";
import { opportunities, provinces, reports } from "@/data/mockData";
import { Users, FileText, Bell, TrendingUp, Activity, Eye } from "lucide-react";

const stats = [
  { icon: Users, label: "Usuários Registrados", value: "1,247" },
  { icon: FileText, label: "Oportunidades Ativas", value: String(opportunities.filter((o) => o.status !== "completed").length) },
  { icon: Bell, label: "Alertas Enviados (mês)", value: "3,842" },
  { icon: Eye, label: "Visualizações (mês)", value: "28,451" },
  { icon: Activity, label: "Downloads (mês)", value: "892" },
  { icon: TrendingUp, label: "Taxa de Engajamento", value: "34.2%" },
];

const recentActions = [
  { user: "João Silva", action: "Registou-se na plataforma", time: "Há 2 min" },
  { user: "Maria Santos", action: "Configurou alerta para Infraestruturas", time: "Há 15 min" },
  { user: "Carlos Mondlane", action: "Baixou relatório OE 2026", time: "Há 1h" },
  { user: "Ana Tembe", action: "Salvou oportunidade #4", time: "Há 2h" },
  { user: "Pedro Machel", action: "Atualizou perfil", time: "Há 3h" },
];

const AdminDashboard = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="section-label">ADMINISTRAÇÃO</p>
        <h1 className="section-title mt-2">Painel Administrativo</h1>
      </div>

      {/* Stats */}
      <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => (
          <div key={i} className="rounded-xl border border-border bg-card p-4">
            <stat.icon className="mb-2 h-5 w-5 text-primary" />
            <p className="font-serif text-xl text-foreground">{stat.value}</p>
            <p className="text-xs text-muted-foreground">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Recent activity */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-serif text-lg">Actividade Recente</h3>
          <div className="space-y-3">
            {recentActions.map((action, i) => (
              <div key={i} className="flex items-center justify-between rounded-lg border border-border p-3">
                <div>
                  <p className="text-sm font-medium">{action.user}</p>
                  <p className="text-xs text-muted-foreground">{action.action}</p>
                </div>
                <span className="text-xs text-muted-foreground">{action.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick links */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="mb-4 font-serif text-lg">Gestão Rápida</h3>
          <div className="grid grid-cols-2 gap-3">
            {[
              { label: "Gerir Oportunidades", href: "/admin/opportunities", count: opportunities.length },
              { label: "Gerir Usuários", href: "/admin/users", count: "1,247" },
              { label: "Gerir Relatórios", href: "/admin/reports", count: reports.length },
              { label: "Logs do Sistema", href: "/admin/logs", count: "—" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="flex flex-col rounded-lg border border-border p-4 transition-colors hover:bg-secondary/50"
              >
                <p className="font-medium text-foreground">{link.label}</p>
                <p className="text-2xl font-serif text-primary">{link.count}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Layout>
);

export default AdminDashboard;
