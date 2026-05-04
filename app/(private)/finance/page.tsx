import { FinanceView } from "@/components/FinanceView";
import company from "@/data/company.json";
import financialAnalysis from "@/data/financial-analysis.json";
import documents from "@/data/documents.json";
import schedule from "@/data/financial-schedule.json";
import type {
  Company,
  CompanyDocument,
  FinancialAnalysis,
  FinancialScheduleItem,
} from "@/lib/types";

export default function FinancePage() {
  const financeDocuments = (documents as CompanyDocument[]).filter((document) =>
    ["finance", "bank", "accounting", "tax"].includes(document.category),
  );

  return (
    <FinanceView
      company={company as Company}
      documents={financeDocuments}
      financialAnalysis={financialAnalysis as FinancialAnalysis}
      schedule={schedule as FinancialScheduleItem[]}
    />
  );
}
