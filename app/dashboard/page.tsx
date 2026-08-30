"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, FileText, PenLine, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import DocumentUpload from "@/components/DocumentUpload";

export default function DashboardPage() {
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
              <p className="truncate text-xs text-slate-400 sm:text-sm">{user?.email}</p>
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
              <p className="font-semibold text-white">Éditeur de CV</p>
              <p className="text-xs text-slate-400 sm:text-sm">
                Créez et mettez à jour votre CV en ligne
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-electric" />
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="glass-card p-4 sm:p-6"
        >
          <h2 className="mb-1 flex items-center gap-2 text-base font-semibold text-white sm:text-lg">
            <FileText className="h-5 w-5 text-electric" />
            Mes documents
          </h2>
          <p className="mb-5 text-xs text-slate-400 sm:mb-6 sm:text-sm">
            Glissez-déposez ou sélectionnez vos fichiers pour compléter votre dossier candidat.
          </p>
          <DocumentUpload />
        </motion.div>
      </div>
    </div>
  );
}
