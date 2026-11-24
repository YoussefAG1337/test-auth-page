import type { Prisma } from "@/generated/prisma/client";

export const COMPANIES: Prisma.CompanyCreateManyInput[] = [
  {
    name: "Aerolys",
    status: "CLOSED",
    sectors: ["SPACE", "ENERGY"],
    descriptionFr: "Conception de petits satellites pour le suivi de la production d’énergie solaire",
    descriptionEn: "Small satellites designed to monitor solar energy production",
  },
  {
    name: "Bioméa",
    status: "ACTIVE",
    sectors: ["BIOTECHNOLOGY", "HEALTHCARE", "ARTIFICIAL_INTELLIGENCE"],
    descriptionFr: "Analyse du microbiome assistée par IA pour des traitements personnalisés",
    descriptionEn: "AI-assisted microbiome analysis for personalised treatments",
  },
  {
    name: "Cadastra",
    status: "ACTIVE",
    sectors: ["REAL_ESTATE", "SOFTWARE"],
    descriptionFr: "Logiciel de gestion de patrimoine immobilier pour les bailleurs et les syndics",
    descriptionEn: "Property portfolio management software for landlords and building managers",
  },
  {
    name: "Dunefield",
    status: "ACQUIRED",
    sectors: ["AGRICULTURE", "ECOLOGY"],
    descriptionFr: "Capteurs connectés pour piloter l’irrigation des exploitations agricoles",
    descriptionEn: "Connected sensors that steer irrigation on farms",
  },
  {
    name: "Helixia",
    status: "INACTIVE",
    sectors: ["HEALTHCARE", "SOFTWARE", "ARTIFICIAL_INTELLIGENCE"],
    descriptionFr:
      "Plateforme numérique facilitant la prise de rendez-vous médicaux et la gestion des consultations",
    descriptionEn: "Digital platform for booking medical appointments and managing consultations",
  },
  {
    name: "Klarifi",
    status: "ACTIVE",
    sectors: ["FINANCE", "LEGAL"],
    descriptionFr: "Automatisation de la conformité réglementaire pour les établissements financiers",
    descriptionEn: "Regulatory compliance automation for financial institutions",
  },
  {
    name: "Novacargo",
    status: "CLOSED",
    sectors: ["TRANSPORT", "DISTRIBUTION"],
    descriptionFr: "Livraison du dernier kilomètre en véhicules électriques dans les centres-villes",
    descriptionEn: "Last-mile delivery with electric vehicles in city centres",
  },
  {
    name: "Verdalis",
    status: "ACTIVE",
    sectors: ["FOOD", "CONSUMER_GOODS"],
    descriptionFr: "Alternatives végétales aux produits laitiers, distribuées en grande surface",
    descriptionEn: "Plant-based dairy alternatives sold in supermarkets",
  },
];
