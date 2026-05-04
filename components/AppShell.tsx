"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Banknote,
  BookOpenText,
  BriefcaseBusiness,
  Building2,
  FileText,
  Gavel,
  HandCoins,
  LayoutDashboard,
  LogOut,
  Settings,
} from "lucide-react";
import { logoutAction } from "@/app/actions";
import { I18nProvider, useI18n } from "@/components/I18nProvider";
import type { Translations, User } from "@/lib/types";

const navItems = [
  { href: "/dashboard", label: "dashboard", icon: LayoutDashboard },
  { href: "/documents", label: "documents", icon: FileText },
  { href: "/legal", label: "legal", icon: Gavel },
  { href: "/fiduciary", label: "fiduciary", icon: HandCoins },
  { href: "/tax", label: "tax", icon: BriefcaseBusiness },
  { href: "/accounting", label: "accounting", icon: BookOpenText },
  { href: "/finance", label: "finance", icon: Banknote },
  { href: "/settings", label: "settings", icon: Settings },
];

function ShellContent({
  children,
  user,
}: React.PropsWithChildren<{ user: Omit<User, "password"> }>) {
  const pathname = usePathname();
  const { locale, setLocale, t } = useI18n();

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-950">
      <aside className="fixed inset-y-0 left-0 hidden w-72 border-r border-slate-800 bg-[#111b2e] text-white lg:block">
        <div className="flex h-20 items-center gap-3 border-b border-white/10 px-6">
          <div className="flex size-10 items-center justify-center rounded-md border border-[#c9a24a]/50 bg-[#c9a24a]/15">
            <Building2 className="size-5 text-[#d7b65e]" aria-hidden />
          </div>
          <div>
            <p className="text-sm text-slate-300">Alfamito Sàrl</p>
            <p className="font-semibold">{t("appName")}</p>
          </div>
        </div>
        <nav className="space-y-1 px-3 py-5" aria-label="Navigation principale">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                className={`flex items-center gap-3 rounded-md px-3 py-2.5 text-sm transition ${
                  active
                    ? "bg-white text-[#111b2e]"
                    : "border border-transparent text-slate-200 hover:border-white hover:bg-white hover:text-[#111b2e] active:border-white active:bg-white active:text-[#111b2e]"
                }`}
                href={item.href}
                key={item.href}
              >
                <Icon className="size-4" aria-hidden />
                <span>{t(item.label)}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur md:px-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-[#9b7a2d]">
                Alfamito Sàrl
              </p>
              <h1 className="text-xl font-semibold text-[#111b2e]">
                {t("appName")}
              </h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex rounded-md border border-slate-200 bg-slate-50 p-1">
                <button
                  className={`rounded px-3 py-1.5 text-sm ${
                    locale === "fr"
                      ? "bg-[#111b2e] text-white"
                      : "text-slate-800 hover:bg-white hover:text-[#111b2e] active:bg-[#111b2e] active:text-white"
                  }`}
                  onClick={() => setLocale("fr")}
                  type="button"
                >
                  FR
                </button>
                <button
                  className={`rounded px-3 py-1.5 text-sm ${
                    locale === "pt"
                      ? "bg-[#111b2e] text-white"
                      : "text-slate-800 hover:bg-white hover:text-[#111b2e] active:bg-[#111b2e] active:text-white"
                  }`}
                  onClick={() => setLocale("pt")}
                  type="button"
                >
                  PT-BR
                </button>
              </div>
              <div className="hidden min-w-40 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm md:block">
                <p className="font-medium text-slate-900">{user.name}</p>
                <p className="text-xs uppercase text-slate-500">{user.role}</p>
              </div>
              <form action={logoutAction}>
                <button
                  className="inline-flex size-10 items-center justify-center rounded-md border border-[#111b2e] bg-white text-[#111b2e] hover:bg-[#111b2e] hover:text-white active:bg-[#111b2e] active:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#c9a24a]"
                  title={t("logout")}
                  type="submit"
                >
                  <LogOut className="size-4" aria-hidden />
                </button>
              </form>
            </div>
          </div>
          <nav
            aria-label="Navigation mobile"
            className="mt-4 flex gap-2 overflow-x-auto pb-1 lg:hidden"
          >
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  className={`inline-flex shrink-0 items-center gap-2 rounded-md border px-3 py-2 text-sm ${
                    active
                      ? "border-[#111b2e] bg-[#111b2e] text-white"
                      : "border-[#111b2e] bg-white text-[#111b2e] hover:bg-[#111b2e] hover:text-white active:bg-[#111b2e] active:text-white"
                  }`}
                  href={item.href}
                  key={item.href}
                >
                  <Icon className="size-4" aria-hidden />
                  {t(item.label)}
                </Link>
              );
            })}
          </nav>
        </header>
        <main className="px-4 py-6 md:px-8">{children}</main>
      </div>
    </div>
  );
}

export function AppShell({
  children,
  translations,
  user,
}: React.PropsWithChildren<{
  translations: Translations;
  user: Omit<User, "password">;
}>) {
  return (
    <I18nProvider translations={translations}>
      <ShellContent user={user}>{children}</ShellContent>
    </I18nProvider>
  );
}
