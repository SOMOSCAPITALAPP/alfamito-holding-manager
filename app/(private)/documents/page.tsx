import { DocumentsView } from "@/components/DocumentsView";
import documents from "@/data/documents.json";
import type { CompanyDocument } from "@/lib/types";

export default function DocumentsPage() {
  return <DocumentsView documents={documents as CompanyDocument[]} />;
}
