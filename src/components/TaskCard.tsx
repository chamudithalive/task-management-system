import React from "react";
import { Task } from "../redux/taskSlice";
import { TickCircle, Clock } from "iconsax-react";
import PriorityStatus from "./PriorityStatus";
import DueDate from "./DueDate";

interface TaskCardProps {
  task: Task;
  onClick?: () => void;
}

const TaskCard: React.FC<TaskCardProps> = ({ task, onClick }) => {
  const remainingTimeMessage = calculateRemainingTime(task.dueDate);

  return (
    <div
      className="bg-white p-2 rounded-xl cursor-pointer mb-2"
      onClick={onClick}
    >
      <div className="flex gap-2 p-2">
        <TickCircle />
        <span className="font-semibold">{task.name}</span>
      </div>
      <div className="flex border-t-2 border-generic-white-bg px-2 pt-2">
        <p>{task.description}</p>
      </div>
      <div className="flex items-center border-b-2 border-generic-white-bg px-2 pb-2">
        <img
          alt="Profile Image"
          src="/profile.png"
          className="rounded-full w-8 h-8"
        />
        <div className="flex justify-between w-full p-2">
          <DueDate dueDate={task.dueDate} />
          <PriorityStatus text={task.priority} />
        </div>
      </div>
      <div className="flex items-center p-2 text-dark-400 gap-2">
        <Clock />
        {remainingTimeMessage}
      </div>
    </div>
  );
};

function calculateRemainingTime(dueDate: string): string {
  const now = new Date();
  const due = new Date(dueDate);
  const diff = due.getTime() - now.getTime();

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `Should complete within ${days} days`;
  } else if (days < 0) {
    return `Should've completed ${Math.abs(days)} days ago`;
  } else {
    return "Due today";
  }
}

export default TaskCard;
