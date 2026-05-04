import { DocumentsView } from "@/components/DocumentsView";
import { LbrFilingsView } from "@/components/LbrFilingsView";
import audit from "@/data/document-audit.json";
import documents from "@/data/documents.json";
import filings from "@/data/lbr-filings.json";
import type { CompanyDocument, DocumentAudit, LbrFiling } from "@/lib/types";

export default function DocumentsPage() {
  return (
    <div className="space-y-6">
      <LbrFilingsView
        documents={documents as CompanyDocument[]}
        filings={filings as LbrFiling[]}
      />
      <DocumentsView
        audit={audit as DocumentAudit}
        documents={documents as CompanyDocument[]}
      />
    </div>
  );
}
