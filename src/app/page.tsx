"use client";

import { useEffect, useState } from "react";
import { Architects_Daughter } from "next/font/google";

const handwriting = Architects_Daughter({ subsets: ["latin"], weight: "400" });

export default function HomePage() {
  const [lastMenu, setLastMenu] = useState<string>("없음");

  useEffect(() => {
    const savedMenu = localStorage.getItem("lastMenu");
    if (savedMenu) {
      setLastMenu(savedMenu);
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <h1
        className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 ${handwriting.className} overflow-hidden border-r-2 animate-handwriting text-center`}
      >
        A place that makes me complete with plans and records
      </h1>
    </div>
  );
}
