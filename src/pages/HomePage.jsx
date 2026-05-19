import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  ArrowRight,
  CalendarCheck2,
  GraduationCap,
  ShieldCheck,
  UserRoundSearch,
} from "lucide-react";
import { Link } from "react-router-dom";
import SectionHeader from "../components/shared/SectionHeader";
import Spinner from "../components/shared/Spinner";
import TutorCard from "../components/shared/TutorCard";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";

const benefits = [
  {
    icon: GraduationCap,
    title: "Qualified tutors",
    text: "Students can explore experienced mentors across mathematics, science, languages, and exam preparation.",
  },
  {
    icon: CalendarCheck2,
    title: "Easy booking",
    text: "Reserve a learning session in minutes with live slot visibility and no scheduling confusion.",
  },
  {
    icon: ShieldCheck,
    title: "Trusted flow",
    text: "Every booking creates a digital token so class details stay clear and easy to track later.",
  },
];

const howItWorks = [
  {
    step: "01",
    title: "Create your account",
    text: "Sign up, log in, and unlock a learner dashboard that stays available across private routes.",
  },
  {
    step: "02",
    title: "Choose the right tutor",
    text: "Browse tutor profiles by subject, teaching mode, date, and availability to find the best fit.",
  },
  {
    step: "03",
    title: "Confirm your session",
    text: "Book the class, receive a digital token, and manage your session from one organized place.",
  },
];

const stats = [
  { value: "100+", label: "Active learning slots" },
  { value: "25+", label: "Subjects supported" },
  { value: "7d", label: "Private access persistence" },
  { value: "1 click", label: "Dashboard booking control" },
];

export default function HomePage() {
  useDocumentTitle("Home");

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["featured-tutors"],
    queryFn: async () => {
      const { data } = await api.get("/api/tutors?limit=6");
      return data;
    },
  });

  return (
    <>
      <section className="section-gap">
        <div className="main-container">
          <div className="grid items-center gap-10 xl:grid-cols-[1.15fr_0.85fr]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="rounded-[38px] border border-[var(--border)] px-7 py-10 md:px-12 md:py-14"
              style={{ background: "var(--hero)" }}
            >
              <p className="mb-5 inline-flex rounded-full bg-[var(--brand-soft)] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-dark)]">
                Welcome to MediQueue
              </p>
              <h1 className="hero-title max-w-3xl">
                Find experienced tutors and book classes without the usual back-and-forth.
              </h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 muted-text">
                MediQueue helps students register, discover available tutors,
                reserve learning sessions, and manage bookings from a clean,
                modern, and reliable interface.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Link to="/tutors" className="btn-primary inline-flex items-center gap-2">
                  Book Your Tutor <ArrowRight size={18} />
                </Link>
                <Link to="/register" className="btn-secondary">
                  Create Student Account
                </Link>
              </div>
            </motion.div>

            <div className="grid gap-5">
              <div
                className="soft-card rounded-[34px] p-7 text-white"
                style={{ background: "var(--hero-strong)" }}
              >
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-white/70">
                  Personalized Learning
                </p>
                <h3 className="mt-3 text-3xl font-bold">
                  Make every class easier to plan and easier to attend.
                </h3>
                <p className="mt-4 leading-7 text-white/82">
                  Tutor browsing, session booking, and dashboard tracking are
                  all connected so students avoid missed updates and slot
                  conflicts.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {stats.map((item) => (
                  <article key={item.label} className="soft-card rounded-[28px] p-6">
                    <p className="text-3xl font-black text-[var(--brand)]">{item.value}</p>
                    <p className="mt-2 font-semibold muted-text">{item.label}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="services" className="section-gap pt-0">
        <div className="main-container grid gap-6 lg:grid-cols-3">
          {benefits.map((item) => (
            <article key={item.title} className="soft-card rounded-[30px] p-7">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--brand-soft)]">
                <item.icon size={24} className="text-[var(--brand)]" />
              </div>
              <h3 className="mt-5 text-[1.55rem] font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 muted-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="tutors" className="section-gap">
        <div className="main-container">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Our Tutors"
              title="Meet the tutors students can book right now."
              description="These six featured profiles come directly from the database so the homepage always feels alive and current."
            />
            <Link to="/tutors" className="btn-secondary w-fit">
              View All Tutors
            </Link>
          </div>

          {isLoading ? (
            <Spinner label="Loading featured tutors..." />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section id="about" className="section-gap">
        <div className="main-container grid gap-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="soft-card rounded-[36px] p-8 md:p-10">
            <SectionHeader
              eyebrow="Why Choose Us"
              title="Everything students need for a smooth tutor booking experience."
              description="The platform is designed to remove manual scheduling and replace it with a structured, calm, and learner-friendly flow."
            />
            <div className="mt-8 space-y-5">
              {[
                "Search tutors by name and filter by date before booking.",
                "Protect student bookings with private routes and persistent auth state.",
                "Avoid session overlap with automatic slot reduction after every successful booking.",
                "Manage tutor listings and booked classes from dedicated dashboard pages.",
              ].map((point) => (
                <div
                  key={point}
                  className="flex items-start gap-3 rounded-[22px] bg-[var(--surface-strong)] px-4 py-4"
                >
                  <UserRoundSearch size={20} className="mt-1 text-[var(--brand)]" />
                  <p className="leading-7 muted-text">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-5">
            <div className="soft-card rounded-[36px] p-8 md:p-10">
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand)]">
                How It Works
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                A simple three-step path from discovery to confirmed class booking.
              </h3>
              <div className="mt-8 grid gap-5">
                {howItWorks.map((item) => (
                  <article
                    key={item.step}
                    className="flex gap-4 rounded-[24px] border border-[var(--border)] bg-[var(--surface)] p-5"
                  >
                    <span className="number-badge">{item.step}</span>
                    <div>
                      <h4 className="text-xl font-bold">{item.title}</h4>
                      <p className="mt-2 leading-7 muted-text">{item.text}</p>
                    </div>
                  </article>
                ))}
              </div>
            </div>

            <div
              className="rounded-[36px] px-8 py-10 text-white md:px-10"
              style={{ background: "var(--hero-strong)" }}
            >
              <p className="text-sm font-bold uppercase tracking-[0.22em] text-white/70">
                Student Promise
              </p>
              <h3 className="mt-3 text-3xl font-bold">
                Clear schedules, transparent availability, and better learning momentum.
              </h3>
              <p className="mt-4 max-w-2xl leading-8 text-white/82">
                When a booking succeeds, the system updates available slots
                immediately so the next student always sees honest availability.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
