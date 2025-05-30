import axios from "axios";

const APIURL = import.meta.env.VITE_API_ENDPOINT;

const baseURL = `${APIURL}/api/v1/rooms`;

export const API = axios.create({
  baseURL,
});

export const getRoomsListing = async () => {
  try {
    const res = await API.get(`${baseURL}`);
    return res.data;
  } catch (error) {
    console.error("Error fetching rooms list:", error);
    return null;
  }
};

export const getRoomById = async (roomId: string) => {
  try {
    const res = await API.get(`/${roomId}`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching room ${roomId}:`, error);
    return null;
  }
};

export const createRoom = async (
  title: string,
  description: string,
  facilities: string[], // array of strings
  imageFile?: File
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("facilities", JSON.stringify(facilities));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await API.post("/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error("Error creating room:", error);
    return null;
  }
};

export const updateRoom = async (
  roomId: string,
  title: string,
  description: string,
  facilities: string[],
  imageFile?: File
) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("facilities", JSON.stringify(facilities));
    if (imageFile) {
      formData.append("image", imageFile);
    }

    const res = await API.put(`/${roomId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res.data;
  } catch (error) {
    console.error(`Error updating room ${roomId}:`, error);
    return null;
  }
};

export const deleteRoom = async (roomId: string) => {
  try {
    const res = await API.delete(`/${roomId}`);
    return res.data;
  } catch (error) {
    console.error(`Error deleting room ${roomId}:`, error);
    return null;
  }
};
