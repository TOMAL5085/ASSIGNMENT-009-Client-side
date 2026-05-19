import useDocumentTitle from "../hooks/useDocumentTitle";

const reasons = [
  "Verified tutors with clear subject and experience details",
  "Easy booking flow with digital session token generation",
  "Flexible time slots for online, offline, and hybrid learning",
  "Affordable hourly pricing across multiple subjects",
];

export default function AboutPage() {
  useDocumentTitle("About");

  return (
    <section className="section-gap">
      <div className="main-container">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow">About MediQueue</p>
          <h1 className="page-title mt-6">Smart tutor booking built for modern learning.</h1>
          <p className="mt-5 text-lg leading-8 muted-text">
            MediQueue helps students discover tutors, manage availability, and book sessions without the usual scheduling stress.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-5xl gap-8">
          <article className="soft-card rounded-[30px] p-9">
            <h2 className="font-[Space_Grotesk] text-[2.1rem] font-bold leading-tight">
              Who We Are
            </h2>
            <p className="mt-6 text-lg leading-8 muted-text">
              MediQueue is a modern tutor booking platform designed to connect students with qualified tutors more easily. The platform focuses on clear tutor information, real-time availability, structured booking, and a calmer learning experience from the first click.
            </p>
          </article>

          <article className="soft-card rounded-[30px] p-9">
            <h2 className="font-[Space_Grotesk] text-[2.1rem] font-bold leading-tight">
              Our Mission
            </h2>
            <p className="mt-6 text-lg leading-8 muted-text">
              We aim to make education more accessible, flexible, and efficient by helping students find the right tutor at the right time with less manual coordination and fewer booking conflicts.
            </p>
          </article>

          <article className="soft-card rounded-[30px] p-9">
            <h2 className="font-[Space_Grotesk] text-[2.1rem] font-bold leading-tight">
              Why Choose Us
            </h2>
            <ul className="mt-6 space-y-4 text-lg leading-8 muted-text">
              {reasons.map((reason) => (
                <li key={reason} className="flex items-start gap-3">
                  <span className="mt-3 h-2.5 w-2.5 rounded-full bg-[var(--brand)]" />
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
          </article>
        </div>
      </div>
    </section>
  );
}
