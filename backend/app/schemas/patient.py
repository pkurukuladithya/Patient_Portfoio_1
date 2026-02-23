from datetime import date, datetime
from uuid import UUID
from pydantic import BaseModel, EmailStr, Field, ConfigDict

from app.models.enums import GenderEnum


class PatientBase(BaseModel):
    first_name: str = Field(..., min_length=1, max_length=100)
    last_name: str = Field(..., min_length=1, max_length=100)
    dob: date
    gender: GenderEnum | None = None
    phone: str | None = Field(default=None, max_length=50)
    email: EmailStr | None = None
    address: str | None = None
    notes: str | None = None


class PatientCreate(PatientBase):
    pass


class PatientUpdate(BaseModel):
    first_name: str | None = Field(default=None, min_length=1, max_length=100)
    last_name: str | None = Field(default=None, min_length=1, max_length=100)
    dob: date | None = None
    gender: GenderEnum | None = None
    phone: str | None = Field(default=None, max_length=50)
    email: EmailStr | None = None
    address: str | None = None
    notes: str | None = None

    model_config = ConfigDict(extra="forbid")


class PatientOut(PatientBase):
    id: UUID
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
