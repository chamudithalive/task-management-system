import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import {
  ArrowRight,
  Calendar,
  CloseCircle,
  DocumentText,
  Flag,
  Record,
  Trash,
  User,
} from "iconsax-react";
import SecBtn from "./SecBtn";
import { updateTask } from "../redux/taskSlice";
import AssigneeDropdownTaskSlidePanel from "./AssigneeDropdownTaskSlidePanel";
import PriorityDropdownTaskSlidePanel from "./PriorityDropdownTaskSlidePanel";

interface TaskSidePanelProps {
  onClose: () => void;
  isVisible: boolean;
  taskId: number;
  onRequestDelete: (taskId: number) => void;
}

const TaskSidePanel: React.FC<TaskSidePanelProps> = ({
  onClose,
  isVisible,
  taskId,
  onRequestDelete,
}) => {
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const assignees = useSelector((state: RootState) => state.task.assignees);
  const dispatch = useDispatch();

  const task = tasks.find((task) => task.id === taskId);
  const [editableTask, setEditableTask] = useState(task || null);

  useEffect(() => {
    setEditableTask(task || null);
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setEditableTask((prevTask) => {
      if (!prevTask) return null;
      const updatedTask = { ...prevTask, [name]: value };
      dispatch(updateTask(updatedTask));
      return updatedTask;
    });
  };

  const handleAssigneeChange = (value: number | null) => {
    setEditableTask((prevTask) => {
      if (!prevTask) return null;
      const updatedTask = {
        ...prevTask,
        assignee: assignees.find((a) => a.id === value) || null,
      };
      dispatch(updateTask(updatedTask));
      return updatedTask;
    });
  };

  const handlePriorityChange = (value: "Low" | "Medium" | "High" | null) => {
    setEditableTask((prevTask) => {
      if (!prevTask) return null;
      const updatedTask = { ...prevTask, priority: value };
      dispatch(updateTask(updatedTask));
      return updatedTask;
    });
  };
  
  

  const handleDelete = () => {
    onClose();
    onRequestDelete(taskId);
  };

  if (!editableTask) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 right-0 h-full w-1/3 bg-white shadow-lg transition-transform duration-300 ease-in-out ${
        isVisible ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex items-center justify-between p-4">
        <SecBtn />
        <div className="flex gap-4 text-dark-300">
          <button onClick={handleDelete}>
            <Trash />
          </button>
          <button onClick={onClose}>
            <ArrowRight />
          </button>
        </div>
      </div>

      <div className="p-2 m-4 rounded-lg border border-dark-50 font-semibold">
        <input
          type="text"
          name="name"
          value={editableTask.name}
          onChange={handleChange}
          className="w-full focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="Task Name"
        />
      </div>

      <div className="p-4">
        <div className="grid grid-cols-2 py-4 px-2">
          <div className="flex gap-2">
            <Record />
            <span>Status</span>
          </div>
          <div className="flex gap-2">
            <Record className={`${getStatusColor(editableTask.status)}`} />
            <span>{editableTask.status}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 py-4 px-2">
          <div className="flex gap-2">
            <Calendar />
            <span>Due Date</span>
          </div>
          <div className="flex gap-2">
            {formatDate(editableTask.dueDate)}
            <div className="relative inline-block">
              <input
                type="date"
                name="dueDate"
                value={editableTask.dueDate}
                onChange={handleChange}
                className="absolute inset-0 opacity-0 appearance-none cursor-pointer"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              />
              <CloseCircle />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 py-4 px-2">
          <div className="flex gap-2">
            <User />
            <span>Assignee</span>
          </div>
          <div className="flex gap-2 items-center">
            <AssigneeDropdownTaskSlidePanel
              options={assignees.map((assignee) => ({
                value: assignee.id,
                label: assignee.name,
              }))}
              value={editableTask.assignee?.id ?? null}
              onChange={handleAssigneeChange}
              name={editableTask.assignee?.name || null}
            />
            <CloseCircle />
          </div>
        </div>

        <div className="grid grid-cols-2 py-4 px-2">
          <div className="flex gap-2">
            <Flag />
            <span>Priority</span>
          </div>
          <div className="flex gap-2 items-center">
            <PriorityDropdownTaskSlidePanel
              value={editableTask.priority}
              onChange={handlePriorityChange || null}
            />
            <CloseCircle />
          </div>
        </div>
      </div>

      <div className="m-4 flex gap-2">
        <DocumentText />
        <span>Description</span>
      </div>

      <div className="p-2 m-4 rounded-lg border border-dark-50">
        <textarea
          name="description"
          value={editableTask.description}
          onChange={handleChange}
          className="w-full focus:outline-none focus:ring-0 focus:border-transparent"
          placeholder="Enter description"
        />
      </div>
    </div>
  );
};

function getStatusColor(text: string): string {
  switch (text) {
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

const formatDate = (dateString: string): string => {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "long",
    year: "numeric",
  };
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB", options);
};

export default TaskSidePanel;
