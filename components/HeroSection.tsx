"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Zap, Clock, Smartphone, ArrowRight } from "lucide-react";
import { STATS } from "@/lib/mock-data";

const iconMap = {
  Zap,
  Clock,
  Smartphone,
};

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 py-12 sm:px-6 sm:py-20 lg:px-8 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="mx-auto max-w-4xl text-[1.75rem] font-bold leading-[1.15] tracking-tight text-white min-[400px]:text-3xl sm:text-5xl lg:text-6xl">
            Votre agence d&apos;intérim à Rennes{" "}
            <span className="text-electric">en un éclair</span> ⚡
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:mt-6 sm:text-lg">
            Gérez votre profil, vos documents et votre CV en ligne.
            Une plateforme simple, rapide et pensée pour l&apos;intérim à Rennes.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="mx-auto mt-8 flex max-w-lg flex-col gap-3 sm:mt-10 sm:flex-row sm:justify-center"
        >
          <Link href="/connexion" className="btn-primary w-full sm:w-auto sm:px-8">
            Créer mon profil
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link href="/connexion" className="btn-ghost w-full sm:w-auto sm:px-8">
            Se connecter
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="mx-auto mt-8 flex max-w-2xl flex-col items-stretch gap-4 min-[400px]:flex-row min-[400px]:flex-wrap min-[400px]:items-center min-[400px]:justify-center sm:mt-12 sm:gap-6 sm:gap-x-10"
        >
          {STATS.map((stat, i) => {
            const Icon = iconMap[stat.icon];
            return (
              <div key={i} className="flex items-center justify-center gap-2 min-[400px]:justify-start">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-electric/10">
                  <Icon className="h-4 w-4 text-electric" />
                </div>
                <span className="text-sm font-medium text-slate-300">{stat.label}</span>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
