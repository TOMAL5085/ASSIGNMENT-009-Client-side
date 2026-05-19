import { Mail, ShieldCheck, UserRound } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function ProfilePage() {
  useDocumentTitle("Profile");
  const { user } = useAuth();

  return (
    <section className="section-gap">
      <div className="main-container max-w-4xl">
        <div className="grid gap-6">
          <div
            className="strong-card rounded-[34px] px-8 py-10 text-white"
            style={{ background: "var(--hero-strong)" }}
          >
            <p className="eyebrow bg-white/12 text-white">Learner Profile</p>
            <h1 className="page-title mt-5 text-white">{user.displayName || "MediQueue User"}</h1>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/82">
              Your profile keeps the booking experience personal, while session persistence helps private routes stay available after reload.
            </p>
          </div>

          <div className="glass-card rounded-[34px] p-8">
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <img
                src={user.photoURL || "https://i.ibb.co/gv1x7fS/avatar-placeholder.png"}
                alt={user.displayName || "Profile"}
                className="h-28 w-28 rounded-[28px] object-cover"
              />
              <div>
                <h2 className="section-title">{user.displayName || "MediQueue User"}</h2>
                <p className="mt-4 text-lg muted-text">Your learner profile remains active across private routes after reload because the app restores your auth session properly.</p>
              </div>
            </div>

            <div className="mt-10 grid gap-5 md:grid-cols-2">
              <div className="rounded-[24px] bg-[var(--surface-strong)] p-5">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]"><UserRound size={16} /> Display Name</p>
                <p className="mt-2 text-xl font-bold">{user.displayName}</p>
              </div>
              <div className="rounded-[24px] bg-[var(--surface-strong)] p-5">
                <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]"><Mail size={16} /> Email</p>
                <p className="mt-2 text-xl font-bold">{user.email}</p>
              </div>
            </div>

            <div className="mt-6 rounded-[24px] bg-[var(--surface-strong)] p-5">
              <p className="flex items-center gap-2 text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]"><ShieldCheck size={16} /> Session Behavior</p>
              <p className="mt-3 leading-7 muted-text">
                This account is used across tutor booking, dashboard controls, and protected route restoration so students do not get bounced back to login after refresh.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
