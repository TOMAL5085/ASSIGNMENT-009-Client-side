import { ArrowRight, BadgeCheck, CalendarRange, Sparkles, Upload } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
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
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm();
  const navigate = useNavigate();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("image", file);

    try {
      // Using a demo API key if VITE_IMGBB_KEY is not provided
      const apiKey = import.meta.env.VITE_IMGBB_KEY || "686036814b2d511101831448b476e3d2";
      const response = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result.success) {
        const url = result.data.display_url;
        setPhotoURL(url);
        setValue("photoURL", url, { shouldValidate: true });
        toast.success("Photo uploaded successfully!");
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

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
      <div className="main-container">
        <div className="grid gap-8 xl:grid-cols-[1.02fr_0.98fr]">
          <div className="glass-card rounded-[36px] p-6 md:p-10">
            <p className="eyebrow">Create Account</p>
            <h1 className="section-title mt-5">Register for a smoother tutor booking flow.</h1>
            <p className="mt-4 text-lg leading-8 muted-text">
              Build your learner profile once, then use it for private booking pages, tutor dashboards, and future session tracking.
            </p>

            <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-2 block font-semibold">Name</label>
                <input className="field" placeholder="Your full name" {...register("name", { required: "Name is required." })} />
                <p className="mt-2 text-sm text-rose-500">{errors.name?.message}</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold">Email</label>
                <input className="field" type="email" placeholder="student@example.com" {...register("email", { required: "Email is required." })} />
                <p className="mt-2 text-sm text-rose-500">{errors.email?.message}</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold">Profile Photo</label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    id="photo-upload"
                    onChange={handleImageUpload}
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`field flex cursor-pointer items-center justify-center gap-3 border-dashed py-6 text-center transition-all ${
                      uploading ? "opacity-50" : "hover:border-[var(--brand)]"
                    }`}
                  >
                    {uploading ? (
                      <span className="animate-pulse">Uploading...</span>
                    ) : photoURL ? (
                      <div className="flex items-center gap-3">
                        <img src={photoURL} alt="Preview" className="h-10 w-10 rounded-full object-cover" />
                        <span className="text-sm font-medium text-[var(--brand)]">Change Photo</span>
                      </div>
                    ) : (
                      <>
                        <Upload size={20} className="text-[var(--muted)]" />
                        <span className="text-[var(--muted)]">Upload from your computer</span>
                      </>
                    )}
                  </label>
                  <input type="hidden" {...register("photoURL", { required: "Photo is required." })} />
                </div>
                <p className="mt-2 text-sm text-rose-500">{errors.photoURL?.message}</p>
              </div>
              <div>
                <label className="mb-2 block font-semibold">Password</label>
                <input
                  className="field"
                  type="password"
                  placeholder="Use at least 6 characters"
                  {...register("password", {
                    required: "Password is required.",
                    validate: validatePassword,
                  })}
                />
                <p className="mt-2 text-sm text-rose-500">{errors.password?.message}</p>
              </div>
              <button type="submit" className="btn-primary flex w-full items-center justify-center gap-2">
                Register <ArrowRight size={18} />
              </button>
            </form>

            <button type="button" className="btn-secondary mt-4 w-full" onClick={handleGoogleLogin}>
              Register with Google
            </button>

            <p className="mt-6 text-center muted-text">
              Already have an account? <Link to="/login" className="font-semibold text-[var(--brand)]">Go to login</Link>
            </p>
          </div>

          <div
            className="strong-card rounded-[36px] px-7 py-10 text-white md:px-10 md:py-12"
            style={{ background: "var(--hero-strong)" }}
          >
            <p className="eyebrow bg-white/12 text-white">Student Setup</p>
            <h2 className="page-title mt-6 text-white">Start with a profile built for organized learning.</h2>

            <div className="mt-8 space-y-4">
              <article className="rounded-[24px] border border-white/15 bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <BadgeCheck size={20} />
                  <h3 className="text-xl font-bold">Strong password rules</h3>
                </div>
                <p className="mt-3 leading-7 text-white/78">
                  Registration blocks weak passwords until they include uppercase, lowercase, and enough characters.
                </p>
              </article>
              <article className="rounded-[24px] border border-white/15 bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <CalendarRange size={20} />
                  <h3 className="text-xl font-bold">Private routes that persist</h3>
                </div>
                <p className="mt-3 leading-7 text-white/78">
                  Once you sign in, your booked sessions and tutor details stay accessible even after a refresh.
                </p>
              </article>
              <article className="rounded-[24px] border border-white/15 bg-white/10 p-5">
                <div className="flex items-center gap-3">
                  <Sparkles size={20} />
                  <h3 className="text-xl font-bold">Google login included</h3>
                </div>
                <p className="mt-3 leading-7 text-white/78">
                  Students can create an account through Google and continue directly into the booking experience.
                </p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
