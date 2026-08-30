export type Sector =
  | "Restauration"
  | "Événementiel"
  | "Logistique"
  | "Numérique";

export type ContractType =
  | "Week-end"
  | "Soirée"
  | "Semaine"
  | "Court terme";

export type TimingBadge = "Ce week-end" | "Urgent" | "Sans expérience requise";

export type Quartier =
  | "Centre-ville"
  | "Beaulieu"
  | "Villejean"
  | "Gare"
  | "Atalante"
  | "Saint-Grégoire"
  | "Rennes Sud";

export interface JobOffer {
  id: string;
  title: string;
  company: string;
  sector: Sector;
  location: string;
  quartier: Quartier;
  metro?: string;
  hourlyRate: number;
  contractType: ContractType;
  timingBadge: TimingBadge;
  urgent: boolean;
  featured: boolean;
  description: string;
  requirements: string[];
  schedule: string;
  startDate: string;
}

export interface Application {
  id: string;
  offerId: string;
  offerTitle: string;
  company: string;
  status: "En attente" | "Acceptée" | "Mission confirmée" | "Refusée";
  appliedAt: string;
}

export const QUARTIERS: Quartier[] = [
  "Beaulieu",
  "Villejean",
  "Centre-ville",
  "Atalante",
  "Saint-Grégoire",
  "Gare",
  "Rennes Sud",
];

export const SECTORS: Sector[] = [
  "Restauration",
  "Événementiel",
  "Logistique",
  "Numérique",
];

export const CONTRACT_TYPES: ContractType[] = [
  "Week-end",
  "Soirée",
  "Semaine",
  "Court terme",
];

export const jobOffers: JobOffer[] = [
  {
    id: "1",
    title: "Barman / Serveur - Soirée Événementielle",
    company: "Le Couvent des Jacobins",
    sector: "Restauration",
    location: "Le Couvent des Jacobins, Rennes Centre",
    quartier: "Centre-ville",
    metro: "Métro A — République",
    hourlyRate: 13.5,
    contractType: "Soirée",
    timingBadge: "Ce week-end",
    urgent: true,
    featured: true,
    description:
      "Rejoins l'équipe événementielle du Couvent des Jacobins pour une soirée privée de 150 convives. Service en salle et bar, ambiance dynamique et équipe soudée.",
    requirements: [
      "Avoir 18 ans minimum",
      "Bonne présentation",
      "Expérience en restauration appréciée mais non obligatoire",
    ],
    schedule: "Samedi 20h — 02h",
    startDate: "2026-09-06",
  },
  {
    id: "2",
    title: "Préparateur de commandes nocturne",
    company: "LogiRennes Sud",
    sector: "Logistique",
    location: "Zone Logistique Rennes Sud, Chartres-de-Bretagne",
    quartier: "Rennes Sud",
    metro: "Bus C5 — Zone Sud",
    hourlyRate: 14.2,
    contractType: "Soirée",
    timingBadge: "Urgent",
    urgent: true,
    featured: true,
    description:
      "Préparation et expédition de commandes e-commerce dans un entrepôt moderne. Poste nocturne avec prime de nuit incluse dans le taux horaire.",
    requirements: [
      "Capacité à porter des charges légères",
      "Disponibilité en horaires décalés",
      "Aucune expérience requise — formation sur place",
    ],
    schedule: "Lundi au vendredi, 22h — 06h",
    startDate: "2026-09-02",
  },
  {
    id: "3",
    title: "Hôte/Hôtesse d'accueil match",
    company: "Stade Rennais FC",
    sector: "Événementiel",
    location: "Roazhon Park, Route de Lorient",
    quartier: "Villejean",
    metro: "Métro A — Villejean-Université",
    hourlyRate: 12.5,
    contractType: "Week-end",
    timingBadge: "Ce week-end",
    urgent: false,
    featured: true,
    description:
      "Accueil des supporters, contrôle des billets et orientation vers les tribunes lors du match de Ligue 1. Tenue fournie par l'agence.",
    requirements: [
      "Sens du contact et sourire",
      "Disponible le week-end",
      "Parler français couramment",
    ],
    schedule: "Dimanche 14h — 19h",
    startDate: "2026-09-07",
  },
  {
    id: "4",
    title: "Assistant Support Informatique Junior",
    company: "TechStart Rennes",
    sector: "Numérique",
    location: "Rennes Atalante Beaulieu, Avenue du Général Leclerc",
    quartier: "Beaulieu",
    metro: "Métro A — Beaulieu",
    hourlyRate: 13.0,
    contractType: "Semaine",
    timingBadge: "Sans expérience requise",
    urgent: false,
    featured: true,
    description:
      "Support niveau 1 pour une startup du technopôle : gestion de tickets, installation de postes, assistance utilisateurs. Idéal pour un profil BTS SIO ou licence info.",
    requirements: [
      "Notions en informatique",
      "Curiosité et autonomie",
      "Étudiant en informatique ou équivalent",
    ],
    schedule: "Lundi au vendredi, 9h — 17h",
    startDate: "2026-09-08",
  },
  {
    id: "5",
    title: "Employé polyvalent festival / concerts",
    company: "Le Liberté / TNB",
    sector: "Événementiel",
    location: "Le Liberté, Esplanade Charles de Gaulle",
    quartier: "Centre-ville",
    metro: "Métro A — Charles de Gaulle",
    hourlyRate: 12.8,
    contractType: "Court terme",
    timingBadge: "Urgent",
    urgent: true,
    featured: false,
    description:
      "Mission polyvalente lors de concerts et festivals : accueil, vestiaire, logistique scène. Ambiance musicale garantie dans l'un des plus beaux lieux culturels de Rennes.",
    requirements: [
      "Disponibilité en soirée",
      "Esprit d'équipe",
      "Bonne condition physique",
    ],
    schedule: "Variable selon événements",
    startDate: "2026-09-05",
  },
  {
    id: "6",
    title: "Serveur / Serveuse — Brasserie étudiante",
    company: "Brasserie Le Saint-Grégoire",
    sector: "Restauration",
    location: "Place Saint-Grégoire, Rennes",
    quartier: "Saint-Grégoire",
    metro: "Bus C3 — Saint-Grégoire",
    hourlyRate: 12.6,
    contractType: "Week-end",
    timingBadge: "Sans expérience requise",
    urgent: false,
    featured: false,
    description:
      "Service en salle dans une brasserie conviviale fréquentée par les étudiants. Horaires flexibles, formation assurée par le chef de salle.",
    requirements: [
      "Minimum 16 ans (avec autorisation parentale)",
      "Disponibilité week-end",
      "Motivation et dynamisme",
    ],
    schedule: "Vendredi et samedi soir, 18h — 23h",
    startDate: "2026-09-06",
  },
  {
    id: "7",
    title: "Agent de quai — CDD express",
    company: "TransRennes Logistique",
    sector: "Logistique",
    location: "Parc d'activités de la Gare, Rennes",
    quartier: "Gare",
    metro: "Métro A — Gare",
    hourlyRate: 13.8,
    contractType: "Court terme",
    timingBadge: "Urgent",
    urgent: true,
    featured: false,
    description:
      "Chargement et déchargement de camions, inventaire rapide. Mission de 5 jours renouvelable. Équipement de sécurité fourni.",
    requirements: [
      "Permis B souhaité",
      "Capacité physique",
      "Ponctualité",
    ],
    schedule: "Lundi au vendredi, 6h — 14h",
    startDate: "2026-09-01",
  },
];

export const mockApplications: Application[] = [
  {
    id: "app-1",
    offerId: "3",
    offerTitle: "Hôte/Hôtesse d'accueil match",
    company: "Stade Rennais FC",
    status: "Mission confirmée",
    appliedAt: "2026-08-25",
  },
  {
    id: "app-2",
    offerId: "4",
    offerTitle: "Assistant Support Informatique Junior",
    company: "TechStart Rennes",
    status: "En attente",
    appliedAt: "2026-08-28",
  },
  {
    id: "app-3",
    offerId: "1",
    offerTitle: "Barman / Serveur - Soirée Événementielle",
    company: "Le Couvent des Jacobins",
    status: "Acceptée",
    appliedAt: "2026-08-29",
  },
];

export const STATS = [
  { label: "+150 missions/semaine", icon: "Zap" as const },
  { label: "Paiement rapide", icon: "Clock" as const },
  { label: "100% Mobile", icon: "Smartphone" as const },
];

export const WHY_FASTJOB = [
  {
    title: "Profil vérifié en 2 min",
    description:
      "Crée ton compte, dépose tes documents et obtiens ton badge candidat vérifié en quelques minutes.",
    icon: "ShieldCheck" as const,
  },
  {
    title: "Postule en 1 clic",
    description:
      "Plus besoin de CV à rallonge. Ton profil FAST JOB suffit pour candidater instantanément.",
    icon: "MousePointerClick" as const,
  },
  {
    title: "Planning flexible",
    description:
      "Choisis tes missions selon ton emploi du temps étudiant. Week-end, soirée ou vacances.",
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
    description: "Optionnel — renforce ton profil",
  },
];
