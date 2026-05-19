import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";

function validatePassword(password) {
  if (!/[A-Z]/.test(password)) {
    return "Password must include at least one uppercase letter.";
  }

  if (!/[a-z]/.test(password)) {
    return "Password must include at least one lowercase letter.";
  }

  if (password.length < 6) {
    return "Password must be at least 6 characters long.";
  }

  return true;
}

export default function RegisterPage() {
  useDocumentTitle("Register");
  const { registerUser, loginWithGoogle } = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  async function onSubmit(formData) {
    try {
      await registerUser(formData);
      toast.success("Registration complete. Please log in.");
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Unable to register right now.");
    }
  }

  async function handleGoogleLogin() {
    try {
      await loginWithGoogle("/");
    } catch (error) {
      toast.error(error.message || "Google sign-up failed.");
    }
  }

  return (
    <section className="section-gap">
      <div className="main-container max-w-2xl">
        <div className="glass-card rounded-[34px] p-6 md:p-10">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.24em] text-[var(--brand)]">Create Account</p>
          <h1 className="page-title">Register for a smoother tutor booking flow.</h1>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label className="mb-2 block font-semibold">Name</label>
              <input className="field" {...register("name", { required: "Name is required." })} />
              <p className="mt-2 text-sm text-rose-500">{errors.name?.message}</p>
            </div>
            <div>
              <label className="mb-2 block font-semibold">Email</label>
              <input className="field" type="email" {...register("email", { required: "Email is required." })} />
              <p className="mt-2 text-sm text-rose-500">{errors.email?.message}</p>
            </div>
            <div>
              <label className="mb-2 block font-semibold">Photo URL</label>
              <input className="field" {...register("photoURL", { required: "Photo URL is required." })} />
              <p className="mt-2 text-sm text-rose-500">{errors.photoURL?.message}</p>
            </div>
            <div>
              <label className="mb-2 block font-semibold">Password</label>
              <input
                className="field"
                type="password"
                {...register("password", {
                  required: "Password is required.",
                  validate: validatePassword,
                })}
              />
              <p className="mt-2 text-sm text-rose-500">{errors.password?.message}</p>
            </div>
            <button type="submit" className="btn-primary w-full">Register</button>
          </form>

          <button type="button" className="btn-secondary mt-4 w-full" onClick={handleGoogleLogin}>
            Register with Google
          </button>

          <p className="mt-6 text-center muted-text">
            Already have an account? <Link to="/login" className="font-semibold text-[var(--brand)]">Go to login</Link>
          </p>
        </div>
      </div>
    </section>
  );
}
