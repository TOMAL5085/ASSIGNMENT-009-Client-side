export default function Spinner({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[40vh] items-center justify-center">
      <div className="glass-card flex items-center gap-4 rounded-[28px] px-6 py-5">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[var(--brand-soft)] border-t-[var(--brand)]" />
        <p className="font-semibold text-[var(--text)]">{label}</p>
      </div>
    </div>
  );
}
