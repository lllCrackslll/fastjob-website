"use client";

import { motion } from "framer-motion";
import { mockApplications } from "@/lib/mock-data";

const statusColors: Record<string, string> = {
  "En attente": "border-yellow-500/30 bg-yellow-500/10 text-yellow-400",
  Acceptée: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  "Mission confirmée": "border-green-500/30 bg-green-500/10 text-green-400",
  Refusée: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function ApplicationsList() {
  if (mockApplications.length === 0) {
    return (
      <p className="py-8 text-center text-sm text-slate-500">
        Aucune candidature pour le moment.
      </p>
    );
  }

  return (
    <>
      {/* Mobile : cartes empilées */}
      <div className="flex flex-col gap-3 md:hidden">
        {mockApplications.map((app, i) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="rounded-xl border border-night-border bg-night-card/50 p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <h4 className="text-sm font-semibold leading-snug text-white">
                {app.offerTitle}
              </h4>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${statusColors[app.status]}`}
              >
                {app.status}
              </span>
            </div>
            <div className="space-y-1 text-xs text-slate-400">
              <p>{app.company}</p>
              <p>
                Candidature du{" "}
                {new Date(app.appliedAt).toLocaleDateString("fr-FR")}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Desktop : tableau */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead>
            <tr className="border-b border-night-border">
              <th className="pb-3 pr-4 font-medium text-slate-500">Mission</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Entreprise</th>
              <th className="pb-3 pr-4 font-medium text-slate-500">Date</th>
              <th className="pb-3 font-medium text-slate-500">Statut</th>
            </tr>
          </thead>
          <tbody>
            {mockApplications.map((app, i) => (
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="border-b border-night-border/50"
              >
                <td className="py-4 pr-4 font-medium text-white">
                  {app.offerTitle}
                </td>
                <td className="py-4 pr-4 text-slate-400">{app.company}</td>
                <td className="py-4 pr-4 text-slate-400">
                  {new Date(app.appliedAt).toLocaleDateString("fr-FR")}
                </td>
                <td className="py-4">
                  <span
                    className={`inline-flex rounded-full border px-3 py-1 text-xs font-medium ${statusColors[app.status]}`}
                  >
                    {app.status}
                  </span>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
