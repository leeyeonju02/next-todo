"use client";

import NextLink from "next/link";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Todo", path: "/todo" },
  { label: "Study", path: "/study" },
  { label: "Diary", path: "/diary" },
  { label: "Account", path: "/account" },
];

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(true); // 큰 화면에서는 항상 열려 있음
      } else {
        setIsOpen(false); // 모바일에서는 기본적으로 닫혀 있음
      }
    };

    handleResize(); // 컴포넌트가 처음 렌더링될 때 화면 크기에 따라 초기 상태 설정
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMenuClick = (menuLabel: string) => {
    localStorage.setItem("lastMenu", menuLabel);
    if (window.innerWidth < 768) {
      setIsOpen(false); // 모바일에서는 메뉴 선택 후 닫기
    }
  };

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev); // 사이드바 열고 닫기 토글
  };

  return (
    <div className="bg-gray-800 text-white flex flex-col h-screen">
      {/* 모바일에서 햄버거 버튼 */}
      <div className="md:hidden flex justify-between items-center p-4">
        <button onClick={toggleSidebar} className="text-white">
          {isOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>

      {/* 사이드바 콘텐츠 */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } md:block w-60 md:w-60 bg-gray-800 flex-1`}
      >
        <List disablePadding>
          {menuItems.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ width: "100%" }}>
              <ListItemButton
                component={NextLink}
                href={item.path}
                onClick={() => handleMenuClick(item.label)}
                sx={{
                  width: "100%",
                  justifyContent: "center",
                  color: "white",
                  "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                }}
              >
                <ListItemText
                  primary={item.label}
                  sx={{ textAlign: "center" }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </div>
    </div>
  );
}
