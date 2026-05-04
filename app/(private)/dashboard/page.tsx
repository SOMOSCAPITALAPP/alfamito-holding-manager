import { DashboardView } from "@/components/DashboardView";
import company from "@/data/company.json";
import documents from "@/data/documents.json";
import type { Company, CompanyDocument } from "@/lib/types";

export default function DashboardPage() {
  return (
    <DashboardView
      company={company as Company}
      documents={documents as CompanyDocument[]}
    />
  );
}
