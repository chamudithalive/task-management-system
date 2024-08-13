import React from "react";
import { Diagram, Home2, LampCharge, NotificationBing, Setting2, TaskSquare } from "iconsax-react";

const SideNavBar: React.FC = () => {

  return (
    <div className="flex flex-col p-4 border-r border-gray-200 w-1/5">
      <div className="m-2 p-2 gap-2 flex items-center cursor-pointer rounded-lg bg-generic-white-bg">
        <Home2 />
        <span>Home</span>
      </div>
      <div className="m-2 p-2 gap-2 flex items-center cursor-pointer rounded-lg bg-primary-500 text-generic-white">
        <TaskSquare />
        <span>Tasks</span>
      </div>
      <div className="m-2 p-2 gap-2 flex items-center cursor-pointer rounded-lg bg-generic-white-bg">
        <Diagram />
        <span>Report</span>
      </div>
      <div className="m-2 p-2 gap-2 flex items-center cursor-pointer rounded-lg bg-generic-white-bg">
        <LampCharge />
        <span>Insights</span>
      </div>
      <div className="m-2 p-2 gap-2 flex items-center cursor-pointer rounded-lg bg-generic-white-bg">
        <NotificationBing />
        <span>Inbox</span>
      </div>
      <div className="m-2 p-2 gap-2 flex items-center cursor-pointer rounded-lg bg-generic-white-bg">
        <Setting2 />
        <span>Settings</span>
      </div>
    </div>
  );
};

export default SideNavBar;
