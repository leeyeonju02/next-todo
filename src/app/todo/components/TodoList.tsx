"use client";
import { List, Select, MenuItem } from "@mui/material";
import TodoItem from "./TodoItem";
import { Todo } from "../types/todo";

interface TodoListProps {
  todos: Todo[];
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  isDropdownVisible: boolean;
  selectedTagColor: string | null;
  setSelectedTagColor: (color: string | null) => void;
}

export default function TodoList({
  todos,
  onToggle,
  onDelete,
  isDropdownVisible,
  selectedTagColor,
  setSelectedTagColor,
}: TodoListProps) {
  return (
    <>
      {isDropdownVisible && (
        <Select
          value={selectedTagColor || ""}
          onChange={(e) => setSelectedTagColor(e.target.value || null)}
          displayEmpty
          sx={{ mb: 2 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="red">Red</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
          <MenuItem value="green">Green</MenuItem>
          <MenuItem value="yellow">Yellow</MenuItem>
          <MenuItem value="purple">Purple</MenuItem>
        </Select>
      )}
      <List sx={{ width: "100%", maxWidth: "100%" }}>
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onToggle={() => onToggle(todo.id)}
            onDelete={() => onDelete(todo.id)}
          />
        ))}
      </List>
    </>
  );
}
