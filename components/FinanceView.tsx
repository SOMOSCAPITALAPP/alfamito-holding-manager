"use client";

import {
  ArrowDownRight,
  ArrowUpRight,
  Landmark,
  TrendingUp,
  WalletCards,
} from "lucide-react";
import { FinancialSchedule } from "@/components/FinancialSchedule";
import { useI18n } from "@/components/I18nProvider";
import { formatCurrency, sortDocuments } from "@/components/document-utils";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type {
  Company,
  CompanyDocument,
  FinancialAnalysis,
  FinancialAnalysisLine,
  FinancialScheduleItem,
} from "@/lib/types";

export function FinanceView({
  company,
  documents,
  financialAnalysis,
  schedule,
}: {
  company: Company;
  documents: CompanyDocument[];
  financialAnalysis: FinancialAnalysis;
  schedule: FinancialScheduleItem[];
}) {
  const { locale, t } = useI18n();
  const totalBudget = schedule
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);
  const fiduciaryBudget = schedule
    .filter((item) => item.category === "fiduciary")
    .reduce((sum, item) => sum + item.amount, 0);
  const taxBudget = schedule
    .filter((item) => item.category === "tax")
    .reduce((sum, item) => sum + item.amount, 0);
  const focusDocuments = sortDocuments(documents).slice(0, 8);
  const sourceDocument = documents.find(
    (document) => document.id === financialAnalysis.sourceDocumentId,
  );

  function variation(line: FinancialAnalysisLine) {
    return line.amount - line.previousAmount;
  }

  function AnalysisCard({ line }: { line: FinancialAnalysisLine }) {
    const delta = variation(line);
    const improving = delta >= 0;
    const Icon = improving ? ArrowUpRight : ArrowDownRight;

    return (
      <article className="rounded-md border border-slate-200 bg-white p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-sm font-medium text-slate-500">
              {line.label[locale]}
            </p>
            <p className="mt-1 text-lg font-semibold text-[#111b2e]">
              {formatCurrency(line.amount)}
            </p>
          </div>
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-1 text-xs font-semibold ${
              improving
                ? "bg-emerald-50 text-emerald-800"
                : "bg-amber-50 text-amber-800"
            }`}
          >
            <Icon className="size-3.5" aria-hidden />
            {formatCurrency(delta)}
          </span>
        </div>
        <p className="mt-3 text-sm leading-6 text-slate-600">
          {line.note[locale]}
        </p>
        <p className="mt-2 text-xs text-slate-400">
          {locale === "fr" ? "2023 : " : "2023: "}
          {formatCurrency(line.previousAmount)}
        </p>
      </article>
    );
  }

  return (
    <div className="space-y-6">
      <Panel>
        <SectionTitle title={t("finance")} eyebrow="Capital & cash" />
        <p className="max-w-4xl text-slate-600">
          {locale === "fr"
            ? "Vue de rassurance pour Vincent : capital, compte Wise, comptes courants, paiements ACD/YLP, prêt ACT GROUP et provisions à venir sont regroupés dans un calendrier chiffré."
            : "Visão de segurança para Vincent: capital, conta Wise, contas correntes, pagamentos ACD/YLP, empréstimo ACT GROUP e provisões futuras reunidos em um calendário quantificado."}
        </p>
      </Panel>

      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-4">
          <SectionTitle
            title={
              locale === "fr"
                ? "Analyse rapide bilan et compte de résultat"
                : "Análise rápida do balanço e resultado"
            }
            eyebrow={`Comptes ${financialAnalysis.period}`}
          />
          {sourceDocument ? (
            <a
              className="inline-flex items-center justify-center rounded-md border border-[#111b2e] bg-white px-3 py-2 text-sm font-semibold text-[#111b2e] hover:bg-[#111b2e] hover:text-white active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
              href={`/api/document/${sourceDocument.id}?mode=view`}
              target="_blank"
            >
              {locale === "fr" ? "Voir les comptes 2024" : "Ver contas 2024"}
            </a>
          ) : null}
        </div>
        <p className="max-w-5xl text-sm leading-6 text-slate-700">
          {financialAnalysis.summary[locale]}
        </p>

        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <div className="rounded-lg border border-[#111b2e]/15 bg-slate-50 p-4 lg:col-span-2">
            <SectionTitle
              title={locale === "fr" ? "Grandes masses du bilan" : "Grandes massas do balanço"}
            />
            <div className="grid gap-3 md:grid-cols-2">
              {[
                ...financialAnalysis.balanceSheet.assets,
                ...financialAnalysis.balanceSheet.liabilities,
              ].map((line) => (
                <AnalysisCard line={line} key={line.label.fr} />
              ))}
            </div>
          </div>

          <div className="rounded-lg border border-[#111b2e]/15 bg-slate-50 p-4">
            <SectionTitle
              title={
                locale === "fr"
                  ? "Compte de résultat"
                  : "Demonstração de resultado"
              }
            />
            <div className="space-y-3">
              {financialAnalysis.profitAndLoss.map((line) => (
                <AnalysisCard line={line} key={line.label.fr} />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-5 rounded-lg border border-[#c9a24a]/40 bg-[#fff9e8] p-4">
          <h3 className="font-semibold text-[#111b2e]">
            {locale === "fr" ? "Points à surveiller" : "Pontos a acompanhar"}
          </h3>
          <div className="mt-3 grid gap-2 md:grid-cols-2">
            {financialAnalysis.watchPoints.map((point) => (
              <p
                className="rounded-md border border-[#c9a24a]/30 bg-white px-3 py-2 text-sm leading-6 text-slate-700"
                key={point.fr}
              >
                {point[locale]}
              </p>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label={t("shareCapital")} value={company.shareCapital} />
        <Metric
          label={locale === "fr" ? "Budget suivi 2026" : "Orçamento acompanhado 2026"}
          value={formatCurrency(totalBudget)}
        />
        <Metric
          label={locale === "fr" ? "YLP/Centralis prévu" : "YLP/Centralis previsto"}
          value={formatCurrency(fiduciaryBudget)}
        />
        <Metric
          label={locale === "fr" ? "Fiscalité prévue" : "Fiscal previsto"}
          value={formatCurrency(taxBudget)}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {[
          {
            icon: WalletCards,
            title: "Wise",
            text:
              locale === "fr"
                ? "Relevés 2024/2025 et IBAN Alfamito disponibles."
                : "Extratos 2024/2025 e IBAN Alfamito disponíveis.",
          },
          {
            icon: Landmark,
            title: "ACD",
            text:
              locale === "fr"
                ? "Paiements identifiés en 2025 : 133,75 EUR, 785 EUR, 395,25 EUR."
                : "Pagamentos identificados em 2025: 133,75 EUR, 785 EUR, 395,25 EUR.",
          },
          {
            icon: TrendingUp,
            title: "ACT GROUP / AGAPE",
            text:
              locale === "fr"
                ? "Flux documentés : prêt ACT GROUP 150 000 EUR, apport AGAPE 160 980 EUR, intérêts."
                : "Fluxos documentados: empréstimo ACT GROUP 150.000 EUR, aporte AGAPE 160.980 EUR, juros.",
          },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <article
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              key={item.title}
            >
              <Icon className="mb-3 size-5 text-[#9b7a2d]" />
              <h3 className="font-semibold text-[#111b2e]">{item.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
            </article>
          );
        })}
      </div>

      <FinancialSchedule items={schedule} />

      <Panel>
        <SectionTitle
          title={locale === "fr" ? "Pièces financières à consulter" : "Documentos financeiros"}
        />
        <div className="grid gap-3 md:grid-cols-2">
          {focusDocuments.map((document) => (
            <a
              className="rounded-md border border-[#111b2e]/40 bg-white p-4 text-[#111b2e] hover:border-[#111b2e] hover:bg-[#111b2e] hover:text-white active:border-[#111b2e] active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
              href={`/api/document/${document.id}?mode=view`}
              key={document.id}
              target="_blank"
            >
              <p className="font-medium text-inherit">{document.title}</p>
              <p className="mt-2 text-sm leading-5 text-inherit opacity-85">
                {document.analysis ?? document.description}
              </p>
            </a>
          ))}
        </div>
      </Panel>
    </div>
  );
}
