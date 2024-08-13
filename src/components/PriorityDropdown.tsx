import { TickCircle } from "iconsax-react";
import React, { useState, useRef, useEffect } from "react";

interface PriorityDropdownProps {
  value: string | null;
  onChange: (value: string | null) => void;
}

const PriorityDropdown: React.FC<PriorityDropdownProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const handleSelect = (optionValue: string) => {
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
      <button
        className="rounded-lg border p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        Set priority
      </button>

      {isOpen && (
        <ul className="absolute bg-generic-white rounded-lg w-40 mt-2 z-10 p-2">
          {options.map((option) => (
            <li
              key={option.value}
              className={`p-2 rounded-md cursor-pointer flex items-center justify-between ${
                value === option.value ? "bg-primary-50" : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              <div className="flex gap-2 items-center">{option.label}</div>
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

export default PriorityDropdown;
