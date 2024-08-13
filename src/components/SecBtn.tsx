import React from "react";
import { TickCircle } from "iconsax-react";

const SecBtn: React.FC = () => {
  return (
    <div className="bg-generic-white border border-dark-50 p-2 flex gap-2 justify-center items-center rounded-lg">
      <TickCircle />
      <span>Mark Complete</span>
    </div>
  );
};

export default SecBtn;
