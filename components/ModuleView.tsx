"use client";

import { Download, FileText } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { Metric, Panel, SectionTitle } from "@/components/ui";
import type { CompanyDocument, Locale } from "@/lib/types";

type Item = {
  labelKey: string;
  value: string | Record<Locale, string>;
};

export function ModuleView({
  titleKey,
  eyebrow,
  summary,
  metrics,
  documents,
}: {
  titleKey: string;
  eyebrow: string;
  summary: string | Record<Locale, string>;
  metrics: Item[];
  documents?: CompanyDocument[];
}) {
  const { locale, t } = useI18n();

  function localized(value: string | Record<Locale, string>) {
    return typeof value === "string" ? value : value[locale];
  }

  return (
    <div className="space-y-6">
      <Panel>
        <SectionTitle title={t(titleKey)} eyebrow={eyebrow} />
        <p className="max-w-4xl text-slate-600">{localized(summary)}</p>
      </Panel>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {metrics.map((metric) => (
          <Metric
            key={metric.labelKey}
            label={t(metric.labelKey)}
            value={localized(metric.value)}
          />
        ))}
      </div>

      {documents ? (
        <Panel>
          <SectionTitle title={t("documents")} />
          <div className="grid gap-3 md:grid-cols-2">
            {documents.map((document) => (
              <a
                className="flex items-center justify-between gap-4 rounded-md border border-slate-200 p-4 hover:border-[#c9a24a]"
                href={`/api/document/${document.id}?mode=download`}
                key={document.id}
              >
                <span className="flex min-w-0 items-center gap-3">
                  <FileText className="size-4 shrink-0 text-[#9b7a2d]" />
                  <span className="min-w-0">
                    <span className="block truncate font-medium">
                      {document.title}
                    </span>
                    <span className="block font-mono text-sm text-slate-500">
                      {document.date}
                    </span>
                  </span>
                </span>
                <Download className="size-4 shrink-0 text-slate-500" />
              </a>
            ))}
          </div>
        </Panel>
      ) : null}
    </div>
  );
}
