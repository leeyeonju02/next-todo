"use client";
import { useState, useEffect } from "react";
import { Todo } from "../types/todo";
import {
  fetchTodos,
  createTodo,
  updateTodo,
  deleteTodo as deleteTodoApi,
} from "@/lib/api/todoApi";
import { Box, Button, Select, MenuItem } from "@mui/material";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedNav, setSelectedNav] = useState(0);
  const [selectedTagColor, setSelectedTagColor] = useState<string | null>(null);
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const addTodo = async (
    text: string,
    dueDate: string | null,
    tag: string | null
  ) => {
    // If the Today tab is selected, set dueDate to today
    if (selectedNav === 1) {
      dueDate = new Date().toISOString().split("T")[0];
    }
    const newTodo: Omit<Todo, "id"> = {
      text,
      complete: 0,
      dueDate,
      tag,
    };

    try {
      const createdTodo = await createTodo(newTodo);
      console.log("Added todo:", createdTodo);
      setTodos((prevTodos) => [...prevTodos, createdTodo]);
    } catch (error) {
      console.error("Failed to create todo:", error);
    }
  };

  const toggleComplete = (id: number): void => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, complete: todo.complete === 100 ? 0 : 100 }
          : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    deleteTodoApi(id).catch((error) =>
      console.error("Failed to delete todo:", error)
    );
  };

  const filteredTodos = todos
    .filter((todo) => {
      if (selectedNav === 0) return true; // All
      if (selectedNav === 1) return isToday(todo.dueDate); // Today
      if (selectedNav === 2) return todo.complete === 100; // Check
      if (selectedNav === 3) {
        if (selectedTagColor) {
          return todo.tag === selectedTagColor; // 선택된 태그 색깔로 필터링
        }
        return todo.tag !== null; // 태그가 있는 항목만
      }
      return true;
    })
    .sort((a, b) => {
      if (selectedNav === 3 && !selectedTagColor) {
        return (a.tag || "").localeCompare(b.tag || ""); // 태그 색깔로 정렬
      }
      return 0;
    });

  useEffect(() => {
    const loadTodos = async () => {
      try {
        const todosFromApi = await fetchTodos();
        console.log("Fetched todos:", todosFromApi);
        setTodos(todosFromApi);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    loadTodos();
  }, []);

  useEffect(() => {
    // Show dropdown when Tag tab is selected
    if (selectedNav === 3) {
      setIsDropdownVisible(true);
    } else {
      setIsDropdownVisible(false);
    }
  }, [selectedNav]);

  return {
    todos,
    input,
    setInput,
    addTodo,
    toggleComplete,
    deleteTodo,
    selectedNav,
    setSelectedNav,
    filteredTodos,
    isDropdownVisible,
  };
}

function isToday(date?: string | null) {
  if (!date) return false;
  const today = new Date().toISOString().split("T")[0];
  const dueDate = new Date(date).toISOString().split("T")[0]; // Extract date part
  return dueDate === today;
}
