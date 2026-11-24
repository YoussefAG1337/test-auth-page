import { t, type Dictionary } from "intlayer";
import type { Sector } from "./model/sectors";

const sectorLabels = {
  ARTIFICIAL_INTELLIGENCE: t({ en: "AI", fr: "IA" }),
  ECOLOGY: t({ en: "Ecology", fr: "Écologie" }),
  FINANCE: t({ en: "Finance", fr: "Finance" }),
  SOFTWARE: t({ en: "Software", fr: "Logiciel" }),
  SPACE: t({ en: "Space", fr: "Spatial" }),
  HEALTHCARE: t({ en: "Healthcare", fr: "Santé" }),
  INDUSTRY: t({ en: "Industry", fr: "Industrie" }),
  CONSTRUCTION: t({ en: "Construction", fr: "Construction" }),
  ENERGY: t({ en: "Energy", fr: "Énergie" }),
  RESOURCES: t({ en: "Resources", fr: "Ressources" }),
  REAL_ESTATE: t({ en: "Real estate", fr: "Immobilier" }),
  HOSPITALITY: t({ en: "Hospitality", fr: "Hôtellerie" }),
  SOCIAL: t({ en: "Social", fr: "Social" }),
  NEW_TECHNOLOGIES: t({ en: "New technologies", fr: "Nouvelles technologies" }),
  EDUCATION: t({ en: "Education", fr: "Éducation" }),
  FOOD: t({ en: "Food", fr: "Alimentation" }),
  AGRICULTURE: t({ en: "Agriculture", fr: "Agriculture" }),
  SPORTS: t({ en: "Sports", fr: "Sport" }),
  MEDIA: t({ en: "Media", fr: "Médias" }),
  COMMUNICATIONS: t({ en: "Communications", fr: "Communication" }),
  CULTURE: t({ en: "Culture", fr: "Culture" }),
  ENTERTAINMENT: t({ en: "Entertainment", fr: "Divertissement" }),
  TRANSPORT: t({ en: "Transport", fr: "Transport" }),
  COMPUTER_HARDWARE: t({ en: "Computer hardware", fr: "Matériel informatique" }),
  SERVICES: t({ en: "Services", fr: "Services" }),
  CONSUMER_GOODS: t({ en: "Consumer goods", fr: "Biens de consommation" }),
  DISTRIBUTION: t({ en: "Distribution", fr: "Distribution" }),
  TELECOMMUNICATIONS: t({ en: "Telecommunications", fr: "Télécommunications" }),
  BIOTECHNOLOGY: t({ en: "Biotechnology", fr: "Biotechnologie" }),
  WEB3: t({ en: "Web3", fr: "Web3" }),
  LEGAL: t({ en: "Legal", fr: "Juridique" }),
  DEFENSE: t({ en: "Defense", fr: "Défense" }),
} satisfies Record<Sector, unknown>;

const sectorContent = {
  key: "sectors",
  content: sectorLabels,
} satisfies Dictionary;

export default sectorContent;
