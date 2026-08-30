"use client";

import { motion } from "framer-motion";
import { Zap, Clock, Smartphone, Search, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { STATS } from "@/lib/mock-data";

const iconMap = {
  Zap,
  Clock,
  Smartphone,
};

export default function HeroSection() {
  const router = useRouter();
  const [keyword, setKeyword] = useState("");
  const [quartier, setQuartier] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (keyword) params.set("q", keyword);
    if (quartier) params.set("quartier", quartier);
    router.push(`/offres${params.toString() ? `?${params}` : ""}`);
  };

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
            Trouve ta mission d&apos;intérim à Rennes{" "}
            <span className="text-electric">en un éclair</span> ⚡
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base text-slate-400 sm:mt-6 sm:text-lg">
            Missions courtes, jobs étudiants et tremplins pros sans prise de tête.
            Postule en 1 clic et commence à travailler cette semaine.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          onSubmit={handleSearch}
          className="mx-auto mt-8 max-w-3xl sm:mt-10"
        >
          <div className="glass-card flex flex-col gap-3 p-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Métier ou mot-clé..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full rounded-xl border border-night-border/70 bg-night-muted/40 py-3 pl-10 pr-4 text-base text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30 sm:text-sm"
              />
            </div>
            <div className="relative flex-1">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <select
                value={quartier}
                onChange={(e) => setQuartier(e.target.value)}
                className="w-full appearance-none rounded-xl border border-night-border/70 bg-night-muted/40 py-3 pl-10 pr-8 text-base text-white focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30 sm:text-sm"
              >
                <option value="">Quartier à Rennes</option>
                <option value="Gare">Gare</option>
                <option value="Villejean">Villejean</option>
                <option value="Beaulieu">Beaulieu</option>
                <option value="Centre-ville">Centre-ville</option>
                <option value="Atalante">Atalante</option>
                <option value="Saint-Grégoire">Saint-Grégoire</option>
                <option value="Rennes Sud">Rennes Sud</option>
              </select>
            </div>
            <button type="submit" className="btn-primary w-full shrink-0 sm:w-auto sm:px-8">
              <Search className="h-4 w-4" />
              Rechercher
            </button>
          </div>
        </motion.form>

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
