import React from "react";
import { useState } from "react";
import Sidebar from "../components/Sidebar";

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
      <button className="bg-primary p-4" onClick={() => setOpenSidebar(!openSidebar)}>
        Toggle Button
      </button>
      {children}
    </>
  );
};

export default Wrapper;
