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
    try {
      const res = await updateRoom(id, title, description, facilities, image);
      if (res) {
        toast.success("Room updated Successfully!");
        navigate("/");
      } else {
        toast.error("Some occured, Please try again");
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
      />
    </div>
  );
};

export default UpdateRoomPage;
