import { ModuleView } from "@/components/ModuleView";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import type { Company, CompanyDocument } from "@/lib/types";

export default function TaxPage() {
  const taxDocuments = (documents as CompanyDocument[]).filter(
    (document) => document.category === "tax",
  );

  return (
    <ModuleView
      titleKey="tax"
      eyebrow="Compliance"
      summary={{
        fr: "Suivi des obligations déclaratives luxembourgeoises, du statut fiscal, des avis, déclarations et éventuelles obligations TVA selon l'activité réelle de la holding.",
        pt: "Acompanhamento das obrigações declarativas luxemburguesas, situação fiscal, avisos, declarações e eventuais obrigações de IVA conforme a atividade real da holding.",
      }}
      metrics={[
        { labelKey: "taxStatus", value: (company as Company).taxStatus },
        {
          labelKey: "taxObligations",
          value: {
            fr: "Impôt société, déclarations annuelles, avis fiscaux.",
            pt: "Imposto de renda corporativo, declarações anuais, avisos fiscais.",
          },
        },
        {
          labelKey: "deadlines",
          value: {
            fr: "Calendrier fiscal à confirmer",
            pt: "Calendário fiscal a confirmar",
          },
        },
        { labelKey: "taxDocuments", value: `${taxDocuments.length} document(s)` },
      ]}
      documents={taxDocuments}
    />
  );
}
