"use client";

import { Download, FileClock, FileText } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Panel, SectionTitle } from "@/components/ui";
import type { CompanyDocument, LbrFiling } from "@/lib/types";

export function LbrFilingsView({
  documents,
  filings,
}: {
  documents: CompanyDocument[];
  filings: LbrFiling[];
}) {
  const { locale } = useI18n();
  const byId = new Map(documents.map((document) => [document.id, document]));
  const present = filings.filter((filing) => filing.status === "present").length;
  const missing = filings.filter((filing) => filing.status === "to_download").length;

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionTitle
          title={locale === "fr" ? "Historique LBR complet" : "Histórico LBR completo"}
          eyebrow="RCS B203873"
        />
        <div className="flex gap-2 text-sm">
          <span className="rounded-md bg-emerald-50 px-3 py-1 font-medium text-emerald-800">
            {present} présents
          </span>
          <span className="rounded-md bg-amber-50 px-3 py-1 font-medium text-amber-800">
            {missing} à télécharger
          </span>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">N° dépôt</th>
              <th className="px-4 py-3">Date</th>
              <th className="px-4 py-3">Type</th>
              <th className="px-4 py-3">Détail</th>
              <th className="px-4 py-3">Statut</th>
              <th className="px-4 py-3 text-right">Document</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {filings.map((filing) => {
              const document = filing.documentId
                ? byId.get(filing.documentId)
                : null;
              return (
                <tr key={filing.depositNumber}>
                  <td className="px-4 py-3 font-mono text-slate-800">
                    {filing.depositNumber}
                  </td>
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {filing.date}
                  </td>
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {filing.type}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{filing.detail}</td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center gap-2 rounded-md border px-2 py-1 text-xs font-medium ${
                        filing.status === "present"
                          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
                          : filing.status === "no_document"
                            ? "border-slate-200 bg-slate-50 text-slate-600"
                            : "border-amber-200 bg-amber-50 text-amber-800"
                      }`}
                    >
                      <FileClock className="size-3.5" />
                      {filing.status === "present"
                        ? "Présent"
                        : filing.status === "no_document"
                          ? "Aucun document"
                          : "À télécharger"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    {document ? (
                      <a
                        className="inline-flex items-center gap-2 rounded-md border border-[#111b2e] bg-white px-3 py-2 text-sm font-medium text-[#111b2e] hover:bg-[#111b2e] hover:text-white"
                        href={`/api/document/${document.id}?mode=view`}
                        target="_blank"
                      >
                        <FileText className="size-4" />
                        Ouvrir
                      </a>
                    ) : filing.status === "to_download" ? (
                      <span className="inline-flex items-center gap-2 rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-medium text-amber-800">
                        <Download className="size-4" />
                        À ajouter
                      </span>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
