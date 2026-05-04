import { ModuleView } from "@/components/ModuleView";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import type { Company, CompanyDocument } from "@/lib/types";

export default function FinancePage() {
  const financeDocuments = (documents as CompanyDocument[]).filter((document) =>
    ["finance", "bank"].includes(document.category),
  );

  return (
    <ModuleView
      titleKey="finance"
      eyebrow="Capital"
      summary={{
        fr: "Vue de haut de bilan : capital social, comptes courants associés, participations, dettes, prêts et historique des mouvements financiers structurants.",
        pt: "Visão da estrutura de capital: capital social, contas correntes dos sócios, participações, dívidas, empréstimos e histórico de movimentos financeiros estruturantes.",
      }}
      metrics={[
        { labelKey: "shareCapital", value: (company as Company).shareCapital },
        { labelKey: "shareholderLoans", value: { fr: "À renseigner", pt: "A informar" } },
        { labelKey: "participations", value: { fr: "À documenter", pt: "A documentar" } },
        { labelKey: "debts", value: { fr: "À suivre", pt: "A acompanhar" } },
        { labelKey: "loans", value: { fr: "À suivre", pt: "A acompanhar" } },
        { labelKey: "valuation", value: { fr: "Non auditée", pt: "Não auditada" } },
        {
          labelKey: "movementHistory",
          value: { fr: "Historique à construire", pt: "Histórico a construir" },
        },
      ]}
      documents={financeDocuments}
    />
  );
}
