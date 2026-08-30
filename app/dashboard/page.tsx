"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, FileText, PenLine, ArrowRight, Inbox } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import DocumentUpload from "@/components/DocumentUpload";
import ReceivedOffers from "@/components/ReceivedOffers";

type Tab = "offres" | "documents";

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<Tab>("offres");
  const { isLoggedIn, user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/connexion");
    }
  }, [isLoggedIn, router]);

  if (!isLoggedIn) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-electric border-t-transparent" />
      </div>
    );
  }

  const tabs = [
    { id: "offres" as Tab, label: "Offres pour moi", shortLabel: "Offres", icon: Inbox },
    { id: "documents" as Tab, label: "Mes documents", shortLabel: "Documents", icon: FileText },
  ];

  return (
    <div className="px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center gap-3 sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-electric/30 bg-electric/10 sm:h-12 sm:w-12">
              <User className="h-5 w-5 text-electric sm:h-6 sm:w-6" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
                Bonjour, {user?.name} 👋
              </h1>
              <p className="text-xs text-slate-400 sm:text-sm">
                Votre profil est actif — FAST JOB vous envoie les missions qui vous correspondent.
              </p>
            </div>
          </div>
        </motion.div>

        <Link
          href="/editeur-cv"
          className="glass-card mb-6 flex items-center justify-between gap-4 p-4 transition-colors hover:border-electric/40 sm:mb-8 sm:p-5"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-electric/30 bg-electric/10">
              <PenLine className="h-5 w-5 text-electric" />
            </div>
            <div>
              <p className="font-semibold text-white">Compléter mon profil / CV</p>
              <p className="text-xs text-slate-400 sm:text-sm">
                Plus votre profil est complet, plus le matching est précis
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-electric" />
        </Link>

        <div className="-mx-4 mb-4 flex gap-1 overflow-x-auto border-b border-night-border px-4 sm:mx-0 sm:mb-6 sm:gap-2 sm:px-0">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 border-b-2 px-3 py-3 text-sm font-medium transition-colors sm:px-4 ${
                  activeTab === tab.id
                    ? "border-electric text-electric"
                    : "border-transparent text-slate-400 hover:text-white"
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span className="sm:hidden">{tab.shortLabel}</span>
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-4 sm:p-6"
        >
          {activeTab === "offres" ? (
            <>
              <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                <Inbox className="h-5 w-5 text-electric" />
                Offres proposées pour vous
              </h2>
              <ReceivedOffers />
            </>
          ) : (
            <>
              <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
                <FileText className="h-5 w-5 text-electric" />
                Mes documents
              </h2>
              <p className="mb-5 text-xs text-slate-400 sm:mb-6 sm:text-sm">
                Complétez votre dossier pour activer le matching et recevoir des propositions de missions.
              </p>
              <DocumentUpload />
            </>
          )}
        </motion.div>
      </div>
    </div>
  );
}
