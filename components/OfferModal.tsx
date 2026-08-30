"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  MapPin,
  Clock,
  Building2,
  Calendar,
  CheckCircle2,
  Zap,
} from "lucide-react";
import type { JobOffer } from "@/lib/mock-data";
import { useToast } from "@/lib/toast-context";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface OfferModalProps {
  offer: JobOffer;
  onClose: () => void;
}

export default function OfferModal({ offer, onClose }: OfferModalProps) {
  const { showToast } = useToast();
  const { isLoggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleApply = () => {
    if (!isLoggedIn) {
      showToast("Connecte-toi pour postuler", "error");
      router.push("/connexion");
      return;
    }
    showToast("Candidature envoyée avec succès !");
    onClose();
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm sm:items-center sm:p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, y: "100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "100%" }}
          transition={{ type: "spring", damping: 28, stiffness: 320 }}
          onClick={(e) => e.stopPropagation()}
          className="relative flex max-h-[92dvh] w-full max-w-2xl flex-col overflow-hidden rounded-t-2xl border border-night-border bg-night-light sm:max-h-[90vh] sm:rounded-2xl"
        >
          <div className="mx-auto mt-2 h-1 w-10 shrink-0 rounded-full bg-night-muted sm:hidden" />

          <div className="sticky top-0 z-10 flex shrink-0 items-start justify-between border-b border-night-border bg-night-light/95 p-4 backdrop-blur-md sm:p-6">
            <div className="min-w-0 flex-1 pr-3">
              {offer.urgent && (
                <span className="badge-electric mb-2">
                  <Zap className="h-3 w-3" fill="currentColor" />
                  {offer.timingBadge}
                </span>
              )}
              <h2 className="text-lg font-bold leading-snug text-white sm:text-xl">{offer.title}</h2>
              <p className="mt-1 text-sm text-slate-400">{offer.company}</p>
            </div>
            <button
              type="button"
              aria-label="Fermer"
              onClick={onClose}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-night-muted hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex-1 space-y-5 overflow-y-auto p-4 sm:space-y-6 sm:p-6 safe-bottom">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
              <div className="rounded-xl border border-electric/20 bg-electric/10 px-4 py-3">
                <span className="text-2xl font-bold text-electric">
                  {offer.hourlyRate.toFixed(2).replace(".", ",")}€
                </span>
                <span className="block text-xs text-slate-400">/heure brut</span>
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-night-border bg-night-muted/50 px-3 py-1 text-xs text-slate-300">
                  {offer.sector}
                </span>
                <span className="rounded-full border border-night-border bg-night-muted/50 px-3 py-1 text-xs text-slate-300">
                  {offer.contractType}
                </span>
              </div>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="flex items-start gap-3 text-sm">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <div className="min-w-0">
                  <p className="font-medium text-white">{offer.location}</p>
                  {offer.metro && (
                    <p className="text-slate-500">{offer.metro}</p>
                  )}
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <div>
                  <p className="font-medium text-white">{offer.schedule}</p>
                  <p className="text-slate-500">Horaires</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Calendar className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <div>
                  <p className="font-medium text-white">
                    {new Date(offer.startDate).toLocaleDateString("fr-FR", {
                      weekday: "long",
                      day: "numeric",
                      month: "long",
                    })}
                  </p>
                  <p className="text-slate-500">Date de début</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-sm">
                <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                <div>
                  <p className="font-medium text-white">{offer.quartier}</p>
                  <p className="text-slate-500">Quartier</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-white">Description</h3>
              <p className="text-sm leading-relaxed text-slate-400">
                {offer.description}
              </p>
            </div>

            <div>
              <h3 className="mb-2 font-semibold text-white">Prérequis</h3>
              <ul className="space-y-2">
                {offer.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-400">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>

            <button onClick={handleApply} className="btn-primary sticky bottom-0 w-full py-3">
              Confirmer ma candidature
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
