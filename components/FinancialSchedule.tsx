"use client";

import { CalendarClock, CheckCircle2, CircleAlert } from "lucide-react";
import { useI18n } from "@/components/I18nProvider";
import { formatCurrency } from "@/components/document-utils";
import { Panel, SectionTitle } from "@/components/ui";
import type { FinancialScheduleItem } from "@/lib/types";

export function FinancialSchedule({
  items,
}: {
  items: FinancialScheduleItem[];
}) {
  const { locale } = useI18n();
  const payableItems = items.filter((item) => item.amount > 0);
  const totalUpcoming = payableItems
    .filter((item) => item.status !== "paid")
    .reduce((sum, item) => sum + item.amount, 0);

  return (
    <Panel>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <SectionTitle
          title={locale === "fr" ? "Échéances financières" : "Prazos financeiros"}
          eyebrow="Cash calendar"
        />
        <div className="rounded-md bg-[#111b2e] px-4 py-3 text-right text-white">
          <p className="text-xs text-slate-300">
            {locale === "fr" ? "À provisionner" : "A provisionar"}
          </p>
          <p className="text-xl font-semibold">{formatCurrency(totalUpcoming)}</p>
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
        <table className="w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase text-slate-500">
            <tr>
              <th className="px-4 py-3">{locale === "fr" ? "Échéance" : "Prazo"}</th>
              <th className="px-4 py-3">{locale === "fr" ? "Poste" : "Item"}</th>
              <th className="px-4 py-3">{locale === "fr" ? "Bénéficiaire" : "Beneficiário"}</th>
              <th className="px-4 py-3 text-right">{locale === "fr" ? "Montant" : "Valor"}</th>
              <th className="px-4 py-3">{locale === "fr" ? "Statut" : "Status"}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {items.map((item) => (
              <tr key={item.id}>
                <td className="whitespace-nowrap px-4 py-3 font-mono text-slate-700">
                  {item.dueDate}
                </td>
                <td className="px-4 py-3">
                  <p className="font-medium text-slate-950">{item.label}</p>
                  <p className="mt-1 text-xs text-slate-500">{item.note}</p>
                </td>
                <td className="px-4 py-3 text-slate-600">{item.beneficiary}</td>
                <td className="px-4 py-3 text-right font-semibold">
                  {item.amount > 0 ? formatCurrency(item.amount) : "-"}
                </td>
                <td className="px-4 py-3">
                  <span className="inline-flex items-center gap-2 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium">
                    {item.status === "paid" ? (
                      <CheckCircle2 className="size-3.5 text-emerald-600" />
                    ) : item.status === "to_confirm" ? (
                      <CircleAlert className="size-3.5 text-amber-600" />
                    ) : (
                      <CalendarClock className="size-3.5 text-[#9b7a2d]" />
                    )}
                    {item.status === "to_confirm"
                      ? locale === "fr"
                        ? "À confirmer"
                        : "A confirmar"
                      : item.status === "paid"
                        ? locale === "fr"
                          ? "Payé"
                          : "Pago"
                        : locale === "fr"
                          ? "À venir"
                          : "Próximo"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Panel>
  );
}
