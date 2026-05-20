import { Upload } from "lucide-react";

const subjectOptions = [
  "Mathematics",
  "Physics",
  "Chemistry",
  "Biology",
  "English",
  "ICT",
  "Accounting",
  "Economics",
];

const modeOptions = ["Online", "Offline", "Both"];

export default function TutorFormFields({ register, errors, handleImageUpload, uploading, photoURL }) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block font-semibold">Tutor Name</label>
        <input className="field" {...register("tutorName", { required: "Tutor name is required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.tutorName?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Tutor Photo</label>
        <div className="relative">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            id="photo-upload"
            onChange={handleImageUpload}
          />
          <label
            htmlFor="photo-upload"
            className={`field flex cursor-pointer items-center justify-center gap-3 border-dashed py-3 text-center transition-all ${
              uploading ? "opacity-50" : "hover:border-[var(--brand)]"
            }`}
          >
            {uploading ? (
              <span className="animate-pulse">Uploading...</span>
            ) : photoURL ? (
              <div className="flex items-center gap-3">
                <img src={photoURL} alt="Preview" className="h-8 w-8 rounded-full object-cover" />
                <span className="text-sm font-medium text-[var(--brand)]">Change Photo</span>
              </div>
            ) : (
              <>
                <Upload size={18} className="text-[var(--muted)]" />
                <span className="text-[var(--muted)]">Upload photo</span>
              </>
            )}
          </label>
          <input type="hidden" {...register("photo", { required: "Photo is required." })} />
        </div>
        <p className="mt-2 text-sm text-rose-500">{errors.photo?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Subject / Category</label>
        <select className="field" {...register("subject", { required: "Subject is required." })}>
          <option value="">Select a subject</option>
          {subjectOptions.map((subject) => (
            <option key={subject} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-rose-500">{errors.subject?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Teaching Mode</label>
        <select className="field" {...register("teachingMode", { required: "Teaching mode is required." })}>
          <option value="">Select teaching mode</option>
          {modeOptions.map((mode) => (
            <option key={mode} value={mode}>
              {mode}
            </option>
          ))}
        </select>
        <p className="mt-2 text-sm text-rose-500">{errors.teachingMode?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Available Days</label>
        <input className="field" placeholder="Sun - Thu" {...register("availableDays", { required: "Available days are required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.availableDays?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Available Time Slot</label>
        <input className="field" placeholder="5:00 PM - 8:00 PM" {...register("availableTimeSlot", { required: "Available time slot is required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.availableTimeSlot?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Hourly Fee</label>
        <input type="number" min="0" className="field" {...register("hourlyFee", { required: "Hourly fee is required.", valueAsNumber: true })} />
        <p className="mt-2 text-sm text-rose-500">{errors.hourlyFee?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Total Slot</label>
        <input type="number" min="0" className="field" {...register("totalSlot", { required: "Total slot is required.", valueAsNumber: true })} />
        <p className="mt-2 text-sm text-rose-500">{errors.totalSlot?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Session Start Date</label>
        <input type="date" className="field" {...register("sessionStartDate", { required: "Session date is required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.sessionStartDate?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Location</label>
        <input className="field" placeholder="Area / City" {...register("location", { required: "Location is required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.location?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Institution</label>
        <input className="field" {...register("institution", { required: "Institution is required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.institution?.message}</p>
      </div>
      <div>
        <label className="mb-2 block font-semibold">Experience</label>
        <input className="field" placeholder="5 years of tutoring HSC Math" {...register("experience", { required: "Experience is required." })} />
        <p className="mt-2 text-sm text-rose-500">{errors.experience?.message}</p>
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block font-semibold">Tutor Overview</label>
        <textarea rows="4" className="field" placeholder="Explain your teaching style, strengths, and learner support." {...register("description")} />
      </div>
    </div>
  );
}
