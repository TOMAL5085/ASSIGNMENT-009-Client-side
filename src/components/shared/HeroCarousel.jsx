import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    eyebrow: "Expert Mentorship",
    title: "Find the perfect tutor for your learning journey.",
    description: "Connect with experienced educators across various subjects and levels. From school curriculum to specialized skills, we have the right fit for you.",
    cta: "Explore Tutors",
    link: "/tutors",
    bg: "var(--hero)",
  },
  {
    id: 2,
    eyebrow: "Seamless Booking",
    title: "Schedule learning sessions with absolute ease.",
    description: "No more endless back-and-forth. View real-time availability, select your preferred slot, and confirm your booking in just a few clicks.",
    cta: "View All Tutors",
    link: "/tutors",
    bg: "var(--hero)",
  },
  {
    id: 3,
    eyebrow: "Organized Progress",
    title: "Track your booked sessions from one dashboard.",
    description: "Stay on top of your schedule with a dedicated learner dashboard. Access your session tokens, manage upcoming classes, and review your progress.",
    cta: "Find Your Tutor",
    link: "/tutors",
    bg: "var(--hero)",
  },
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative overflow-hidden rounded-[38px] border border-[var(--border)]">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="px-7 py-10 md:px-12 md:py-14"
          style={{ background: slides[current].bg }}
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-5 inline-flex rounded-full bg-[var(--brand-soft)] px-4 py-2 text-sm font-bold uppercase tracking-[0.22em] text-[var(--brand-dark)]"
          >
            {slides[current].eyebrow}
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="hero-title max-w-3xl"
          >
            {slides[current].title}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-6 max-w-2xl text-lg leading-8 muted-text"
          >
            {slides[current].description}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-9 flex flex-wrap gap-4"
          >
            <Link to={slides[current].link} className="btn-primary inline-flex items-center gap-2">
              {slides[current].cta} <ArrowRight size={18} />
            </Link>
            <Link to="/register" className="btn-secondary">
              Create Student Account
            </Link>
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <div className="absolute bottom-6 right-8 flex gap-2">
        <button
          onClick={prevSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all hover:bg-[var(--brand)] hover:text-white shadow-sm"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={nextSlide}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] bg-[var(--surface)] transition-all hover:bg-[var(--brand)] hover:text-white shadow-sm"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <div className="absolute bottom-10 left-12 flex gap-2">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`h-2 rounded-full transition-all ${
              current === idx ? "w-8 bg-[var(--brand)]" : "w-2 bg-[var(--border)]"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
