import React from "react";
import { Record } from "iconsax-react";

interface PriorityStatusProps {
  text: "Low" | "Medium" | "High";
}

const PriorityStatus: React.FC<PriorityStatusProps> = ({ text }) => {
  const priorityColor = getPriorityColor(text);
  const priorityBgColor = getPriorityBgColor(text);

  return (
    <div
      className={`flex p-2 gap-2 items-center font-semibold rounded-md ${priorityBgColor} ${priorityColor}`}
    >
      <Record size="12" />
      <span>{text}</span>
    </div>
  );
};

function getPriorityColor(priority: "Low" | "Medium" | "High"): string {
  switch (priority) {
    case "Low":
      return "text-blue-500";
    case "Medium":
      return "text-yellow-500";
    case "High":
      return "text-red-500";
    default:
      return "text-gray-500";
  }
}

function getPriorityBgColor(priority: "Low" | "Medium" | "High"): string {
  switch (priority) {
    case "Low":
      return "bg-blue-50";
    case "Medium":
      return "bg-yellow-50";
    case "High":
      return "bg-red-50";
    default:
      return "bg-gray-50";
  }
}

export default PriorityStatus;
