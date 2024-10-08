import { ArrowDown2, TickCircle } from "iconsax-react";
import React, { useState, useRef, useEffect } from "react";

interface PriorityDropdownTaskSlidePanelProps {
  value: "Low" | "Medium" | "High";
  onChange: (value: "Low" | "Medium" | "High") => void;
}

const PriorityDropdownTaskSlidePanel: React.FC<PriorityDropdownTaskSlidePanelProps> = ({
  value,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const options: { value: "Low" | "Medium" | "High"; label: string }[] = [
    { value: "Low", label: "Low" },
    { value: "Medium", label: "Medium" },
    { value: "High", label: "High" },
  ];

  const handleSelect = (optionValue: "Low" | "Medium" | "High") => {
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
      <div
        className="flex gap-2 cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        {value || "Select priority"} <ArrowDown2 />
      </div>

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

export default PriorityDropdownTaskSlidePanel;
