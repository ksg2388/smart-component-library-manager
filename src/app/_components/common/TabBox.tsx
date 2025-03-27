import { TMenu } from "@/app/_types/common/common.tyeps";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  tab: TMenu;
};

const TabBox = ({ tab }: Props) => {
  return (
    <Link
      className="flex items-center w-full hover:bg-gray-900 px-[12px] py-[8px] rounded-md"
      href={tab.href}
    >
      <div className="h-[28px] w-[28px] relative">
        <Image src={tab.imgUrl} alt={tab.imgAlt} fill />
      </div>
      <p className="text-[14px] ml-[8px]">{tab.name}</p>
    </Link>
  );
};

export default TabBox;
