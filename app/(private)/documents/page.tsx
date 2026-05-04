import { DocumentsView } from "@/components/DocumentsView";
import audit from "@/data/document-audit.json";
import documents from "@/data/documents.json";
import type { CompanyDocument, DocumentAudit } from "@/lib/types";

export default function DocumentsPage() {
  return (
    <DocumentsView
      audit={audit as DocumentAudit}
      documents={documents as CompanyDocument[]}
    />
  );
}
