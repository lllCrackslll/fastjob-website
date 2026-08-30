import type { CvData } from "@/lib/cv-types";

interface CvPreviewProps {
  data: CvData;
  title: string;
}

function formatMonth(value: string) {
  if (!value) return "";
  const [year, month] = value.split("-");
  if (!year || !month) return value;
  return new Date(Number(year), Number(month) - 1).toLocaleDateString("fr-FR", {
    month: "short",
    year: "numeric",
  });
}

export default function CvPreview({ data, title }: CvPreviewProps) {
  const { personal, experiences, educations, skills, languages } = data;
  const fullName = [personal.firstName, personal.lastName].filter(Boolean).join(" ") || "Ton nom";

  return (
    <div className="glass-card overflow-hidden">
      <div className="border-b border-night-border px-4 py-3 sm:px-5">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Aperçu</p>
        <p className="text-sm text-slate-400">{title}</p>
      </div>

      <div className="bg-white p-5 text-slate-900 sm:p-6">
        <div className="border-b border-slate-200 pb-4">
          <h2 className="text-xl font-bold">{fullName}</h2>
          {personal.headline && (
            <p className="mt-1 text-sm font-medium text-slate-600">{personal.headline}</p>
          )}
          <div className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs text-slate-500">
            {personal.email && <span>{personal.email}</span>}
            {personal.phone && <span>{personal.phone}</span>}
            {personal.city && <span>{personal.city}</span>}
          </div>
        </div>

        {personal.summary && (
          <section className="mt-4">
            <h3 className="mb-1 text-xs font-bold uppercase tracking-wider text-slate-700">Profil</h3>
            <p className="text-sm leading-relaxed text-slate-600">{personal.summary}</p>
          </section>
        )}

        {experiences.length > 0 && (
          <section className="mt-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Expériences</h3>
            <div className="space-y-3">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <p className="text-sm font-semibold">{exp.role || "Poste"}</p>
                  <p className="text-xs text-slate-600">
                    {[exp.company, exp.location].filter(Boolean).join(" · ")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatMonth(exp.startDate)}
                    {(exp.endDate || exp.current) && " — "}
                    {exp.current ? "Aujourd'hui" : formatMonth(exp.endDate)}
                  </p>
                  {exp.description && (
                    <p className="mt-1 text-xs leading-relaxed text-slate-600">{exp.description}</p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {educations.length > 0 && (
          <section className="mt-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Formations</h3>
            <div className="space-y-3">
              {educations.map((edu) => (
                <div key={edu.id}>
                  <p className="text-sm font-semibold">{edu.degree || "Diplôme"}</p>
                  <p className="text-xs text-slate-600">
                    {[edu.school, edu.field].filter(Boolean).join(" · ")}
                  </p>
                  <p className="text-xs text-slate-400">
                    {formatMonth(edu.startDate)}
                    {edu.endDate && ` — ${formatMonth(edu.endDate)}`}
                  </p>
                </div>
              ))}
            </div>
          </section>
        )}

        {skills.length > 0 && (
          <section className="mt-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Compétences</h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill}
                  className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section className="mt-4">
            <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-slate-700">Langues</h3>
            <div className="space-y-1">
              {languages.map((lang) => (
                <p key={lang.id} className="text-xs text-slate-600">
                  <span className="font-medium text-slate-800">{lang.name || "Langue"}</span>
                  {lang.level && ` — ${lang.level}`}
                </p>
              ))}
            </div>
          </section>
        )}

        {!personal.summary &&
          experiences.length === 0 &&
          educations.length === 0 &&
          skills.length === 0 &&
          languages.length === 0 && (
            <p className="mt-6 text-center text-sm text-slate-400">
              Commence à remplir le formulaire pour voir ton CV ici.
            </p>
          )}
      </div>
    </div>
  );
}
