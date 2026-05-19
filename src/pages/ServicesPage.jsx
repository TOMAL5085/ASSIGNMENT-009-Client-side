import useDocumentTitle from "../hooks/useDocumentTitle";

const services = [
  {
    title: "Tutor Booking",
    description: "Book tutors instantly based on subject, schedule, and current session availability.",
  },
  {
    title: "Verified Tutors",
    description: "Explore tutor profiles with clear details, teaching experience, and trusted academic backgrounds.",
  },
  {
    title: "Flexible Scheduling",
    description: "Choose time slots that fit your study routine without the usual back-and-forth coordination.",
  },
  {
    title: "Online & Offline Classes",
    description: "Pick online, offline, or hybrid learning modes depending on your location and comfort.",
  },
  {
    title: "Affordable Pricing",
    description: "Compare hourly fees and find tutor sessions that match both your goals and your budget.",
  },
  {
    title: "Instant Support",
    description: "Manage your bookings, session status, and learning plans from one calm dashboard experience.",
  },
];

export default function ServicesPage() {
  useDocumentTitle("Services");

  return (
    <section className="section-gap">
      <div className="main-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">Our Services</p>
          <h1 className="page-title mt-6">Everything you need for a better tutoring experience.</h1>
          <p className="mt-5 text-lg leading-8 muted-text">
            MediQueue brings booking, availability tracking, and study planning into one organized platform for students and tutors.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service) => (
            <article key={service.title} className="soft-card rounded-[30px] p-9">
              <h2 className="font-[Space_Grotesk] text-[2rem] font-bold leading-tight">
                {service.title}
              </h2>
              <p className="mt-5 text-lg leading-8 muted-text">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
