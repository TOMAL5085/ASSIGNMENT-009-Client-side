import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CalendarClock, LayoutList, MapPinHouse } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import TutorFormFields from "../components/forms/TutorFormFields";
import EmptyState from "../components/shared/EmptyState";
import Modal from "../components/shared/Modal";
import SectionHeader from "../components/shared/SectionHeader";
import Spinner from "../components/shared/Spinner";
import useDocumentTitle from "../hooks/useDocumentTitle";
import api from "../lib/api";
import uploadImageToImgbb from "../lib/uploadImageToImgbb";

export default function MyTutorsPage() {
  useDocumentTitle("My Tutors");
  const queryClient = useQueryClient();
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [deletingTutor, setDeletingTutor] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [photoURL, setPhotoURL] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadImageToImgbb(file);
      setPhotoURL(url);
      setValue("photo", url, { shouldValidate: true });
      toast.success("Photo uploaded successfully!");
    } catch (error) {
      console.error("Upload Error:", error);
      toast.error(error.message || "Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const { data: tutors = [], isLoading } = useQuery({
    queryKey: ["my-tutors"],
    queryFn: async () => {
      const { data } = await api.get("/api/tutors/my-tutors");
      return data;
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, payload }) => {
      const { data } = await api.patch(`/api/tutors/${id}`, payload);
      return data;
    },
    onSuccess: () => {
      toast.success("Tutor details updated successfully.");
      setSelectedTutor(null);
      setPhotoURL("");
      queryClient.invalidateQueries({ queryKey: ["my-tutors"] });
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const { data } = await api.delete(`/api/tutors/${id}`);
      return data;
    },
    onSuccess: (data) => {
      toast.success(data.message);
      setDeletingTutor(null);
      queryClient.invalidateQueries({ queryKey: ["my-tutors"] });
      queryClient.invalidateQueries({ queryKey: ["tutors"] });
    },
  });

  if (isLoading) {
    return <Spinner label="Loading your tutors..." />;
  }

  return (
    <section className="section-gap">
      <div className="main-container">
        <SectionHeader
          eyebrow="My Tutor Listings"
          title="Review, update, and remove the tutors you have published."
          description="Changes reflect immediately after saving, so your latest availability and details stay visible without a page refresh."
        />

        <div className="mt-10">
          {tutors.length ? (
            <>
              <div className="mb-6 grid gap-4 md:grid-cols-3">
                <article className="soft-card rounded-[24px] p-5">
                  <LayoutList size={20} className="text-[var(--brand)]" />
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Published Tutors</p>
                  <p className="mt-2 text-3xl font-black">{tutors.length}</p>
                </article>
                <article className="soft-card rounded-[24px] p-5">
                  <CalendarClock size={20} className="text-[var(--brand)]" />
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Upcoming Sessions</p>
                  <p className="mt-2 text-base font-semibold muted-text">Listings can be updated instantly when your dates shift.</p>
                </article>
                <article className="soft-card rounded-[24px] p-5">
                  <MapPinHouse size={20} className="text-[var(--brand)]" />
                  <p className="mt-3 text-sm font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Delivery Modes</p>
                  <p className="mt-2 text-base font-semibold muted-text">Keep online, offline, and hybrid options current for students.</p>
                </article>
              </div>

              <div className="glass-card table-wrap rounded-[34px] p-4">
                <table className="app-table">
                  <thead>
                    <tr>
                      <th>Tutor</th>
                      <th>Subject</th>
                      <th>Slots</th>
                      <th>Session Date</th>
                      <th>Mode</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tutors.map((tutor) => (
                      <tr key={tutor._id}>
                        <td>
                          <div className="flex items-center gap-3">
                            <img src={tutor.photo} alt={tutor.tutorName} className="h-12 w-12 rounded-2xl object-cover" />
                            <div>
                              <p className="font-semibold">{tutor.tutorName}</p>
                              <p className="text-sm muted-text">{tutor.location}</p>
                            </div>
                          </div>
                        </td>
                        <td>{tutor.subject}</td>
                        <td>{tutor.totalSlot}</td>
                        <td>{new Date(tutor.sessionStartDate).toLocaleDateString()}</td>
                        <td>{tutor.teachingMode}</td>
                        <td>
                          <div className="flex gap-2">
                            <button
                              type="button"
                              className="btn-secondary"
                              onClick={() => {
                                setSelectedTutor(tutor);
                                setPhotoURL(tutor.photo);
                                reset({
                                  ...tutor,
                                  sessionStartDate: new Date(tutor.sessionStartDate).toISOString().slice(0, 10),
                                });
                              }}
                            >
                              Update
                            </button>
                            <button type="button" className="rounded-full bg-rose-500 px-4 py-2 font-semibold text-white" onClick={() => setDeletingTutor(tutor)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          ) : (
            <EmptyState
              title="No tutors added yet."
              description="Once you publish your first tutor listing, it will appear here with update and delete controls."
            />
          )}
        </div>
      </div>

      {selectedTutor ? (
        <Modal
          title="Update Tutor"
          onClose={() => {
            setSelectedTutor(null);
            setPhotoURL("");
          }}
        >
          <form
            onSubmit={handleSubmit((formData) =>
              updateMutation.mutate({
                id: selectedTutor._id,
                payload: formData,
              })
            )}
          >
            <TutorFormFields
              register={register}
              errors={errors}
              handleImageUpload={handleImageUpload}
              uploading={uploading}
              photoURL={photoURL}
            />
            <div className="mt-8">
              <button type="submit" className="btn-primary" disabled={updateMutation.isPending || uploading}>
                {updateMutation.isPending ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Modal>
      ) : null}

      {deletingTutor ? (
        <Modal title="Delete Tutor" onClose={() => setDeletingTutor(null)}>
          <p className="muted-text">
            Are you sure you want to remove <strong>{deletingTutor.tutorName}</strong>? This will also remove its related booking records.
          </p>
          <div className="mt-8 flex gap-3">
            <button type="button" className="btn-secondary" onClick={() => setDeletingTutor(null)}>
              Keep Tutor
            </button>
            <button type="button" className="rounded-full bg-rose-500 px-6 py-3 font-semibold text-white" onClick={() => deleteMutation.mutate(deletingTutor._id)}>
              Confirm Delete
            </button>
          </div>
        </Modal>
      ) : null}
    </section>
  );
}
