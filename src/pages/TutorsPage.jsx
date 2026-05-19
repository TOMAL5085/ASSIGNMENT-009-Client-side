import { useQuery } from "@tanstack/react-query";
import { Search } from "lucide-react";
import { useState } from "react";
import EmptyState from "../components/shared/EmptyState";
import SectionHeader from "../components/shared/SectionHeader";
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

      const { data } = await api.get(`/api/tutors?${params.toString()}`);
      return data;
    },
  });

  return (
    <section className="section-gap">
      <div className="main-container">
        <SectionHeader
          eyebrow="Tutor Directory"
          title="Search tutors by name and narrow your options by the registration session date range."
          description="The search supports case-insensitive matching, while date filters help students focus on tutors whose sessions align with their study plans."
        />

        <div className="glass-card mt-10 rounded-[32px] p-6">
          <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr_0.8fr_auto]">
            <label className="relative block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--muted)]" size={18} />
              <input
                className="field pl-11"
                placeholder="Search tutor name"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </label>
            <input type="date" className="field" value={startDate} onChange={(event) => setStartDate(event.target.value)} />
            <input type="date" className="field" value={endDate} onChange={(event) => setEndDate(event.target.value)} />
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setSearch("");
                setStartDate("");
                setEndDate("");
              }}
            >
              Clear
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
