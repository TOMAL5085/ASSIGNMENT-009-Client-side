import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { CalendarCheck2, GraduationCap, ShieldCheck, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import TutorCard from "../components/shared/TutorCard";
import SectionHeader from "../components/shared/SectionHeader";
import Spinner from "../components/shared/Spinner";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";

const slides = [
  {
    title: "Book high-trust tutors without the scheduling chaos.",
    text: "MediQueue helps students discover subject experts, claim fair time slots, and receive digital class tokens in one clean flow.",
  },
  {
    title: "Find the right tutor by subject, format, and date.",
    text: "From HSC science prep to language coaching, learners can filter tutors fast and see which sessions are really available.",
  },
  {
    title: "Stay organized with personal dashboards and live slot updates.",
    text: "No repeated messages, no double-booking, and no guessing whether a seat is still open.",
  },
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
          <div className="grid items-center gap-8 xl:grid-cols-[1.1fr_0.9fr]">
            <div className="overflow-hidden rounded-[38px] p-8 text-white shadow-2xl md:p-12" style={{ background: "var(--hero)" }}>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <p className="mb-4 inline-flex rounded-full bg-white/12 px-4 py-2 text-sm font-semibold tracking-[0.2em]">
                  Smarter Tutor Booking
                </p>
                <h1 className="page-title max-w-3xl">{slides[0].title}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-100">{slides[0].text}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link to="/tutors" className="btn-primary bg-white !text-slate-900">
                    Explore Tutors
                  </Link>
                  <Link to="/register" className="btn-secondary !border-white/30 !bg-white/10 !text-white">
                    Start Your Account
                  </Link>
                </div>
              </motion.div>
            </div>

            <div className="grid gap-4">
              {slides.map((slide, index) => (
                <motion.article
                  key={slide.title}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 * index, duration: 0.45 }}
                  className="glass-card rounded-[32px] p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-bold uppercase tracking-[0.24em] text-[var(--brand)]">Slide 0{index + 1}</p>
                      <h3 className="mt-3 text-2xl font-bold">{slide.title}</h3>
                      <p className="mt-3 leading-7 muted-text">{slide.text}</p>
                    </div>
                    <Sparkles className="text-[var(--accent)]" />
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-gap">
        <div className="main-container">
          <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeader
              eyebrow="Available Tutors"
              title="Start with six standout tutors who are ready to teach."
              description="Each card pulls directly from the database so students can move from browsing to session booking without friction."
            />
            <Link to="/tutors" className="btn-secondary w-fit">
              See All Tutors
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

      <section className="section-gap">
        <div className="main-container grid gap-6 lg:grid-cols-3">
          {[
            {
              icon: GraduationCap,
              title: "Subject-first discovery",
              text: "Students can focus on the actual class they need instead of chasing tutors across social apps and message threads.",
            },
            {
              icon: CalendarCheck2,
              title: "Conflict-free scheduling",
              text: "Slots reduce automatically after booking, which keeps the schedule honest and protects learners from overbooking confusion.",
            },
            {
              icon: ShieldCheck,
              title: "Digital session token flow",
              text: "Every booking generates a clear digital token so the learner has a simple class record and confirmation reference.",
            },
          ].map((item) => (
            <article key={item.title} className="glass-card rounded-[30px] p-6">
              <item.icon className="text-[var(--brand)]" size={26} />
              <h3 className="mt-5 text-2xl font-bold">{item.title}</h3>
              <p className="mt-3 leading-7 muted-text">{item.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section-gap">
        <div className="main-container">
          <SectionHeader
            eyebrow="Why MediQueue"
            title="Built for learners who want a calmer, cleaner tutoring workflow."
            description="Two extra value sections keep the home page meaningful: how the product works and what students gain from it."
            align="center"
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <article className="glass-card rounded-[32px] p-8">
              <h3 className="text-2xl font-bold">How the booking flow works</h3>
              <ol className="mt-5 space-y-4 muted-text">
                <li>1. Create an account or sign in with Google.</li>
                <li>2. Browse tutors and filter by date or search by tutor name.</li>
                <li>3. Open tutor details and confirm the session booking.</li>
                <li>4. Receive your digital token and manage sessions from your dashboard.</li>
              </ol>
            </article>
            <article className="glass-card rounded-[32px] p-8">
              <h3 className="text-2xl font-bold">What students gain</h3>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[
                  "Fewer schedule mistakes",
                  "Clear tutor availability",
                  "Private learner dashboard",
                  "Fast access to online sessions",
                ].map((item) => (
                  <div key={item} className="rounded-[24px] bg-[var(--surface-strong)] px-4 py-5 font-semibold">
                    {item}
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
