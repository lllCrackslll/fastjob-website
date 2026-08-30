"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Clock, Sparkles, Check, X } from "lucide-react";
import { MATCHED_OFFERS, type MatchedOffer, type MatchedOfferStatus } from "@/lib/mock-data";
import { useToast } from "@/lib/toast-context";

const statusStyles: Record<MatchedOfferStatus, string> = {
  Nouvelle: "border-electric/40 bg-electric/10 text-electric",
  Intéressé: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  Confirmée: "border-green-500/30 bg-green-500/10 text-green-400",
  Refusée: "border-red-500/30 bg-red-500/10 text-red-400",
};

export default function ReceivedOffers() {
  const { showToast } = useToast();
  const [offers, setOffers] = useState<MatchedOffer[]>(MATCHED_OFFERS);

  const updateStatus = (id: string, status: MatchedOfferStatus) => {
    setOffers((prev) =>
      prev.map((o) => (o.id === id ? { ...o, status } : o))
    );
    if (status === "Intéressé") {
      showToast("FAST JOB a bien reçu votre intérêt pour cette mission.");
    } else if (status === "Refusée") {
      showToast("Offre archivée. Nous continuerons à vous proposer d'autres missions.");
    }
  };

  if (offers.length === 0) {
    return (
      <div className="rounded-xl border border-night-border/70 bg-night-card/40 p-8 text-center">
        <Sparkles className="mx-auto mb-3 h-10 w-10 text-slate-600" />
        <p className="font-medium text-white">Aucune offre pour le moment</p>
        <p className="mt-2 text-sm text-slate-400">
          Complétez votre profil et votre CV — nous vous enverrons une mission dès qu&apos;elle correspond à votre profil.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-slate-400">
        Missions proposées par FAST JOB en fonction de votre profil. Vous n&apos;avez rien à chercher : on vous contacte.
      </p>

      {offers.map((offer, i) => (
        <motion.div
          key={offer.id}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          className="rounded-xl border border-night-border/70 bg-night-card/40 p-4 sm:p-5"
        >
          <div className="mb-3 flex flex-wrap items-start justify-between gap-2">
            <div>
              <span className={`mb-2 inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${statusStyles[offer.status]}`}>
                {offer.status}
              </span>
              <h3 className="text-base font-semibold text-white">{offer.title}</h3>
              <p className="text-sm text-slate-400">{offer.company}</p>
            </div>
            <div className="text-right">
              <span className="text-lg font-bold text-electric">
                {offer.hourlyRate.toFixed(2).replace(".", ",")}€
              </span>
              <span className="block text-xs text-slate-500">/heure brut</span>
            </div>
          </div>

          <div className="mb-3 space-y-1.5 text-sm text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 shrink-0 text-electric" />
              {offer.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-3.5 w-3.5 shrink-0 text-electric" />
              {offer.schedule}
            </div>
          </div>

          <div className="mb-4 flex items-start gap-2 rounded-lg border border-electric/20 bg-electric/5 px-3 py-2">
            <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-electric" />
            <p className="text-xs leading-relaxed text-slate-300">{offer.matchReason}</p>
          </div>

          <p className="mb-3 text-xs text-slate-500">
            Proposée le {new Date(offer.sentAt).toLocaleDateString("fr-FR")}
          </p>

          {offer.status === "Nouvelle" && (
            <div className="flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={() => updateStatus(offer.id, "Intéressé")}
                className="btn-primary flex-1 !py-2.5 text-xs"
              >
                <Check className="h-4 w-4" />
                Cette mission m&apos;intéresse
              </button>
              <button
                type="button"
                onClick={() => updateStatus(offer.id, "Refusée")}
                className="btn-ghost flex-1 !py-2.5 text-xs"
              >
                <X className="h-4 w-4" />
                Pas pour moi
              </button>
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
