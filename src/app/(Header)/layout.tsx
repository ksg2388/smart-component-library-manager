import React, { ReactNode } from "react";
import Sidebar from "../_components/common/Sidebar";
import Header from "../_components/common/Header";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default layout;
