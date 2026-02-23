export type Gender = "Male" | "Female" | "Other" | "PreferNotToSay";

export interface Patient {
  id: string;
  first_name: string;
  last_name: string;
  dob: string;
  gender: Gender | null;
  phone: string | null;
  email: string | null;
  address: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export type PatientCreate = Omit<Patient, "id" | "created_at" | "updated_at">;
export type PatientUpdate = Partial<PatientCreate>;
