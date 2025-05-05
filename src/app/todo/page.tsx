"use client";

import { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Tabs,
  Tab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import DeleteIcon from "@mui/icons-material/Delete";

// 네비게이션 옵션 정의
const navOptions = ["All", "Today", "Check", "Flag", "Calendar"];

export default function TodoPage() {
  const [todos, setTodos] = useState<{ text: string; completed: boolean }[]>(
    []
  );
  const [input, setInput] = useState("");
  const [selectedNav, setSelectedNav] = useState(0);

  // 할 일 추가 함수
  const handleAddTodo = () => {
    if (input.trim() === "") return;
    setTodos([...todos, { text: input, completed: false }]);
    setInput("");
  };

  // 할 일 완료 상태 토글 함수
  const toggleComplete = (index: number) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // 할 일 삭제 함수
  const handleDelete = (index: number) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  // 네비게이션 변경 핸들러
  const handleNavChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedNav(newValue);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        p: 2,
      }}
    >
      {/* 헤더 영역 */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={2}
      >
        <Typography variant="h4" fontWeight="bold">
          Do!
        </Typography>
        <IconButton onClick={handleAddTodo}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* 네비게이션 바 */}
      <Tabs
        value={selectedNav}
        onChange={handleNavChange}
        indicatorColor="primary"
        textColor="primary"
        variant="fullWidth"
        sx={{ mb: 2 }}
      >
        {navOptions.map((option, index) => (
          <Tab key={index} label={option} />
        ))}
      </Tabs>

      {/* 할 일 입력 필드 */}
      <Box mb={2}>
        <TextField
          value={input}
          onChange={(e) => setInput(e.target.value)}
          fullWidth
          placeholder="할 일을 입력하세요"
          variant="outlined"
          size="small"
        />
      </Box>

      {/* 선택된 네비게이션 옵션에 따라 다른 컴포넌트 렌더링 */}
      {selectedNav === 0 && (
        <List>
          {todos.map((todo, index) => (
            <Paper
              key={index}
              sx={{
                p: 1,
                mb: 1,
                display: "flex",
                alignItems: "center",
                borderRadius: 2,
                boxShadow: 1,
              }}
            >
              <IconButton onClick={() => toggleComplete(index)}>
                {todo.completed ? (
                  <CheckCircleIcon color="success" />
                ) : (
                  <RadioButtonUncheckedIcon />
                )}
              </IconButton>
              <ListItemText
                primary={todo.text}
                sx={{
                  ml: 1,
                  textDecoration: todo.completed ? "line-through" : "none",
                  color: todo.completed ? "gray" : "black",
                }}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleDelete(index)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </Paper>
          ))}
        </List>
      )}
      {/* 다른 네비게이션 옵션에 대한 조건부 렌더링 추가 */}
    </Box>
  );
}
