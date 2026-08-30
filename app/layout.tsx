import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/lib/toast-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "FAST JOB — Agence d'intérim nationale",
  description:
    "Créez votre profil et recevez les missions intérim qui vous correspondent. FAST JOB vous contacte quand une offre match votre profil, partout en France.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/icon-512.png", type: "image/png", sizes: "512x512" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-night text-white min-h-screen overflow-x-hidden`}
      >
        <AuthProvider>
          <ToastProvider>
            <div className="relative flex min-h-screen flex-col">
              <div className="pointer-events-none fixed inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-electric/5 blur-3xl" />
                <div className="absolute top-1/2 -left-40 h-80 w-80 rounded-full bg-night-light/40 blur-3xl" />
              </div>
              <Header />
              <main className="relative flex-1">{children}</main>
              <Footer />
            </div>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
