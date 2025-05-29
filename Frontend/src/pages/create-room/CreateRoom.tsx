import React, { useState } from "react";
import type { ChangeEvent } from "react";
import Button from "../../components/Buttons/Buttons";
import TextField from "../../components/TextField/TextField";
import { SquarePlusIcon } from "lucide-react";

const RoomDetailsPage: React.FC = () => {
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [image, setImage] = useState<File | null>(null);
  const [imageError, setImageError] = useState(false);
  const [facilities, setFacilities] = useState<string[]>([""]);
  const [facilityError, setFacilityError] = useState(false);

  // Handle image file upload
  const handleImageChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setImage(files[0]);
      console.log(files[0].name);
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
    if (!title) setTitleError(true);
    if (!description) setDescriptionError(true);
    if (!image) setImageError(true);
    if (!facilities) setFacilityError(true);
  };

  return (
    <div className="m -2 p-4 min-h-screen">
      <h1 className="font-bold text-2xl mb-2">Room details</h1>
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
          <TextField
            multiple={true}
            onFileSelect={handleImageChange} // Pass the correct function directly here
            label="ADD IMAGE"
            icon={<SquarePlusIcon />}
            type="file"
          />
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
        <label
          role="button"
          className="cursor-pointer text-primary inline-flex font-light items-center space-x-2"
          onClick={addFacilityField}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              addFacilityField();
            }
          }}
        >
          <SquarePlusIcon />
          <span>ADD FACILITY</span>
        </label>
      </div>

      <Button
        label="Create And Generate PDF"
        variant="primary"
        onClick={handleSubmit}
      />
    </div>
  );
};

export default RoomDetailsPage;
