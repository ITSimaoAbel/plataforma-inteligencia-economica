import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { provinces } from "@/data/mockData";

const Login = () => {
  const { t } = useLanguage();
  const { login, register } = useAuth();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", name: "", company: "", phone: "", province: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isRegister) {
      register({ ...form, email: form.email, name: form.name, company: form.company, phone: form.phone, province: form.province, password: form.password });
      toast.success("Conta criada com sucesso!");
      navigate("/");
    } else {
      const success = login(form.email, form.password);
      if (success) {
        toast.success("Login realizado com sucesso!");
        navigate("/");
      } else {
        toast.error("Credenciais inválidas. Tente demo@empresa.co.mz / senha123");
      }
    }
  };

  const inputClass = "w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30";

  return (
    <Layout>
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-12">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8">
          <h1 className="mb-6 text-center font-serif text-2xl text-foreground">
            {isRegister ? t("auth.register.title") : t("auth.login.title")}
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            {isRegister && (
              <>
                <input type="text" placeholder={t("auth.name")} required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputClass} />
                <input type="text" placeholder={t("auth.company")} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputClass} />
                <input type="tel" placeholder={t("auth.phone")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputClass} />
                <select value={form.province} onChange={(e) => setForm({ ...form, province: e.target.value })} className={inputClass}>
                  <option value="">{t("auth.province")}</option>
                  {provinces.map((p) => <option key={p.id} value={p.name}>{p.name}</option>)}
                </select>
              </>
            )}
            <input type="email" placeholder={t("auth.email")} required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputClass} />
            <input type="password" placeholder={t("auth.password")} required value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className={inputClass} />
            <Button type="submit" className="w-full">{isRegister ? t("auth.register") : t("auth.login")}</Button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            {isRegister ? t("auth.has_account") : t("auth.no_account")}{" "}
            <button onClick={() => setIsRegister(!isRegister)} className="font-medium text-primary hover:underline">
              {isRegister ? t("auth.login") : t("auth.register")}
            </button>
          </p>

          {!isRegister && (
            <p className="mt-4 text-center text-xs text-muted-foreground">
              Demo: demo@empresa.co.mz / senha123
            </p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Login;
