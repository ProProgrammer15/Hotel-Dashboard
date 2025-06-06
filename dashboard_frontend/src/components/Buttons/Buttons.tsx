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
  iconBefore?: boolean;
  fullWidth?: boolean;
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
  iconBefore = true,
  fullWidth = false,
}) => {
  const variantStyles = {
    primary:
      "bg-primary text-white px-6 py-3 font-sans cursor-pointer font-light transition-colors border-[1px] hover:shadow-lg",
    neutral:
      "bg-neutral text-white px-6 py-3 cursor-pointer font-light transition-colors border-[1px] hover:shadow-lg",
    secondary:
      "bg-secondary cursor-pointer font-light text-info-foreground hover:bg-info-dark hover:shadow-md",
    dark: "bg-dark text-white hover:bg-green-600 hover:shadow-md",
    white:
      "bg-white text-muted-dark cursor-pointer font-light hover:bg-gray-200 hover:shadow-sm border border-gray-300",
  }[variant];

  const baseStyles = `focus:outline-none inline-flex items-center justify-center transition duration-200 ease-in-out`;

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
      className={`${baseStyles} ${variantStyles} ${fullWidth ? "w-full" : ""} ${
        icon && !label ? iconOnlyStyles : sizeStyles
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
    >
      {iconBefore ? (
        <>
          {icon && (
            <span className={label ? "ltr:mr-2 rtl:ml-2" : ""}>{icon}</span>
          )}
          {label && <span>{label}</span>}
        </>
      ) : (
        <>
          <div className="flex items-center justify-between w-full">
            {label && <span>{label}</span>}
            {icon && <span>{icon}</span>}
          </div>
        </>
      )}
    </button>
  );
};

export default Button;
