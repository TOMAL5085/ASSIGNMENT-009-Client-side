import { Menu, X } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import ThemeToggle from "../components/shared/ThemeToggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/tutors", label: "Tutors" },
];

const privateLinks = [
  { to: "/add-tutor", label: "Add Tutor" },
  { to: "/my-tutors", label: "My Tutors" },
  { to: "/my-booked-sessions", label: "My Booked Sessions" },
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
    <header className="sticky top-0 z-40 border-b border-[var(--border)] bg-[color:color-mix(in_srgb,var(--background)_82%,transparent)] backdrop-blur-xl">
      <div className="main-container flex items-center justify-between gap-4 py-4">
        <Link to="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--brand)] text-lg font-black text-white">
            MQ
          </div>
          <div>
            <p className="font-[Space_Grotesk] text-2xl font-bold tracking-tight">MediQueue</p>
            <p className="text-xs uppercase tracking-[0.25em] text-[var(--muted)]">Tutor Booking</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-2 lg:flex">
          {[...links, ...(user ? privateLinks : [])].map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-[var(--brand-soft)] text-[var(--brand-dark)]" : "text-[var(--text)]"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
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
                className="flex items-center gap-3 rounded-full border border-[var(--border)] bg-[var(--surface)] px-2 py-2"
                onClick={() => setMenuOpen((value) => !value)}
              >
                <img
                  src={user.photoURL || "https://i.ibb.co/gv1x7fS/avatar-placeholder.png"}
                  alt={user.displayName || "Profile"}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <span className="pr-3 text-sm font-semibold">{user.displayName || "Learner"}</span>
              </button>
              {menuOpen ? (
                <div className="absolute right-0 mt-3 w-56 rounded-3xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl">
                  <Link to="/profile" className="block rounded-2xl px-4 py-3 text-sm font-semibold hover:bg-[var(--surface-strong)]" onClick={() => setMenuOpen(false)}>
                    Profile Page
                  </Link>
                  <button type="button" className="mt-2 w-full rounded-2xl bg-rose-500 px-4 py-3 text-left text-sm font-semibold text-white" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              ) : null}
            </div>
          )}
        </div>

        <button type="button" className="lg:hidden" onClick={() => setMobileOpen((value) => !value)}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen ? (
        <div className="border-t border-[var(--border)] lg:hidden">
          <div className="main-container flex flex-col gap-3 py-4">
            {[...links, ...(user ? privateLinks : [])].map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className="rounded-2xl bg-[var(--surface)] px-4 py-3 font-semibold"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </NavLink>
            ))}
            <ThemeToggle />
            {!user ? (
              <>
                <Link to="/login" className="btn-secondary text-center" onClick={() => setMobileOpen(false)}>
                  Login
                </Link>
                <Link to="/register" className="btn-primary text-center" onClick={() => setMobileOpen(false)}>
                  Register
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile" className="btn-secondary text-center" onClick={() => setMobileOpen(false)}>
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
