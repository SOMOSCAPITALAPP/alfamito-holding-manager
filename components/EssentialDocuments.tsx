"use client";

import { Download, Eye, ShieldCheck } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { documentBadge, sortDocuments } from "@/components/document-utils";
import { Panel, SectionTitle } from "@/components/ui";
import type { CompanyDocument, DocumentAudit } from "@/lib/types";

export function EssentialDocuments({
  audit,
  documents,
}: {
  audit: DocumentAudit;
  documents: CompanyDocument[];
}) {
  const { locale } = useI18n();
  const essentialDocuments = sortDocuments(
    documents.filter((document) =>
      audit.essentialDocumentIds.includes(document.id),
    ),
  );

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionTitle
          title={locale === "fr" ? "Documents de première ligne" : "Documentos principais"}
          eyebrow="Core file"
        />
        <span className="rounded-md border border-[#c9a24a]/30 bg-[#c9a24a]/10 px-3 py-1 text-sm font-medium text-[#7a5c18]">
          {essentialDocuments.length} documents prioritaires
        </span>
      </div>
      <p className="mb-5 max-w-5xl text-sm leading-6 text-slate-600">
        {audit.summary[locale]}
      </p>

      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {essentialDocuments.map((document) => (
          <article
            className="flex min-h-44 flex-col justify-between rounded-md border border-slate-200 bg-slate-50 p-4"
            key={document.id}
          >
            <div>
              <div className="mb-3 flex items-center justify-between gap-3">
                <span className="inline-flex items-center gap-2 rounded-md bg-white px-2 py-1 text-xs font-medium text-[#111b2e]">
                  <ShieldCheck className="size-3.5 text-[#9b7a2d]" />
                  {documentBadge(document)}
                </span>
                <span className="font-mono text-xs uppercase text-slate-500">
                  {document.language}
                </span>
              </div>
              <h3 className="text-sm font-semibold text-slate-950">
                {document.title}
              </h3>
              <p className="mt-2 text-sm leading-5 text-slate-600">
                {document.analysis ?? document.description}
              </p>
            </div>
            <div className="mt-4 flex gap-2">
              <a
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#111b2e] bg-white px-3 py-2 text-sm font-medium text-[#111b2e] hover:bg-[#111b2e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                href={`/api/document/${document.id}?mode=view`}
                target="_blank"
              >
                <Eye className="size-4" />
                {locale === "fr" ? "Consulter" : "Consultar"}
              </a>
              <a
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#111b2e] bg-[#111b2e] px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#111b2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                href={`/api/document/${document.id}?mode=download`}
              >
                <Download className="size-4" />
                {locale === "fr" ? "Télécharger" : "Baixar"}
              </a>
            </div>
          </article>
        ))}
      </div>
    </Panel>
  );
}
