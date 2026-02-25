import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { CheckCircle, FileCheck, HelpCircle, Users, MessageSquare, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useState } from "react";

const steps = [
  { icon: FileCheck, titlePt: "Regularize sua Empresa", titleEn: "Register Your Company", descPt: "Certifique-se de que sua empresa está registrada no Balcão de Atendimento Único (BAU) e possui NUIT válido.", descEn: "Ensure your company is registered at BAU and has a valid NUIT." },
  { icon: CheckCircle, titlePt: "Prepare a Documentação", titleEn: "Prepare Documentation", descPt: "Reúna: Alvará comercial, NUIT, certidão de registo, declarações fiscais e referências bancárias.", descEn: "Gather: commercial license, NUIT, registration certificate, tax returns, and bank references." },
  { icon: Users, titlePt: "Inscreva-se na Base de Fornecedores", titleEn: "Register as Supplier", descPt: "Registre-se nas bases de fornecedores das entidades públicas relevantes ao seu sector.", descEn: "Register in the supplier databases of public entities relevant to your sector." },
  { icon: HelpCircle, titlePt: "Submeta sua Proposta", titleEn: "Submit Your Proposal", descPt: "Prepare e submeta propostas técnicas e financeiras conforme os termos de referência.", descEn: "Prepare and submit technical and financial proposals according to the terms of reference." },
];

const faqs = [
  { qPt: "Preciso de experiência prévia para participar?", qEn: "Do I need prior experience to participate?", aPt: "Nem sempre. Muitos concursos públicos reservam uma quota para novas empresas e MPME.", aEn: "Not always. Many public tenders reserve a quota for new companies and SMEs." },
  { qPt: "Qual o valor mínimo dos contratos?", qEn: "What's the minimum contract value?", aPt: "Existem contratos desde 500.000 MT até bilhões. Comece pelos menores e cresça gradualmente.", aEn: "Contracts range from 500,000 MT to billions. Start small and grow gradually." },
  { qPt: "Posso participar em consórcio?", qEn: "Can I participate in a consortium?", aPt: "Sim! Consórcios são uma excelente forma de MPME participarem em projetos maiores.", aEn: "Yes! Consortia are an excellent way for SMEs to participate in larger projects." },
];

const MPME = () => {
  const { language } = useLanguage();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(language === "pt" ? "Mensagem enviada com sucesso!" : "Message sent successfully!");
    setName(""); setEmail(""); setMessage("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="section-label">{language === "pt" ? "GUIA PARA MPME" : "SME GUIDE"}</p>
          <h1 className="section-title mt-2">{language === "pt" ? "Participe no Procurement Público" : "Participate in Public Procurement"}</h1>
          <p className="mt-3 text-muted-foreground max-w-2xl mx-auto">
            {language === "pt"
              ? "Guia passo a passo para micro, pequenas e médias empresas participarem em oportunidades do sector público."
              : "Step-by-step guide for micro, small, and medium enterprises to participate in public sector opportunities."}
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          {steps.map((step, i) => (
            <div key={i} className="flex gap-4 rounded-xl border border-border bg-card p-6">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                {i + 1}
              </div>
              <div>
                <h3 className="mb-1 font-serif text-lg text-foreground">{language === "pt" ? step.titlePt : step.titleEn}</h3>
                <p className="text-sm text-muted-foreground">{language === "pt" ? step.descPt : step.descEn}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="mb-6 text-center font-serif text-2xl">FAQ</h2>
          <div className="mx-auto max-w-2xl space-y-4">
            {faqs.map((faq, i) => (
              <details key={i} className="group rounded-xl border border-border bg-card p-5">
                <summary className="cursor-pointer font-medium text-foreground">{language === "pt" ? faq.qPt : faq.qEn}</summary>
                <p className="mt-3 text-sm text-muted-foreground">{language === "pt" ? faq.aPt : faq.aEn}</p>
              </details>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="mx-auto max-w-lg rounded-2xl border border-border bg-card p-8">
          <h2 className="mb-4 text-center font-serif text-xl">{language === "pt" ? "Precisa de Ajuda?" : "Need Help?"}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder={language === "pt" ? "Nome" : "Name"} required value={name} onChange={(e) => setName(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
            <input type="email" placeholder="E-mail" required value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
            <textarea placeholder={language === "pt" ? "Sua mensagem" : "Your message"} required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} className="w-full rounded-lg border border-border bg-background px-3 py-2.5 text-sm" />
            <Button type="submit" className="w-full">{language === "pt" ? "Enviar Mensagem" : "Send Message"}</Button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default MPME;
