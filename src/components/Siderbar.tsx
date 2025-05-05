"use client";

import NextLink from "next/link";
import { List, ListItem, ListItemButton, ListItemText } from "@mui/material";

const menuItems = [
  { label: "Home", path: "/" },
  { label: "Todo", path: "/todo" },
  { label: "Study", path: "/study" },
  { label: "Diary", path: "/diary" },
  { label: "Account", path: "/account" },
];

export default function Sidebar() {
  const handleMenuClick = (menuLabel: string) => {
    localStorage.setItem("lastMenu", menuLabel);
  };

  return (
    <div className="w-60 h-screen bg-gray-800 text-white flex flex-col">
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
              <ListItemText primary={item.label} sx={{ textAlign: "center" }} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
