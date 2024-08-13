import React from "react";

interface DueDateProps {
  dueDate: string; // expecting a date string in ISO format (e.g., "2024-08-10")
}

const DueDate: React.FC<DueDateProps> = ({ dueDate }) => {
  const now = new Date();
  const dueDateObj = new Date(dueDate);
  const isPastDue = now > dueDateObj;

  const dueColor = isPastDue ? "text-status-danger-500" : "text-primary-500";
  const bgColor = isPastDue ? "bg-status-danger-50" : "bg-primary-50";

  const options: Intl.DateTimeFormatOptions = { month: 'short', day: 'numeric' };
  const formattedDueDate = dueDateObj.toLocaleDateString('en-US', options);

  return (
    <div
      className={`flex p-2 gap-2 items-center font-semibold rounded-md ${bgColor}`}
    >
      <span className={dueColor}>
        {formattedDueDate}
      </span>
    </div>
  );
};

export default DueDate;
