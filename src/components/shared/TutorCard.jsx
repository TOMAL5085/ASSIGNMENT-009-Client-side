import { CalendarDays, MapPin, Wallet } from "lucide-react";
import { Link } from "react-router-dom";

export default function TutorCard({ tutor }) {
  return (
    <article className="glass-card flex h-full flex-col rounded-[30px] p-5">
      <img
        src={tutor.photo}
        alt={tutor.tutorName}
        className="h-64 w-full rounded-[24px] object-cover"
      />
      <div className="mt-5 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-4">
          <span className="rounded-full bg-[var(--brand-soft)] px-3 py-1 text-sm font-semibold text-[var(--brand-dark)]">
            {tutor.subject}
          </span>
          <span className="text-sm font-semibold muted-text">{tutor.teachingMode}</span>
        </div>

        <h3 className="mt-4 text-2xl font-bold">{tutor.tutorName}</h3>
        <p className="mt-1 muted-text">{tutor.institution}</p>

        <div className="mt-5 space-y-3 text-sm muted-text">
          <p className="flex items-center gap-2">
            <CalendarDays size={16} className="text-[var(--brand)]" />
            {new Date(tutor.sessionStartDate).toLocaleDateString()} • {tutor.availableDays}
          </p>
          <p className="flex items-center gap-2">
            <Wallet size={16} className="text-[var(--brand)]" />
            ${tutor.hourlyFee}/hr • {tutor.totalSlot} slots left
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} className="text-[var(--brand)]" />
            {tutor.location}
          </p>
        </div>

        <div className="mt-6">
          <Link to={`/tutors/${tutor._id}`} className="btn-primary inline-flex items-center justify-center">
            Book Session
          </Link>
        </div>
      </div>
    </article>
  );
}
