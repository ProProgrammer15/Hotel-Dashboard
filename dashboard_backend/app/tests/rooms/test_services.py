from app.rooms import services, schemas, models
import pytest
from sqlalchemy.exc import SQLAlchemyError
from unittest.mock import patch, MagicMock
import io
from fastapi import UploadFile, HTTPException

@pytest.mark.asyncio
async def test_create_room_success(db):
    data = schemas.RoomBase(title="Service Test", description="A room", facilities=["WiFi"])
    room = await services.create_room(db, data, image=None)
    assert room.title == "Service Test"
    assert room.id is not None
@pytest.mark.asyncio
async def test_get_rooms_returns_list(db):
    rooms = await services.get_rooms(db)
    assert isinstance(rooms, list)
@pytest.mark.asyncio
async def test_get_room_valid_id(db):
    rooms = await services.get_rooms(db)
    room = rooms[0]
    found = await services.get_room(db, room.id)
    assert found.id == room.id
@pytest.mark.asyncio
async def test_get_room_invalid_id_returns_none(db):
    result = await services.get_room(db, "non-existent-id")
    assert result is None
@pytest.mark.asyncio
async def test_update_room_valid_id(db):
    rooms = await services.get_rooms(db)
    room = rooms[0]
    data = schemas.RoomBase(title="Updated Room", description="", facilities=["TV"])
    updated = await services.update_room(db, room.id, data)
    assert updated.title == "Updated Room"
@pytest.mark.asyncio
async def test_update_room_invalid_id(db):
    data = schemas.RoomBase(title="Fake", description="", facilities=["TV"])
    result = await services.update_room(db, "invalid-id", data)
    assert result is None
@pytest.mark.asyncio
async def test_delete_room_success(db):
    room = await services.create_room(
        db,
        schemas.RoomBase(title="Delete Me", description="", facilities=[]),
        image=None
    )
    success = await services.delete_room(db, room.id)
    assert success is True
@pytest.mark.asyncio
async def test_delete_room_invalid_id(db):
    result = await services.delete_room(db, "invalid-id")
    assert result is False


@pytest.mark.asyncio
async def test_save_image_invalid_extension():
    bad_file = UploadFile(filename="bad_file.txt", file=io.BytesIO(b"test"))
    with pytest.raises(HTTPException) as exc_info:
        await services.save_image(bad_file)
    assert exc_info.value.status_code == 400

@pytest.mark.asyncio
async def test_save_image_write_failure(monkeypatch):
    valid_file = UploadFile(filename="test.jpg", file=io.BytesIO(b"data"))

    def fail_write(*args, **kwargs):
        raise IOError("Simulated failure")

    monkeypatch.setattr("builtins.open", lambda *a, **kw: MagicMock(__enter__=lambda s: s, __exit__=lambda *a: None, write=fail_write))

    with pytest.raises(HTTPException) as exc_info:
        await services.save_image(valid_file)
    assert exc_info.value.status_code == 500

@pytest.mark.asyncio
async def test_delete_image_file_not_exist(monkeypatch):
    monkeypatch.setattr("os.path.exists", lambda path: False)

    await services.delete_image("/nonexistent/file.jpg")


@pytest.mark.asyncio
async def test_delete_image_exception(monkeypatch):
    monkeypatch.setattr("os.path.exists", lambda path: True)
    monkeypatch.setattr("os.remove", lambda path: (_ for _ in ()).throw(Exception("simulated delete error")))
    await services.delete_image("/will/fail.jpg")  # Should not raise; just log

@pytest.mark.asyncio
async def test_create_room_db_error(db, monkeypatch):
    data = schemas.RoomBase(title="x", description="x", facilities=["x"])
    monkeypatch.setattr(db, "commit", lambda: (_ for _ in ()).throw(SQLAlchemyError("fail")))
    with pytest.raises(HTTPException) as exc_info:
        await services.create_room(db, data, image=None)
    assert exc_info.value.status_code == 500

@pytest.mark.asyncio
async def test_update_room_db_error(db, monkeypatch):
    room = await services.create_room(db, schemas.RoomBase(title="a", description="a", facilities=[]), image=None)
    monkeypatch.setattr(db, "commit", lambda: (_ for _ in ()).throw(SQLAlchemyError("fail")))
    with pytest.raises(HTTPException):
        await services.update_room(db, room.id, schemas.RoomBase(title="b", description="", facilities=[]))

@pytest.mark.asyncio
async def test_delete_room_db_error(db, monkeypatch):
    room = await services.create_room(db, schemas.RoomBase(title="delete error", description="", facilities=[]), image=None)
    monkeypatch.setattr(db, "commit", lambda: (_ for _ in ()).throw(SQLAlchemyError("fail")))
    with pytest.raises(HTTPException):
        await services.delete_room(db, room.id)


@pytest.mark.asyncio
async def test_save_image_success_with_patch():
    mock_file = UploadFile(filename="test.png", file=io.BytesIO(b"fake image data"))

    with patch("builtins.open", new_callable=MagicMock), \
         patch("shutil.copyfileobj") as mock_copy:
        result = await services.save_image(mock_file)

    assert result.endswith(".png")


@pytest.mark.asyncio
async def test_update_room_with_image_triggers_commit(db):

    room = await services.create_room(
        db,
        schemas.RoomBase(title="before", description="desc", facilities=["WiFi"]),
        image=None
    )


    mock_upload = UploadFile(filename="updated.jpg", file=io.BytesIO(b"new image"))


    with patch("app.rooms.services.save_image", return_value="/uploaded_images/fake.jpg"), \
            patch("app.rooms.services.delete_image") as mock_delete:
        updated_data = schemas.RoomBase(
            title="before",
            description="desc",
            facilities=["WiFi"]
        )

        updated = await services.update_room(db, room.id, updated_data, image=mock_upload)

    assert updated.image == "/uploaded_images/fake.jpg"
