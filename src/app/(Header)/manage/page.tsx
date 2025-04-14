"use client";

import LibraryList from "@/app/_components/common/manage/LibraryList";
import SelectBox from "@/app/_components/common/SelectBox";
import React, { useState, useEffect } from "react";
import ComponentModal from "./ComponentModal";
import { TComponentFormData } from "@/app/_types/manage/manage.types";
import useSearchStore from "@/app/stores/SearchStore";
import useUserStore from "@/app/stores/UserStore";
import CategoryEditModal from "./CategoryEditModal";

// 카테고리 타입 정의
interface Category {
  id: number;
  name: string;
}

const Page = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCategoryEditModalOpen, setIsCategoryEditModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null
  );
  const { setSearchTerm, setSortBy } = useSearchStore();
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [activeSort, setActiveSort] = useState<"latest" | "downloads" | "name">(
    "latest"
  );

  const { user, getAccessToken } = useUserStore();

  // 카테고리 데이터 가져오기
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/categories`)
      .then((res) => res.json())
      .then((data) => {
        setCategories(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("카테고리 데이터를 불러오는 중 오류 발생:", err);
        setIsLoading(false);
      });
  }, []);

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategoryId(categoryId === "all" ? null : categoryId);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenCategoryEditModal = () => {
    setIsCategoryEditModalOpen(true);
  };

  const handleCloseCategoryEditModal = () => {
    setIsCategoryEditModalOpen(false);
  };

  const handleSubmitComponent = async (formData: TComponentFormData) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    // FormData 객체 생성
    const formDataToSend = new FormData();

    // 일반 텍스트 필드 추가
    formDataToSend.append("componentName", formData.componentName);
    formDataToSend.append("version", formData.version);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("environment", formData.environment);

    // 카테고리 ID 추가
    if (formData.categoryId) {
      formDataToSend.append("categoryId", formData.categoryId);
    }

    // 배열 데이터 추가 (features)
    formData.features.forEach((feature, index) => {
      formDataToSend.append(`features[${index}]`, feature);
    });

    // 파일 추가 (null이 아닌 경우에만)
    if (formData.thumbnail) {
      formDataToSend.append("thumbnail", formData.thumbnail);
    }

    if (formData.fbxFile) {
      formDataToSend.append("fbxFile", formData.fbxFile);
    }

    if (formData.vcmxFile) {
      formDataToSend.append("vcmxFile", formData.vcmxFile);
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/components`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("컴포넌트가 등록되었습니다.");
        handleCloseModal();
      } else {
        // 토큰 만료 등의 인증 오류 처리
        if (response.status === 401) {
          alert("인증이 만료되었습니다. 다시 로그인해주세요.");
          // 로그아웃 처리나 토큰 갱신 로직을 여기에 추가할 수 있습니다.
          return;
        }
        alert(data.message || "컴포넌트 등록에 실패했습니다.");
      }
    } catch (err) {
      console.error("컴포넌트 등록 중 오류 발생:", err);
      alert("컴포넌트 등록 중 오류가 발생했습니다.");
    }
  };

  // 검색 입력 핸들러
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  // 검색 조건 변경 핸들러
  const handleSearchTypeChange = (value: string) => {
    setSearchType(value);
  };

  // 검색 버튼 클릭 핸들러
  const handleSearch = () => {
    setSearchTerm(searchInput);
  };

  // 정렬 기준 변경 핸들러
  const handleSortChange = (sort: "latest" | "downloads" | "name") => {
    setActiveSort(sort);
    setSortBy(sort);
  };

  return (
    <div className="h-full flex flex-col py-[20px] px-[30px]">
      <div className="text-[28px] font-[600] text-white mb-7">라이브러리</div>
      <div className="flex items-center text-[16px] font-[500] space-x-4">
        <div className="flex items-center space-x-2">
          <p className="text-white">카테고리</p>
          <div className="w-[160px]">
            <SelectBox
              options={
                isLoading
                  ? [{ label: "로딩 중...", value: "" }]
                  : [
                      { label: "전체", value: "all" },
                      ...categories.map((category) => ({
                        label: category.name,
                        value: category.id.toString(),
                      })),
                    ]
              }
              defaultValue="all"
              onChange={handleCategoryChange}
            />
          </div>
          {user?.role === "admin" && (
            <button
              onClick={handleOpenCategoryEditModal}
              className="bg-gray-500 text-white px-[12px] py-[6px] rounded-[6px] shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out"
            >
              설정
            </button>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <p className="text-white">검색조건</p>
          <div className="w-[160px]">
            <SelectBox
              options={[
                { label: "이름", value: "name" },
                { label: "컴포넌트명", value: "componentName" },
              ]}
              defaultValue="name"
              onChange={handleSearchTypeChange}
            />
          </div>
          <input
            className="border-[1px] border-[#D9D9D9] rounded-[8px] w-[240px] h-[38px] outline-none px-[8px] bg-gray-800 text-white placeholder-gray-400 transition-all duration-300 ease-in-out"
            value={searchInput}
            onChange={handleSearchInputChange}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
            placeholder="검색어를 입력하세요"
          />
          <button
            className="bg-gray-500 text-white px-[20px] py-[6px] rounded-[6px] shadow-lg hover:bg-gray-600 transition-all duration-300 ease-in-out"
            onClick={handleSearch}
          >
            검색
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-[24px] w-full">
        <div className="flex">
          <button
            className="text-white px-[12px] py-[6px] bg-blue-600 rounded-[6px] hover:bg-blue-700 transition-all duration-300 ease-in-out"
            onClick={handleOpenModal}
          >
            등록
          </button>
          <button className="text-white px-[12px] py-[6px] bg-red-600 rounded-[6px] ml-[8px] hover:bg-red-700 transition-all duration-300 ease-in-out">
            삭제
          </button>
        </div>
      </div>
      <div className="flex justify-end mt-[16px] w-full">
        <div className="flex text-white">
          <p className="font-[600]">정렬기준</p>
          <span
            className={`ml-[24px] pb-[2px] cursor-pointer ${
              activeSort === "latest" ? "border-b-[1px] border-white" : ""
            }`}
            onClick={() => handleSortChange("latest")}
          >
            최신순
          </span>
          <span
            className={`ml-[24px] pb-[2px] cursor-pointer ${
              activeSort === "downloads" ? "border-b-[1px] border-white" : ""
            }`}
            onClick={() => handleSortChange("downloads")}
          >
            다운로드순
          </span>
          <span
            className={`ml-[24px] mr-[8px] pb-[2px] cursor-pointer ${
              activeSort === "name" ? "border-b-[1px] border-white" : ""
            }`}
            onClick={() => handleSortChange("name")}
          >
            이름순
          </span>
        </div>
      </div>
      <LibraryList categoryId={selectedCategoryId} />

      {/* 모달 컴포넌트 */}
      <ComponentModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handleSubmitComponent}
        categories={categories}
      />

      {/* 카테고리 편집 모달 */}
      <CategoryEditModal
        isOpen={isCategoryEditModalOpen}
        onClose={handleCloseCategoryEditModal}
        categories={categories}
        setCategories={setCategories}
      />
    </div>
  );
};

export default Page;
