import { useState } from "react";
import Layout from "@/components/Layout";
import { opportunities as initialOpps, provinces, sectors } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, Search } from "lucide-react";

const statusBadge: Record<string, string> = {
  planned: "bg-info/10 text-info",
  ongoing: "bg-success/10 text-success",
  completed: "bg-muted text-muted-foreground",
};

const AdminOpportunities = () => {
  const [opps, setOpps] = useState(initialOpps);
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState({ title: "", province: "", sector: "", value: "", status: "planned" as string, entity: "", timeline: "", description: "" });

  const filtered = opps.filter((o) => o.title.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setOpps(opps.filter((o) => o.id !== id));
    toast.success("Oportunidade removida!");
  };

  const handleEdit = (id: string) => {
    const opp = opps.find((o) => o.id === id);
    if (!opp) return;
    setForm({ title: opp.title, province: opp.province, sector: opp.sector, value: String(opp.value), status: opp.status, entity: opp.entity, timeline: opp.timeline, description: opp.description });
    setEditId(id);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editId) {
      setOpps(opps.map((o) => o.id === editId ? { ...o, title: form.title, titleEn: form.title, province: form.province, sector: form.sector, value: Number(form.value), status: form.status as any, entity: form.entity, timeline: form.timeline, description: form.description, descriptionEn: form.description } : o));
      toast.success("Oportunidade atualizada!");
    } else {
      const newOpp = {
        id: crypto.randomUUID(),
        title: form.title, titleEn: form.title,
        province: form.province, sector: form.sector,
        value: Number(form.value), status: form.status as any,
        date: new Date().toISOString().split("T")[0],
        description: form.description, descriptionEn: form.description,
        entity: form.entity, timeline: form.timeline,
        procurement: [],
      };
      setOpps([newOpp, ...opps]);
      toast.success("Oportunidade criada!");
    }
    setShowForm(false);
    setEditId(null);
    setForm({ title: "", province: "", sector: "", value: "", status: "planned", entity: "", timeline: "", description: "" });
  };

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm";

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="section-label">ADMINISTRAÇÃO</p>
            <h1 className="section-title mt-2">Gestão de Oportunidades</h1>
          </div>
          <Button className="gap-2" onClick={() => { setShowForm(!showForm); setEditId(null); setForm({ title: "", province: "", sector: "", value: "", status: "planned", entity: "", timeline: "", description: "" }); }}>
            <Plus className="h-4 w-4" /> Nova Oportunidade
          </Button>
        </div>

        {/* Form */}
        {showForm && (
          <form onSubmit={handleSubmit} className="mb-8 rounded-xl border border-border bg-card p-6">
            <h3 className="mb-4 font-serif text-lg">{editId ? "Editar" : "Nova"} Oportunidade</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <input placeholder="Título" required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className={inputClass} />
              <select value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inputClass} required>
                <option value="">Província</option>
                {provinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
              </select>
              <select value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} className={inputClass} required>
                <option value="">Sector</option>
                {sectors.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
              <input placeholder="Valor (M MT)" type="number" required value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} className={inputClass} />
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} className={inputClass}>
                <option value="planned">Planejado</option>
                <option value="ongoing">Em Andamento</option>
                <option value="completed">Concluído</option>
              </select>
              <input placeholder="Entidade Responsável" value={form.entity} onChange={(e) => setForm({ ...form, entity: e.target.value })} className={inputClass} />
              <input placeholder="Cronograma" value={form.timeline} onChange={(e) => setForm({ ...form, timeline: e.target.value })} className={inputClass} />
              <textarea placeholder="Descrição" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className={inputClass + " md:col-span-2"} rows={3} />
            </div>
            <div className="mt-4 flex gap-2">
              <Button type="submit">{editId ? "Atualizar" : "Criar"}</Button>
              <Button type="button" variant="outline" onClick={() => { setShowForm(false); setEditId(null); }}>Cancelar</Button>
            </div>
          </form>
        )}

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar..." className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-3 text-sm" />
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium">Título</th>
                <th className="px-4 py-3 text-left font-medium">Província</th>
                <th className="px-4 py-3 text-left font-medium">Sector</th>
                <th className="px-4 py-3 text-left font-medium">Valor</th>
                <th className="px-4 py-3 text-left font-medium">Status</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((opp) => (
                <tr key={opp.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{opp.title}</td>
                  <td className="px-4 py-3 text-muted-foreground">{opp.province}</td>
                  <td className="px-4 py-3 text-muted-foreground">{opp.sector}</td>
                  <td className="px-4 py-3">{opp.value.toLocaleString()} M</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${statusBadge[opp.status]}`}>{opp.status}</span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="sm" onClick={() => handleEdit(opp.id)}><Pencil className="h-4 w-4" /></Button>
                      <Button variant="ghost" size="sm" onClick={() => handleDelete(opp.id)}><Trash2 className="h-4 w-4 text-destructive" /></Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOpportunities;
