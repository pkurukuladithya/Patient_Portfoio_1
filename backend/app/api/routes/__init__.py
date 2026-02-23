from fastapi import APIRouter
from app.api.routes.patients import router as patients_router

api_router = APIRouter()
api_router.include_router(patients_router)
