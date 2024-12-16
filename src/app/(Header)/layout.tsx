import React, { ReactNode } from "react";
import Header from "../_components/common/Header";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="h-screen min-h-[900px] px-[20px] py-[20px] flex flex-col">
      <Header />
      <div className="flex-1 mb-[12px]">{children}</div>
    </div>
  );
};

export default layout;
