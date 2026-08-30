import Link from "next/link";

interface LegalPageLayoutProps {
  title: string;
  children: React.ReactNode;
}

export default function LegalPageLayout({ title, children }: LegalPageLayoutProps) {
  return (
    <div className="px-4 py-10 sm:px-6 sm:py-14 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-slate-400 transition-colors hover:text-electric"
        >
          ← Retour à l&apos;accueil
        </Link>
        <div className="glass-card p-6 sm:p-8">
          <h1 className="mb-6 text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          <div className="prose-legal space-y-4 text-sm leading-relaxed text-slate-400">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
