"use client";

import { useState } from "react";
import VersionUpdateModal from "./VersionUpdateModal";
import useUserStore from "@/app/stores/UserStore";
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

interface ComponentListProps {
  componentData: {
    id: number;
    fileName: string;
    version: string;
    description: string;
    mainFeatures: string[];
    recommendedEnvironment: string;
    thumbnailImage: string;
    fileLinks: FileLinks;
    relatedFiles: RelatedFile[];
    componentId: number;
  };
  onRelatedComponentClick: (file: RelatedFile) => void;
}

const ComponentList = ({
  componentData,
  onRelatedComponentClick,
}: ComponentListProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useUserStore();

  const handleVersionUpdate = async (data: any) => {
    try {
      // TODO: API 호출 구현
      console.log("Version update data:", data);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Version update failed:", error);
    }
  };

  const handleFileDownload = async (
    e: React.MouseEvent,
    fileUrl: string,
    fileName: string
  ) => {
    e.stopPropagation();
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}${fileUrl}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/octet-stream",
          },
        }
      );

      if (!response.ok) throw new Error("다운로드에 실패했습니다.");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName; // 파일 이름 설정
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("파일 다운로드 중 오류 발생:", error);
      alert("파일 다운로드에 실패했습니다.");
    }
  };

  return (
    <div className="w-full flex-1 mt-10">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <h2 className="text-[20px] font-semibold text-white">
            컴포넌트 목록
          </h2>
          {user?.role === "admin" && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-3 py-1 text-sm rounded-md
              bg-gradient-to-r from-green-600 to-green-700
              hover:from-green-700 hover:to-green-800
              text-white transition-all duration-200 ease-in-out
              shadow-sm shadow-green-500/20"
            >
              새 버전 등록
            </button>
          )}
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
                <th className="p-3">다운로드</th>
              </tr>
            </thead>
            <tbody>
              {componentData.relatedFiles.map((file) => (
                <tr
                  key={file.id}
                  className="text-center text-white bg-gray-700 hover:bg-gray-600 transition-colors"
                >
                  <td className="p-3">
                    <input
                      type="checkbox"
                      className="w-4 h-4"
                      onClick={(e) => e.stopPropagation()}
                    />
                  </td>
                  <td
                    className="p-3 cursor-pointer hover:text-blue-400"
                    onClick={() => onRelatedComponentClick(file)}
                  >
                    {file.fileName}
                  </td>
                  <td className="p-3">{file.version}</td>
                  <td className="p-3">
                    {new Date(file.createdAt).toLocaleDateString()}
                  </td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      {file.fileLinks.fbx && (
                        <button
                          onClick={(e) =>
                            handleFileDownload(
                              e,
                              file.fileLinks.fbx!,
                              `${file.fileName}_${file.version}.fbx`
                            )
                          }
                          className="px-3 py-1 text-sm rounded-md
                            bg-gradient-to-r from-blue-600 to-blue-700
                            hover:from-blue-700 hover:to-blue-800
                            transition-all duration-200 ease-in-out
                            shadow-sm shadow-blue-500/20"
                        >
                          FBX
                        </button>
                      )}
                      {file.fileLinks.vcmx && (
                        <button
                          onClick={(e) =>
                            handleFileDownload(
                              e,
                              file.fileLinks.vcmx!,
                              `${file.fileName}_${file.version}.vcmx`
                            )
                          }
                          className="px-3 py-1 text-sm rounded-md
                            bg-gradient-to-r from-purple-600 to-purple-700
                            hover:from-purple-700 hover:to-purple-800
                            transition-all duration-200 ease-in-out
                            shadow-sm shadow-purple-500/20"
                        >
                          VCMX
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <VersionUpdateModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        componentId={componentData.componentId}
        initialData={{
          version: componentData.version,
          description: componentData.description,
          mainFeatures: componentData.mainFeatures,
          recommendedEnvironment: componentData.recommendedEnvironment,
          thumbnailImage: componentData.thumbnailImage,
        }}
      />
    </div>
  );
};

export default ComponentList;
