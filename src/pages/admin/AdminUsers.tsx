import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Search, Trash2, Shield, User } from "lucide-react";

const mockUsers = [
  { id: "1", name: "Demo User", email: "demo@empresa.co.mz", company: "Empresa Demo Lda", province: "Maputo Cidade", registered: "2026-01-10", isAdmin: false },
  { id: "2", name: "Admin", email: "admin@ie.co.mz", company: "IE Moçambique", province: "Maputo Cidade", registered: "2025-12-01", isAdmin: true },
  { id: "3", name: "João Silva", email: "joao@construcoes.co.mz", company: "Silva Construções", province: "Sofala", registered: "2026-02-05", isAdmin: false },
  { id: "4", name: "Maria Santos", email: "maria@agro.co.mz", company: "Santos Agro Lda", province: "Nampula", registered: "2026-02-12", isAdmin: false },
  { id: "5", name: "Carlos Mondlane", email: "carlos@tech.co.mz", company: "TechMoz", province: "Maputo Cidade", registered: "2026-02-18", isAdmin: false },
  { id: "6", name: "Ana Tembe", email: "ana@saude.co.mz", company: "MedSupply Moz", province: "Gaza", registered: "2026-02-20", isAdmin: false },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");

  const filtered = users.filter((u) => u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase()));

  const handleDelete = (id: string) => {
    setUsers(users.filter((u) => u.id !== id));
    toast.success("Usuário removido!");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-8">
          <p className="section-label">ADMINISTRAÇÃO</p>
          <h1 className="section-title mt-2">Gestão de Usuários</h1>
        </div>

        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Pesquisar usuários..." className="w-full rounded-lg border border-border bg-card py-2 pl-10 pr-3 text-sm" />
        </div>

        <div className="overflow-x-auto rounded-xl border border-border bg-card">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="px-4 py-3 text-left font-medium">Nome</th>
                <th className="px-4 py-3 text-left font-medium">E-mail</th>
                <th className="px-4 py-3 text-left font-medium">Empresa</th>
                <th className="px-4 py-3 text-left font-medium">Província</th>
                <th className="px-4 py-3 text-left font-medium">Registro</th>
                <th className="px-4 py-3 text-left font-medium">Tipo</th>
                <th className="px-4 py-3 text-right font-medium">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((user) => (
                <tr key={user.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.email}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.company}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.province}</td>
                  <td className="px-4 py-3 text-muted-foreground">{user.registered}</td>
                  <td className="px-4 py-3">
                    {user.isAdmin ? (
                      <span className="flex items-center gap-1 text-xs font-medium text-primary"><Shield className="h-3.5 w-3.5" /> Admin</span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-muted-foreground"><User className="h-3.5 w-3.5" /> MPME</span>
                    )}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(user.id)} disabled={user.isAdmin}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-sm text-muted-foreground">Total: {filtered.length} usuários</p>
      </div>
    </Layout>
  );
};

export default AdminUsers;
