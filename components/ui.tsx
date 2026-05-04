export function Panel({
  children,
  className = "",
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <section
      className={`rounded-lg border border-slate-200 bg-white p-5 shadow-sm ${className}`}
    >
      {children}
    </section>
  );
}

export function SectionTitle({
  title,
  eyebrow,
}: {
  title: string;
  eyebrow?: string;
}) {
  return (
    <div className="mb-4">
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9b7a2d]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-lg font-semibold text-[#111b2e]">{title}</h2>
    </div>
  );
}

export function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 font-semibold text-slate-950">{value}</p>
    </div>
  );
}
