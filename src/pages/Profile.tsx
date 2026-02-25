import { useState } from "react";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { User, Bell, Bookmark, Download, Settings } from "lucide-react";
import { opportunities } from "@/data/mockData";

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"profile" | "alerts" | "saved" | "downloads">("profile");

  const savedOpps = opportunities.slice(0, 3);

  const tabs = [
    { id: "profile" as const, label: "Perfil", icon: User },
    { id: "alerts" as const, label: "Meus Alertas", icon: Bell },
    { id: "saved" as const, label: "Oportunidades Salvas", icon: Bookmark },
    { id: "downloads" as const, label: "Downloads", icon: Download },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="section-title mb-8">Minha Conta</h1>

        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <User className="h-8 w-8" />
              </div>
              <h3 className="font-serif text-lg">{user?.name}</h3>
              <p className="text-sm text-muted-foreground">{user?.company}</p>
            </div>
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-secondary text-secondary-foreground"
                      : "text-muted-foreground hover:bg-secondary/50"
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="lg:col-span-3">
            {activeTab === "profile" && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl">Informações Pessoais</h2>
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Nome", value: user?.name },
                    { label: "E-mail", value: user?.email },
                    { label: "Empresa", value: user?.company || "—" },
                    { label: "Telefone", value: user?.phone || "—" },
                    { label: "Província", value: user?.province || "—" },
                  ].map((field) => (
                    <div key={field.label}>
                      <p className="text-xs text-muted-foreground">{field.label}</p>
                      <p className="font-medium text-foreground">{field.value}</p>
                    </div>
                  ))}
                </div>
                <Button className="mt-6" onClick={() => toast.success("Perfil atualizado!")}>
                  <Settings className="mr-2 h-4 w-4" /> Editar Perfil
                </Button>
              </div>
            )}

            {activeTab === "alerts" && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl">Alertas Configurados</h2>
                <div className="space-y-3">
                  {[
                    { sector: "Infraestruturas", province: "Maputo", channel: "E-mail", freq: "Diário" },
                    { sector: "Saúde", province: "Todas", channel: "SMS", freq: "Semanal" },
                  ].map((alert, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium">{alert.sector} • {alert.province}</p>
                        <p className="text-sm text-muted-foreground">{alert.channel} • {alert.freq}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Alerta removido")}>
                        Remover
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "saved" && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl">Oportunidades Salvas</h2>
                <div className="space-y-3">
                  {savedOpps.map((opp) => (
                    <div key={opp.id} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium">{opp.title}</p>
                        <p className="text-sm text-muted-foreground">{opp.province} • {opp.value.toLocaleString()} M MT</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href={`/opportunities/${opp.id}`}>Ver</a>
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "downloads" && (
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="mb-6 font-serif text-xl">Histórico de Downloads</h2>
                <div className="space-y-3">
                  {[
                    { name: "Análise OE 2026.pdf", date: "2026-02-20", size: "2.4 MB" },
                    { name: "Relatório T4 2025.pdf", date: "2026-01-15", size: "1.8 MB" },
                  ].map((file, i) => (
                    <div key={i} className="flex items-center justify-between rounded-lg border border-border p-4">
                      <div>
                        <p className="font-medium">{file.name}</p>
                        <p className="text-sm text-muted-foreground">{file.date} • {file.size}</p>
                      </div>
                      <Button variant="outline" size="sm" onClick={() => toast.info("Download iniciado!")}>
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
