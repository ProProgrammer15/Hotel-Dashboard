import React, { useState } from "react";
import { createRoom } from "../../api";
import RoomForm from "../../components/RoomForm/RoomFrom";

const RoomDetailsPage: React.FC = () => {
  const [fieldErrors, setFieldErrors] = useState({});

  const handleCreate = async (title, description, facilities, image) => {
    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = "Title is required";
    if (!description) newErrors.description = "Description is required";
    if (!facilities || facilities.length === 0)
      newErrors.facilities = "Facilities are required";
    if (!image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      const res = await createRoom(title, description, facilities, image);
      if (res) {
        alert("Room created successfully!");
        setFieldErrors({}); // clear errors after success
      } else {
        alert("Failed to create room");
      }
    } catch (err) {
      alert("Error creating room");
    }
  };

  return (
    <RoomForm
      onSubmit={handleCreate}
      isUpdateForm={false}
      errors={fieldErrors}
    />
  );
};

export default RoomDetailsPage;
