import React, { useEffect } from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { addTask } from "../redux/taskSlice";
import { Calendar, TickCircle } from "iconsax-react";
import AssigneeDropdown from "./AssigneeDropdown";
import PriorityDropdown from "./PriorityDropdown";

interface AddNewTaskProps {
  status: "Todo" | "In Progress" | "Completed";
  onClose: () => void;
}

const AddNewTask: React.FC<AddNewTaskProps> = ({ status, onClose }) => {
  const dispatch = useDispatch();
  const assignees = useSelector((state: RootState) => state.task.assignees);

  const formik = useFormik({
    initialValues: {
      name: "",
      dueDate: "",
      priority: "Low" as "Low" | "Medium" | "High",
      assignee: assignees[0].id,
      status,
    },
    onSubmit: (values) => {
      const task = {
        id: Date.now(),
        name: values.name,
        dueDate: values.dueDate,
        priority: values.priority,
        status: values.status,
        description: "",
        assignee: assignees.find((a) => a.id === values.assignee)!,
      };
      dispatch(addTask(task));
      onClose();
    },
  });

  useEffect(() => {
    if (
      formik.values.name &&
      formik.values.dueDate &&
      formik.values.assignee &&
      formik.values.priority &&
      formik.values.status
    ) {
      formik.handleSubmit();
    }
  }, [formik.values]);

  return (
    <div className="bg-generic-white p-2 rounded-lg">
      <form onSubmit={formik.handleSubmit}>
        <div className="flex gap-2 p-2 items-center">
          <TickCircle />
          <input
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
            placeholder="Write a task name"
            required
            className="focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>
        <div className="flex p-2 border-t-2 border-generic-white-bg items-center justify-between">
          <div className="flex gap-2 items-center">
            <div>
              <AssigneeDropdown
                onChange={(value) => formik.setFieldValue("assignee", value)}
                value={formik.values.assignee}
                options={assignees.map((assignee) => ({
                  value: assignee.id,
                  label: assignee.name,
                }))}
              />
            </div>
            <div className="relative inline-block">
              <Calendar
                className="border rounded-full border-dashed p-2"
                size={36}
              />
              <input
                type="date"
                name="dueDate"
                onChange={formik.handleChange}
                value={formik.values.dueDate}
                required
                className="absolute inset-0 opacity-0 appearance-none  cursor-pointer"
                style={{
                  WebkitAppearance: "none",
                  MozAppearance: "none",
                  appearance: "none",
                }}
              />
            </div>
          </div>
          <div>
            <PriorityDropdown
              onChange={formik.handleChange}
              value={formik.values.priority}
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddNewTask;
