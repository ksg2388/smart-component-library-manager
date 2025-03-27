import React from "react";
import { TMenu } from "@/app/_types/common/common.tyeps";
import TabBox from "./TabBox";

const menus: TMenu[] = [
  {
    imgUrl: "/images/ic-user.png",
    imgAlt: "",
    name: "유저",
    href: "/user",
  },
  {
    imgUrl: "/images/ic-homework.png",
    imgAlt: "",
    name: "라이브러리",
    href: "/manage",
  },
  {
    imgUrl: "/images/ic-report.png",
    imgAlt: "",
    name: "통계 및 리포트",
    href: "/report",
  },
  {
    imgUrl: "/images/ic-settings.png",
    imgAlt: "",
    name: "설정",
    href: "/setting",
  },
  {
    imgUrl: "/images/ic-log.png",
    imgAlt: "",
    name: "로그",
    href: "/log",
  },
];

const Sidebar = () => {
  return (
    <div className="flex flex-col w-[240px] bg-[#2E2E36] text-white p-[20px] space-y-2 border-r border-gray-600 items-center my-4">
      {menus.map((menu) => (
        <TabBox key={menu.name} tab={menu} />
      ))}
    </div>
  );
};

export default Sidebar;
