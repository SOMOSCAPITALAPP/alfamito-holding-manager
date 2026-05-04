"use client";

import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  FileText,
} from "lucide-react";
import { EssentialDocuments } from "@/components/EssentialDocuments";
import { FinancialSchedule } from "@/components/FinancialSchedule";
import { useI18n } from "@/components/I18nProvider";
import { formatCurrency } from "@/components/document-utils";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type {
  Company,
  CompanyDocument,
  DocumentAudit,
  FinancialScheduleItem,
} from "@/lib/types";

const alertRows = [
  { key: "annualAccounts", date: "30/06/2026", tone: "Juridique" },
  { key: "taxReturns", date: "31/12/2026", tone: "Fiscal" },
  { key: "partnerDecisions", date: "30/06/2026", tone: "Corporate" },
];

export function DashboardView({
  audit,
  company,
  documents,
  schedule,
}: {
  audit: DocumentAudit;
  company: Company;
  documents: CompanyDocument[];
  schedule: FinancialScheduleItem[];
}) {
  const { locale, t } = useI18n();
  const latestDocuments = [...documents]
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 3);
  const nextCashNeed = schedule
    .filter((item) => item.amount > 0 && item.status !== "paid")
    .reduce((sum, item) => sum + item.amount, 0);

  const governanceRows = [
    {
      label: locale === "fr" ? "RCS/RBE disponibles" : "RCS/RBE disponíveis",
      date: "2024",
      tone: company.governanceStatus[locale],
      ok: true,
    },
    {
      label: locale === "fr" ? "Comptes validés" : "Contas validadas",
      date: "2023",
      tone: company.latestFiledAccounts[locale],
      ok: true,
    },
    ...alertRows.map((alert) => ({
      label: t(alert.key),
      date: alert.date,
      tone: alert.tone,
      ok: false,
    })),
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-lg bg-[#111b2e] p-6 text-white shadow-sm">
        <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#d7b65e]">
          {t("dashboard")}
        </p>
        <h2 className="mt-2 text-3xl font-semibold">{company.name}</h2>
        <p className="mt-2 max-w-3xl text-slate-300">
          {company.legalForm[locale]} · {t("rcs")} {company.rcs} ·{" "}
          {company.shareCapital}
        </p>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Metric label={t("manager")} value={company.manager} />
        <Metric label={t("rcs")} value={company.rcs} />
        <Metric label={t("shareCapital")} value={company.shareCapital} />
        <Metric
          label={locale === "fr" ? "Provisions à venir" : "Provisões futuras"}
          value={formatCurrency(nextCashNeed)}
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <Panel>
          <SectionTitle title={t("companyIdentity")} />
          <dl className="grid gap-4 md:grid-cols-2">
            {[
              [t("registeredOffice"), company.registeredOffice],
              ["Tax number", company.taxNumber],
              [t("purpose"), company.corporatePurpose[locale]],
              ["NACE", company.nace],
            ].map(([label, value]) => (
              <div key={label} className="rounded-md bg-slate-50 p-4">
                <dt className="text-sm text-slate-500">{label}</dt>
                <dd className="mt-1 font-medium text-slate-950">{value}</dd>
              </div>
            ))}
          </dl>
        </Panel>

        <Panel>
          <SectionTitle
            title={
              locale === "fr" ? "Tenue de société" : "Organização societária"
            }
          />
          <div className="space-y-3">
            {governanceRows.map((alert) => (
              <div
                className="flex items-center gap-3 rounded-md border border-slate-200 p-3"
                key={`${alert.label}-${alert.date}`}
              >
                <div className="flex size-9 shrink-0 items-center justify-center rounded-md bg-[#c9a24a]/15 text-[#9b7a2d]">
                  {alert.ok ? (
                    <CheckCircle2 className="size-4" aria-hidden />
                  ) : (
                    <AlertTriangle className="size-4" aria-hidden />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-slate-950">{alert.label}</p>
                  <p className="text-sm text-slate-500">{alert.tone}</p>
                </div>
                <span className="font-mono text-sm text-slate-600">
                  {alert.date}
                </span>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <EssentialDocuments audit={audit} documents={documents} />

      <FinancialSchedule items={schedule.slice(0, 7)} />

      <Panel>
        <SectionTitle title={t("latestDocuments")} />
        <div className="grid gap-3 md:grid-cols-3">
          {latestDocuments.map((document) => (
            <a
              className="rounded-md border border-slate-200 p-4 hover:border-[#c9a24a]"
              href={`/api/document/${document.id}?mode=view`}
              key={document.id}
              target="_blank"
            >
              <FileText className="mb-3 size-5 text-[#9b7a2d]" aria-hidden />
              <p className="font-medium text-slate-950">{document.title}</p>
              <p className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                <CalendarClock className="size-4" aria-hidden />
                {document.date}
              </p>
            </a>
          ))}
        </div>
      </Panel>
    </div>
  );
}
