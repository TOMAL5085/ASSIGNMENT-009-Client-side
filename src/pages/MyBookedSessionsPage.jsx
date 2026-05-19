import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import EmptyState from "../components/shared/EmptyState";
import Modal from "../components/shared/Modal";
import SectionHeader from "../components/shared/SectionHeader";
import Spinner from "../components/shared/Spinner";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";

export default function MyBookedSessionsPage() {
  useDocumentTitle("My Booked Sessions");
  const queryClient = useQueryClient();
  const [selectedBooking, setSelectedBooking] = useState(null);

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["my-bookings"],
    queryFn: async () => {
      const { data } = await api.get("/api/bookings/my-bookings");
      return data;
    },
  });

  const cancelMutation = useMutation({
    mutationFn: async (bookingId) => {
      const { data } = await api.patch(`/api/bookings/${bookingId}/cancel`);
      return data;
    },
    onSuccess: () => {
      toast.success("Your session has been cancelled.");
      setSelectedBooking(null);
      queryClient.invalidateQueries({ queryKey: ["my-bookings"] });
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
    },
  });

  if (isLoading) {
    return <Spinner label="Loading your bookings..." />;
  }

  return (
    <section className="section-gap">
      <div className="main-container">
        <SectionHeader
          eyebrow="Booked Sessions"
          title="Track every tutor session you have reserved."
          description="This table only shows bookings that belong to the currently logged-in learner, including session status and cancellation controls."
        />
        <div className="mt-10">
          {bookings.length ? (
            <div className="glass-card table-wrap rounded-[34px] p-4">
              <table className="app-table">
                <thead>
                  <tr>
                    <th>Tutor Name</th>
                    <th>Student Name</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Session Token</th>
                    <th>Cancel</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((booking) => (
                    <tr key={booking._id}>
                      <td>{booking.tutorName}</td>
                      <td>{booking.studentName}</td>
                      <td>{booking.studentEmail}</td>
                      <td>
                        <span className={`rounded-full px-3 py-1 text-sm font-semibold ${booking.status === "booked" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td>{booking.sessionToken}</td>
                      <td>
                        <button
                          type="button"
                          className="btn-secondary"
                          disabled={booking.status === "cancelled"}
                          onClick={() => setSelectedBooking(booking)}
                        >
                          Cancel
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <EmptyState
              title="No booked sessions yet."
              description="When you book a tutor session, it will appear here with the status, token, and a cancellation option."
            />
          )}
        </div>
      </div>

      {selectedBooking ? (
        <Modal title="Cancel Session" onClose={() => setSelectedBooking(null)}>
          <p className="muted-text">
            Are you sure you want to cancel your booking with <strong>{selectedBooking.tutorName}</strong>?
          </p>
          <div className="mt-8 flex gap-3">
            <button type="button" className="btn-secondary" onClick={() => setSelectedBooking(null)}>
              Keep Booking
            </button>
            <button type="button" className="rounded-full bg-rose-500 px-6 py-3 font-semibold text-white" onClick={() => cancelMutation.mutate(selectedBooking._id)}>
              Confirm Cancel
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}
