import json

def test_create_room_success(client):
    response = client.post(
        "/api/v1/rooms/",
        data={
            "title": "Router Room",
            "description": "Router description",
            "facilities": ["WiFi", "TV"]
        },
        files={}
    )
    assert response.status_code == 200
    assert response.json()["title"] == "Router Room"

def test_create_room_invalid_facilities(client):
    response = client.post(
        "/api/v1/rooms/",
        data={
            "title": "Bad Room",
            "description": "",
            "facilities": "not-a-json"
        },
        files={}
    )
    assert response.status_code == 200 or response.status_code == 400

def test_list_rooms(client):
    response = client.get("/api/v1/rooms/")
    assert response.status_code == 200
    assert isinstance(response.json(), list)

def test_read_room_success(client):
    rooms = client.get("/api/v1/rooms/").json()
    if rooms:
        room_id = rooms[0]["id"]
        response = client.get(f"/api/v1/rooms/{room_id}")
        assert response.status_code == 200
        assert response.json()["id"] == room_id

def test_read_room_not_found(client):
    response = client.get("/api/v1/rooms/invalid-id")
    assert response.status_code == 404

def test_update_room_success(client):
    rooms = client.get("/api/v1/rooms/").json()
    if rooms:
        room_id = rooms[0]["id"]
        response = client.put(
            f"/api/v1/rooms/{room_id}",
            data={
                "title": "Updated via Router",
                "description": "",
                "facilities": ["Gym"]
            },
            files={}
        )
        assert response.status_code == 200
        assert response.json()["title"] == "Updated via Router"

def test_update_room_not_found(client):
    response = client.put(
        "/api/v1/rooms/non-existent",
        data={
            "title": "Will fail",
            "description": "",
            "facilities": json.dumps(["Gym"])
        },
        files={}
    )
    assert response.status_code == 404

def test_delete_room_success(client):
    create_response = client.post(
        "/api/v1/rooms/",
        data={
            "title": "To delete",
            "description": "Temporary",
            "facilities": json.dumps(["Temp"])
        },
        files={}
    )
    room_id = create_response.json()["id"]
    response = client.delete(f"/api/v1/rooms/{room_id}")

    assert response.status_code == 200
    assert response.json()["message"] == "Room deleted"

def test_delete_room_not_found(client):
    response = client.delete("/api/v1/rooms/invalid-id")
    assert response.status_code == 404
