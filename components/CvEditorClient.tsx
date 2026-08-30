"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Save,
  Plus,
  Trash2,
  User,
  Briefcase,
  GraduationCap,
  Sparkles,
  Languages,
  FileText,
  Loader2,
  Lock,
} from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";
import {
  type CvData,
  CV_TEMPLATES,
  createEmptyCvData,
  createEmptyExperience,
  createEmptyEducation,
  createEmptyLanguage,
} from "@/lib/cv-types";
import CvPreview from "@/components/CvPreview";

export default function CvEditorClient() {
  const { user, isLoggedIn, isLoading: authLoading } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  const [cvData, setCvData] = useState<CvData | null>(null);
  const [title, setTitle] = useState("Mon CV");
  const [templateId, setTemplateId] = useState("classic");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState<string | null>(null);
  const [skillInput, setSkillInput] = useState("");

  const loadCv = useCallback(async () => {
    if (!user?.email) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/cv?email=${encodeURIComponent(user.email)}`);
      const json = await res.json();

      if (!res.ok) throw new Error(json.error);

      if (json.cv) {
        setCvData(json.cv.data);
        setTitle(json.cv.title);
        setTemplateId(json.cv.templateId);
        setLastSaved(json.cv.updatedAt);
      } else {
        const empty = createEmptyCvData(user.email, user.name);
        setCvData(empty);
      }
    } catch {
      showToast("Impossible de charger ton CV", "error");
      setCvData(createEmptyCvData(user?.email, user?.name));
    } finally {
      setLoading(false);
    }
  }, [user, showToast]);

  useEffect(() => {
    if (authLoading) return;
    if (!isLoggedIn) {
      router.push("/connexion");
      return;
    }
    loadCv();
  }, [authLoading, isLoggedIn, router, loadCv]);

  const handleSave = async () => {
    if (!user?.email || !cvData) return;

    setSaving(true);
    try {
      const res = await fetch("/api/cv", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          title,
          templateId,
          data: cvData,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      setLastSaved(json.cv.updatedAt);
      showToast("CV enregistré avec succès !");
    } catch {
      showToast("Erreur lors de l'enregistrement", "error");
    } finally {
      setSaving(false);
    }
  };

  const updatePersonal = (field: keyof CvData["personal"], value: string) => {
    if (!cvData) return;
    setCvData({
      ...cvData,
      personal: { ...cvData.personal, [field]: value },
    });
  };

  const addSkill = () => {
    const skill = skillInput.trim();
    if (!skill || !cvData || cvData.skills.includes(skill)) return;
    setCvData({ ...cvData, skills: [...cvData.skills, skill] });
    setSkillInput("");
  };

  if (authLoading || loading || !cvData) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-electric" />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <div className="mb-2 flex items-center gap-2">
              <FileText className="h-6 w-6 text-electric" />
              <h1 className="text-2xl font-bold text-white sm:text-3xl">Éditeur de CV</h1>
            </div>
            <p className="text-sm text-slate-400">
              Remplis ton CV — tes données sont sauvegardées en base et retrouvables à chaque connexion.
            </p>
            {lastSaved && (
              <p className="mt-1 text-xs text-slate-500">
                Dernière sauvegarde :{" "}
                {new Date(lastSaved).toLocaleString("fr-FR")}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="btn-primary w-full sm:w-auto"
          >
            {saving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Enregistrer
          </button>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
          {/* Formulaire */}
          <div className="space-y-5">
            {/* Modèles (à venir) */}
            <section className="glass-card p-5">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                <Sparkles className="h-4 w-4 text-electric" />
                Modèle de CV
              </h2>
              <div className="flex flex-wrap gap-2">
                {CV_TEMPLATES.map((tpl) => (
                  <button
                    key={tpl.id}
                    type="button"
                    disabled={!tpl.available}
                    onClick={() => tpl.available && setTemplateId(tpl.id)}
                    className={`rounded-xl border px-4 py-2 text-sm font-medium transition-all ${
                      templateId === tpl.id
                        ? "border-electric/50 bg-electric/10 text-electric"
                        : tpl.available
                          ? "border-night-border text-slate-400 hover:border-electric/30"
                          : "cursor-not-allowed border-night-border/50 text-slate-600 opacity-60"
                    }`}
                  >
                    {tpl.name}
                    {!tpl.available && (
                      <span className="ml-1.5 text-[10px] uppercase">Bientôt</span>
                    )}
                  </button>
                ))}
              </div>
              <p className="mt-3 flex items-start gap-2 text-xs text-slate-500">
                <Lock className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                Les modèles type Canva arriveront prochainement. Tes infos sont déjà enregistrées et prêtes à être appliquées.
              </p>
            </section>

            {/* Infos perso */}
            <section className="glass-card p-5">
              <h2 className="mb-4 flex items-center gap-2 text-base font-semibold text-white">
                <User className="h-4 w-4 text-electric" />
                Informations personnelles
              </h2>
              <div className="grid gap-3 sm:grid-cols-2">
                {[
                  { key: "firstName" as const, label: "Prénom", placeholder: "Rayane" },
                  { key: "lastName" as const, label: "Nom", placeholder: "Dupont" },
                  { key: "email" as const, label: "Email", placeholder: "email@exemple.fr", type: "email" },
                  { key: "phone" as const, label: "Téléphone", placeholder: "06 12 34 56 78" },
                  { key: "city" as const, label: "Ville", placeholder: "Rennes" },
                  { key: "headline" as const, label: "Titre pro", placeholder: "Étudiant en logistique" },
                ].map((field) => (
                  <div key={field.key} className={field.key === "headline" ? "sm:col-span-2" : ""}>
                    <label className="mb-1 block text-xs font-medium text-slate-500">{field.label}</label>
                    <input
                      type={field.type ?? "text"}
                      value={cvData.personal[field.key]}
                      onChange={(e) => updatePersonal(field.key, e.target.value)}
                      placeholder={field.placeholder}
                      className="input-field px-3 text-sm"
                    />
                  </div>
                ))}
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-slate-500">Résumé / Accroche</label>
                  <textarea
                    rows={3}
                    value={cvData.personal.summary}
                    onChange={(e) => updatePersonal("summary", e.target.value)}
                    placeholder="Jeune motivé, disponible en intérim à Rennes..."
                    className="input-field resize-none px-3 py-2 text-sm"
                  />
                </div>
              </div>
            </section>

            {/* Expériences */}
            <section className="glass-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <Briefcase className="h-4 w-4 text-electric" />
                  Expériences
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setCvData({
                      ...cvData,
                      experiences: [...cvData.experiences, createEmptyExperience()],
                    })
                  }
                  className="btn-ghost !min-h-0 !px-3 !py-1.5 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter
                </button>
              </div>
              <div className="space-y-4">
                {cvData.experiences.length === 0 && (
                  <p className="text-sm text-slate-500">Aucune expérience — clique sur Ajouter.</p>
                )}
                {cvData.experiences.map((exp, index) => (
                  <div key={exp.id} className="rounded-xl border border-night-border/70 bg-night-card/40 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Expérience {index + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCvData({
                            ...cvData,
                            experiences: cvData.experiences.filter((e) => e.id !== exp.id),
                          })
                        }
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        placeholder="Poste"
                        value={exp.role}
                        onChange={(e) => {
                          const experiences = [...cvData.experiences];
                          experiences[index] = { ...exp, role: e.target.value };
                          setCvData({ ...cvData, experiences });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      <input
                        placeholder="Entreprise"
                        value={exp.company}
                        onChange={(e) => {
                          const experiences = [...cvData.experiences];
                          experiences[index] = { ...exp, company: e.target.value };
                          setCvData({ ...cvData, experiences });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      <input
                        placeholder="Lieu"
                        value={exp.location}
                        onChange={(e) => {
                          const experiences = [...cvData.experiences];
                          experiences[index] = { ...exp, location: e.target.value };
                          setCvData({ ...cvData, experiences });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      <label className="flex items-center gap-2 text-sm text-slate-400">
                        <input
                          type="checkbox"
                          checked={exp.current}
                          onChange={(e) => {
                            const experiences = [...cvData.experiences];
                            experiences[index] = { ...exp, current: e.target.checked };
                            setCvData({ ...cvData, experiences });
                          }}
                          className="accent-electric"
                        />
                        Poste actuel
                      </label>
                      <input
                        type="month"
                        value={exp.startDate}
                        onChange={(e) => {
                          const experiences = [...cvData.experiences];
                          experiences[index] = { ...exp, startDate: e.target.value };
                          setCvData({ ...cvData, experiences });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      {!exp.current && (
                        <input
                          type="month"
                          value={exp.endDate}
                          onChange={(e) => {
                            const experiences = [...cvData.experiences];
                            experiences[index] = { ...exp, endDate: e.target.value };
                            setCvData({ ...cvData, experiences });
                          }}
                          className="input-field px-3 text-sm"
                        />
                      )}
                      <textarea
                        rows={2}
                        placeholder="Missions et réalisations..."
                        value={exp.description}
                        onChange={(e) => {
                          const experiences = [...cvData.experiences];
                          experiences[index] = { ...exp, description: e.target.value };
                          setCvData({ ...cvData, experiences });
                        }}
                        className="input-field resize-none px-3 py-2 text-sm sm:col-span-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Formations */}
            <section className="glass-card p-5">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-base font-semibold text-white">
                  <GraduationCap className="h-4 w-4 text-electric" />
                  Formations
                </h2>
                <button
                  type="button"
                  onClick={() =>
                    setCvData({
                      ...cvData,
                      educations: [...cvData.educations, createEmptyEducation()],
                    })
                  }
                  className="btn-ghost !min-h-0 !px-3 !py-1.5 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter
                </button>
              </div>
              <div className="space-y-4">
                {cvData.educations.length === 0 && (
                  <p className="text-sm text-slate-500">Aucune formation — clique sur Ajouter.</p>
                )}
                {cvData.educations.map((edu, index) => (
                  <div key={edu.id} className="rounded-xl border border-night-border/70 bg-night-card/40 p-4">
                    <div className="mb-3 flex items-center justify-between">
                      <span className="text-xs font-medium text-slate-500">Formation {index + 1}</span>
                      <button
                        type="button"
                        onClick={() =>
                          setCvData({
                            ...cvData,
                            educations: cvData.educations.filter((e) => e.id !== edu.id),
                          })
                        }
                        className="text-slate-500 hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <input
                        placeholder="Établissement"
                        value={edu.school}
                        onChange={(e) => {
                          const educations = [...cvData.educations];
                          educations[index] = { ...edu, school: e.target.value };
                          setCvData({ ...cvData, educations });
                        }}
                        className="input-field px-3 text-sm sm:col-span-2"
                      />
                      <input
                        placeholder="Diplôme"
                        value={edu.degree}
                        onChange={(e) => {
                          const educations = [...cvData.educations];
                          educations[index] = { ...edu, degree: e.target.value };
                          setCvData({ ...cvData, educations });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      <input
                        placeholder="Domaine"
                        value={edu.field}
                        onChange={(e) => {
                          const educations = [...cvData.educations];
                          educations[index] = { ...edu, field: e.target.value };
                          setCvData({ ...cvData, educations });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      <input
                        type="month"
                        value={edu.startDate}
                        onChange={(e) => {
                          const educations = [...cvData.educations];
                          educations[index] = { ...edu, startDate: e.target.value };
                          setCvData({ ...cvData, educations });
                        }}
                        className="input-field px-3 text-sm"
                      />
                      <input
                        type="month"
                        value={edu.endDate}
                        onChange={(e) => {
                          const educations = [...cvData.educations];
                          educations[index] = { ...edu, endDate: e.target.value };
                          setCvData({ ...cvData, educations });
                        }}
                        className="input-field px-3 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Compétences & langues */}
            <section className="glass-card p-5">
              <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-white">
                <Sparkles className="h-4 w-4 text-electric" />
                Compétences
              </h2>
              <div className="mb-3 flex gap-2">
                <input
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addSkill())}
                  placeholder="Ex: Excel, Anglais, CACES..."
                  className="input-field flex-1 px-3 text-sm"
                />
                <button type="button" onClick={addSkill} className="btn-primary !min-h-[44px] !px-4">
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {cvData.skills.map((skill) => (
                  <span
                    key={skill}
                    className="inline-flex items-center gap-1 rounded-full border border-electric/30 bg-electric/10 px-3 py-1 text-xs font-medium text-electric"
                  >
                    {skill}
                    <button
                      type="button"
                      onClick={() =>
                        setCvData({
                          ...cvData,
                          skills: cvData.skills.filter((s) => s !== skill),
                        })
                      }
                      className="hover:text-white"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>

              <h3 className="mb-3 mt-6 flex items-center gap-2 text-sm font-semibold text-white">
                <Languages className="h-4 w-4 text-electric" />
                Langues
              </h3>
              <div className="space-y-3">
                {cvData.languages.map((lang, index) => (
                  <div key={lang.id} className="flex gap-2">
                    <input
                      placeholder="Langue"
                      value={lang.name}
                      onChange={(e) => {
                        const languages = [...cvData.languages];
                        languages[index] = { ...lang, name: e.target.value };
                        setCvData({ ...cvData, languages });
                      }}
                      className="input-field flex-1 px-3 text-sm"
                    />
                    <select
                      value={lang.level}
                      onChange={(e) => {
                        const languages = [...cvData.languages];
                        languages[index] = { ...lang, level: e.target.value };
                        setCvData({ ...cvData, languages });
                      }}
                      className="input-field w-36 px-3 text-sm"
                    >
                      {["Débutant", "Intermédiaire", "Courant", "Bilingue", "Natif"].map((l) => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                    <button
                      type="button"
                      onClick={() =>
                        setCvData({
                          ...cvData,
                          languages: cvData.languages.filter((l) => l.id !== lang.id),
                        })
                      }
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-night-border text-slate-500 hover:text-red-400"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() =>
                    setCvData({
                      ...cvData,
                      languages: [...cvData.languages, createEmptyLanguage()],
                    })
                  }
                  className="btn-ghost w-full !py-2 text-xs"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Ajouter une langue
                </button>
              </div>
            </section>

            <button type="button" onClick={handleSave} disabled={saving} className="btn-primary w-full py-3 lg:hidden">
              {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Enregistrer mon CV
            </button>
          </div>

          {/* Aperçu */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <CvPreview data={cvData} title={title} />
          </div>
        </div>
      </div>
    </div>
  );
}
