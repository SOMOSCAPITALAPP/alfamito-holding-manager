import { ModuleView } from "@/components/ModuleView";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import type { Company, CompanyDocument } from "@/lib/types";

export default function AccountingPage() {
  const accountingDocuments = (documents as CompanyDocument[]).filter(
    (document) => document.category === "accounting",
  );

  return (
    <ModuleView
      titleKey="accounting"
      eyebrow="Books"
      summary={{
        fr: "Espace de classement des bilans, comptes de résultat, annexes, grands livres et pièces justificatives pour chaque exercice comptable.",
        pt: "Área de organização de balanços, demonstrações de resultado, anexos, livros contábeis e comprovantes por exercício.",
      }}
      metrics={[
        {
          labelKey: "financialYears",
          value: (company as Company).financialYear,
        },
        { labelKey: "balanceSheets", value: { fr: "À alimenter", pt: "A preencher" } },
        { labelKey: "incomeStatements", value: { fr: "À alimenter", pt: "A preencher" } },
        { labelKey: "appendices", value: { fr: "À alimenter", pt: "A preencher" } },
        {
          labelKey: "supportingDocs",
          value: { fr: "Pièces par exercice", pt: "Comprovantes por exercício" },
        },
        {
          labelKey: "export",
          value: {
            fr: "Téléchargement dossier comptable",
            pt: "Download do dossiê contábil",
          },
        },
      ]}
      documents={accountingDocuments}
    />
  );
}
