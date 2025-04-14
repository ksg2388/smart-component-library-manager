"use client";

import React, { useState } from "react";
import useUserStore from "@/app/stores/UserStore"; // 인증 토큰 가져오기 위한 import

interface Category {
  id: number;
  name: string;
}

interface CategoryEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  setCategories: React.Dispatch<React.SetStateAction<Category[]>>;
}

const CategoryEditModal = ({
  isOpen,
  onClose,
  categories,
  setCategories,
}: CategoryEditModalProps) => {
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategoryId, setEditingCategoryId] = useState<number | null>(
    null
  );
  const [editingCategoryName, setEditingCategoryName] = useState("");

  const getAccessToken = useUserStore((state) => state.getAccessToken); // 인증 토큰 가져오기

  const handleAddCategory = async () => {
    if (newCategoryName.trim()) {
      const accessToken = getAccessToken();

      if (!accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name: newCategoryName }),
          }
        );

        const { data } = await response.json();

        if (response.ok) {
          setCategories((prev) => [...prev, { id: data.id, name: data.name }]);
          setNewCategoryName("");
          showToast("카테고리가 추가되었습니다.", "success");
        } else {
          showToast(data.message || "카테고리 추가에 실패했습니다.", "error");
        }
      } catch (err) {
        console.error("카테고리 추가 중 오류 발생:", err);
        showToast("카테고리 추가 중 오류가 발생했습니다.", "error");
      }
    }
  };

  const handleEditCategory = (id: number, name: string) => {
    setEditingCategoryId(id);
    setEditingCategoryName(name);
  };

  const handleSaveEdit = async () => {
    if (editingCategoryId !== null && editingCategoryName.trim()) {
      const accessToken = getAccessToken();

      if (!accessToken) {
        alert("로그인이 필요한 서비스입니다.");
        return;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${editingCategoryId}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${accessToken}`,
            },
            body: JSON.stringify({ name: editingCategoryName }),
          }
        );

        if (response.ok) {
          setCategories((prev) =>
            prev.map((category) =>
              category.id === editingCategoryId
                ? { ...category, name: editingCategoryName }
                : category
            )
          );
          setEditingCategoryId(null);
          setEditingCategoryName("");
          showToast("카테고리가 수정되었습니다.", "success");
        } else {
          const data = await response.json();
          showToast(data.message || "카테고리 수정에 실패했습니다.", "error");
        }
      } catch (err) {
        console.error("카테고리 수정 중 오류 발생:", err);
        showToast("카테고리 수정 중 오류가 발생했습니다.", "error");
      }
    }
  };

  const handleDeleteCategory = async (id: number) => {
    const accessToken = getAccessToken();

    if (!accessToken) {
      alert("로그인이 필요한 서비스입니다.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/categories/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (response.ok) {
        setCategories((prev) => prev.filter((category) => category.id !== id));
        showToast("카테고리가 삭제되었습니다.", "delete");
      } else {
        const data = await response.json();
        showToast(data.message || "카테고리 삭제에 실패했습니다.", "error");
      }
    } catch (err) {
      console.error("카테고리 삭제 중 오류 발생:", err);
      showToast("카테고리 삭제 중 오류가 발생했습니다.", "error");
    }
  };

  const showToast = (message: string, type: "success" | "error" | "delete") => {
    // 토스트 알림을 위한 간단한 구현
    const toast = document.createElement("div");
    toast.className = `fixed top-4 right-4 px-4 py-2 rounded shadow-lg transition-opacity duration-300 ease-in-out z-[10000] ${
      type === "success"
        ? "bg-green-500"
        : type === "delete"
        ? "bg-red-500"
        : "bg-red-500"
    } text-white`;
    toast.innerText = message;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 w-[400px] max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">카테고리 편집</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            ✕
          </button>
        </div>
        <div className="space-y-4">
          <ul className="space-y-2">
            {categories.map((category) => (
              <li
                key={category.id}
                className="flex justify-between items-center text-white"
              >
                {editingCategoryId === category.id ? (
                  <input
                    type="text"
                    value={editingCategoryName}
                    onChange={(e) => setEditingCategoryName(e.target.value)}
                    className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
                  />
                ) : (
                  <span>{category.name}</span>
                )}
                <div className="flex space-x-2">
                  {editingCategoryId === category.id ? (
                    <>
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-400 hover:text-green-500 transition-colors whitespace-nowrap"
                      >
                        저장
                      </button>
                      <button
                        onClick={() => {
                          setEditingCategoryId(null);
                          setEditingCategoryName("");
                        }}
                        className="text-gray-400 hover:text-gray-500 transition-colors whitespace-nowrap"
                      >
                        취소
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() =>
                          handleEditCategory(category.id, category.name)
                        }
                        className="text-blue-400 hover:text-blue-500 transition-colors whitespace-nowrap"
                      >
                        편집
                      </button>
                      <button
                        onClick={() => handleDeleteCategory(category.id)}
                        className="text-red-400 hover:text-red-500 transition-colors whitespace-nowrap"
                      >
                        삭제
                      </button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-3 py-2 bg-gray-700 rounded-md text-white"
              placeholder="새 카테고리 이름"
            />
            <button
              onClick={handleAddCategory}
              className="bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out whitespace-nowrap"
            >
              추가
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryEditModal;
