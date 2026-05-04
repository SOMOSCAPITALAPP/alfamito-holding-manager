import { TaxView } from "@/components/TaxView";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import schedule from "@/data/financial-schedule.json";
import taxProfile from "@/data/tax-profile.json";
import type {
  Company,
  CompanyDocument,
  FinancialScheduleItem,
} from "@/lib/types";

export default function TaxPage() {
  const taxDocuments = (documents as CompanyDocument[]).filter(
    (document) => document.category === "tax",
  );

  return (
    <TaxView
      company={company as Company}
      documents={taxDocuments}
      schedule={schedule as FinancialScheduleItem[]}
      taxProfile={taxProfile}
    />
  );
}
