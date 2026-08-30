"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { QUARTIERS } from "@/lib/mock-data";

export default function QuartiersSection() {
  return (
    <section id="comment-ca-marche" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-10 text-center"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Comment ça marche ?
          </h2>
          <p className="mt-3 text-slate-400">
            Un parcours simple : vous créez votre profil, nous faisons le reste
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card mx-auto mb-12 max-w-3xl p-5 sm:p-8"
        >
          <div className="grid gap-6 sm:grid-cols-3">
            {[
              { step: "1", text: "Créez votre profil et déposez vos documents" },
              { step: "2", text: "FAST JOB analyse votre profil et vos disponibilités" },
              { step: "3", text: "Recevez les missions qui vous correspondent" },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center gap-2 text-center">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-electric text-sm font-bold text-night">
                  {item.step}
                </span>
                <span className="text-sm text-slate-400">{item.text}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center"
        >
          <h3 className="text-xl font-bold text-white sm:text-2xl">
            Quartiers de Rennes
          </h3>
          <p className="mt-2 text-slate-400">
            Nous vous proposons des missions sur toute la métropole rennaise
          </p>
        </motion.div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          {QUARTIERS.map((quartier, i) => (
            <motion.span
              key={quartier}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-night-border bg-night-card/70 px-4 py-2.5 text-sm font-medium text-slate-300 backdrop-blur-md sm:px-5"
            >
              <MapPin className="h-4 w-4 text-electric" />
              {quartier}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
