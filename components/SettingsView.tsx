"use client";

import { useI18n } from "@/components/I18nProvider";
import { Panel, SectionTitle } from "@/components/ui";
import type { User } from "@/lib/types";

export function SettingsView({ users }: { users: User[] }) {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <Panel>
        <SectionTitle title={t("settings")} eyebrow="Access" />
        <p className="text-slate-600">
          {t("authorizedAccess")}. {t("futureDropbox")}.
        </p>
      </Panel>

      <Panel>
        <SectionTitle title={t("users")} />
        <div className="overflow-hidden rounded-lg border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-xs uppercase text-slate-500">
              <tr>
                <th className="px-4 py-3">Nom</th>
                <th className="px-4 py-3">{t("email")}</th>
                <th className="px-4 py-3">{t("role")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {users.map((user) => (
                <tr key={user.email}>
                  <td className="px-4 py-3 font-medium">{user.name}</td>
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {user.email}
                  </td>
                  <td className="px-4 py-3 uppercase">{user.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </div>
  );
}
