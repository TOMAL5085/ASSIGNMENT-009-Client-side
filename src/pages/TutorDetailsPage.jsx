import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarDays, Clock3, MapPin, ShieldCheck, Ticket } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Link, useNavigate, useParams } from "react-router-dom";
import fallbackTutors from "../data/fallbackTutors";
import EmptyState from "../components/shared/EmptyState";
import Modal from "../components/shared/Modal";
import Spinner from "../components/shared/Spinner";
import useAuth from "../hooks/useAuth";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";

export default function TutorDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const queryClient = useQueryClient();
  const { register, handleSubmit, reset } = useForm();

  const { data: tutor, isLoading } = useQuery({
    queryKey: ["tutor", id],
    queryFn: async () => {
      try {
        const { data } = await api.get(`/api/tutors/${id}`);
        if (data?._id) {
          return data;
        }
      } catch {
        // Fall back to the local tutor dataset used by the tutors page.
      }

      return fallbackTutors.find((item) => item._id === id) || null;
    },
  });

  useDocumentTitle(tutor ? tutor.tutorName : "Tutor Details");

  const bookingMutation = useMutation({
    mutationFn: async (payload) => {
      const { data } = await api.post("/api/bookings", payload);
      return data;
    },
    onSuccess: (data) => {
      toast.success(`Booking confirmed. Your token is ${data.sessionToken}.`);
      setIsOpen(false);
      reset();
      queryClient.invalidateQueries({ queryKey: ["tutor", id] });
      queryClient.invalidateQueries({ queryKey: ["featured-tutors"] });
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Booking failed.");
    },
  });

  if (isLoading) {
    return <Spinner label="Loading tutor details..." />;
  }

  if (!tutor) {
    return (
      <section className="section-gap">
        <div className="main-container">
          <EmptyState
            title="Tutor details are not available right now."
            description="This tutor could not be loaded from the server. You can return to the tutor directory and choose another available profile."
          />
          <div className="mt-8 flex flex-wrap gap-3">
            <button type="button" className="btn-secondary" onClick={() => navigate(-1)}>
              Go Back
            </button>
            <Link to="/tutors" className="btn-primary">
              Browse All Tutors
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section-gap">
      <div className="main-container">
        <div className="grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-6">
            <img src={tutor.photo} alt={tutor.tutorName} className="glass-card h-full min-h-[460px] rounded-[34px] object-cover" />
            <div
              className="strong-card rounded-[34px] px-7 py-8 text-white"
              style={{ background: "var(--hero-strong)" }}
            >
              <div className="flex items-center gap-3">
                <ShieldCheck size={20} />
                <p className="text-sm font-bold uppercase tracking-[0.18em] text-white/72">
                  Booking Logic Protected
                </p>
              </div>
              <p className="mt-4 leading-7 text-white/82">
                Slots reduce after successful booking, closed sessions are blocked automatically, and each learner receives a digital session token.
              </p>
            </div>
          </div>

          <div className="glass-card rounded-[34px] p-8">
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-[var(--brand-soft)] px-4 py-2 text-sm font-semibold text-[var(--brand-dark)]">
                {tutor.subject}
              </span>
              <span className="rounded-full bg-[var(--surface-strong)] px-4 py-2 text-sm font-semibold">
                {tutor.teachingMode}
              </span>
            </div>

            <h1 className="page-title mt-5">{tutor.tutorName}</h1>
            <p className="mt-4 text-lg leading-8 muted-text">
              {tutor.description || "This tutor is ready to support learners with a focused, guided, and student-friendly teaching approach."}
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] bg-[var(--surface-strong)] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Institution</p>
                <p className="mt-2 text-xl font-bold">{tutor.institution}</p>
              </div>
              <div className="rounded-[24px] bg-[var(--surface-strong)] p-5">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[var(--muted)]">Experience</p>
                <p className="mt-2 text-xl font-bold">{tutor.experience}</p>
              </div>
            </div>

            <div className="mt-8 grid gap-4">
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <p className="flex items-center gap-3 text-base muted-text"><CalendarDays className="text-[var(--brand)]" size={18} /> Session date: {new Date(tutor.sessionStartDate).toLocaleDateString()}</p>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <p className="flex items-center gap-3 text-base muted-text"><Clock3 className="text-[var(--brand)]" size={18} /> {tutor.availableDays} / {tutor.availableTimeSlot}</p>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <p className="flex items-center gap-3 text-base muted-text"><MapPin className="text-[var(--brand)]" size={18} /> {tutor.location}</p>
              </div>
              <div className="rounded-[24px] border border-[var(--border)] bg-[var(--surface)] px-5 py-4">
                <p className="flex items-center gap-3 text-base muted-text"><Ticket className="text-[var(--brand)]" size={18} /> {tutor.totalSlot} slots available / ${tutor.hourlyFee} per hour</p>
              </div>
            </div>

            {(() => {
              const today = new Date();
              today.setHours(0, 0, 0, 0);
              const sessionDate = new Date(tutor.sessionStartDate);
              sessionDate.setHours(0, 0, 0, 0);

              if (tutor.totalSlot <= 0) {
                return (
                  <div className="mt-8 rounded-2xl bg-rose-100 p-4 text-rose-700">
                    <p className="font-semibold">No available slots left.</p>
                  </div>
                );
              }

              if (today < sessionDate) {
                return (
                  <div className="mt-8 rounded-2xl bg-amber-100 p-4 text-amber-700">
                    <p className="font-semibold">Booking is not available yet for this tutor</p>
                  </div>
                );
              }

              return (
                <button type="button" className="btn-primary mt-8" onClick={() => setIsOpen(true)}>
                  Book Session
                </button>
              );
            })()}
          </div>
        </div>
      </div>

      {isOpen ? (
        <Modal title="Book this learning session" onClose={() => setIsOpen(false)}>
          <form
            className="grid gap-5 md:grid-cols-2"
            onSubmit={handleSubmit((formData) => {
              bookingMutation.mutate({
                studentName: formData.studentName,
                phone: formData.phone,
                tutorId: tutor._id,
                tutorName: tutor.tutorName,
                studentEmail: user.email,
              });
            })}
          >
            <div>
              <label className="mb-2 block font-semibold">Student Name</label>
              <input
                defaultValue={user.displayName || ""}
                className="field"
                {...register("studentName", { required: true })}
              />
            </div>
            <div>
              <label className="mb-2 block font-semibold">Phone</label>
              <input className="field" placeholder="+8801XXXXXXXXX" {...register("phone", { required: true })} />
            </div>
            <div>
              <label className="mb-2 block font-semibold">Tutor ID</label>
              <input className="field" value={tutor._id} readOnly />
            </div>
            <div>
              <label className="mb-2 block font-semibold">Tutor Name</label>
              <input className="field" value={tutor.tutorName} readOnly />
            </div>
            <div>
              <label className="mb-2 block font-semibold">Student Email</label>
              <input className="field" value={user.email} readOnly />
            </div>
            <div>
              <label className="mb-2 block font-semibold">Book Status</label>
              <input className="field" value="booked" readOnly />
            </div>
            <div className="md:col-span-2">
              <button type="submit" className="btn-primary" disabled={bookingMutation.isPending}>
                {bookingMutation.isPending ? "Booking..." : "Confirm Booking"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}
    </section>
  );
}
