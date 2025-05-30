import React from "react";
import { createRoom } from "../../api";
import RoomForm from "../../components/RoomForm/RoomFrom";

const RoomDetailsPage: React.FC = () => {
  const handleCreate = async (title, description, facilities, image) => {
    try {
      const res = await createRoom(title, description, facilities, image);
      if (res) {
        alert("Room created successfully!");
      } else {
        alert("Failed to create room");
      }
    } catch (err) {
      alert("Error creating room");
    }
  };

  return <RoomForm onSubmit={handleCreate} isUpdateForm={false} />;
};

export default RoomDetailsPage;
