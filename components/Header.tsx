"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, LogOut, User } from "lucide-react";
import { useAuth } from "@/lib/auth-context";
import Logo from "@/components/Logo";

const navLinks = [
  { href: "/offres", label: "Offres" },
  { href: "/#comment-ca-marche", label: "Comment ça marche" },
  { href: "/#avantages", label: "Avantages Jeunes" },
];

export default function Header() {
  const pathname = usePathname();
  const { isLoggedIn, user, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-night-border/60 bg-night/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-1 sm:px-6 sm:py-1.5 lg:px-8">
        <Logo height={72} priority className="!h-14 w-auto sm:!h-16 md:!h-[4.75rem]" />

        <nav className="hidden items-center gap-6 md:flex lg:gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-electric ${
                pathname === link.href ? "text-electric" : "text-slate-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 sm:gap-3 md:flex">
          {isLoggedIn ? (
            <>
              <Link
                href="/dashboard"
                className="btn-ghost !min-h-[40px] !px-3 !py-2 text-xs"
              >
                <User className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">{user?.name}</span>
              </Link>
              <button onClick={logout} className="btn-ghost !min-h-[40px] !px-3 !py-2 text-xs">
                <LogOut className="h-4 w-4 shrink-0" />
                <span className="hidden sm:inline">Déconnexion</span>
              </button>
            </>
          ) : (
            <>
              <Link href="/connexion" className="btn-ghost !min-h-[40px] !px-3 !py-2 text-xs">
                Connexion
              </Link>
              <Link href="/connexion" className="btn-primary !min-h-[40px] !px-3 !py-2 text-xs">
                <span className="hidden sm:inline">Créer mon profil</span>
                <span className="sm:hidden">S&apos;inscrire</span>
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-slate-400 hover:bg-night-muted/50 hover:text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-night-border/60 md:hidden"
          >
            <div className="flex max-h-[calc(100dvh-4rem)] flex-col gap-1 overflow-y-auto px-4 py-4 safe-bottom">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-slate-300 hover:bg-night-muted/50 hover:text-electric"
                >
                  {link.label}
                </Link>
              ))}
              <div className="mt-2 flex flex-col gap-2 border-t border-night-border pt-4">
                {isLoggedIn ? (
                  <>
                    <Link href="/dashboard" className="btn-ghost w-full" onClick={() => setMobileOpen(false)}>
                      Mon espace
                    </Link>
                    <button
                      onClick={() => { logout(); setMobileOpen(false); }}
                      className="btn-ghost w-full"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/connexion" className="btn-ghost w-full" onClick={() => setMobileOpen(false)}>
                      Connexion
                    </Link>
                    <Link href="/connexion" className="btn-primary w-full" onClick={() => setMobileOpen(false)}>
                      Créer mon profil
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
