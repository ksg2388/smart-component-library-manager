"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LoginPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // 이메일과 비밀번호가 admin일 경우에만 이동
    if (email === "admin" && password === "admin") {
      router.push("/manage");
    } else {
      alert("이메일 또는 비밀번호가 잘못되었습니다.");
    }
  };

  return (
    <div className="flex flex-col h-screen w-full items-center bg-[#2E2E36] text-[#ffffff]">
      <h1 className="text-[56px] font-[700] mt-auto">
        가상시운전 라이브러리 관리기
      </h1>
      <p className="text-[56px] font-[700] mt-[12px]">Membership login</p>
      <p className="text-[16px] font-[500] mt-[8px]">
        본시스템은 로그인 후에 이용하실 수 있습니다. 아이디와 비밀번호를
        입력하신 후, 로그인 버튼을 클릭해 주세요.
      </p>
      <div className="mb-auto flex justify-center items-center w-ful w-[780px] h-[180px] bg-[#101010] border-[1px] border-[#8f8f8f] bordr mt-[60px]">
        <div className="flex flex-col">
          <div className="flex justify-center">
            <p className="w-[60px] text-right mr-[20px]">이메일</p>
            <input
              className="w-[240px] h-[28px] text-black px-[8px] outline-[#7f45fa] text-[16px]"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 입력값 업데이트
            />
          </div>
          <div className="flex justify-center mt-[16px]">
            <p className="w-[60px] text-right mr-[20px]">비밀번호</p>
            <input
              className="w-[240px] h-[28px] text-black px-[8px] outline-[#7f45fa] text-[16px]"
              type="password"
              placeholder="**********"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 입력값 업데이트
            />
          </div>
        </div>
        <button
          className="ml-[20px] text-center bg-gradient-to-r from-gray-400 via-gray-500 to-gray-600 text-white font-semibold py-2 px-4 shadow-md hover:from-gray-500 hover:via-gray-600 hover:to-gray-700 h-[74px] w-[82px]"
          onClick={handleLogin}
        >
          login
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
