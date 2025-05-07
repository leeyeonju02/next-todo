"use client";

import { useState } from "react";
import { IconButton, InputBase, Popover, Box, Typography } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import PaletteIcon from "@mui/icons-material/Palette";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import dayjs, { Dayjs } from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

type Props = {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  addTodo: (text: string, dueDate: string | null, tag: string | null) => void;
};

export default function TodoInput({ input, setInput, addTodo }: Props) {
  const [dueDate, setDueDate] = useState<Dayjs | null>(null);
  const [tag, setTag] = useState<string | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openDatePicker, setOpenDatePicker] = useState(false);

  const handleAdd = () => {
    if (!input.trim()) return;
    addTodo(input, dueDate ? dueDate.toISOString() : null, tag);
    setInput("");
    setDueDate(null);
    setTag(null);
  };

  const handlePaletteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleTagSelect = (color: string) => {
    setTag(color);
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "palette-popover" : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: "16px" }}>
        <Box
          display="flex"
          alignItems="center"
          gap={2}
          sx={{ background: "#f5f5f5", p: 1, borderRadius: 1 }}
        >
          {/* Input */}
          <InputBase
            placeholder="할 일을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              flex: 1,
              background: "#fff",
              borderRadius: 1,
              pl: 1,
              pr: 1,
            }}
          />

          {/* 선택된 날짜 표시 */}
          {dueDate && (
            <Typography
              variant="body2"
              sx={{ color: "gray", minWidth: "120px" }}
            >
              {dueDate.format("YYYY-MM-DD HH:mm")}
            </Typography>
          )}

          {/* 선택된 태그 색상 표시 */}
          {tag && (
            <Box
              sx={{
                width: 24,
                height: 24,
                bgcolor: tag,
                borderRadius: "50%",
                border: "1px solid #ccc",
              }}
            />
          )}

          {/* 달력 아이콘 */}
          <IconButton onClick={() => setOpenDatePicker(true)} color="inherit">
            <CalendarTodayIcon />
          </IconButton>
          <DateTimePicker
            open={openDatePicker}
            onClose={() => setOpenDatePicker(false)}
            value={dueDate}
            onChange={setDueDate}
            slotProps={{
              textField: { sx: { display: "none" } }, // input 숨김
            }}
          />

          {/* 팔레트 아이콘 */}
          <IconButton onClick={handlePaletteClick} color="inherit">
            <PaletteIcon />
          </IconButton>
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={() => setAnchorEl(null)}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Box display="flex" p={1} gap={1}>
              {["red", "green", "blue", "yellow", "purple"].map((color) => (
                <Box
                  key={color}
                  sx={{
                    width: 24,
                    height: 24,
                    bgcolor: color,
                    borderRadius: "50%",
                    cursor: "pointer",
                  }}
                  onClick={() => handleTagSelect(color)}
                />
              ))}
            </Box>
          </Popover>

          {/* + 버튼 */}
          <IconButton onClick={handleAdd} color="inherit">
            <AddIcon />
          </IconButton>
        </Box>
      </div>
    </LocalizationProvider>
  );
}
