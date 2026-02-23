from datetime import date
from sqlalchemy import select

from app.db.session import SessionLocal
from app.models.enums import GenderEnum
from app.models.patient import Patient


def run() -> None:
    db = SessionLocal()
    try:
        existing = db.scalar(select(Patient.id).limit(1))
        if existing:
            print("Seed skipped: patients table already has data")
            return

        samples = [
            Patient(
                first_name="Avery",
                last_name="Lee",
                dob=date(1987, 5, 14),
                gender=GenderEnum.Female,
                phone="555-0101",
                email="avery.lee@example.com",
                address="101 Maple Ave, Springfield",
                notes="No known drug allergies. Annual checkup pending.",
            ),
            Patient(
                first_name="Jordan",
                last_name="Patel",
                dob=date(1992, 11, 2),
                gender=GenderEnum.Male,
                phone="555-0199",
                email="jordan.patel@example.com",
                address="22 River Rd, Lakeside",
                notes="Asthma since childhood; uses inhaler as needed.",
            ),
            Patient(
                first_name="Casey",
                last_name="Nguyen",
                dob=date(1979, 2, 23),
                gender=GenderEnum.Other,
                phone="555-0142",
                email="casey.nguyen@example.com",
                address="808 Oak St, Riverside",
                notes="Type 2 diabetes; monitors glucose daily.",
            ),
        ]

        db.add_all(samples)
        db.commit()
        print("Seed complete: inserted sample patients")
    finally:
        db.close()


if __name__ == "__main__":
    run()
