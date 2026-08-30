"use client";

import { motion } from "framer-motion";

export default function HowItWorksSection() {
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
            Un parcours simple partout en France : vous créez votre profil, nous faisons le reste
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass-card mx-auto max-w-3xl p-5 sm:p-8"
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
      </div>
    </section>
  );
}
