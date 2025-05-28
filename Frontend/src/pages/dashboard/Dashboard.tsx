"use client";
import { useState } from "react";
import useRoomStore from "../../stores/useDashboardStore";
import Button from "../../components/Buttons/Buttons";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const { rooms } = useRoomStore();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  return (
    <div className="m -2 p-4 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-semibold text-gray-800">All rooms</h1>
        <Button
          onClick={() => navigate("/create-room")}
          label="CREATE A ROOM"
        />
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Room
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Description
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Facilities
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Created
              </th>
              <th className="text-left py-4 px-6 font-medium text-gray-700">
                Updated
              </th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr
                key={room.id}
                className={`border-b border-gray-100 font-merriweather hover:bg-gray-50 transition-colors ${
                  index === rooms.length - 1 ? "border-b-0" : ""
                }`}
              >
                <td className="py-4 px-6  font-medium font-merriweather text-gray-900">
                  {room.name}
                </td>
                <td className="py-4 px-6 text-gray-600 font-merriweather max-w-md">
                  {room.description}
                </td>
                <td className="py-4 px-6 text-gray-700">{room.facilities}</td>
                <td className="py-4 px-6 text-gray-700">{room.created}</td>
                <td className="py-4 px-6 text-gray-700">
                  {room.updated || "–"}
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
