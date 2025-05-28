import React, { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "../../components/Buttons/Buttons";
import TextField from "../../components/TextField/TextField";
import { SquarePlusIcon } from "lucide-react";

const RoomDetailsPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [facilities, setFacilities] = useState<string[]>([""]);

  // Handle image file upload
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const addFacilityField = () => {
    setFacilities((prev) => [...prev, ""]);
  };

  // Update facility value by index
  const handleFacilityChange = (index: number, value: string) => {
    setFacilities((prev) => {
      const newFacilities = [...prev];
      newFacilities[index] = value;
      return newFacilities;
    });
  };

  // Handle form submission (for now just log values)
  const handleSubmit = () => {
    console.log({
      title,
      description,
      image,
      facilities,
    });
    alert("Form data logged in console. Implement PDF generation here.");
  };

  return (
    <div className="m -2 p-4 min-h-screen">
      <h1 style={{ fontWeight: "bold", fontSize: 28, marginBottom: 20 }}>
        Room details
      </h1>
      <a
        href="/"
        className="text-primary font-medium text-sm inline-flex items-center gap-1 hover:underline cursor-pointer"
      >
        ← back to rooms
      </a>
      <div className="m-5 font-bold">
        <h3 className="font-sans">Room details</h3>

        <TextField
          label="Title"
          placeholder="Room Title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Description"
          placeholder="Description"
          type="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <div className="m-2">
          <TextField label="ADD IMAGE" icon={<SquarePlusIcon />} type="file" />
        </div>
      </div>

      <div className="m-5">
        {facilities.map((facility, idx) => (
          <TextField
            key={idx}
            type="text"
            label="Facility"
            placeholder="Facility detail"
            value={facility}
            className="mb-2"
            onChange={(e) => handleFacilityChange(idx, e.target.value)}
          />
        ))}
        <Button onClick={addFacilityField} label=" Add Facility" />
      </div>

      <button
        onClick={handleSubmit}
        style={{
          backgroundColor: "#e06666",
          color: "white",
          padding: "12px 24px",
          border: "none",
          borderRadius: 4,
          fontWeight: "bold",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        CREATE AND GENERATE PDF
      </button>
    </div>
  );
};

export default RoomDetailsPage;
