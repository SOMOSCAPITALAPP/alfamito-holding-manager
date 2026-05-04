import { Building2, LockKeyhole } from "lucide-react";
import { loginAction } from "@/app/actions";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#111b2e] px-4 py-10">
      <section className="w-full max-w-md rounded-lg border border-white/10 bg-white p-8 shadow-2xl">
        <div className="mb-8 flex items-center gap-3">
          <div className="flex size-12 items-center justify-center rounded-md bg-[#111b2e] text-[#d7b65e]">
            <Building2 className="size-6" aria-hidden />
          </div>
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#9b7a2d]">
              Accès privé
            </p>
            <h1 className="text-2xl font-semibold text-[#111b2e]">
              Alfamito Holding Manager
            </h1>
          </div>
        </div>

        <form action={loginAction} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium text-slate-700">E-mail</span>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-[#c9a24a] focus:ring-2 focus:ring-[#c9a24a]/20"
              name="email"
              placeholder="admin@alfamito.local"
              required
              type="email"
            />
          </label>
          <label className="block">
            <span className="text-sm font-medium text-slate-700">
              Mot de passe
            </span>
            <input
              className="mt-1 w-full rounded-md border border-slate-300 px-3 py-2.5 outline-none focus:border-[#c9a24a] focus:ring-2 focus:ring-[#c9a24a]/20"
              name="password"
              placeholder="ChangeMe2026!"
              required
              type="password"
            />
          </label>

          {params.error ? (
            <p className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
              Identifiants invalides ou e-mail non autorisé.
            </p>
          ) : null}

          <button
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-[#111b2e] px-4 py-3 font-semibold text-white hover:bg-[#17243b]"
            type="submit"
          >
            <LockKeyhole className="size-4" aria-hidden />
            Se connecter
          </button>
        </form>

        <p className="mt-6 text-sm text-slate-500">
          Accès réservé aux e-mails déclarés dans{" "}
          <span className="font-mono">data/users.json</span>.
        </p>
      </section>
    </main>
  );
}
