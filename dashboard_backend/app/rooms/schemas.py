from typing import List, Optional
from pydantic import BaseModel, UUID4
from datetime import datetime

class RoomBase(BaseModel):
    title: str
    description: Optional[str] = ""
    facilities: List[str] = []


class RoomOut(RoomBase):
    id: UUID4
    image: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        orm_mode = True
