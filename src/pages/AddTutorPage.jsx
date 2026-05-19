import { useMutation } from "@tanstack/react-query";
import { BriefcaseBusiness, CalendarCheck2, MapPinned } from "lucide-react";
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
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

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

          <div className="mb-8 grid gap-4 lg:grid-cols-3">
            <article className="soft-card rounded-[26px] p-5">
              <BriefcaseBusiness size={20} className="text-[var(--brand)]" />
              <h3 className="mt-4 text-lg font-bold">Professional listing</h3>
              <p className="mt-2 text-sm leading-6 muted-text">Present subject, price, and teaching mode in a clean format students can trust.</p>
            </article>
            <article className="soft-card rounded-[26px] p-5">
              <CalendarCheck2 size={20} className="text-[var(--brand)]" />
              <h3 className="mt-4 text-lg font-bold">Clear availability</h3>
              <p className="mt-2 text-sm leading-6 muted-text">Share your available days, time window, and session date to prevent booking confusion.</p>
            </article>
            <article className="soft-card rounded-[26px] p-5">
              <MapPinned size={20} className="text-[var(--brand)]" />
              <h3 className="mt-4 text-lg font-bold">Location clarity</h3>
              <p className="mt-2 text-sm leading-6 muted-text">Show whether classes are online, offline, or both so students know what to expect.</p>
            </article>
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
