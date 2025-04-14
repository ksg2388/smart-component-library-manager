"use client";

import { useState } from "react";
import useUserStore from "@/app/stores/UserStore";

interface VersionUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  componentId: number;
  initialData?: {
    version: string;
    description: string;
    mainFeatures: string[];
    recommendedEnvironment: string;
    thumbnailImage?: string;
    fileLinks?: {
      fbx?: string;
      vcmx?: string;
    };
  };
}

const VersionUpdateModal = ({
  isOpen,
  onClose,
  componentId,
  initialData,
}: VersionUpdateModalProps) => {
  const getAccessToken = useUserStore((state) => state.getAccessToken);

  const [formData, setFormData] = useState({
    version: initialData?.version || "",
    description: initialData?.description || "",
    mainFeatures: initialData?.mainFeatures?.join("\n") || "",
    recommendedEnvironment: initialData?.recommendedEnvironment || "",
  });

  const [files, setFiles] = useState<{
    thumbnail?: File;
    fbx?: File;
    vcmx?: File;
  }>({});

  const [useOriginThumbnail, setUseOriginThumbnail] = useState(true);
  const [thumbnailPreview, setThumbnailPreview] = useState<string>(
    initialData?.thumbnailImage
      ? `${process.env.NEXT_PUBLIC_API_URL}${initialData.thumbnailImage}`
      : ""
  );

  const [existingFiles, setExistingFiles] = useState({
    fbx: initialData?.fileLinks?.fbx || "",
    vcmx: initialData?.fileLinks?.vcmx || "",
  });

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFiles((prev) => ({ ...prev, thumbnail: file }));
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
      setUseOriginThumbnail(false);
    }
  };

  const handleClose = () => {
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
    }
    setThumbnailPreview("");
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const accessToken = getAccessToken();

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      const formDataToSend = new FormData();

      // 기본 데이터 추가
      formDataToSend.append("version", formData.version);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("environment", formData.recommendedEnvironment);

      // features 배열 추가
      const features = formData.mainFeatures
        .split("\n")
        .filter((feature) => feature.trim());
      features.forEach((feature, index) => {
        formDataToSend.append(`features[${index}]`, feature);
      });

      // useOriginThumbnail 추가
      formDataToSend.append(
        "useOriginThumbnail",
        useOriginThumbnail.toString()
      );

      // 새 썸네일이 선택되었고 기존 썸네일을 사용하지 않을 경우에만 추가
      if (files.thumbnail && !useOriginThumbnail) {
        formDataToSend.append("thumbnail", files.thumbnail);
      }

      // FBX, VCMX 파일 추가
      if (files.fbx) {
        formDataToSend.append("fbxFile", files.fbx);
      }
      if (files.vcmx) {
        formDataToSend.append("vcmxFile", files.vcmx);
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/components/${componentId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
          body: formDataToSend,
        }
      );

      if (response.status === 401) {
        alert("인증이 만료되었습니다. 다시 로그인해주세요.");
        return;
      }

      const data = await response.json();

      if (data.success) {
        alert("버전이 업데이트되었습니다.");
        handleClose();
      } else {
        alert(data.message || "버전 업데이트에 실패했습니다.");
      }
    } catch (error) {
      console.error("버전 업데이트 중 오류 발생:", error);
      alert("버전 업데이트 중 오류가 발생했습니다.");
    }
  };

  console.log(initialData);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[600px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">새 버전 등록</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              썸네일 이미지
            </label>
            <div className="space-y-2">
              {thumbnailPreview && (
                <div className="relative w-32 h-32 rounded-lg overflow-hidden">
                  <img
                    src={thumbnailPreview}
                    alt="썸네일 미리보기"
                    className="object-cover w-full h-full"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      URL.revokeObjectURL(thumbnailPreview);
                      setThumbnailPreview("");
                      setFiles((prev) => ({ ...prev, thumbnail: undefined }));
                      setUseOriginThumbnail(true);
                    }}
                    className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-600 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              )}
              {initialData?.thumbnailImage}
              {initialData?.thumbnailImage && (
                <div className="flex items-center gap-2 mb-2">
                  <input
                    type="checkbox"
                    checked={useOriginThumbnail}
                    onChange={(e) => setUseOriginThumbnail(e.target.checked)}
                    className="w-4 h-4"
                  />
                  <label className="text-sm text-gray-300">
                    기존 썸네일 사용하기
                  </label>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              />
              <p className="text-xs text-gray-400">
                권장 크기: 360x360px, 최대 2MB
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              버전
            </label>
            <input
              type="text"
              value={formData.version}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, version: e.target.value }))
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              placeholder="예: 1.0.0"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              설명
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  description: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white h-24 resize-none"
              placeholder="버전에 대한 설명을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              주요 기능 목록 (줄바꿈으로 구분)
            </label>
            <textarea
              value={formData.mainFeatures}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  mainFeatures: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white h-24 resize-none"
              placeholder="주요 기능을 입력하세요"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              권장 사용 환경
            </label>
            <input
              type="text"
              value={formData.recommendedEnvironment}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  recommendedEnvironment: e.target.value,
                }))
              }
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              placeholder="권장 사용 환경을 입력하세요"
            />
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                FBX 파일
              </label>
              {existingFiles.fbx && (
                <div className="mb-2 text-sm text-gray-400">
                  현재 파일: {existingFiles.fbx.split("/").pop()}
                </div>
              )}
              <input
                type="file"
                accept=".fbx"
                onChange={(e) =>
                  setFiles((prev) => ({ ...prev, fbx: e.target.files?.[0] }))
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                VCMX 파일
              </label>
              {existingFiles.vcmx && (
                <div className="mb-2 text-sm text-gray-400">
                  현재 파일: {existingFiles.vcmx.split("/").pop()}
                </div>
              )}
              <input
                type="file"
                accept=".vcmx"
                onChange={(e) =>
                  setFiles((prev) => ({ ...prev, vcmx: e.target.files?.[0] }))
                }
                className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-500 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition-colors"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VersionUpdateModal;
