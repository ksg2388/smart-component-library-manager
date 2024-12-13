import React, { ReactNode } from "react";
import Header from "../_components/common/Header";

type Props = {
  children: ReactNode;
};

const layout = ({ children }: Props) => {
  return (
    <div className="bg-[#2E2E36] h-screen px-[20px] py-[20px]">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default layout;
