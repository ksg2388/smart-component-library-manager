"use client";

import React, { useState } from "react";

type TLibrary = {
  seleted: boolean;
  name: string;
  version: string;
  registrationDate: string;
  update: string;
  frequency: number;
  state: string;
  downloadLink: string;
};

const libraryList: TLibrary[] = [
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component1",
    version: "1.5.3",
    registrationDate: "2024.11.20",
    update: "2024.11.20",
    frequency: 127,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    seleted: false,
    name: "component2",
    version: "2.1.3",
    registrationDate: "2024.11.03",
    update: "2024.11.17",
    frequency: 8712,
    state: "사용 가능",
    downloadLink: "",
  },
];

const LibraryList = () => {
  const [curPage, setCurPage] = useState(1);
  const itemsPerPage = 10;
  const totalPage = Math.ceil(libraryList.length / itemsPerPage);
  const startIndex = Math.max((curPage - 1) * itemsPerPage, 0);

  const currentItems = libraryList.slice(startIndex, startIndex + itemsPerPage);
  const emptyRows = Array.from(
    { length: itemsPerPage - currentItems.length },
    () => ({}) // 빈 객체로 표현
  );

  // 페이지 이동 함수
  const goToPage = (page: number) => {
    if (page < 1 || page > totalPage) return;
    setCurPage(page);
  };

  return (
    <div className="flex-1 flex flex-col w-full mt-[16px]">
      <div className="flex bg-[#8B8B8B] flex-1 w-full">
        <p className="flex font-[600] items-center justify-center flex-[1.5]">
          선택
        </p>
        <p className="flex font-[600] items-center justify-center flex-[8]">
          이름
        </p>
        <p className="flex font-[600] items-center justify-center flex-[2]">
          버전
        </p>
        <p className="flex font-[600] items-center justify-center flex-[4]">
          등록일
        </p>
        <p className="flex font-[600] items-center justify-center flex-[4]">
          업데이트
        </p>
        <p className="flex font-[600] items-center justify-center flex-[2]">
          사용빈도
        </p>
        <p className="flex font-[600] items-center justify-center flex-[2]">
          상태
        </p>
        <p className="flex font-[600] items-center justify-center flex-[2]">
          다운로드
        </p>
      </div>
      {[...currentItems, ...emptyRows].map((item, index) => (
        <div
          className={`flex ${
            Object.keys(item).length === 0 ? "bg-transparent" : "bg-[#CDCDCD]"
          } flex-1 w-full`}
          key={index}
        >
          <div className="flex font-[600] items-center justify-center flex-[1.5]">
            {Object.keys(item).length !== 0 && (
              <input
                type="checkbox"
                className="w-[24px] h-[24px]"
                checked={item.seleted}
                onChange={() => !item.seleted}
              />
            )}
          </div>
          <p className="flex font-[600] items-center justify-center flex-[8]">
            {item.name || ""}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2]">
            {item.version || ""}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[4]">
            {item.registrationDate || ""}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[4]">
            {item.update || ""}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2]">
            {item.frequency || ""}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2]">
            {item.state || ""}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2]">
            {item.downloadLink ? "다운로드" : ""}
          </p>
        </div>
      ))}
      <div className="flex bg-[#8B8B8B] h-[56px] w-full items-center justify-center py-2">
        <button
          className="px-4 py-2 mx-2 bg-[#CDCDCD] rounded"
          onClick={() => goToPage(curPage - 1)}
          disabled={curPage === 1}
        >
          이전
        </button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 mx-1 rounded ${
              curPage === i + 1 ? "bg-[#1b1b1b] text-white" : "bg-[#CDCDCD]"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-2 bg-[#CDCDCD] rounded"
          onClick={() => goToPage(curPage + 1)}
          disabled={curPage === totalPage}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default LibraryList;
