"use client";

import { Download, Eye, FileText } from "lucide-react";
import { useMemo, useState } from "react";
import { useI18n } from "@/components/I18nProvider";
import { Panel, SectionTitle } from "@/components/ui";
import type { CompanyDocument, DocumentCategory } from "@/lib/types";

const categoryKeys: Record<DocumentCategory, string> = {
  legal: "legal",
  tax: "tax",
  accounting: "accounting",
  finance: "finance",
  bank: "bank",
  realEstate: "realEstate",
};

export function DocumentsView({
  documents,
}: {
  documents: CompanyDocument[];
}) {
  const { t } = useI18n();
  const [category, setCategory] = useState<DocumentCategory | "all">("all");

  const filteredDocuments = useMemo(
    () =>
      category === "all"
        ? documents
        : documents.filter((document) => document.category === category),
    [category, documents],
  );

  const categories = Array.from(
    new Set(documents.map((document) => document.category)),
  );

  function labelForCategory(value: DocumentCategory) {
    const key = categoryKeys[value];
    return t(key) === key ? key : t(key);
  }

  return (
    <div className="space-y-6">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <SectionTitle title={t("documents")} eyebrow="Vault" />
          <select
            className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
            onChange={(event) =>
              setCategory(event.target.value as DocumentCategory | "all")
            }
            value={category}
          >
            <option value="all">{t("allCategories")}</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {labelForCategory(item)}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-5 overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full border-collapse bg-white text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">{t("documents")}</th>
                <th className="px-4 py-3">{t("category")}</th>
                <th className="px-4 py-3">{t("date")}</th>
                <th className="px-4 py-3">{t("language")}</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {filteredDocuments.map((document) => (
                <tr key={document.id}>
                  <td className="px-4 py-4">
                    <div className="flex items-start gap-3">
                      <FileText
                        className="mt-1 size-4 text-[#9b7a2d]"
                        aria-hidden
                      />
                      <div>
                        <p className="font-medium text-slate-950">
                          {document.title}
                        </p>
                        <p className="mt-1 text-slate-500">
                          {document.description}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    {labelForCategory(document.category)}
                  </td>
                  <td className="px-4 py-4 font-mono text-slate-600">
                    {document.date}
                  </td>
                  <td className="px-4 py-4 uppercase">{document.language}</td>
                  <td className="px-4 py-4">
                    <div className="flex justify-end gap-2">
                      <a
                        className="inline-flex items-center gap-2 rounded-md border border-slate-300 px-3 py-2 text-sm hover:border-[#c9a24a]"
                        href={`/api/document/${document.id}?mode=view`}
                        target="_blank"
                      >
                        <Eye className="size-4" aria-hidden />
                        {t("view")}
                      </a>
                      <a
                        className="inline-flex items-center gap-2 rounded-md bg-[#111b2e] px-3 py-2 text-sm text-white hover:bg-[#17243b]"
                        href={`/api/document/${document.id}?mode=download`}
                      >
                        <Download className="size-4" aria-hidden />
                        {t("download")}
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
