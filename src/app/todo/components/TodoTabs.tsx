"use client";
import { Tabs, Tab } from "@mui/material";

interface TodoTabsProps {
  selectedNav: number;
  setSelectedNav: (value: number) => void;
}

const navOptions = ["All", "Today", "Check", "Tag", "Calendar"];

export default function TodoTabs({
  selectedNav,
  setSelectedNav,
}: TodoTabsProps) {
  return (
    <Tabs
      value={selectedNav}
      onChange={(e, newValue) => setSelectedNav(newValue)}
      variant="fullWidth"
      indicatorColor="primary"
      textColor="primary"
      centered
      sx={{
        width: "100%",
        "& .MuiTab-root": {
          minWidth: "auto", // 최소 너비 제거
          padding: { xs: "6px 4px", sm: "12px 16px" }, // 모바일에서 패딩 줄임
          fontSize: { xs: "0.7rem", sm: "0.875rem" }, // 모바일에서 폰트 크기 줄임
          minHeight: { xs: "40px", sm: "48px" }, // 모바일에서 높이 줄임
        },
        "& .MuiTabs-indicator": {
          height: 2, // 인디케이터 높이 줄임
        },
        "& .MuiTabs-flexContainer": {
          justifyContent: "center", // 가운데 정렬
        },
      }}
    >
      {navOptions.map((label, index) => (
        <Tab
          key={index}
          label={label}
          sx={{
            letterSpacing: { xs: "-0.5px", sm: "normal" }, // 모바일에서 글자 간격 줄임
          }}
        />
      ))}
    </Tabs>
  );
}
