import os
import shutil
import uuid
from fastapi import UploadFile, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy.exc import SQLAlchemyError
from app.rooms import models, schemas
from typing import List, Optional

UPLOAD_DIR = "uploaded_images"
ALLOWED_IMAGE_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}

os.makedirs(UPLOAD_DIR, exist_ok=True)


async def save_image(file: UploadFile) -> str:
    file_ext = os.path.splitext(file.filename)[1].lower()
    if file_ext not in ALLOWED_IMAGE_EXTENSIONS:
        raise HTTPException(status_code=400, detail="Unsupported image format.")

    filename = f"{uuid.uuid4()}{file_ext}"
    file_path = os.path.join(UPLOAD_DIR, filename)

    try:
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
    except Exception:
        raise HTTPException(status_code=500, detail="Failed to save image.")

    return f"/{UPLOAD_DIR}/{filename}"


async def delete_image(path: str):
    try:
        full_path = path.lstrip("/")
        if os.path.exists(full_path):
            os.remove(full_path)
    except Exception as e:
        print(f"Warning: could not delete image: {e}")


async def create_room(db: Session, data: schemas.RoomBase, image: UploadFile) -> models.Room:
    try:
        image_path = await save_image(image) if image else None
        room = models.Room(**data.model_dump(), image=image_path)
        db.add(room)
        db.commit()
        db.refresh(room)
        return room
    except SQLAlchemyError as e:
        db.rollback()
        raise HTTPException(status_code=500, detail="Database error occurred.")


async def get_rooms(db: Session) -> List[models.Room]:
    return db.query(models.Room).all()


async def get_room(db: Session, room_id: str) -> Optional[models.Room]:
    room = db.query(models.Room).filter(models.Room.id == room_id).first()
    return room


async def update_room(db: Session, room_id: str, data: schemas.RoomBase, image: UploadFile = None) -> Optional[models.Room]:
    room = await get_room(db, room_id)
    if not room:
        return None

    for key, value in data.model_dump().items():
        if value not in [None, "", []]:
            setattr(room, key, value)

    if image:
        await delete_image(room.image)
        room.image = await save_image(image)

    try:
        db.commit()
        db.refresh(room)
        return room
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to update room.")


async def delete_room(db: Session, room_id: str) -> bool:
    room = await get_room(db, room_id)
    if not room:
        return False

    await delete_image(room.image)
    try:
        db.delete(room)
        db.commit()
        return True
    except SQLAlchemyError:
        db.rollback()
        raise HTTPException(status_code=500, detail="Failed to delete room.")
