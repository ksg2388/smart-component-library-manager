"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import useSearchStore from "@/app/stores/SearchStore";
import { TLibrary } from "@/app/_types/manage/manage.types";
import { DownloadIconButton } from "./DownloadButton";

type ApiResponse = {
  success: boolean;
  data: {
    files: Omit<TLibrary, "selected">[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      limit: number;
    };
    filters: {
      category_id: number;
      search: string;
      sort: string;
    };
  };
};

type LibraryListProps = {
  categoryId: string | null;
};

const LibraryList = ({ categoryId }: LibraryListProps) => {
  const router = useRouter();
  const [libraryList, setLibraryList] = useState<TLibrary[]>([]);
  const [curPage, setCurPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeDownloadId, setActiveDownloadId] = useState<number | null>(null);
  const { searchTerm, sortBy } = useSearchStore();

  const itemsPerPage = 4;

  useEffect(() => {
    const fetchLibraries = async () => {
      setLoading(true);
      try {
        const categoryParam = categoryId ? `category_id=${categoryId}` : "";
        const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/components?`;
        const queryParams = [
          categoryParam,
          `search=${searchTerm}`,
          `sort=${sortBy}`,
          `page=${curPage}`,
          `limit=${itemsPerPage}`,
        ]
          .filter(Boolean)
          .join("&");

        const response = await fetch(`${baseUrl}${queryParams}`);

        if (!response.ok) {
          throw new Error("서버에서 데이터를 가져오는데 실패했습니다");
        }

        const data: ApiResponse = await response.json();

        if (data.success) {
          const librariesWithSelection = data.data.files.map((file) => ({
            ...file,
            selected: false,
          }));

          setLibraryList(librariesWithSelection);
          setTotalPages(data.data.pagination.totalPages);
        } else {
          throw new Error("데이터를 가져오는데 실패했습니다");
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchLibraries();
  }, [curPage, categoryId, itemsPerPage, searchTerm, sortBy]);

  useEffect(() => {
    setCurPage(1);
  }, [categoryId, searchTerm, sortBy]);

  // 체크박스 상태 변경 함수
  const toggleSelect = (index: number) => {
    const updatedList = [...libraryList];
    updatedList[index].selected = !updatedList[index].selected;
    setLibraryList(updatedList);
  };

  // 페이지 이동 함수
  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurPage(page);
    }
  };

  // 다운로드 아이콘 클릭 핸들러
  const handleDownloadClick = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveDownloadId(activeDownloadId === id ? null : id);
  };

  // 다운로드 옵션 닫기 핸들러
  const handleCloseDownloadOptions = () => {
    setActiveDownloadId(null);
  };

  useEffect(() => {
    return () => {};
  }, [activeDownloadId]);

  // 날짜 포맷 함수
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}.${String(date.getDate()).padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center w-full mt-[16px] text-white">
        로딩 중...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex-1 flex items-center justify-center w-full mt-[16px] text-white">
        오류: {error}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col w-full mt-[16px]">
      {/* 헤더 */}
      <div className="flex bg-gray-800 w-full h-[48px]">
        {[
          { label: "선택", flex: "flex-[1.5]" },
          { label: "미리보기", flex: "flex-[2]" },
          { label: "이름", flex: "flex-[8]" },
          { label: "버전", flex: "flex-[2]" },
          { label: "등록일", flex: "flex-[4]" },
          { label: "업데이트", flex: "flex-[4]" },
          { label: "다운로드 수", flex: "flex-[2]" },
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
      {libraryList.length > 0 ? (
        libraryList.map((item, index) => (
          <div
            key={item.id}
            className="flex bg-[#2E2E36] flex-1 w-full items-center border-b-[1px] border-[#3A3F44] hover:bg-gray-900 cursor-pointer max-h-[140px]"
          >
            <div className="flex items-center justify-center flex-[1.5]">
              <input
                type="checkbox"
                className="w-[24px] h-[24px]"
                checked={item.selected}
                onChange={() => toggleSelect(index)}
              />
            </div>
            <div
              className="flex items-center justify-center flex-[2] relative h-[124px] w-[124px] overflow-hidden"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              <Image
                src={
                  `${process.env.NEXT_PUBLIC_API_URL}${item.thumbnailImage}` ||
                  "/images/thumbnail.png"
                }
                alt="thumbnail"
                width={124}
                height={124}
                className="object-fill"
              />
            </div>
            <p
              className="flex font-[600] items-center justify-center flex-[8] cursor-pointer text-white h-full"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              {item.fileName}
            </p>
            <p
              className="flex font-[600] items-center justify-center flex-[2] text-white"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              {item.version}
            </p>
            <p
              className="flex font-[600] items-center justify-center flex-[4] text-white"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              {formatDate(item.createdAt)}
            </p>
            <p
              className="flex font-[600] items-center justify-center flex-[4] text-white"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              {formatDate(item.updatedAt)}
            </p>
            <p
              className="flex font-[600] items-center justify-center flex-[2] text-white"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              {item.downloadCount}
            </p>
            <p
              className="flex font-[600] items-center justify-center flex-[2] text-white"
              onClick={() => {
                router.push(`/manage/${item.id}`);
              }}
            >
              {"사용 가능"}
            </p>
            <DownloadIconButton
              item={item}
              isActive={activeDownloadId === item.id}
              onClick={(e) => handleDownloadClick(item.id, e)}
              onClose={handleCloseDownloadOptions}
            />
          </div>
        ))
      ) : (
        <div className="flex bg-[#2E2E36] flex-1 w-full items-center justify-center py-8 text-white">
          데이터가 없습니다
        </div>
      )}

      {/* 페이지네이션 */}
      <div className="flex bg-[#2E2E36] h-[56px] w-full items-center justify-center py-2 mt-auto">
        <button
          className="px-4 py-2 mx-2 bg-[#5A5F66] rounded text-white hover:bg-[#4A4F56] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(curPage - 1)}
          disabled={curPage === 1}
        >
          이전
        </button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={`px-3 py-1 mx-1 rounded ${
              curPage === i + 1
                ? "bg-[#1b1b1b] text-white"
                : "bg-[#5A5F66] text-white hover:bg-[#4A4F56]"
            }`}
            onClick={() => goToPage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button
          className="px-4 py-2 mx-2 bg-[#5A5F66] rounded text-white hover:bg-[#4A4F56] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={() => goToPage(curPage + 1)}
          disabled={curPage === totalPages}
        >
          다음
        </button>
      </div>
    </div>
  );
};

export default LibraryList;
