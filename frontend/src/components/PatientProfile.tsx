import type { Patient } from "../types";

type PatientProfileProps = {
  patient: Patient | null;
  loading: boolean;
};

const formatDate = (value?: string | null) => {
  if (!value) return "N/A";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

export default function PatientProfile({ patient, loading }: PatientProfileProps) {
  return (
    <div className="profile">
      <div className="profile-header">
        <div>
          <p className="eyebrow">Selected Portfolio</p>
          <h2>Patient Details</h2>
        </div>
        {loading && <span className="chip">Loading...</span>}
      </div>

      {!patient && !loading && <p className="muted">Select a patient to view full details.</p>}

      {patient && (
        <div className="profile-grid">
          <div>
            <span className="label">Full Name</span>
            <p>{patient.first_name} {patient.last_name}</p>
          </div>
          <div>
            <span className="label">DOB</span>
            <p>{formatDate(patient.dob)}</p>
          </div>
          <div>
            <span className="label">Gender</span>
            <p>{patient.gender ?? "N/A"}</p>
          </div>
          <div>
            <span className="label">Phone</span>
            <p>{patient.phone ?? "N/A"}</p>
          </div>
          <div>
            <span className="label">Email</span>
            <p>{patient.email ?? "N/A"}</p>
          </div>
          <div>
            <span className="label">Address</span>
            <p>{patient.address ?? "N/A"}</p>
          </div>
          <div className="profile-notes">
            <span className="label">Notes</span>
            <p>{patient.notes ?? "N/A"}</p>
          </div>
          <div>
            <span className="label">Created At</span>
            <p>{formatDate(patient.created_at)}</p>
          </div>
          <div>
            <span className="label">Updated At</span>
            <p>{formatDate(patient.updated_at)}</p>
          </div>
        </div>
      )}
    </div>
  );
}
