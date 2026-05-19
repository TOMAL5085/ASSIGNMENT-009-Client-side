import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

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
      await loginWithGoogle();
      toast.success("Google sign-in completed.");
      navigate(redirectTo, { replace: true });
    } catch (error) {
      toast.error(error.message || "Google login failed.");
    }
  }

  return (
    <section className="section-gap">
      <div className="main-container max-w-2xl">
        <div className="glass-card rounded-[34px] p-6 md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[var(--brand)]">Welcome Back</p>
          <h1 className="page-title">Login to manage your classes.</h1>
          <p className="mt-4 text-lg muted-text">Sign in to book sessions, manage your tutors, and keep your learning calendar organized.</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-2 block font-semibold">Email</label>
              <input className="field" type="email" {...register("email", { required: true })} />
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
              <input className="field" type="password" {...register("password", { required: true })} />
            </div>
            <button type="submit" className="btn-primary w-full">Login</button>
          </form>

          <button type="button" className="btn-secondary mt-4 w-full" onClick={handleGoogleLogin}>
            Continue with Google
          </button>

          <p className="mt-6 text-center muted-text">
            New here? <Link to="/register" className="font-semibold text-[var(--brand)]">Create an account</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
