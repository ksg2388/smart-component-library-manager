"use client";

import useUserStore from "@/app/stores/UserStore";
import React, { useState, useEffect, useCallback } from "react";

interface User {
  id: string;
  email: string;
  username: string;
  department: string;
  position: string;
  phone_number: string;
  role: string;
  is_approved: number;
}

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-4 right-4 p-4 rounded-md shadow-lg z-50 ${
        type === "success" ? "bg-green-600" : "bg-red-600"
      } text-white`}
    >
      {message}
    </div>
  );
};

const UserManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [isAllSelected, setIsAllSelected] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);
  const { getAccessToken } = useUserStore();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);
  const limit = 14;

  const fetchUsers = useCallback(async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setToast({
          message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
          type: "error",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.total);
    } catch (err) {
      console.error("사용자 목록을 불러오는 중 오류 발생:", err);
      setToast({
        message: "사용자 목록을 불러오는데 실패했습니다.",
        type: "error",
      });
    }
  }, [getAccessToken, currentPage]);

  const handleSearch = async () => {
    try {
      const token = getAccessToken();
      if (!token) {
        setToast({
          message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
          type: "error",
        });
        return;
      }

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/users?search=${searchInput}&page=${currentPage}&limit=${limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.totalPages);
      setTotalUsers(data.total);
    } catch (err) {
      console.error("사용자 검색 중 오류 발생:", err);
      setToast({ message: "사용자 검색에 실패했습니다.", type: "error" });
    }
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
  };

  const handleStatusChange = async (status: string) => {
    if (selectedUser) {
      try {
        const token = getAccessToken();
        if (!token) {
          setToast({
            message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
            type: "error",
          });
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${selectedUser.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ status }),
          }
        );

        if (response.ok) {
          setSelectedUser({ ...selectedUser });
          setToast({
            message: "사용자 상태가 변경되었습니다.",
            type: "success",
          });
        } else {
          setToast({
            message: "사용자 상태 변경에 실패했습니다.",
            type: "error",
          });
        }
      } catch (err) {
        console.error("사용자 상태 변경 중 오류 발생:", err);
        setToast({
          message: "사용자 상태 변경 중 오류가 발생했습니다.",
          type: "error",
        });
      }
    }
  };

  const handleRoleChange = async (role: string) => {
    if (selectedUser) {
      try {
        const token = getAccessToken();
        if (!token) {
          setToast({
            message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
            type: "error",
          });
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users/${selectedUser.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ role }),
          }
        );

        if (response.ok) {
          setSelectedUser({ ...selectedUser, role });
          setToast({
            message: "사용자 권한이 변경되었습니다.",
            type: "success",
          });
        } else {
          setToast({
            message: "사용자 권한 변경에 실패했습니다.",
            type: "error",
          });
        }
      } catch (err) {
        console.error("사용자 권한 변경 중 오류 발생:", err);
        setToast({
          message: "사용자 권한 변경 중 오류가 발생했습니다.",
          type: "error",
        });
      }
    }
  };

  const handleCheckboxChange = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        return prev.filter((id) => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  const handleSelectAll = () => {
    if (isAllSelected) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map((user) => user.id));
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length === 0) {
      setToast({ message: "삭제할 사용자를 선택해주세요.", type: "error" });
      return;
    }

    if (
      window.confirm(
        `선택한 ${selectedUsers.length}명의 사용자를 삭제하시겠습니까?`
      )
    ) {
      try {
        const token = getAccessToken();
        if (!token) {
          setToast({
            message: "인증 토큰이 없습니다. 다시 로그인해주세요.",
            type: "error",
          });
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/users`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ userIds: selectedUsers }),
          }
        );

        if (response.ok) {
          setUsers((prev) =>
            prev.filter((user) => !selectedUsers.includes(user.id))
          );
          setSelectedUsers([]);
          setIsAllSelected(false);
          if (selectedUser && selectedUsers.includes(selectedUser.id)) {
            setSelectedUser(null);
          }
          setToast({
            message: "선택한 사용자가 삭제되었습니다.",
            type: "success",
          });
          fetchUsers();
        } else {
          setToast({ message: "사용자 삭제에 실패했습니다.", type: "error" });
        }
      } catch (err) {
        console.error("사용자 삭제 중 오류 발생:", err);
        setToast({
          message: "사용자 삭제 중 오류가 발생했습니다.",
          type: "error",
        });
      }
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  return (
    <div className="flex h-full bg-[#2E2E36] p-4">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* 왼쪽 사용자 목록 및 검색 */}
      <div className="w-1/2 p-4 border-r border-gray-700 flex flex-col h-full">
        <div className="flex-none">
          <h2 className="text-xl font-bold text-white mb-4">사용자 관리</h2>
          <div className="flex items-center mb-4 h-10">
            <select className="bg-gray-700 text-white rounded-md mr-2 h-full px-2">
              <option>검색조건</option>
              <option>사용자ID</option>
            </select>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="flex-grow px-3 py-2 bg-gray-700 rounded-md text-white"
              placeholder="검색어를 입력하세요"
            />
            <button
              onClick={handleSearch}
              className="ml-2 bg-gray-600 text-white px-3 py-2 rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out"
            >
              검색
            </button>
          </div>
          <div className="flex justify-between mb-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={isAllSelected}
                onChange={handleSelectAll}
                className="mr-2 h-4 w-4"
              />
              <span className="text-white">전체 선택</span>
            </div>
            <button
              onClick={handleDeleteSelected}
              disabled={selectedUsers.length === 0}
              className={`px-3 py-1 rounded-md ${
                selectedUsers.length === 0
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-red-600 text-white hover:bg-red-700"
              } transition-all duration-300 ease-in-out`}
            >
              선택 삭제
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-x-auto min-h-0">
          <table className="min-w-full text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="p-2 w-10"></th>
                <th className="p-2">이름</th>
                <th className="p-2">부서</th>
                <th className="p-2">직위</th>
                <th className="p-2">전화번호</th>
                <th className="p-2">권한</th>
                <th className="p-2">상태</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`cursor-pointer hover:bg-gray-700 ${
                    selectedUser?.id === user.id ? "bg-gray-600" : ""
                  }`}
                >
                  <td className="p-2" onClick={(e) => e.stopPropagation()}>
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleCheckboxChange(user.id)}
                      className="h-4 w-4"
                    />
                  </td>
                  <td className="p-2" onClick={() => handleUserSelect(user)}>
                    {user.username}
                  </td>
                  <td className="p-2" onClick={() => handleUserSelect(user)}>
                    {user.department}
                  </td>
                  <td className="p-2" onClick={() => handleUserSelect(user)}>
                    {user.position}
                  </td>
                  <td className="p-2" onClick={() => handleUserSelect(user)}>
                    {user.phone_number}
                  </td>
                  <td className="p-2" onClick={() => handleUserSelect(user)}>
                    {user.role}
                  </td>
                  <td className="p-2" onClick={() => handleUserSelect(user)}>
                    {user.is_approved ? "승인" : "미승인"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        <div className="flex-none flex justify-center items-center mt-4 text-white">
          <div className="flex space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className={`px-3 py-1 rounded-md ${
                currentPage === 1
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              이전
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-3 py-1 rounded-md ${
                  currentPage === page
                    ? "bg-blue-600 text-white"
                    : "bg-gray-700 text-white hover:bg-gray-600"
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className={`px-3 py-1 rounded-md ${
                currentPage === totalPages
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
            >
              다음
            </button>
          </div>
        </div>
      </div>

      {/* 오른쪽 사용자 상세 정보 */}
      <div className="flex-1 p-4">
        {selectedUser ? (
          <div>
            <h2 className="text-xl font-bold text-white mb-4">사용자 정보</h2>
            <div className="bg-gray-800 p-4 rounded-md mb-4">
              <p className="text-white">이름: {selectedUser.username}</p>
              <p className="text-white">이메일: {selectedUser.email}</p>
              <p className="text-white">
                상태: {selectedUser.is_approved ? "승인" : "미승인"}
              </p>
              <p className="text-white">권한: {selectedUser.role}</p>
            </div>
            <div className="bg-gray-800 p-4 rounded-md">
              <div className="mb-4">
                <label className="text-white">상태 변경:</label>
                <select
                  value={selectedUser.is_approved}
                  onChange={(e) => handleStatusChange(e.target.value)}
                  className="ml-2 bg-gray-700 text-white rounded-md"
                >
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                </select>
              </div>
              <div>
                <label className="text-white">권한 변경:</label>
                <select
                  value={selectedUser.role}
                  onChange={(e) => handleRoleChange(e.target.value)}
                  className="ml-2 bg-gray-700 text-white rounded-md"
                >
                  <option value="user">사용자</option>
                  <option value="admin">관리자</option>
                </select>
              </div>
              <div className="flex justify-end mt-4">
                <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-all duration-300 ease-in-out">
                  저장
                </button>
                <button className="ml-2 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-all duration-300 ease-in-out">
                  취소
                </button>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-white">사용자를 선택하세요.</p>
        )}
      </div>
    </div>
  );
};

export default UserManagementPage;
