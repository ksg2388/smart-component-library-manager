import LibraryList from "@/app/_components/common/manage/LibraryList";
import SelectBox from "@/app/_components/common/SelectBox";
import React from "react";

const page = () => {
  return (
    <div className="h-full mt-[16px] flex flex-col">
      <div className="flex items-center text-[16px] font-[500]">
        <p className="text-white mr-[12px] ml-[12px]">카테고리</p>
        <div className="w-[160px]">
          <SelectBox
            options={[
              { label: "기계", value: "기계" },
              { label: "설비", value: "설비" },
            ]}
            defaultValue="기계"
          />
        </div>
        <button className="bg-[#D9D9D9] text-black px-[8px] py-[6px] rounded-[6px] ml-[12px]">
          설정
        </button>
        <p className="text-white ml-[100px] mr-[12px]">검색조건</p>
        <div className="w-[160px]">
          <SelectBox
            options={[
              { label: "이름", value: "이름" },
              { label: "컴포넌트명", value: "컴포넌트명" },
            ]}
            defaultValue="기계"
          />
        </div>
        <input className="border-[1px] border-[#D9D9D9] ml-[12px] rounded-[8px] w-[240px] h-[38px] outline-none px-[8px] bg-transparent text-white" />
        <button className="bg-[#D9D9D9] text-black px-[8px] py-[6px] rounded-[6px] ml-[160px]">
          상세검색
        </button>
        <button className="bg-[#D9D9D9] text-black px-[20px] py-[6px] rounded-[6px] ml-auto">
          검색
        </button>
      </div>
      <div className="flex justify-end mt-[24px] w-full">
        <div className="flex">
          <button className="text-white px-[8px] py-[4px] bg-black rounded-[6px]">
            등록
          </button>
          <button className="text-white px-[8px] py-[4px] bg-[#575757] rounded-[6px] ml-[8px]">
            삭제
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-[16px] w-full">
        <div className="flex text-white">
          <p className="font-[600]">정렬기준</p>
          <span className="ml-[24px] border-b-[1px] border-white pb-[2px]">
            최신순
          </span>
          <span className="ml-[24px]">업데이트순</span>
          <span className="ml-[24px] mr-[8px]">사용빈도순</span>
        </div>
      </div>
      <LibraryList />
    </div>
  );
};

export default page;
