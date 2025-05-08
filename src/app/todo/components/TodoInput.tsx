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

  // 날짜 포맷팅 (간결하게 표시)
  const formatDate = (date: Dayjs) => {
    return date.format("MM/DD HH:mm");
  };

  const open = Boolean(anchorEl);
  const id = open ? "palette-popover" : undefined;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div style={{ padding: "8px 0" }}>
        <Box
          display="flex"
          alignItems="center"
          flexWrap="wrap"
          sx={{
            width: "100%",
            maxWidth: "100%",
            p: { xs: 0.5, sm: 1 },
            borderRadius: 1,
          }}
        >
          <InputBase
            placeholder="할 일을 입력하세요"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            sx={{
              flex: "1 1 0",
              minWidth: 0,
              background: "#fff",
              borderRadius: 1,
              pl: 1,
              pr: 1,
              fontSize: { xs: "0.875rem", sm: "1rem" },
            }}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleAdd();
              }
            }}
          />

          <Box display="flex" alignItems="center" ml={0.5}>
            {dueDate && (
              <Typography
                variant="body2"
                sx={{
                  color: "gray",
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  mr: 0.5,
                  display: { xs: "none", sm: "block" },
                }}
              >
                {formatDate(dueDate)}
              </Typography>
            )}

            {tag && (
              <Box
                sx={{
                  width: { xs: 16, sm: 20 },
                  height: { xs: 16, sm: 20 },
                  bgcolor: tag,
                  borderRadius: "50%",
                  border: "1px solid #ccc",
                  mr: 0.5,
                }}
              />
            )}

            <IconButton
              onClick={() => setOpenDatePicker(true)}
              size="small"
              sx={{ p: { xs: 0.5, sm: 1 } }}
            >
              <CalendarTodayIcon fontSize="small" />
            </IconButton>
            <DateTimePicker
              open={openDatePicker}
              onClose={() => setOpenDatePicker(false)}
              value={dueDate}
              onChange={setDueDate}
              slotProps={{
                textField: { sx: { display: "none" } },
              }}
            />

            <IconButton
              onClick={handlePaletteClick}
              size="small"
              sx={{ p: { xs: 0.5, sm: 1 } }}
            >
              <PaletteIcon fontSize="small" />
            </IconButton>
            <Popover
              id={id}
              open={open}
              anchorEl={anchorEl}
              onClose={() => setAnchorEl(null)}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
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

            <IconButton
              onClick={handleAdd}
              size="small"
              sx={{ p: { xs: 0.5, sm: 1 } }}
            >
              <AddIcon fontSize="small" />
            </IconButton>
          </Box>
        </Box>
      </div>
    </LocalizationProvider>
  );
}
