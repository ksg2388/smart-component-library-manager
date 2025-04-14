"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { IoPerson, IoLockClosed } from "react-icons/io5";
import useUserStore from "@/app/stores/UserStore";
const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser, setTokens } = useUserStore();

  const handleLogin = () => {
    // 이메일과 비밀번호가 admin일 경우에만 이동
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, pwd: password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setUser(data.data.user);
          setTokens({
            accessToken: data.data.token,
            refreshToken: data.data.refreshToken,
          });
          alert("로그인에 성공했습니다.");
          router.push("/manage");
        } else {
          alert("로그인에 실패했습니다.");
        }
      })
      .catch((error) => {
        console.error("로그인 오류:", error);
        alert("로그인에 실패했습니다.");
      });
  };

  return (
    <div className="flex flex-col h-screen w-full items-center bg-[#2E2E36] text-[#ffffff]">
      <h1 className="text-[56px] font-[700] mt-auto">
        가상시운전 라이브러리 관리기
      </h1>
      <p className="text-[56px] font-[700] mt-[12px]">Membership Login</p>
      <p className="text-[16px] font-[500] mt-[8px] whitespace-pre-line text-center">
        {
          "본시스템은 로그인 후에 이용하실 수 있습니다.\n아이디와 비밀번호를 입력하신 후, 로그인 버튼을 클릭해 주세요."
        }
      </p>
      <div className="mb-auto flex justify-center items-center mt-[60px]">
        <div className="flex flex-col">
          <div className="flex justify-center relative">
            <IoPerson className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="text"
              placeholder="이메일"
              value={email}
              onChange={(e) => setEmail(e.target.value)} // 입력값 업데이트
            />
          </div>
          <div className="flex justify-center mt-[16px] relative">
            <IoLockClosed className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="password"
              placeholder="비밀번호"
              value={password}
              onChange={(e) => setPassword(e.target.value)} // 입력값 업데이트
            />
          </div>
          <button
            className="text-center bg-[#3B50B2] text-white font-semibold py-2 
            px-[20px] h-[52px] w-[353px] rounded-full mt-[16px] hover:bg-[#3B50B2]/80 transition-colors duration-300"
            onClick={handleLogin}
          >
            로그인
          </button>
          <p
            className="mx-auto w-fit text-[14px] text-[#9e9e9e] mt-[12px] cursor-pointer hover:text-white transition-colors duration-300 flex items-center"
            onClick={() => router.push("/signup")}
          >
            회원가입 하러가기
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
