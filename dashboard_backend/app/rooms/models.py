import uuid
from sqlalchemy import Column, String, DateTime
from sqlalchemy.dialects.sqlite import JSON
from sqlalchemy.sql import func
from app.config.database import Base

class Room(Base):
    __tablename__ = "rooms"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    image = Column(String, nullable=True)  
    facilities = Column(JSON, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    def __repr__(self):
        return f"<Room(id={self.id}, title={self.title}, created_at={self.created_at})>"