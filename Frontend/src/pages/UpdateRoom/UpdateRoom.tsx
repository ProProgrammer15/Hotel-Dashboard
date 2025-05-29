import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoomById, updateRoom } from "../../api";
import RoomForm from "../../components/RoomForm/RoomForm";
import { useParams } from "react-router-dom";

const UpdateRoomPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRoom() {
      if (id) {
        const room = await getRoomById(id);
        if (room) {
          setInitialData({
            id: room?.id,
            title: room?.title,
            description: room?.description,
            facilities: room?.facilities,
            image: room?.image
          });
        }
      }
    }
    fetchRoom();
  }, [id]);

  const handleUpdate = async (title, description, facilities, image) => {
    if (!id) return;
    try {
      const res = await updateRoom(id, title, description, facilities, image);
      if (res) {
        alert("Room updated successfully!");
        navigate("/");
      } else {
        alert("Failed to update room");
      }
    } catch (err) {
      alert("Error updating room");
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div>
      <RoomForm initialData={initialData} onSubmit={handleUpdate} isUpdateForm={true}/>
    </div>
  );
};

export default UpdateRoomPage;
