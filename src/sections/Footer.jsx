
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
  {
    name: "Facebook",
    href: "https://facebook.com",
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com",
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com",
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect width="4" height="12" x="2" y="9" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "X",
    href: "https://x.com",
    icon: (props) => (
      <svg
        {...props}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 4l11.733 16h4.267l-11.733 -16z" />
        <path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772" />
      </svg>
    ),
  },
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
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={item.name}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--border)] transition-all hover:scale-110 hover:border-[var(--brand)] hover:bg-[var(--brand-soft)] hover:text-[var(--brand)]"
              >
                <item.icon className="w-5 h-5" />
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
