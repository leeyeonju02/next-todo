// src/app/page.tsx
"use client";

import { useEffect, useState } from "react";

export default function HomePage() {
  const [lastMenu, setLastMenu] = useState<string>("없음");

  useEffect(() => {
    const savedMenu = localStorage.getItem("lastMenu");
    if (savedMenu) {
      setLastMenu(savedMenu);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold mb-4">오늘도 화이팅!</h1>
      <p className="mb-4">마지막으로 사용한 메뉴: {lastMenu}</p>
      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        로그인
      </button>
    </div>
  );
}
