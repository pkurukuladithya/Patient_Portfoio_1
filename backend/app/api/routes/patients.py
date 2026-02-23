from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.crud import patient as crud_patient
from app.db.session import get_db
from app.schemas.patient import PatientCreate, PatientOut, PatientUpdate

router = APIRouter(prefix="/api/patients", tags=["patients"])


@router.post("/", response_model=PatientOut, status_code=status.HTTP_201_CREATED)
def create_patient(payload: PatientCreate, db: Session = Depends(get_db)) -> PatientOut:
    return crud_patient.create_patient(db, payload)


@router.get("/", response_model=list[PatientOut])
def list_patients(db: Session = Depends(get_db)) -> list[PatientOut]:
    return crud_patient.get_patients(db)


@router.get("/{patient_id}", response_model=PatientOut)
def get_patient(patient_id: UUID, db: Session = Depends(get_db)) -> PatientOut:
    patient = crud_patient.get_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    return patient


@router.put("/{patient_id}", response_model=PatientOut)
def update_patient(patient_id: UUID, payload: PatientUpdate, db: Session = Depends(get_db)) -> PatientOut:
    patient = crud_patient.get_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    return crud_patient.update_patient(db, patient, payload)


@router.delete("/{patient_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_patient(patient_id: UUID, db: Session = Depends(get_db)) -> None:
    patient = crud_patient.get_patient(db, patient_id)
    if not patient:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Patient not found")
    crud_patient.delete_patient(db, patient)
    return None
