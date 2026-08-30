import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Mentions légales — FAST JOB",
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageLayout title="Mentions légales">
      <h2 className="text-base font-semibold text-white">Éditeur du site</h2>
      <p>
        FAST JOB<br />
        Agence d&apos;intérim — France<br />
        Email :{" "}
        <a href="mailto:contact@fastjob.fr" className="text-electric hover:underline">
          contact@fastjob.fr
        </a>
      </p>

      <h2 className="text-base font-semibold text-white">Directeur de la publication</h2>
      <p>Le représentant légal de FAST JOB.</p>

      <h2 className="text-base font-semibold text-white">Hébergement</h2>
      <p>
        Les informations d&apos;hébergement seront complétées lors de la mise en production
        du site.
      </p>

      <h2 className="text-base font-semibold text-white">Propriété intellectuelle</h2>
      <p>
        L&apos;ensemble du contenu du site (textes, visuels, logo, structure) est protégé
        par le droit de la propriété intellectuelle. Toute reproduction non autorisée est interdite.
      </p>
    </LegalPageLayout>
  );
}
