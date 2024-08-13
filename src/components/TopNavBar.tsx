import React from "react";
import { SearchNormal1 } from "iconsax-react";
import { HambergerMenu } from "iconsax-react";

const TopNavBar: React.FC = () => {
  return (
    <nav className="flex border-b border-gray-200">
      <div className="flex items-center pl-8 font-semibold border-r border-gray-200 w-1/5">
        <img alt="Code94 Labs Logo" src="/logo.png" />
        <span>Code94 Labs</span>
      </div>

      <div className="p-2 flex justify-between w-full">
        <div className="flex items-center gap-2 p-2 border border-gray-200 rounded-lg w-full max-w-sm">
          <SearchNormal1 />
          <input
            type="text"
            placeholder="Search tasks"
            className="focus:outline-none focus:ring-0 focus:border-transparent"
          />
        </div>

        <div className="flex items-center border border-gray-200 rounded-full p-2 drop-shadow">
          <HambergerMenu />
          <img
            alt="Profile Holder"
            src="/logo.png"
            className="rounded-full border border-gray-200 h-6"
          />
        </div>
      </div>
    </nav>
  );
};

export default TopNavBar;
