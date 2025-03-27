"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
const Header = () => {
  const router = useRouter();
  const [showOptions, setShowOptions] = useState(false);
  const optionsRef = useRef<HTMLDivElement>(null);

  const handleLogout = () => {
    // 로그아웃 로직 구현
    console.log("로그아웃 처리");
    router.push("/login");
    setShowOptions(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        optionsRef.current &&
        !optionsRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="flex justify-between items-center text-white px-[30px] py-[12px] h-[50px] bg-black bg-opacity-30">
      <p className="text-[20px]">{"logo"}</p>
      <div className="flex gap-[8px] items-center relative">
        <p
          className="text-[14px] font-medium cursor-pointer hover:underline"
          onClick={() => setShowOptions(!showOptions)}
        >
          admin님
        </p>
        {showOptions && (
          <div
            ref={optionsRef}
            className="absolute top-[30px] right-0 bg-[#2E2E36] border border-gray-600 rounded-md shadow-lg z-10 w-[100px] items-center"
          >
            <button
              className="w-full px-4 py-2 text-left text-white hover:bg-gray-700 text-[14px]"
              onClick={handleLogout}
            >
              로그아웃
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
