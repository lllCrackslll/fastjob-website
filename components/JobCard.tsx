"use client";

import { motion } from "framer-motion";
import { MapPin, Clock, Building2, Zap } from "lucide-react";
import type { JobOffer } from "@/lib/mock-data";

interface JobCardProps {
  offer: JobOffer;
  onClick: () => void;
  onApply?: () => void;
  compact?: boolean;
}

export default function JobCard({ offer, onClick, onApply, compact }: JobCardProps) {
  const handleApply = (e: React.MouseEvent) => {
    e.stopPropagation();
    onApply?.();
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="glass-card group cursor-pointer p-4 sm:p-5"
    >
      <div className="mb-3 flex flex-col gap-2 min-[420px]:flex-row min-[420px]:items-start min-[420px]:justify-between">
        <div className="min-w-0 flex-1">
          {offer.urgent ? (
            <span className="badge-electric mb-2">
              <Zap className="h-3 w-3" fill="currentColor" />
              {offer.timingBadge}
            </span>
          ) : (
            <span className="mb-2 inline-flex rounded-full border border-night-border bg-night-muted/50 px-3 py-1 text-xs font-medium text-slate-400">
              {offer.timingBadge}
            </span>
          )}
          <h3 className="text-base font-semibold leading-snug text-white transition-colors group-hover:text-electric line-clamp-2">
            {offer.title}
          </h3>
        </div>
        <div className="shrink-0 min-[420px]:text-right">
          <span className="text-xl font-bold text-electric sm:text-lg">
            {offer.hourlyRate.toFixed(2).replace(".", ",")}€
          </span>
          <span className="ml-1 text-xs text-slate-500 min-[420px]:ml-0 min-[420px]:block">/heure brut</span>
        </div>
      </div>

      <div className="mb-4 space-y-1.5">
        <div className="flex items-start gap-2 text-sm text-slate-400">
          <Building2 className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-2">{offer.company} · {offer.sector}</span>
        </div>
        <div className="flex items-start gap-2 text-sm text-slate-400">
          <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
          <span className="line-clamp-2">{offer.location}</span>
        </div>
        {offer.metro && !compact && (
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="rounded bg-night-muted px-1.5 py-0.5">{offer.metro}</span>
          </div>
        )}
        <div className="flex items-center gap-2 text-sm text-slate-400">
          <Clock className="h-3.5 w-3.5 shrink-0" />
          <span>{offer.contractType}</span>
        </div>
      </div>

      <button
        type="button"
        onClick={handleApply}
        className="btn-primary w-full !py-2.5 text-xs sm:!py-2"
      >
        Postuler en 1 clic
      </button>
    </motion.div>
  );
}
