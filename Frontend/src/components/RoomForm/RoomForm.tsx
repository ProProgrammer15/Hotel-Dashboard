import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TextField from "../TextField/TextField";
import { SquarePlusIcon, XIcon, DownloadIcon } from "lucide-react";
import Dates from "../Dates/Dates";
import DeleteRoomModal from "../DeleteRoomModal/DeleteRoomModal";
import Button from "../Buttons/Buttons";
import { deleteRoom } from "../../api";

interface RoomFormProps {
  initialData?: {
    title?: string;
    description?: string;
    facilities?: string[];
    createdAt?: string;
    updated?: string;
  };
  errors?: {
    title?: string;
    description?: string;
    facilities?: string;
    image?: string;
  };
  onSubmit: (
    title: string,
    description: string,
    facilities: string[],
    image: File | null
  ) => Promise<void>;
  isUpdateForm?: boolean;
}

const RoomForm: React.FC<RoomFormProps> = ({
  initialData,
  onSubmit,
  isUpdateForm,
  errors = {},
}) => {
  const APIURL = import.meta.env.VITE_API_ENDPOINT;
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [facilities, setFacilities] = useState<string[]>(
    initialData?.facilities || [""]
  );
  const [image, setImage] = useState<File | null>(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTitle(initialData?.title || "");
    setDescription(initialData?.description || "");
    setFacilities(initialData?.facilities || [""]);
  }, [initialData]);

  const addFacilityField = () => {
    setFacilities((prev) => [...prev, ""]);
  };

  const handleFacilityChange = (index: number, value: string) => {
    setFacilities((prev) => {
      const newFacilities = [...prev];
      newFacilities[index] = value;
      return newFacilities;
    });
  };

  const handleDeleteRoomClick = () => {
    setShowModal(true);
  };

  const handleModalOk = async () => {
    await deleteRoom(initialData?.id);
    setShowModal(false);
    navigate("/");
  };

  const handleModalCancel = () => {
    setShowModal(false);
  };

  const handleSubmit = async () => {
    await onSubmit(
      title,
      description,
      facilities.filter((f) => f.trim() !== ""),
      image
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 p-6 min-h-screen">
      <div className="w-full md:w-2/3">
        <div className="m -2 p-4 min-h-screen">
          <h1 className="font-bold text-dark text-3xl mb-5">Room details</h1>
          <a
            href="/"
            className="text-primary font-sans font-medium text-sm inline-flex items-center gap-1 hover:underline cursor-pointer"
          >
            ← back to rooms
          </a>
          <div className="m-5">
            <div className="container flex justify-between items-center">
              <h3 className="font-sans text-dark font-light text-2xl m-2">
                Room details
              </h3>
              {isUpdateForm && (
                <button
                  className="flex items-center text-primary font-semibold text-sm border-b-2 border-pr hover:opacity-80"
                  onClick={handleDeleteRoomClick}
                >
                  <XIcon className="w-4 h-4 mr-1 font-sans" />
                  DELETE ROOM
                </button>
              )}
            </div>

            <TextField
              label="Title"
              placeholder="Room Title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`border ${
                errors.title ? "border-red-700" : "border-gray-300"
              }`}
            />
            {errors.title && <p className="text-red-700">{errors.title}</p>}
            <TextField
              label="Description"
              placeholder="Description"
              type="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`border ${
                errors.description ? "border-red-700" : "border-gray-300"
              }`}
            />
            {errors.description && (
              <p className="text-red-700">{errors.description}</p>
            )}
            {initialData?.image ? (
              <div className="m-2 flex flex-col items-start gap-2">
                <div
                  style={{
                    height: 250,
                    width: 400,
                    overflow: "hidden",
                    borderRadius: 4,
                    border: "1px solid #ccc",
                  }}
                >
                  <img
                    src={`${APIURL}${initialData?.image}`}
                    alt="Room"
                    style={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <TextField
                  label="UPDATE IMAGE"
                  icon={<SquarePlusIcon />}
                  type="file"
                  onFileSelect={(file) => {
                    if (file) setImage(file);
                  }}
                  multiple={true}
                  className={`border ${errors.image ? "border-red-500" : ""}`}
                />
                {errors.image && <p className="text-red-700">{errors.image}</p>}
              </div>
            ) : (
              <div className="m-2">
                <TextField
                  label="ADD IMAGE"
                  icon={<SquarePlusIcon />}
                  type="file"
                  onFileSelect={(file) => {
                    if (file) setImage(file);
                  }}
                  multiple={true}
                  className={`border ${errors.image ? "border-red-500" : ""}`}
                />
                {errors.image && <p className="text-red-700">{errors.image}</p>}
              </div>
            )}
          </div>

          <div className="m-5">
            {facilities.map((facility, idx) => (
              <TextField
                key={idx}
                type="text"
                label="Facility"
                placeholder="Facility detail"
                value={facility}
                className={`border ${
                  errors.facilities ? "border-red-500" : "mb-2"
                }`}
                onChange={(e) => handleFacilityChange(idx, e.target.value)}
              />
            ))}
            <div className="m-2" onClick={addFacilityField}>
              <TextField
                label="ADD FACILITY"
                icon={<SquarePlusIcon />}
                type="button"
              />
              {errors.facilities && (
                <p className="text-red-700">{errors.facilities}</p>
              )}
            </div>
          </div>

          <Button label="CREATE AND GENERATE PDF" onClick={handleSubmit} />
        </div>
      </div>
      <div className="w-full md:w-1/3 mt-30 md:mt-30">
        <Dates
          createdAt={initialData?.createdAt || null}
          updatedAt={initialData?.updatedAt || null}
        />
        <div className="mt-5">
          <Button
            label="DOWNLOAD PDF"
            icon={<DownloadIcon />}
            iconBefore={false}
            fullWidth={true}
          >
            Download PDF
          </Button>
        </div>
      </div>
      <DeleteRoomModal
        visible={showModal}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
      />
    </div>
  );
};

export default RoomForm;
