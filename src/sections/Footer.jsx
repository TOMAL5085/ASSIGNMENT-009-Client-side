const links = ["Subject Matching", "Mock Session Tokens", "Tutor Screening", "Session Scheduling"];
const socialLinks = [
  { label: "Fb", name: "Facebook" },
  { label: "Ig", name: "Instagram" },
  { label: "In", name: "LinkedIn" },
  { label: "X", name: "X" },
];

export default function Footer() {
  return (
    <footer className="mt-8 border-t border-[var(--border)] bg-[var(--surface)]">
      <div className="main-container grid gap-10 py-12 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h3 className="font-[Space_Grotesk] text-2xl font-bold">MediQueue</h3>
          <p className="mt-4 leading-7 muted-text">
            A focused tutor booking platform that keeps learner schedules organized, avoids slot conflicts,
            and makes every class feel easier to manage.
          </p>
        </div>
        <div>
          <h4 className="text-lg font-bold">Learning Services</h4>
          <ul className="mt-4 space-y-3 muted-text">
            {links.map((link) => (
              <li key={link}>{link}</li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Contact</h4>
          <ul className="mt-4 space-y-3 muted-text">
            <li>support@mediqueue.app</li>
            <li>+880 1712-345678</li>
            <li>Dhanmondi, Dhaka, Bangladesh</li>
          </ul>
        </div>
        <div>
          <h4 className="text-lg font-bold">Follow Us</h4>
          <div className="mt-4 flex gap-3">
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
          <p className="mt-6 text-sm muted-text">Copyright {new Date().getFullYear()} MediQueue. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
