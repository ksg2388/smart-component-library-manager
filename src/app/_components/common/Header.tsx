"use client";

import { TMenu } from "@/app/_types/common/common.tyeps";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import TabBox from "./TabBox";
import Image from "next/image";

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

const Header = () => {
  const [title, setTitle] = useState("홈");
  const pathname = usePathname();

  useEffect(() => {
    const currentPath = pathname;

    // 경로에 따라 title 값을 설정
    if (currentPath.includes("/manage")) {
      setTitle("라이브러리 관리");
    } else {
      setTitle("홈");
    }
  }, [pathname]); // 경로가 변경될 때마다 effect 실행

  return (
    <div
      className="flex flex-col text-white border-[2px] 
    border-[#D8D8D8] px-[20px] py-[12px]"
    >
      <div className="flex justify-between items-center">
        <p className="text-[32px]">{title}</p>
        <div className="flex gap-[8px] mr-[8px] items-center">
          <div className="h-[28px] w-[28px] relative">
            <Image src={"/images/ic-home.png"} alt={"home"} fill />
          </div>
          <div className="h-[28px] w-[28px] relative">
            <Image src={"/images/ic-bell.png"} alt={"home"} fill />
          </div>
          <p>admin</p>
          <button>로그아웃</button>
        </div>
      </div>
      <div className="flex gap-[8px] mt-[4px]">
        {menus.map((menu) => (
          <TabBox key={menu.name} tab={menu} />
        ))}
      </div>
    </div>
  );
};

export default Header;
