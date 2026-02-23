from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.patient import Patient
from app.schemas.patient import PatientCreate, PatientUpdate


def create_patient(db: Session, patient_in: PatientCreate) -> Patient:
    patient = Patient(**patient_in.model_dump())
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def get_patient(db: Session, patient_id) -> Patient | None:
    return db.scalar(select(Patient).where(Patient.id == patient_id))


def get_patients(db: Session) -> list[Patient]:
    stmt = select(Patient).order_by(Patient.updated_at.desc(), Patient.last_name.asc())
    return list(db.scalars(stmt))


def update_patient(db: Session, patient: Patient, patient_in: PatientUpdate) -> Patient:
    data = patient_in.model_dump(exclude_unset=True)
    for field, value in data.items():
        setattr(patient, field, value)
    db.add(patient)
    db.commit()
    db.refresh(patient)
    return patient


def delete_patient(db: Session, patient: Patient) -> None:
    db.delete(patient)
    db.commit()
