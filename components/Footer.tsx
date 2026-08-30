import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import Logo from "@/components/Logo";

export default function Footer() {
  return (
    <footer className="relative border-t border-night-border/60 bg-night">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <div>
            <div className="mb-4">
              <Logo href="/" height={56} className="!h-12 w-auto sm:!h-14" />
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Créez votre profil, complétez votre dossier et recevez les missions
              intérim à Rennes qui correspondent à votre profil.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Navigation</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link href="/connexion" className="transition-colors hover:text-electric">Créer mon profil</Link></li>
              <li><Link href="/editeur-cv" className="transition-colors hover:text-electric">Éditeur de CV</Link></li>
              <li><Link href="/dashboard" className="transition-colors hover:text-electric">Mon espace</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-semibold text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-electric" />
                Rennes, Bretagne
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-electric" />
                contact@fastjob-rennes.fr
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-night-border pt-6 text-center text-xs text-slate-500">
          © 2026 FAST JOB — Tous droits réservés.
        </div>
      </div>
    </footer>
  );
}
