import { CalendarDays, Clock3, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function TutorCard({ tutor }) {
  return (
    <article className="soft-card flex h-full flex-col overflow-hidden rounded-[28px] border border-[rgba(15,23,42,0.12)] p-5 shadow-[0_18px_36px_rgba(15,23,42,0.08)]">
      <img
        src={tutor.photo}
        alt={tutor.tutorName}
        className="h-64 w-full rounded-[24px] object-cover"
      />
      <div className="flex flex-1 flex-col px-2 pb-2 pt-6">
        <h3 className="text-[2rem] font-bold leading-tight">{tutor.tutorName}</h3>
        <p className="mt-1 text-[1.2rem] text-[var(--muted)]">{tutor.subject}</p>

        <div className="mt-6 space-y-3 text-[1rem] leading-7 text-[var(--text)]">
          <p className="flex items-start gap-2">
            <Clock3 size={16} className="mt-1 shrink-0 text-[var(--brand)]" />
            <span>Available: {tutor.availableDays} {tutor.availableTimeSlot}</span>
          </p>
          <p className="flex items-start gap-2">
            <CalendarDays size={16} className="mt-1 shrink-0 text-[var(--brand)]" />
            <span>Session Start Date: {new Date(tutor.sessionStartDate).toLocaleDateString(undefined, { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</span>
          </p>
          <p className="flex items-start gap-2">
            <Wallet size={16} className="mt-1 shrink-0 text-[var(--brand)]" />
            <span>Fee: ${tutor.hourlyFee}/hr</span>
          </p>
        </div>

        <div className="mt-7">
          <Link
            to={`/tutors/${tutor._id}`}
            className="btn-primary inline-flex w-full items-center justify-center text-lg"
          >
            Book Session
          </Link>
        </div>
      </div>
    </article>
  );
}
