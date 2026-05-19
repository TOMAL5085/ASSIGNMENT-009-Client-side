import { Mail, UserRound } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

export default function ProfilePage() {
  useDocumentTitle("Profile");
  const { user } = useAuth();

  return (
    <section className="section-gap">
      <div className="main-container max-w-4xl">
        <div className="glass-card rounded-[34px] p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center">
            <img
              src={user.photoURL || "https://i.ibb.co/gv1x7fS/avatar-placeholder.png"}
              alt={user.displayName || "Profile"}
              className="h-28 w-28 rounded-[28px] object-cover"
            />
            <div>
              <h1 className="page-title">{user.displayName || "MediQueue User"}</h1>
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
        </div>
      </div>
    </section>
  );
}
