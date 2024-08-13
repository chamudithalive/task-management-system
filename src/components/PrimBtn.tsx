import React from "react";
import { Add } from "iconsax-react";

interface PrimBtnProps {
  onClick: () => void;
}

const PrimBtn: React.FC<PrimBtnProps> = ({ onClick }) => {
  return (
    <div
      onClick={onClick}
      className="bg-generic-white-bg p-2 flex justify-center items-center w-full rounded-lg cursor-pointer"
    >
      <Add />
      <span>Add task</span>
    </div>
  );
};

export default PrimBtn;
