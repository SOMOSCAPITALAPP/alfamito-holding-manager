"use client";

import {
  BadgeEuro,
  FileText,
  Percent,
  ShieldCheck,
} from "lucide-react";
import { FinancialSchedule } from "@/components/FinancialSchedule";
import { useI18n } from "@/components/I18nProvider";
import { sortDocuments } from "@/components/document-utils";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type {
  Company,
  CompanyDocument,
  FinancialScheduleItem,
  Locale,
} from "@/lib/types";

type LocalizedText = Record<Locale, string>;

type TaxRate = {
  id: string;
  label: LocalizedText;
  value: string;
  detail: LocalizedText;
  source: string;
};

type TaxProfile = {
  lastReviewDate: string;
  disclaimer: LocalizedText;
  rates: TaxRate[];
  participationExemption: {
    title: LocalizedText;
    items: { label: LocalizedText; text: LocalizedText }[];
  };
  alfamitoFocus: { label: LocalizedText; value: LocalizedText }[];
  opportunities: LocalizedText[];
};

export function TaxView({
  company,
  documents,
  schedule,
  taxProfile,
}: {
  company: Company;
  documents: CompanyDocument[];
  schedule: FinancialScheduleItem[];
  taxProfile: TaxProfile;
}) {
  const { locale, t } = useI18n();
  const taxDocuments = sortDocuments(documents);
  const taxSchedule = schedule.filter((item) =>
    ["tax", "corporate"].includes(item.category),
  );
  const sourceSummary = Array.from(
    new Set(taxProfile.rates.map((rate) => rate.source)),
  ).join(" | ");

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <SectionTitle title={t("tax")} eyebrow="SOPARFI tax memo" />
            <p className="max-w-4xl text-slate-700">
              {locale === "fr"
                ? "Synthèse opérationnelle pour Vincent : pourquoi la SOPARFI est fiscalement utile, quels taux surveiller, et quelles actions Centralis/YLP doivent confirmer pour Alfamito."
                : "Sintese operacional para Vincent: por que a SOPARFI e fiscalmente util, quais taxas acompanhar e quais acoes Centralis/YLP devem confirmar para Alfamito."}
            </p>
          </div>
          <div className="rounded-md border border-[#c9a24a]/60 bg-[#fff9e8] px-4 py-3 text-sm text-[#4a3510]">
            <p className="font-semibold">
              {locale === "fr" ? "Revue" : "Revisão"} {taxProfile.lastReviewDate}
            </p>
            <p className="mt-1 max-w-sm leading-5">
              {taxProfile.disclaimer[locale]}
            </p>
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric
          label={locale === "fr" ? "Statut fiscal" : "Situação fiscal"}
          value={company.taxStatus[locale]}
        />
        <Metric label="NACE" value={company.nace} />
        <Metric label={locale === "fr" ? "Numéro fiscal" : "Número fiscal"} value={company.taxNumber} />
        <Metric
          label={locale === "fr" ? "Siège fiscal" : "Sede fiscal"}
          value={company.registeredOffice}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {taxProfile.rates.map((rate, index) => {
          const Icon = index % 2 === 0 ? Percent : BadgeEuro;
          return (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={rate.id}
            >
              <div className="flex items-start gap-3">
                <span className="rounded-md bg-[#111b2e] p-2 text-white">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {rate.label[locale]}
                  </p>
                  <h3 className="mt-1 text-2xl font-semibold text-[#111b2e]">
                    {rate.value}
                  </h3>
                </div>
              </div>
              <p className="mt-4 text-sm leading-6 text-slate-700">
                {rate.detail[locale]}
              </p>
              <p className="mt-4 text-xs font-medium text-slate-500">
                {rate.source}
              </p>
            </article>
          );
        })}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.15fr_0.85fr]">
        <Panel>
          <SectionTitle
            title={taxProfile.participationExemption.title[locale]}
            eyebrow="Participation exemption"
          />
          <div className="grid gap-3">
            {taxProfile.participationExemption.items.map((item) => (
              <div
                className="rounded-md border border-slate-200 bg-slate-50 p-4"
                key={item.label.fr}
              >
                <div className="flex items-center gap-2 font-semibold text-[#111b2e]">
                  <ShieldCheck className="size-4 text-[#9b7a2d]" aria-hidden />
                  {item.label[locale]}
                </div>
                <p className="mt-2 text-sm leading-6 text-slate-700">
                  {item.text[locale]}
                </p>
              </div>
            ))}
          </div>
        </Panel>

        <Panel>
          <SectionTitle
            title={
              locale === "fr"
                ? "Alfamito en particulier"
                : "Alfamito em particular"
            }
            eyebrow="Company focus"
          />
          <div className="space-y-3">
            {taxProfile.alfamitoFocus.map((item) => (
              <div
                className="rounded-md border border-slate-200 p-4"
                key={item.label.fr}
              >
                <p className="text-sm font-semibold text-[#111b2e]">
                  {item.label[locale]}
                </p>
                <p className="mt-1 text-sm leading-6 text-slate-700">
                  {item.value[locale]}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <Panel>
        <SectionTitle
          title={
            locale === "fr"
              ? "Possibilités et points d'attention"
              : "Possibilidades e pontos de atenção"
          }
          eyebrow="Tax planning"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {taxProfile.opportunities.map((item) => (
            <div
              className="rounded-md border border-[#111b2e]/15 bg-white p-4 text-sm leading-6 text-slate-700"
              key={item.fr}
            >
              {item[locale]}
            </div>
          ))}
        </div>
      </Panel>

      <FinancialSchedule items={taxSchedule} />

      <Panel>
        <SectionTitle
          title={
            locale === "fr"
              ? "Documents fiscaux en première ligne"
              : "Documentos fiscais prioritarios"
          }
          eyebrow="Tax documents"
        />
        <div className="grid gap-3 md:grid-cols-2">
          {taxDocuments.map((document) => (
            <div
              className="rounded-md border border-slate-200 bg-white p-4"
              key={document.id}
            >
              <div className="flex gap-3">
                <FileText
                  className="mt-1 size-4 shrink-0 text-[#9b7a2d]"
                  aria-hidden
                />
                <div>
                  <p className="font-medium text-slate-950">{document.title}</p>
                  <p className="mt-1 text-sm leading-5 text-slate-600">
                    {document.analysis ?? document.description}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-[#111b2e] bg-white px-3 py-2 text-sm font-semibold text-[#111b2e] hover:bg-[#111b2e] hover:text-white active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                  href={`/api/document/${document.id}?mode=view`}
                  target="_blank"
                >
                  {t("view")}
                </a>
                <a
                  className="inline-flex items-center gap-2 rounded-md border border-[#111b2e] bg-[#111b2e] px-3 py-2 text-sm font-semibold text-white hover:bg-white hover:text-[#111b2e] active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                  href={`/api/document/${document.id}?mode=download`}
                >
                  {t("download")}
                </a>
              </div>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-500">
          {locale === "fr" ? "Sources du memo : " : "Fontes do memo: "}
          {sourceSummary}
        </p>
      </Panel>
    </div>
  );
}
