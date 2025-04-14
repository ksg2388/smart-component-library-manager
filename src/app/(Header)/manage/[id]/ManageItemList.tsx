"use client";

import useUserStore from "@/app/stores/UserStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import { IoArrowBack } from "react-icons/io5";
import dynamic from "next/dynamic";
import ComponentList from "./ComponentList";

interface Category {
  id: number;
  name: string;
}

interface FileLinks {
  fbx: string | null;
  vcmx: string | null;
}

interface RelatedFile {
  id: number;
  fileName: string;
  version: string;
  thumbnailImage: string;
  downloadCount: number;
  createdAt: string;
  description: string;
  mainFeatures: string[];
  recommendedEnvironment: string;
  componentId: number;
  categoryName: string;
  fileLinks: FileLinks;
}

interface ComponentDetail {
  id: number;
  fileName: string;
  version: string;
  createdAt: string;
  updatedAt: string;
  downloadCount: number;
  thumbnailImage: string;
  description: string;
  mainFeatures: string[];
  recommendedEnvironment: string;
  uploader: string | null;
  componentId: number;
  category: Category;
  fileLinks: {
    fbx: string;
    vcmx: string;
  };
  relatedFiles: RelatedFile[];
}

interface ManageItemListProps {
  id: string;
}

const FbxViewer = dynamic(() => import("@/app/_components/common/FbxViewer"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  ),
});

const ManageItemList = ({ id }: ManageItemListProps) => {
  const router = useRouter();
  const { user } = useUserStore();
  const [componentData, setComponentData] = useState<ComponentDetail | null>(
    null
  );
  const [description, setDescription] = useState("");
  const [features, setFeatures] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComponentData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/components/${id}`
        );

        if (!response.ok) {
          throw new Error("데이터를 가져오는데 실패했습니다");
        }

        const result = await response.json();
        if (result.success) {
          setComponentData(result.data);
          setDescription(result.data.description);
          setFeatures(result.data.mainFeatures.join("\n"));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "알 수 없는 오류가 발생했습니다"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchComponentData();
  }, [id]);

  // 관련 컴포넌트 클릭 핸들러
  const handleRelatedComponentClick = (relatedFile: RelatedFile) => {
    router.push(`/manage/${relatedFile.id}`);
  };

  if (loading) {
    return <div className="text-white">로딩 중...</div>;
  }

  if (error || !componentData) {
    return <div className="text-white">에러: {error}</div>;
  }

  return (
    <div className="h-full flex flex-col py-[20px] px-[30px] text-white">
      {/* 상단 버튼 영역 수정 */}
      <div className="flex items-center justify-between mt-4 mb-6">
        <button
          onClick={() => router.push("/manage")}
          className="group flex items-center gap-2 px-3 py-2 rounded-lg 
            bg-gray-800/50 backdrop-blur-sm hover:bg-gray-700/60
            transition-all duration-300 ease-in-out
            border border-gray-700/30 shadow-lg"
        >
          <IoArrowBack
            className="w-5 h-5 text-gray-300 
            group-hover:transform group-hover:-translate-x-1 
            transition-transform duration-300"
          />
          <span className="text-gray-300 text-sm font-medium">
            라이브러리 목록
          </span>
        </button>

        <div className="flex gap-3">
          {user?.role === "admin" && (
            <button
              className="px-4 py-2 rounded-lg
              bg-gradient-to-r from-blue-600 to-blue-700
              hover:from-blue-700 hover:to-blue-800
              text-white font-medium text-sm
              transition-all duration-300 ease-in-out
              shadow-lg shadow-blue-500/20
              border border-blue-600/30"
            >
              저장
            </button>
          )}
          <button
            onClick={() => router.push("/manage")}
            className="px-4 py-2 rounded-lg
              bg-gradient-to-r from-gray-700 to-gray-800
              hover:from-gray-800 hover:to-gray-900
              text-white font-medium text-sm
              transition-all duration-300 ease-in-out
              shadow-lg shadow-gray-800/20
              border border-gray-700/30"
          >
            목록
          </button>
        </div>
      </div>

      {/* 컴포넌트 제목 추가 */}
      <div className="mb-6">
        <h1
          className="text-2xl font-bold bg-clip-text text-transparent 
          bg-gradient-to-r from-white to-gray-400"
        >
          {componentData.fileName}
        </h1>
        <div className="flex items-center gap-3 mt-2">
          <span className="text-sm text-gray-400">
            버전 {componentData.version}
          </span>
          <span className="w-1 h-1 rounded-full bg-gray-600"></span>
          <span className="text-sm text-gray-400">
            {new Date(componentData.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      {/* 상단 컴포넌트 상세 정보 영역 */}
      <div className="w-full rounded-lg mb-6">
        <div className="flex flex-wrap gap-8">
          {/* 컴포넌트 이미지 영역 수정 */}
          <div className="flex flex-col">
            <h2 className="text-[20px] font-semibold mb-4 text-white">
              {componentData.fileLinks.fbx ? "3D 프리뷰" : "컴포넌트 이미지"}
            </h2>
            <div
              className="relative bg-gray-900 h-[360px] w-[360px] rounded-md shadow-lg overflow-hidden
              border border-gray-700/30 backdrop-blur-sm"
            >
              {componentData.fileLinks.fbx ? (
                <div className="relative w-full h-full">
                  <FbxViewer
                    key={componentData.fileLinks.fbx}
                    fbxUrl={`${process.env.NEXT_PUBLIC_API_URL}${componentData.fileLinks.fbx}`}
                  />
                  <div className="absolute bottom-2 left-2 bg-black/50 px-2 py-1 rounded-md text-xs text-gray-300 z-10">
                    마우스 좌클릭: 회전 | 우클릭: 이동 | 휠: 확대/축소
                  </div>
                </div>
              ) : (
                <Image
                  src={`${process.env.NEXT_PUBLIC_API_URL}${componentData.thumbnailImage}`}
                  alt="thumbnail"
                  className="object-cover"
                  fill
                />
              )}
            </div>
          </div>

          {/* 설명 영역 */}
          <div className="flex flex-col flex-1">
            <div className="flex flex-col h-full">
              <div className="flex-1">
                <h2 className="text-[18px] font-semibold mb-4 text-white">
                  설명
                </h2>
                {user?.role === "admin" ? (
                  <textarea
                    className="w-full h-[120px] bg-[#A7A7A7] resize-none px-[12px] py-[8px] rounded-md mb-4 text-white"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                ) : (
                  <div className="w-full h-[120px] px-[12px] py-[8px] rounded-md mb-4 text-white overflow-y-auto border-gray-700 border-[1px] bg-gray-800">
                    {description}
                  </div>
                )}

                <h2 className="text-[18px] font-semibold mb-4 text-white">
                  주요 기능 목록
                </h2>
                {user?.role === "admin" ? (
                  <textarea
                    className="w-full h-[100px] bg-[#A7A7A7] resize-none px-[12px] py-[8px] rounded-md mb-4 text-white"
                    value={features}
                    onChange={(e) => setFeatures(e.target.value)}
                  />
                ) : (
                  <div className="w-full h-[100px] px-[12px] py-[8px] rounded-md mb-4 text-white overflow-y-auto border-gray-700 border-[1px] bg-gray-800">
                    {features}
                  </div>
                )}

                <div className="mb-2">
                  <h2 className="text-[18px] font-semibold mb-2 text-white">
                    권장 사용 환경
                  </h2>
                  <p className="text-[16px] font-medium text-white">
                    {componentData.recommendedEnvironment}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ComponentList
        componentData={componentData}
        onRelatedComponentClick={handleRelatedComponentClick}
      />
    </div>
  );
};

export default ManageItemList;
