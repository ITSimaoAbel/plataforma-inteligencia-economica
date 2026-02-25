import Layout from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { Database, Shield, Users, BookOpen } from "lucide-react";

const About = () => {
  const { t, language } = useLanguage();

  const sections = [
    {
      icon: Database,
      titlePt: "Metodologia",
      titleEn: "Methodology",
      descPt: "Analisamos sistematicamente os documentos do Orçamento do Estado (OE) e do Plano Econômico e Social (PES), extraindo dados de investimento público e transformando-os em informação acessível para o sector privado.",
      descEn: "We systematically analyze State Budget (OE) and Economic and Social Plan (PES) documents, extracting public investment data and transforming it into accessible information for the private sector.",
    },
    {
      icon: Shield,
      titlePt: "Fontes Oficiais",
      titleEn: "Official Sources",
      descPt: "Todos os dados provêm de fontes governamentais oficiais: Ministério da Economia e Finanças, Ministérios sectoriais, Governos provinciais e distritais, e documentos públicos de procurement.",
      descEn: "All data comes from official government sources: Ministry of Economy and Finance, sectoral Ministries, provincial and district governments, and public procurement documents.",
    },
    {
      icon: Users,
      titlePt: "Parceiros",
      titleEn: "Partners",
      descPt: "Trabalhamos em colaboração com a CTA (Confederação das Associações Econômicas), ACIS, FIPAG, e diversas associações empresariais provinciais para garantir a relevância da informação.",
      descEn: "We work in collaboration with CTA, ACIS, FIPAG, and various provincial business associations to ensure information relevance.",
    },
    {
      icon: BookOpen,
      titlePt: "Transparência",
      titleEn: "Transparency",
      descPt: "Acreditamos que o acesso à informação sobre investimento público é fundamental para o desenvolvimento do sector privado moçambicano e para a transparência na gestão dos recursos públicos.",
      descEn: "We believe that access to public investment information is fundamental for the development of Mozambique's private sector and for transparency in public resource management.",
    },
  ];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 text-center">
          <p className="section-label">{language === "pt" ? "SOBRE NÓS" : "ABOUT US"}</p>
          <h1 className="section-title mt-2">{t("about.title")}</h1>
        </div>

        <div className="mx-auto max-w-3xl space-y-8">
          {sections.map((s, i) => (
            <div key={i} className="flex gap-5 rounded-xl border border-border bg-card p-6">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-secondary">
                <s.icon className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h2 className="mb-2 font-serif text-xl text-foreground">{language === "pt" ? s.titlePt : s.titleEn}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{language === "pt" ? s.descPt : s.descEn}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default About;
