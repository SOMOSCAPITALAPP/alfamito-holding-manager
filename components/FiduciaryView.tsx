"use client";

import { Download, Eye, FileCheck2, Handshake, ReceiptText } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { formatCurrency, sortDocuments } from "@/components/document-utils";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type { CompanyDocument } from "@/lib/types";

export type FiduciaryData = {
  name: string;
  status: Record<"fr" | "pt", string>;
  summary: Record<"fr" | "pt", string>;
  serviceDocumentIds: string[];
  costs: Array<{
    label: string;
    amount: number;
    currency: "EUR";
    recurrence: string;
    sourceDocumentId: string;
    negotiation: string;
  }>;
  negotiationPoints: string[];
};

export function FiduciaryView({
  documents,
  fiduciary,
}: {
  documents: CompanyDocument[];
  fiduciary: FiduciaryData;
}) {
  const { locale, t } = useI18n();
  const serviceDocuments = sortDocuments(
    documents.filter((document) =>
      fiduciary.serviceDocumentIds.includes(document.id),
    ),
  );
  const yearlyCost = fiduciary.costs.reduce((sum, cost) => sum + cost.amount, 0);

  return (
    <div className="space-y-6">
      <Panel>
        <SectionTitle title={t("fiduciary")} eyebrow={fiduciary.name} />
        <p className="max-w-4xl text-slate-600">{fiduciary.summary[locale]}</p>
      </Panel>

      <div className="grid gap-4 md:grid-cols-3">
        <Metric label="Prestataire" value={fiduciary.name} />
        <Metric label="Budget annuel suivi" value={formatCurrency(yearlyCost)} />
        <Metric
          label={locale === "fr" ? "Statut" : "Status"}
          value={fiduciary.status[locale]}
        />
      </div>

      <Panel>
        <SectionTitle
          title={locale === "fr" ? "Contrat, coûts et livrables" : "Contrato, custos e entregas"}
        />
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Poste</th>
                <th className="px-4 py-3">Récurrence</th>
                <th className="px-4 py-3 text-right">Montant</th>
                <th className="px-4 py-3">Négociation / contrôle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {fiduciary.costs.map((cost) => (
                <tr key={cost.label}>
                  <td className="px-4 py-3 font-medium text-slate-950">
                    {cost.label}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{cost.recurrence}</td>
                  <td className="px-4 py-3 text-right font-semibold">
                    {formatCurrency(cost.amount)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">{cost.negotiation}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <Panel>
          <SectionTitle title="Points de négociation" />
          <div className="space-y-3">
            {fiduciary.negotiationPoints.map((point) => (
              <div className="flex gap-3 rounded-md border border-slate-200 p-3" key={point}>
                <Handshake className="mt-0.5 size-4 shrink-0 text-[#9b7a2d]" />
                <p className="text-sm leading-6 text-slate-700">{point}</p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle title="Documents Centralis / YLP" />
          <div className="grid gap-3">
            {serviceDocuments.map((document) => (
              <article
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
                key={document.id}
              >
                <div className="flex items-start gap-3">
                  {document.category === "accounting" ? (
                    <ReceiptText className="mt-1 size-4 text-[#9b7a2d]" />
                  ) : (
                    <FileCheck2 className="mt-1 size-4 text-[#9b7a2d]" />
                  )}
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-slate-950">{document.title}</p>
                    <p className="mt-1 text-sm text-slate-600">
                      {document.analysis ?? document.description}
                    </p>
                  </div>
                </div>
                <div className="mt-4 flex gap-2">
                  <a
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#111b2e] bg-white px-3 py-2 text-sm font-medium text-[#111b2e] hover:bg-[#111b2e] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                    href={`/api/document/${document.id}?mode=view`}
                    target="_blank"
                  >
                    <Eye className="size-4" />
                    {t("view")}
                  </a>
                  <a
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#111b2e] bg-[#111b2e] px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#111b2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                    href={`/api/document/${document.id}?mode=download`}
                  >
                    <Download className="size-4" />
                    {t("download")}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
