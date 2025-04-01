"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

const ManageItemList = () => {
  const router = useRouter();

  return (
    <div className="h-full flex flex-col py-[20px] px-[30px] text-white">
      {/* 상단 버튼 영역 */}
      <div className="flex justify-end mt-4 gap-2">
        <button className="bg-black text-white px-[12px] py-[8px] rounded-[6px] hover:bg-gray-800 transition-colors">
          저장
        </button>
        <button
          className="text-white bg-black rounded-[6px] px-[12px] py-[8px] hover:bg-gray-800 transition-colors"
          onClick={() => router.back()}
        >
          목록
        </button>
      </div>

      {/* 상단 컴포넌트 상세 정보 영역 (기존 오른쪽 영역) */}
      <div className="w-full rounded-lg mb-6">
        <div className="flex flex-wrap gap-8">
          {/* 컴포넌트 이미지 영역 */}
          <div className="flex flex-col">
            <h2 className="text-[20px] font-semibold mb-4 text-white">
              컴포넌트 이미지
            </h2>
            <div className="relative bg-slate-400 h-[360px] w-[360px] flex items-center justify-center rounded-md shadow-md text-white overflow-hidden">
              <Image
                src="/images/thumbnail.png"
                alt="thumbnail"
                className="cover"
                fill
              />
            </div>
          </div>

          {/* 설명 영역 */}
          <div className="flex flex-col flex-1">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-[18px] font-semibold mb-4 text-white">
                  설명
                </h2>
                <textarea className="w-full h-[120px] bg-[#A7A7A7] resize-none px-[12px] py-[8px] rounded-md mb-4 text-white" />

                <h2 className="text-[18px] font-semibold mb-4 text-white">
                  주요 기능 목록
                </h2>
                <textarea className="w-full h-[100px] bg-[#A7A7A7] resize-none px-[12px] py-[8px] rounded-md mb-4 text-white" />

                <div className="mb-2">
                  <h2 className="text-[18px] font-semibold mb-2 text-white">
                    권장 사용 환경
                  </h2>
                  <p className="text-[16px] font-medium text-white">
                    Smart Components v 10.5.3 이상
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 하단 컴포넌트 목록 영역 (기존 왼쪽 영역) */}
      <div className="w-full flex-1 mt-10">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-[20px] font-semibold text-white">
            컴포넌트 목록
          </h2>
          <div className="flex justify-end gap-4">
            <button className="text-white bg-black rounded-[6px] px-[12px] py-[8px] hover:bg-gray-800 transition-colors">
              다운로드
            </button>
          </div>
        </div>

        <div className="rounded-lg overflow-hidden border border-gray-600">
          <div className="max-h-[200px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky h-[40px] top-0 bg-gray-800 text-white">
                <tr>
                  <th className="p-3">선택</th>
                  <th className="p-3">이름</th>
                  <th className="p-3">버전</th>
                  <th className="p-3">날짜</th>
                  <th className="p-3">상태</th>
                </tr>
              </thead>
              <tbody>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((_, idx) => (
                  <tr
                    key={idx}
                    className={`text-center text-white ${"bg-gray-700"} hover:bg-gray-500 cursor-pointer transition-colors`}
                  >
                    <td className="p-3">
                      <input type="checkbox" className="w-4 h-4" />
                    </td>
                    <td className="p-3">Component{idx + 1}</td>
                    <td className="p-3">1.5.{idx + 1}</td>
                    <td className="p-3">2024.11.{idx + 1}</td>
                    <td className="p-3">사용 가능</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageItemList;
