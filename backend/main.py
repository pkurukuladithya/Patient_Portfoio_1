"""
Patient Portfolio API - Main Entry Point
This module serves as the entry point for running the FastAPI application.
The actual app logic is in app/main.py
"""

from app.main import app

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True,
    )

