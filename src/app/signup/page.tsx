"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import {
  IoPerson,
  IoLockClosed,
  IoMail,
  IoPhonePortrait,
} from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

type FormValues = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  phone: string;
  department: string;
  position: string;
};

const SignupPage = () => {
  const router = useRouter();
  const [isEmailVerified, setIsEmailVerified] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      department: "",
      position: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    if (!isEmailVerified) {
      alert("이메일 중복확인을 해주세요.");
      return;
    }

    // 여기에 회원가입 로직 추가 (API 호출 등)
    console.log(process.env.NEXT_PUBLIC_API_URL);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/users/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.name,
        email: data.email,
        pwd: data.password,
        department: data.department,
        position: data.position,
        phone_number: data.phone,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          alert("회원가입이 완료되었습니다. 로그인 페이지로 이동합니다.");
          router.push("/login");
        } else {
          alert(
            "회원가입에 실패했습니다: " + (data.message || "알 수 없는 오류")
          );
        }
      })
      .catch((error) => {
        console.error("회원가입 오류:", error);
        alert("회원가입 중 오류가 발생했습니다.");
      });
  };

  const handleEmailVerification = () => {
    // 실제 구현에서는 API 호출로 이메일 중복 확인
    setIsEmailVerified(true);
  };

  return (
    <div className="flex flex-col h-screen w-full items-center bg-[#2E2E36] text-[#ffffff]">
      <p className="text-[56px] font-[700] mt-auto">회원가입</p>
      <p className="text-[16px] font-[500] mt-[8px]">
        회원가입을 위해 아래 정보를 입력해주세요.
      </p>
      <div className="mb-auto flex justify-center items-center mt-[40px]">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <div className="flex justify-center relative">
            <IoPerson className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="text"
              placeholder="이름"
              {...register("name", { required: "이름을 입력해주세요" })}
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.name.message}
            </p>
          )}

          <div className="flex justify-center mt-[16px] relative">
            <IoMail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <div className="relative w-[353px]">
              <input
                className="w-full h-[52px] text-white pl-[45px] pr-[120px] outline-none text-[16px]
                bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full relative"
                type="email"
                placeholder="이메일"
                {...register("email", {
                  required: "이메일을 입력해주세요",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "유효한 이메일 주소를 입력해주세요",
                  },
                })}
                onChange={(e) => {
                  setValue("email", e.target.value);
                  setIsEmailVerified(false);
                }}
              />
              <AnimatePresence>
                {!isEmailVerified && (
                  <motion.button
                    type="button"
                    className="absolute right-[5px] top-2
                    text-center bg-[#3B50B2] text-white font-semibold py-1 
                    px-[10px] h-[36px] w-[110px] rounded-full hover:bg-[#3B50B2]/80 transition-colors duration-300 text-[14px]"
                    onClick={handleEmailVerification}
                    initial={{ opacity: 1, scale: 1 }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                      x: 20,
                      transition: {
                        duration: 0.5,
                        ease: [0.22, 1, 0.36, 1],
                      },
                    }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 10px rgba(59, 80, 178, 0.5)",
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    중복확인
                  </motion.button>
                )}
              </AnimatePresence>
              <AnimatePresence>
                {isEmailVerified && (
                  <motion.div
                    className="absolute right-[15px] top-4 text-green-400 flex items-center gap-1"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      duration: 0.4,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2,
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M20 6L9 17l-5-5"></path>
                    </svg>
                    <span className="text-sm">확인됨</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.email.message}
            </p>
          )}

          <div className="flex justify-center mt-[16px] relative">
            <IoLockClosed className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="password"
              placeholder="비밀번호"
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 6,
                  message: "비밀번호는 최소 6자 이상이어야 합니다",
                },
              })}
            />
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.password.message}
            </p>
          )}

          <div className="flex justify-center mt-[16px] relative">
            <IoLockClosed className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="password"
              placeholder="비밀번호 확인"
              {...register("confirmPassword", {
                required: "비밀번호 확인을 입력해주세요",
                validate: (value) =>
                  value === watch("password") || "비밀번호가 일치하지 않습니다",
              })}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.confirmPassword.message}
            </p>
          )}

          <div className="flex justify-center mt-[16px] relative">
            <IoPhonePortrait className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="tel"
              placeholder="전화번호"
              {...register("phone", { required: "전화번호를 입력해주세요" })}
            />
          </div>
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.phone.message}
            </p>
          )}

          <div className="flex justify-center mt-[16px] relative">
            <IoMail className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="text"
              placeholder="부서명"
              {...register("department", { required: "부서명을 입력해주세요" })}
            />
          </div>
          {errors.department && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.department.message}
            </p>
          )}

          <div className="flex justify-center mt-[16px] relative">
            <IoPerson className="absolute left-5 top-1/2 transform -translate-y-1/2 text-white" />
            <input
              className="w-[353px] h-[52px] text-white pl-[45px] pr-[20px] outline-none text-[16px]
              bg-white bg-opacity-20 placeholder:text-[#9e9e9e] rounded-full"
              type="text"
              placeholder="직책"
              {...register("position", { required: "직책을 입력해주세요" })}
            />
          </div>
          {errors.position && (
            <p className="text-red-500 text-sm mt-1 ml-4">
              {errors.position.message}
            </p>
          )}

          <button
            type="submit"
            className="text-center bg-[#3B50B2] text-white font-semibold py-2 
            px-[20px] h-[52px] w-[353px] rounded-full mt-[16px] hover:bg-[#3B50B2]/80 transition-colors duration-300"
          >
            회원가입
          </button>
          <p
            className="mx-auto w-fit text-[14px] text-[#9e9e9e] mt-[12px] cursor-pointer hover:text-white transition-colors duration-300 flex items-center"
            onClick={() => router.push("/login")}
          >
            이미 계정이 있으신가요? 로그인하기
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupPage;
