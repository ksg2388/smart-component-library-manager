"use client";

import { TComponentFormData } from "@/app/_types/manage/manage.types";
import Image from "next/image";
import React, { useState, useEffect } from "react";

// 카테고리 타입 정의
interface Category {
  id: number;
  name: string;
}

interface ComponentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: TComponentFormData) => void;
  categories: Category[];
}

const ComponentModal = ({
  isOpen,
  onClose,
  onSubmit,
  categories,
}: ComponentModalProps) => {
  const [formData, setFormData] = useState<TComponentFormData>({
    thumbnail: null,
    componentName: "",
    version: "",
    description: "",
    features: [""],
    environment: "",
    fbxFile: null,
    vcmxFile: null,
    categoryId: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  // 컴포넌트가 마운트되거나 categories가 변경될 때 첫 번째 카테고리로 설정
  useEffect(() => {
    if (categories.length > 0) {
      setFormData((prev) => ({
        ...prev,
        categoryId: categories[0].id.toString(),
      }));
    }
  }, [categories]);

  // 모달이 열릴 때마다 폼 초기화
  useEffect(() => {
    if (isOpen && categories.length > 0) {
      setFormData({
        thumbnail: null,
        componentName: "",
        version: "",
        description: "",
        features: [""],
        environment: "",
        fbxFile: null,
        vcmxFile: null,
        categoryId: categories[0].id.toString(),
      });
      setThumbnailPreview(null);
      setErrors({});
    }
  }, [isOpen, categories]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData({
        ...formData,
        [name]: files[0],
      });

      // 썸네일 이미지인 경우 미리보기 생성
      if (name === "thumbnail") {
        const reader = new FileReader();
        reader.onload = () => {
          setThumbnailPreview(reader.result as string);
        };
        reader.readAsDataURL(files[0]);
      }
    }
  };

  const handleFeatureChange = (index: number, value: string) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures[index] = value;
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const addFeature = () => {
    setFormData({
      ...formData,
      features: [...formData.features, ""],
    });
  };

  const removeFeature = (index: number) => {
    const updatedFeatures = [...formData.features];
    updatedFeatures.splice(index, 1);
    setFormData({
      ...formData,
      features: updatedFeatures,
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.componentName)
      newErrors.componentName = "컴포넌트명은 필수입니다.";
    if (!formData.version) newErrors.version = "버전은 필수입니다.";
    if (!formData.categoryId) newErrors.categoryId = "카테고리는 필수입니다.";

    // FBX 또는 VCMX 파일 중 하나는 필수
    if (!formData.fbxFile && !formData.vcmxFile) {
      newErrors.files = "FBX 파일 또는 VCMX 파일 중 하나는 필수입니다.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
      // 폼 초기화 및 미리보기 초기화
      setThumbnailPreview(null);
    }
  };

  const removeThumbnail = () => {
    setFormData({
      ...formData,
      thumbnail: null,
    });
    setThumbnailPreview(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 w-[800px] max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
          aria-label="닫기"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">새 컴포넌트 등록</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-white mb-2">썸네일 이미지</label>
            {thumbnailPreview ? (
              <div className="mb-3">
                <div className="relative inline-block">
                  <Image
                    src={thumbnailPreview}
                    alt="썸네일 미리보기"
                    width={200}
                    height={200}
                    className="rounded border border-gray-600"
                  />
                  <button
                    type="button"
                    onClick={removeThumbnail}
                    className="absolute top-2 right-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center hover:bg-red-700"
                  >
                    ×
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 mb-3 text-center">
                <p className="text-gray-400">이미지를 업로드하세요</p>
              </div>
            )}
            <input
              type="file"
              name="thumbnail"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">카테고리 *</label>
            <select
              name="categoryId"
              value={formData.categoryId}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.id.toString()}>
                  {category.name}
                </option>
              ))}
            </select>
            {errors.categoryId && (
              <p className="text-red-500 mt-1">{errors.categoryId}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">컴포넌트명 *</label>
            <input
              type="text"
              name="componentName"
              value={formData.componentName}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
            {errors.componentName && (
              <p className="text-red-500 mt-1">{errors.componentName}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">버전 *</label>
            <input
              type="text"
              name="version"
              value={formData.version}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
            {errors.version && (
              <p className="text-red-500 mt-1">{errors.version}</p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">설명</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded h-24"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">주요 기능 목록</label>
            {formData.features.map((feature, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={feature}
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                  className="flex-grow bg-gray-700 text-white p-2 rounded"
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeFeature(index)}
                    className="ml-2 bg-red-600 text-white px-3 py-2 rounded"
                  >
                    삭제
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addFeature}
              className="bg-blue-600 text-white px-3 py-2 rounded mt-2"
            >
              기능 추가
            </button>
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">권장 사용 환경</label>
            <input
              type="text"
              name="environment"
              value={formData.environment}
              onChange={handleInputChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">FBX 파일 *</label>
            <input
              type="file"
              name="fbxFile"
              accept=".fbx"
              onChange={handleFileChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
            {formData.fbxFile && (
              <p className="text-green-500 mt-1">
                {(formData.fbxFile as File).name} 파일이 선택되었습니다.
              </p>
            )}
          </div>

          <div className="mb-4">
            <label className="block text-white mb-2">VCMX 파일 *</label>
            <input
              type="file"
              name="vcmxFile"
              accept=".vcmx"
              onChange={handleFileChange}
              className="w-full bg-gray-700 text-white p-2 rounded"
            />
            {formData.vcmxFile && (
              <p className="text-green-500 mt-1">
                {(formData.vcmxFile as File).name} 파일이 선택되었습니다.
              </p>
            )}
            {errors.files && (
              <p className="text-red-500 mt-1">{errors.files}</p>
            )}
            <p className="text-gray-400 text-sm mt-1">
              * FBX 파일 또는 VCMX 파일 중 하나는 필수입니다.
            </p>
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 text-white px-4 py-2 rounded mr-2 hover:bg-gray-700"
            >
              취소
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ComponentModal;
