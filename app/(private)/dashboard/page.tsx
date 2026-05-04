import { DashboardView } from "@/components/DashboardView";
import audit from "@/data/document-audit.json";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import schedule from "@/data/financial-schedule.json";
import type {
  Company,
  CompanyDocument,
  DocumentAudit,
  FinancialScheduleItem,
} from "@/lib/types";

export default function DashboardPage() {
  return (
    <DashboardView
      audit={audit as DocumentAudit}
      company={company as Company}
      documents={documents as CompanyDocument[]}
      schedule={schedule as FinancialScheduleItem[]}
    />
  );
}
