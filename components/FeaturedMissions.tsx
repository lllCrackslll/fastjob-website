"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { jobOffers } from "@/lib/mock-data";
import JobCard from "./JobCard";
import OfferModal from "./OfferModal";
import type { JobOffer } from "@/lib/mock-data";

export default function FeaturedMissions() {
  const featured = jobOffers.filter((o) => o.featured);
  const [current, setCurrent] = useState(0);
  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);

  const prev = () => setCurrent((c) => (c === 0 ? featured.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === featured.length - 1 ? 0 : c + 1));

  const mobileOffer = featured[current];
  const desktopVisible = [
    featured[current % featured.length],
    featured[(current + 1) % featured.length],
    featured[(current + 2) % featured.length],
  ].filter(Boolean);

  return (
    <section className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <h2 className="text-xl font-bold text-white sm:text-2xl lg:text-3xl">
              Missions en avant-première
            </h2>
            <p className="mt-1 text-sm text-slate-400 sm:mt-2 sm:text-base">
              Les offres urgentes du moment à Rennes
            </p>
          </div>
          <div className="flex items-center gap-2 self-start sm:self-auto">
            <button
              type="button"
              aria-label="Mission précédente"
              onClick={prev}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-night-border text-slate-400 transition-colors hover:border-electric/40 hover:text-electric"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Mission suivante"
              onClick={next}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-night-border text-slate-400 transition-colors hover:border-electric/40 hover:text-electric"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </motion.div>

        {/* Mobile : 1 carte + indicateurs */}
        <div className="md:hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={mobileOffer?.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25 }}
            >
              {mobileOffer && (
                <JobCard
                  offer={mobileOffer}
                  onClick={() => setSelectedOffer(mobileOffer)}
                  compact
                />
              )}
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex justify-center gap-2">
            {featured.map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Aller à la mission ${i + 1}`}
                onClick={() => setCurrent(i)}
                className={`h-2 rounded-full transition-all ${
                  i === current ? "w-6 bg-electric" : "w-2 bg-night-muted"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Desktop : grille 2-3 colonnes */}
        <div className="hidden gap-6 md:grid md:grid-cols-2 lg:grid-cols-3">
          {desktopVisible.map((offer, i) => (
            <motion.div
              key={`${offer.id}-${current}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
            >
              <JobCard
                offer={offer}
                onClick={() => setSelectedOffer(offer)}
                compact
              />
            </motion.div>
          ))}
        </div>
      </div>

      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </section>
  );
}
