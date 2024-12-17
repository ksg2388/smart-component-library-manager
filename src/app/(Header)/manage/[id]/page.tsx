"use client";
import Carousel from "@/app/_components/common/manage/ResponsiveSlider";
import { useRouter } from "next/navigation";
import React from "react";

const items = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6"];

const Page = () => {
  const router = useRouter();

  return (
    <div className="h-full mt-[8px] flex flex-col">
      <div className="flex w-full">
        <div className="flex-[3] flex justify-end">
          <button className=" text-white bg-black rounded-[6px] px-[8px] py-[6px]">
            다운로드
          </button>
        </div>
        <div className="flex-[4] flex justify-end">
          <button
            className=" text-white bg-black rounded-[6px] px-[8px] py-[6px]"
            onClick={() => router.back()}
          >
            목록
          </button>
        </div>
      </div>
      <div className="flex flex-[3] w-full mt-[8px]">
        <div className="flex-[3] flex">
          <div className="w-full h-full">
            <div className="max-h-[390px] overflow-y-scroll">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#8B8B8B] text-black">
                  <tr>
                    <th className="p-2">선택</th>
                    <th className="p-2">이름</th>
                    <th className="p-2">버전</th>
                    <th className="p-2">날짜</th>
                    <th className="p-2">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, idx) => (
                    <tr
                      key={idx}
                      className={`text-center ${
                        idx % 2 === 0 ? "bg-[#CDCDCD]" : "bg-[#8B8B8B]"
                      }`}
                    >
                      <td className="p-2">
                        <input type="checkbox" />
                      </td>
                      <td className="p-2">Component{idx + 1}</td>
                      <td className="p-2">1.5.{idx + 1}</td>
                      <td className="p-2">2024.11.{idx + 1}</td>
                      <td className="p-2">사용 가능</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="flex-[4] flex bg-[#D9D9D9] ml-[12px] max-h-[390px]">
          {/* 왼쪽 컴포넌트 이미지 영역 */}
          <div className="flex flex-col px-[20px]">
            <p className="mt-[16px] text-[18px] font-[500]">컴포넌트 이미지</p>
            <div className="bg-slate-400 h-[280px] w-[280px] mt-[20px] flex items-center justify-center">
              이미지 예시
            </div>
          </div>

          {/* 오른쪽 설명 영역 */}
          <div className="flex flex-col flex-[1] ml-[12px] max-h-[390px]">
            <div className="flex flex-col max-h-[350px] overflow-y-auto">
              <div className="pt-[16px] pb-[40px] pr-[40px] flex-shrink-0 flex flex-col">
                <p className="text-[16px] mb-[16px] font-[500]">설명</p>
                <textarea className="h-[200px] bg-[#A7A7A7] resize-none px-[12px] py-[8px]" />
                <p className="text-[16px] mt-[16px] mb-[16px] font-[500]">
                  주요 기능 목록
                </p>
                <textarea className="h-[120px] bg-[#A7A7A7] resize-none px-[12px] py-[8px]" />
                <p className="text-[16px] mt-[20px] mb-[4px] font-[500]">
                  권장 사용 환경경
                </p>
                <p className="text-[16px] mb-[16px] font-[500]">
                  Smart Components v 10.5.3 이상
                </p>
              </div>
            </div>
            <div className="ml-auto mr-[20px] mt-[4px] bg-black text-white px-[8px] py-[4px] rounded-[6px]">
              <button>저장</button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-[2] w-full mt-[4px] mb-[4px]">
        {/* 좌측 하단 */}
        <div className="flex-[3] flex bg-[#D9D9D9] relative w-[300px]">
          <Carousel items={items} />
        </div>
        {/* 우측 하단 */}
        <div className="flex-[4] flex bg-[#D9D9D9] ml-[12px]">
          <div className="w-full h-full">
            <div className="max-h-[214px] overflow-y-scroll">
              <table className="w-full">
                <thead className="sticky top-0 bg-[#8B8B8B] text-black">
                  <tr>
                    <th className="p-2 text-left">제목</th>
                    <th className="p-2">작성자</th>
                    <th className="p-2">답글</th>
                    <th className="p-2">조회수</th>
                    <th className="p-2">상태</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, idx) => (
                    <tr
                      key={idx}
                      className={`text-center ${
                        idx % 2 === 0 ? "bg-[#CDCDCD]" : "bg-[#8B8B8B]"
                      }`}
                    >
                      <td className="p-2 text-left">
                        컴포넌트가 동작하지 않을때 어떻게 해야하나요?
                      </td>
                      <td className="p-2">홍길동</td>
                      <td className="p-2">4</td>
                      <td className="p-2">123</td>
                      <td className="p-2">13h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="ml-auto mr-[20px] mt-[8px] bg-black text-white px-[8px] py-[4px] rounded-[6px] w-[70px] text-center">
              <button className="">글쓰기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
