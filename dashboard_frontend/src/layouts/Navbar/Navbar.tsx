"use client";

import type React from "react";
import type { NavbarProps, NavbarItemDetails } from "./NavbarProps";
import homeIcon from "../../assets/homeIcon.svg";
import { useNavigate } from "react-router-dom";

const navItems: NavbarItemDetails[] = [
  { id: "room-list", label: "Room list", icon: homeIcon, route: "/" },
];

const Navbar: React.FC<NavbarProps> = ({
  activeItem = "room-list",
  onItemClick,
}) => {
  const navigate = useNavigate();

  const handleItemClick = (item: NavbarItemDetails) => {
    navigate(item.route);
    onItemClick?.(item.id);
  };

  const isActive = (itemId: string) => activeItem === itemId;

  return (
    <nav className="hidden md:flex font-merriweather w-64 min-h-screen bg-dark text-secondary flex-col">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-700">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 border-2 border-white flex items-center justify-center">
            <span className="text-xl font-bold">H</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs tracking-widest text-gray-300">THE</span>
            <span className="text-lg font-bold tracking-wide">HUGO</span>
            <span className="text-xs tracking-widest text-gray-300">
              CANTERBURY
            </span>
          </div>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 py-4 flex flex-col gap-2">
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`relative flex items-center gap-3 px-6 py-3 cursor-pointer transition-colors hover:bg-gray-700 ${
              isActive(item.id) ? "bg-gray-700" : ""
            }`}
            onClick={() => handleItemClick(item)}
          >
            {isActive(item.id) && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-500"></div>
            )}

            <img
              src={item.icon}
              alt={`${item.label} Icon`}
              className={`w-5 h-5 ${isActive(item.id) ? "text-red-500" : ""}`}
            />
            <span
              className={`text-sm font-medium ${
                isActive(item.id) ? "text-red-500" : "text-white"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </nav>
  );
};

export default Navbar;
