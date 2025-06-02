import React, { useState } from "react";
import { createRoom } from "../../api";
import RoomForm from "../../components/RoomForm/RoomForm";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomDetailsPage: React.FC = () => {
  const [fieldErrors, setFieldErrors] = useState({});

  const handleCreate = async (title, description, facilities, image) => {
    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = "Title is required";
    if (!description || description.trim() === "") {
      newErrors.description = "Description is required";
    } else if (description.trim().split(/\s+/).length > 100) {
      newErrors.description = "Description cannot be more than 100 words";
    }
    if (!facilities || facilities.length === 0) {
      newErrors.facilities = "At least one facility is required";
    } else if (facilities.length > 10) {
      newErrors.facilities = "You can add up to 20 facilities only";
    }
    if (!image) newErrors.image = "Image is required";

    if (Object.keys(newErrors).length > 0) {
      setFieldErrors(newErrors);
      return;
    }

    try {
      const res = await createRoom(title, description, facilities, image);
      if (res) {
        toast.success("Room created successfully!");
        setFieldErrors({});
        title = description = "";
        facilities = [];
        image = null;
        return res;
      } else {
        toast.error("Error occured! Please Try Again");
      }
    } catch (err) {
      toast.error("Error occured! Please Try Again");
    }
  };

  return (
    <>
      <RoomForm
        onSubmit={handleCreate}
        isUpdateForm={false}
        errors={fieldErrors}
      />
    </>
  );
};

export default RoomDetailsPage;
