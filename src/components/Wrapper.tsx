import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

interface IWrapper {
  children: React.ReactNode;
  enableRightbar?: boolean;
}

const Wrapper = ({ children, enableRightbar }: IWrapper) => {
  const [openSidebar, setOpenSidebar] = useState(false);
  return (
    <>
      <Sidebar
        open={openSidebar}
        onClose={() => setOpenSidebar(!openSidebar)}
      />
      <main
        className={`pl-0 md:pl-[300px] ${
          enableRightbar ? "min-[1150px]:pr-[300px]" : ""
        }`}
      >
        <Navbar onMenuClick={() => setOpenSidebar(!openSidebar)} />
        <div className="p-4">{children}</div>
      </main>
    </>
  );
};

export default Wrapper;
