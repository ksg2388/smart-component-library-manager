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
      className="flex flex-col items-center justify-center border-[2px] border-[#D8D8D8] h-[86px] w-[94px] cursor-pointer group hover:bg-[#D8D8D8]"
      href={tab.href}
    >
      <div className="h-[40px] w-[40px] relative group-hover:invert">
        <Image src={tab.imgUrl} alt={tab.imgAlt} fill />
      </div>
      <p className="text-[12px] mt-[4px] group-hover:text-black p-1 transition-colors font-[600]">
        {tab.name}
      </p>
    </Link>
  );
};

export default TabBox;
