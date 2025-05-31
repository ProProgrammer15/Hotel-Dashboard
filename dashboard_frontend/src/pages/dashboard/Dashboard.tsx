"use client";
import { useState, useEffect } from "react";
import Button from "../../components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";
import { getRoomsListing } from "../../api";
import { formatDate } from "../../utils/utils";

export const Dashboard = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRooms() {
      const data = await getRoomsListing();
      if (data) {
        setRooms(data);
      }
    }
    fetchRooms();
  }, []);

  const onRowClick = (roomId: string) => {
    navigate(`/room/${roomId}`);
  };

  return (
    <div className="m -2 p-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-dark">All rooms</h1>
        <Button
          onClick={() => navigate("/create-room")}
          label="CREATE A ROOM"
        />
      </div>

      {/* Table */}
      <div className="bg-white shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Room
              </th>
              <th className="text-left font-merriweather py-4 px-6 font-medium text-dark">
                Description
              </th>
              <th className="text-left font-merriweather py-4 px-6 font-medium text-dark">
                Facilities
              </th>
              <th className="text-left font-merriweather py-4 px-6 font-medium text-dark">
                Created
              </th>
              <th className="text-left font-merriweather py-4 px-6 font-medium text-dark">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                onClick={() => onRowClick(room?.id)}
                key={room.id}
                className={`border-b cursor-pointer border-gray-100 font-merriweather font-light hover:bg-gray-50 transition-colors ${
                  index === rooms.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="py-4 px-6  font-light font-merriweather text-dark">
                  {room.title}
                </td>
                <td className="py-4 px-6 text-dark font-light font-merriweather max-w-md">
                  {room.description}
                </td>
                <td className="py-4 px-6 text-dark">
                  {Array.isArray(room.facilities)
                    ? room.facilities.join(", ")
                    : room.facilities}
                </td>
                <td className="py-4 px-6 text-dark">
                  {formatDate(room.created_at)}
                </td>
                <td className="py-4 px-6 text-dark">
                  {room.updated_at ? formatDate(room.updated_at) : "–"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
