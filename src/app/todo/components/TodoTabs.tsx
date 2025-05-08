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
      sx={{ width: "100%", maxWidth: "100%" }}
    >
      {navOptions.map((label, index) => (
        <Tab key={index} label={label} />
      ))}
    </Tabs>
  );
}
