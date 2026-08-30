export type Quartier =
  | "Centre-ville"
  | "Beaulieu"
  | "Villejean"
  | "Gare"
  | "Atalante"
  | "Saint-Grégoire"
  | "Rennes Sud";

export const QUARTIERS: Quartier[] = [
  "Beaulieu",
  "Villejean",
  "Centre-ville",
  "Atalante",
  "Saint-Grégoire",
  "Gare",
  "Rennes Sud",
];

export const STATS = [
  { label: "Recrutement rapide", icon: "Zap" as const },
  { label: "Paiement sécurisé", icon: "Clock" as const },
  { label: "100% Mobile", icon: "Smartphone" as const },
];

export const WHY_FASTJOB = [
  {
    title: "Profil vérifié en 2 min",
    description:
      "Créez votre compte, déposez vos documents et obtenez votre badge candidat vérifié en quelques minutes.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Dossier simplifié",
    description:
      "Centralisez vos documents et votre CV au même endroit pour gagner du temps à chaque démarche.",
    icon: "MousePointerClick" as const,
  },
  {
    title: "Planning flexible",
    description:
      "Organisez vos disponibilités selon votre rythme. Week-end, soirée ou semaine — vous choisissez.",
    icon: "Calendar" as const,
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
    description: "Optionnel — renforce votre profil",
  },
];
