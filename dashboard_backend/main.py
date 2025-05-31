from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from app.rooms.routers import rooms_router as room_router
from fastapi.staticfiles import StaticFiles
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(room_router, prefix="/api/v1")

app.mount(
    "/uploaded_images",
    StaticFiles(directory=os.path.join(os.path.dirname(__file__), "uploaded_images")),
    name="uploaded_images",
)


