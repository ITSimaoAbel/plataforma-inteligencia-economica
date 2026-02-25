export const provinces = [
  { id: "maputo-cidade", name: "Maputo Cidade", investment: 28500, color: "#166534" },
  { id: "maputo-provincia", name: "Maputo Província", investment: 18200, color: "#15803d" },
  { id: "gaza", name: "Gaza", investment: 9800, color: "#16a34a" },
  { id: "inhambane", name: "Inhambane", investment: 7600, color: "#22c55e" },
  { id: "sofala", name: "Sofala", investment: 15300, color: "#15803d" },
  { id: "manica", name: "Manica", investment: 8900, color: "#16a34a" },
  { id: "tete", name: "Tete", investment: 12100, color: "#15803d" },
  { id: "zambezia", name: "Zambézia", investment: 11400, color: "#16a34a" },
  { id: "nampula", name: "Nampula", investment: 14200, color: "#15803d" },
  { id: "cabo-delgado", name: "Cabo Delgado", investment: 6800, color: "#22c55e" },
  { id: "niassa", name: "Niassa", investment: 5700, color: "#4ade80" },
];

export const sectors = [
  "Agricultura", "Infraestruturas", "Saúde", "Educação",
  "Energia", "Águas", "Pescas", "Turismo",
];

export const sectorsEn: Record<string, string> = {
  "Agricultura": "Agriculture",
  "Infraestruturas": "Infrastructure",
  "Saúde": "Health",
  "Educação": "Education",
  "Energia": "Energy",
  "Águas": "Water",
  "Pescas": "Fisheries",
  "Turismo": "Tourism",
};

export interface Opportunity {
  id: string;
  title: string;
  titleEn: string;
  province: string;
  sector: string;
  value: number;
  status: "planned" | "ongoing" | "completed";
  date: string;
  description: string;
  descriptionEn: string;
  entity: string;
  timeline: string;
  procurement: { item: string; deadline: string; contact: string }[];
}

export const opportunities: Opportunity[] = [
  {
    id: "1", title: "Reabilitação da EN1 - Trecho Sul", titleEn: "EN1 Rehabilitation - Southern Section",
    province: "Maputo Província", sector: "Infraestruturas", value: 4500,
    status: "ongoing", date: "2026-01-15",
    description: "Projeto de reabilitação do trecho sul da Estrada Nacional 1, incluindo pavimentação, drenagem e sinalização.",
    descriptionEn: "Rehabilitation project for the southern section of National Road 1, including paving, drainage, and signage.",
    entity: "Administração Nacional de Estradas (ANE)",
    timeline: "Jan 2026 - Dez 2027",
    procurement: [
      { item: "Fornecimento de betume asfáltico", deadline: "2026-03-15", contact: "procurement@ane.gov.mz" },
      { item: "Equipamento de sinalização rodoviária", deadline: "2026-04-01", contact: "procurement@ane.gov.mz" },
    ],
  },
  {
    id: "2", title: "Construção de Centros de Saúde - Zambézia", titleEn: "Health Center Construction - Zambézia",
    province: "Zambézia", sector: "Saúde", value: 2800,
    status: "planned", date: "2026-03-01",
    description: "Construção de 15 centros de saúde tipo II em distritos rurais da província da Zambézia.",
    descriptionEn: "Construction of 15 type II health centers in rural districts of Zambézia province.",
    entity: "Ministério da Saúde (MISAU)",
    timeline: "Mar 2026 - Jun 2028",
    procurement: [
      { item: "Materiais de construção civil", deadline: "2026-05-01", contact: "compras@misau.gov.mz" },
      { item: "Equipamento médico básico", deadline: "2026-08-15", contact: "compras@misau.gov.mz" },
    ],
  },
  {
    id: "3", title: "Programa de Irrigação - Vale do Limpopo", titleEn: "Irrigation Program - Limpopo Valley",
    province: "Gaza", sector: "Agricultura", value: 3200,
    status: "ongoing", date: "2025-11-01",
    description: "Expansão do sistema de irrigação no Vale do Limpopo para beneficiar 5.000 agricultores familiares.",
    descriptionEn: "Expansion of the irrigation system in the Limpopo Valley to benefit 5,000 family farmers.",
    entity: "Ministério da Agricultura (MASA)",
    timeline: "Nov 2025 - Dez 2027",
    procurement: [
      { item: "Tubos e sistemas de irrigação", deadline: "2026-02-28", contact: "procurement@masa.gov.mz" },
    ],
  },
  {
    id: "4", title: "Eletrificação Rural - Nampula", titleEn: "Rural Electrification - Nampula",
    province: "Nampula", sector: "Energia", value: 5100,
    status: "planned", date: "2026-04-15",
    description: "Extensão da rede elétrica a 200 comunidades rurais na província de Nampula.",
    descriptionEn: "Extension of the electrical grid to 200 rural communities in Nampula province.",
    entity: "Electricidade de Moçambique (EDM)",
    timeline: "Abr 2026 - Mar 2029",
    procurement: [
      { item: "Postes e transformadores", deadline: "2026-06-01", contact: "compras@edm.co.mz" },
      { item: "Cabos elétricos de média tensão", deadline: "2026-06-15", contact: "compras@edm.co.mz" },
    ],
  },
  {
    id: "5", title: "Construção de Escolas - Cabo Delgado", titleEn: "School Construction - Cabo Delgado",
    province: "Cabo Delgado", sector: "Educação", value: 1900,
    status: "ongoing", date: "2025-09-01",
    description: "Construção e reabilitação de 25 escolas primárias em Cabo Delgado.",
    descriptionEn: "Construction and rehabilitation of 25 primary schools in Cabo Delgado.",
    entity: "Ministério da Educação (MINEDH)",
    timeline: "Set 2025 - Ago 2027",
    procurement: [
      { item: "Mobiliário escolar", deadline: "2026-03-30", contact: "procurement@minedh.gov.mz" },
    ],
  },
  {
    id: "6", title: "Sistema de Abastecimento de Água - Tete", titleEn: "Water Supply System - Tete",
    province: "Tete", sector: "Águas", value: 3800,
    status: "planned", date: "2026-06-01",
    description: "Construção de sistema de captação e distribuição de água potável para a cidade de Tete e arredores.",
    descriptionEn: "Construction of a water capture and distribution system for Tete city and surroundings.",
    entity: "FIPAG",
    timeline: "Jun 2026 - Mai 2028",
    procurement: [
      { item: "Bombas submersíveis", deadline: "2026-08-01", contact: "compras@fipag.co.mz" },
      { item: "Tubulação HDPE", deadline: "2026-08-15", contact: "compras@fipag.co.mz" },
    ],
  },
  {
    id: "7", title: "Porto de Pesca - Inhambane", titleEn: "Fishing Port - Inhambane",
    province: "Inhambane", sector: "Pescas", value: 2200,
    status: "planned", date: "2026-07-01",
    description: "Construção de porto de pesca artesanal e semi-industrial na costa de Inhambane.",
    descriptionEn: "Construction of artisanal and semi-industrial fishing port on the Inhambane coast.",
    entity: "Ministério do Mar (MIMAIP)",
    timeline: "Jul 2026 - Jun 2028",
    procurement: [
      { item: "Estruturas metálicas marítimas", deadline: "2026-09-01", contact: "procurement@mimaip.gov.mz" },
    ],
  },
  {
    id: "8", title: "Resort Turístico - Bazaruto", titleEn: "Tourism Resort - Bazaruto",
    province: "Inhambane", sector: "Turismo", value: 8500,
    status: "ongoing", date: "2025-06-01",
    description: "Desenvolvimento de complexo turístico sustentável no Arquipélago de Bazaruto.",
    descriptionEn: "Development of a sustainable tourism complex in the Bazaruto Archipelago.",
    entity: "INATUR",
    timeline: "Jun 2025 - Dez 2027",
    procurement: [
      { item: "Materiais de construção ecológicos", deadline: "2026-04-01", contact: "projetos@inatur.gov.mz" },
    ],
  },
  {
    id: "9", title: "Hospital Provincial - Sofala", titleEn: "Provincial Hospital - Sofala",
    province: "Sofala", sector: "Saúde", value: 6200,
    status: "ongoing", date: "2025-08-01",
    description: "Construção do novo Hospital Provincial de Sofala com capacidade para 500 camas.",
    descriptionEn: "Construction of the new Sofala Provincial Hospital with 500-bed capacity.",
    entity: "MISAU",
    timeline: "Ago 2025 - Jul 2028",
    procurement: [
      { item: "Equipamento hospitalar especializado", deadline: "2026-06-01", contact: "compras@misau.gov.mz" },
      { item: "Sistemas de climatização hospitalar", deadline: "2026-05-15", contact: "compras@misau.gov.mz" },
    ],
  },
  {
    id: "10", title: "Central Solar - Manica", titleEn: "Solar Power Plant - Manica",
    province: "Manica", sector: "Energia", value: 7200,
    status: "planned", date: "2026-09-01",
    description: "Instalação de central solar fotovoltaica com capacidade de 40MW na província de Manica.",
    descriptionEn: "Installation of a 40MW photovoltaic solar power plant in Manica province.",
    entity: "EDM / FUNAE",
    timeline: "Set 2026 - Ago 2028",
    procurement: [
      { item: "Painéis solares fotovoltaicos", deadline: "2026-11-01", contact: "solar@funae.co.mz" },
      { item: "Inversores e baterias", deadline: "2026-11-15", contact: "solar@funae.co.mz" },
    ],
  },
  {
    id: "11", title: "Ponte sobre o Rio Zambeze", titleEn: "Zambezi River Bridge",
    province: "Zambézia", sector: "Infraestruturas", value: 12000,
    status: "planned", date: "2026-08-01",
    description: "Construção de nova ponte sobre o Rio Zambeze ligando Zambézia e Sofala.",
    descriptionEn: "Construction of a new bridge over the Zambezi River connecting Zambézia and Sofala.",
    entity: "ANE",
    timeline: "Ago 2026 - Dez 2029",
    procurement: [
      { item: "Aço estrutural para pontes", deadline: "2026-10-01", contact: "procurement@ane.gov.mz" },
    ],
  },
  {
    id: "12", title: "Mercado Grossista - Maputo", titleEn: "Wholesale Market - Maputo",
    province: "Maputo Cidade", sector: "Agricultura", value: 3500,
    status: "ongoing", date: "2025-10-01",
    description: "Construção de mercado grossista moderno em Maputo com câmaras frigoríficas.",
    descriptionEn: "Construction of a modern wholesale market in Maputo with cold storage.",
    entity: "Conselho Municipal de Maputo",
    timeline: "Out 2025 - Set 2027",
    procurement: [
      { item: "Sistemas de refrigeração industrial", deadline: "2026-03-01", contact: "obras@cmaputo.gov.mz" },
    ],
  },
  {
    id: "13", title: "Universidade Técnica - Niassa", titleEn: "Technical University - Niassa",
    province: "Niassa", sector: "Educação", value: 4100,
    status: "planned", date: "2026-05-01",
    description: "Construção de campus universitário técnico na província de Niassa.",
    descriptionEn: "Construction of a technical university campus in Niassa province.",
    entity: "MINEDH",
    timeline: "Mai 2026 - Abr 2029",
    procurement: [
      { item: "Equipamento laboratorial", deadline: "2026-07-15", contact: "procurement@minedh.gov.mz" },
    ],
  },
  {
    id: "14", title: "Barragem de Moamba Major", titleEn: "Moamba Major Dam",
    province: "Maputo Província", sector: "Águas", value: 15000,
    status: "ongoing", date: "2024-01-01",
    description: "Construção da Barragem de Moamba Major para abastecimento de água à Grande Maputo.",
    descriptionEn: "Construction of Moamba Major Dam for water supply to Greater Maputo.",
    entity: "Ministério das Obras Públicas",
    timeline: "Jan 2024 - Dez 2027",
    procurement: [
      { item: "Equipamento de construção pesada", deadline: "2026-04-01", contact: "dam@mop.gov.mz" },
    ],
  },
  {
    id: "15", title: "Parque Industrial - Nacala", titleEn: "Industrial Park - Nacala",
    province: "Nampula", sector: "Infraestruturas", value: 9800,
    status: "planned", date: "2026-10-01",
    description: "Desenvolvimento do Parque Industrial de Nacala com infraestruturas completas.",
    descriptionEn: "Development of the Nacala Industrial Park with complete infrastructure.",
    entity: "GAZEDA",
    timeline: "Out 2026 - Set 2029",
    procurement: [
      { item: "Terraplanagem e pavimentação", deadline: "2026-12-01", contact: "projetos@gazeda.gov.mz" },
    ],
  },
  {
    id: "16", title: "Rede de Fibra Óptica - Nacional", titleEn: "Fiber Optic Network - National",
    province: "Maputo Cidade", sector: "Infraestruturas", value: 6500,
    status: "ongoing", date: "2025-03-01",
    description: "Expansão da rede nacional de fibra óptica para conectar todas as capitais provinciais.",
    descriptionEn: "Expansion of the national fiber optic network to connect all provincial capitals.",
    entity: "INCM / TDM",
    timeline: "Mar 2025 - Fev 2027",
    procurement: [
      { item: "Cabo de fibra óptica", deadline: "2026-05-01", contact: "compras@tdm.mz" },
    ],
  },
  {
    id: "17", title: "Programa Agrário - Corredor de Nacala", titleEn: "Agricultural Program - Nacala Corridor",
    province: "Nampula", sector: "Agricultura", value: 4800,
    status: "ongoing", date: "2025-07-01",
    description: "Programa de desenvolvimento agrário ao longo do Corredor de Nacala.",
    descriptionEn: "Agricultural development program along the Nacala Corridor.",
    entity: "MASA",
    timeline: "Jul 2025 - Jun 2028",
    procurement: [
      { item: "Sementes melhoradas e fertilizantes", deadline: "2026-02-15", contact: "procurement@masa.gov.mz" },
    ],
  },
  {
    id: "18", title: "Centro de Saúde Materno-Infantil - Maputo", titleEn: "Maternal-Child Health Center - Maputo",
    province: "Maputo Cidade", sector: "Saúde", value: 2100,
    status: "completed", date: "2025-01-15",
    description: "Centro especializado em saúde materno-infantil em Maputo.",
    descriptionEn: "Specialized maternal-child health center in Maputo.",
    entity: "MISAU",
    timeline: "Jan 2024 - Jan 2025",
    procurement: [],
  },
  {
    id: "19", title: "Estrada Chimoio-Espungabera", titleEn: "Chimoio-Espungabera Road",
    province: "Manica", sector: "Infraestruturas", value: 3600,
    status: "ongoing", date: "2025-05-01",
    description: "Reabilitação e asfaltamento da estrada Chimoio-Espungabera.",
    descriptionEn: "Rehabilitation and asphalting of the Chimoio-Espungabera road.",
    entity: "ANE",
    timeline: "Mai 2025 - Abr 2027",
    procurement: [
      { item: "Asfalto e materiais rodoviários", deadline: "2026-03-15", contact: "procurement@ane.gov.mz" },
    ],
  },
  {
    id: "20", title: "Complexo Pesqueiro - Sofala", titleEn: "Fishing Complex - Sofala",
    province: "Sofala", sector: "Pescas", value: 1800,
    status: "planned", date: "2026-11-01",
    description: "Construção de complexo pesqueiro integrado na Beira.",
    descriptionEn: "Construction of an integrated fishing complex in Beira.",
    entity: "MIMAIP",
    timeline: "Nov 2026 - Out 2028",
    procurement: [
      { item: "Equipamento de processamento de pescado", deadline: "2027-01-15", contact: "procurement@mimaip.gov.mz" },
    ],
  },
];

export const reports = [
  { id: "1", title: "Análise do OE 2026 - Oportunidades para o Sector Privado", titleEn: "2026 State Budget Analysis - Private Sector Opportunities", date: "2026-01-20", category: "Especial", description: "Análise detalhada do Orçamento do Estado 2026 com foco em oportunidades.", descriptionEn: "Detailed analysis of the 2026 State Budget focusing on opportunities." },
  { id: "2", title: "Relatório Trimestral T4 2025 - Investimento Provincial", titleEn: "Q4 2025 Quarterly Report - Provincial Investment", date: "2025-12-15", category: "Provincial", description: "Balanço do investimento público por província no último trimestre de 2025.", descriptionEn: "Public investment balance by province in the last quarter of 2025." },
  { id: "3", title: "Sector Agrícola - Tendências e Oportunidades 2026", titleEn: "Agricultural Sector - 2026 Trends and Opportunities", date: "2026-02-01", category: "Sectorial", description: "Análise das tendências do sector agrícola e oportunidades de investimento.", descriptionEn: "Analysis of agricultural sector trends and investment opportunities." },
  { id: "4", title: "Infraestruturas - Mapeamento de Projetos 2026", titleEn: "Infrastructure - 2026 Project Mapping", date: "2026-02-10", category: "Sectorial", description: "Mapeamento completo dos projetos de infraestruturas previstos para 2026.", descriptionEn: "Complete mapping of infrastructure projects planned for 2026." },
  { id: "5", title: "Energia Renovável em Moçambique - Perspectivas", titleEn: "Renewable Energy in Mozambique - Perspectives", date: "2026-01-28", category: "Especial", description: "Estudo sobre o potencial de energias renováveis e oportunidades de investimento.", descriptionEn: "Study on the potential of renewable energies and investment opportunities." },
  { id: "6", title: "Relatório Trimestral T1 2026 - Execução Orçamental", titleEn: "Q1 2026 Quarterly Report - Budget Execution", date: "2026-02-20", category: "Provincial", description: "Acompanhamento da execução orçamental do primeiro trimestre de 2026.", descriptionEn: "Monitoring of budget execution in the first quarter of 2026." },
];

export const investmentByYear = [
  { year: "2020", value: 85000 },
  { year: "2021", value: 92000 },
  { year: "2022", value: 98000 },
  { year: "2023", value: 108000 },
  { year: "2024", value: 118000 },
  { year: "2025", value: 125700 },
  { year: "2026", value: 138500 },
];

export const sectorDistribution = [
  { name: "Infraestruturas", value: 35, nameEn: "Infrastructure" },
  { name: "Saúde", value: 18, nameEn: "Health" },
  { name: "Educação", value: 15, nameEn: "Education" },
  { name: "Agricultura", value: 12, nameEn: "Agriculture" },
  { name: "Energia", value: 10, nameEn: "Energy" },
  { name: "Águas", value: 5, nameEn: "Water" },
  { name: "Pescas", value: 3, nameEn: "Fisheries" },
  { name: "Turismo", value: 2, nameEn: "Tourism" },
];
