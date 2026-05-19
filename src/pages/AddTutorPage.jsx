import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TutorFormFields from "../components/forms/TutorFormFields";
import SectionHeader from "../components/shared/SectionHeader";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";

export default function AddTutorPage() {
  useDocumentTitle("Add Tutor");
  const { user } = useAuth();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/api/tutors", payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Tutor profile added successfully.");
      reset();
    },
    onError: () => {
      toast.error("Unable to save tutor right now.");
    },
  });

  return (
    <section className="section-gap">
      <div className="main-container">
        <SectionHeader
          eyebrow="Private Dashboard"
          title="Create a tutor profile that students can book with confidence."
          description="Every field below is used in the public cards, private details view, and booking flow."
        />
        <div className="glass-card mt-10 rounded-[34px] p-6 md:p-8">
          <div className="mb-8 grid gap-4 md:grid-cols-3">
            <div className="rounded-[24px] bg-[var(--surface-strong)] p-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Creator</p>
              <p className="mt-2 font-semibold">{user.displayName}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--surface-strong)] p-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Email</p>
              <p className="mt-2 font-semibold">{user.email}</p>
            </div>
            <div className="rounded-[24px] bg-[var(--surface-strong)] p-4">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Teaching goal</p>
              <p className="mt-2 font-semibold">Clear listings, conflict-free booking.</p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit((formData) =>
              mutation.mutate({
                ...formData,
                creator: {
                  name: user.displayName,
                  email: user.email,
                  photoURL: user.photoURL,
                },
              })
            )}
          >
            <TutorFormFields register={register} errors={errors} />
            <div className="mt-8">
              <button type="submit" className="btn-primary" disabled={mutation.isPending}>
                {mutation.isPending ? "Saving..." : "Submit Tutor"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
