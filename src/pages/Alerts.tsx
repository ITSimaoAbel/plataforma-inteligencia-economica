import { useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { provinces, sectors } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Bell, Mail, MessageSquare, Smartphone, Clock, CheckCircle2 } from "lucide-react";
import { Navigate } from "react-router-dom";

const Alerts = () => {
  const { t } = useLanguage();
  const { isAuthenticated } = useAuth();
  const [channel, setChannel] = useState("email");
  const [selProvince, setSelProvince] = useState("");
  const [selSector, setSelSector] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [minValue, setMinValue] = useState(0);

  if (!isAuthenticated) return <Navigate to="/login" replace />;

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground";

  const recentAlerts = [
    { title: "Nova oportunidade: Construção de Escolas - Cabo Delgado", date: "2026-02-24", type: "Educação" },
    { title: "Prazo de submissão: Fornecimento de betume asfáltico", date: "2026-02-23", type: "Infraestruturas" },
    { title: "Atualização: Barragem de Moamba Major - fase 2", date: "2026-02-22", type: "Águas" },
    { title: "Nova oportunidade: Central Solar - Manica", date: "2026-02-21", type: "Energia" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Alerta configurado com sucesso!");
  };

  return (
    <DashboardLayout>
      <div className="w-full px-6 py-8">
        <h1 className="section-title mb-2">Sistema de Alertas</h1>
        <p className="mb-8 text-muted-foreground">Configure alertas personalizados para receber notificações sobre oportunidades relevantes.</p>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Config */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-card p-6">
              <h2 className="mb-6 font-serif text-xl">Configurar Novo Alerta</h2>

              {/* Channel */}
              <div className="mb-6">
                <label className="mb-2 block text-sm font-medium">Canal de Notificação</label>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { id: "email", icon: Mail, label: "E-mail" },
                    { id: "sms", icon: Smartphone, label: "SMS" },
                    { id: "whatsapp", icon: MessageSquare, label: "WhatsApp" },
                  ].map((ch) => (
                    <button
                      key={ch.id}
                      type="button"
                      onClick={() => setChannel(ch.id)}
                      className={`flex items-center gap-2 rounded-lg border p-3 text-sm font-medium transition-colors ${
                        channel === ch.id
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/50"
                      }`}
                    >
                      <ch.icon className="h-4 w-4" />
                      {ch.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Filters */}
              <div className="mb-6 grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium">Província</label>
                  <select value={selProvince} onChange={(e) => setSelProvince(e.target.value)} className={inputClass}>
                    <option value="">Todas as Províncias</option>
                    {provinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Sector</label>
                  <select value={selSector} onChange={(e) => setSelSector(e.target.value)} className={inputClass}>
                    <option value="">Todos os Sectores</option>
                    {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Valor Mínimo (M MT)</label>
                  <input type="number" value={minValue} onChange={(e) => setMinValue(Number(e.target.value))} className={inputClass} min={0} step={100} />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium">Frequência</label>
                  <select value={frequency} onChange={(e) => setFrequency(e.target.value)} className={inputClass}>
                    <option value="realtime">Tempo Real</option>
                    <option value="daily">Diário</option>
                    <option value="weekly">Semanal</option>
                  </select>
                </div>
              </div>

              <Button type="submit" className="gap-2">
                <Bell className="h-4 w-4" /> Criar Alerta
              </Button>
            </form>
          </div>

          {/* Recent alerts */}
          <div>
            <div className="rounded-xl border border-border bg-card p-6">
              <h3 className="mb-4 font-serif text-lg">Alertas Recentes</h3>
              <div className="space-y-3">
                {recentAlerts.map((alert, i) => (
                  <div key={i} className="rounded-lg border border-border p-3">
                    <div className="mb-1 flex items-center gap-2">
                      <CheckCircle2 className="h-3.5 w-3.5 text-success" />
                      <span className="text-xs text-muted-foreground">{alert.date}</span>
                    </div>
                    <p className="text-sm font-medium text-foreground">{alert.title}</p>
                    <span className="mt-1 inline-block rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                      {alert.type}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Alerts;
