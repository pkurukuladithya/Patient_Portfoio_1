"""
Database configuration - Backward compatibility module
The main database setup is in app/db/session.py
This file is kept for reference and backward compatibility.
"""

from app.db.session import engine, SessionLocal
from app.db.base import Base

__all__ = ["engine", "SessionLocal", "Base"]

