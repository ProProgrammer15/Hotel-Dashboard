import React, { useState, useRef } from "react";

type TextFieldProps = {
  type: "text" | "description" | "file" | "button";
  label?: string;
  icon?: React.ReactNode;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  value?: string;
  onChange?: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onFileSelect?: (files: FileList | null) => void;
};

const TextField: React.FC<TextFieldProps> = ({
  type,
  label,
  icon,
  placeholder,
  className = "",
  disabled = false,
  accept = "image/*",
  multiple = false,
  value: controlledValue,
  onChange,
  onFileSelect,
}) => {
  const [internalValue, setInternalValue] = useState("");
  const [fileName, setFileName] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const baseInputStyles =
    "w-full p-2.5 text-sm bg-gray-100 border-0 rounded-md";

  const typeStyles = {
    text: "text-base h-10 cursor-text",
    description: "text-sm min-h-[80px] resize-none cursor-text",
    file: "cursor-pointer",
    button: "cursor-pointer",
  }[type];

  const inputClassNames = `${baseInputStyles} ${typeStyles} ${className}`;

  const uniqueId = React.useId();

  // Use controlledValue if provided, else internal state
  const inputValue =
    controlledValue !== undefined ? controlledValue : internalValue;

  // Handle text or textarea change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (disabled) return;

    if (onChange) {
      onChange(e);
    } else {
      setInternalValue(e.target.value);
    }
  };

  // Handle file input change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(files[0].name); // show only first file name

      if (onFileSelect) {
        onFileSelect(files);
      }
    }
  };

  return (
    <div className="flex flex-col w-full">
      {label && (
        <label
          className={`mb-1 font-medium flex items-center space-x-2 cursor-pointer ${
            type === "file" || type === "button" ? "text-primary" : "text-dark"
          }`}
          htmlFor={type === "file" ? uniqueId : type}
          aria-disabled={disabled}
        >
          {icon && <span className="flex-shrink-0">{icon}</span>}
          <span>{label}</span>
        </label>
      )}

      {type === "file" ? (
        <>
          <input
            type="file"
            accept={accept}
            multiple={multiple}
            id={uniqueId}
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            disabled={disabled}
          />
          <div
            className={`mt-1 text-dark ${
              disabled ? "cursor-not-allowed" : "cursor-text"
            }`}
          >
            {fileName || placeholder || ""}
          </div>
        </>
      ) : type === "text" ? (
        <input
          id={type}
          type="text"
          className={inputClassNames}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
        />
      ) : type === "description" ? (
        <textarea
          id={type}
          className={inputClassNames}
          placeholder={placeholder}
          disabled={disabled}
          value={inputValue}
          onChange={handleInputChange}
          rows={4}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default TextField;
