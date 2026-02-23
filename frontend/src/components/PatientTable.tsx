import type { Patient } from "../types";

type PatientTableProps = {
  patients: Patient[];
  loading: boolean;
  selectedId: string | null;
  onView: (id: string) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
};

const formatDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString();
};

export default function PatientTable({ patients, loading, selectedId, onView, onEdit, onDelete }: PatientTableProps) {
  return (
    <div className="table-wrap">
      <div className="table-header">
        <div>
          <p className="eyebrow">Portfolio List</p>
          <h2>Patients</h2>
        </div>
        <span className="chip">{patients.length} total</span>
      </div>

      {loading ? (
        <div className="table-empty">Loading patients...</div>
      ) : patients.length === 0 ? (
        <div className="table-empty">No patient portfolios yet.</div>
      ) : (
        <div className="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>DOB</th>
                <th>Gender</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Updated At</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((patient) => (
                <tr key={patient.id} className={selectedId === patient.id ? "selected" : undefined}>
                  <td>{patient.first_name} {patient.last_name}</td>
                  <td>{formatDate(patient.dob)}</td>
                  <td>{patient.gender ?? "N/A"}</td>
                  <td>{patient.phone ?? "N/A"}</td>
                  <td>{patient.email ?? "N/A"}</td>
                  <td>{formatDate(patient.updated_at)}</td>
                  <td>
                    <div className="actions">
                      <button className="button ghost" type="button" onClick={() => onView(patient.id)}>
                        View
                      </button>
                      <button className="button ghost" type="button" onClick={() => onEdit(patient)}>
                        Edit
                      </button>
                      <button className="button danger" type="button" onClick={() => onDelete(patient)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
