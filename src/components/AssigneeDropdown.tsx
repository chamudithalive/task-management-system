import React, { useState, useRef, useEffect } from "react";
import { TickCircle, User } from "iconsax-react";

interface AssigneeDropdownOption {
  value: number;
  label: string;
}

interface AssigneeDropdownProps {
  options: AssigneeDropdownOption[];
  value: number | null;
  onChange: (value: number | null) => void;
}

const AssigneeDropdown: React.FC<AssigneeDropdownProps> = ({
  options,
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleSelect = (optionValue: number) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <User
        className="border rounded-full border-dashed p-2 cursor-pointer"
        size={36}
        onClick={() => setIsOpen(!isOpen)}
      />

      {isOpen && (
        <ul className="absolute bg-generic-white rounded-lg w-60 mt-2 z-10 p-2">
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                value === option.value ? "bg-primary-50" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <div className="flex gap-2 items-center">
                <img
                  alt="Profile Image"
                  src="/profile.png"
                  className="rounded-full w-4 h-4"
                />
                {option.label}
              </div>
              {value === option.value && (
                <TickCircle size={12} className="text-dark-500" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AssigneeDropdown;
