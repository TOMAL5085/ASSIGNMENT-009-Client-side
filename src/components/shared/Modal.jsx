export default function Modal({ title, children, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/55 p-4">
      <div className="glass-card max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-[32px] p-6">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h3 className="text-2xl font-bold">{title}</h3>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
