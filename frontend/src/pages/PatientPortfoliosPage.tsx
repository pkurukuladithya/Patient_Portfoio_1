import { useEffect, useMemo, useState } from "react";
import PatientForm from "../components/PatientForm";
import PatientProfile from "../components/PatientProfile";
import PatientTable from "../components/PatientTable";
import { createPatient, deletePatient, getPatient, listPatients, updatePatient } from "../api/patients";
import type { Patient, PatientCreate } from "../types";

const successTimeoutMs = 2500;

const normalizeError = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Unexpected error. Please try again.";
};

export default function PatientPortfoliosPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [editingPatient, setEditingPatient] = useState<Patient | null>(null);
  const [listLoading, setListLoading] = useState(false);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const selectedId = useMemo(() => selectedPatient?.id ?? null, [selectedPatient]);

  const loadPatients = async () => {
    setListLoading(true);
    setError(null);
    try {
      const data = await listPatients();
      setPatients(data);
      if (data.length === 0) {
        setSelectedPatient(null);
        setEditingPatient(null);
      }
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setListLoading(false);
    }
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleView = async (patientId: string) => {
    setDetailsLoading(true);
    setError(null);
    try {
      const data = await getPatient(patientId);
      setSelectedPatient(data);
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setDetailsLoading(false);
    }
  };

  const handleEdit = (patient: Patient) => {
    setEditingPatient(patient);
    setSelectedPatient(patient);
  };

  const handleDelete = async (patient: Patient) => {
    const confirmed = window.confirm(`Delete ${patient.first_name} ${patient.last_name}? This cannot be undone.`);
    if (!confirmed) return;

    setError(null);
    setFormLoading(true);
    try {
      await deletePatient(patient.id);
      await loadPatients();
      if (selectedPatient?.id === patient.id) setSelectedPatient(null);
      if (editingPatient?.id === patient.id) setEditingPatient(null);
      setSuccess("Patient deleted successfully.");
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setFormLoading(false);
      window.setTimeout(() => setSuccess(null), successTimeoutMs);
    }
  };

  const handleSubmit = async (payload: PatientCreate) => {
    setError(null);
    setFormLoading(true);
    try {
      if (editingPatient) {
        const updated = await updatePatient(editingPatient.id, payload);
        setSelectedPatient(updated);
        setSuccess("Patient updated successfully.");
      } else {
        const created = await createPatient(payload);
        setSelectedPatient(created);
        setSuccess("Patient created successfully.");
      }
      setEditingPatient(null);
      await loadPatients();
    } catch (err) {
      setError(normalizeError(err));
    } finally {
      setFormLoading(false);
      window.setTimeout(() => setSuccess(null), successTimeoutMs);
    }
  };

  const handleCancelEdit = () => {
    setEditingPatient(null);
  };

  return (
    <div className="page">
      <header className="page-header">
        <div>
          <p className="eyebrow">Patient Portfolio</p>
          <h1>Patient Portfolio Management</h1>
          <p className="subtitle">Create, track, and update patient profiles in one place.</p>
        </div>
        <button className="button ghost" type="button" onClick={loadPatients} disabled={listLoading}>
          Refresh
        </button>
      </header>

      {error && <div className="status error">{error}</div>}
      {success && <div className="status success">{success}</div>}

      <div className="layout">
        <section className="panel form-panel">
          <PatientForm
            mode={editingPatient ? "edit" : "create"}
            initialData={editingPatient}
            onSubmit={handleSubmit}
            onCancel={handleCancelEdit}
            loading={formLoading}
          />
        </section>

        <section className="panel table-panel">
          <PatientTable
            patients={patients}
            loading={listLoading}
            selectedId={selectedId}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </section>
      </div>

      <section className="panel profile-panel">
        <PatientProfile patient={selectedPatient} loading={detailsLoading} />
      </section>
    </div>
  );
}
