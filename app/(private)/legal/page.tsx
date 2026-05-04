import { ModuleView } from "@/components/ModuleView";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import type { Company, CompanyDocument } from "@/lib/types";

export default function LegalPage() {
  const companyData = company as Company;
  const legalDocuments = (documents as CompanyDocument[]).filter(
    (document) => document.category === "legal",
  );

  return (
    <ModuleView
      titleKey="legal"
      eyebrow="Corporate"
      summary={{
        fr: "Résumé opérationnel des statuts Alfamito Sàrl : capital social de 12 500 EUR, objet de holding et participations, gérance par Vincent Baron, exercice civil et approbation des comptes dans les 6 mois.",
        pt: "Resumo operacional do contrato social da Alfamito Sàrl: capital social de 12.500 EUR, objeto de holding e participações, gestão por Vincent Baron, exercício civil e aprovação das contas em até 6 meses.",
      }}
      metrics={[
        { labelKey: "shareCapital", value: companyData.shareCapital },
        {
          labelKey: "transferRules",
          value: {
            fr: "Cessions à suivre selon les statuts et décisions d'associés.",
            pt: "Transferências a acompanhar conforme contrato social e decisões dos sócios.",
          },
        },
        {
          labelKey: "managerPowers",
          value: {
            fr: "Gestion courante, représentation et signature sociale.",
            pt: "Gestão corrente, representação e assinatura social.",
          },
        },
        {
          labelKey: "accountsApproval",
          value: companyData.accountsApproval,
        },
        {
          labelKey: "shareholderRegister",
          value: { fr: "À tenir à jour", pt: "Manter atualizado" },
        },
        {
          labelKey: "decisionsToTrack",
          value: {
            fr: "PV, mandats, pouvoirs, approbation annuelle.",
            pt: "Atas, mandatos, procurações, aprovação anual.",
          },
        },
      ]}
      documents={legalDocuments}
    />
  );
}
