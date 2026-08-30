"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/lib/toast-context";

export default function ConnexionPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const { login, isLoggedIn } = useAuth();
  const { showToast } = useToast();
  const router = useRouter();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/dashboard");
    }
  }, [isLoggedIn, router]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) {
      showToast("Renseigne ton email", "error");
      return;
    }
    const success = login(email, password);
    if (success) {
      showToast(
        isRegister ? "Profil créé avec succès !" : "Connexion réussie !"
      );
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-[calc(100dvh-8rem)] items-center justify-center px-4 py-8 sm:py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">
            {isRegister ? "Créez votre profil" : "Connexion"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {isRegister
              ? "Inscrivez-vous pour activer le matching — nous vous enverrons les missions adaptées à votre profil"
              : "Accédez à vos offres personnalisées et à votre dossier"}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="glass-card space-y-4 p-5 sm:p-6">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="prenom@email.com"
                className="w-full rounded-xl border border-night-border/70 bg-night-muted/40 py-3 pl-10 pr-4 text-base text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">
              Mot de passe
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-night-border/70 bg-night-muted/40 py-3 pl-10 pr-4 text-base text-white placeholder:text-slate-500 focus:border-electric/50 focus:outline-none focus:ring-1 focus:ring-electric/30 sm:text-sm"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary w-full py-3">
            {isRegister ? "Créer mon profil" : "Se connecter"}
            <ArrowRight className="h-4 w-4" />
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {isRegister ? "Déjà un compte ?" : "Pas encore inscrit ?"}{" "}
          <button
            onClick={() => setIsRegister(!isRegister)}
            className="font-medium text-electric hover:underline"
          >
            {isRegister ? "Se connecter" : "Créer mon profil"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
