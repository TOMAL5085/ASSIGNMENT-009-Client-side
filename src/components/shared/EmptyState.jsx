export default function EmptyState({ title, description }) {
  return (
    <div className="glass-card rounded-[32px] px-6 py-12 text-center">
      <h3 className="text-2xl font-bold">{title}</h3>
      <p className="mx-auto mt-3 max-w-xl muted-text">{description}</p>
    </div>
  );
}
