"use client";
import { useState } from "react";
import { Todo } from "../types/todo";

export function useTodo() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState<string>("");
  const [selectedNav, setSelectedNav] = useState(0);

  const addTodo = () => {
    if (!input.trim()) return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input,
      complete: 0,
      dueDate: null, // 기본 null
      tag: null, // 기본 null
    };
    setTodos([...todos, newTodo]);
    setInput("");
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
  };

  const filteredTodos = todos.filter((todo) => {
    if (selectedNav === 0) return true; // All
    if (selectedNav === 1) return isToday(todo.dueDate); // Today
    if (selectedNav === 2) return todo.complete === 100; // Check
    if (selectedNav === 3) return todo.tag !== null; // Tag 있는 항목만
    return true;
  });

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
  };
}

function isToday(date?: string | null) {
  if (!date) return false;
  const today = new Date().toISOString().split("T")[0];
  return date === today;
}
