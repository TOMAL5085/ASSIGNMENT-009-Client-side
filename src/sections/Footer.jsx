const serviceLinks = [
  "Browse tutors by subject",
  "Book class sessions online",
  "Manage your tutor schedule",
  "Track digital class tokens",
];

const companyLinks = [
  "Student-first booking flow",
  "Real-time slot updates",
  "Protected learning dashboard",
  "Smooth device-friendly design",
];

const socialLinks = [
  { label: "Fb", name: "Facebook" },
  { label: "Ig", name: "Instagram" },
  { label: "Li", name: "LinkedIn" },
  { label: "X", name: "X" },
];

export default function Footer() {
  return (
    <footer id="contact" className="mt-12 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="main-container grid gap-10 py-14 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand)] text-lg font-black text-white">
              M
            </div>
            <div>
              <h3 className="font-[Space_Grotesk] text-2xl font-bold">MediQueue</h3>
              <p className="text-sm muted-text">Your reliable tutor booking partner</p>
            </div>
          </div>
          <p className="mt-5 max-w-xs leading-7 muted-text">
            Discover trusted tutors, reserve class slots, and keep every learning
            session organized from a single clean dashboard.
          </p>
        </div>

        <div>
          <h4 className="text-lg font-bold">Learning Services</h4>
          <ul className="mt-5 space-y-3 muted-text">
            {serviceLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Why Students Choose Us</h4>
          <ul className="mt-5 space-y-3 muted-text">
            {companyLinks.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="text-lg font-bold">Contact Us</h4>
          <ul className="mt-5 space-y-3 muted-text">
            <li>support@mediqueue.app</li>
            <li>+880 1712-345678</li>
            <li>Dhanmondi, Dhaka, Bangladesh</li>
          </ul>
          <div className="mt-6 flex gap-3">
            {socialLinks.map((item) => (
              <a
                key={item.name}
                href="#"
                aria-label={item.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] font-bold"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)]">
        <div className="main-container flex flex-col gap-2 py-5 text-sm muted-text md:flex-row md:items-center md:justify-between">
          <p>Copyright {new Date().getFullYear()} MediQueue. All rights reserved.</p>
          <p>Designed for smoother tutoring, smarter scheduling, and calmer learning.</p>
        </div>
      </div>
    </footer>
  );
}
