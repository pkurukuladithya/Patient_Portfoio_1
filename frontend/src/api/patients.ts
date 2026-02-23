import apiClient from "./client";
import type { Patient, PatientCreate, PatientUpdate } from "../types";

export async function listPatients(): Promise<Patient[]> {
  const response = await apiClient.get<Patient[]>("/api/patients");
  return response.data;
}

export async function getPatient(id: string): Promise<Patient> {
  const response = await apiClient.get<Patient>(`/api/patients/${id}`);
  return response.data;
}

export async function createPatient(payload: PatientCreate): Promise<Patient> {
  const response = await apiClient.post<Patient>("/api/patients", payload);
  return response.data;
}

export async function updatePatient(id: string, payload: PatientUpdate): Promise<Patient> {
  const response = await apiClient.put<Patient>(`/api/patients/${id}`, payload);
  return response.data;
}

export async function deletePatient(id: string): Promise<void> {
  await apiClient.delete(`/api/patients/${id}`);
}
