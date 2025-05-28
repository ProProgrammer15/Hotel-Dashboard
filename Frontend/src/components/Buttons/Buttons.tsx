import React from "react";

type ButtonProps = {
  label?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  variant?: "primary" | "secondary" | "dark" | "neutral" | "white";
  size?: "small" | "medium" | "large";
  className?: string;
};

const Button: React.FC<ButtonProps> = ({
  label,
  icon,
  onClick,
  type = "button",
  disabled = false,
  variant = "primary",
  size = "medium",
  className = "",
}) => {
  const variantStyles = {
    primary:
      "bg-primary text-white px-6 py-3 rounded-md font-medium transition-colors border-[1px] hover:shadow-lg",
    neutral:
      "bg-neutral text-white px-6 py-3 rounded-md font-medium transition-colors border-[1px] hover:shadow-lg",
    secondary:
      "bg-secondary text-info-foreground hover:bg-info-dark hover:shadow-md",
    dark: "bg-dark text-white hover:bg-green-600 hover:shadow-md",
    white:
      "bg-white text-muted-dark hover:bg-gray-200 hover:shadow-sm border border-gray-300",
  }[variant];

  const baseStyles = `rounded-lg font-semibold focus:outline-none inline-flex items-center justify-center transition duration-200 ease-in-out`;

  const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg",
  }[size];

  const iconOnlyStyles =
    size === "small" ? "w-8 h-8" : size === "large" ? "w-12 h-12" : "w-10 h-10";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles} ${
        icon && !label ? iconOnlyStyles : sizeStyles
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {icon && <span className={label ? "ltr:mr-2 rtl:ml-2" : ""}>{icon}</span>}
      {label && <span>{label}</span>}
    </button>
  );
};

export default Button;
