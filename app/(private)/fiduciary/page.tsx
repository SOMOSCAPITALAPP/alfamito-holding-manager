import { FiduciaryView } from "@/components/FiduciaryView";
import type { FiduciaryData } from "@/components/FiduciaryView";
import documents from "@/data/documents.json";
import fiduciary from "@/data/fiduciary.json";
import type { CompanyDocument } from "@/lib/types";

export default function FiduciaryPage() {
  return (
    <FiduciaryView
      documents={documents as CompanyDocument[]}
      fiduciary={fiduciary as FiduciaryData}
    />
  );
}
