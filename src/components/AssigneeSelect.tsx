import React, { useState } from "react";
import { User } from "iconsax-react";

const AssigneeSelect: React.FC<{
  assignees: Array<{ id: number, name: string }>,
  formik: any,
}> = ({ assignees, formik }) => {
  const [isSelectVisible, setIsSelectVisible] = useState(false);

  const handleUserClick = () => {
    setIsSelectVisible(!isSelectVisible);
  };

  return (
    <div className="relative">
      <User onClick={handleUserClick} className="cursor-pointer" />
      {isSelectVisible && (
        <select
          name="assignee"
          onChange={formik.handleChange}
          value={formik.values.assignee}
          className="absolute mt-2 w-full p-2 border rounded bg-white z-10"
        >
          {assignees.map((assignee) => (
            <option key={assignee.id} value={assignee.id}>
              {assignee.name}
            </option>
          ))}
        </select>
      )}
    </div>
  );
};

export default AssigneeSelect;
