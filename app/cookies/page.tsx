import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Politique cookies — FAST JOB",
};

export default function CookiesPage() {
  return (
    <LegalPageLayout title="Politique cookies">
      <p>
        Lors de votre navigation sur FAST JOB, des cookies et traceurs peuvent être déposés
        sur votre terminal pour assurer le bon fonctionnement du site et améliorer votre expérience.
      </p>

      <h2 className="text-base font-semibold text-white">Cookies essentiels</h2>
      <p>
        Nécessaires au fonctionnement du site : session de connexion, préférences techniques.
        Ils ne peuvent pas être désactivés.
      </p>

      <h2 className="text-base font-semibold text-white">Cookies de mesure d&apos;audience</h2>
      <p>
        Permettent d&apos;analyser l&apos;utilisation du site de manière anonyme afin
        d&apos;en améliorer les performances. Vous pouvez refuser ces cookies via les paramètres
        de votre navigateur.
      </p>

      <h2 className="text-base font-semibold text-white">Gestion des cookies</h2>
      <p>
        Vous pouvez à tout moment configurer votre navigateur pour accepter ou refuser les cookies.
        Le refus de certains cookies peut limiter l&apos;accès à certaines fonctionnalités.
      </p>
    </LegalPageLayout>
  );
}
