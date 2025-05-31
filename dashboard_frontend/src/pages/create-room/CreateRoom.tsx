import React, { useState } from "react";
import { createRoom } from "../../api";
import RoomForm from "../../components/RoomForm/RoomForm";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const RoomDetailsPage: React.FC = () => {
  const navigate = useNavigate();
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
