"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

type TLibrary = {
  selected: boolean;
  name: string;
  version: string;
  registrationDate: string;
  update: string;
  frequency: number;
  state: string;
  downloadLink: string;
};

const initialLibraryList: TLibrary[] = [
  {
    selected: false,
    name: "UI Kit",
    version: "3.2.1",
    registrationDate: "2024.10.01",
    update: "2024.11.15",
    frequency: 500,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Authentication Module",
    version: "2.5.4",
    registrationDate: "2024.09.12",
    update: "2024.11.01",
    frequency: 3200,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Data Grid",
    version: "1.8.0",
    registrationDate: "2024.08.20",
    update: "2024.10.05",
    frequency: 1500,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Chart Library",
    version: "4.1.3",
    registrationDate: "2024.07.14",
    update: "2024.10.20",
    frequency: 2000,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Form Builder",
    version: "3.0.2",
    registrationDate: "2024.06.01",
    update: "2024.09.30",
    frequency: 870,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Notification Service",
    version: "1.2.5",
    registrationDate: "2024.05.18",
    update: "2024.08.22",
    frequency: 1420,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "File Uploader",
    version: "2.4.1",
    registrationDate: "2024.04.11",
    update: "2024.07.15",
    frequency: 1230,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "PDF Viewer",
    version: "5.3.0",
    registrationDate: "2024.03.25",
    update: "2024.06.10",
    frequency: 890,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Scheduler",
    version: "4.0.7",
    registrationDate: "2024.02.15",
    update: "2024.05.22",
    frequency: 980,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Image Cropper",
    version: "2.1.6",
    registrationDate: "2024.01.30",
    update: "2024.04.25",
    frequency: 450,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "User Management",
    version: "3.1.2",
    registrationDate: "2023.12.12",
    update: "2024.03.20",
    frequency: 3600,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Dashboard Widgets",
    version: "4.5.8",
    registrationDate: "2023.11.05",
    update: "2024.02.18",
    frequency: 2750,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Theme Manager",
    version: "1.9.0",
    registrationDate: "2023.10.20",
    update: "2024.01.15",
    frequency: 640,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Error Tracker",
    version: "2.2.1",
    registrationDate: "2023.09.14",
    update: "2023.12.30",
    frequency: 2100,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "API Gateway",
    version: "3.4.5",
    registrationDate: "2023.08.01",
    update: "2023.11.10",
    frequency: 1900,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Task Manager",
    version: "1.7.4",
    registrationDate: "2023.07.18",
    update: "2023.10.05",
    frequency: 1235,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Localization Module",
    version: "2.8.3",
    registrationDate: "2023.06.14",
    update: "2023.09.25",
    frequency: 840,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Analytics Service",
    version: "4.6.9",
    registrationDate: "2023.05.30",
    update: "2023.08.20",
    frequency: 2750,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Multi-Tenant Module",
    version: "3.3.1",
    registrationDate: "2023.04.25",
    update: "2023.07.30",
    frequency: 1600,
    state: "사용 가능",
    downloadLink: "",
  },
  {
    selected: false,
    name: "Search Engine",
    version: "5.2.4",
    registrationDate: "2023.03.12",
    update: "2023.06.18",
    frequency: 3650,
    state: "사용 가능",
    downloadLink: "",
  },
];

const LibraryList = () => {
  const router = useRouter();
  const [libraryList, setLibraryList] =
    useState<TLibrary[]>(initialLibraryList);
  const [curPage, setCurPage] = useState(1);

  const itemsPerPage = 10;
  const totalPage = Math.ceil(libraryList.length / itemsPerPage);

  const startIndex = (curPage - 1) * itemsPerPage;
  const currentItems = libraryList.slice(startIndex, startIndex + itemsPerPage);

  // 체크박스 상태 변경 함수
  const toggleSelect = (index: number) => {
    const updatedList = [...libraryList];
    const actualIndex = startIndex + index;
    updatedList[actualIndex].selected = !updatedList[actualIndex].selected;
    setLibraryList(updatedList);
  };

  // 페이지 이동 함수
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPage) setCurPage(page);
  };

  // 이미지 다운로드 함수
  const downloadImage = () => {
    const link = document.createElement("a");
    link.href = "/images/ic-home.png";
    link.download = "ic-home.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col w-full mt-[16px]">
      {/* 헤더 */}
      <div className="flex bg-gray-800 w-full flex-1">
        {[
          { label: "선택", flex: "flex-[1.5]" },
          { label: "이름", flex: "flex-[8]" },
          { label: "버전", flex: "flex-[2]" },
          { label: "등록일", flex: "flex-[4]" },
          { label: "업데이트", flex: "flex-[4]" },
          { label: "사용빈도", flex: "flex-[2]" },
          { label: "상태", flex: "flex-[2]" },
          { label: "다운로드", flex: "flex-[2]" },
        ].map((header, index) => (
          <p
            key={index}
            className={`flex font-[600] items-center justify-center ${header.flex} text-white`}
          >
            {header.label}
          </p>
        ))}
      </div>

      {/* 리스트 */}
      {currentItems.map((item, index) => (
        <div
          key={index}
          className="flex bg-[#2E2E36] flex-1 w-full items-center border-b-[1px] border-[#3A3F44] hover:bg-gray-900 cursor-pointer"
        >
          <div className="flex font-[600] items-center justify-center flex-[1.5]">
            <input
              type="checkbox"
              className="w-[24px] h-[24px]"
              checked={item.selected}
              onChange={() => toggleSelect(index)}
            />
          </div>
          <p
            className="flex font-[600] items-center justify-center flex-[8] cursor-pointer text-white"
            onClick={() => {
              router.push("/manage/1");
            }}
          >
            {item.name}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2] text-white">
            {item.version}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[4] text-white">
            {item.registrationDate}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[4] text-white">
            {item.update}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2] text-white">
            {item.frequency}
          </p>
          <p className="flex font-[600] items-center justify-center flex-[2] text-white">
            {item.state}
          </p>
          <div className="flex font-[600] items-center justify-center flex-[2] relative">
            <div
              className="w-[24px] h-[24px] relative cursor-pointer"
              onClick={downloadImage}
            >
              <Image
                src={"/images/ic-download-white.png"}
                alt="donwload"
                fill
              />
            </div>
          </div>
        </div>
      ))}

      {/* 페이지네이션 */}
      <div className="flex bg-[#2E2E36] h-[56px] w-full items-center justify-center py-2 mt-2">
        <button
          className="px-4 py-2 mx-2 bg-[#5A5F66] rounded text-white"
          onClick={() => goToPage(curPage - 1)}
          disabled={curPage === 1}
        >
          이전
        </button>
        {Array.from({ length: totalPage }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 mx-1 rounded ${
              curPage === i + 1
                ? "bg-[#1b1b1b] text-white"
                : "bg-[#5A5F66] text-white"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-2 bg-[#5A5F66] rounded text-white"
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
