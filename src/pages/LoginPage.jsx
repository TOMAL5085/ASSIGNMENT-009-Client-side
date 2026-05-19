import { ArrowRight, CalendarCheck2, ShieldCheck, UserRoundSearch } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

const highlights = [
  "Book sessions from a clean private dashboard",
  "Keep your auth session active on protected routes",
  "Track tutor availability before you commit",
];

export default function LoginPage() {
  useDocumentTitle("Login");
  const { register, handleSubmit } = useForm();
  const { loginUser, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from?.pathname || "/";

  async function onSubmit(formData) {
    try {
      await loginUser(formData.email, formData.password);
      toast.success("Welcome back to MediQueue.");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.message || "Unable to log in.");
    }
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle(redirectTo);
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    }
  }

  return (
    <section className="section-gap">
      <div className="main-container">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div
            className="rounded-[36px] px-7 py-10 text-white md:px-10 md:py-12"
            style={{ background: "var(--hero-strong)" }}
          >
            <p className="eyebrow bg-white/12 text-white">Learner Access</p>
            <h1 className="page-title mt-6 text-white">Return to your tutor calendar in seconds.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-white/82">
              Sign in to review upcoming classes, reserve new sessions, and keep every study plan in one organized place.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <article className="rounded-[26px] border border-white/15 bg-white/10 p-5">
                <CalendarCheck2 size={22} />
                <h3 className="mt-4 text-xl font-bold">Fast booking</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Confirm classes with real slot visibility and less scheduling confusion.
                </p>
              </article>
              <article className="rounded-[26px] border border-white/15 bg-white/10 p-5">
                <ShieldCheck size={22} />
                <h3 className="mt-4 text-xl font-bold">Reliable access</h3>
                <p className="mt-2 text-sm leading-6 text-white/75">
                  Your protected routes stay usable after reload thanks to persistent auth.
                </p>
              </article>
            </div>

            <div className="mt-8 space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-[20px] bg-white/10 px-4 py-3">
                  <UserRoundSearch size={18} className="text-white" />
                  <p className="text-sm font-medium text-white/86">{item}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-card rounded-[36px] p-6 md:p-10">
            <p className="eyebrow">Welcome Back</p>
            <h2 className="section-title mt-5">Login to manage your classes.</h2>
            <p className="mt-4 text-lg leading-8 muted-text">
              Sign in to book sessions, manage your tutors, and keep your learning calendar organized.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block font-semibold">Email</label>
                <input className="field" type="email" placeholder="student@example.com" {...register("email", { required: true })} />
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <label className="font-semibold">Password</label>
                  <button
                    type="button"
                    className="text-sm font-semibold text-[var(--brand)]"
                    onClick={() => toast("Password reset is intentionally skipped for assignment review.")}
                  >
                    Forget Password
                  </button>
                </div>
                <input className="field" type="password" placeholder="Enter your secure password" {...register("password", { required: true })} />
              </div>
              <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">
                Login <ArrowRight size={18} />
              </button>
            </form>

            <button type="button" className="btn-secondary mt-4 w-full" onClick={handleGoogleLogin}>
              Continue with Google
            </button>

            <p className="mt-6 text-center muted-text">
              New here? <Link to="/register" className="font-semibold text-[var(--brand)]">Create an account</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
