import { BookOpenText, Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import ThemeToggle from "../components/shared/ThemeToggle";
import useAuth from "../hooks/useAuth";

const links = [
  { type: "route", to: "/", label: "Home" },
  { type: "route", to: "/tutors", label: "Tutors" },
  { type: "route", to: "/services", label: "Services" },
  { type: "route", to: "/about", label: "About" },
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

  const handleLinkClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleContactClick = () => {
    const footer = document.getElementById("contact");
    if (footer) {
      footer.scrollIntoView({ behavior: "smooth" });
    }
  };

  async function handleLogout() {
    await logoutUser();
    toast.success("You have been signed out successfully.");
    navigate("/");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:color-mix(in_srgb,var(--surface)_90%,transparent)]">
      <div className="main-container flex items-center justify-between gap-4 py-4">
        <Link to="/" onClick={handleLinkClick} className="flex items-center gap-3">
          <div className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-[1.35rem] border border-white/12 bg-[linear-gradient(145deg,#7167ff_0%,#4f46e5_55%,#1f2d64_100%)] shadow-[0_14px_30px_rgba(79,70,229,0.28)]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.34),_transparent_52%)]" />
            <BookOpenText size={24} className="relative text-white" strokeWidth={2.15} />
          </div>
          <div>
            <p className="font-[Space_Grotesk] text-[1.75rem] font-bold tracking-[-0.04em] text-[var(--text)]">
              MediQueue
            </p>
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.28em] text-[var(--muted)]">
              Reliable Tutor Booking
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {links.map((link) =>
            link.type === "route" ? (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm font-semibold transition ${
                    isActive ? "nav-link-active" : "text-[var(--text)]"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ) : (
              <button
                key={link.label}
                type="button"
                onClick={handleContactClick}
                className="rounded-full px-4 py-2 text-sm font-semibold text-[var(--text)] transition hover:text-[var(--brand)]"
              >
                {link.label}
              </button>
            ),
          )}

          {user
            ? privateLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  onClick={handleLinkClick}
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
              <Link to="/login" className="btn-secondary" onClick={handleLinkClick}>
                Login
              </Link>
              <Link to="/register" className="btn-primary" onClick={handleLinkClick}>
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
                    onClick={() => {
                      handleLinkClick();
                      setMenuOpen(false);
                    }}
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
                  onClick={() => {
                    handleLinkClick();
                    setMobileOpen(false);
                  }}
                >
                  {link.label}
                </NavLink>
              ) : (
                <button
                  key={link.label}
                  type="button"
                  className="rounded-2xl bg-[var(--surface)] px-4 py-3 text-left font-semibold text-[var(--text)]"
                  onClick={() => {
                    setMobileOpen(false);
                    handleContactClick();
                  }}
                >
                  {link.label}
                </button>
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
                    onClick={() => {
                      handleLinkClick();
                      setMobileOpen(false);
                    }}
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
                  onClick={() => {
                    handleLinkClick();
                    setMobileOpen(false);
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary text-center"
                  onClick={() => {
                    handleLinkClick();
                    setMobileOpen(false);
                  }}
                >
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/profile"
                  className="btn-secondary text-center"
                  onClick={() => {
                    handleLinkClick();
                    setMobileOpen(false);
                  }}
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
