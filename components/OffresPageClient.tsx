"use client";

import { useState, useMemo, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Briefcase, Filter, ChevronDown } from "lucide-react";
import { jobOffers } from "@/lib/mock-data";
import type { JobOffer } from "@/lib/mock-data";
import JobCard from "@/components/JobCard";
import OfferModal from "@/components/OfferModal";
import OfferFilters, { type OfferFiltersState } from "@/components/OfferFilters";
import { useToast } from "@/lib/toast-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

function countActiveFilters(filters: OfferFiltersState) {
  let count = 0;
  if (filters.sectors.length) count += filters.sectors.length;
  if (filters.contractTypes.length) count += filters.contractTypes.length;
  if (filters.minRate > 12) count += 1;
  if (filters.search) count += 1;
  if (filters.quartier) count += 1;
  return count;
}

export default function OffresPageClient() {
  const searchParams = useSearchParams();
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  const [filters, setFilters] = useState<OfferFiltersState>({
    sectors: [],
    contractTypes: [],
    minRate: 12,
    search: searchParams.get("q") || "",
    quartier: searchParams.get("quartier") || "",
  });

  const [selectedOffer, setSelectedOffer] = useState<JobOffer | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);

  const activeFilterCount = countActiveFilters(filters);

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      search: searchParams.get("q") || "",
      quartier: searchParams.get("quartier") || "",
    }));
  }, [searchParams]);

  const filteredOffers = useMemo(() => {
    return jobOffers.filter((offer) => {
      if (filters.sectors.length > 0 && !filters.sectors.includes(offer.sector)) {
        return false;
      }
      if (
        filters.contractTypes.length > 0 &&
        !filters.contractTypes.includes(offer.contractType)
      ) {
        return false;
      }
      if (offer.hourlyRate < filters.minRate) {
        return false;
      }
      if (filters.quartier && offer.quartier !== filters.quartier) {
        return false;
      }
      if (filters.search) {
        const q = filters.search.toLowerCase();
        const match =
          offer.title.toLowerCase().includes(q) ||
          offer.company.toLowerCase().includes(q) ||
          offer.sector.toLowerCase().includes(q) ||
          offer.location.toLowerCase().includes(q);
        if (!match) return false;
      }
      return true;
    });
  }, [filters]);

  const handleApply = (_offer: JobOffer) => {
    if (!isLoggedIn) {
      showToast("Connecte-toi pour postuler", "error");
      router.push("/connexion");
      return;
    }
    showToast("Candidature envoyée avec succès !");
  };

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="mb-2 flex items-center gap-3">
            <Briefcase className="h-5 w-5 shrink-0 text-electric sm:h-6 sm:w-6" />
            <h1 className="text-2xl font-bold text-white sm:text-3xl">Offres d&apos;emploi</h1>
          </div>
          <p className="text-sm text-slate-400 sm:text-base">
            {filteredOffers.length} mission{filteredOffers.length !== 1 ? "s" : ""} disponible{filteredOffers.length !== 1 ? "s" : ""} à Rennes
          </p>
        </motion.div>

        {/* Bouton filtres mobile */}
        <div className="mb-4 lg:hidden">
          <button
            type="button"
            onClick={() => setFiltersOpen(!filtersOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-night-border bg-night-card/70 px-4 py-3 backdrop-blur-md"
          >
            <span className="flex items-center gap-2 text-sm font-medium text-white">
              <Filter className="h-4 w-4 text-electric" />
              Filtres
              {activeFilterCount > 0 && (
                <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-electric px-1.5 text-[11px] font-bold text-night">
                  {activeFilterCount}
                </span>
              )}
            </span>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 transition-transform ${filtersOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="pt-4">
                  <OfferFilters filters={filters} onChange={setFilters} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="grid gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          <aside className="hidden lg:sticky lg:top-24 lg:block lg:self-start">
            <OfferFilters filters={filters} onChange={setFilters} />
          </aside>

          <div>
            {filteredOffers.length === 0 ? (
              <div className="glass-card flex flex-col items-center justify-center p-8 text-center sm:p-12">
                <Briefcase className="mb-4 h-12 w-12 text-slate-600" />
                <h3 className="text-lg font-semibold text-white">Aucune offre trouvée</h3>
                <p className="mt-2 text-sm text-slate-400">
                  Essaie de modifier tes filtres pour voir plus de missions.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2">
                {filteredOffers.map((offer, i) => (
                  <motion.div
                    key={offer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: Math.min(i * 0.05, 0.3) }}
                  >
                    <JobCard
                      offer={offer}
                      onClick={() => setSelectedOffer(offer)}
                      onApply={() => handleApply(offer)}
                    />
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedOffer && (
        <OfferModal
          offer={selectedOffer}
          onClose={() => setSelectedOffer(null)}
        />
      )}
    </div>
  );
}
