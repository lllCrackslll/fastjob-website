"use client";

import { motion } from "framer-motion";
import { ShieldCheck, MousePointerClick, Calendar } from "lucide-react";
import { WHY_FASTJOB } from "@/lib/mock-data";

const iconMap = {
  ShieldCheck,
  MousePointerClick,
  Calendar,
};

export default function WhyFastJob() {
  return (
    <section id="avantages" className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Pourquoi <span className="text-electric">FAST JOB</span> ?
          </h2>
          <p className="mt-3 text-slate-400">
            L&apos;intérim simplifié, humain et efficace
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {WHY_FASTJOB.map((item, i) => {
            const Icon = iconMap[item.icon];
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.5 }}
                whileHover={{ y: -4 }}
                className="glass-card group p-5 sm:p-6"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-electric/10 border border-electric/20 transition-all group-hover:bg-electric/20 group-hover:shadow-lg group-hover:shadow-electric/10">
                  <Icon className="h-6 w-6 text-electric" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-white">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-slate-400">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
