import { AppShell } from "@/components/AppShell";
import { requireUser } from "@/lib/auth";
import translations from "@/data/translations.json";
import type { Translations } from "@/lib/types";

export default async function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await requireUser();

  return (
    <AppShell translations={translations as Translations} user={user}>
      {children}
    </AppShell>
  );
}
