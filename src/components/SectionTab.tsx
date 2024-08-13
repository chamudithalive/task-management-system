import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { Record, Add } from "iconsax-react";

interface SectionTabProps {
  text: "Todo" | "In Progress" | "Completed";
}

const SectionTab: React.FC<SectionTabProps> = ({ text }) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const taskCount = tasks.filter((task) => task.status === text).length;

  return (
    <div className="bg-white p-2 flex justify-between items-center w-full rounded-lg mb-2">
      <div className="flex gap-2">
        <Record className={`${getStatusColor(text)}`} />
        <span className="flex-grow">{text}</span>
        <span className="text-primary-500 bg-primary-50 rounded-full">{taskCount}</span>
      </div>
      <Add />
    </div>
  );
};

function getStatusColor(status: "Todo" | "In Progress" | "Completed"): string {
  switch (status) {
    case "Todo":
      return "text-status-warining-500";
    case "In Progress":
      return "text-status-info-500";
    case "Completed":
      return "text-status-success-500";
    default:
      return "";
  }
}

export default SectionTab;
