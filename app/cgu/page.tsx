import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Conditions générales d'utilisation — FAST JOB",
};

export default function CguPage() {
  return (
    <LegalPageLayout title="Conditions générales d'utilisation">
      <p>
        Les présentes conditions générales d&apos;utilisation (CGU) régissent l&apos;accès
        et l&apos;utilisation de la plateforme FAST JOB.
      </p>

      <h2 className="text-base font-semibold text-white">Objet</h2>
      <p>
        FAST JOB met à disposition une plateforme permettant aux candidats de créer un profil,
        de déposer leurs documents et de recevoir des propositions de missions intérim
        correspondant à leur profil.
      </p>

      <h2 className="text-base font-semibold text-white">Inscription</h2>
      <p>
        L&apos;utilisateur s&apos;engage à fournir des informations exactes et à jour.
        Il est responsable de la confidentialité de ses identifiants de connexion.
      </p>

      <h2 className="text-base font-semibold text-white">Fonctionnement du service</h2>
      <p>
        Le candidat ne postule pas directement aux offres. FAST JOB analyse le profil
        et contacte l&apos;utilisateur lorsqu&apos;une mission correspond à ses critères.
      </p>

      <h2 className="text-base font-semibold text-white">Responsabilité</h2>
      <p>
        FAST JOB s&apos;efforce d&apos;assurer la disponibilité de la plateforme mais
        ne garantit pas un accès ininterrompu. L&apos;utilisateur est seul responsable
        des contenus qu&apos;il transmet.
      </p>
    </LegalPageLayout>
  );
}
