import React from "react";
interface ISidebar {
  open: boolean;
  onClose: any;
}

const Sidebar = ({ open, onClose }: ISidebar) => {
  return (
    <div
      className={`h-screen fixed bg-bgsecondary w-[300px] top-0 z-[200] p-4 pr-0 transition-all duration-500 left-[-320px] md:left-0 ${
        open ? "left-[0px]" : ""
      }`}
    >
      <div onClick={onClose} className="cursor-pointer">
        Close
      </div>
      Sidebar
    </div>
  );
};

export default Sidebar;
