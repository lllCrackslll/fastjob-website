export interface CvPersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  city: string;
  headline: string;
  summary: string;
}

export interface CvExperience {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
}

export interface CvEducation {
  id: string;
  school: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface CvLanguage {
  id: string;
  name: string;
  level: string;
}

export interface CvData {
  personal: CvPersonalInfo;
  experiences: CvExperience[];
  educations: CvEducation[];
  skills: string[];
  languages: CvLanguage[];
}

export interface CvRecord {
  id: string;
  email: string;
  title: string;
  templateId: string;
  data: CvData;
  updatedAt: string;
  createdAt: string;
}

export const CV_TEMPLATES = [
  { id: "classic", name: "Classique", available: true },
  { id: "modern", name: "Moderne", available: false },
  { id: "creative", name: "Créatif", available: false },
] as const;

function uid() {
  return Math.random().toString(36).slice(2, 11);
}

export function createEmptyCvData(email = "", name = ""): CvData {
  const parts = name.trim().split(/\s+/);
  const firstName = parts[0] ?? "";
  const lastName = parts.slice(1).join(" ");

  return {
    personal: {
      firstName,
      lastName,
      email,
      phone: "",
      city: "Rennes",
      headline: "",
      summary: "",
    },
    experiences: [],
    educations: [],
    skills: [],
    languages: [],
  };
}

export function createEmptyExperience(): CvExperience {
  return {
    id: uid(),
    company: "",
    role: "",
    location: "Rennes",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  };
}

export function createEmptyEducation(): CvEducation {
  return {
    id: uid(),
    school: "",
    degree: "",
    field: "",
    startDate: "",
    endDate: "",
    description: "",
  };
}

export function createEmptyLanguage(): CvLanguage {
  return {
    id: uid(),
    name: "",
    level: "Intermédiaire",
  };
}

export function parseCvData(raw: string): CvData {
  const parsed = JSON.parse(raw) as CvData;
  return {
    ...createEmptyCvData(),
    ...parsed,
    personal: { ...createEmptyCvData().personal, ...parsed.personal },
    experiences: parsed.experiences ?? [],
    educations: parsed.educations ?? [],
    skills: parsed.skills ?? [],
    languages: parsed.languages ?? [],
  };
}
