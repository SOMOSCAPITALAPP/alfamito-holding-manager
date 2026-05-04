import { FiduciaryView } from "@/components/FiduciaryView";
import type { FiduciaryData } from "@/components/FiduciaryView";
import mails from "@/data/centralis-mails.json";
import documents from "@/data/documents.json";
import fiduciary from "@/data/fiduciary.json";
import type { CentralisMail, CompanyDocument } from "@/lib/types";

export default function FiduciaryPage() {
  return (
    <FiduciaryView
      documents={documents as CompanyDocument[]}
      fiduciary={fiduciary as FiduciaryData}
      mails={mails as CentralisMail[]}
    />
  );
}
