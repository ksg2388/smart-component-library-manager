"use client";

import React from "react";
import useUserStore from "../stores/UserStore";
import Header from "../_components/common/Header";
import Sidebar from "../_components/common/Sidebar";

type Props = {
  children: React.ReactNode;
};

const ClientLayout = ({ children }: Props) => {
  const { user } = useUserStore();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex flex-1">
        {user?.role === "admin" && <Sidebar />}
        <div className="flex-1">{children}</div>
      </div>
    </div>
  );
};

export default ClientLayout;
