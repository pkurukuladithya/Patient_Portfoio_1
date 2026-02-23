"""
Schemas - Backward compatibility module
The actual schemas are in app/schemas/
This file is kept for reference and backward compatibility.
"""

from app.schemas.patient import PatientCreate, PatientUpdate, PatientOut, PatientBase

__all__ = ["PatientCreate", "PatientUpdate", "PatientOut", "PatientBase"]

