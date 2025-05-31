from fastapi import APIRouter, Depends, HTTPException, UploadFile, Form, status, File
from sqlalchemy.orm import Session
from typing import List, Optional
from app.config.deps import get_db
from app.rooms import services, schemas
from app.rooms.utils import parse_facilities

rooms_router = APIRouter(prefix="/rooms", tags=["Rooms"])


@rooms_router.post("/", response_model=schemas.RoomOut)
async def create_room(
        title: str = Form(...),
        description: str = Form(""),
        facilities: str = Form("[]"),
        image: Optional[UploadFile] = File(None),
        db: Session = Depends(get_db)
):
    facilities_list = await parse_facilities(facilities)

    data = schemas.RoomBase(
        title=title,
        description=description,
        facilities=facilities_list
    )

    return await services.create_room(db, data, image)


@rooms_router.get("/", response_model=List[schemas.RoomOut])
async def list_rooms(db: Session = Depends(get_db)):
    return await services.get_rooms(db)


@rooms_router.get("/{room_id}", response_model=schemas.RoomOut)
async def read_room(room_id: str, db: Session = Depends(get_db)):
    room = await services.get_room(db, room_id)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room


@rooms_router.put("/{room_id}", response_model=schemas.RoomOut)
async def update_room(
        room_id: str,
        title: str = Form(...),
        description: str = Form(""),
        facilities: str = Form("[]"),
        image: Optional[UploadFile] = File(None),
        db: Session = Depends(get_db)
):

    facilities_list = await parse_facilities(facilities)

    data = schemas.RoomBase(
        title=title,
        description=description,
        facilities=facilities_list
    )

    room = await services.update_room(db, room_id, data, image)
    if not room:
        raise HTTPException(status_code=404, detail="Room not found")
    return room


@rooms_router.delete("/{room_id}", response_model=dict)
async def delete_room(room_id: str, db: Session = Depends(get_db)):
    success = await services.delete_room(db, room_id)
    if not success:
        raise HTTPException(status_code=404, detail="Room not found")
    return {"message": "Room deleted"}

