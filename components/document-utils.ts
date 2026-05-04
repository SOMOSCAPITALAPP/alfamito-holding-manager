import type { CompanyDocument, DocumentCategory } from "@/lib/types";

export const categoryKeys: Record<DocumentCategory, string> = {
  legal: "legal",
  tax: "tax",
  accounting: "accounting",
  finance: "finance",
  bank: "bank",
  realEstate: "realEstate",
};

const priorityRank: Record<NonNullable<CompanyDocument["priority"]>, number> = {
  essential: 0,
  important: 1,
  archive: 2,
};

export function sortDocuments(documents: CompanyDocument[]) {
  return [...documents].sort((a, b) => {
    const priorityDelta =
      priorityRank[a.priority ?? "important"] -
      priorityRank[b.priority ?? "important"];
    if (priorityDelta !== 0) {
      return priorityDelta;
    }
    return b.date.localeCompare(a.date);
  });
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: amount % 1 === 0 ? 0 : 2,
  }).format(amount);
}

export function documentBadge(document: CompanyDocument) {
  if (document.priority === "essential") {
    return "Première ligne";
  }
  if (document.confidentiality === "restricted") {
    return "Très confidentiel";
  }
  if (document.confidentiality === "confidential") {
    return "Confidentiel";
  }
  return "Standard";
}
