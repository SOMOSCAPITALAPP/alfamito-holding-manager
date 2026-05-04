"use client";

import {
  Download,
  Eye,
  FileCheck2,
  Handshake,
  Mail,
  Phone,
  ReceiptText,
  Smartphone,
} from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { formatCurrency, sortDocuments } from "@/components/document-utils";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type { CentralisMail, CompanyDocument } from "@/lib/types";

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
  contacts: Array<{
    name: string;
    role: string;
    email: string;
    phone: string;
    mobile: string;
    primary: boolean;
    notes: string;
  }>;
  negotiationPoints: string[];
};

export function FiduciaryView({
  documents,
  fiduciary,
  mails,
}: {
  documents: CompanyDocument[];
  fiduciary: FiduciaryData;
  mails: CentralisMail[];
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
        <SectionTitle title="Contacts Centralis" eyebrow="Main contacts" />
        <div className="grid gap-3 md:grid-cols-2">
          {fiduciary.contacts.map((contact) => (
            <article
              className="rounded-md border border-slate-200 bg-slate-50 p-4"
              key={contact.email}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{contact.name}</p>
                  <p className="mt-1 text-sm text-slate-600">{contact.role}</p>
                </div>
                {contact.primary ? (
                  <span className="rounded-md bg-[#111b2e] px-2 py-1 text-xs font-medium text-white">
                    Principal
                  </span>
                ) : null}
              </div>
              <div className="mt-4 space-y-2 text-sm">
                <a
                  className="flex items-center gap-2 rounded-md border border-[#111b2e] bg-white px-3 py-2 font-medium text-[#111b2e] hover:bg-[#111b2e] hover:text-white active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                  href={`mailto:${contact.email}`}
                >
                  <Mail className="size-4" />
                  {contact.email}
                </a>
                <p className="flex items-center gap-2 text-slate-700">
                  <Phone className="size-4 text-[#9b7a2d]" />
                  {contact.phone}
                </p>
                <p className="flex items-center gap-2 text-slate-700">
                  <Smartphone className="size-4 text-[#9b7a2d]" />
                  {contact.mobile}
                </p>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-600">
                {contact.notes}
              </p>
            </article>
          ))}
        </div>
      </Panel>

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
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#111b2e] bg-white px-3 py-2 text-sm font-medium text-[#111b2e] hover:bg-[#111b2e] hover:text-white active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                    href={`/api/document/${document.id}?mode=view`}
                    target="_blank"
                  >
                    <Eye className="size-4" />
                    {t("view")}
                  </a>
                  <a
                    className="inline-flex flex-1 items-center justify-center gap-2 rounded-md border border-[#111b2e] bg-[#111b2e] px-3 py-2 text-sm font-medium text-white hover:bg-white hover:text-[#111b2e] active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
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

      <Panel>
        <SectionTitle title="Derniers mails Centralis" eyebrow="Inbox follow-up" />
        <div className="grid gap-3">
          {mails.map((mail) => (
            <article
              className="rounded-md border border-slate-200 bg-slate-50 p-4"
              key={mail.id}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-slate-950">{mail.subject}</p>
                  <p className="mt-1 text-sm text-slate-500">
                    {mail.from} · {mail.date}
                  </p>
                </div>
                <span className="rounded-md border border-[#111b2e] bg-white px-2 py-1 font-mono text-xs uppercase text-[#111b2e]">
                  {mail.deadline}
                </span>
              </div>
              <p className="mt-3 text-sm leading-6 text-slate-700">{mail.summary}</p>
              <p className="mt-2 rounded-md border border-[#c9a24a]/40 bg-[#c9a24a]/10 px-3 py-2 text-sm font-medium text-[#5d4611]">
                {mail.nextAction}
              </p>
            </article>
          ))}
        </div>
      </Panel>
    </div>
  );
}
