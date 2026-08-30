export type MatchedOfferStatus = "Nouvelle" | "Intéressé" | "Confirmée" | "Refusée";

export interface MatchedOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  hourlyRate: number;
  schedule: string;
  matchReason: string;
  status: MatchedOfferStatus;
  sentAt: string;
}

export const STATS = [
  { label: "Profil en 2 min", icon: "Zap" as const },
  { label: "Offres sur mesure", icon: "Clock" as const },
  { label: "100% Mobile", icon: "Smartphone" as const },
];

export const WHY_FASTJOB = [
  {
    title: "Créez votre profil",
    description:
      "Renseignez vos compétences, disponibilités et documents. FAST JOB analyse votre profil pour vous proposer les bonnes missions.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "On vous contacte",
    description:
      "Pas besoin de chercher ni de postuler. Notre équipe vous envoie une offre dès qu'une mission correspond à votre profil.",
    icon: "MousePointerClick" as const,
  },
  {
    title: "Vous décidez",
    description:
      "Recevez des missions adaptées partout en France, consultez les détails et indiquez si la proposition vous intéresse.",
    icon: "Calendar" as const,
  },
];

export const MATCHED_OFFERS: MatchedOffer[] = [
  {
    id: "match-1",
    title: "Préparateur de commandes",
    company: "LogiExpress",
    location: "Zone logistique — Lyon",
    hourlyRate: 14.2,
    schedule: "Lundi au vendredi, 22h — 06h",
    matchReason: "Correspond à votre secteur logistique et vos disponibilités en soirée",
    status: "Nouvelle",
    sentAt: "2026-08-30",
  },
  {
    id: "match-2",
    title: "Agent polyvalent événementiel",
    company: "EventPro",
    location: "Paris — 12e arrondissement",
    hourlyRate: 12.8,
    schedule: "Week-ends variables",
    matchReason: "Profil événementiel et disponibilités week-end renseignées",
    status: "Intéressé",
    sentAt: "2026-08-28",
  },
  {
    id: "match-3",
    title: "Assistant support informatique",
    company: "TechStart",
    location: "Nantes — Erdre",
    hourlyRate: 13.0,
    schedule: "Semaine, 9h — 17h",
    matchReason: "Compétences informatiques détectées dans votre CV",
    status: "Confirmée",
    sentAt: "2026-08-25",
  },
];

export type DocumentType =
  | "identity"
  | "rib"
  | "health"
  | "cv";

export interface DocumentSlot {
  id: DocumentType;
  label: string;
  required: boolean;
  description: string;
}

export const DOCUMENT_SLOTS: DocumentSlot[] = [
  {
    id: "identity",
    label: "Pièce d'identité",
    required: true,
    description: "CNI ou Passeport en cours de validité",
  },
  {
    id: "rib",
    label: "RIB",
    required: true,
    description: "Relevé d'Identité Bancaire pour le virement de paie",
  },
  {
    id: "health",
    label: "Carte Vitale / Attestation",
    required: true,
    description: "Attestation de sécurité sociale à jour",
  },
  {
    id: "cv",
    label: "CV",
    required: false,
    description: "Optionnel — améliore le matching de votre profil",
  },
];
