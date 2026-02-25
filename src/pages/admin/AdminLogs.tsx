import Layout from "@/components/Layout";
import { Activity } from "lucide-react";

const logs = [
  { time: "2026-02-25 09:30:12", level: "info", message: "Usuário demo@empresa.co.mz fez login", source: "auth" },
  { time: "2026-02-25 09:28:45", level: "info", message: "Alerta enviado para 142 usuários - Sector Infraestruturas", source: "alerts" },
  { time: "2026-02-25 09:15:03", level: "warn", message: "Tentativa de login falhada: joao@test.com", source: "auth" },
  { time: "2026-02-25 08:50:22", level: "info", message: "Relatório 'Análise OE 2026' baixado 15 vezes", source: "reports" },
  { time: "2026-02-25 08:30:00", level: "info", message: "Cron: Sincronização de dados do OE concluída", source: "system" },
  { time: "2026-02-24 23:00:00", level: "info", message: "Backup automático concluído", source: "system" },
  { time: "2026-02-24 22:15:33", level: "error", message: "Falha no envio de SMS para +258 84 XXX XXXX", source: "alerts" },
  { time: "2026-02-24 18:42:11", level: "info", message: "Nova oportunidade criada: Central Solar - Manica", source: "admin" },
  { time: "2026-02-24 16:20:05", level: "info", message: "Usuário maria@agro.co.mz registou-se", source: "auth" },
  { time: "2026-02-24 14:00:00", level: "info", message: "Cron: Envio de alertas diários concluído", source: "system" },
];

const levelStyles: Record<string, string> = {
  info: "bg-info/10 text-info",
  warn: "bg-warning/10 text-warning",
  error: "bg-destructive/10 text-destructive",
};

const AdminLogs = () => (
  <Layout>
    <div className="container mx-auto px-4 py-12">
      <div className="mb-8">
        <p className="section-label">ADMINISTRAÇÃO</p>
        <h1 className="section-title mt-2">Logs do Sistema</h1>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border bg-card">
        <table className="w-full text-sm font-mono">
          <thead>
            <tr className="border-b border-border bg-secondary/50">
              <th className="px-4 py-3 text-left font-medium">Data/Hora</th>
              <th className="px-4 py-3 text-left font-medium">Nível</th>
              <th className="px-4 py-3 text-left font-medium">Fonte</th>
              <th className="px-4 py-3 text-left font-medium">Mensagem</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log, i) => (
              <tr key={i} className="border-b border-border last:border-0">
                <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">{log.time}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${levelStyles[log.level]}`}>{log.level.toUpperCase()}</span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{log.source}</td>
                <td className="px-4 py-3">{log.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </Layout>
);

export default AdminLogs;
