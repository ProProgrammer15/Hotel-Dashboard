import React, { forwardRef, useEffect, useState } from "react";
import { convertImageToBase64 } from "../../utils/utils";
import toast from "react-hot-toast";
export interface RoomPDFProps {
  title?: string;
  description?: string;
  facilities?: string[];
  image?: string; // image path (e.g., "/uploads/room.jpg")
}

const RoomPDF = forwardRef<HTMLDivElement, RoomPDFProps>(
  ({ title, description, facilities = [], image }, ref) => {
    const midpoint = Math.ceil(facilities.length / 2);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const firstColumn = facilities.slice(0, midpoint);
    const secondColumn = facilities.slice(midpoint);
    const baseImageUrl = "http://localhost:8000";
    const today = new Date().toLocaleDateString();

    useEffect(() => {
      const handleBase64Image = async () => {
        try {
          const finalImage = await convertImageToBase64(
            `${baseImageUrl}${image}`
          );
          setBase64Image(finalImage);
        } catch (error) {
          toast.error("Error Generating PDF");
        }
      };

      if (image) {
        handleBase64Image();
      }
    }, [image]);

    return (
      <div
        ref={ref}
        className="w-[800px] min-h-[1123px] font-sans bg-white text-dark flex flex-col justify-between"
      >
        {/* Header Bar */}
        <div className="bg-dark text-white px-6 py-2 flex items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 border border-white text-center font-bold text-xl">
              H
            </div>
            <div className="text-left leading-tight">
              <p className="text-sm font-semibold">THE HUGO</p>
              <p className="text-xs text-white">CANTERBURY</p>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="my-2 px-10 pt-8">
          <h1 className="text-4xl font-semibold mb-1">{title}</h1>
          <p className="text-dark font-merriweather font-medium mb-6">
            {description}
          </p>
        </div>

        {/* Image */}
        {image && (
          <div className="m-3">
            <img
              src={base64Image}
              alt="Room"
              className="w-full h-auto object-cover rounded-md border border-white"
            />
          </div>
        )}

        {/* Facilities */}
        <div className="m-3">
          <h2 className="text-2xl font-merriweather font-semibold mb-3">
            Facilities
          </h2>
          <div className="grid grid-cols-2 gap-6 font-medium text-dark font-merriweather">
            <div className="space-y-2">
              {firstColumn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[4px] text-[18px] leading-none">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {secondColumn.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <span className="mt-[4px] text-[18px] leading-none">•</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-neutral text-xs text-dark font-merriweather px-10 py-3 flex justify-between items-center mt-auto">
          <span>© The Hugo 2025</span>
          <span>{today}</span>
        </div>
      </div>
    );
  }
);

RoomPDF.displayName = "RoomPDF";

export default RoomPDF;
