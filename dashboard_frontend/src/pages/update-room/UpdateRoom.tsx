import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getRoomById, updateRoom } from "../../api";
import RoomForm from "../../components/RoomForm/RoomForm";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

const UpdateRoomPage = () => {
  const { id } = useParams();
  const [initialData, setInitialData] = useState(null);
  const navigate = useNavigate();
  const [fieldErrors, setFieldErrors] = useState({});

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
            image: room?.image,
            createdAt: room?.created_at,
            updatedAt: room?.updated_at,
          });
        }
      }
    }
    fetchRoom();
  }, [id]);

  const handleUpdate = async (title, description, facilities, image) => {
    if (!id) return;
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

    if (Object.keys(newErrors).length > 0) {
      console.log("ERRORS");
      setFieldErrors(newErrors);
      return;
    }
    try {
      const res = await updateRoom(id, title, description, facilities, image);
      if (res) {
        toast.success("Room updated Successfully!");
        setFieldErrors({});
        navigate("/");
      } else {
        console.log(res);
      }
    } catch (err) {
      toast.error("Server Error: " + err);
    }
  };

  if (!initialData) return <div>Loading...</div>;

  return (
    <div>
      <RoomForm
        initialData={initialData}
        onSubmit={handleUpdate}
        isUpdateForm={true}
        errors={fieldErrors}
      />
    </div>
  );
};

export default UpdateRoomPage;
