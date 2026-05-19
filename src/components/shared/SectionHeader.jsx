export default function SectionHeader({ eyebrow, title, description, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      {eyebrow ? (
        <p className="mb-3 text-sm font-bold uppercase tracking-[0.25em] text-[var(--brand)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="section-title">{title}</h2>
      {description ? <p className="mt-4 text-lg leading-8 muted-text">{description}</p> : null}
    </div>
  );
}
