import Link from "next/link";
import { MapPin, Mail } from "lucide-react";
import Logo from "@/components/Logo";

const legalLinks = [
  { href: "/mentions-legales", label: "Mentions légales" },
  { href: "/politique-confidentialite", label: "Confidentialité" },
  { href: "/cgu", label: "CGU" },
  { href: "/cookies", label: "Cookies" },
];

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
              intérim partout en France qui correspondent à votre profil.
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
                France
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-electric" />
                <a href="mailto:contact@fastjob.fr" className="transition-colors hover:text-electric">
                  contact@fastjob.fr
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-night-border pt-6">
          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
            <p className="text-center text-xs text-slate-500 sm:text-left">
              © 2026 FAST JOB — Tous droits réservés.
            </p>
            <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
              {legalLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs text-slate-500 transition-colors hover:text-electric"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}
