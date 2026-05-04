"use client";

import { Landmark, TrendingUp, WalletCards } from "lucide-react";
import { FinancialSchedule } from "@/components/FinancialSchedule";
import { useI18n } from "@/components/I18nProvider";
import { formatCurrency, sortDocuments } from "@/components/document-utils";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type { Company, CompanyDocument, FinancialScheduleItem } from "@/lib/types";

export function FinanceView({
  company,
  documents,
  schedule,
}: {
  company: Company;
  documents: CompanyDocument[];
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
              className="rounded-md border border-[#111b2e]/40 bg-white p-4 text-[#111b2e] hover:border-[#111b2e] hover:bg-[#111b2e] hover:text-white"
              href={`/api/document/${document.id}?mode=view`}
              key={document.id}
              target="_blank"
            >
              <p className="font-medium text-slate-950">{document.title}</p>
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
