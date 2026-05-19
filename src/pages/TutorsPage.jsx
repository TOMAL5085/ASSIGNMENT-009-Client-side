import { useQuery } from "@tanstack/react-query";
import { CalendarRange, Search } from "lucide-react";
import { useState } from "react";
import fallbackTutors from "../data/fallbackTutors";
import EmptyState from "../components/shared/EmptyState";
import Spinner from "../components/shared/Spinner";
import TutorCard from "../components/shared/TutorCard";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";

export default function TutorsPage() {
  useDocumentTitle("Tutors");
  const [search, setSearch] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["tutors", search, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams();

      if (search) params.set("search", search);
      if (startDate) params.set("startDate", startDate);
      if (endDate) params.set("endDate", endDate);

      try {
        const { data } = await api.get(`/api/tutors?${params.toString()}`);
        if (Array.isArray(data) && data.length) {
          return data;
        }
      } catch {
        // Fall through to a local dataset so the page remains populated during demos.
      }

      let localTutors = [...fallbackTutors];

      if (search.trim()) {
        const term = search.trim().toLowerCase();
        localTutors = localTutors.filter((tutor) =>
          tutor.tutorName.toLowerCase().includes(term),
        );
      }

      if (startDate) {
        const start = new Date(startDate);
        localTutors = localTutors.filter(
          (tutor) => new Date(tutor.sessionStartDate) >= start,
        );
      }

      if (endDate) {
        const end = new Date(endDate);
        localTutors = localTutors.filter(
          (tutor) => new Date(tutor.sessionStartDate) <= end,
        );
      }

      return localTutors;
    },
  });

  return (
    <section className="section-gap">
      <div className="main-container">
        <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
          <div>
            <p className="eyebrow">Tutor Directory</p>
            <h1 className="page-title mt-5">
              Search tutors by name and narrow your options by session date.
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 muted-text">
              Use case-insensitive search to find a tutor quickly, then apply date filters to focus on the session window that fits your plan.
            </p>
          </div>

          <div
            className="strong-card flex min-h-[320px] items-center rounded-[34px] px-7 py-8 text-white"
            style={{ background: "var(--hero-strong)" }}
          >
            <div className="grid w-full gap-4 sm:grid-cols-2">
              <article className="rounded-[24px] border border-white/15 bg-white/10 p-5">
                <Search size={20} />
                <h3 className="mt-4 text-xl font-bold">Name search</h3>
                <p className="mt-2 text-sm leading-6 text-white/76">
                  Find tutors by name without worrying about exact letter casing.
                </p>
              </article>
              <article className="rounded-[24px] border border-white/15 bg-white/10 p-5">
                <CalendarRange size={20} />
                <h3 className="mt-4 text-xl font-bold">Date filtering</h3>
                <p className="mt-2 text-sm leading-6 text-white/76">
                  Focus on tutors whose session dates fall inside your desired booking range.
                </p>
              </article>
            </div>
          </div>
        </div>

        <div className="glass-card mt-10 rounded-[34px] p-6 md:p-7">
          <div className="grid gap-5 xl:grid-cols-[1fr_1fr_1fr_0.95fr] xl:items-end">
            <label className="block">
              <span className="mb-3 block text-lg font-semibold text-[var(--text)]">
                Search Tutor
              </span>
              <input
                className="field"
                placeholder="Search tutor by name..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-lg font-semibold text-[var(--text)]">
                Start Date
              </span>
              <input
                type="date"
                className="field"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
            </label>

            <label className="block">
              <span className="mb-3 block text-lg font-semibold text-[var(--text)]">
                End Date
              </span>
              <input
                type="date"
                className="field"
                value={endDate}
                onChange={(event) => setEndDate(event.target.value)}
              />
            </label>

            <button
              type="button"
              className="field bg-[var(--surface)] px-6 text-lg font-semibold text-[var(--text)]"
              onClick={() => {
                setSearch("");
                setStartDate("");
                setEndDate("");
              }}
            >
              Reset Filters
            </button>
          </div>
        </div>

        <div className="mt-10">
          {isLoading ? (
            <Spinner label="Loading tutors..." />
          ) : tutors.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {tutors.map((tutor) => (
                <TutorCard key={tutor._id} tutor={tutor} />
              ))}
            </div>
          ) : (
            <EmptyState
              title="No tutors matched your filters."
              description="Try adjusting the tutor name search or widen the session date range to discover more classes."
            />
          )}
        </div>
      </div>
    </section>
  );
}
