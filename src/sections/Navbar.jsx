import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ThemeToggle from "../components/shared/ThemeToggle";
import useAuth from "../hooks/useAuth";

const links = [
  { type: "route", to: "/", label: "Home" },
  { type: "route", to: "/tutors", label: "Tutors" },
  { type: "anchor", href: "/#services", label: "Services" },
  { type: "anchor", href: "/#about", label: "About" },
  { type: "anchor", href: "/#contact", label: "Contact" },
];

const privateLinks = [
  { to: "/add-tutor", label: "Add Tutor" },
  { to: "/my-tutors", label: "My Tutors" },
  { to: "/my-booked-sessions", label: "My Sessions" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();

  async function handleLogout() {
    await logoutUser();
    toast.success("You have been signed out successfully.");
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_90%,transparent)]">
      <div className="main-container flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--brand)] text-lg font-black text-white">
            M
          </div>
          <div>
            <p className="font-[Space_Grotesk] text-[1.75rem] font-bold tracking-tight">
              MediQueue
            </p>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">
              Smart Tutor Booking
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) =>
            link.type === "route" ? (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? "nav-link-active" : "text-[var(--text)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:text-[var(--brand)]"
              >
                {link.label}
              </a>
            ),
          )}

          {user
            ? privateLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-full px-4 py-2 text-sm font-semibold transition ${
                      isActive ? "nav-link-active" : "text-[var(--text)]"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))
            : null}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <ThemeToggle />
          {!user ? (
            <>
              <Link to="/login" className="btn-secondary">
                Login
              </Link>
              <Link to="/register" className="btn-primary">
                Register
              </Link>
            </>
          ) : (
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-2 shadow-sm"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <img
                  src={
                    user.photoURL ||
                    "https://i.ibb.co/gv1x7fS/avatar-placeholder.png"
                  }
                  alt={user.displayName || "Profile"}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="pr-3 text-sm font-semibold">
                  {user.displayName || "Learner"}
                </span>
              </button>
              {menuOpen ? (
                <div className="absolute right-0 mt-3 w-56 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl">
                  <Link
                    to="/profile"
                    className="block rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-[var(--surface-strong)]"
                    onClick={() => setMenuOpen(false)}
                  >
                    Profile Page
                  </Link>
                  <button
                    type="button"
                    className="mt-2 w-full rounded-2xl bg-rose-500 px-4 py-3 text-left text-sm font-semibold text-white"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="button"
          className="lg:hidden"
          onClick={() => setMobileOpen((value) => !value)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[var(--border)] lg:hidden">
          <div className="main-container flex flex-col gap-3 py-4">
            {links.map((link) =>
              link.type === "route" ? (
                <NavLink
                  key={link.to}
                  to={link.to}
                  className={({ isActive }) =>
                    `rounded-2xl px-4 py-3 font-semibold ${
                      isActive
                        ? "bg-[var(--brand)] text-white"
                        : "bg-[var(--surface)]"
                    }`
                  }
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </NavLink>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-2xl bg-[var(--surface)] px-4 py-3 font-semibold text-[var(--text)]"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </a>
              ),
            )}

            {user
              ? privateLinks.map((link) => (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    className={({ isActive }) =>
                      `rounded-2xl px-4 py-3 font-semibold ${
                        isActive
                          ? "bg-[var(--brand)] text-white"
                          : "bg-[var(--surface)]"
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </NavLink>
                ))
              : null}
            <ThemeToggle />
            {!user ? (
              <>
                <Link
                  to="/login"
                  className="btn-secondary text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="btn-secondary text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={() => {
                    setMobileOpen(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
