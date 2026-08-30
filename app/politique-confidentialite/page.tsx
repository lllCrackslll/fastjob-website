import LegalPageLayout from "@/components/LegalPageLayout";

export const metadata = {
  title: "Politique de confidentialité — FAST JOB",
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageLayout title="Politique de confidentialité">
      <p>
        FAST JOB s&apos;engage à protéger la vie privée des utilisateurs de sa plateforme.
        La présente politique décrit la manière dont vos données personnelles sont collectées,
        utilisées et conservées.
      </p>

      <h2 className="text-base font-semibold text-white">Données collectées</h2>
      <p>
        Nous collectons les informations que vous fournissez lors de la création de votre profil :
        identité, coordonnées, documents administratifs, CV, compétences et disponibilités.
      </p>

      <h2 className="text-base font-semibold text-white">Finalités</h2>
      <ul className="list-inside list-disc space-y-1">
        <li>Création et gestion de votre profil candidat</li>
        <li>Matching avec des missions intérim adaptées</li>
        <li>Contact en cas de mission correspondant à votre profil</li>
        <li>Respect des obligations légales en matière d&apos;intérim</li>
      </ul>

      <h2 className="text-base font-semibold text-white">Conservation</h2>
      <p>
        Vos données sont conservées pendant la durée de votre inscription et, le cas échéant,
        pendant la durée légale applicable après la fin de la relation.
      </p>

      <h2 className="text-base font-semibold text-white">Vos droits</h2>
      <p>
        Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
        de suppression, de limitation, d&apos;opposition et de portabilité de vos données.
        Pour exercer ces droits :{" "}
        <a href="mailto:contact@fastjob.fr" className="text-electric hover:underline">
          contact@fastjob.fr
        </a>
      </p>
    </LegalPageLayout>
  );
}
