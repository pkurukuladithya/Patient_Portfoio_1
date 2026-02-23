import { useEffect, useState, type FormEvent } from "react";
import type { Gender, Patient, PatientCreate } from "../types";

const initialState = {
  first_name: "",
  last_name: "",
  dob: "",
  gender: "" as "" | Gender,
  phone: "",
  email: "",
  address: "",
  notes: "",
};

type PatientFormProps = {
  mode: "create" | "edit";
  initialData?: Patient | null;
  loading?: boolean;
  onSubmit: (payload: PatientCreate) => void | Promise<void>;
  onCancel?: () => void;
};

const emailRegex = /^\S+@\S+\.\S+$/;

export default function PatientForm({ mode, initialData, loading, onSubmit, onCancel }: PatientFormProps) {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (initialData && mode === "edit") {
      setForm({
        first_name: initialData.first_name ?? "",
        last_name: initialData.last_name ?? "",
        dob: initialData.dob ?? "",
        gender: (initialData.gender ?? "") as "" | Gender,
        phone: initialData.phone ?? "",
        email: initialData.email ?? "",
        address: initialData.address ?? "",
        notes: initialData.notes ?? "",
      });
      setErrors({});
      return;
    }
    setForm(initialState);
    setErrors({});
  }, [initialData, mode]);

  const handleChange = (field: keyof typeof initialState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const nextErrors: Record<string, string> = {};

    if (!form.first_name.trim()) nextErrors.first_name = "First name is required.";
    if (!form.last_name.trim()) nextErrors.last_name = "Last name is required.";
    if (!form.dob) nextErrors.dob = "Date of birth is required.";
    if (form.email && !emailRegex.test(form.email)) nextErrors.email = "Enter a valid email address.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!validate()) return;

    const payload: PatientCreate = {
      first_name: form.first_name.trim(),
      last_name: form.last_name.trim(),
      dob: form.dob,
      gender: form.gender === "" ? null : (form.gender as Gender),
      phone: form.phone.trim() ? form.phone.trim() : null,
      email: form.email.trim() ? form.email.trim() : null,
      address: form.address.trim() ? form.address.trim() : null,
      notes: form.notes.trim() ? form.notes.trim() : null,
    };

    onSubmit(payload);
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="form-header">
        <div>
          <p className="eyebrow">{mode === "edit" ? "Edit Patient" : "New Patient"}</p>
          <h2>{mode === "edit" ? "Update Portfolio" : "Create Portfolio"}</h2>
        </div>
        {mode === "edit" && (
          <button className="button ghost" type="button" onClick={onCancel} disabled={loading}>
            Cancel
          </button>
        )}
      </div>

      <div className="form-grid">
        <label className="field">
          <span>First Name *</span>
          <input
            type="text"
            value={form.first_name}
            onChange={(event) => handleChange("first_name", event.target.value)}
            placeholder="Jordan"
          />
          {errors.first_name && <small className="error-text">{errors.first_name}</small>}
        </label>

        <label className="field">
          <span>Last Name *</span>
          <input
            type="text"
            value={form.last_name}
            onChange={(event) => handleChange("last_name", event.target.value)}
            placeholder="Patel"
          />
          {errors.last_name && <small className="error-text">{errors.last_name}</small>}
        </label>

        <label className="field">
          <span>Date of Birth *</span>
          <input type="date" value={form.dob} onChange={(event) => handleChange("dob", event.target.value)} />
          {errors.dob && <small className="error-text">{errors.dob}</small>}
        </label>

        <label className="field">
          <span>Gender</span>
          <select value={form.gender} onChange={(event) => handleChange("gender", event.target.value)}>
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
            <option value="PreferNotToSay">Prefer not to say</option>
          </select>
        </label>

        <label className="field">
          <span>Phone</span>
          <input
            type="tel"
            value={form.phone}
            onChange={(event) => handleChange("phone", event.target.value)}
            placeholder="555-0101"
          />
        </label>

        <label className="field">
          <span>Email</span>
          <input
            type="email"
            value={form.email}
            onChange={(event) => handleChange("email", event.target.value)}
            placeholder="name@example.com"
          />
          {errors.email && <small className="error-text">{errors.email}</small>}
        </label>

        <label className="field field-full">
          <span>Address</span>
          <input
            type="text"
            value={form.address}
            onChange={(event) => handleChange("address", event.target.value)}
            placeholder="101 Maple Ave, Springfield"
          />
        </label>

        <label className="field field-full">
          <span>Notes</span>
          <textarea
            rows={4}
            value={form.notes}
            onChange={(event) => handleChange("notes", event.target.value)}
            placeholder="Medical history, allergies, treatment notes..."
          />
        </label>
      </div>

      <button className="button primary" type="submit" disabled={loading}>
        {loading ? "Saving..." : mode === "edit" ? "Save Changes" : "Create Patient"}
      </button>
    </form>
  );
}
