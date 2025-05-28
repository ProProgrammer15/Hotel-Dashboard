from fastapi import APIRouter
from app.rooms.routers import rooms_router

root_api_router = APIRouter(prefix="/api/v1")
root_api_router.include_router(rooms_router)

